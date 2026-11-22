import { createHmac, randomBytes } from 'node:crypto';

const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const LOCAL_DEV_SECRET = 'nooes-local-dev-early-access-secret';

function tokenSecret(): string {
  const configured = process.env.EARLY_ACCESS_TOKEN_SECRET;
  if (configured) return configured;
  if (process.env.NODE_ENV !== 'production') return LOCAL_DEV_SECRET;
  throw new Error('EARLY_ACCESS_TOKEN_SECRET is not set');
}

export function createConfirmationToken(): string {
  return randomBytes(32).toString('base64url');
}

export function hashConfirmationToken(token: string): string {
  return createHmac('sha256', tokenSecret()).update(token).digest('hex');
}

export function confirmationExpiry(): string {
  return new Date(Date.now() + TOKEN_TTL_MS).toISOString();
}

export function isExpired(iso: string): boolean {
  const timestamp = Date.parse(iso);
  return Number.isNaN(timestamp) || timestamp <= Date.now();
}
