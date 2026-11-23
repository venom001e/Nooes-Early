import { headers } from 'next/headers';

type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export type ConfirmationEmailResult =
  | { ok: true; mode: 'live' | 'local' }
  | { ok: false; reason: 'missing-config' | 'provider-error' };

async function siteUrl(): Promise<string> {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, '');
  if (process.env.NODE_ENV === 'production') return 'https://nooes.ai';

  const requestHeaders = await headers();
  const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host') ?? 'localhost:3000';
  const protocol = requestHeaders.get('x-forwarded-proto') ?? 'http';
  return `${protocol}://${host}`;
}

export async function confirmationUrl(token: string): Promise<string> {
  const url = new URL('/early-access/confirm', await siteUrl());
  url.searchParams.set('token', token);
  return url.toString();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EARLY_ACCESS_FROM_EMAIL);
}

async function sendEmail(input: SendEmailInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EARLY_ACCESS_FROM_EMAIL;
  if (!apiKey || !from) return false;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [input.to],
        subject: input.subject,
        html: input.html,
        text: input.text,
      }),
      cache: 'no-store',
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function sendConfirmationEmail(input: {
  to: string;
  confirmUrl: string;
}): Promise<ConfirmationEmailResult> {
  if (!emailConfigured()) {
    return process.env.NODE_ENV === 'production'
      ? { ok: false, reason: 'missing-config' }
      : { ok: true, mode: 'local' };
  }

  const safeUrl = escapeHtml(input.confirmUrl);
  const ok = await sendEmail({
    to: input.to,
    subject: 'Confirm your Nooes early access request',
    text: [
      'Confirm your Nooes early access request.',
      '',
      `Open this link to confirm: ${input.confirmUrl}`,
      '',
      'This link expires in 7 days. If you did not request this, you can ignore this email.',
    ].join('\n'),
    html: [
      '<div style="font-family:Arial,sans-serif;line-height:1.6;color:#18181b">',
      '<h1 style="font-size:20px;margin:0 0 16px">Confirm your early access request</h1>',
      '<p style="margin:0 0 20px">Open the link below to confirm your email address.</p>',
      `<p style="margin:0 0 20px"><a href="${safeUrl}" style="color:#059669">Confirm email</a></p>`,
      '<p style="margin:0 0 8px;color:#52525b">This link expires in 7 days.</p>',
      '<p style="margin:0;color:#52525b">If you did not request this, you can ignore this email.</p>',
      '</div>',
    ].join(''),
  });

  return ok ? { ok: true, mode: 'live' } : { ok: false, reason: 'provider-error' };
}

export async function sendVisitorReceipt(input: { to: string }): Promise<boolean> {
  if (!emailConfigured()) return false;

  return sendEmail({
    to: input.to,
    subject: "You're on the Nooes early access list",
    text: [
      'Hi,',
      '',
      'Thanks for signing up for Nooes early access.',
      '',
      'Nooes is an AI coding IDE with an agent that plans, edits and tests your code. We are opening access gradually, so it may take some time before your invite arrives.',
      '',
      'What happens next:',
      '- We will email you when your access is ready.',
      '- We will only use this email address to send you updates about Nooes.',
      '',
      'You are receiving this email because this address was used to join the Nooes early access list. If that was not you, just reply to this email and we will remove you right away.',
      '',
      'Questions? Reply to this email and we will get back to you.',
      '',
      'The Nooes team',
    ].join('\n'),
    html: [
      '<div style="font-family:Arial,sans-serif;line-height:1.6;color:#18181b;max-width:600px">',
      '<p style="margin:0 0 20px">Hi,</p>',
      '<p style="margin:0 0 20px">Thanks for signing up for Nooes early access.</p>',
      '<p style="margin:0 0 20px">Nooes is an AI coding IDE with an agent that plans, edits and tests your code. We are opening access gradually, so it may take some time before your invite arrives.</p>',
      '<p style="margin:0 0 8px"><strong>What happens next:</strong></p>',
      '<ul style="margin:0 0 20px;padding-left:20px">',
      '<li style="margin:0 0 6px">We will email you when your access is ready.</li>',
      '<li>We will only use this email address to send you updates about Nooes.</li>',
      '</ul>',
      '<p style="margin:0 0 20px">You are receiving this email because this address was used to join the Nooes early access list. If that was not you, just reply to this email and we will remove you right away.</p>',
      '<p style="margin:0 0 20px">Questions? Reply to this email and we will get back to you.</p>',
      '<p style="margin:0">The Nooes team</p>',
      '</div>',
    ].join(''),
  });
}

export async function sendOwnerNotification(input: {
  email: string;
  name: string | null;
  useCase: string | null;
}): Promise<void> {
  const notifyEmail = process.env.EARLY_ACCESS_NOTIFY_EMAIL;
  if (!notifyEmail || !emailConfigured()) return;

  const safeEmail = escapeHtml(input.email);
  const safeName = escapeHtml(input.name ?? '—');
  const safeUseCase = escapeHtml(input.useCase ?? '—');
  const ok = await sendEmail({
    to: notifyEmail,
    subject: 'New Nooes early access request',
    text: [
      'A new early access request was submitted.',
      '',
      `Email: ${input.email}`,
      `Name: ${input.name ?? '—'}`,
      `Use case: ${input.useCase ?? '—'}`,
    ].join('\n'),
    html: [
      '<div style="font-family:Arial,sans-serif;line-height:1.6;color:#18181b">',
      '<h1 style="font-size:20px;margin:0 0 16px">New early access request</h1>',
      `<p style="margin:0 0 8px"><strong>Email:</strong> ${safeEmail}</p>`,
      `<p style="margin:0 0 8px"><strong>Name:</strong> ${safeName}</p>`,
      `<p style="margin:0"><strong>Use case:</strong> ${safeUseCase}</p>`,
      '</div>',
    ].join(''),
  });

  if (!ok) {
    console.error('Early access owner notification could not be sent.');
  }
}
