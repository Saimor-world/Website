'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, MapPin, History, BookOpen, Eye, Pause, Play, ExternalLink } from 'lucide-react';
import styles from './EarthLandingPage.module.css';

type Props = { locale: 'de' | 'en' };

type Region = {
  key: string;
  name: string;
  eyebrow: string;
  summary: string;
  lat: number;
  lng: number;
  placeCount: number;
};

const COPY = {
  de: {
    eyebrow: 'SAIMÔR EARTH',
    hero: 'Die Welt ist die Oberfläche.',
    heroSub: 'Drehe den Globus, fliege in eine Region und öffne einen real verorteten Ort. Gelände, Gebäude, Belege und Entwicklung bleiben eine zusammenhängende Welt.',
    cta: 'Earth öffnen',
    earthUrl: 'https://earth.saimor.world',
    sliderPast: 'damals',
    sliderNow: 'heute',
    regionsLabel: 'REGIONEN',
    networkLabel: 'LEBENDIGES NETZWERK',
    storiesLabel: 'BEISPIEL-GESCHICHTEN · BÜSUM',
    storiesNote: 'Illustrative Beispiele · Büsum hat noch keine veröffentlichten Orte',
    noPlacesNote: 'Noch keine veröffentlichten Orte in dieser Region.',
    stories: [
      { type: 'Erinnerung', title: 'Der alte Leuchtturm', text: 'Eine Familie erzählt, wie der Leuchtturm über Generationen zum Treffpunkt wurde.', icon: History },
      { type: 'Wissen', title: 'Gezeiten und Schlick', text: 'Fischer teilen ihr Wissen über die Rhythmen des Wattenmeers.', icon: BookOpen },
      { type: 'Veränderung', title: 'Küste im Wandel', text: 'Aufnahmen zeigen, wie sich die Küstenlinie über Jahrzehnte verändert hat.', icon: Eye },
    ],
    ctaTitle: 'Für Kommunen und Archive',
    ctaText: 'Earth verbindet lokales Wissen mit der Karte. Für Orte, die ihre Geschichte bewahren und zugänglich machen wollen.',
    ctaButton: 'Kontakt aufnehmen',
    openEarth: 'Earth öffnen',
    trustNote: 'Dokumentierte Veränderungen an realen Orten · Jede Aussage ist als belegt, eingeschätzt oder geplant gekennzeichnet',
    pause: 'Bewegung pausieren',
    resume: 'Bewegung fortsetzen',
  },
  en: {
    eyebrow: 'SAIMÔR EARTH',
    hero: 'The world is the surface.',
    heroSub: 'Spin the globe, fly into a region and open a real located place. Terrain, buildings, evidence and development remain one connected world.',
    cta: 'Open Earth',
    earthUrl: 'https://earth.saimor.world',
    sliderPast: 'then',
    sliderNow: 'now',
    regionsLabel: 'REGIONS',
    networkLabel: 'LIVING NETWORK',
    storiesLabel: 'EXAMPLE STORIES · BÜSUM',
    storiesNote: 'Illustrative examples · Büsum has no published places yet',
    noPlacesNote: 'No published places in this region yet.',
    stories: [
      { type: 'Memory', title: 'The old lighthouse', text: 'A family tells how the lighthouse became a meeting point across generations.', icon: History },
      { type: 'Knowledge', title: 'Tides and mudflats', text: 'Fishermen share their knowledge about the rhythms of the Wadden Sea.', icon: BookOpen },
      { type: 'Change', title: 'Coast in transition', text: 'Images show how the coastline has changed over decades.', icon: Eye },
    ],
    ctaTitle: 'For municipalities and archives',
    ctaText: 'Earth connects local knowledge to the map. For places that want to preserve and share their history.',
    ctaButton: 'Get in touch',
    openEarth: 'Open Earth',
    trustNote: 'Documented changes at real places · Every statement is marked as evidenced, estimated or planned',
    pause: 'Pause motion',
    resume: 'Resume motion',
  },
} as const;

const STATIC_REGIONS: Region[] = [
  { key: 'buesum', name: 'Büsum', eyebrow: 'Pilotkandidat an der Nordsee', summary: 'Küstenschutz, Artenvielfalt und Alltag werden als Ortsbiografie lesbar.', lat: 54.1333, lng: 8.8556, placeCount: 0 },
  { key: 'stuttgart', name: 'Stuttgart', eyebrow: 'Entwicklungs- und Testregion', summary: 'Stadtgrün zwischen Hängen, Quartieren und gemeinsam gepflegten Flächen.', lat: 48.7758, lng: 9.1829, placeCount: 0 },
];

