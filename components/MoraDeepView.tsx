'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Pause, Play, RotateCcw } from 'lucide-react';
import PixelMora from './pixel/PixelMora';
import GlassPlanet, { TINT, type GlassBiome } from './GlassPlanet';
import { UNIVERSE } from '@/lib/mora-guide-copy';
import styles from './MoraDeepView.module.css';

type Props = { locale: 'de' | 'en' };
type Step = 1 | 2 | 3;
type Spot = { x: number; y: number; d: number };

/** How long the first two sentences stay before the film moves on (the third one stays). */
const STEP_MS = [6000, 6500];
/** The stream's surface, as a share of the screen height: lights are mirrored below this line. */
const WATER = 0.62;
const FOREST = '/images/saimor-forest-layer.webp';
const FOREST_SIZE = { w: 1672, h: 941 };

/**
 * The five lights above the forest: each part of SAIMÔR carries a piece of our world (earth, forest, water,
 * light, stone). Positions are shares of the screen, separately for phone and wide screens, so every light,
 * its glow and its label stay fully in the picture.
 */
const LIGHTS: Record<string, { biome: GlassBiome; phone: Spot; wide: Spot }> = {
  os: { biome: 'earth', phone: { x: 0.5, y: 0.33, d: 68 }, wide: { x: 0.5, y: 0.32, d: 124 } },
  files: { biome: 'forest', phone: { x: 0.2, y: 0.22, d: 40 }, wide: { x: 0.32, y: 0.2, d: 66 } },
  work: { biome: 'water', phone: { x: 0.79, y: 0.2, d: 46 }, wide: { x: 0.68, y: 0.19, d: 76 } },
  agents: { biome: 'light', phone: { x: 0.23, y: 0.46, d: 34 }, wide: { x: 0.35, y: 0.49, d: 56 } },
  security: { biome: 'stone', phone: { x: 0.77, y: 0.44, d: 34 }, wide: { x: 0.65, y: 0.49, d: 56 } },
};
/** Where MÔRA is in each step (by the water, rising with the stars, beside the lights) and while a light is open. */
const MORA = {
  phone: [[0.3, 0.63], [0.6, 0.54], [0.17, 0.6], [0.14, 0.86]],
  wide: [[0.36, 0.62], [0.46, 0.44], [0.2, 0.42], [0.28, 0.8]],
};
/** The river of stars follows the stream in the photo, from the waterfall down to the front (photo coordinates). */
const STREAM = [[0.79, 0.53], [0.72, 0.6], [0.62, 0.66], [0.53, 0.72], [0.47, 0.8], [0.44, 0.9], [0.43, 1.02]];
const DUST = Array.from({ length: 16 }, (_, i) => ({ x: 0.3 + ((i * 37) % 45) / 100, y: 0.66 + ((i * 53) % 22) / 100, delay: (i * 0.41) % 4.5 }));

