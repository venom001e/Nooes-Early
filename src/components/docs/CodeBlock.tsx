"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "bash" }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="relative group my-4 rounded-xl border border-zinc-800 bg-[#0d0e14] overflow-hidden">
      {/* Top language badge and copy button bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/80 bg-zinc-950/60 text-xs font-mono text-zinc-400">
        <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer text-xs"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-zinc-200 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

