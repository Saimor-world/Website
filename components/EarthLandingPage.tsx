'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Sparkles, History, BookOpen, Eye, Pause, Play } from 'lucide-react';
import styles from './EarthLandingPage.module.css';

type Props = { locale: 'de' | 'en' };

const COPY = {
  de: {
    eyebrow: 'SAIMÔR EARTH',
    hero: 'Orte erinnern sich.',
    heroSub: 'Earth ist ein Ort des Erinnerns. Deine Geschichten. Deine Orte. Für immer.',
    cta: 'Deinen Ort entdecken',
    sliderPast: 'damals',
    sliderNow: 'heute',
    placeName: 'Büsum',
    placeRegion: 'Nordsee, Deutschland',
    networkLabel: 'LEBENDIGES NETZWERK',
    storiesLabel: 'BEISPIEL-GESCHICHTEN',
    storiesNote: 'Illustrative Beispiele · keine echten Daten',
    stories: [
      { type: 'Erinnerung', title: 'Der alte Leuchtturm', text: 'Eine Familie erzählt, wie der Leuchtturm über Generationen zum Treffpunkt wurde.', icon: History },
      { type: 'Wissen', title: 'Gezeiten und Schlick', text: 'Fischer teilen ihr Wissen über die Rhythmen des Wattenmeers.', icon: BookOpen },
      { type: 'Veränderung', title: 'Küste im Wandel', text: 'Aufnahmen zeigen, wie sich die Küstenlinie über Jahrzehnte verändert hat.', icon: Eye },
    ],
    ctaTitle: 'Für Kommunen und Archive',
    ctaText: 'Earth verbindet lokales Wissen mit der Karte. Für Orte, die ihre Geschichte bewahren und zugänglich machen wollen.',
    ctaButton: 'Kontakt aufnehmen',
    trustNote: 'Konzeptvorschau · Produkt in Entwicklung',
    pause: 'Bewegung pausieren',
    resume: 'Bewegung fortsetzen',
  },
  en: {
    eyebrow: 'SAIMÔR EARTH',
    hero: 'Places remember.',
    heroSub: 'Earth is a place of remembering. Your stories. Your places. Forever.',
    cta: 'Discover your place',
    sliderPast: 'then',
    sliderNow: 'now',
    placeName: 'Büsum',
    placeRegion: 'North Sea, Germany',
    networkLabel: 'LIVING NETWORK',
    storiesLabel: 'EXAMPLE STORIES',
    storiesNote: 'Illustrative examples · no real data',
    stories: [
      { type: 'Memory', title: 'The old lighthouse', text: 'A family tells how the lighthouse became a meeting point across generations.', icon: History },
      { type: 'Knowledge', title: 'Tides and mudflats', text: 'Fishermen share their knowledge about the rhythms of the Wadden Sea.', icon: BookOpen },
      { type: 'Change', title: 'Coast in transition', text: 'Images show how the coastline has changed over decades.', icon: Eye },
    ],
    ctaTitle: 'For municipalities and archives',
    ctaText: 'Earth connects local knowledge to the map. For places that want to preserve and share their history.',
    ctaButton: 'Get in touch',
    trustNote: 'Concept preview · product in development',
    pause: 'Pause motion',
    resume: 'Resume motion',
  },
} as const;

const PLACES = [
  { id: 'busum', name: 'Büsum', x: 52, y: 38 },
  { id: 'husum', name: 'Husum', x: 48, y: 32 },
  { id: 'st-peter', name: 'St. Peter-Ording', x: 44, y: 42 },
  { id: 'helgoland', name: 'Helgoland', x: 38, y: 28 },
];

