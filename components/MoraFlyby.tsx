'use client';

import { useEffect, useState } from 'react';
import PixelMora from './pixel/PixelMora';
import { useHeroPaused } from './HeroMotionStage';
import styles from './MoraGuide.module.css';

export const FLYBY_KEY = 'saimor-mora-flyby';

/**
 * MÔRA crosses the hero sky once per visit and is gone again. The hero itself stays as it is:
 * no fixed figure, nothing clickable, nothing covered. Skipped when paused or under reduced motion.
 */
export default function MoraFlyby() {
  const paused = useHeroPaused();
  const [flying, setFlying] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setFlying(false); return; }
    let seen: string | null = null;
    try { seen = window.sessionStorage.getItem(FLYBY_KEY); } catch {}
    if (seen) return;
    try { window.sessionStorage.setItem(FLYBY_KEY, '1'); } catch {}
    setFlying(true);
  }, [paused]);
  if (!flying) return null;
  return <div className={styles.flyby} aria-hidden="true" data-testid="mora-flyby" data-cheap-motion onAnimationEnd={() => setFlying(false)}>
    <PixelMora scale={2} mood="fly" look={1} />
  </div>;
}
