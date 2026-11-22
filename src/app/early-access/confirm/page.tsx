import type { Metadata } from 'next';
import Link from 'next/link';
import ConfirmEmailForm from '@/components/sites/nooes/ConfirmEmailForm';
import EarlyAccessShell from '@/components/sites/nooes/EarlyAccessShell';

export const metadata: Metadata = {
  title: 'Confirm Email | Nooes',
  description: 'Confirm your Nooes early access request.',
};

type ConfirmPageProps = {
  searchParams: Promise<{ token?: string | string[] }>;
};

export default async function ConfirmEarlyAccessPage({ searchParams }: ConfirmPageProps) {
  const params = await searchParams;
  const token =
    typeof params.token === 'string'
      ? params.token
      : Array.isArray(params.token)
        ? params.token[0]
        : null;

  return (
    <EarlyAccessShell>
      <div className="w-full max-w-2xl border border-border bg-black rounded-lg p-6 sm:p-10 lg:p-12">
        <div className="border-b border-border pb-8 mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
            Confirm your email
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 font-mono">
            {'// Early access'}
          </p>
        </div>

        <div className="rounded border border-border bg-zinc-950 p-6">
          <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-6">
            <span className="text-zinc-600">{'// 01'}</span> Confirmation
          </h2>
          <ConfirmEmailForm token={token} />
        </div>

        <p className="mt-8 text-xs text-zinc-500 font-mono">
          <Link href="/early-access" className="hover:text-white">
            ← Back to early access
          </Link>
        </p>
      </div>
    </EarlyAccessShell>
  );
}
