'use server';

import { sendVisitorReceipt } from '@/lib/early-access/email';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function sendVisitorEmail(input: {
  email: string;
  name: string | null;
}): Promise<{ sent: boolean }> {
  const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : '';
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return { sent: false };
  }

  const trimmedName = typeof input.name === 'string' ? input.name.trim() : '';
  const name = trimmedName ? trimmedName.slice(0, 80) : null;

  try {
    return { sent: await sendVisitorReceipt({ to: email, name }) };
  } catch {
    return { sent: false };
  }
}
