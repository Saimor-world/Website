'use client';

import { useEffect, useRef, useState } from 'react';
import PixelMora, { PIXEL_GRID } from './PixelMora';
import styles from './MoraHeroPresence.module.css';
import { useSiteLiteMode } from '@/lib/use-site-lite-mode';

/** Website hero presence: Pixel MÔRA from the final set. It never subscribes to CORE or executes work. */
export default function MoraHeroPresence({ paused, locale }: {
  paused: boolean; locale: 'de' | 'en';
}) {
  const root = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(5);
  const [reduced, setReduced] = useState(true);
  const [hop, setHop] = useState(0);
  const lite = useSiteLiteMode();
  const still = paused || lite || reduced;
  const de = locale === 'de';

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media?.matches ?? true);
    sync();media?.addEventListener('change', sync);
    const element = root.current;
    // Whole-number scale only: the sprite stays crisp at every size.
    const fit = () => {
      if (!element) return;
      const room = Math.min(element.clientWidth, element.clientHeight) * .62;
      setScale(Math.max(3, Math.min(8, Math.floor(room / PIXEL_GRID))));
    };
    fit();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(fit);
    if (element) observer?.observe(element);
    return () => { media?.removeEventListener('change', sync);observer?.disconnect(); };
  }, []);

  const greet = () => { if (!still) setHop((n) => n + 1); };
  return <div ref={root} className={styles.presence} data-mora-presence data-testid="mora-hero-presence"
    data-character-source="preview" data-still={still} role="button" tabIndex={0}
    aria-label={de ? 'MÔRA begrüßen' : 'Greet MÔRA'}
    onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault();greet(); } }}
    onClick={greet}>
    <div className={styles.canvas} aria-hidden="true">
      <PixelMora scale={scale} still={still} hop={hop} />
    </div>
  </div>;
}
