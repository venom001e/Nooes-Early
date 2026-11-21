import type { Metadata } from 'next';
import Link from 'next/link';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: "Privacy | Nooes",
  description: "How Nooes collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center w-full overflow-x-clip bg-black text-white min-h-screen font-sans">
        
        {/* Navigation Bar */}
        <nav className="flex items-center w-full h-[85px] px-6 sm:px-8 fixed top-0 z-50 bg-black border-b border-border">
          <div className="flex items-center justify-between w-full lg:w-[1189px] mx-auto">
            {/* Logo */}
            <div className="shrink-0">
              <Link href="/" className="block">
                <img 
                  src="/logos/nooes-logo.png" 
                  alt="Nooes" 
                  className="h-auto w-36 sm:w-40 select-none invert" 
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
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
                  <Link href="/contact" className="inline-flex h-9 items-center justify-center rounded-full px-4 py-2 hover:text-white hover:bg-zinc-900 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Mobile Menu Trigger */}
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

        {/* Main Content Area */}
        <main className="w-full min-h-screen pt-[120px] pb-24 px-4 sm:px-6 lg:px-8 bg-black text-zinc-300 flex justify-center">
          <div className="w-full max-w-4xl border border-border bg-black rounded-lg p-6 sm:p-10 lg:p-12">
            
            {/* Header */}
            <div className="border-b border-border pb-8 mb-10">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
                Privacy Policy
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 font-mono">
                Last updated: November 12, 2026
              </p>
              <div className="mt-4 p-4 rounded border border-border bg-zinc-950 text-xs sm:text-sm text-zinc-400 leading-relaxed font-mono">
                <span className="text-white font-semibold">Notice:</span> This policy is pending legal review before launch. [FILL: to be written by a lawyer before launch]
              </div>
            </div>

            {/* Table of Contents */}
            <nav aria-label="Table of Contents" className="mb-12 p-6 rounded border border-border bg-zinc-950">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4 font-semibold">
                // Table of Contents
              </h2>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-mono text-zinc-400">
                <li><a href="#who-we-are" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">01.</span> Who We Are</a></li>
                <li><a href="#device-data" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">02.</span> What Stays on Your Device</a></li>
                <li><a href="#model-providers" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">03.</span> What Is Sent to Model Providers</a></li>
                <li><a href="#share-links" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">04.</span> Share Links &amp; Session Snapshots</a></li>
                <li><a href="#free-hosted-models" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">05.</span> Free &amp; Hosted Models</a></li>
                <li><a href="#analytics-telemetry" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">06.</span> Analytics &amp; Telemetry</a></li>
                <li><a href="#payments" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">07.</span> Payments</a></li>
                <li><a href="#email-contact-form" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">08.</span> Email List &amp; Contact Forms</a></li>
                <li><a href="#retention-deletion" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">09.</span> Data Retention &amp; Deletion</a></li>
                <li><a href="#children" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">10.</span> Children&apos;s Privacy</a></li>
                <li><a href="#your-rights" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">11.</span> Your Privacy Rights</a></li>
                <li><a href="#security" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">12.</span> Security</a></li>
                <li><a href="#changes" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">13.</span> Changes to This Policy</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">14.</span> Contact Us</a></li>
              </ol>
            </nav>

            {/* Sections */}
            <article className="space-y-12 text-zinc-300 leading-relaxed text-sm sm:text-base">
              
              {/* 01. Who We Are */}
              <section id="who-we-are" className="scroll-mt-32 pt-4 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 01</span> Who We Are
                </h2>

                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 02. What Stays on Your Device */}
              <section id="device-data" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 02</span> What Stays on Your Device
                </h2>

                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 03. What Is Sent to Model Providers */}
              <section id="model-providers" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 03</span> What Is Sent to Model Providers
                </h2>

                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 04. Share Links & Session Snapshots */}
              <section id="share-links" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 04</span> Share Links &amp; Session Snapshots
                </h2>

                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 05. Free Hosted Models */}
              <section id="free-hosted-models" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 05</span> Free &amp; Hosted Models
                </h2>

                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 06. Analytics and Telemetry */}
              <section id="analytics-telemetry" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 06</span> Analytics &amp; Telemetry
                </h2>

                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 07. Payments */}
              <section id="payments" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 07</span> Payments
                </h2>

                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 08. Email List and Contact Forms */}
              <section id="email-contact-form" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 08</span> Email List &amp; Contact Forms
                </h2>

                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 09. Data Retention and Deletion */}
              <section id="retention-deletion" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 09</span> Data Retention &amp; Deletion
                </h2>

                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 10. Children's Privacy */}
              <section id="children" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 10</span> Children&apos;s Privacy
                </h2>
                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 11. Your Privacy Rights */}
              <section id="your-rights" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 11</span> Your Privacy Rights
                </h2>

                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 12. Security */}
              <section id="security" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 12</span> Security
                </h2>

                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 13. Changes to This Policy */}
              <section id="changes" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 13</span> Changes to This Policy
                </h2>

                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 14. Contact Us */}
              <section id="contact" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 14</span> Contact Us
                </h2>
                <p className="mb-4">[FILL: to be written by a lawyer before launch]</p>
                <div className="p-5 rounded border border-border bg-zinc-950 font-mono text-xs sm:text-sm space-y-2 text-zinc-400">
                  <p><span className="text-zinc-600">Privacy Desk:</span> <a href="mailto:support@nooes.ai" className="text-white underline hover:text-zinc-400">support@nooes.ai</a></p>
                  <p><span className="text-zinc-600">Security Reports:</span> <a href="mailto:support@nooes.ai" className="text-white underline hover:text-zinc-400">support@nooes.ai</a></p>
                  
                  <p><span className="text-zinc-600">Terms of Service:</span> <Link href="/terms" className="text-white underline hover:text-zinc-400">Terms of Service &rarr;</Link></p>
                </div>
              </section>

            </article>

            {/* Bottom Footer Navigation */}
            <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
              <span>Nooes</span>
              <div className="flex items-center gap-4">
                <Link href="/terms" className="hover:text-white underline underline-offset-4 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/docs/privacy" className="hover:text-white underline underline-offset-4 transition-colors">
                  Docs: Privacy &amp; Data
                </Link>
                <Link href="/" className="hover:text-white transition-colors">
                  &larr; Home
                </Link>
              </div>
            </div>

          </div>
        </main>

        {/* Global Interaction Script */}
        <SiteInteractions />

      </div>
    </>
  );
}
