'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { FileText, CalendarDays, MessageSquare, Pause, Play } from 'lucide-react';
import { DemoLaunchButton } from './DemoLaunchButton';
import MoraHeroPresence from './MoraHeroPresence';
import { MORA_LANDING_COPY } from './MoraLandingCopy';
import styles from './MoraLandingPage.module.css';

type Props = { locale: 'de' | 'en'; children?: ReactNode };
const ICONS = [FileText, CalendarDays, MessageSquare];
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`,
  size: 2 + ((i * 7) % 4), delay: `${(i * .7) % 9}s`, dur: `${9 + ((i * 5) % 8)}s`,
}));

export default function MoraLandingPage({ locale, children }: Props) {
  const c = MORA_LANDING_COPY[locale];
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query?.matches ?? false);
    sync(); query?.addEventListener?.('change', sync);
    return () => query?.removeEventListener?.('change', sync);
  }, []);
  const still = paused || reduced;
  return <div className={styles.page} data-still={still}>
    <div className={styles.sky} aria-hidden="true">
      <div className={styles.stars} /><div className={styles.nebula} />
      {PARTICLES.map((p, i) => <span key={i} className={styles.particle} style={{
        left: p.left, top: p.top, width: p.size, height: p.size,
        animationDelay: p.delay, animationDuration: p.dur,
      }} />)}
    </div>
    <section className={styles.hero} aria-labelledby="mora-hero-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{c.eyebrow}</p>
        <h1 id="mora-hero-title" className={styles.title}>
          <span>{c.hero[0]}</span><span>{c.hero[1]}</span>
        </h1>
        <p className={styles.sub}>{c.heroSub}</p>
      </div>
      <div className={styles.stage}>
        <MoraHeroPresence paused={still} locale={locale} />
        <ul className={styles.signals} aria-label={locale === 'de' ? 'Kontext im OS' : 'OS context'}>
          {c.threads.map((label, i) => { const Icon = ICONS[i];
            return <li key={label}><Icon size={16} aria-hidden="true" /><span>{label}</span></li>;
          })}
        </ul>
      </div>
      <div className={styles.actions}>
        <DemoLaunchButton locale={locale} label={c.cta} className={styles.cta} />
        <button type="button" className={styles.pause} aria-pressed={paused}
          onClick={() => setPaused(value => !value)} aria-label={paused ? c.resume : c.pause}>
          {paused ? <Play size={15} /> : <Pause size={15} />}
        </button>
      </div>
    </section>
    <section className={styles.features} aria-labelledby="mora-features">
      <h2 id="mora-features">{c.featuresTitle}</h2>
      <div className={styles.cards}>{c.features.map((feature, i) => { const Icon = ICONS[i];
        return <article key={feature.title} className={styles.card}>
          <Icon size={20} aria-hidden="true" /><h3>{feature.title}</h3><p>{feature.text}</p>
        </article>;
      })}</div>
    </section>
    {children}
    <section className={styles.trust} aria-labelledby="mora-trust">
      <h2 id="mora-trust">{c.trustTitle}</h2>
      <ul>{c.trust.map(text => <li key={text}>{text}</li>)}</ul>
      <p className={styles.trustNote}>{c.trustNote}</p>
    </section>
    <section id="im-os" className={styles.os} aria-labelledby="mora-os">
      <h2 id="mora-os">{c.osTitle}</h2><p>{c.osText}</p>
      <DemoLaunchButton locale={locale} label={c.cta} className={styles.cta} />
      <small>{c.note}</small>
    </section>
  </div>;
}
