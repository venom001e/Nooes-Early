import type { WaitlistFieldErrors, WaitlistInput } from './types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function field(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

export function isHoneypotFilled(formData: FormData): boolean {
  return field(formData, 'company') !== '';
}

export function parseWaitlistInput(
  formData: FormData,
): { ok: true; value: WaitlistInput } | { ok: false; fieldErrors: WaitlistFieldErrors } {
  const email = field(formData, 'email').toLowerCase();
  const name = field(formData, 'name');
  const useCase = field(formData, 'use_case');
  const fieldErrors: WaitlistFieldErrors = {};

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    fieldErrors.email = 'Enter a valid email address.';
  }
  if (name.length > 80) {
    fieldErrors.name = 'Keep your name under 80 characters.';
  }
  if (useCase.length > 500) {
    fieldErrors.useCase = 'Keep this under 500 characters.';
  }
  if (formData.get('consent') !== 'yes') {
    fieldErrors.consent = 'Please agree to receive early access updates.';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return { ok: true, value: { email, name: name || null, useCase: useCase || null } };
}
