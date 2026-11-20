'use client';

import { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import FeatureShowcase from './FeatureShowcase';

const emptyListener = () => () => {};

/**
 * Client-only portal that mounts FeatureShowcase into the #feature-showcase-mount
 * placeholder inside the single dangerouslySetInnerHTML tree.
 * Uses useSyncExternalStore to avoid SSR/hydration mismatches and eslint setState-in-effect warnings.
 */
export default function FeatureShowcasePortal() {
  const isClient = useSyncExternalStore(
    emptyListener,
    () => true,
    () => false
  );

  if (!isClient) return null;

  const mountEl = document.getElementById('feature-showcase-mount');
  if (!mountEl) return null;

  return createPortal(<FeatureShowcase />, mountEl);
}
