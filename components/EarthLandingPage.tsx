'use client';

import { useEffect, useState } from 'react';
import EarthGlobe from './EarthGlobe';
import Link from 'next/link';
import { ArrowRight, ExternalLink, History, BookOpen, Eye, Pause, Play } from 'lucide-react';
import styles from './EarthLandingPage.module.css';

type Props = { locale: 'de' | 'en' };
type Region = { key: string; name: string; eyebrow: string; summary: string; lat: number; lng: number; placeCount: number };

const COPY = {
  de: {
    eyebrow: 'SAIMÔR EARTH',
    hero: ['Orte', 'erinnern sich.'],
    heroSub: ['Earth ist ein Ort des Erinnerns.', 'Deine Geschichten. Deine Orte. Für immer.'],
    cta: 'Deinen Ort entdecken',
    earthUrl: 'https://earth.saimor.world',
    past: 'damals',
    now: 'heute',
    seed: 'Der Funke: Earths eigene Intelligenz, ein Lichtkeim im Wurzelnetz',
    regionsTitle: 'Lebendige Regionen',
    regionsText: 'Live aus earth.saimor.world. Jede Aussage ist markiert als belegt, eingeschätzt oder geplant.',
    places: 'Orte',
    open: 'In Earth öffnen',
    seedTitle: 'Der Funke hört zu.',
    seedText: 'Earth hat eine eigene Intelligenz: den Funken. Er wandert durch das Wurzelnetz, verbindet Erinnerungen mit Orten und zeigt, woher jedes Wissen stammt.',
    stories: [
      { type: 'Erinnerung', title: 'Der alte Leuchtturm', text: 'Eine Familie erzählt, wie der Leuchtturm über Generationen zum Treffpunkt wurde.', icon: History },
      { type: 'Wissen', title: 'Gezeiten und Watt', text: 'Fischer teilen ihr Wissen über die Rhythmen des Wattenmeers.', icon: BookOpen },
      { type: 'Wandel', title: 'Küste im Wandel', text: 'Bilder zeigen, wie sich die Küstenlinie über Jahrzehnte verändert hat.', icon: Eye },
    ],
    ctaTitle: 'Für Kommunen und Archive',
    ctaText: 'Earth verbindet lokales Wissen mit der Karte. Für Orte, die ihre Geschichte bewahren und teilen wollen.',
    contact: 'Kontakt aufnehmen',
    contactHref: '/de/kontakt',
    pause: 'Bewegung pausieren',
    resume: 'Bewegung fortsetzen',
    time: 'Zeit wählen',
    globe: 'Drehender Globus mit Wurzelnetz und den Regionen aus SAIMÔR Earth',
    funke: 'der Funke',
  },
  en: {
    eyebrow: 'SAIMÔR EARTH',
    hero: ['Places', 'remember.'],
    heroSub: ['Earth is a place of remembering.', 'Your stories. Your places. For good.'],
    cta: 'Discover your place',
    earthUrl: 'https://earth.saimor.world',
    past: 'then',
    now: 'now',
    seed: 'The Spark: Earth’s own intelligence, a seed of light in the root network',
    regionsTitle: 'Living regions',
    regionsText: 'Live from earth.saimor.world. Every statement is marked as evidenced, estimated or planned.',
    places: 'places',
    open: 'Open in Earth',
    seedTitle: 'The Spark is listening.',
    seedText: 'Earth has its own intelligence: the Spark. It travels through the root network, connects memories to places and shows where every piece of knowledge comes from.',
    stories: [
      { type: 'Memory', title: 'The old lighthouse', text: 'A family tells how the lighthouse became a meeting point across generations.', icon: History },
      { type: 'Knowledge', title: 'Tides and mudflats', text: 'Fishermen share their knowledge about the rhythms of the Wadden Sea.', icon: BookOpen },
      { type: 'Change', title: 'Coast in transition', text: 'Images show how the coastline has changed over decades.', icon: Eye },
    ],
    ctaTitle: 'For municipalities and archives',
    ctaText: 'Earth connects local knowledge to the map. For places that want to preserve and share their history.',
    contact: 'Get in touch',
    contactHref: '/en/contact',
    pause: 'Pause motion',
    resume: 'Resume motion',
    time: 'Select time',
    globe: 'Rotating globe with root network and the regions from SAIMÔR Earth',
    funke: 'the Spark',
  },
} as const;

