'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FileText, CalendarDays, MessageSquare, Pause, Play } from 'lucide-react';
import { DemoLaunchButton } from './DemoLaunchButton';
import MoraOsFace from './MoraOsFace';
import styles from './MoraLandingPage.module.css';

type Props = { locale: 'de' | 'en' };

const COPY = {
  de: {
    eyebrow: 'MÔRA · SAIMÔR OS',
    hero: ['Klarheit', 'im Wandel.'],
    heroSub: 'Dein ruhender Begleiter für Fokus, Orientierung und innere Klarheit.',
    cta: 'MÔRA im OS erleben',
    threads: ['Dateien', 'Termine', 'Nachrichten'],
    stone: 'MÔRA, der Jadestein mit Gesicht',
    pause: 'Bewegung pausieren',
    resume: 'Bewegung fortsetzen',
    featuresTitle: 'Aus Fragmenten wird Klarheit.',
    features: [
      { title: 'Sie hält den Zusammenhang', text: 'Dateien, Termine und Nachrichten finden zusammen. MÔRA weiß, worum es gerade geht.' },
      { title: 'Sie bereitet vor', text: 'Nächste Schritte, Entwürfe und Fragen liegen bereit, wenn du sie brauchst. Entscheiden tust du.' },
      { title: 'Sie bleibt ruhig', text: 'Keine Flut an Hinweisen. MÔRA meldet sich, wenn etwas wirklich zählt.' },
    ],
    trustTitle: 'Klare Grenzen',
    trust: [
      'MÔRA arbeitet nur mit Kontext, den du verbindest.',
      'MÔRA ist nicht das Modell, sie orchestriert.',
      'Aktionen laufen nur über freigegebene Fähigkeiten.',
      'Keine versteckten Datenflüsse.',
    ],
    osTitle: 'MÔRA lebt im Arbeitsraum.',
    osText: 'Im Demo-Raum siehst du, wie MÔRA Kontext behält und nächste Schritte vorbereitet. Der Demo-Tenant bleibt getrennt von echten Daten.',
    note: 'Produktvorschau · keine Live-Daten',
  },
  en: {
    eyebrow: 'MÔRA · SAIMÔR OS',
    hero: ['Clarity', 'in change.'],
    heroSub: 'Your calm companion for focus, orientation and inner clarity.',
    cta: 'Experience MÔRA in the OS',
    threads: ['Files', 'Meetings', 'Messages'],
    stone: 'MÔRA, the jade stone with a face',
    pause: 'Pause motion',
    resume: 'Resume motion',
    featuresTitle: 'From fragments to clarity.',
    features: [
      { title: 'She keeps the context', text: 'Files, meetings and messages come together. MÔRA knows what matters right now.' },
      { title: 'She prepares', text: 'Next steps, drafts and questions are ready when you need them. You decide.' },
      { title: 'She stays calm', text: 'No flood of notifications. MÔRA speaks up when something really counts.' },
    ],
    trustTitle: 'Clear boundaries',
    trust: [
      'MÔRA only works with context you connect.',
      'MÔRA is not the model, she orchestrates.',
      'Actions only run through approved capabilities.',
      'No hidden data flows.',
    ],
    osTitle: 'MÔRA lives in the workspace.',
    osText: 'In the demo workspace you see how MÔRA keeps context and prepares next steps. The demo tenant stays separate from real data.',
    note: 'Product preview · no live data',
  },
} as const;

const ICONS = [FileText, CalendarDays, MessageSquare];
// Gold threads from the stone (left) to the three signals (right), in a 600x400 box.
const THREADS = Array.from({ length: 18 }, (_, i) => {
  const target = i % 3;
  const ty = 70 + target * 130;
  const sy = 190 + ((i * 37) % 40) - 20;
  const bend = ((i * 53) % 90) - 45;
  return { d: `M 20 ${sy} C 180 ${sy + bend}, 330 ${ty - bend}, 560 ${ty}`, delay: (i * 0.37) % 4, w: 0.6 + ((i * 7) % 5) / 6 };
});

export default function MoraLandingPage({ locale }: Props) {
  const c = COPY[locale];
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(m?.matches ?? false);
    sync();
    m?.addEventListener?.('change', sync);
    return () => m?.removeEventListener?.('change', sync);
  }, []);

  const still = paused || reduced;

  return (
    <div className={styles.page} data-still={still}>
      <div className={styles.sky} aria-hidden="true">
        <div className={styles.stars} />
        <div className={styles.nebula} />
        <div className={styles.dust} />
      </div>

      <section className={styles.hero} aria-labelledby="mora-hero-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{c.eyebrow}</p>
          <h1 id="mora-hero-title" className={styles.title}>
            <span>{c.hero[0]}</span>
            <span>{c.hero[1]}</span>
          </h1>
          <p className={styles.sub}>{c.heroSub}</p>
          <DemoLaunchButton locale={locale} label={`${c.cta} →`} className={styles.cta} />
        </div>

        <div className={styles.stage}>
          <svg className={styles.threads} viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="moraThread" x1="0" x2="1">
                <stop offset="0" stopColor="#f3d58f" stopOpacity="0" />
                <stop offset=".25" stopColor="#e9c46a" stopOpacity=".85" />
                <stop offset="1" stopColor="#f3d58f" stopOpacity=".25" />
              </linearGradient>
            </defs>
            {THREADS.map((t, i) => (
              <g key={i}>
                <path d={t.d} stroke="url(#moraThread)" strokeWidth={t.w} fill="none" opacity=".55" />
                <path d={t.d} className={styles.spark} pathLength={100} style={{ animationDelay: `${t.delay}s` }} />
              </g>
            ))}
          </svg>
          <ul className={styles.signals}>
            {c.threads.map((label, i) => {
              const Icon = ICONS[i];
              return (
                <li key={label} style={{ top: `${17.5 + i * 32.5}%` }}>
                  <Icon size={18} aria-hidden="true" />
                  <span>{label}</span>
                </li>
              );
            })}
          </ul>

          <div className={styles.orbit} aria-hidden="true"><span /></div>
          <div className={styles.float}>
            <div className={styles.stone} role="img" aria-label={c.stone}>
              <span className={styles.halo} aria-hidden="true" />
              <Image src="/brand/mora-stone-v1.png" alt="" width={504} height={504} priority draggable={false} className={styles.stoneImg} />
              <MoraOsFace size={420} />
              <span className={styles.sheen} aria-hidden="true" />
            </div>
          </div>
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

      <section className={styles.trust} aria-labelledby="mora-trust">
        <h2 id="mora-trust">{c.trustTitle}</h2>
        <ul>{c.trust.map(t => <li key={t}>{t}</li>)}</ul>
      </section>

      <section className={styles.os} aria-labelledby="mora-os">
        <h2 id="mora-os">{c.osTitle}</h2>
        <p>{c.osText}</p>
        <DemoLaunchButton locale={locale} label={`${c.cta} →`} className={styles.cta} />
        <small>{c.note}</small>
      </section>
    </div>
  );
}
