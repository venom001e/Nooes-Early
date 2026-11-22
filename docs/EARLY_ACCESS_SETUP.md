# Early access setup

The `/early-access` page uses a double opt-in waitlist:

1. A visitor submits their email and agrees to receive updates.
2. Nooes stores the request as `pending` and sends a confirmation link.
3. The visitor opens `/early-access/confirm?token=…` and confirms explicitly.
4. The record becomes `confirmed`.

No password is collected. Full account creation belongs to a later login/signup stage.

## Production environment

Add these in Vercel (or the hosting environment). Replace every `[FILL]` before launch. Production fails closed if any required value is missing.

| Variable | Required | Value |
| --- | --- | --- |
| `SUPABASE_URL` | Yes | `[FILL]` — Supabase project REST URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | `[FILL]` — server-only service role key |
| `EARLY_ACCESS_TOKEN_SECRET` | Yes | `[FILL]` — long random secret used to hash confirmation tokens |
| `RESEND_API_KEY` | Yes | `[FILL]` |
| `EARLY_ACCESS_FROM_EMAIL` | Yes | `[FILL]` — verified sender address in Resend |
| `NEXT_PUBLIC_SITE_URL` | No | `[FILL]` — defaults to `https://nooes.ai` |
| `EARLY_ACCESS_NOTIFY_EMAIL` | No | `[FILL]` — owner address for new-request notifications |

Never expose `SUPABASE_SERVICE_ROLE_KEY`, `EARLY_ACCESS_TOKEN_SECRET`, or `RESEND_API_KEY` to the client.

## Supabase table

Run this in the Supabase SQL editor:

```sql
create table if not exists public.early_access_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  use_case text,
  status text not null default 'pending' check (status in ('pending', 'confirmed')),
  token_hash text not null unique,
  token_expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  confirmed_at timestamptz
);

alter table public.early_access_signups enable row level security;
```

The service role key bypasses row level security. Do not add a public policy for anonymous inserts, updates, or selects.

If `EARLY_ACCESS_TOKEN_SECRET` changes, previously issued confirmation links stop working. Affected users can request a fresh link from `/early-access`.

## Local development

With no production credentials configured, submissions are written to `.data/early-access-signups.jsonl`, and the form shows a local confirmation link instead of pretending an email was sent. In development the link uses the local request origin unless `NEXT_PUBLIC_SITE_URL` is set. This path is development-only. `.data/` is ignored by Git.

Resend is used through its REST API. Set `RESEND_API_KEY` and `EARLY_ACCESS_FROM_EMAIL` to test live delivery locally.

## Analytics and reporting

Vercel Analytics (`@vercel/analytics`) is installed in the root layout. It needs no extra credentials in a Vercel deployment.

- Page views for `/early-access` and `/early-access/confirm` are recorded automatically.
- The custom event `early_access_request` fires after a successful form submission.
- The custom event `early_access_confirm` fires after a successful confirmation.

Open the Vercel project → **Analytics** → **Page Views** for visitor counts and **Events** for the two funnel events. Event counts are attempts, not confirmed unique people; use the database query below for exact records.

For exact signup counts, run this in the Supabase SQL editor:

```sql
select count(*) as total_signups from public.early_access_signups;

select status, count(*)
from public.early_access_signups
group by status;
```

Or from the command line after pulling the production environment:

```bash
npx vercel env pull .env.local
node --env-file=.env.local scripts/early-access-stats.mjs
```

The npm script `npm run stats:early-access` does the same thing when those variables are already in your shell environment.

## Privacy

The form requires explicit consent and links to `/privacy`. The email-list section of that policy still contains `[FILL: to be written by a lawyer before launch]` and must be completed before launch.

## Current limitations

- Rate limiting is in-memory per server instance (`5 requests / hour / IP`). Use an edge or shared store for a multi-instance production deployment.
- There is no login, account creation, or invite-code redemption yet.
- The privacy policy text is not final.
- Confirmation links expire after 7 days.
