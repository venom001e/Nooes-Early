import { appendFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { NewWaitlistRecord, WaitlistRecord } from './types';

const LOCAL_DIR = join(process.cwd(), '.data');
const LOCAL_FILE = join(LOCAL_DIR, 'early-access-signups.jsonl');

function getSupabaseUrl(): string {
  return process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
}

function getSupabaseKey(): string {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_KEY ||
    ''
  );
}

export function isProductionConfigured(): boolean {
  return Boolean(
    getSupabaseUrl() &&
    getSupabaseKey() &&
    process.env.EARLY_ACCESS_TOKEN_SECRET &&
    process.env.RESEND_API_KEY &&
    process.env.EARLY_ACCESS_FROM_EMAIL,
  );
}

function shouldUseSupabase(): boolean {
  return Boolean(getSupabaseUrl() && getSupabaseKey());
}

function tableUrl(): string {
  const base = getSupabaseUrl().replace(/\/$/, '');
  return `${base}/rest/v1/early_access_signups`;
}

function supabaseHeaders(): HeadersInit {
  const key = getSupabaseKey();
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  };
}

function stringField(row: Record<string, unknown>, key: string): string | null {
  const value = row[key];
  return typeof value === 'string' ? value : null;
}

function toRecord(value: unknown): WaitlistRecord | null {
  if (typeof value !== 'object' || value === null) return null;
  const row = value as Record<string, unknown>;
  const email = stringField(row, 'email');
  const tokenHash = stringField(row, 'token_hash');
  const createdAt = stringField(row, 'created_at');
  if (!email || !tokenHash || !createdAt) return null;
  return {
    id: stringField(row, 'id') ?? '',
    email,
    name: stringField(row, 'name'),
    useCase: stringField(row, 'use_case'),
    status: stringField(row, 'status') === 'confirmed' ? 'confirmed' : 'pending',
    tokenHash,
    tokenExpiresAt: stringField(row, 'token_expires_at') ?? '',
    createdAt,
    confirmedAt: stringField(row, 'confirmed_at'),
  };
}

function toLocalRecord(value: unknown): WaitlistRecord | null {
  if (typeof value !== 'object' || value === null) return null;
  const row = value as Record<string, unknown>;
  const email = stringField(row, 'email');
  const tokenHash = stringField(row, 'tokenHash');
  const createdAt = stringField(row, 'createdAt');
  if (!email || !tokenHash || !createdAt) return null;
  return {
    id: stringField(row, 'id') ?? '',
    email,
    name: stringField(row, 'name'),
    useCase: stringField(row, 'useCase'),
    status: stringField(row, 'status') === 'confirmed' ? 'confirmed' : 'pending',
    tokenHash,
    tokenExpiresAt: stringField(row, 'tokenExpiresAt') ?? '',
    createdAt,
    confirmedAt: stringField(row, 'confirmedAt'),
  };
}

async function localRecords(): Promise<WaitlistRecord[]> {
  let raw: string;
  try {
    raw = await readFile(LOCAL_FILE, 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw error;
  }
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => toLocalRecord(JSON.parse(line) as unknown))
    .filter((record): record is WaitlistRecord => record !== null);
}

async function writeLocalRecords(records: WaitlistRecord[]): Promise<void> {
  await mkdir(LOCAL_DIR, { recursive: true });
  const body = records.map((record) => JSON.stringify(record)).join('\n') + '\n';
  await writeFile(LOCAL_FILE, body, 'utf8');
}

export async function getByEmail(email: string): Promise<WaitlistRecord | null> {
  if (shouldUseSupabase()) {
    const url = new URL(tableUrl());
    url.searchParams.set('email', `eq.${email}`);
    url.searchParams.set('select', '*');
    const response = await fetch(url, { headers: supabaseHeaders(), cache: 'no-store' });
    if (!response.ok) throw new Error('waitlist lookup failed');
    const rows: unknown = await response.json();
    if (!Array.isArray(rows)) return null;
    return toRecord(rows[0]);
  }
  const records = await localRecords();
  return records.find((record) => record.email === email) ?? null;
}

export async function getByTokenHash(tokenHash: string): Promise<WaitlistRecord | null> {
  if (shouldUseSupabase()) {
    const url = new URL(tableUrl());
    url.searchParams.set('token_hash', `eq.${tokenHash}`);
    url.searchParams.set('select', '*');
    const response = await fetch(url, { headers: supabaseHeaders(), cache: 'no-store' });
    if (!response.ok) throw new Error('waitlist token lookup failed');
    const rows: unknown = await response.json();
    if (!Array.isArray(rows)) return null;
    return toRecord(rows[0]);
  }
  const records = await localRecords();
  return records.find((record) => record.tokenHash === tokenHash) ?? null;
}

export async function createRecord(record: NewWaitlistRecord): Promise<'created' | 'duplicate'> {
  if (shouldUseSupabase()) {
    const response = await fetch(tableUrl(), {
      method: 'POST',
      headers: { ...supabaseHeaders(), Prefer: 'return=minimal' },
      body: JSON.stringify({
        id: record.id,
        email: record.email,
        name: record.name,
        use_case: record.useCase,
        status: record.status,
        token_hash: record.tokenHash,
        token_expires_at: record.tokenExpiresAt,
        created_at: record.createdAt,
        confirmed_at: record.confirmedAt,
      }),
    });
    if (response.status === 409) return 'duplicate';
    if (!response.ok) throw new Error('waitlist insert failed');
    return 'created';
  }
  const records = await localRecords();
  if (records.some((item) => item.email === record.email)) return 'duplicate';
  await mkdir(LOCAL_DIR, { recursive: true });
  await appendFile(LOCAL_FILE, JSON.stringify(record) + '\n', 'utf8');
  return 'created';
}

export async function updateToken(email: string, tokenHash: string, tokenExpiresAt: string): Promise<boolean> {
  if (shouldUseSupabase()) {
    const url = new URL(tableUrl());
    url.searchParams.set('email', `eq.${email}`);
    const response = await fetch(url, {
      method: 'PATCH',
      headers: { ...supabaseHeaders(), Prefer: 'return=minimal' },
      body: JSON.stringify({ token_hash: tokenHash, token_expires_at: tokenExpiresAt, status: 'pending' }),
    });
    return response.ok;
  }
  const records = await localRecords();
  const index = records.findIndex((record) => record.email === email);
  if (index === -1) return false;
  records[index] = { ...records[index], tokenHash, tokenExpiresAt, status: 'pending', confirmedAt: null };
  await writeLocalRecords(records);
  return true;
}

export async function markConfirmed(record: WaitlistRecord): Promise<boolean> {
  if (shouldUseSupabase()) {
    const url = new URL(tableUrl());
    url.searchParams.set('email', `eq.${record.email}`);
    const response = await fetch(url, {
      method: 'PATCH',
      headers: { ...supabaseHeaders(), Prefer: 'return=minimal' },
      body: JSON.stringify({ status: 'confirmed', confirmed_at: new Date().toISOString() }),
    });
    return response.ok;
  }
  const records = await localRecords();
  const index = records.findIndex((item) => item.email === record.email);
  if (index === -1) return false;
  records[index] = { ...records[index], status: 'confirmed', confirmedAt: new Date().toISOString() };
  await writeLocalRecords(records);
  return true;
}
