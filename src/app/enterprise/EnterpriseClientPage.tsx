"use client";

import * as React from "react";
import Link from "next/link";
import SiteInteractions from "@/components/sites/nooes/SiteInteractions";

interface FormData {
  fullName: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

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
  const [formData, setFormData] = React.useState<FormData>({
    fullName: "",
    role: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = React.useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: All fields required
    if (
      !formData.fullName.trim() ||
      !formData.role.trim() ||
      !formData.company.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.message.trim()
    ) {
      setStatus("error");
      setErrorMessage("All fields are required.");
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus("error");
      setErrorMessage("Invalid email format.");
      return;
    }

    setStatus("sending");

    try {
      // Simulate submission endpoint
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
      setFormData({
        fullName: "",
        role: "",
        company: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch {
      setStatus("error");
      setErrorMessage("Internal server error.");
    }
  };

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

            {/* 2. Contact Form Section */}
            <div className="border border-border bg-black rounded-lg p-8 sm:p-12">
              <div className="mb-8 border-b border-border pb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  Connect with our team
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 font-mono">
                  Tell us about your organization and requirements.
                </p>
              </div>

              {status === "success" ? (
                <div className="p-6 rounded border border-border bg-zinc-950 text-center space-y-3">
                  <div className="text-sm sm:text-base font-semibold text-white">
                    Message sent, we&apos;ll be in touch soon.
                  </div>
                  <p className="text-xs text-zinc-500 font-mono">
                    A team member will reach out to your company email.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-4 py-2 text-xs font-mono uppercase tracking-wider rounded border border-border bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === "error" && (
                    <div className="p-4 rounded border border-border bg-zinc-950 text-xs sm:text-sm text-white font-mono">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                        Full name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Alex Morgan"
                        className="w-full px-3.5 py-2.5 rounded border border-border bg-zinc-950 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 transition-colors"
                      />
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                      <label htmlFor="role" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                        Role *
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="VP of Engineering / Tech Lead"
                        className="w-full px-3.5 py-2.5 rounded border border-border bg-zinc-950 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Company */}
                    <div className="space-y-2">
                      <label htmlFor="company" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                        Company *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Inc"
                        className="w-full px-3.5 py-2.5 rounded border border-border bg-zinc-950 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 transition-colors"
                      />
                    </div>

                    {/* Company Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                        Company email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 rounded border border-border bg-zinc-950 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                      Phone number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 234 567 8900"
                      className="w-full px-3.5 py-2.5 rounded border border-border bg-zinc-950 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                      What problem are you trying to solve? *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="We need help with deploying autonomous agents inside our isolated developer clusters..."
                      className="w-full px-3.5 py-2.5 rounded border border-border bg-zinc-950 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 transition-colors resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {status === "sending" ? "Sending..." : "Send"}
                    </button>
                  </div>
                </form>
              )}
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
