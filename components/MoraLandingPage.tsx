'use client';

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { FileText, CalendarDays, MessageSquare, Pause, Play } from 'lucide-react';
import { DemoLaunchButton } from './DemoLaunchButton';
import PixelMora from './pixel/PixelMora';
import { BiomePlanet, PixelSky, type Biome } from './pixel/PixelWorld';
import styles from './MoraLandingPage.module.css';

type Props = { locale: 'de' | 'en'; children?: ReactNode };

const COPY = {
  de: {
    eyebrow: 'MÔRA · SAIMÔR OS',
    hero: ['Klarheit', 'im Wandel.'],
    heroSub: 'MÔRA kennt deinen Laden und denkt mit.',
    cta: 'MÔRA im OS erleben',
    threads: ['Dateien', 'Termine', 'Nachrichten'],
    stone: 'MÔRA im Pixel-Himmel, umkreist von Dateien, Terminen und Nachrichten',
    pause: 'Hintergrundbewegung pausieren',
    resume: 'Hintergrundbewegung fortsetzen',
    featuresTitle: 'Aus Fragmenten wird Klarheit.',
    features: [
      { title: 'Sie hält den Zusammenhang', text: 'Dateien, Termine und Nachrichten finden zusammen. MÔRA weiß, worum es gerade geht.' },
      { title: 'Sie bereitet vor', text: 'Nächste Schritte, Entwürfe und Fragen liegen bereit, wenn du sie brauchst. Entscheiden tust du.' },
      { title: 'Sie bleibt ruhig', text: 'Keine Flut an Hinweisen. MÔRA meldet sich, wenn etwas wirklich zählt.' },
    ],
    trustTitle: 'Klare Grenzen',
    trustNote: 'MÔRA kann nur mit Kontext arbeiten, der im System vorhanden oder verbunden ist. Für Sprach- und Denkaufgaben können unterschiedliche externe Modellanbieter genutzt werden; MÔRA selbst ist nicht das Modell. Aktionen laufen über freigegebene Fähigkeiten und sollen sichtbar bleiben.',
    trust: [
      'MÔRA arbeitet nur mit Kontext, den du verbindest.',
      'MÔRA ist nicht das Modell, sie orchestriert.',
      'Aktionen laufen nur über freigegebene Fähigkeiten.',
      'Keine versteckten Datenflüsse.',
    ],
    osTitle: 'MÔRA lebt im Arbeitsraum.',
    osText: 'Im Demo-Raum siehst du, wie MÔRA Kontext behält und nächste Schritte vorbereitet. Der Demo-Tenant bleibt getrennt von echten Daten.',
    note: 'Produktvorschau · keine Live-Daten',
    glanceTitle: 'MÔRA, heute früh',
    glance: ['Zwei Dateien gehören zum Angebot Nordsee.', 'Um 14:00 wartet das Teamgespräch, alles liegt bereit.', 'Eine Nachricht braucht nur ein Ja.'],
  },
  en: {
    eyebrow: 'MÔRA · SAIMÔR OS',
    hero: ['Clarity', 'in change.'],
    heroSub: 'MÔRA knows your business and thinks along.',
    cta: 'Experience MÔRA in the OS',
    threads: ['Files', 'Meetings', 'Messages'],
    stone: 'MÔRA in the pixel sky, circled by files, meetings and messages',
    pause: 'Pause background motion',
    resume: 'Resume background motion',
    featuresTitle: 'From fragments to clarity.',
    features: [
      { title: 'She keeps the context', text: 'Files, meetings and messages come together. MÔRA knows what matters right now.' },
      { title: 'She prepares', text: 'Next steps, drafts and questions are ready when you need them. You decide.' },
      { title: 'She stays calm', text: 'No flood of notifications. MÔRA speaks up when something really counts.' },
    ],
    trustTitle: 'Clear boundaries',
    trustNote: 'MÔRA can only work with context that exists in the system or is connected to it. Different external model providers may be used for language and reasoning; MÔRA itself is not the model. Actions run through approved capabilities and are intended to remain visible.',
    trust: [
      'MÔRA only works with context you connect.',
      'MÔRA is not the model, she orchestrates.',
      'Actions only run through approved capabilities.',
      'No hidden data flows.',
    ],
    osTitle: 'MÔRA lives in the workspace.',
    osText: 'In the demo workspace you see how MÔRA keeps context and prepares next steps. The demo tenant stays separate from real data.',
    note: 'Product preview · no live data',
    glanceTitle: 'MÔRA, this morning',
    glance: ['Two files belong to the North Sea offer.', 'Your 2 pm team call is prepared.', 'One message only needs a yes.'],
  },
} as const;