export default function EarthLandingPage({ locale }: Props) {
  const c = COPY[locale];
  const [sliderValue, setSliderValue] = useState(100);
  const [activePlace, setActivePlace] = useState(0);
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

  return (
    <div className={styles.page} data-still={still}>
      <div className={styles.cosmos} aria-hidden="true">
        <div className={styles.stars} />
        <div className={styles.nebula} />
      </div>

      <section className={styles.hero} aria-labelledby="earth-hero-title">
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{c.eyebrow}</p>
          <h1 id="earth-hero-title">{c.hero}</h1>
          <p className={styles.heroSub}>{c.heroSub}</p>
          <button type="button" className={styles.heroCta}>
            {c.cta}
            <ArrowRight size={16} />
          </button>
        </div>

        <div className={styles.globeStage}>
          <GlobeVisualization places={PLACES} activePlace={activePlace} still={still} />
          <EarthIntelligence still={still} />
          <div className={styles.placeLabel}>
            <MapPin size={14} />
            <span>{PLACES[activePlace].name}</span>
          </div>
        </div>
      </section>

      <section className={styles.timeline} aria-label={locale === 'de' ? 'Zeitleiste' : 'Timeline'}>
        <div className={styles.timelineContent}>
          <div className={styles.sliderLabels}>
            <span>{c.sliderPast}</span>
            <span>{c.sliderNow}</span>
          </div>
          <div className={styles.sliderTrack}>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className={styles.slider}
              aria-label={locale === 'de' ? 'Zeit wählen' : 'Select time'}
            />
            <div className={styles.sliderProgress} style={{ '--progress': sliderValue / 100 } as CSSProperties} />
            <div className={styles.sliderMarkers}>
              {[0, 25, 50, 75, 100].map((pos) => (
                <span key={pos} className={styles.sliderMarker} style={{ left: `${pos}%` }} />
              ))}
            </div>
          </div>
          <div className={styles.placeSelector}>
            {PLACES.map((place, i) => (
              <button
                key={place.id}
                type="button"
                className={styles.placeButton}
                aria-pressed={activePlace === i}
                onClick={() => setActivePlace(i)}
              >
                {place.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.stories} aria-labelledby="stories-title">
        <p className={styles.storiesEyebrow}>{c.storiesLabel}</p>
        <div className={styles.storiesGrid}>
          {c.stories.map((story, i) => {
            const Icon = story.icon;
            return (
              <article key={i} className={styles.storyCard}>
                <div className={styles.storyType}>
                  <Icon size={14} />
                  <span>{story.type}</span>
                </div>
                <h3>{story.title}</h3>
                <p>{story.text}</p>
              </article>
            );
          })}
        </div>
        <p className={styles.storiesNote}>{c.storiesNote}</p>
      </section>

      <section className={styles.closing} aria-labelledby="closing-title">
        <div className={styles.closingContent}>
          <h2 id="closing-title">{c.ctaTitle}</h2>
          <p>{c.ctaText}</p>
          <Link href={locale === 'de' ? '/de/kontakt' : '/en/contact'} className={styles.closingCta}>
            {c.ctaButton}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className={styles.trust}>
        <p>{c.trustNote}</p>
      </footer>

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

function GlobeVisualization({ places, activePlace, still }: { places: typeof PLACES; activePlace: number; still: boolean }) {
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    const rng = mulberry32(0x62bfc0);
    const generated: string[] = [];

    for (let i = 0; i < places.length; i++) {
      for (let j = i + 1; j < places.length; j++) {
        const start = places[i];
        const end = places[j];
        const midX = (start.x + end.x) / 2 + (rng() - 0.5) * 8;
        const midY = (start.y + end.y) / 2 + (rng() - 0.5) * 8;
        generated.push(`M ${start.x} ${start.y} Q ${midX} ${midY}, ${end.x} ${end.y}`);
      }
    }

    for (let i = 0; i < 12; i++) {
      const startIdx = Math.floor(rng() * places.length);
      const start = places[startIdx];
      const endX = start.x + (rng() - 0.5) * 30;
      const endY = start.y + (rng() - 0.5) * 30;
      const cpX = (start.x + endX) / 2 + (rng() - 0.5) * 15;
      const cpY = (start.y + endY) / 2 + (rng() - 0.5) * 15;
      generated.push(`M ${start.x} ${start.y} Q ${cpX} ${cpY}, ${endX} ${endY}`);
    }

    setPaths(generated);
  }, [places]);

  return (
    <div className={styles.globe}>
      <div className={styles.globeGlow} aria-hidden="true" />
      <svg className={styles.globeSvg} viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <radialGradient id="globeGradient" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#1a3d30" />
            <stop offset="60%" stopColor="#0d1f18" />
            <stop offset="100%" stopColor="#06110e" />
          </radialGradient>
          <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8fcdb0" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#62bfc0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8fcdb0" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#globeGradient)" />
        <g className={styles.network} data-still={still}>
          {paths.map((d, i) => (
            <path
              key={i}
              d={d}
              className={styles.networkPath}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </g>
        {places.map((place, i) => (
          <g key={place.id} className={styles.placeNode} data-active={i === activePlace}>
            <circle cx={place.x} cy={place.y} r="3" className={styles.placeOuter} />
            <circle cx={place.x} cy={place.y} r="1.5" className={styles.placeInner} />
          </g>
        ))}
      </svg>
    </div>
  );
}

function EarthIntelligence({ still }: { still: boolean }) {
  return (
    <div className={styles.intelligence} data-still={still} aria-label="Earth Intelligence">
      <div className={styles.intelligenceCore}>
        <span className={styles.intelligenceGlow} />
        <span className={styles.intelligencePoint} />
        <span className={styles.intelligenceRing} />
        <span className={styles.intelligenceRing} data-delay="1" />
      </div>
    </div>
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
