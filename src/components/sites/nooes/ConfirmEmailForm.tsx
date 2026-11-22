'use client';

import { useActionState, useEffect } from 'react';
import { track } from '@vercel/analytics';
import { confirmEarlyAccess } from '@/app/early-access/actions';
import type { WaitlistState } from '@/lib/early-access/types';

const initialState: WaitlistState = { status: 'idle', message: '' };

export default function ConfirmEmailForm({ token }: { token: string | null }) {
  const [state, formAction, pending] = useActionState(confirmEarlyAccess, initialState);

  useEffect(() => {
    if (state.status === 'success') {
      track('early_access_confirm');
    }
  }, [state.status]);

  if (!token) {
    return (
      <p role="alert" className="rounded border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
        This confirmation link is incomplete. Request early access again to get a new link.
      </p>
    );
  }

  if (state.status === 'success') {
    return (
      <div role="status" className="rounded border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
        {state.message}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="token" value={token} />
      {state.status === 'error' && state.message && (
        <p role="alert" className="rounded border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 w-full items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/85 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? 'Confirming…' : 'Confirm email'}
      </button>
    </form>
  );
}