const ICONS = [FileText, CalendarDays, MessageSquare];
/** Files, meetings and messages circle MÔRA as small nature planets: forest, water and light. */
const SIGNALS: { biome: Biome; d: number; angle: number }[] = [
  { biome: 'forest', d: 20, angle: -150 },
  { biome: 'water', d: 24, angle: -30 },
  { biome: 'light', d: 18, angle: 90 },
];

export default function MoraLandingPage({ locale, children }: Props) {
  const c = COPY[locale];
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const m = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const w = window.matchMedia?.('(min-width: 901px)');
    const sync = () => { setReduced(m?.matches ?? false); setWide(w?.matches ?? false); };
    sync();
    m?.addEventListener?.('change', sync); w?.addEventListener?.('change', sync);
    return () => { m?.removeEventListener?.('change', sync); w?.removeEventListener?.('change', sync); };
  }, []);

  const still = paused || reduced;

  return (
    <div className={styles.page} data-still={still}>
      <div className={styles.sky} aria-hidden="true"><PixelSky still={still} /></div>

      <section className={styles.hero} aria-labelledby="mora-hero-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{c.eyebrow}</p>
          <h1 id="mora-hero-title" className={styles.title}>
            <span>{c.hero[0]}</span>
            <span>{c.hero[1]}</span>
          </h1>
          <p className={styles.sub}>{c.heroSub}</p>
          <DemoLaunchButton locale={locale} label={c.cta} className={styles.cta} />
        </div>

        {/* MÔRA in the pixel sky: the sprite at a whole-number scale, three nature planets on one slow orbit.
            The ring turns in steps and each planet turns back, so labels stay upright; transform only. */}
        <div className={styles.stage}>
          <div className={styles.presence} role="img" aria-label={c.stone} data-mora-presence>
            <PixelMora scale={wide ? 6 : 4} mood="talk" still={still} className={styles.mora} />
          </div>
          <ul className={styles.ring} data-cheap-motion aria-hidden="true">
            {c.threads.map((label, i) => {
              const signal = SIGNALS[i];
              return <li key={label} className={styles.satellite} data-cheap-motion style={{ '--angle': `${signal.angle}deg` } as CSSProperties}>
                <span className={styles.upright} data-cheap-motion>
                  <BiomePlanet biome={signal.biome} diameter={signal.d} px={wide ? 3 : 2} still={still} />
                  <span className={styles.signalLabel} style={{ top: `${(signal.d * (wide ? 3 : 2)) / 2 + 8}px` }}>{label}</span>
                </span>
              </li>;
            })}
          </ul>
        </div>

        <button type="button" className={styles.pause} onClick={() => setPaused(p => !p)} aria-label={paused ? c.resume : c.pause}>
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </section>

      <section className={styles.features} aria-labelledby="mora-features">
        <h2 id="mora-features">{c.featuresTitle}</h2>
        <div className={styles.cards}>
          {c.features.map((f, i) => {
            const Icon = ICONS[i];
            return (
              <article key={f.title} className={styles.card}>
                <Icon size={20} aria-hidden="true" />
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      {children}

      <section className={styles.trust} aria-labelledby="mora-trust">
        <h2 id="mora-trust">{c.trustTitle}</h2>
        <ul>{c.trust.map(t => <li key={t}>{t}</li>)}</ul>
        <p className={styles.trustNote}>{c.trustNote}</p>
      </section>

      <section id="im-os" className={styles.os} aria-labelledby="mora-os">
        <h2 id="mora-os">{c.osTitle}</h2>
        <p>{c.osText}</p>
        <DemoLaunchButton locale={locale} label={c.cta} className={styles.cta} />
        <small>{c.note}</small>
      </section>
    </div>
  );
}