const STATIC_REGIONS: Region[] = [
  { key: 'buesum', name: 'Büsum', eyebrow: 'Pilotkandidat an der Nordsee', summary: 'Küstenschutz, Artenvielfalt und Alltag werden als Ortsbiografie lesbar.', lat: 54.1333, lng: 8.8556, placeCount: 0 },
  { key: 'stuttgart', name: 'Stuttgart', eyebrow: 'Entwicklungs- und Testregion', summary: 'Stadtgrün zwischen Hängen, Quartieren und gemeinsam gepflegten Flächen.', lat: 48.7758, lng: 9.1829, placeCount: 0 },
];

export default function EarthLandingPage({ locale }: Props) {
  const c = COPY[locale];
  const [regions, setRegions] = useState<Region[]>(STATIC_REGIONS);
  const [time, setTime] = useState(100);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    fetch('https://earth.saimor.world/api/public/v1/regions')
      .then(res => (res.ok ? res.json() : null))
      .then((data: { regions?: Region[] } | null) => { if (data?.regions?.length) setRegions(data.regions); })
      .catch(() => {});
  }, []);

  const [reduced, setReduced] = useState(false);
  useEffect(() => { setReduced(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false); }, []);

  const growth = 0.35 + (time / 100) * 0.65;

  return (
    <div className={styles.page} data-still={paused} style={{ ['--growth' as string]: growth }}>
      <div className={styles.cosmos} aria-hidden="true"><div className={styles.stars} /></div>

      <section className={styles.hero} aria-labelledby="earth-hero-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{c.eyebrow}</p>
          <h1 id="earth-hero-title" className={styles.title}><span>{c.hero[0]}</span><span>{c.hero[1]}</span></h1>
          <span className={styles.rule} aria-hidden="true" />
          <p className={styles.sub}>{c.heroSub[0]}<br />{c.heroSub[1]}</p>
          <a href={c.earthUrl} target="_blank" rel="noopener noreferrer" className={styles.cta}>
            {c.cta} <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>

        <div className={styles.globeWrap}>
          <div className={styles.atmosphere} aria-hidden="true" />
          <EarthGlobe pins={regions} still={paused || reduced} label={c.globe} className={styles.globe} />
          <div className={styles.funke} role="img" aria-label={c.seed}>
            <span className={styles.funkeHalo} />
            <span className={styles.funkeOrbit}><i /><i /><i /></span>
            <span className={styles.funkeCore} />
            <span className={styles.funkeName}>{c.funke}</span>
          </div>
        </div>

        <div className={styles.timeline}>
          <span>{c.past}</span>
          <input type="range" min={0} max={100} value={time} onChange={e => setTime(Number(e.target.value))} aria-label={c.time} className={styles.slider} style={{ ['--v' as string]: `${time}%` }} />
          <span>{c.now}</span>
        </div>

        <button type="button" className={styles.pause} onClick={() => setPaused(p => !p)} aria-label={paused ? c.resume : c.pause}>
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </section>

      <section className={styles.regions} aria-labelledby="earth-regions">
        <h2 id="earth-regions">{c.regionsTitle}</h2>
        <p className={styles.lead}>{c.regionsText}</p>
        <div className={styles.regionGrid}>
          {regions.map(r => (
            <a key={r.key} href={`${c.earthUrl}`} target="_blank" rel="noopener noreferrer" className={styles.regionCard}>
              <span className={styles.regionEyebrow}>{r.eyebrow}</span>
              <h3>{r.name}</h3>
              <p>{r.summary}</p>
              <span className={styles.regionMeta}>{r.placeCount > 0 ? `${r.placeCount} ${c.places} · ` : ''}{c.open} <ExternalLink size={13} aria-hidden="true" /></span>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.spark} aria-labelledby="earth-spark">
        <div className={styles.sparkOrb} aria-hidden="true"><span /></div>
        <div>
          <h2 id="earth-spark">{c.seedTitle}</h2>
          <p className={styles.lead}>{c.seedText}</p>
        </div>
      </section>

      <section className={styles.stories} aria-label={c.regionsTitle}>
        {c.stories.map(s => {
          const Icon = s.icon;
          return (
            <article key={s.title} className={styles.story}>
              <Icon size={20} aria-hidden="true" />
              <span>{s.type}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          );
        })}
      </section>

      <section className={styles.closing} aria-labelledby="earth-closing">
        <h2 id="earth-closing">{c.ctaTitle}</h2>
        <p className={styles.lead}>{c.ctaText}</p>
        <div className={styles.closingActions}>
          <a href={c.earthUrl} target="_blank" rel="noopener noreferrer" className={styles.cta}>{c.cta} <ArrowRight size={17} aria-hidden="true" /></a>
          <Link href={c.contactHref} className={styles.ghost}>{c.contact}</Link>
        </div>
      </section>
    </div>
  );
}
