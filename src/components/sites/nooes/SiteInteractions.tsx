'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SiteInteractions() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // 0. Responsive scaling for desktop demo canvas
    const updateDemoScale = () => {
      const viewports = document.querySelectorAll('.desktop-demo-viewport');
      viewports.forEach(vp => {
        const canvas = vp.querySelector('.desktop-demo-canvas') as HTMLElement | null;
        if (canvas && vp.clientWidth > 0) {
          const scale = vp.clientWidth / 1280;
          canvas.style.setProperty('--demo-scale', String(scale));
        }
      });
    };

    updateDemoScale();
    window.addEventListener('resize', updateDemoScale);

    // 1. Mobile menu toggle button
    const handleMenuClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const menuBtn = target?.closest('button[aria-label="Open main menu"]');
      if (menuBtn) {
        e.preventDefault();
        setMobileMenuOpen(prev => !prev);
      }
    };

    // 2. Copy code buttons
    const handleCopyClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const copyBtn = target?.closest('button');
      if (!copyBtn) return;

      const isCopyBtn =
        copyBtn.getAttribute('aria-label')?.toLowerCase().includes('copy') ||
        copyBtn.querySelector('svg')?.classList.contains('lucide-copy') ||
        copyBtn.innerText?.toLowerCase().includes('copy') ||
        copyBtn.closest('.terminal, pre, code');

      if (isCopyBtn) {
        const container = copyBtn.closest('pre, div, section');
        const codeEl = container?.querySelector('code, pre') || copyBtn.previousElementSibling;
        const textToCopy = codeEl?.textContent || copyBtn.dataset.copyText || '';

        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy.trim()).then(() => {
            copyBtn.setAttribute('data-copied', 'true');
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-6 right-6 z-50 rounded-lg bg-zinc-800 text-white px-4 py-2 text-sm shadow-lg border border-zinc-700 animate-in fade-in duration-200';
            toast.textContent = 'Copied to clipboard!';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2000);
          }).catch(() => { });
        }
      }
    };

    // 3. Accordion toggles (FAQs, feature breakdowns)
    const handleAccordionClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const trigger = target?.closest('button[data-state], [aria-expanded]');
      if (!trigger) return;

      // Don't interfere with main menu button
      if (trigger.getAttribute('aria-label') === 'Open main menu') return;

      const currentState = trigger.getAttribute('data-state') || trigger.getAttribute('aria-expanded');
      const isExpanded = currentState === 'open' || currentState === 'true';
      const newState = isExpanded ? 'closed' : 'open';

      trigger.setAttribute('data-state', newState);
      trigger.setAttribute('aria-expanded', String(!isExpanded));

      const contentId = trigger.getAttribute('aria-controls');
      let panel = contentId ? document.getElementById(contentId) : null;
      if (!panel) {
        panel = trigger.nextElementSibling as HTMLElement;
      }
      if (panel) {
        panel.setAttribute('data-state', newState);
        if (newState === 'open') {
          panel.style.display = 'block';
        } else {
          panel.style.display = 'none';
        }
      }
    };

    document.addEventListener('click', handleMenuClick);
    document.addEventListener('click', handleCopyClick);
    document.addEventListener('click', handleAccordionClick);

    // 5. Features page tab switcher
    const TAB_MAP: Record<string, string> = {
      'cli experience':       'cli-experience',
      
      'run modes':            'modes',
      'code tools':           'tools',
      'mcp & skills':         'mcp',
      'memory & context':     'memory',
      'models & providers':   'models',
      'collaboration':        'collab',
      'design':               'design-partner',
      'developer experience': 'dx',
      'studio':               'studio-web',
      'desktop':              'desktop-features',
    };

    const ACTIVE_BTN_CLASSES   = ['text-foreground', 'bg-muted/20'];
    const INACTIVE_BTN_CLASSES = ['text-muted-foreground'];

    const activateTab = (targetId: string, allBtns: HTMLElement[], allPanels: HTMLElement[]) => {
      // Update button styles
      allBtns.forEach((btn) => {
        const label = btn.textContent?.trim().toLowerCase() ?? '';
        const panelId = TAB_MAP[label];
        const isTarget = panelId === targetId;
        ACTIVE_BTN_CLASSES.forEach(c => btn.classList.toggle(c, isTarget));
        INACTIVE_BTN_CLASSES.forEach(c => btn.classList.toggle(c, !isTarget));
      });

      // Show/hide panels
      allPanels.forEach((panel) => {
        const isTarget = panel.id === targetId;
        panel.style.display = isTarget ? '' : 'none';
      });
    };

    const setupFeatureTabs = () => {
      // Find the tab nav — a nav containing buttons whose text matches our tab labels
      const panelIds = Object.values(TAB_MAP);
      const panels = panelIds
        .map(id => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      if (panels.length === 0) return; // not on features page

      // Find button bar: buttons that contain our tab labels
      const allButtons = Array.from(document.querySelectorAll<HTMLElement>('button[type="button"]'));
      const tabButtons = allButtons.filter(btn => {
        const label = btn.textContent?.trim().toLowerCase() ?? '';
        return label in TAB_MAP;
      });

      if (tabButtons.length === 0) return;

      // Hide all panels except the first one on initial setup
      const firstId = TAB_MAP['cli experience'];
      panels.forEach(p => { p.style.display = p.id === firstId ? '' : 'none'; });

      // Click handler
      const handleTabClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const btn = target.closest('button') as HTMLElement | null;
        if (!btn) return;
        const label = btn.textContent?.trim().toLowerCase() ?? '';
        const panelId = TAB_MAP[label];
        if (!panelId) return;
        e.stopPropagation();
        activateTab(panelId, tabButtons, panels);
        // Scroll the clicked tab button into view
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      };

      document.addEventListener('click', handleTabClick);
      return () => document.removeEventListener('click', handleTabClick);
    };

    const tabCleanup = setTimeout(() => {
      const cleanup = setupFeatureTabs();
      if (cleanup) cleanupFns.push(cleanup);
    }, 400);

    // 4. Drag-to-scroll for horizontal tab bars (removes scrollbar, enables cursor drag)
    const cleanupFns: (() => void)[] = [];

    const setupDragScroll = (el: HTMLElement) => {
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;

      const onMouseDown = (e: MouseEvent) => {
        isDown = true;
        startX = e.clientX;
        scrollLeft = el.scrollLeft;
        el.style.cursor = 'grabbing';
        el.style.userSelect = 'none';
        document.body.style.userSelect = 'none';
        e.preventDefault();
      };

      // Listen on window so fast cursor movement doesn't break the drag
      const onWindowMouseMove = (e: MouseEvent) => {
        if (!isDown) return;
        const dx = e.clientX - startX;
        el.scrollLeft = scrollLeft - dx;
      };

      const onWindowMouseUp = () => {
        if (!isDown) return;
        isDown = false;
        el.style.cursor = 'grab';
        el.style.userSelect = '';
        document.body.style.userSelect = '';
      };

      // Hide scrollbar
      el.style.scrollbarWidth = 'none';
      (el.style as CSSStyleDeclaration & { msOverflowStyle?: string }).msOverflowStyle = 'none';
      el.style.cursor = 'grab';

      el.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onWindowMouseMove);
      window.addEventListener('mouseup', onWindowMouseUp);

      return () => {
        el.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mousemove', onWindowMouseMove);
        window.removeEventListener('mouseup', onWindowMouseUp);
      };
    };

    const tryAttachDragScroll = () => {
      // Cast wide net: any element whose content overflows horizontally
      const allEls = document.querySelectorAll<HTMLElement>('*');
      allEls.forEach((el) => {
        if (el.dataset.dragScroll) return; // already attached
        const style = window.getComputedStyle(el);
        const overflowX = style.overflowX;
        const isScrollable = overflowX === 'auto' || overflowX === 'scroll';
        const doesOverflow = el.scrollWidth > el.clientWidth + 4;
        if (isScrollable && doesOverflow) {
          el.dataset.dragScroll = 'true';
          cleanupFns.push(setupDragScroll(el));
        }
      });
    };

    // Run after paint — HTML blob may not be parsed yet on first tick
    const timer = setTimeout(tryAttachDragScroll, 300);
    const timer2 = setTimeout(tryAttachDragScroll, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(tabCleanup);
      window.removeEventListener('resize', updateDemoScale);
      document.removeEventListener('click', handleMenuClick);
      document.removeEventListener('click', handleCopyClick);
      document.removeEventListener('click', handleAccordionClick);
      cleanupFns.forEach(fn => fn());
    };
  }, []);

  return (
    <>
      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden bg-black/90 backdrop-blur-md flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-emerald-400">⌘</span> Nooes
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-4 py-8 text-lg">
            <Link
              href="/features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white transition-colors py-2 border-b border-zinc-800/50"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white transition-colors py-2 border-b border-zinc-800/50"
            >
              Pricing
            </Link>
            <Link
              href="/desktop"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white transition-colors py-2 border-b border-zinc-800/50"
            >
              Desktop App
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white transition-colors py-2 border-b border-zinc-800/50"
            >
              About
            </Link>
            <Link
              href="/changelog"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white transition-colors py-2 border-b border-zinc-800/50"
            >
              Changelog
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white transition-colors py-2 border-b border-zinc-800/50"
            >
              Contact
            </Link>
            <a
              href="https://nooes.ai/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-white transition-colors py-2 border-b border-zinc-800/50"
            >
              Docs ↗
            </a>
          </nav>


        </div>
      )}
    </>
  );
}

