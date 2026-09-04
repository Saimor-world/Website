'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

/**
 * Canvas mycelium background — keep it out of the landing first JS payload.
 */
const MyceliumNetwork = dynamic(() => import('@/components/MyceliumNetwork'), {
  ssr: false,
});

export default function MyceliumNetworkLazy() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function' || !window.matchMedia('(min-width: 768px)').matches) return;

    const idleWindow = window as typeof window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const idleId = idleWindow.requestIdleCallback?.(() => setEnabled(true), { timeout: 1800 });
    const timeoutId = idleId === undefined
      ? window.setTimeout(() => setEnabled(true), 900)
      : undefined;

    return () => {
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return enabled ? <MyceliumNetwork /> : null;
}
