'use server';

import { randomUUID } from 'node:crypto';
import {
  confirmationUrl,
  sendConfirmationEmail,
  sendOwnerNotification,
} from '@/lib/early-access/email';
import { withinRateLimit } from '@/lib/early-access/rate-limit';
import {
  createRecord,
  getByEmail,
  getByTokenHash,
  isProductionConfigured,
  markConfirmed,
  updateToken,
} from '@/lib/early-access/store';
import {
  confirmationExpiry,
  createConfirmationToken,
  hashConfirmationToken,
  isExpired,
} from '@/lib/early-access/tokens';
import type { WaitlistState } from '@/lib/early-access/types';
import { isHoneypotFilled, parseWaitlistInput } from '@/lib/early-access/validation';

const unavailableState: WaitlistState = {
  status: 'error',
  message: 'Early access requests are temporarily unavailable. Please try again later.',
};

function getEmail(formData: FormData): string {
  const value = formData.get('email');
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function errorState(message: string, email?: string): WaitlistState {
  return { status: 'error', message, ...(email ? { email } : {}) };
}

type IssuedToken = {
  token: string;
  tokenHash: string;
  tokenExpiresAt: string;
};

function issueToken(): IssuedToken {
  const token = createConfirmationToken();
  return {
    token,
    tokenHash: hashConfirmationToken(token),
    tokenExpiresAt: confirmationExpiry(),
  };
}

type PrepareResult =
  | { ok: true; token: string; alreadyConfirmed: boolean }
  | { ok: false; message: string };

async function prepareSignup(
  email: string,
  name: string | null,
  useCase: string | null,
): Promise<PrepareResult> {
  const issued = issueToken();
  const createdAt = new Date().toISOString();

  try {
    const existing = await getByEmail(email);

    if (existing?.status === 'confirmed') {
      return { ok: true, token: '', alreadyConfirmed: true };
    }

    if (existing) {
      const updated = await updateToken(email, issued.tokenHash, issued.tokenExpiresAt);
      if (!updated) {
        return { ok: false, message: 'We couldn’t update your request. Please try again.' };
      }
      return { ok: true, token: issued.token, alreadyConfirmed: false };
    }

    const result = await createRecord({
      id: randomUUID(),
      email,
      name,
      useCase,
      status: 'pending',
      tokenHash: issued.tokenHash,
      tokenExpiresAt: issued.tokenExpiresAt,
      createdAt,
      confirmedAt: null,
    });

    if (result === 'duplicate') {
      const raced = await getByEmail(email);
      if (raced?.status === 'confirmed') {
        return { ok: true, token: '', alreadyConfirmed: true };
      }
      if (!raced) {
        return { ok: false, message: 'We couldn’t save your request. Please try again.' };
      }
      const updated = await updateToken(email, issued.tokenHash, issued.tokenExpiresAt);
      if (!updated) {
        return { ok: false, message: 'We couldn’t update your request. Please try again.' };
      }
    }

    return { ok: true, token: issued.token, alreadyConfirmed: false };
  } catch {
    return { ok: false, message: 'We couldn’t save your request. Please try again.' };
  }
}

export async function requestEarlyAccess(
  _prevState: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  if (process.env.NODE_ENV === 'production' && !isProductionConfigured()) {
    return unavailableState;
  }

  const email = getEmail(formData);

  if (isHoneypotFilled(formData)) {
    return { status: 'success', message: 'Request received.', email };
  }

  try {
    if (!(await withinRateLimit())) {
      return errorState('Too many requests. Please try again later.', email);
    }
  } catch {
    return errorState('We couldn’t process your request. Please try again.', email);
  }

  const parsed = parseWaitlistInput(formData);
  if (!parsed.ok) {
    return {
      status: 'error',
      message: 'Please check the highlighted fields.',
      email,
      fieldErrors: parsed.fieldErrors,
    };
  }

  const { email: normalizedEmail, name, useCase } = parsed.value;
  const prepared = await prepareSignup(normalizedEmail, name, useCase);
  if (!prepared.ok) {
    return errorState(prepared.message, normalizedEmail);
  }
  if (prepared.alreadyConfirmed) {
    return {
      status: 'success',
      message: `${normalizedEmail} is already confirmed. No further action is needed.`,
      email: normalizedEmail,
    };
  }

  const url = await confirmationUrl(prepared.token);
  const emailResult = await sendConfirmationEmail({ to: normalizedEmail, confirmUrl: url });
  if (!emailResult.ok) {
    return errorState(
      emailResult.reason === 'missing-config'
        ? unavailableState.message
        : 'We couldn’t send the confirmation email. Please try again.',
      normalizedEmail,
    );
  }

  await sendOwnerNotification({ email: normalizedEmail, name, useCase });

  return {
    status: 'success',
    message:
      emailResult.mode === 'local'
        ? 'Saved locally. Confirm your email with the link below.'
        : `Check your inbox. We sent a confirmation link to ${normalizedEmail}.`,
    email: normalizedEmail,
    ...(emailResult.mode === 'local' ? { devConfirmUrl: url } : {}),
  };
}

export async function confirmEarlyAccess(
  _prevState: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  if (process.env.NODE_ENV === 'production' && !isProductionConfigured()) {
    return unavailableState;
  }

  const value = formData.get('token');
  const token = typeof value === 'string' ? value.trim() : '';
  if (!/^[A-Za-z0-9_-]{32,128}$/.test(token)) {
    return errorState('This confirmation link is invalid.');
  }

  try {
    const record = await getByTokenHash(hashConfirmationToken(token));
    if (!record) {
      return errorState('This confirmation link is invalid.');
    }
    if (record.status === 'confirmed') {
      return { status: 'success', message: 'Your email is already confirmed.' };
    }
    if (isExpired(record.tokenExpiresAt)) {
      return errorState(
        'This confirmation link has expired. Request early access again to get a new link.',
      );
    }

    const updated = await markConfirmed(record);
    if (!updated) {
      return errorState('We couldn’t confirm your email. Please try again.');
    }

    return {
      status: 'success',
      message: 'Your email is confirmed. You’re on the early access list.',
    };
  } catch {
    return errorState('We couldn’t confirm your email. Please try again.');
  }
}
