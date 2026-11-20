"use client";

import * as React from "react";
import { Cpu, SplitSquareVertical, Share2, KeyRound, UserCheck, TerminalSquare } from "lucide-react";

const CAPABILITIES = [
  {
    title: "LSP Support",
    subtitle: "Automatic Language Servers",
    description: "Loads the correct semantic language servers automatically so the model understands types, definitions, and module boundaries.",
    icon: Cpu,
    stat: "100%",
    statLabel: "semantic",
  },
  {
    title: "Multi-Session",
    subtitle: "Parallel Isolated Threads",
    description: "Run multiple independent coding agents in parallel across the same repository without race conditions or state collisions.",
    icon: SplitSquareVertical,
    stat: "∞",
    statLabel: "concurrent",
  },
  {
    title: "Share Links",
    subtitle: "Encrypted Trajectory Snapshots",
    description: "Generate interactive read-only URLs to share full session traces and surgical diffs with your team for collaborative debugging.",
    icon: Share2,
    stat: "/share",
    statLabel: "command",
  },
  {
    title: "Bring Your Own Model",
    subtitle: "Cloud & Local Inference",
    description: "Connect OpenAI, Anthropic, Gemini, or run offline models via Ollama. Direct billing with your provider.",
    icon: KeyRound,
    stat: "BYOK",
    statLabel: "direct",
  },
  {
    title: "Existing Subscriptions",
    subtitle: "GitHub Copilot & More",
    description: "Leverage the subscriptions you already pay for. Sign in with GitHub Copilot or supported provider accounts with ease.",
    icon: UserCheck,
    stat: "OAuth",
    statLabel: "compatible",
  },
  {
    title: "Any Editor",
    subtitle: "Terminal, Desktop & IDE",
    description: "Works seamlessly across terminal windows, a native desktop application, or embedded inside VS Code, Cursor, and JetBrains.",
    icon: TerminalSquare,
    stat: "Any OS",
    statLabel: "native",
  },
];

export function FeatureCards() {
  return (
    <div className="not-prose border border-dashed border-border rounded-lg overflow-hidden bg-background my-8">
      {/* Header */}
      <div className="border-b border-dashed border-border px-5 py-3.5 bg-muted/20 flex items-center justify-between">
        <h2 className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground flex items-center gap-2 m-0">
          <span className="text-muted-foreground/60 tracking-[-0.2em] font-mono mr-1">{"//"}</span>
          Take Command. Of your code.
        </h2>
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:inline">
          Architectural Capabilities
        </span>
      </div>

      {/* Grid of features */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 divide-dashed divide-border">
        {CAPABILITIES.map((cap, idx) => {
          const Icon = cap.icon;
          return (
            <div
              key={idx}
              className={`p-5 flex flex-col justify-between gap-3 hover:bg-muted/30 transition-colors group ${
                idx % 2 === 0 ? "md:border-r md:border-dashed md:border-border" : ""
              } ${idx < CAPABILITIES.length - 2 ? "md:border-b md:border-dashed md:border-border" : ""}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded bg-muted/50 border border-border flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-brand-text transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-[10px] font-mono text-muted-foreground">
                      {cap.subtitle}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-foreground group-hover:underline">
                    {cap.stat}
                  </span>
                  <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
                    {cap.statLabel}
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                {cap.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