function mulberry(seed: number) {
  return () => { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

/** Stars in the canopy gap and in the stream, mirrored and trembling; painted once per size into two canvases. */
function paintStars(base: HTMLCanvasElement, twinkle: HTMLCanvasElement, w: number, h: number, focusX: number) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const a = base.getContext('2d'), b = twinkle.getContext('2d');
  if (!a || !b) return;
  for (const [canvas, g] of [[base, a], [twinkle, b]] as const) {
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, w, h);
  }
  // Same framing as the photo (object-fit: cover, object-position: focusX 50%).
  const s = Math.max(w / FOREST_SIZE.w, h / FOREST_SIZE.h), dw = FOREST_SIZE.w * s, dh = FOREST_SIZE.h * s;
  const ox = (w - dw) * focusX, oy = (h - dh) / 2;
  const at = (nx: number, ny: number) => [ox + nx * dw, oy + ny * dh];
  const star = (g: CanvasRenderingContext2D, x: number, y: number, r: number, alpha: number, warm: boolean) => {
    const c = warm ? '255,226,170' : '214,236,255';
    const glow = g.createRadialGradient(x, y, 0, x, y, r * 4);
    glow.addColorStop(0, `rgba(${c},${alpha})`); glow.addColorStop(1, `rgba(${c},0)`);
    g.fillStyle = glow; g.beginPath(); g.arc(x, y, r * 4, 0, Math.PI * 2); g.fill();
    g.fillStyle = `rgba(255,255,255,${Math.min(1, alpha + 0.2)})`; g.beginPath(); g.arc(x, y, r * 0.6, 0, Math.PI * 2); g.fill();
  };
  const random = mulberry(11);
  for (let i = 0; i < 120; i++) {
    const [x, y] = at(0.5 + random() * 0.45, random() * 0.42);
    star(random() < 0.3 ? b : a, x, y, 0.5 + random() * 1.1, 0.25 + random() * 0.55, random() < 0.2);
  }
  const along = (t: number) => {
    const k = Math.min(STREAM.length - 2, Math.floor(t * (STREAM.length - 1))), f = t * (STREAM.length - 1) - k;
    return [STREAM[k][0] + (STREAM[k + 1][0] - STREAM[k][0]) * f, STREAM[k][1] + (STREAM[k + 1][1] - STREAM[k][1]) * f];
  };
  for (let i = 0; i < 190; i++) {
    const t = random(), [cx, cy] = along(t), spread = 0.02 + t * 0.11;
    const [x, y] = at(cx + (random() - 0.5) * spread * 1.6, cy + (random() - 0.5) * spread * 0.45);
    const alpha = 0.25 + random() * 0.5, g = random() < 0.3 ? b : a;
    // The mirrored star: a short shimmer below the point, fading out.
    const len = 5 + random() * 12, shimmer = g.createLinearGradient(0, y, 0, y + len);
    shimmer.addColorStop(0, `rgba(214,236,255,${alpha * 0.28})`); shimmer.addColorStop(1, 'rgba(214,236,255,0)');
    g.fillStyle = shimmer; g.fillRect(x - 0.5, y + 2, 1, len);
    star(g, x, y, 0.45 + random() * 0.9, alpha, random() < 0.25);
  }
}

/**
 * Deep View as a short film in one world: the forest stream at night, a river of stars in the water, and five
 * lights (SAIMÔR's parts as glass planets) rising above the forest, mirrored in the stream. It runs by itself
 * after the click that opened it; skip and pause are always there. At the end every light opens at a tap.
 * Motion is transform/opacity only; the stars are painted once; no frame loop, no WebGL.
 */
