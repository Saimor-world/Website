'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUp, Pause, Play, RotateCcw } from 'lucide-react';
import PixelMora from './pixel/PixelMora';
import { BiomePlanet, PixelMoon, PixelSky, type Biome } from './pixel/PixelWorld';
import type { PlanetKind } from '@/lib/pixel/pixelArt';
import { UNIVERSE } from '@/lib/mora-guide-copy';
import styles from './MoraDeepView.module.css';

type Props = { locale: 'de' | 'en' };
type Mode = 'forest' | 'light' | 'welcome' | 'overview' | 'focus' | 'end';

/**
 * Where each part of SAIMÔR sits on the map (percent of the stage) and which piece of our world it carries:
 * the OS the earth, files the forest, work the water, agents the light, security the stone. Moons keep the OS painter.
 */
const BODIES: Record<string, { x: number; y: number; biome: Biome; d: number; spin: number; seed: number; moon: PlanetKind; moons?: number }> = {
  os: { x: 50, y: 44, biome: 'earth', d: 56, spin: 6 / 7, seed: 3, moon: 'jade' },
  files: { x: 18, y: 27, biome: 'forest', d: 26, spin: 1 / 7, seed: 11, moon: 'ice' },
  work: { x: 80, y: 25, biome: 'water', d: 30, spin: 0, seed: 21, moon: 'ocean', moons: 3 },
  agents: { x: 22, y: 66, biome: 'light', d: 24, spin: 1 / 7, seed: 31, moon: 'gas', moons: 1 },
  security: { x: 79, y: 64, biome: 'stone', d: 22, spin: 6 / 7, seed: 4100, moon: 'desert' },
};

/** The way up: forest and light come from the website's own pictures, reduced to a few colours on a coarse pixel grid. */
const SCENES = [
  { id: 'forest', portrait: '/images/pixel/forest-portrait.png', landscape: '/images/pixel/forest-landscape.png' },
  { id: 'light', portrait: '/images/pixel/light-portrait.png', landscape: '/images/pixel/light-landscape.png' },
] as const;

/**
 * Deep View: a journey with MÔRA from the forest by the water, up through the portal light, into the SAIMÔR universe.
 * The look is the OS pixel view: the same painter, sprites and colours, enlarged by whole numbers only.
 * Motion is transform/opacity in CSS plus one 1.2 s surface step per visible planet; no frame loop, no WebGL.
 */
