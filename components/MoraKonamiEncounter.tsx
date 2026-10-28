'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSiteLiteMode } from '@/lib/use-site-lite-mode';
import PixelMora from './PixelMora';
import styles from './MoraKonamiEncounter.module.css';

export const KONAMI_IDLE_MS = 8000;
export const KONAMI_LEAVE_MS = 450;
const COPY = {
  de: { found: 'Du hast mich gefunden.', close: 'Schließen', hint: 'Esc oder ein Klick daneben schließt.' },
  en: { found: 'You found me.', close: 'Close', hint: 'Press Esc or click outside to close.' },
} as const;

/**
 * Pixel MÔRA appears and floats. A click on MÔRA makes a small hop.
 * It stays while the visitor engages and leaves on Esc, a click outside, the close button or 8 s of stillness.
 * Reduced motion and Lite show the same figure as a still image.
 */
export default function MoraKonamiEncounter({ locale, onClose }: { locale: 'de' | 'en'; onClose: () => void }) {
  const lite = useSiteLiteMode();
  const [reduced, setReduced] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [hop, setHop] = useState(0);
  const [phone, setPhone] = useState(false);
  const idle = useRef<number | null>(null);
  const timers = useRef<number[]>([]);
  const left = useRef(false);
  const still = reduced || lite;
  const text = COPY[locale];

  const leave = useCallback(() => {
    if (left.current) return;
    left.current = true;
    setLeaving(true);
    timers.current.push(window.setTimeout(onClose, KONAMI_LEAVE_MS));
  }, [onClose]);
  const stay = useCallback(() => {
    if (left.current) return;
    if (idle.current !== null) window.clearTimeout(idle.current);
    idle.current = window.setTimeout(leave, KONAMI_IDLE_MS);
  }, [leave]);

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media?.matches ?? true);
    sync();media?.addEventListener('change', sync);
    setPhone(window.innerWidth < 640);
    return () => media?.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    stay();
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') leave(); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointermove', stay);
    const pending = timers.current;
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointermove', stay);
      if (idle.current !== null) window.clearTimeout(idle.current);
      pending.forEach((timer) => window.clearTimeout(timer));
    };
  }, [leave, stay]);

  return <div className={styles.overlay} data-still={still} data-leaving={leaving} data-mora-konami
    onClick={(event) => { if (event.target === event.currentTarget) leave(); }}>
    <div className={styles.encounter}>
      <div className={styles.figure} aria-hidden="true" data-testid="konami-figure"
        onClick={() => { if (!still) { setHop((n) => n + 1);stay(); } }}>
        <span className={styles.bloom} />
        <PixelMora scale={phone ? 4 : 6} still={still} hop={hop} />
      </div>
      <p className={styles.message} role="status" aria-live="polite">{text.found}</p>
      <p className={styles.hint}>{text.hint}</p>
    </div>
    <button type="button" className={styles.close} onClick={leave} aria-label={text.close}>×</button>
  </div>;
}
