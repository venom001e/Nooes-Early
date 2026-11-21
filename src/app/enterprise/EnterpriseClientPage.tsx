"use client";

import * as React from "react";
import Link from "next/link";
import SiteInteractions from "@/components/sites/nooes/SiteInteractions";

const FAQS = [
  {
    q: "What is Nooes?",
    a: "Nooes is an AI coding IDE with an agent that plans, edits and tests your code. Nooes is a desktop application.",
  },
  {
    q: "Is Nooes open source?",
    a: "No. Nooes is proprietary software.",
  },
  {
    q: "What does it cost?",
    a: "Nooes is in early access. Pricing will be announced soon.",
  },
  {
    q: "More questions?",
    a: "Email us at support@nooes.ai.",
  },
];

export default function EnterprisePage() {

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
                  <Link href="/enterprise" className="inline-flex h-9 items-center justify-center rounded-full px-4 py-2 text-white bg-zinc-900 transition-colors">
                    Enterprise
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

        {/* Content Container */}
        <main className="w-full min-h-screen pt-[130px] pb-24 px-4 sm:px-6 lg:px-8 bg-black text-zinc-300 flex justify-center">
          <div className="w-full max-w-4xl space-y-16">
            
            {/* 1. Hero Section */}
            <div className="border border-border bg-black rounded-lg p-8 sm:p-12 text-start relative overflow-hidden">
              <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">
                // Enterprise Solutions
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                Your code is yours
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-4">
                Nooes is an AI coding IDE with an agent that plans, edits and tests your code. Nooes is a desktop application.
              </p>
              <p className="text-sm font-mono text-zinc-400">
                Let us know how we can help.
              </p>
            </div>

            {/* 2. Contact Section */}
            <div className="border border-border bg-black rounded-lg p-8 sm:p-12">
              <div className="mb-8 border-b border-border pb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  Contact us
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 font-mono">
                  Email us at support@nooes.ai.
                </p>
              </div>
              <div className="pt-2">
                <a
                  href="mailto:support@nooes.ai"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors"
                >
                  Contact us
                </a>
              </div>
            </div>

            {/* 3. FAQ Section */}
            <div className="border border-border bg-black rounded-lg p-8 sm:p-12">
              <div className="mb-8 border-b border-border pb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  Enterprise FAQ
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 font-mono">
                  Frequently asked questions about enterprise deployment.
                </p>
              </div>

              <div className="space-y-6">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
                    <h3 className="text-sm sm:text-base font-semibold text-white mb-2 flex items-start gap-2">
                      <span className="text-zinc-600 font-mono text-xs mt-0.5">//</span>
                      <span>{faq.q}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pl-5">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
              <span>Nooes &middot; Enterprise Solutions</span>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
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
