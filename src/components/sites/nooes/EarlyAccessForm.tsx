'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { track } from '@vercel/analytics';
import { sendVisitorEmail } from '@/app/early-access/visitor-action';
import type { WaitlistFieldErrors, WaitlistState } from '@/lib/early-access/types';

const initialState: WaitlistState = { status: 'idle', message: '' };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const labelClass = 'block text-xs font-mono uppercase tracking-[0.14em] text-zinc-500';
const fieldClass =
  'block w-full border-0 border-b border-border bg-transparent px-0 py-2 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-brand focus:ring-0';
const errorClass = 'mt-2 text-xs font-mono text-red-400';

type EarlyAccessFormProps = {
  accessKey: string;
};

function fieldValue(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

export default function EarlyAccessForm({ accessKey }: EarlyAccessFormProps) {
  const [state, setState] = useState<WaitlistState>(initialState);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = fieldValue(formData, 'email').toLowerCase();
    const name = fieldValue(formData, 'name');
    const useCase = fieldValue(formData, 'use_case');

    if (fieldValue(formData, 'company')) {
      setState({ status: 'success', message: 'Request received.', email });
      return;
    }

    const fieldErrors: WaitlistFieldErrors = {};
    if (!EMAIL_PATTERN.test(email) || email.length > 254) {
      fieldErrors.email = 'Enter a valid email address.';
    }
    if (name.length > 80) {
      fieldErrors.name = 'Keep your name under 80 characters.';
    }
    if (useCase.length > 500) {
      fieldErrors.useCase = 'Keep this under 500 characters.';
    }
    if (formData.get('consent') !== 'yes') {
      fieldErrors.consent = 'Please agree to receive early access updates.';
    }
    if (Object.keys(fieldErrors).length > 0) {
      setState({
        status: 'error',
        message: 'Please check the highlighted fields.',
        email,
        fieldErrors,
      });
      return;
    }

    if (!accessKey) {
      setState({
        status: 'error',
        message: 'Early access requests are temporarily unavailable. Please try again later.',
        email,
      });
      return;
    }

    setPending(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name || 'Not provided',
          email,
          subject: 'New early access request — Nooes',
          from_name: 'Nooes website',
          message: useCase || 'No additional thoughts provided.',
        }),
      });

      const result: unknown = await response.json().catch(() => null);
      const succeeded =
        response.ok &&
        typeof result === 'object' &&
        result !== null &&
        'success' in result &&
        result.success === true;

      if (!succeeded) {
        setState({
          status: 'error',
          message: 'We couldn’t send your request. Please try again.',
          email,
        });
        return;
      }

      await sendVisitorEmail({ email, name: name || null });

      track('early_access_request');
      setState({
        status: 'success',
        message: `Thanks — we received your early access request for ${email}.`,
        email,
      });
      form.reset();
    } catch {
      setState({
        status: 'error',
        message: 'We couldn’t send your request. Please try again.',
        email,
      });
    } finally {
      setPending(false);
    }
  }

  if (state.status === 'success') {
    return (
      <div role="status" className="rounded border border-border bg-zinc-950 p-4 text-sm text-zinc-300">
        <p>{state.message}</p>
        <p className="mt-4 text-xs text-zinc-500">
          <Link href="/" className="underline underline-offset-4 hover:text-white">
            Return home
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-8">
      {state.status === 'error' && state.message && (
        <p role="alert" className="rounded border border-red-500/30 bg-red-500/10 p-3 text-xs font-mono text-red-200">
          {state.message}
        </p>
      )}

      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="early-access-company">Company</label>
        <input
          id="early-access-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="early-access-name" className={labelClass}>
          Your name
        </label>
        <input
          id="early-access-name"
          name="name"
          type="text"
          maxLength={80}
          autoComplete="name"
          placeholder="Your name"
          aria-invalid={Boolean(state.fieldErrors?.name)}
          aria-describedby={state.fieldErrors?.name ? 'early-access-name-error' : undefined}
          className={`mt-2 ${fieldClass}`}
        />
        {state.fieldErrors?.name && (
          <p id="early-access-name-error" className={errorClass}>
            {state.fieldErrors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="early-access-email" className={labelClass}>
          Your email
        </label>
        <input
          id="early-access-email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="you@example.com"
          defaultValue={state.email ?? ''}
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={state.fieldErrors?.email ? 'early-access-email-error' : undefined}
          className={`mt-2 ${fieldClass}`}
        />
        {state.fieldErrors?.email && (
          <p id="early-access-email-error" className={errorClass}>
            {state.fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="early-access-use-case" className={labelClass}>
          Share your thoughts
        </label>
        <textarea
          id="early-access-use-case"
          name="use_case"
          rows={3}
          maxLength={500}
          placeholder="How do you plan to use Nooes?"
          aria-invalid={Boolean(state.fieldErrors?.useCase)}
          aria-describedby={state.fieldErrors?.useCase ? 'early-access-use-case-error' : undefined}
          className={`mt-2 resize-none ${fieldClass}`}
        />
        {state.fieldErrors?.useCase && (
          <p id="early-access-use-case-error" className={errorClass}>
            {state.fieldErrors.useCase}
          </p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center justify-center rounded-full bg-brand px-8 text-xs font-mono font-semibold uppercase tracking-[0.14em] text-brand-foreground transition-colors hover:bg-brand/85 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? 'Sending…' : 'Request early access'}
        </button>

        <label htmlFor="early-access-consent" className="mt-5 flex items-start gap-2 text-xs leading-5 text-zinc-500">
          <input
            id="early-access-consent"
            name="consent"
            type="checkbox"
            value="yes"
            required
            aria-invalid={Boolean(state.fieldErrors?.consent)}
            aria-describedby={state.fieldErrors?.consent ? 'early-access-consent-error' : undefined}
            className="mt-0.5 size-3.5 shrink-0 accent-brand"
          />
          <span>
            I agree to receive early access updates and have read the{' '}
            <Link href="/privacy" className="text-zinc-300 underline underline-offset-4 hover:text-white">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {state.fieldErrors?.consent && (
          <p id="early-access-consent-error" className={errorClass}>
            {state.fieldErrors.consent}
          </p>
        )}
      </div>
    </form>
  );
}
