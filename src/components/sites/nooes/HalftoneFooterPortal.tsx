'use client';

import { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import HalftoneWordmarkFooter from '@/components/ui/halftone-wordmark-footer';

const emptyListener = () => () => {};

export default function HalftoneFooterPortal() {
  const isClient = useSyncExternalStore(
    emptyListener,
    () => true,
    () => false
  );

  if (!isClient) return null;

  const mountEl = document.getElementById('halftone-footer-mount');
  if (!mountEl) return null;

  return createPortal(
    <div className="w-full bg-black py-4">
      <HalftoneWordmarkFooter
        wordmark="Nooes"
        label="Nooes"
        meta="©2026 · An AI coding IDE"
        preset="night"
        height="560px"
        dotGap={5}
        radius={85}
        crop={0}
        grain={0.5}
        interactive={true}
        className="w-[90vw] md:w-[80vw] max-w-[1189px] mx-auto border border-border border-t-0 rounded-b-xl"
        columns={[
          {
            title: 'Product',
            links: [
              { label: 'Features', href: '/features' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Desktop App', href: '/desktop' },
            ],
          },
          {
            title: 'Resources',
            links: [
              { label: 'Docs', href: '/docs' },
              { label: 'Changelog', href: '/changelog' },
            ],
          },
          {
            title: 'Company',
            links: [
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ],
          },
        ]}
      />
    </div>,
    mountEl
  );
}

