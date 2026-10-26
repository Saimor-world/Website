'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useSiteLiteMode } from '@/lib/use-site-lite-mode';
import styles from './MoraKonamiEncounter.module.css';

// This component is itself imported only when the code is entered. Reduced motion
// and Lite never mount Body, so neither path requests the Three.js scene chunk.
const Body = dynamic(() => import('./MoraCharacterBody'), { ssr: false });

export default function MoraKonamiEncounter({ locale }: { locale: 'de' | 'en' }) {
  const lite = useSiteLiteMode();
  const [reduced, setReduced] = useState(true);
  const [failed, setFailed] = useState(false);
  const interaction = useRef({ x: -.9, y: 0, touchedAt: -Infinity });
  const still = reduced || lite || failed;

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media?.matches ?? true);
    sync();media?.addEventListener('change', sync);
    return () => media?.removeEventListener('change', sync);
  }, []);
  useEffect(() => {
    if (still) return;
    const timer = window.setTimeout(() => { interaction.current.x = 0; }, 600);
    return () => window.clearTimeout(timer);
  }, [still]);

  return <div className={styles.overlay} data-still={still} data-mora-konami>
    <div className={styles.encounter}>
      <div className={styles.figure} aria-hidden="true">
        {still ? <Image className={styles.sigil} src="/brand/saimor-sigil-alive-256.png"
          alt="SAIMÔR" width={88} height={88} />
          : <Body locale={locale} still={false} interaction={interaction}
            onFailure={() => setFailed(true)} />}
      </div>
      <p className={styles.message} role="status" aria-live="polite">
        {locale === 'en' ? 'You found me.' : 'Du hast mich gefunden.'}
      </p>
    </div>
  </div>;
}
