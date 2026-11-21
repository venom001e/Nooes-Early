'use client';

import { useState } from 'react';
import Link from 'next/link';
import Terminal, { TerminalCommand } from '@/components/ui/terminal';

interface FeatureTab {
  num: string;
  title: string;
  code?: string;
  href: string;
  rightTitle: string;
  rightDesc: string;
  commands: TerminalCommand[];
}

const tabs: FeatureTab[] = [
  {
    num: '01',
    title: 'Interactive, headless, sandbox agents',
    href: '/features#modes',
    rightTitle: 'A mode for every moment.',
    rightDesc: 'Interactive CLI. Headless `-p`, `--yolo`. Background sandbox.',
    commands: [
      {
        input: 'nooes "Add Dark Mode and create user dashboard"',
        runDelayMs: 600,
        output: [
          { text: 'Example output', tone: 'muted' },
          { text: 'Locating theme configuration & route files...', tone: 'muted' },
          { text: '📝 Updated src/app/globals.css', tone: 'info' },
          { text: '✨ Created src/app/dashboard/page.tsx', tone: 'info' },
          { text: '✨ Created src/components/ThemeToggle.tsx', tone: 'info' },
          { text: '✔ Build passed.', tone: 'success' },
        ],
      },
    ],
  },
  {
    num: '02',
    title: 'Skills, reviews, bundled agentic tools',
    href: '/features#tools',
    rightTitle: 'Built in.',
    rightDesc: 'Plans, edits and tests code in your project.',
    commands: [
      {
        input: 'nooes "Fix the TypeError on checkout and retest"',
        runDelayMs: 700,
        output: [
          { text: 'Example output', tone: 'muted' },
          { text: 'Inspecting the error trace...', tone: 'muted' },
          { text: '⚠ Root cause: missing null-check on user.subscription', tone: 'warning' },
          { text: '🛠 Patched src/app/api/checkout/route.ts', tone: 'info' },
          { text: 'Running tests...', tone: 'muted' },
          { text: '✔ Tests passing.', tone: 'success' },
        ],
      },
    ],
  },
  {
    num: '03',
    title: 'Context engineering with /agents, /memory',
    href: '/features#memory',
    rightTitle: "It remembers. So you don't have to.",
    rightDesc: 'Custom /agents and persistent /memory — carried across every session.',
    commands: [
      {
        input: 'nooes run "npm run check"',
        runDelayMs: 500,
        output: [
          { text: 'Example output', tone: 'muted' },
          { text: '› Running ESLint...', tone: 'muted' },
          { text: '  Lint passed.', tone: 'success' },
          { text: '› Running TypeScript...', tone: 'muted' },
          { text: '  tsc --noEmit: passed cleanly', tone: 'success' },
          { text: '› Building Next.js production bundle...', tone: 'muted' },
          { text: '✔ Build complete.', tone: 'success' },
        ],
      },
    ],
  },
];

