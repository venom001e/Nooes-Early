"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  BookOpen,
  Sliders,
  Puzzle,
  FolderGit2,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  Terminal,
} from "lucide-react";
import { DOCS_NAV_GROUPS, DocPage } from "@/data/docs/docsData";
import { DocsSearchModal } from "./DocsSearchModal";

interface DocsLayoutProps {
  children: React.ReactNode;
  activePage: DocPage;
}

export function DocsLayout({ children, activePage }: DocsLayoutProps) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeHeadingId, setActiveHeadingId] = React.useState<string>("");
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>({
    "Getting Started": true,
    Configure: true,
    Integrations: true,
    Project: true,
  });

  const toggleGroup = (groupName: string) => {
    setOpenGroups((prev) => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  // Scrollspy for active heading
  React.useEffect(() => {
    const handleScroll = () => {
      const headingElements = activePage.headings
        .map((h) => document.getElementById(h.id))
        .filter(Boolean) as HTMLElement[];

      const scrollPosition = window.scrollY + 140;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el.offsetTop <= scrollPosition) {
          setActiveHeadingId(el.id);
          return;
        }
      }
      if (headingElements.length > 0) {
        setActiveHeadingId(headingElements[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activePage]);

  // Shortcut Ctrl+K
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const getGroupIcon = (name: string) => {
    switch (name) {
      case "Getting Started":
        return <BookOpen className="size-4 text-muted-foreground/70" />;
      case "Configure":
        return <Sliders className="size-4 text-muted-foreground/70" />;
      case "Integrations":
        return <Puzzle className="size-4 text-muted-foreground/70" />;
      case "Project":
        return <FolderGit2 className="size-4 text-muted-foreground/70" />;
      default:
        return <HelpCircle className="size-4 text-muted-foreground/70" />;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground antialiased font-sans">
      {/* Search Modal */}
      <DocsSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Top Mobile Bar */}
      <div className="md:hidden sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2.5">
          <img
            src="/logos/nooes-icon.png"
            alt="Nooes"
            className="size-7 rounded-lg object-contain"
          />
          <span className="font-bold text-base text-foreground tracking-tight">Nooes Docs</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-muted-foreground hover:text-foreground"
            aria-label="Search"
          >
            <Search className="size-4" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-muted-foreground hover:text-foreground"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div className="flex flex-1 w-full">
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden md:flex w-72 shrink-0 flex-col fixed inset-y-0 left-0 z-30 border-r border-border bg-background px-3">
          {/* Sidebar Header: Logo Box + Search */}
          <div className="flex flex-col gap-3 p-2 relative px-2 pb-4 pt-5">
            {/* Logo Box */}
            <Link
              href="/"
              className="group relative flex h-[85px] items-center justify-between border border-border bg-gradient-to-br from-background to-muted/20 px-4 backdrop-blur-sm transition-all duration-200 hover:border-foreground/20 hover:from-muted/10 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="/logos/nooes-icon.png"
                    alt="Nooes Logo"
                    className="size-9 rounded-lg object-contain transition-transform group-hover:scale-105"
                  />
                  <span className="absolute -bottom-1 -right-1 size-2.5 rounded-full bg-emerald-500 border-2 border-background" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-base tracking-tight text-foreground leading-none">
                    Nooes
                  </span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground mt-1">
                    Documentation
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                  v1.0
                </span>
                <span className="text-[9px] font-mono text-muted-foreground/50">stable</span>
              </div>
            </Link>

            {/* Search Input Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="h-10 w-full items-center gap-2 px-3 text-xs text-muted-foreground border border-border rounded-lg transition hover:border-foreground/20 hover:bg-muted/20 flex cursor-pointer bg-background/50"
            >
              <Search className="size-4 text-muted-foreground/70 shrink-0" />
              <span className="flex-1 text-left truncate">Search the docs...</span>
              <kbd className="pointer-events-none inline-flex h-4 items-center gap-0.5 rounded border border-border bg-muted/40 px-1.5 font-mono text-[10px] text-muted-foreground">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Navigation Groups */}
          <div className="flex-1 overflow-y-auto px-2 pb-6 space-y-4">
            {DOCS_NAV_GROUPS.map((group, gIdx) => {
              const isOpen = openGroups[group.name] ?? true;
              return (
                <div key={gIdx} className="space-y-1">
                  {/* Group Collapsible Button */}
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.name)}
                    className="w-full flex items-center justify-between p-2 rounded-lg text-xs font-semibold text-foreground/90 hover:bg-muted/40 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      {getGroupIcon(group.name)}
                      <span className="font-mono uppercase tracking-wider text-[11px] text-muted-foreground font-bold">
                        {group.name}
                      </span>
                    </div>
                    <ChevronDown
                      className={`size-3.5 text-muted-foreground/60 transition-transform duration-200 ${
                        isOpen ? "" : "-rotate-90"
                      }`}
                    />
                  </button>

                  {/* Sub-items under subtle rail */}
                  {isOpen && (
                    <ul className="relative ml-3.5 flex flex-col gap-1 pl-3 py-0.5 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-border before:via-80% before:to-transparent">
                      {group.items.map((item, iIdx) => {
                        const isActive = pathname === item.path;
                        return (
                          <li key={iIdx}>
                            <Link
                              href={item.path}
                              className={`flex h-8 items-center justify-between px-2.5 rounded-md text-xs transition-colors ${
                                isActive
                                  ? "bg-muted font-semibold text-foreground border border-border/80 shadow-xs"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                              }`}
                            >
                              <span className="truncate">{item.title}</span>
                              {item.isExternal && (
                                <ExternalLink className="size-3 text-muted-foreground/50" />
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-border space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
                ← Home
              </Link>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/nooes-ai/nooes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://discord.gg/nooes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Discord
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 top-14 bg-background/95 p-4 overflow-y-auto md:hidden">
            <div className="space-y-6 pb-16">
              {DOCS_NAV_GROUPS.map((group, gIdx) => (
                <div key={gIdx} className="space-y-2">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-bold px-2">
                    {group.name}
                  </h4>
                  <ul className="space-y-1">
                    {group.items.map((item, iIdx) => {
                      const isActive = pathname === item.path;
                      return (
                        <li key={iIdx}>
                          <Link
                            href={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                              isActive
                                ? "bg-muted font-medium text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <span>{item.title}</span>
                            {item.isExternal && <ExternalLink className="size-3.5" />}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="relative flex w-full min-w-0 flex-1 flex-col bg-background md:pl-72">
          {/* Main Area Container with Top Border */}
          <div className="z-1 relative flex min-w-0 flex-1 flex-col bg-background md:mt-4 md:border md:border-r-0 md:border-border">
            {/* Sticky Header inside Content Area */}
            <div className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-background/90 px-4 sm:px-6 md:px-8 backdrop-blur-md">
              <div className="flex items-center gap-2 text-sm text-muted-foreground sm:truncate">
                <BookOpen className="size-4 text-muted-foreground/40 mr-1" />
                <span className="text-muted-foreground/60 hidden sm:inline">{activePage.group}</span>
                <span className="text-muted-foreground/30 hidden sm:inline">/</span>
                <span className="font-semibold text-foreground truncate">{activePage.title}</span>
              </div>

              {/* Right utility links */}
              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors hidden sm:inline"
                >
                  Homepage
                </Link>
                <Link
                  href="/desktop"
                  className="hover:text-foreground transition-colors hidden sm:inline"
                >
                  Desktop
                </Link>
                <a
                  href="https://github.com/nooes-ai/nooes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <svg className="size-4 fill-currentColor" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>Star</span>
                </a>
              </div>
            </div>

            {/* Content Body + Right TOC */}
            <div className="flex flex-1 justify-between px-4 sm:px-6 md:px-10 py-8">
              {/* Main Document Content */}
              <div className="min-w-0 max-w-3xl flex-1">{children}</div>

              {/* Right Table of Contents */}
              {activePage.headings.length > 0 && (
                <aside className="hidden xl:block w-64 shrink-0 pl-8 overflow-y-auto sticky top-20 h-[calc(100vh-6rem)] text-xs">
                  <div className="space-y-3 border-l border-dashed border-border pl-4">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <span className="text-muted-foreground/50 tracking-[-0.2em] font-mono mr-0.5">{"//"}</span>
                      On this page
                    </span>
                    <ul className="space-y-2 mt-2">
                      {activePage.headings.map((heading, hIdx) => {
                        const isActive = activeHeadingId === heading.id;
                        return (
                          <li
                            key={hIdx}
                            className={heading.level === 3 ? "ml-2.5" : ""}
                          >
                            <a
                              href={`#${heading.id}`}
                              className={`block leading-normal transition-colors ${
                                isActive
                                  ? "text-foreground font-semibold"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {heading.title}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </aside>
              )}
            </div>

            {/* Bottom Footer */}
            <footer className="mt-auto border-t border-dashed border-border bg-background p-6 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 font-mono">
                <Terminal className="size-4 text-brand-text" />
                <span>Nooes Documentation</span>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms
                </Link>
                <Link href="/changelog" className="hover:text-foreground transition-colors">
                  Changelog
                </Link>
                <a
                  href="https://discord.gg/nooes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Discord
                </a>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
