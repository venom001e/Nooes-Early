import { createHash } from 'node:crypto';
import { headers } from 'next/headers';

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 5;
const buckets = new Map<string, { count: number; resetAt: number }>();

export async function withinRateLimit(): Promise<boolean> {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get('x-forwarded-for') ?? '';
  const ip = forwarded.split(',')[0]?.trim() || requestHeaders.get('x-real-ip') || 'unknown';
  const key = createHash('sha256').update(ip).digest('hex');
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (bucket.count >= MAX_REQUESTS) return false;
  bucket.count += 1;
  return true;
}
