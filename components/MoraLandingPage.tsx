'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { FileText, CalendarDays, MessageSquare, Pause, Play } from 'lucide-react';
import { DemoLaunchButton } from './DemoLaunchButton';
import MoraOsFace from './MoraOsFace';
import styles from './MoraLandingPage.module.css';

type Props = { locale: 'de' | 'en'; children?: ReactNode };

const COPY = {
  de: {
    eyebrow: 'MÔRA · SAIMÔR OS',
    hero: ['Klarheit', 'im Wandel.'],
    heroSub: 'Deine ruhige Begleitung für Fokus, Orientierung und innere Klarheit.',
    cta: 'MÔRA im OS erleben',
    threads: ['Dateien', 'Termine', 'Nachrichten'],
    stone: 'MÔRA, der Jadestein mit Gesicht',
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
    heroSub: 'Your calm companion for focus, orientation and inner clarity.',
    cta: 'Experience MÔRA in the OS',
    threads: ['Files', 'Meetings', 'Messages'],
    stone: 'MÔRA, the jade stone with a face',
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
// Gold threads from the stone (left) to the three signals (right), in a 600x400 box.
const THREADS = Array.from({ length: 30 }, (_, i) => {
  const target = i % 3;
  const ty = 70 + target * 130;
  const sy = 190 + ((i * 37) % 40) - 20;
  const bend = ((i * 53) % 90) - 45;
  return { d: `M 20 ${sy} C 180 ${sy + bend}, 330 ${ty - bend}, 560 ${ty}`, delay: (i * 0.37) % 4, w: 0.6 + ((i * 7) % 5) / 6 };
});
// Phone: threads fall from the stone (top centre) to three signals in a row (bottom), 360x200 box.
const THREADS_MOBILE = Array.from({ length: 12 }, (_, i) => {
  const tx = 60 + (i % 3) * 120;
  const sx = 165 + ((i * 29) % 30);
  const bend = ((i * 41) % 70) - 35;
  const sway = ((i * 67) % 90) - 45;
  return { d: `M ${sx} 0 C ${sx + sway} 40, ${sx - bend * 1.6} 90, ${(sx + tx) / 2 + bend} 120 S ${tx + sway * 0.5} 170, ${tx} 190`, delay: (i * 0.41) % 4, w: 0.6 + ((i * 7) % 5) / 6 };
});
const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, size: 2.5 + ((i * 7) % 4) * 1.2, delay: `${(i * 0.7) % 9}s`, dur: `${9 + ((i * 5) % 8)}s`, gold: i % 3 !== 0,
}));

export default function MoraLandingPage({ locale, children }: Props) {
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
        {PARTICLES.map((p, i) => (
          <span key={i} className={styles.particle} data-gold={p.gold} style={{ left: p.left, top: p.top, width: p.size, height: p.size, animationDelay: p.delay, animationDuration: p.dur }} />
        ))}
      </div>

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

        <div className={styles.stage}>
          <svg className={styles.threadsMobile} viewBox="0 0 360 200" preserveAspectRatio="none" aria-hidden="true">
            {THREADS_MOBILE.map((t, i) => (
              <g key={i}>
                <path d={t.d} stroke="#e9c46a" strokeOpacity=".45" strokeWidth={t.w} fill="none" />
                <path d={t.d} className={styles.spark} pathLength={100} style={{ animationDelay: `${t.delay}s` }} />
              </g>
            ))}
          </svg>
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
                <path d={t.d} stroke="url(#moraThread)" strokeWidth={t.w * 1.4} fill="none" opacity=".9" className={styles.threadGlow} />
              </g>
            ))}
          </svg>
          <svg className={`${styles.threads} ${styles.sparkLayer}`} viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true">
            {THREADS.map((t, i) => (
              <g key={i}>
                <path d={t.d} className={`${styles.spark} ${styles.sparkHalo}`} pathLength={100} style={{ animationDelay: `${t.delay}s` }} />
                <path d={t.d} className={`${styles.spark} ${styles.sparkCore}`} pathLength={100} style={{ animationDelay: `${t.delay}s` }} />
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
            <div className={styles.stone} role="img" aria-label={c.stone} data-mora-presence>
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
