'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Discoveries = dynamic(() => import('@/components/EasterEggs'), { ssr: false });

export default function DesktopDiscoveries() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    if (!window.matchMedia('(min-width: 1024px)').matches) return;
    const timer = window.setTimeout(() => setEnabled(true), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  return enabled ? <Discoveries /> : null;
}