export default function MoraDeepView({ locale }: Props) {
  const c = UNIVERSE[locale];
  const [mode, setMode] = useState<Mode>('forest');
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [px, setPx] = useState(2);
  const [entry, setEntry] = useState<'portal' | 'mora' | null>(null);
  const [flying, setFlying] = useState(false);
  const flight = useRef<number | undefined>(undefined);
  const heading = useRef<HTMLHeadingElement>(null);
  const still = paused || reduced;
  const journey = mode === 'forest' || mode === 'light';
  const stop = c.stops[index];

  const fly = useCallback(() => {
    if (still) return;
    setFlying(true);
    window.clearTimeout(flight.current);
    flight.current = window.setTimeout(() => setFlying(false), 900);
  }, [still]);

  const go = useCallback((target: Mode) => { setMode(target); fly(); }, [fly]);
  const show = useCallback((next: number, push = true) => {
    setIndex(next); setMode('focus'); fly();
    if (push) window.history.pushState(null, '', `#${c.stops[next].id}`);
  }, [c.stops, fly]);
  const overview = useCallback((push = true) => {
    setMode('overview'); fly();
    if (push && window.location.hash) window.history.pushState(null, '', window.location.pathname + window.location.search);
  }, [fly]);
  const next = () => (index < c.stops.length - 1 ? show(index + 1) : go('end'));
  const restart = () => { setIndex(0); setMode('welcome'); window.history.pushState(null, '', window.location.pathname + window.location.search); heading.current?.focus({ preventScroll: true }); };

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const wide = window.matchMedia?.('(min-width: 900px)');
    const sync = () => { setReduced(Boolean(media?.matches)); setPx(wide?.matches ? 3 : 2); };
    const restore = () => {
      const origin = new URLSearchParams(window.location.search).get('from');
      setEntry(origin === 'portal' || origin === 'mora' ? origin : null);
      const found = c.stops.findIndex(s => `#${s.id}` === window.location.hash);
      // A deep link (#work) lands on its planet at once; without one, the journey or the welcome stays where it is.
      if (found >= 0) { setIndex(found); setMode('focus'); } else setMode(current => (current === 'forest' || current === 'light' || current === 'welcome' ? current : 'overview'));
    };
    sync(); restore();
    media?.addEventListener?.('change', sync); wide?.addEventListener?.('change', sync);
    window.addEventListener('popstate', restore);
    return () => {
      media?.removeEventListener?.('change', sync); wide?.removeEventListener?.('change', sync);
      window.removeEventListener('popstate', restore); window.clearTimeout(flight.current);
    };
  }, [c.stops]);

  useEffect(() => {
    if (mode !== 'focus') return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') overview(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode, overview]);

  const home = locale === 'de' ? '/de' : '/en';
  const product = locale === 'de' ? '/mora' : '/en/mora';
  const backHref = entry === 'portal' ? `${home}#system` : entry === 'mora' ? `${product}#deep-view` : home;
  const backLabel = entry === 'portal' ? (locale === 'de' ? 'Zurück zum Portal' : 'Back to the portal') : entry === 'mora' ? (locale === 'de' ? 'Zurück zu MÔRA' : 'Back to MÔRA') : c.back;
  const languageHref = `${locale === 'de' ? '/en/mora/deep-view' : '/mora/deep-view'}${entry ? `?from=${entry}` : ''}`;
  const focused = mode === 'focus' ? stop : undefined;
  const body = focused ? BODIES[focused.id] : undefined;
  const hidden = journey || mode === 'focus';

  return (
    <div className={styles.world} data-mode={mode} data-paused={paused} data-still={still} data-testid="deep-universe"
      style={body ? { '--fx': `${body.x}%`, '--fy': `${body.y}%` } as CSSProperties : undefined}>
      <PixelSky still={still || journey} />

      <div className={styles.scenes} aria-hidden="true">
        {SCENES.map(scene => <picture key={scene.id} className={styles.scene} data-scene={scene.id}>
          <source media="(min-aspect-ratio: 1/1)" srcSet={scene.landscape} />
          {/* Plain <img>: next/image would resample the coarse pixels and blur them. */}
          <img src={scene.portrait} alt="" draggable={false} />
        </picture>)}
        <span className={styles.shaft} />
      </div>

      <header className={styles.topbar}>
        <Link href={backHref} className={styles.back}><ArrowLeft size={15} aria-hidden="true" />{backLabel}</Link>
        <h1 ref={heading} tabIndex={-1} className={styles.title}>{c.title}</h1>
        <div className={styles.controls}>
          <Link className={styles.language} href={languageHref} aria-label={locale === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'}>{locale === 'de' ? 'EN' : 'DE'}</Link>
          <button type="button" className={styles.motion} onClick={() => setPaused(value => !value)} aria-label={c.pause} aria-pressed={paused}>
            {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <section className={styles.stage} aria-label={c.title}>
        <div className={styles.map} data-testid="universe-map" aria-hidden={hidden}>
          <svg className={styles.orbits} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <ellipse cx="50" cy="44" rx="34" ry="13" /><ellipse cx="50" cy="44" rx="42" ry="22" />
          </svg>
          {c.stops.map((s, i) => {
            const b = BODIES[s.id];
            return <button key={s.id} type="button" className={styles.body} style={{ left: `${b.x}%`, top: `${b.y}%` }}
              aria-label={`${s.title}: ${s.sub}`} data-body={s.id} tabIndex={hidden ? -1 : 0} onClick={() => show(i)}>
              <BiomePlanet biome={b.biome} diameter={b.d} spin={b.spin} px={px} still={still || journey} />
              {Array.from({ length: b.moons ?? 0 }, (_, m) => <span key={m} className={styles.miniOrbit} data-cheap-motion
                style={{ '--r': `${b.d * px * 0.85 + 10 + m * 9}px`, '--t': `${18 + m * 7}s`, '--a': `${m * 130}deg` } as CSSProperties}>
                <PixelMoon kind={b.moon} diameter={5 + (m % 2)} seed={b.seed + m} px={px} className={styles.miniMoon} />
              </span>)}
              <span className={styles.label} style={{ top: `calc(50% + ${b.d * px * 0.5 + 10}px)` }}>{s.title}<small>{s.sub}</small></span>
            </button>;
          })}
        </div>

        {focused && body ? <div key={focused.id} className={styles.focus} data-testid={`focus-${focused.id}`}>
          <div className={styles.focusPlanet}>
            <BiomePlanet biome={body.biome} diameter={Math.round(body.d * 2.2)} spin={body.spin} px={2} still={still} />
          </div>
          {focused.moons?.map((moon, m) => <div key={moon} className={styles.focusMoon} data-moon={m}>
            <PixelMoon kind={body.moon} diameter={14 + (m % 2) * 2} seed={body.seed + m} px={2} />
            <span className={styles.label} style={{ top: '26px' }}>{moon}</span>
          </div>)}
          <p className={styles.focusTitle}>{focused.title}<small>{focused.sub}</small></p>
        </div> : null}
      </section>

      <div className={styles.guide} data-testid="universe-guide">
        <div className={styles.mora}>
          <div className={styles.flight} data-flying={flying}>
            <PixelMora scale={px === 3 ? 4 : 3} outfit={mode === 'forest' ? 'default' : 'captain'}
              mood={flying || mode === 'light' ? 'fly' : mode === 'welcome' || mode === 'forest' ? 'talk' : 'idle'}
              look={mode === 'focus' ? -1 : mode === 'forest' ? 0 : 1} still={still} />
          </div>
        </div>
        <div className={styles.bubble} role="status" key={`${mode}-${index}`}>
          {mode === 'forest' ? <>
            <p>{c.forest}</p>
            <div className={styles.actions}>
              <button type="button" className={styles.primary} onClick={() => go('light')}>{c.up}<ArrowUp size={13} aria-hidden="true" /></button>
            </div>
          </> : mode === 'light' ? <>
            <p>{c.light}</p>
            <div className={styles.actions}>
              <button type="button" className={styles.primary} onClick={() => go('welcome')}>{c.onward}<ArrowRight size={13} aria-hidden="true" /></button>
            </div>
          </> : mode === 'welcome' ? <>
            <p>{c.welcome}</p>
            <div className={styles.actions}>
              <button type="button" className={styles.primary} onClick={() => show(0)}>{c.start}<ArrowRight size={13} aria-hidden="true" /></button>
              <button type="button" className={styles.ghost} onClick={() => overview(false)}>{c.explore}</button>
            </div>
          </> : mode === 'focus' && stop ? <>
            <p>{stop.text}</p>
            <div className={styles.actions}>
              {stop.action ? <Link className={styles.ghost} href={stop.action.href}>{stop.action.label}</Link> : null}
              <button type="button" className={styles.primary} onClick={next}>{c.next}<ArrowRight size={13} aria-hidden="true" /></button>
              <button type="button" className={styles.ghost} onClick={() => overview()}>{c.overview}</button>
            </div>
          </> : mode === 'end' ? <>
            <p>{c.end}</p>
            <div className={styles.actions}>
              <Link className={styles.primary} href={c.endAction.href}>{c.endAction.label}</Link>
              <button type="button" className={styles.ghost} onClick={restart}><RotateCcw size={13} aria-hidden="true" />{c.again}</button>
            </div>
          </> : <p className={styles.hint}>{locale === 'de' ? 'Tippe einen Planeten an.' : 'Tap a planet.'}</p>}
        </div>
      </div>

      <footer className={styles.footer}><span>{c.status}</span></footer>
    </div>
  );
}
