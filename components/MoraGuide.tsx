'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
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
 * or "look myself", so no page control is covered. "Look myself" sends her flying to the bottom-left corner,
 * where she stays (above the cookie banner, clear of the discoveries), except over the hero, where she only flies through. Reduced motion keeps her still; no frame loop runs.
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
  // The hero belongs to the flyby: while it is on screen she never sits in the corner.
  const [heroVisible, setHeroVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [night, setNight] = useState(false);
  // On a first visit the cookie banner owns the bottom of the screen; her greeting waits for that choice
  // (or for a deliberate tap on her), so the two never cover each other.
  const [consent, setConsent] = useState(false);
  const [poked, setPoked] = useState(false);
  const anchor = useRef<HTMLDivElement>(null);
  const homeFigure = useRef<HTMLButtonElement>(null);
  const dockFigure = useRef<HTMLButtonElement>(null);
  const hopTimer = useRef<number | undefined>(undefined);
  // Where she takes off from when the visitor sends her to the corner (FLIP: measured once, then transform only).
  const [takeoff, setTakeoff] = useState<DOMRect | null>(null);

  useEffect(() => {
    setMounted(true);
    setNight(isNight());
    setPaused(Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches));
    let stored: string | null = null;
    try { stored = window.localStorage.getItem(GUIDE_KEY); } catch {}
    if (stored === 'tour' || stored === 'quiet') { setPhase(stored); setTalking(stored === 'tour'); }
    const readConsent = () => { try { setConsent(Boolean(window.localStorage.getItem('cookie_consent'))); } catch { setConsent(true); } };
    readConsent();
    window.addEventListener('saimor-consent-change', readConsent);
    return () => window.removeEventListener('saimor-consent-change', readConsent);
  }, []);

  const choose = (next: Exclude<Phase, 'greet'>) => {
    if (next === 'quiet' && !paused && homeFigure.current) setTakeoff(homeFigure.current.getBoundingClientRect());
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

  // Where are we? Her greeting spot decides between "at home" and "docked" (with hysteresis: dock only once
  // it is fully gone, return from 15 % visible, so she never flickers at the edge).
  // What she talks about is the section crossing a thin reading line at 40 % of the screen; none, no talk.
  useEffect(() => {
    const home = anchor.current;
    const watched = c.stops.map(s => document.getElementById(s.id)).filter((node): node is HTMLElement => Boolean(node));
    if (typeof IntersectionObserver === 'undefined') return;
    const homeSight = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio >= 0.15) setHomeVisible(true);
      else if (!entry.isIntersecting) setHomeVisible(false);
    }, { threshold: [0, 0.15] });
    if (home) homeSight.observe(home);
    const hero = document.querySelector('[aria-labelledby="world-title"]');
    const heroSight = new IntersectionObserver(([entry]) => setHeroVisible(entry.intersectionRatio > 0.2), { threshold: [0, 0.2, 0.4] });
    if (hero) heroSight.observe(hero);
    const onLine = new Set<string>();
    const stopSight = new IntersectionObserver(entries => {
      for (const entry of entries) { if (entry.isIntersecting) onLine.add(entry.target.id); else onLine.delete(entry.target.id); }
      setStop(c.stops.findIndex(s => onLine.has(s.id)));
    }, { rootMargin: '-40% 0px -59% 0px' });
    watched.forEach(node => stopSight.observe(node));
    return () => { homeSight.disconnect(); heroSight.disconnect(); stopSight.disconnect(); };
  }, [c.stops]);

  // Scrolling: she flies along while the page moves and looks the way it goes. Scroll events only, no loop.
  useEffect(() => {
    if (paused) { setMood('idle'); setLook(0); return; }
    let last = window.scrollY, settle: number | undefined, queued = false;
    // The browser restores the scroll position after a reload; that is not the visitor moving.
    const calmUntil = performance.now() + 700;
    const onScroll = () => {
      if (queued || performance.now() < calmUntil) { last = window.scrollY; return; }
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
  // "Look myself" docks her at once and keeps her there; the tour docks once her greeting spot has scrolled away.
  // Never over the hero: there she only flies through (MoraFlyby), the corner stays empty.
  const docked = !heroVisible && (phase === 'quiet' || (phase === 'tour' && !homeVisible));
  const speaking = docked && talking && Boolean(current);

  // Mark the section she is talking about, and let the page know she is docked (the achievement toast moves up).
  useEffect(() => {
    const section = speaking && current ? document.getElementById(current.id) : null;
    section?.setAttribute('data-mora-focus', 'true');
    return () => section?.removeAttribute('data-mora-focus');
  }, [speaking, current]);
  useEffect(() => {
    if (!docked) return;
    document.body.dataset.moraDock = 'true';
    return () => { delete document.body.dataset.moraDock; };
  }, [docked]);
  // The flight into the corner: from her greeting spot in a short arc, in whole steps, transform only.
  useLayoutEffect(() => {
    const figure = dockFigure.current;
    if (!takeoff || !figure) return;
    setTakeoff(null);
    if (typeof figure.animate !== 'function') return;
    const land = figure.getBoundingClientRect();
    const dx = takeoff.left + takeoff.width / 2 - (land.left + land.width / 2);
    const dy = takeoff.top + takeoff.height / 2 - (land.top + land.height / 2);
    const k = land.width ? takeoff.width / land.width : 1;
    setMood('fly');
    const flight = figure.animate([
      { transform: `translate(${dx}px,${dy}px) scale(${k})` },
      { transform: `translate(${dx * 0.45}px,${dy * 0.45 - 80}px) scale(${(k + 1) / 2})`, offset: 0.45 },
      { transform: 'none' },
    ], { duration: 1100, easing: 'steps(22)' });
    flight.onfinish = () => setMood(current => (current === 'fly' ? 'idle' : current));
  }, [takeoff, docked]);

  const sleeping = night && phase === 'greet';
  const figureMood: MoraMood = sleeping ? 'sleep' : mood === 'idle' && talking ? 'talk' : mood;

  const home = <div ref={anchor} className={styles.greet} data-testid="mora-guide" data-phase={phase} data-docked={docked}>
    <button ref={homeFigure} type="button" className={styles.figure} aria-label={c.poke} onClick={() => { hop(); setPoked(true); if (phase === 'greet') setTalking(true); }}>
      <PixelMora scale={3} mood={docked ? 'idle' : figureMood} look={look} still={paused} />
    </button>
    {mounted && phase === 'greet' && talking && (consent || poked) ? <div className={styles.bubble} role="status">
      <p>{sleeping ? c.sleepy : c.hello}</p>
      <div className={styles.actions}>
        <button type="button" className={styles.primary} onClick={() => choose('tour')}>{c.yes}</button>
        <button type="button" className={styles.ghost} onClick={() => choose('quiet')}>{c.self}</button>
      </div>
    </div> : null}
  </div>;

  const dock = docked && mounted ? createPortal(<aside className={styles.dock} aria-label={c.name} data-testid="mora-guide-dock" data-flight={Boolean(takeoff)}>
    {speaking && current ? <div className={styles.dockBubble} data-about={current.id}>
      <p className={styles.about}>{c.about}: {current.label}</p>
      <p>{current.text}</p>
      <div className={styles.actions}>
        {current.action ? <Link className={styles.primary} href={current.action.href}>{current.action.label}</Link> : null}
        {stop < c.stops.length - 1 ? <button type="button" className={current.action ? styles.ghost : styles.primary} onClick={() => goTo(stop + 1)}>{c.next}<ArrowRight size={13} aria-hidden="true" /></button> : null}
      </div>
      <button type="button" className={styles.close} aria-label={c.close} onClick={() => { setTalking(false); setPhase('quiet'); try { window.localStorage.setItem(GUIDE_KEY, 'quiet'); } catch {} }}><X size={14} aria-hidden="true" /></button>
    </div> : null}
    <button ref={dockFigure} type="button" className={styles.dockFigure} aria-label={c.poke} aria-expanded={talking} onClick={() => { hop(); setTalking(value => !value); }}>
      <PixelMora scale={2} mood={mood} look={speaking && mood === 'idle' ? -1 : look} still={paused} />
    </button>
  </aside>, document.body) : null;

  return <>{home}{dock}</>;
}
