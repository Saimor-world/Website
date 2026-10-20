'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import { ArrowRight, Pause, Play, FileText, CalendarDays, MessageSquare } from 'lucide-react';
import { DemoLaunchButton } from './DemoLaunchButton';
import MoraOsFace from './MoraOsFace';
import styles from './MoraLandingPage.module.css';

type Props = { locale: 'de' | 'en' };

const COPY = {
  de: {
    hero: 'Klarheit im Wandel.',
    heroSub: 'Dein ruhender Begleiter für Fokus, Orientierung und innere Klarheit.',
    cta: 'MÔRA im OS erleben',
    pause: 'Bewegung pausieren',
    resume: 'Bewegung fortsetzen',
    fogLabel: 'NEBEL',
    arrivingLabel: 'MÔRA KOMMT',
    gatheringLabel: 'FÄDEN FINDEN ZUSAMMEN',
    clearingLabel: 'LICHTUNG',
    lichtungTitle: 'Aus Fragmenten wird Klarheit.',
    lichtungText: 'Dateien, Termine, Nachrichten – sie finden zusammen. MÔRA hält den Zusammenhang.',
    threadLabels: ['Dateien', 'Termine', 'Nachrichten'],
    osTitle: 'MÔRA gehört in den Arbeitsraum.',
    osText: 'Im Demo-Raum siehst du, wie MÔRA Kontext behält und nächste Schritte vorbereitet. Der Demo-Tenant bleibt getrennt von deinen echten Daten.',
    trustTitle: 'Klare Grenzen',
    trustItems: [
      'MÔRA kann nur mit verbundenem Kontext arbeiten.',
      'MÔRA selbst ist nicht das Modell – sie orchestriert.',
      'Aktionen laufen über freigegebene Fähigkeiten.',
      'Keine versteckten Datenflüsse.',
    ],
    trustNote: 'Produktvorschau · keine Live-Daten',
  },
  en: {
    hero: 'Clarity in change.',
    heroSub: 'Your calm companion for focus, orientation and inner clarity.',
    cta: 'Experience MÔRA in the OS',
    pause: 'Pause motion',
    resume: 'Resume motion',
    fogLabel: 'MIST',
    arrivingLabel: 'MÔRA ARRIVES',
    gatheringLabel: 'THREADS COME TOGETHER',
    clearingLabel: 'CLEARING',
    lichtungTitle: 'From fragments to clarity.',
    lichtungText: 'Files, meetings, messages – they come together. MÔRA keeps the context.',
    threadLabels: ['Files', 'Meetings', 'Messages'],
    osTitle: 'MÔRA belongs inside the workspace.',
    osText: 'In the demo workspace you can see how MÔRA keeps context and prepares next steps. The demo tenant stays separate from your real data.',
    trustTitle: 'Clear boundaries',
    trustItems: [
      'MÔRA can only work with connected context.',
      'MÔRA herself is not the model – she orchestrates.',
      'Actions run through approved capabilities.',
      'No hidden data flows.',
    ],
    trustNote: 'Product preview · no live data',
  },
} as const;

type Phase = 'fog' | 'arriving' | 'gathering' | 'clearing' | 'os';

