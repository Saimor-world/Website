'use client';

import { useEffect, useState } from 'react';
import PixelMora from './pixel/PixelMora';
import { useHeroPaused } from './HeroMotionStage';
import styles from './MoraGuide.module.css';

export const FLYBY_KEY = 'saimor-mora-flyby';

/**
 * MÔRA crosses the hero sky once per visit and is gone again. The hero itself stays as it is:
 * no fixed figure, nothing clickable, nothing covered. Skipped when paused or under reduced motion.
 * After landing the element stays in the DOM, hidden: removing its image layers mid-page would shift
 * every later <img> and break anything that walks the page's images in order.
 */
export default function MoraFlyby() {
  const paused = useHeroPaused();
  const [state, setState] = useState<'none' | 'flying' | 'done'>('none');
  useEffect(() => {
    if (paused || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setState(current => (current === 'flying' ? 'done' : current));
      return;
    }
    let seen: string | null = null;
    try { seen = window.sessionStorage.getItem(FLYBY_KEY); } catch {}
    if (seen) return;
    try { window.sessionStorage.setItem(FLYBY_KEY, '1'); } catch {}
    setState('flying');
  }, [paused]);
  if (state === 'none') return null;
  return <div className={styles.flyby} aria-hidden="true" data-testid="mora-flyby" data-done={state === 'done'} data-cheap-motion
    onAnimationEnd={event => { if (event.target === event.currentTarget) setState('done'); }}>
    <PixelMora scale={3} mood="fly" look={1} still={state === 'done'} />
  </div>;
}