export default function EarthLandingPage({ locale }: Props) {
  const c = COPY[locale];
  const [regions, setRegions] = useState<Region[]>(STATIC_REGIONS);
  const [activeRegion, setActiveRegion] = useState(0);
  const [sliderValue, setSliderValue] = useState(100);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    fetch('https://earth.saimor.world/api/public/v1/regions')
      .then(res => res.json())
      .then((data: { regions: Region[] }) => {
        if (data.regions?.length) setRegions(data.regions);
      })
      .catch(() => {});
  }, []);

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
  const currentRegion = regions[activeRegion] || regions[0];

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
          <a href={c.earthUrl} target="_blank" rel="noopener noreferrer" className={styles.heroCta}>
            {c.cta}
            <ExternalLink size={15} />
          </a>
        </div>

        <div className={styles.globeStage}>
          <GlobeVisualization regions={regions} activeRegion={activeRegion} still={still} />
          <EarthIntelligence still={still} />
          <div className={styles.placeLabel}>
            <MapPin size={14} />
            <span>{currentRegion.name}</span>
          </div>
        </div>
      </section>

      <section className={styles.regions} aria-labelledby="regions-title">
        <p id="regions-title" className={styles.regionsEyebrow}>{c.regionsLabel}</p>
        <div className={styles.regionCards}>
          {regions.map((region, i) => (
            <button
              key={region.key}
              type="button"
              className={styles.regionCard}
              aria-pressed={activeRegion === i}
              onClick={() => setActiveRegion(i)}
            >
              <span className={styles.regionEyebrow}>{region.eyebrow}</span>
              <span className={styles.regionName}>{region.name}</span>
              <span className={styles.regionSummary}>{region.summary}</span>
              <span className={styles.regionPlaces}>
                {region.placeCount === 0 
                  ? c.noPlacesNote 
                  : `${region.placeCount} ${locale === 'de' ? 'Orte' : 'places'}`}
              </span>
            </button>
          ))}
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
          <div className={styles.closingActions}>
            <a href={c.earthUrl} target="_blank" rel="noopener noreferrer" className={styles.closingCtaPrimary}>
              {c.openEarth}
              <ExternalLink size={15} />
            </a>
            <Link href={locale === 'de' ? '/de/kontakt' : '/en/contact'} className={styles.closingCtaSecondary}>
              {c.ctaButton}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <footer className={styles.trust}>
        <p>{c.trustNote}</p>
        <a href={c.earthUrl} target="_blank" rel="noopener noreferrer" className={styles.trustLink}>
          earth.saimor.world
          <ArrowUpRight size={12} />
        </a>
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

function latLngToXY(lat: number, lng: number): { x: number; y: number } {
  const x = 50 + ((lng - 9) / 3) * 20;
  const y = 50 - ((lat - 51) / 5) * 25;
  return { x: Math.max(15, Math.min(85, x)), y: Math.max(15, Math.min(85, y)) };
}

function GlobeVisualization({ regions, activeRegion, still }: { regions: Region[]; activeRegion: number; still: boolean }) {
  const [paths, setPaths] = useState<string[]>([]);
  const positions = regions.map(r => latLngToXY(r.lat, r.lng));

  useEffect(() => {
    const rng = mulberry32(0x62bfc0);
    const generated: string[] = [];

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const start = positions[i];
        const end = positions[j];
        const midX = (start.x + end.x) / 2 + (rng() - 0.5) * 8;
        const midY = (start.y + end.y) / 2 + (rng() - 0.5) * 8;
        generated.push(`M ${start.x} ${start.y} Q ${midX} ${midY}, ${end.x} ${end.y}`);
      }
    }

    for (let i = 0; i < 12; i++) {
      const startIdx = Math.floor(rng() * positions.length);
      const start = positions[startIdx];
      const endX = start.x + (rng() - 0.5) * 30;
      const endY = start.y + (rng() - 0.5) * 30;
      const cpX = (start.x + endX) / 2 + (rng() - 0.5) * 15;
      const cpY = (start.y + endY) / 2 + (rng() - 0.5) * 15;
      generated.push(`M ${start.x} ${start.y} Q ${cpX} ${cpY}, ${endX} ${endY}`);
    }

    setPaths(generated);
  }, [positions]);

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
        {positions.map((pos, i) => (
          <g key={regions[i]?.key || i} className={styles.placeNode} data-active={i === activeRegion}>
            <circle cx={pos.x} cy={pos.y} r="3" className={styles.placeOuter} />
            <circle cx={pos.x} cy={pos.y} r="1.5" className={styles.placeInner} />
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
