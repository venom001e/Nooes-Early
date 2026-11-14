"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X, FileText, ArrowRight } from "lucide-react";
import { DOC_PAGES } from "@/data/docs/docsData";

interface DocsSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DocsSearchModal({ isOpen, onClose }: DocsSearchModalProps) {
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or custom event
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: Array<{ title: string; snippet: string; path: string; group: string }> = [];

    for (const [key, page] of Object.entries(DOC_PAGES)) {
      const path = key === "" ? "/docs" : `/docs/${key}`;
      const titleMatch = page.title.toLowerCase().includes(q);
      const summaryMatch = page.summary?.toLowerCase().includes(q);
      const contentMatch = page.content.toLowerCase().includes(q);

      if (titleMatch || summaryMatch || contentMatch) {
        let snippet = page.summary || "";
        if (!snippet && contentMatch) {
          const idx = page.content.toLowerCase().indexOf(q);
          snippet = page.content.slice(Math.max(0, idx - 40), idx + 80).replace(/[#*`_]/g, "");
        }
        results.push({
          title: page.title,
          snippet,
          path,
          group: page.group,
        });
      }
    }
    return results.slice(0, 8);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-800/80 gap-3">
          <Search className="size-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation (e.g. install, providers, config)..."
            className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-zinc-400 hover:text-zinc-200 p-1"
            >
              <X className="size-4" />
            </button>
          )}
          <span className="text-[10px] font-mono text-zinc-500 px-1.5 py-0.5 border border-zinc-800 rounded bg-zinc-900">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim() === "" ? (
            <div className="p-6 text-center text-sm text-zinc-500">
              Type keywords to search across all documentation pages.
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-8 text-center text-sm text-zinc-500">
              No documentation pages found matching &ldquo;<span className="text-zinc-300">{query}</span>&rdquo;.
            </div>
          ) : (
            <div className="space-y-1">
              {searchResults.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    router.push(item.path);
                    onClose();
                  }}
                  className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-900 text-left transition-colors group cursor-pointer"
                >
                  <FileText className="size-4 text-cyan-400 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-zinc-200 group-hover:text-white">
                        {item.title}
                      </span>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded">
                        {item.group}
                      </span>
                    </div>
                    {item.snippet && (
                      <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5 font-normal">
                        {item.snippet}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="size-4 text-zinc-600 group-hover:text-zinc-300 shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
