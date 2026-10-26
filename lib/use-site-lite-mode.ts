'use client';
import { useSyncExternalStore } from 'react';
import { isLiteMode } from './lite-mode-script';

function subscribe(notify: () => void) {
  window.addEventListener('saimor-lite', notify);
  return () => window.removeEventListener('saimor-lite', notify);
}
const serverSnapshot = () => true;

/** Reuses the site's existing preference; defaults to still during hydration. */
export function useSiteLiteMode() {
  return useSyncExternalStore(subscribe, isLiteMode, serverSnapshot);
}