export default function MoraDeepView({ locale }: Props) {
  const c = UNIVERSE[locale];
  const [step, setStep] = useState<Step>(1);
  const [focus, setFocus] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [wide, setWide] = useState(false);
  const [entry, setEntry] = useState<'portal' | 'mora' | null>(null);
  const world = useRef<HTMLDivElement>(null);
  const base = useRef<HTMLCanvasElement>(null);
  const twinkle = useRef<HTMLCanvasElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const remaining = useRef(STEP_MS[0]);
  const still = paused || reduced;
  const stop = focus === null ? undefined : c.stops[focus];

  const open = useCallback((index: number, push = true) => {
    setStep(3); setFocus(index);
    if (push) window.history.pushState(null, '', `#${c.stops[index].id}`);
  }, [c.stops]);
  const close = useCallback((push = true) => {
    setFocus(null);
    if (push && window.location.hash) window.history.pushState(null, '', window.location.pathname + window.location.search);
  }, []);
  const next = () => (focus !== null && focus < c.stops.length - 1 ? open(focus + 1) : close());
  const restart = () => { close(); setStep(1); heading.current?.focus({ preventScroll: true }); };

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const large = window.matchMedia?.('(min-width: 900px)');
    const sync = () => {
      const calm = Boolean(media?.matches);
      setReduced(calm); setWide(Boolean(large?.matches));
      // Under reduced motion there is no film: straight to the lights.
      if (calm) setStep(3);
    };
    const restore = () => {
      const origin = new URLSearchParams(window.location.search).get('from');
      setEntry(origin === 'portal' || origin === 'mora' ? origin : null);
      const found = c.stops.findIndex(s => `#${s.id}` === window.location.hash);
      if (found >= 0) { setStep(3); setFocus(found); } else setFocus(null);
    };
    sync(); restore();
    media?.addEventListener?.('change', sync); large?.addEventListener?.('change', sync);
    window.addEventListener('popstate', restore);
    return () => {
      media?.removeEventListener?.('change', sync); large?.removeEventListener?.('change', sync);
      window.removeEventListener('popstate', restore);
    };
  }, [c.stops]);

  // The film: each sentence stays its time, then the next step. Pause keeps the rest of the time.
  useEffect(() => { remaining.current = STEP_MS[step - 1] ?? 0; }, [step]);
  useEffect(() => {
    if (step >= 3 || still) return;
    const started = Date.now();
    const timer = window.setTimeout(() => setStep(current => (current < 3 ? (current + 1) as Step : current)), remaining.current);
    return () => { window.clearTimeout(timer); remaining.current = Math.max(0, remaining.current - (Date.now() - started)); };
  }, [step, still]);

  useEffect(() => {
    if (focus === null) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focus, close]);

  // Stars: painted once per size (and again only when the framing changes).
  useEffect(() => {
    const node = world.current;
    if (!node || !base.current || !twinkle.current) return;
    let width = 0, height = 0, timer = 0;
    const draw = () => {
      const box = node.getBoundingClientRect();
      if (!box.width || (Math.round(box.width) === width && Math.round(box.height) === height)) return;
      width = Math.round(box.width); height = Math.round(box.height);
      paintStars(base.current!, twinkle.current!, box.width, box.height, box.width < box.height ? 0.6 : 0.5);
    };
    draw();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => { window.clearTimeout(timer); timer = window.setTimeout(draw, 160); });
    observer.observe(node);
    return () => { observer.disconnect(); window.clearTimeout(timer); };
  }, []);

  const home = locale === 'de' ? '/de' : '/en';
  const product = locale === 'de' ? '/mora' : '/en/mora';
  const backHref = entry === 'portal' ? `${home}#system` : entry === 'mora' ? `${product}#deep-view` : home;
  const backLabel = entry === 'portal' ? (locale === 'de' ? 'Zurück zum Portal' : 'Back to the portal') : entry === 'mora' ? (locale === 'de' ? 'Zurück zu MÔRA' : 'Back to MÔRA') : c.back;
  const languageHref = `${locale === 'de' ? '/en/mora/deep-view' : '/mora/deep-view'}${entry ? `?from=${entry}` : ''}`;
  const layout = wide ? 'wide' : 'phone';
  const [mx, my] = MORA[layout][focus !== null ? 3 : step - 1];
  const focused = stop ? LIGHTS[stop.id] : undefined;
  const lightsLive = step === 3 && focus === null;

  return (
    <div ref={world} className={styles.world} data-step={step} data-focus={focus !== null} data-paused={paused} data-still={still} data-testid="deep-universe"
      style={focused ? { '--fx': `${focused[layout].x * 100}%`, '--fy': `${focused[layout].y * 100}%` } as CSSProperties : undefined}>
      <div className={styles.scene} aria-hidden="true">
        <Image src={FOREST} alt="" fill priority quality={80} sizes="100vw" className={styles.forest} />
        <span className={styles.tint} />
        <span className={styles.night} />
        <span className={styles.moon} />
        <canvas ref={base} className={styles.stars} />
        <canvas ref={twinkle} className={`${styles.stars} ${styles.twinkle}`} data-cheap-motion />
        {step === 2 && !still ? DUST.map((d, i) => <span key={i} className={styles.dust} data-cheap-motion
          style={{ left: `${d.x * 100}%`, top: `${d.y * 100}%`, animationDelay: `${d.delay}s` }} />) : null}
        {c.stops.map(s => {
          const light = LIGHTS[s.id], p = light[layout];
          const mirror = Math.min(0.93, WATER + (WATER - p.y) * 0.42);
          // In the stream: a coloured shimmer on the water, and the planet itself upside down, broken into ripples.
          return <span key={s.id} className={styles.reflection} style={{ left: `${p.x * 100}%`, top: `${mirror * 100}%`, '--tint': TINT[light.biome], '--d': `${p.d}px` } as CSSProperties}>
            <span className={styles.shine} />
            <span className={styles.float} data-cheap-motion><GlassPlanet biome={light.biome} size={p.d} still /></span>
          </span>;
        })}
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
        <div className={styles.progress} aria-hidden="true">
          {[0, 1, 2].map(i => <i key={i}><b key={`${i}-${step}`} data-state={step > i + 1 || (i === 2 && step === 3) ? 'done' : step === i + 1 ? 'active' : 'todo'}
            style={{ animationDuration: `${STEP_MS[i] ?? 1}ms` }} /></i>)}
        </div>
      </header>

      <section className={styles.stage} aria-label={c.title} data-testid="universe-map">
        {c.stops.map((s, i) => {
          const light = LIGHTS[s.id], p = light[layout];
          return <button key={s.id} type="button" className={styles.light} data-body={s.id} aria-label={`${s.title}: ${s.sub}`}
            aria-hidden={!lightsLive} tabIndex={lightsLive ? 0 : -1} onClick={() => open(i)}
            style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%`, '--rise': `${(WATER - p.y) * 100}cqh`, '--d': `${p.d}px` } as CSSProperties}>
            <span className={styles.float} data-cheap-motion><GlassPlanet biome={light.biome} size={p.d} still={still} /></span>
            <span className={styles.label}>{s.title}<small>{s.sub}</small></span>
          </button>;
        })}

        <div className={styles.mora} style={{ '--mx': mx, '--my': my } as CSSProperties}>
          <PixelMora scale={wide ? 4 : 3} mood={focus !== null ? 'idle' : step === 2 ? 'fly' : step === 3 ? 'talk' : 'idle'}
            look={focus !== null ? 1 : 0} still={still} />
        </div>

        {stop && focused ? <div key={stop.id} className={styles.focus} data-testid={`focus-${stop.id}`}>
          <div className={styles.focusPlanet}><GlassPlanet biome={focused.biome} size={wide ? 220 : 150} still={still} /></div>
          {stop.moons?.map((moon, m) => <div key={moon} className={styles.focusMoon} data-moon={m}>
            <GlassPlanet biome={focused.biome} size={wide ? 40 : 30} still />
            <span className={styles.moonLabel}>{moon}</span>
          </div>)}
          <p className={styles.focusTitle}>{stop.title}<small>{stop.sub}</small></p>
        </div> : null}

        {stop ? <div className={styles.bubble} role="status" key={`stop-${stop.id}`}>
          <p>{stop.text}</p>
          <div className={styles.actions}>
            {stop.action ? <Link className={styles.ghost} href={stop.action.href}>{stop.action.label}</Link> : null}
            <button type="button" className={styles.primary} onClick={next}>{c.next}<ArrowRight size={13} aria-hidden="true" /></button>
            <button type="button" className={styles.ghost} onClick={() => close()}>{c.overview}</button>
          </div>
        </div> : <div className={styles.message} role="status" key={`film-${step}`}>
          <p>{c.film[step - 1]}</p>
          {step === 3 ? <>
            <small>{c.hint}</small>
            <div className={styles.endActions}>
              <Link className={styles.cta} href={c.endAction.href}>{c.endAction.label}</Link>
              <button type="button" className={styles.again} onClick={restart}><RotateCcw size={13} aria-hidden="true" />{c.again}</button>
            </div>
          </> : <small>{step} / 3</small>}
        </div>}
      </section>

      {/* Skip sits bottom right, where intros keep it, and never crowds the top bar on the phone. */}
      {step < 3 && focus === null ? <button type="button" className={styles.skip} onClick={() => setStep(3)}>{c.skip}</button> : null}
      <footer className={styles.footer}><span>{c.status}</span></footer>
    </div>
  );
}
