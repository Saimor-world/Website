'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

type Locale = 'de' | 'en';

const MoraIntroAnimation = dynamic(() => import('@/components/MoraIntroAnimation'), {
  ssr: false,
});

/**
 * Keeps the heavy intro (framer sequences) out of the landing first paint.
 * Returning visitors who already dismissed the intro never download the chunk.
 */
export default function MoraIntroLazy({ locale = 'de' }: { locale?: Locale }) {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem('mora-intro-seen') === 'true') return;
    } catch {
      // localStorage blocked — still allow intro once.
    }
    setShouldMount(true);
  }, []);

  if (!shouldMount) return null;
  return <MoraIntroAnimation locale={locale} />;
}
