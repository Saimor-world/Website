'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';
import PixelMora, { type MoraLook, type MoraMood } from './pixel/PixelMora';
import { GUIDE } from '@/lib/mora-guide-copy';
import styles from './MoraGuide.module.css';

export const GUIDE_KEY = 'saimor-mora-guide';
type Phase = 'greet' | 'tour' | 'quiet';

const isNight = () => { const hour = new Date().getHours(); return hour >= 22 || hour < 6; };

/**
 * MÔRA on the homepage: the hero stays as it is (she only flies past there, see MoraFlyby). She greets right
 * below it, and on request walks the visitor through the page. She reacts to scrolling (flies along, looks
 * where the page goes) and to taps (hops, speaks). Nothing is fixed on screen until the visitor chose "tour"
 * or "look myself", so no page control is covered. Reduced motion keeps her still; no frame loop runs.
 */
export default function MoraGuide({ locale }: { locale: 'de' | 'en' }) {
  const c = GUIDE[locale];
  const [paused, setPaused] = useState(false);
  const [phase, setPhase] = useState<Phase>('greet');
  const [stop, setStop] = useState(-1);
  const [talking, setTalking] = useState(true);
  const [mood, setMood] = useState<MoraMood>('idle');
  const [look, setLook] = useState<MoraLook>(0);
  const [homeVisible, setHomeVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [night, setNight] = useState(false);
  const anchor = useRef<HTMLDivElement>(null);
  const hopTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
    setNight(isNight());
    setPaused(Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches));
    let stored: string | null = null;
    try { stored = window.localStorage.getItem(GUIDE_KEY); } catch {}
    if (stored === 'tour' || stored === 'quiet') { setPhase(stored); setTalking(stored === 'tour'); }
  }, []);

  const choose = (next: Exclude<Phase, 'greet'>) => {
    setPhase(next); setTalking(next === 'tour'); setNight(false);
    try { window.localStorage.setItem(GUIDE_KEY, next); } catch {}
    // She greets inside the first stop already, so the tour continues with the next one.
    if (next === 'tour') goTo(1);
  };

  const goTo = useCallback((index: number) => {
    const target = document.getElementById(c.stops[index]?.id ?? '');
    if (!target) return;
    const reduce = paused || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }, [c.stops, paused]);

  const hop = () => {
    setNight(false);
    if (paused) return;
    setMood('hop');
    window.clearTimeout(hopTimer.current);
    hopTimer.current = window.setTimeout(() => setMood('idle'), 620);
  };

  // Where are we? Her greeting spot decides between "at home" and "docked"; stops decide what she says.
  useEffect(() => {
    const home = anchor.current;
    const watched = c.stops.map(s => document.getElementById(s.id)).filter((node): node is HTMLElement => Boolean(node));
    if (typeof IntersectionObserver === 'undefined') return;
    // Two thresholds: a single 0.15 would never report the spot leaving the screen completely.
    const homeSight = new IntersectionObserver(([entry]) => setHomeVisible(entry.isIntersecting && entry.intersectionRatio >= 0.15), { threshold: [0, 0.15] });
    if (home) homeSight.observe(home);
    const stopSight = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setStop(c.stops.findIndex(s => s.id === entry.target.id));
    }, { rootMargin: '-45% 0px -45% 0px' });
    watched.forEach(node => stopSight.observe(node));
    return () => { homeSight.disconnect(); stopSight.disconnect(); };
  }, [c.stops]);

  // Scrolling: she flies along while the page moves and looks the way it goes. Scroll events only, no loop.
  useEffect(() => {
    if (paused) { setMood('idle'); setLook(0); return; }
    let last = window.scrollY, settle: number | undefined, queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const delta = window.scrollY - last; last = window.scrollY;
        if (Math.abs(delta) < 6) return;
        setMood(current => (current === 'hop' ? current : 'fly'));
        setLook(delta > 0 ? 1 : -1);
        window.clearTimeout(settle);
        settle = window.setTimeout(() => { setMood(current => (current === 'fly' ? 'idle' : current)); setLook(0); }, 420);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.clearTimeout(settle); };
  }, [paused]);

  useEffect(() => () => window.clearTimeout(hopTimer.current), []);

  const current = stop >= 0 ? c.stops[stop] : undefined;
  const docked = phase !== 'greet' && !homeVisible;
  const sleeping = night && phase === 'greet';
  const figureMood: MoraMood = sleeping ? 'sleep' : mood === 'idle' && talking ? 'talk' : mood;

  const home = <div ref={anchor} className={styles.greet} data-testid="mora-guide" data-phase={phase} data-docked={docked}>
    <button type="button" className={styles.figure} aria-label={c.poke} onClick={() => { hop(); if (phase === 'greet') setTalking(true); }}>
      <PixelMora scale={3} mood={docked ? 'idle' : figureMood} look={look} still={paused} />
    </button>
    {phase === 'greet' && talking ? <div className={styles.bubble} role="status">
      <p>{sleeping ? c.sleepy : c.hello}</p>
      <div className={styles.actions}>
        <button type="button" className={styles.primary} onClick={() => choose('tour')}>{c.yes}</button>
        <button type="button" className={styles.ghost} onClick={() => choose('quiet')}>{c.self}</button>
      </div>
    </div> : null}
  </div>;

  const dock = docked && mounted ? createPortal(<aside className={styles.dock} aria-label={c.name} data-testid="mora-guide-dock">
    {talking && current ? <div className={styles.dockBubble}>
      <p>{current.text}</p>
      <div className={styles.actions}>
        {current.action ? <Link className={styles.primary} href={current.action.href}>{current.action.label}</Link> : null}
        {stop < c.stops.length - 1 ? <button type="button" className={current.action ? styles.ghost : styles.primary} onClick={() => goTo(stop + 1)}>{c.next}<ArrowRight size={13} aria-hidden="true" /></button> : null}
      </div>
      <button type="button" className={styles.close} aria-label={c.close} onClick={() => { setTalking(false); setPhase('quiet'); try { window.localStorage.setItem(GUIDE_KEY, 'quiet'); } catch {} }}><X size={14} aria-hidden="true" /></button>
    </div> : null}
    <button type="button" className={styles.dockFigure} aria-label={c.poke} aria-expanded={talking} onClick={() => { hop(); setTalking(value => !value); }}>
      <PixelMora scale={2} mood={mood} look={look} still={paused} />
    </button>
  </aside>, document.body) : null;

  return <>{home}{dock}</>;
}
