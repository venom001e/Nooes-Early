import type { Metadata } from 'next';
import Link from 'next/link';
import EarlyAccessShell from '@/components/sites/nooes/EarlyAccessShell';
import EarlyAccessForm from '@/components/sites/nooes/EarlyAccessForm';

export const metadata: Metadata = {
  title: 'Early Access | Nooes',
  description: 'Request early access to Nooes.',
};

export default function EarlyAccessPage() {
  const web3FormsAccessKey = process.env.WEB3FORMS_ACCESS_KEY ?? '';

  return (
    <EarlyAccessShell>
      <div className="flex min-h-[calc(100vh-220px)] w-full max-w-6xl flex-col justify-between gap-16">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <section className="order-2 lg:order-1">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-zinc-500">
              {'// Tell us a little about you'}
            </p>
            <EarlyAccessForm accessKey={web3FormsAccessKey} />
          </section>

          <section className="order-1 lg:order-2 lg:pl-12">
            <h1 className="text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
              Early
              <span className="block pl-6 sm:pl-10 lg:pl-24">access</span>
            </h1>
            <p className="mt-8 max-w-md text-sm leading-7 text-zinc-400">
              It is important for us to keep in touch with you. If you would like early access to
              Nooes, share a few details and we’ll email you when it is available.
            </p>
          </section>
        </div>

        <footer className="grid grid-cols-1 gap-8 border-t border-border pt-8 sm:grid-cols-3">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.16em] text-zinc-500">
              Documentation
            </p>
            <Link
              href="/docs"
              className="mt-2 inline-block text-sm text-zinc-300 transition-colors hover:text-white"
            >
              Read the docs
            </Link>
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.16em] text-zinc-500">
              About
            </p>
            <Link
              href="/about"
              className="mt-2 inline-block text-sm text-zinc-300 transition-colors hover:text-white"
            >
              About Nooes
            </Link>
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.16em] text-zinc-500">
              Support
            </p>
            <a
              href="mailto:support@nooes.ai"
              className="mt-2 inline-block text-sm text-zinc-300 transition-colors hover:text-white"
            >
              support@nooes.ai
            </a>
          </div>
        </footer>
      </div>
    </EarlyAccessShell>
  );
}
