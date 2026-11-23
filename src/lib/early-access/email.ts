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

const VISITOR_RECEIPT_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark light">
<meta name="supported-color-schemes" content="dark light">
<title>You're on the Nooes list</title>
</head>
<body style="margin:0;padding:0;background-color:#0A0A0A;" bgcolor="#0A0A0A">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#0A0A0A;">We'll email you when your invite is ready.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0A0A0A" style="background-color:#0A0A0A;">
  <tr>
    <td align="center" style="padding:64px 24px;">
      <table role="presentation" width="480" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:480px;">
        <tr>
          <td style="font-family:'SF Mono',Menlo,Consolas,monospace;font-size:13px;letter-spacing:0.28em;text-transform:uppercase;color:#7F8E9A;padding-bottom:44px;">Nooes</td>
        </tr>
        <tr>
          <td style="font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:28px;line-height:1.25;font-weight:500;color:#E5E4E2;padding-bottom:16px;">You're on the list.</td>
        </tr>
        <tr>
          <td style="font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:#B8B7B4;padding-bottom:36px;">Thanks for joining Nooes early access. We'll email you when your invite is ready.</td>
        </tr>
        <tr>
          <td style="border-top:1px solid #2A3238;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.6;color:#7F8E9A;padding-top:24px;">Nooes is an AI coding IDE with an agent that plans, edits and tests your code.</td>
        </tr>
        <tr>
          <td style="font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#7F8E9A;padding-top:32px;">You're receiving this because this address joined the Nooes early access list. Not you? Reply to this email and we'll remove it.</td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

export async function sendVisitorReceipt(input: { to: string }): Promise<boolean> {
  if (!emailConfigured()) return false;

  return sendEmail({
    to: input.to,
    subject: "You're on the Nooes list",
    text: [
      'NOOES',
      '',
      "You're on the list.",
      '',
      "Thanks for joining Nooes early access. We'll email you when your invite is ready.",
      '',
      '--',
      'Nooes is an AI coding IDE with an agent that plans, edits and tests your code.',
      '',
      "You're receiving this because this address joined the Nooes early access list. Not you? Reply to this email and we'll remove it.",
    ].join('\n'),
    html: VISITOR_RECEIPT_HTML,
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
