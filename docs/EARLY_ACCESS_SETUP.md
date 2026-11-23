# Early access setup

The `/early-access` form is delivered through Web3Forms:

1. A visitor enters their details and agrees to receive updates.
2. The browser posts the request to `https://api.web3forms.com/submit`, which emails the submission to the mailbox configured for the access key.
3. A server action then asks Resend to email a receipt to the address the visitor entered.

No password is collected. Full account creation belongs to a later login/signup stage.

Web3Forms is called from the browser because its free plan documents that server-side submissions require a paid plan and server IP whitelisting. Its access key is documented as public by design — it is an alias for the destination mailbox, not a secret. The free plan allows 250 submissions per month.

## Production environment

Add these in Vercel (or the hosting environment). Replace every `[FILL]` before launch.

| Variable | Required | Value |
| --- | --- | --- |
| `WEB3FORMS_ACCESS_KEY` | Yes | Web3Forms access key for the form's destination mailbox |
| `RESEND_API_KEY` | Yes | `[FILL]` — Resend API key for the visitor receipt |
| `EARLY_ACCESS_FROM_EMAIL` | Yes | A sender address on the domain verified in Resend. Currently `support@nooes.dev` — confirmed working by the Resend API. |
| `NEXT_PUBLIC_SITE_URL` | No | `[FILL]` — defaults to `https://nooes.ai` |

Resend's test domain (`onboarding@resend.dev`) can only send to the account owner's own address. To email visitors, `EARLY_ACCESS_FROM_EMAIL` must use a domain verified in Resend. `nooes.ai` and `nooes.com` are not verified for this API key; `nooes.dev` is verified. Do not change this value without verifying the new domain in Resend first.

The older waitlist backend remains in the repository but is not used by the form. If it is enabled again later, these apply:

| Variable | Required | Value |
| --- | --- | --- |
| `SUPABASE_URL` | Yes | `[FILL]` — Supabase project REST URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | `[FILL]` — server-only service role key |
| `EARLY_ACCESS_TOKEN_SECRET` | Yes | `[FILL]` — long random secret used to hash confirmation tokens |
| `EARLY_ACCESS_NOTIFY_EMAIL` | No | `[FILL]` — owner address for new-request notifications |

Never expose `SUPABASE_SERVICE_ROLE_KEY`, `EARLY_ACCESS_TOKEN_SECRET`, or `RESEND_API_KEY` to the client.

## Where submissions go

Submissions are delivered to the mailbox linked to the Web3Forms access key. Web3Forms also stores submissions in its dashboard, where they can be reviewed and exported. The notification email uses the subject `New early access request — Nooes` and sets the visitor's email as the reply-to address.

Separately, Resend sends the visitor a receipt with the subject `You're on the Nooes early access list`. This is a receipt only — the visitor is not asked to confirm anything. If Resend is not configured, the Web3Forms submission still succeeds and the visitor receipt is skipped.

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

Set `WEB3FORMS_ACCESS_KEY` in `.env.local` to test real delivery from `npm run dev`. With no key set, the form shows an unavailable message instead of pretending it sent anything. Set `RESEND_API_KEY` and a verified `EARLY_ACCESS_FROM_EMAIL` to test the visitor receipt.

The older waitlist backend, when configured with production credentials, writes development submissions to `.data/early-access-signups.jsonl`. `.data/` is ignored by Git.

## Analytics and reporting

Vercel Analytics (`@vercel/analytics`) is installed in the root layout. It needs no extra credentials in a Vercel deployment.

- Page views for `/early-access` are recorded automatically.
- The custom event `early_access_request` fires after a successful Web3Forms submission.

Open the Vercel project → **Analytics** → **Page Views** for visitor counts and **Events** for the request event. Event counts are submissions, not unique people.

For exact submissions, open the Web3Forms dashboard for the form linked to the access key. Web3Forms also exposes a paid Submissions API for programmatic counts. The Supabase queries below apply only to the older waitlist backend.

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

- Neither Web3Forms nor the Resend receipt uses a double opt-in confirmation step. The `/early-access/confirm` route belongs to the older waitlist backend.
- Web3Forms applies its own free-plan monthly submission limit and spam filtering.
- There is no login, account creation, or invite-code redemption yet.
- The privacy policy text is not final.
- The older waitlist backend's rate limiting is in-memory per server instance (`5 requests / hour / IP`).
