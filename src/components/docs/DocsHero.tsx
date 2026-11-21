"use client";

import * as React from "react";
import Link from "next/link";
import { Terminal, Laptop, Check, Copy } from "lucide-react";

export function DocsHero() {
  const [activeTab, setActiveTab] = React.useState<"cli" | "desktop">("cli");
  const [activePkg, setActivePkg] = React.useState<"npm" | "bun" | "brew" | "curl">("npm");
  const [copied, setCopied] = React.useState(false);

  const commands: Record<string, string> = {
    npm: "nooes",
    bun: "nooes",
    brew: "nooes",
    curl: "nooes",
  };

  const currentCommand = commands[activePkg];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="not-prose border border-dashed border-border rounded-lg overflow-hidden bg-background mb-10 shadow-xs">
      {/* 2-Column Split: Headline vs. Interactive Install Widget */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-dashed divide-border">
        {/* Left Headline */}
        <div className="flex flex-col justify-between p-6 sm:p-7 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="size-2 rounded-full bg-brand-text animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                An AI Coding IDE
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug">
              Think in Code. <span className="text-brand-text">Build Beyond.</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
              Nooes is an AI coding IDE with an agent that plans, edits and tests your code.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-foreground">
              <span>Early access</span>
            </span>
          </div>
        </div>

        {/* Right Install Tabs & Terminal Box */}
        <div className="flex flex-col justify-between p-6 sm:p-7 gap-4 bg-muted/5">
          {/* Main Mode Tabs */}
          <div className="flex items-center gap-6 border-b border-dashed border-border pb-3">
            <button
              onClick={() => setActiveTab("cli")}
              className={`font-mono text-[11px] uppercase tracking-widest pb-1 transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === "cli"
                  ? "border-b-2 border-foreground text-foreground font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Terminal className="size-3.5" />
              <span>CLI</span>
            </button>
            <button
              onClick={() => setActiveTab("desktop")}
              className={`font-mono text-[11px] uppercase tracking-widest pb-1 transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === "desktop"
                  ? "border-b-2 border-foreground text-foreground font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Laptop className="size-3.5" />
              <span>Desktop App</span>
            </button>
          </div>

          {activeTab === "cli" ? (
            <div className="space-y-3">
              {/* Package Manager Sub-pills */}
              <div className="flex items-center gap-1.5 font-mono text-[10px]">
                {(["npm", "bun", "brew", "curl"] as const).map((pkg) => (
                  <button
                    key={pkg}
                    onClick={() => setActivePkg(pkg)}
                    className={`px-2.5 py-1 rounded transition-colors uppercase cursor-pointer ${
                      activePkg === pkg
                        ? "bg-foreground text-background font-bold"
                        : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {pkg}
                  </button>
                ))}
              </div>

              {/* Terminal Snippet Box with prompt ➜ */}
              <div className="flex items-center justify-between gap-3 bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 font-mono text-xs text-zinc-200 shadow-inner">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-cyan-400 select-none">➜</span>
                  <span className="text-zinc-500 select-none">~</span>
                  <span className="truncate">{currentCommand}</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="size-3 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <a
                href="mailto:support@nooes.ai"
                className="text-xs font-mono font-bold px-3 py-1 rounded bg-brand text-brand-foreground hover:opacity-90 transition-opacity shrink-0"
              >
                Request early access
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

