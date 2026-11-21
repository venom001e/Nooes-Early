"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Info, AlertTriangle, AlertCircle } from "lucide-react";
import { DocPage, DOCS_NAV_GROUPS } from "@/data/docs/docsData";
import { CodeBlock } from "./CodeBlock";
import { DocsHero } from "./DocsHero";

interface DocsContentProps {
  page: DocPage;
}

export function DocsContent({ page }: DocsContentProps) {
  // Compute previous and next pages from DOCS_NAV_GROUPS
  const allNavItems = React.useMemo(() => {
    return DOCS_NAV_GROUPS.flatMap((g) => g.items.filter((item) => !item.isExternal));
  }, []);

  const currentIndex = allNavItems.findIndex((item) => item.slug === page.slug);
  const prevPage = currentIndex > 0 ? allNavItems[currentIndex - 1] : null;
  const nextPage = currentIndex < allNavItems.length - 1 ? allNavItems[currentIndex + 1] : null;

  // Render markdown blocks
  const renderedContent = React.useMemo(() => {
    const raw = page.content.trim();
    const blocks = raw.split("\n\n");

    return blocks.map((block, idx) => {
      const trimmed = block.trim();

      // Heading 1 (# ...)
      if (trimmed.startsWith("# ")) {
        return (
          <div key={idx} className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              {trimmed.replace(/^#\s+/, "")}
            </h1>
          </div>
        );
      }

      // Heading 2 (## ...) with signature // prefix
      if (trimmed.startsWith("## ")) {
        const title = trimmed.replace(/^##\s+/, "");
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        return (
          <h2
            key={idx}
            id={id}
            className="group flex items-center text-sm sm:text-base lg:text-lg font-mono font-medium text-foreground tracking-tight mt-10 mb-4 border-b border-dashed border-border pb-3 scroll-mt-24"
          >
            <span className="text-muted-foreground/60 mr-3 tracking-[-0.3em] font-mono select-none">{"//"}</span>
            <span>{title}</span>
            <a
              href={`#${id}`}
              className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-brand-text text-xs font-mono ml-2 transition-opacity"
              aria-label="Link to section"
            >
              #
            </a>
          </h2>
        );
      }

      // Heading 3 (### ...)
      if (trimmed.startsWith("### ")) {
        const title = trimmed.replace(/^###\s+/, "");
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        return (
          <h3
            key={idx}
            id={id}
            className="text-sm sm:text-base font-semibold text-foreground mt-6 mb-2.5 scroll-mt-24"
          >
            {title}
          </h3>
        );
      }

      // Code blocks (```language ... ```)
      if (trimmed.startsWith("```")) {
        const lines = trimmed.split("\n");
        const lang = lines[0].replace(/^```/, "").trim() || "bash";
        const code = lines.slice(1, -1).join("\n");
        return <CodeBlock key={idx} code={code} language={lang} />;
      }

      // Callouts / Alerts with dashed styling
      if (trimmed.startsWith("> [!NOTE]")) {
        const body = trimmed.replace(/^>\s*\[!NOTE\]\s*/i, "").replace(/^>\s*/gm, "");
        return (
          <div key={idx} className="my-5 p-4 rounded-lg border border-dashed border-blue-500/40 bg-blue-500/5 text-xs sm:text-sm text-foreground flex items-start gap-3">
            <Info className="size-4 text-blue-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed space-y-2">{renderInline(body)}</div>
          </div>
        );
      }

      if (trimmed.startsWith("> [!IMPORTANT]") || trimmed.startsWith("> [!CAUTION]")) {
        const body = trimmed.replace(/^>\s*\[!(IMPORTANT|CAUTION)\]\s*/i, "").replace(/^>\s*/gm, "");
        return (
          <div key={idx} className="my-5 p-4 rounded-lg border border-dashed border-amber-500/40 bg-amber-500/5 text-xs sm:text-sm text-foreground flex items-start gap-3">
            <AlertTriangle className="size-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed space-y-2">{renderInline(body)}</div>
          </div>
        );
      }

      if (trimmed.startsWith("> [!TIP]")) {
        const body = trimmed.replace(/^>\s*\[!TIP\]\s*/i, "").replace(/^>\s*/gm, "");
        return (
          <div key={idx} className="my-5 p-4 rounded-lg border border-dashed border-emerald-500/40 bg-emerald-500/5 text-xs sm:text-sm text-foreground flex items-start gap-3">
            <AlertCircle className="size-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed space-y-2">{renderInline(body)}</div>
          </div>
        );
      }

      // Standard Blockquote
      if (trimmed.startsWith("> ")) {
        const body = trimmed.replace(/^>\s*/gm, "");
        return (
          <blockquote key={idx} className="my-4 pl-4 border-l-2 border-border italic text-muted-foreground text-xs sm:text-sm">
            {renderInline(body)}
          </blockquote>
        );
      }

      // Markdown Tables with dashed grid borders
      if (trimmed.startsWith("|")) {
        const rows = trimmed.split("\n").filter((r) => !r.includes("---"));
        const header = rows[0].split("|").filter(Boolean).map((s) => s.trim());
        const dataRows = rows.slice(1).map((r) => r.split("|").filter(Boolean).map((s) => s.trim()));

        return (
          <div key={idx} className="my-6 overflow-x-auto border border-dashed border-border rounded-lg">
            <table className="w-full text-left text-xs sm:text-sm text-foreground">
              <thead className="bg-muted/30 border-b border-dashed border-border text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                <tr>
                  {header.map((h, i) => (
                    <th key={i} className="px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-dashed divide-border bg-background font-mono text-xs">
                {dataRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-muted/20 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3 whitespace-nowrap">{renderInline(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      // Unordered Lists
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const items = trimmed.split("\n").map((line) => line.replace(/^[-*]\s+/, ""));
        return (
          <ul key={idx} className="my-4 space-y-2 text-xs sm:text-sm text-foreground/90 list-disc list-inside">
            {items.map((it, i) => (
              <li key={i} className="leading-relaxed">{renderInline(it)}</li>
            ))}
          </ul>
        );
      }

      // Ordered Lists
      if (/^\d+\.\s+/.test(trimmed)) {
        const items = trimmed.split("\n").map((line) => line.replace(/^\d+\.\s+/, ""));
        return (
          <ol key={idx} className="my-4 space-y-2 text-xs sm:text-sm text-foreground/90 list-decimal list-inside">
            {items.map((it, i) => (
              <li key={i} className="leading-relaxed">{renderInline(it)}</li>
            ))}
          </ol>
        );
      }

      // Standard Paragraph
      return (
        <p key={idx} className="my-3.5 text-xs sm:text-sm text-foreground/80 leading-relaxed font-normal">
          {renderInline(trimmed)}
        </p>
      );
    });
  }, [page]);

  return (
    <article className="min-w-0 max-w-3xl flex-1 pb-16">
      {/* Hero — full component for intro, breadcrumb header for sub-pages */}
      {page.slug === "" ? (
        <DocsHero />
      ) : (
        <div className="not-prose mb-8 pb-5 border-b border-dashed border-border">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold">
              {page.group}
            </span>
            <span className="text-muted-foreground/30 font-mono text-[10px]">/</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/40">
              {page.title}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
            {page.title}
          </h1>
          {page.summary && (
            <p className="text-sm text-muted-foreground leading-relaxed mt-2 max-w-2xl">
              {page.summary}
            </p>
          )}
        </div>
      )}

      {/* Rendered Documentation Body */}
      <div className="prose prose-invert max-w-none">{renderedContent}</div>

      {/* Extra rich sections for the intro page */}




      {/* Prev / Next Navigation Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevPage ? (
          <Link
            href={prevPage.path}
            className="flex flex-col p-4 rounded-lg border border-dashed border-border hover:border-foreground/50 bg-background hover:bg-muted/20 transition-colors group"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1 group-hover:text-foreground">
              <ArrowLeft className="size-3" /> Previous
            </span>
            <span className="text-sm font-semibold text-foreground mt-1 group-hover:text-brand-text">
              {prevPage.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextPage ? (
          <Link
            href={nextPage.path}
            className="flex flex-col p-4 rounded-lg border border-dashed border-border hover:border-foreground/50 bg-background hover:bg-muted/20 transition-colors text-right group ml-auto w-full sm:w-auto sm:min-w-[200px]"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center justify-end gap-1 group-hover:text-foreground">
              Next <ArrowRight className="size-3" />
            </span>
            <span className="text-sm font-semibold text-foreground mt-1 group-hover:text-brand-text">
              {nextPage.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
}

// Inline renderer helper
function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Inline code `code`
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      parts.push(
        <code key={key++} className="px-1.5 py-0.5 rounded bg-muted/60 text-foreground font-mono text-xs border border-border">
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // Bold **bold**
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      parts.push(<strong key={key++} className="font-semibold text-foreground">{boldMatch[1]}</strong>);
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Italic *italic*
    const italicMatch = remaining.match(/^\*([^*]+)\*/);
    if (italicMatch) {
      parts.push(<em key={key++} className="italic text-muted-foreground">{italicMatch[1]}</em>);
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // Link [link](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      parts.push(
        <Link key={key++} href={linkMatch[2]} className="text-brand-text hover:underline underline-offset-4 font-medium transition-colors">
          {linkMatch[1]}
        </Link>
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    parts.push(remaining[0]);
    remaining = remaining.slice(1);
  }

  return parts;
}