export default function FeatureShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = tabs[activeIdx];

  return (
    <div className="border border-border border-t-0 border-b-0 relative flex flex-col justify-start items-center w-[90vw] md:w-[80vw] max-w-[1189px] mx-auto bg-black text-foreground">
      {/* 4 Decorative Corner Squares */}
      <div className="absolute z-99 top-0 right-0 size-3 sm:size-5 bg-background border border-border translate-x-1.5 -translate-y-1.5 sm:translate-x-2.5 sm:-translate-y-2.5" />
      <div className="absolute z-99 top-0 left-0 size-3 sm:size-5 bg-background border border-border -translate-x-1.5 -translate-y-1.5 sm:-translate-x-2.5 sm:-translate-y-2.5" />
      <div className="absolute z-99 bottom-0 right-0 size-3 sm:size-5 bg-background border border-border translate-x-1.5 translate-y-1.5 sm:translate-x-2.5 sm:translate-y-2.5" />
      <div className="absolute z-99 bottom-0 left-0 size-3 sm:size-5 bg-background border border-border -translate-x-1.5 translate-y-1.5 sm:-translate-x-2.5 sm:translate-y-2.5" />

      {/* Center line */}
      <div className="hidden lg:block absolute w-[.025rem] h-full bg-border" />

      {/* ROW 1: Heading */}
      <div className="w-full border-b border-border py-12 px-6 md:px-12">
        <h2 aria-hidden="true" className="font-mono text-md sm:text-xl lg:text-2xl font-medium text-start">
          <span className="text-muted-foreground/60 mr-4 tracking-[-0.3em]">{'//'}</span>
          <span dir="auto" className="inline-block tracking-tighter text-white" style={{ opacity: 1 }}>
            an AI coding IDE that plans, edits and tests.
          </span>
        </h2>
        <h2 className="sr-only">an AI coding IDE that plans, edits and tests.</h2>
      </div>

      {/* ROW 2: Subheading and CTA Buttons */}
      <div className="w-full border-b border-border flex flex-col lg:grid lg:grid-cols-2 items-start lg:items-center gap-6 py-10 px-6 md:px-12">
        <p aria-hidden="true" className="text-xl text-muted-foreground text-start leading-tight tracking-tight font-normal max-w-4xl text-balance">
          <span className="inline text-zinc-300">Ships. Fixes. Tests. Refactors. Learns you, all the while.</span>
        </p>
        <div className="flex flex-col items-stretch justify-start w-full lg:w-auto gap-3 border-border sm:flex-row lg:items-center lg:justify-end md:gap-4">
          <div className="w-full sm:flex-1 lg:w-auto lg:flex-none">
            <Link
              href="/features"
              className="justify-center font-medium transition-colors group select-none bg-white text-black rounded-[100px] shadow hover:bg-white/90 duration-300 flex text-sm sm:text-base items-center gap-2 px-5 py-[10px] w-full lg:w-auto font-sans"
            >
              <span className="flex items-center justify-center gap-2 select-none whitespace-nowrap">
                <span>Explore all features</span>
                <svg className="size-4 -me-1 shrink-0 rtl:rotate-180" aria-hidden="true" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                  <path d="M10 16L14 12L10 8" />
                </svg>
              </span>
            </Link>
          </div>
          <div className="w-full sm:flex-1 lg:w-auto lg:flex-none">
            <a
              href="https://nooes.ai/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="justify-center font-medium transition-colors group select-none border border-input text-white rounded-[100px] shadow hover:bg-muted/80 duration-300 flex text-sm sm:text-base items-center gap-2 px-6 py-[10px] w-full lg:w-auto font-sans"
            >
              <span className="flex items-center justify-center gap-2 select-none">
                <span>Docs</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* MOBILE TAB LIST (< lg) */}
      <div className="w-full lg:hidden">
        <div className="grid grid-cols-2 auto-rows-fr relative border-b border-border">
          <div className="absolute w-px h-full top-0 left-1/2 -translate-x-1/2 bg-border z-0 pointer-events-none" />
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`relative h-full px-4 md:px-5 py-5 md:py-6 border-b border-border cursor-pointer transition-colors duration-200 text-start ${
                idx === 6 ? 'col-span-2' : ''
              } ${activeIdx === idx ? 'bg-[#141414]' : 'hover:bg-[#0c0c0c]'}`}
            >
              <span className="font-mono text-sm tabular-nums block mb-1 text-white/55">{tab.num}</span>
              <h3 className="text-lg md:text-xl font-normal tracking-tight leading-[1.2] mb-1 text-white">
                {tab.title} {tab.code && <code className="font-mono text-xs text-white/80">{tab.code}</code>}
              </h3>
              <p className="text-[13px] md:text-sm text-muted-foreground/70 leading-[1.4] line-clamp-3">
                {tab.rightDesc}
              </p>
            </button>
          ))}
        </div>
        <div className="p-4 bg-zinc-950">
          <Terminal
            key={`mobile-${activeIdx}`}
            commands={current.commands}
            username="developer"
            hostname="project"
            promptSymbol="➜"
            theme="midnight"
            enableSound={false}
            autoStart={true}
          />
        </div>
      </div>

      {/* DESKTOP 2-COLUMN VIEW (hidden on mobile, grid on lg) */}
      <div className="w-full relative hidden lg:grid lg:grid-cols-2" style={{ height: '616px' }}>
        <div className="absolute w-px h-full top-0 left-1/2 -translate-x-1/2 bg-border z-0 pointer-events-none" />

        {/* LEFT COLUMN: Feature tabs */}
        <div className="relative flex flex-col h-full border-r border-border">
          {tabs.map((tab, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setActiveIdx(idx)}
                className={`relative flex items-center gap-4 px-10 flex-1 border-b border-border cursor-pointer transition-colors duration-200 text-left ${
                  isActive ? 'bg-[#141414]' : 'hover:bg-[#0c0c0c]'
                } ${idx === tabs.length - 1 ? 'border-b-0' : ''}`}
              >
                <span
                  className={`font-mono text-xs tabular-nums shrink-0 transition-colors duration-200 ${
                    isActive ? 'text-white/40' : 'text-white/25'
                  }`}
                >
                  {tab.num}
                </span>

                <span
                  className={`text-xl font-normal transition-colors duration-200 ml-4 flex-1 ${
                    isActive ? 'text-white' : 'text-white/55'
                  }`}
                >
                  <span>{tab.title} </span>
                  {tab.code && (
                    <code className="font-mono text-[0.9em] text-white/80">{tab.code}</code>
                  )}
                </span>

                {/* Floating Explore badge for active row */}
                {isActive && (
                  <span className="bg-black text-white border border-border rounded-[100px] shadow ps-4 pe-2 py-1.5 text-xs font-medium flex items-center gap-4 select-none animate-in fade-in zoom-in-95 duration-150">
                    <span>Explore</span>
                    <div className="flex items-center justify-center w-5 h-5 bg-white rounded-full">
                      <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M10 16L14 12L10 8" />
                      </svg>
                    </div>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Header box + Animated Prompt Terminal */}
        <div className="flex flex-col overflow-hidden h-full">
          {/* Top header box (height: 176px) */}
          <div className="px-10 border-b border-border flex flex-col justify-center overflow-hidden" style={{ height: '176px' }}>
            <p className="text-xl leading-[1.4] tracking-tight text-balance">
              <span className="font-mono text-muted-foreground/40 tracking-[-0.3em] mr-3">{'//'}</span>
              <span className="font-semibold text-white">{current.rightTitle}</span>{' '}
              <span className="font-normal text-muted-foreground/70">{current.rightDesc}</span>
            </p>
          </div>

          {/* Bottom terminal container running prompt Terminal */}
          <div className="flex-1 min-h-0 px-6 py-4 overflow-hidden flex items-center justify-center">
            <div className="w-full">
              <Terminal
                key={`desktop-${activeIdx}`}
                commands={current.commands}
                username="developer"
                hostname="project"
                promptSymbol="➜"
                theme="midnight"
                enableSound={false}
                autoStart={true}
                typingSpeed={22}
                typingJitter={16}
                showSoundToggle={true}
                showControls={true}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
