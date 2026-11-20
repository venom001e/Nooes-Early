import type { Metadata } from 'next';
import Link from 'next/link';
import SiteInteractions from '@/components/sites/nooes/SiteInteractions';

export const metadata: Metadata = {
  title: "Privacy Policy - Nooes",
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
                Privacy Policy
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 font-mono">
                Last updated: November 12, 2026
              </p>
              <div className="mt-4 p-4 rounded border border-border bg-zinc-950 text-xs sm:text-sm text-zinc-400 leading-relaxed font-mono">
                <span className="text-white font-semibold">Notice:</span> Nooes is an autonomous, local-first developer tool. We do not operate a centralized source-code gateway. You maintain custody of your files, local environment, and provider credentials. Have your legal counsel review the specifics for your organization.
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
                <li><a href="#accounts-payments" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-zinc-600">07.</span> Accounts &amp; Payments</a></li>
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
                <p className="mb-3">
                  This Privacy Policy applies to the software, tools, and websites operated under the <strong className="text-white">Nooes</strong> brand (including the CLI, desktop binary, and web portal at <a href="https://nooes.dev" className="text-white underline underline-offset-4 hover:text-zinc-400">nooes.dev</a>).
                </p>
                <div className="p-4 rounded border border-border bg-zinc-950 font-mono text-xs text-zinc-400 space-y-1">
                  <p><span className="text-zinc-600">Organization:</span> Nooes Development Team [FILL: Entity Name]</p>
                  <p><span className="text-zinc-600">Mailing Address:</span> [FILL: company address]</p>
                  <p><span className="text-zinc-600">Privacy Officer:</span> <a href="mailto:privacy@nooes.dev" className="text-white underline hover:text-zinc-400">privacy@nooes.dev</a> [FILL]</p>
                </div>
              </section>

              {/* 02. What Stays on Your Device */}
              <section id="device-data" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 02</span> What Stays on Your Device
                </h2>
                <p className="mb-4">
                  Nooes is built on local-first engineering principles. We do not operate a remote intermediary proxy that reads, buffers, or retains your codebase by default.
                </p>
                <ul className="list-disc list-inside space-y-2 text-zinc-400 pl-2 text-sm sm:text-base">
                  <li><strong className="text-white">Your Source Code:</strong> Files, directories, language server indexing databases, and git histories remain strictly on your local machine.</li>
                  <li><strong className="text-white">Prompts and Transcripts:</strong> Conversation logs, interactive tool outputs, and local agent memory are stored in your user configuration directory (<code className="text-xs bg-zinc-950 px-1.5 py-0.5 rounded border border-border text-zinc-300">~/.config/nooes/</code>).</li>
                  <li><strong className="text-white">API Credentials:</strong> Third-party provider keys (OpenAI, Anthropic, Gemini, xAI) are saved locally on your filesystem or in your OS keychain, and are never synced to our servers.</li>
                </ul>
                <div className="mt-4 p-4 rounded border border-border bg-zinc-950 text-xs sm:text-sm text-zinc-400 font-mono">
                  Principle: Unless you explicitly create a public share link or send a prompt to an external model provider, Nooes transmits zero proprietary code over the internet.
                </div>
              </section>

              {/* 03. What Is Sent to Model Providers */}
              <section id="model-providers" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 03</span> What Is Sent to Model Providers
                </h2>
                <p className="mb-3">
                  When you prompt an AI model, Nooes establishes a direct HTTPS connection from your device to that provider&apos;s API endpoint. It transmits only the prompt text and the specific file snippets or unified diffs necessary for the model to complete the request.
                </p>
                <p className="mb-4 text-zinc-400 text-xs sm:text-sm">
                  Your data handling is governed directly by your customer contract with that provider:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="p-3 rounded border border-border bg-zinc-950 hover:bg-zinc-900 transition-colors flex items-center justify-between text-zinc-300">
                    <span>OpenAI Privacy Policy</span>
                    <span className="text-zinc-600">&rarr;</span>
                  </a>
                  <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="p-3 rounded border border-border bg-zinc-950 hover:bg-zinc-900 transition-colors flex items-center justify-between text-zinc-300">
                    <span>Anthropic Privacy Policy</span>
                    <span className="text-zinc-600">&rarr;</span>
                  </a>
                  <a href="https://x.ai/privacy" target="_blank" rel="noopener noreferrer" className="p-3 rounded border border-border bg-zinc-950 hover:bg-zinc-900 transition-colors flex items-center justify-between text-zinc-300">
                    <span>xAI Privacy Policy</span>
                    <span className="text-zinc-600">&rarr;</span>
                  </a>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="p-3 rounded border border-border bg-zinc-950 hover:bg-zinc-900 transition-colors flex items-center justify-between text-zinc-300">
                    <span>Google Gemini Privacy Policy</span>
                    <span className="text-zinc-600">&rarr;</span>
                  </a>
                </div>
                <p className="mt-4 text-xs text-zinc-500 font-mono">
                  Local Models: If you configure a local provider running on localhost (Ollama, llama.cpp), 100% of the computation executes locally. Zero network packets leave your workstation.
                </p>
              </section>

              {/* 04. Share Links & Session Snapshots */}
              <section id="share-links" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 04</span> Share Links &amp; Session Snapshots
                </h2>
                <p className="mb-3">
                  Nooes offers an optional <code className="text-xs bg-zinc-950 px-1.5 py-0.5 rounded border border-border text-zinc-300">/share</code> command to generate web snapshots of debugging sessions:
                </p>
                <ul className="list-disc list-inside space-y-2 text-zinc-400 pl-2 text-sm sm:text-base">
                  <li><strong className="text-white">What is stored:</strong> A transcript of the prompt trajectory, proposed diffs, and execution outputs for that specific session. Secret patterns and authorization tokens are scrubbed prior to upload.</li>
                  <li><strong className="text-white">Accessibility:</strong> Share links are unlisted and viewable by anyone with the unique URL string. Do not generate share links for proprietary or confidential code without authorization.</li>
                  <li><strong className="text-white">Retention &amp; Deletion:</strong> Share links are retained for up to 90 days [CONFIRM] unless manually removed. You can delete any share link directly from your CLI session history or by contacting us.</li>
                </ul>
              </section>

              {/* 05. Free Hosted Models */}
              <section id="free-hosted-models" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 05</span> Free &amp; Hosted Models
                </h2>
                <p className="mb-3">
                  When accessing free community-hosted model relays provided for convenience (if available):
                </p>
                <ul className="list-disc list-inside space-y-2 text-zinc-400 pl-2 text-sm">
                  <li>Prompts may pass through temporary rate-limiting buffers to protect infrastructure integrity and prevent denial-of-service abuse.</li>
                  <li>Buffer logs are purged within 14 days and are never used to train foundation models without affirmative consent.</li>
                  <li>You can bypass community relays at any time by configuring private API keys or selecting local models.</li>
                </ul>
              </section>

              {/* 06. Analytics and Telemetry */}
              <section id="analytics-telemetry" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 06</span> Analytics &amp; Telemetry
                </h2>
                <p className="mb-3">
                  We collect minimal, anonymous operational telemetry strictly for stability:
                </p>
                <ul className="list-disc list-inside space-y-2 text-zinc-400 pl-2 text-sm">
                  <li><strong className="text-white">CLI and Desktop Client:</strong> Collects anonymous OS type, client version, and unhandled crash diagnostics. It never captures file paths, code contents, or prompt strings.</li>
                  <li><strong className="text-white">Opt-Out Command:</strong> Run <code className="text-xs bg-zinc-950 px-1.5 py-0.5 rounded border border-border text-zinc-300">nooes config set telemetry false</code> or add <code className="text-xs bg-zinc-950 px-1.5 py-0.5 rounded border border-border text-zinc-300">{`{"telemetry": false}`}</code> in your settings file to permanently disable telemetry.</li>
                  <li><strong className="text-white">Website:</strong> Our landing page utilizes privacy-friendly, cookie-less metrics to observe aggregate traffic volume.</li>
                </ul>
              </section>

              {/* 07. Accounts and Payments */}
              <section id="accounts-payments" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 07</span> Accounts &amp; Payments
                </h2>
                <p className="mb-3">
                  No account registration is mandatory to run the Nooes CLI. If you use paid collaboration or enterprise features:
                </p>
                <ul className="list-disc list-inside space-y-2 text-zinc-400 pl-2 text-sm">
                  <li>We collect your authentication identity (e.g. GitHub handle, work email address).</li>
                  <li>Billing transactions are managed through third-party payment processors (such as Stripe). We do not store or process raw credit card numbers on our infrastructure.</li>
                </ul>
              </section>

              {/* 08. Email List and Contact Forms */}
              <section id="email-contact-form" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 08</span> Email List &amp; Contact Forms
                </h2>
                <p className="mb-3">
                  When you submit inquiries through our contact forms or join our release mailing list:
                </p>
                <ul className="list-disc list-inside space-y-2 text-zinc-400 pl-2 text-sm">
                  <li>We collect your submitted details (name, email address, phone number, and message).</li>
                  <li>This information is used strictly to respond to your technical inquiries, enterprise evaluations, or product updates.</li>
                  <li>You may opt out from communications at any time. We do not sell or monetize personal data with third-party brokers.</li>
                </ul>
              </section>

              {/* 09. Data Retention and Deletion */}
              <section id="retention-deletion" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 09</span> Data Retention &amp; Deletion
                </h2>
                <p className="mb-3">
                  Local data resides entirely under your ownership. Deleting your local configuration folder (<code className="text-xs bg-zinc-950 px-1.5 py-0.5 rounded border border-border text-zinc-300">rm -rf ~/.config/nooes</code>) immediately removes all keys, session history, and cached indices.
                </p>
                <p className="text-sm text-zinc-400">
                  To request the deletion of cloud-held data (newsletter subscriptions, enterprise inquiries, or generated share links), email <a href="mailto:privacy@nooes.dev" className="text-white underline hover:text-zinc-400 font-mono">privacy@nooes.dev</a> with the subject &ldquo;Data Deletion Request&rdquo;. Requests are processed within 30 days.
                </p>
              </section>

              {/* 10. Children's Privacy */}
              <section id="children" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 10</span> Children&apos;s Privacy
                </h2>
                <p className="text-zinc-400">
                  Nooes is a software engineering platform intended for individuals aged 13 and older (or 16 where required by local statute). We do not knowingly solicit or collect data from children. If you become aware that a minor has submitted personal information, please inform us for prompt deletion.
                </p>
              </section>

              {/* 11. Your Privacy Rights */}
              <section id="your-rights" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 11</span> Your Privacy Rights
                </h2>
                <p className="mb-3">
                  Subject to your local jurisdiction (GDPR, CCPA, India DPDP Act), you hold enforceable rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-zinc-400 pl-2 text-sm">
                  <li><strong className="text-white">Access &amp; Portability:</strong> Request confirmation and an exportable copy of data we hold.</li>
                  <li><strong className="text-white">Rectification:</strong> Correct incomplete or inaccurate records.</li>
                  <li><strong className="text-white">Erasure:</strong> Request the deletion of cloud-held records.</li>
                  <li><strong className="text-white">Objection:</strong> Opt out of processing for legitimate interests or automated evaluation.</li>
                </ul>
                <p className="mt-3 text-xs text-zinc-500 font-mono">
                  Submit requests directly to our privacy desk at <a href="mailto:privacy@nooes.dev" className="text-white underline hover:text-zinc-400">privacy@nooes.dev</a>.
                </p>
              </section>

              {/* 12. Security */}
              <section id="security" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 12</span> Security
                </h2>
                <p className="mb-3">
                  We believe in pragmatic security engineering. We avoid marketing promises of &ldquo;unhackable&rdquo; infrastructure; instead, our local-first architecture eliminates cloud honeypots. We cannot expose your proprietary source code because we do not ingest it.
                </p>
                <p className="text-sm text-zinc-400">
                  Remote interactions (model provider communications, CLI update verification, share-link publishing) strictly enforce TLS 1.3 encryption in transit. Report suspected vulnerabilities to <a href="mailto:security@nooes.dev" className="text-white underline hover:text-zinc-400 font-mono">security@nooes.dev</a>.
                </p>
              </section>

              {/* 13. Changes to This Policy */}
              <section id="changes" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 13</span> Changes to This Policy
                </h2>
                <p className="text-zinc-400">
                  As new platform integrations ship, we may revise this policy. Notice of substantive amendments will be reflected by the &ldquo;Last updated&rdquo; timestamp and highlighted in release notes within our official code repository.
                </p>
              </section>

              {/* 14. Contact Us */}
              <section id="contact" className="scroll-mt-32 pt-6 border-t border-border">
                <h2 className="text-base sm:text-lg font-mono font-semibold text-white mb-3">
                  <span className="text-zinc-600">// 14</span> Contact Us
                </h2>
                <p className="mb-4">
                  For questions, data inquiries, or compliance notices:
                </p>
                <div className="p-5 rounded border border-border bg-zinc-950 font-mono text-xs sm:text-sm space-y-2 text-zinc-400">
                  <p><span className="text-zinc-600">Privacy Desk:</span> <a href="mailto:privacy@nooes.dev" className="text-white underline hover:text-zinc-400">privacy@nooes.dev</a></p>
                  <p><span className="text-zinc-600">Security Reports:</span> <a href="mailto:security@nooes.dev" className="text-white underline hover:text-zinc-400">security@nooes.dev</a></p>
                  <p><span className="text-zinc-600">Community:</span> <a href="https://discord.gg/nooes" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-zinc-400">Discord Community</a></p>
                  <p><span className="text-zinc-600">Terms of Service:</span> <Link href="/terms" className="text-white underline hover:text-zinc-400">Terms of Service &rarr;</Link></p>
                </div>
              </section>

            </article>

            {/* Bottom Footer Navigation */}
            <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
              <span>Nooes &middot; Local-First Autonomous AI Engineering</span>
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
