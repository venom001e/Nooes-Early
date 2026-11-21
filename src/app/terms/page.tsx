import type { Metadata } from "next";
import Link from "next/link";
import SiteInteractions from "@/components/sites/nooes/SiteInteractions";

export const metadata: Metadata = {
  title: "Terms of Service - Nooes",
  description: "Terms of Service for the Nooes developer tools and website.",
};

export default function TermsPage() {
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
                  <Link href="/enterprise" className="inline-flex h-9 items-center justify-center rounded-full px-4 py-2 hover:text-white hover:bg-zinc-900 transition-colors">
                    Enterprise
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="inline-flex h-9 items-center justify-center rounded-full px-4 py-2 hover:text-white hover:bg-zinc-900 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
              <Link 
                href="/signup" 
                className="inline-flex items-center justify-center rounded-full bg-white text-black font-semibold px-5 py-2 text-xs sm:text-sm hover:bg-zinc-200 transition-colors"
              >
                Sign Up
              </Link>
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
                Terms of Service
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 font-mono">
                Last updated: November 12, 2026
              </p>
              <div className="mt-4 p-4 rounded border border-border bg-zinc-950 text-xs sm:text-sm text-zinc-400 leading-relaxed font-mono">
                <span className="text-white font-semibold">Notice:</span> Nooes is proprietary software. These terms govern your use of the Nooes desktop application, share services, and web portal. Please have legal counsel review before commercial deployment.
              </div>
            </div>

            {/* Table of Contents */}
            <nav aria-label="Table of Contents" className="mb-12 p-6 rounded border border-border bg-zinc-950">
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4 font-semibold">
                // Table of Contents
              </h2>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-mono text-zinc-400">
                <li><a href="#acceptance" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">01.</span> Acceptance &amp; Eligibility</a></li>
                <li><a href="#software-license" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">02.</span> The Software</a></li>
                <li><a href="#your-code" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">03.</span> Your Content &amp; Your Code</a></li>
                <li><a href="#model-providers" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">04.</span> Third-Party Model Providers &amp; Keys</a></li>
                <li><a href="#ai-output-disclaimer" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">05.</span> AI Output Disclaimer</a></li>
                <li><a href="#acceptable-use" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">06.</span> Acceptable Use</a></li>
                <li><a href="#share-links" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">07.</span> Share Links &amp; Hosted Features</a></li>
                <li><a href="#trademarks-brand" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">08.</span> Trademarks &amp; Brand Assets</a></li>
                <li><a href="#warranty-liability" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">09.</span> No Warranty &amp; Limitation of Liability</a></li>
                <li><a href="#termination" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">10.</span> Termination of Hosted Access</a></li>
                <li><a href="#governing-law" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">11.</span> Governing Law &amp; Dispute Resolution</a></li>
                <li><a href="#changes-contact" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">12.</span> Changes &amp; Contact Information</a></li>
              </ol>
            </nav>

            {/* Sections */}
            <article className="space-y-12 text-zinc-300 leading-relaxed text-sm sm:text-base">
              
              {/* 01. Acceptance of terms and who may use Nooes */}
              <section id="acceptance" className="scroll-mt-32 pt-4 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 01</span> Acceptance &amp; Eligibility
                </h2>
                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 02. The software */}
              <section id="software-license" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 02</span> The Software
                </h2>
                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 03. Your content and your code */}
              <section id="your-code" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 03</span> Your Content &amp; Your Code
                </h2>
                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 04. Third-party model providers */}
              <section id="model-providers" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 04</span> Third-Party Model Providers &amp; Keys
                </h2>
                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 05. AI output disclaimer */}
              <section id="ai-output-disclaimer" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 05</span> AI Output Disclaimer
                </h2>
                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 06. Acceptable use */}
              <section id="acceptable-use" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 06</span> Acceptable Use
                </h2>
                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 07. Share links and hosted features */}
              <section id="share-links" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 07</span> Share Links &amp; Hosted Features
                </h2>
                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 08. Trademarks and brand */}
              <section id="trademarks-brand" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 08</span> Trademarks &amp; Brand Assets
                </h2>
                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 09. No warranty and limitation of liability */}
              <section id="warranty-liability" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 09</span> Disclaimer of Warranty &amp; Limitation of Liability
                </h2>
                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 10. Termination of access to hosted features */}
              <section id="termination" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 10</span> Termination of Hosted Access
                </h2>
                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 11. Governing law and disputes */}
              <section id="governing-law" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 11</span> Governing Law &amp; Dispute Resolution
                </h2>
                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

              {/* 12. Changes to these terms and contact email */}
              <section id="changes-contact" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 12</span> Changes &amp; Contact Information
                </h2>
                <p className="mb-3">[FILL: to be written by a lawyer before launch]</p>
              </section>

            </article>

            {/* Bottom Footer Navigation */}
            <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
              <span>Nooes &middot; Developer Tools</span>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="hover:text-white underline underline-offset-4 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/docs" className="hover:text-white underline underline-offset-4 transition-colors">
                  Docs
                </Link>
                <Link href="/" className="hover:text-white transition-colors">
                  &larr; Home
                </Link>
              </div>
            </div>

          </div>
        </main>

        <SiteInteractions />

      </div>
    </>
  );
}
