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

export async function sendVisitorReceipt(input: {
  to: string;
  name: string | null;
}): Promise<boolean> {
  if (!emailConfigured()) return false;

  const safeName = escapeHtml(input.name ?? 'there');
  return sendEmail({
    to: input.to,
    subject: 'We received your Nooes early access request',
    text: [
      `Hi ${input.name ?? 'there'},`,
      '',
      'Thanks for requesting early access to Nooes.',
      'We’ll email you when it is available.',
      '',
      '— Nooes',
    ].join('\n'),
    html: [
      '<div style="font-family:Arial,sans-serif;line-height:1.6;color:#18181b">',
      `<p style="margin:0 0 20px">Hi ${safeName},</p>`,
      '<p style="margin:0 0 20px">Thanks for requesting early access to Nooes. We’ll email you when it is available.</p>',
      '<p style="margin:0">— Nooes</p>',
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
