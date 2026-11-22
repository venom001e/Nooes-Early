import type { ReactNode } from 'react';
import Link from 'next/link';
import SiteInteractions from './SiteInteractions';

export default function EarlyAccessShell({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center w-full overflow-x-clip bg-black text-white min-h-screen font-sans">
        <nav className="flex items-center w-full h-[85px] px-6 sm:px-8 fixed top-0 z-50 bg-black border-b border-border">
          <div className="flex items-center justify-between w-full lg:w-[1189px] mx-auto">
            <div className="shrink-0">
              <Link href="/" className="block">
                <img
                  src="/logos/nooes-logo.png"
                  alt="Nooes"
                  className="h-auto w-36 sm:w-40 select-none invert"
                />
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <ul className="flex items-center space-x-1 font-medium text-sm text-zinc-400">
                <li>
                  <Link href="/docs" className="inline-flex h-9 items-center justify-center rounded-full px-4 py-2 hover:text-white hover:bg-zinc-900 transition-colors">
                    Docs
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="inline-flex h-9 items-center justify-center rounded-full px-4 py-2 hover:text-white hover:bg-zinc-900 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="inline-flex h-9 items-center justify-center rounded-full px-4 py-2 hover:text-white hover:bg-zinc-900 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="inline-flex h-9 items-center justify-center rounded-full px-4 py-2 hover:text-white hover:bg-zinc-900 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/enterprise" className="inline-flex h-9 items-center justify-center rounded-full px-4 py-2 hover:text-white hover:bg-zinc-900 transition-colors">
                    Enterprise
                  </Link>
                </li>
                <li>
                  <Link href="/early-access" className="inline-flex h-9 items-center justify-center rounded-full px-4 py-2 text-white bg-zinc-900 transition-colors">
                    Early access
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="inline-flex h-9 items-center justify-center rounded-full px-4 py-2 hover:text-white hover:bg-zinc-900 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="lg:hidden p-2 text-zinc-400 hover:text-white"
              aria-label="Open main menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </nav>

        <main className="w-full min-h-screen pt-[120px] pb-24 px-4 sm:px-6 lg:px-8 bg-black text-zinc-300 flex justify-center">
          {children}
        </main>
      </div>
      <SiteInteractions />
    </>
  );
}
