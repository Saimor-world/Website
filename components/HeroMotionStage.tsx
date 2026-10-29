'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';
import styles from './SystemWorldHome.module.css';

export const HERO_MOTION_KEY = 'saimor-hero-motion';

/**
 * The hero section with a real pause control. `data-paused` freezes every hero animation in CSS.
 * A stored choice wins; otherwise reduced-motion visitors start paused and may choose to play.
 */
export default function HeroMotionStage({ locale, className, labelledBy, children }: {
  locale: 'de' | 'en'; className: string; labelledBy: string; children: ReactNode;
}) {
  const [paused, setPaused] = useState(false);
  const [chosen, setChosen] = useState(false);
  useEffect(() => {
    let stored: string | null = null;
    try { stored = window.localStorage.getItem(HERO_MOTION_KEY); } catch {}
    if (stored === 'paused' || stored === 'playing') { setPaused(stored === 'paused'); setChosen(true); return; }
    setPaused(Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches));
  }, []);
  const toggle = () => {
    const next = !paused;
    setPaused(next); setChosen(true);
    try { window.localStorage.setItem(HERO_MOTION_KEY, next ? 'paused' : 'playing'); } catch {}
  };
  const label = locale === 'de' ? 'Bewegung pausieren' : 'Pause motion';
  return <section className={className} aria-labelledby={labelledBy} data-paused={paused} data-motion={chosen && !paused ? 'play' : undefined}>
    <button type="button" className={styles.motionControl} aria-pressed={paused} onClick={toggle}>
      {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
      <span className={styles.motionText}>{label}</span>
    </button>
    {children}
  </section>;
}
