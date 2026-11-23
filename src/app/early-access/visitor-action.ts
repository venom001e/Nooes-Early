'use server';

import { sendVisitorReceipt } from '@/lib/early-access/email';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function sendVisitorEmail(input: { email: string }): Promise<{ sent: boolean }> {
  const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : '';
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return { sent: false };
  }

  try {
    return { sent: await sendVisitorReceipt({ to: email }) };
  } catch {
    return { sent: false };
  }
}
