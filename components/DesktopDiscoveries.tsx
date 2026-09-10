'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Discoveries = dynamic(() => import('@/components/EasterEggs'), { ssr: false });

export default function DesktopDiscoveries() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setEnabled(true), 650);
    return () => window.clearTimeout(timer);
  }, []);

  return enabled ? <Discoveries /> : null;
}