export default function MoraLandingPage({ locale }: Props) {
  const c = COPY[locale];
  const containerRef = useRef<HTMLDivElement>(null);
  const moraRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>('fog');
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    setReduced(media?.matches ?? false);
    const handler = () => setReduced(media?.matches ?? false);
    media?.addEventListener?.('change', handler);
    return () => media?.removeEventListener?.('change', handler);
  }, []);

  useEffect(() => {
    const handler = () => setHidden(document.hidden);
    handler();
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  const still = paused || reduced || hidden;

  const updatePhase = useCallback((scrollProgress: number) => {
    setProgress(scrollProgress);
    if (scrollProgress < 0.15) setPhase('fog');
    else if (scrollProgress < 0.35) setPhase('arriving');
    else if (scrollProgress < 0.6) setPhase('gathering');
    else if (scrollProgress < 0.85) setPhase('clearing');
    else setPhase('os');
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = container.getBoundingClientRect();
        const viewH = window.innerHeight;
        const total = rect.height - viewH;
        const scrolled = -rect.top;
        const p = Math.max(0, Math.min(1, scrolled / total));
        updatePhase(p);

        if (moraRef.current) {
          const moraY = Math.min(viewH * 0.4, scrolled * 0.3);
          moraRef.current.style.setProperty('--mora-y', `${moraY}px`);
        }
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [updatePhase]);

  return (
    <div
      ref={containerRef}
      className={styles.page}
      data-phase={phase}
      data-still={still}
      style={{ '--progress': progress } as CSSProperties}
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <div className={styles.stars} />
        <div className={styles.fog} />
        <div className={styles.glow} />
        <div className={styles.grain} />
      </div>

      <section className={styles.hero} aria-labelledby="mora-hero-title">
        <div className={styles.heroContent}>
          <h1 id="mora-hero-title" className={styles.heroTitle}>{c.hero}</h1>
          <p className={styles.heroSub}>{c.heroSub}</p>
          <DemoLaunchButton locale={locale} label={c.cta} className={styles.heroCta} />
        </div>
      </section>

      <div className={styles.moraStage} ref={moraRef} aria-label={locale === 'de' ? 'MÔRA' : 'MÔRA'}>
        <div className={styles.moraContainer}>
          <span className={styles.moraHalo} aria-hidden="true" />
          <Image
            src="/brand/mora-stone-v1.png"
            alt=""
            width={504}
            height={504}
            priority
            draggable={false}
            className={styles.moraStone}
          />
          <MoraOsFace size={280} state={phase === 'clearing' || phase === 'os' ? 'done' : phase === 'gathering' ? 'listen' : 'think'} />
          <span className={styles.moraSheen} aria-hidden="true" />
        </div>
      </div>

      <section className={styles.threads} aria-label={c.gatheringLabel}>
        <ThreadsVisualization phase={phase} still={still} labels={c.threadLabels} />
        <div className={styles.phaseLabel}>
          {phase === 'fog' && c.fogLabel}
          {phase === 'arriving' && c.arrivingLabel}
          {phase === 'gathering' && c.gatheringLabel}
          {phase === 'clearing' && c.clearingLabel}
        </div>
      </section>

      <section className={styles.lichtung} aria-labelledby="lichtung-title">
        <div className={styles.lichtungGlow} aria-hidden="true" />
        <div className={styles.lichtungContent}>
          <h2 id="lichtung-title">{c.lichtungTitle}</h2>
          <p>{c.lichtungText}</p>
        </div>
      </section>

      <section className={styles.osSection} aria-labelledby="os-title">
        <div className={styles.osContent}>
          <h2 id="os-title">{c.osTitle}</h2>
          <p>{c.osText}</p>
          <DemoLaunchButton locale={locale} label={c.cta} className={styles.osCta} />
        </div>
      </section>

      <section className={styles.trust} aria-labelledby="trust-title">
        <h3 id="trust-title">{c.trustTitle}</h3>
        <ul>
          {c.trustItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <p className={styles.trustNote}>{c.trustNote}</p>
      </section>

      <button
        type="button"
        className={styles.motionToggle}
        onClick={() => setPaused(!paused)}
        aria-pressed={paused}
        aria-label={paused ? c.resume : c.pause}
      >
        {paused ? <Play size={14} /> : <Pause size={14} />}
      </button>
    </div>
  );
}

function ThreadsVisualization({ phase, still, labels }: { phase: Phase; still: boolean; labels: readonly string[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [paths, setPaths] = useState<{ d: string; type: number }[]>([]);

  useEffect(() => {
    const rng = mulberry32(0x4a7d60);
    const generated: { d: string; type: number }[] = [];
    const types = [0, 1, 2];

    for (let i = 0; i < 15; i++) {
      const type = types[i % 3];
      const baseX = type === 0 ? 15 : type === 1 ? 50 : 85;
      const startX = baseX + (rng() - 0.5) * 20;
      const startY = 92 + rng() * 8;
      const endX = 50 + (rng() - 0.5) * 8;
      const endY = 38 + rng() * 4;
      const cp1x = startX + (rng() - 0.5) * 25;
      const cp1y = startY - 15 - rng() * 25;
      const cp2x = endX + (rng() - 0.5) * 15;
      const cp2y = endY + 8 + rng() * 15;

      generated.push({
        d: `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`,
        type,
      });
    }
    setPaths(generated);
  }, []);

  const visible = phase === 'gathering' || phase === 'clearing' || phase === 'os';
  const bright = phase === 'clearing' || phase === 'os';
  const icons = [FileText, CalendarDays, MessageSquare];

  return (
    <>
      <svg
        ref={svgRef}
        className={styles.threadsSvg}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        data-visible={visible}
        data-bright={bright}
        data-still={still}
      >
        <defs>
          <linearGradient id="threadGradientJade" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#8fcdb0" stopOpacity="0.15" />
            <stop offset="60%" stopColor="#8fcdb0" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#e6c98d" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="threadGradientGold" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.15" />
            <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#e6c98d" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="threadGradientTeal" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#62bfc0" stopOpacity="0.12" />
            <stop offset="60%" stopColor="#62bfc0" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8fcdb0" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            className={styles.thread}
            data-type={p.type}
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </svg>
      <div className={styles.threadSources} data-visible={visible} aria-hidden="true">
        {icons.map((Icon, i) => (
          <div key={i} className={styles.threadSource} data-type={i} style={{ animationDelay: `${i * 0.2}s` }}>
            <Icon size={18} />
            <span>{labels[i]}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
