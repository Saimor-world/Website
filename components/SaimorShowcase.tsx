import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import styles from './SaimorShowcase.module.css';

type Locale = 'de' | 'en';

const copy = {
  de: {
    eyebrow: 'SAIMÔR / DIE WELTEN',
    heading: 'Ein Zusammenhang.\nMehr Raum für das Wesentliche.',
    intro: 'Nicht noch ein Bildschirm voller Funktionen. Sondern Orte, an denen Gedanken, Arbeit und Entscheidungen zusammenfinden.',
    moraCategory: '01 / INTELLIGENCE',
    moraTitle: 'MÔRA',
    moraStatement: 'Ein Gedanke geht weiter.',
    moraBody: 'Zwischen Nachrichten, Projekten und Terminen geht oft der Zusammenhang verloren. MÔRA hilft, ihn sichtbar zu halten – mit Quellen, Grenzen und deiner Freigabe vor Aktionen.',
    moraCta: 'MÔRA im Detail entdecken',
    moraArtworkLabel: 'Prinzipdarstellung · keine Live-Daten',
    moraRingTop: 'QUELLEN',
    moraRingRight: 'KONTEXT',
    moraRingBottom: 'FREIGABEN',
    yoriCategory: '02 / CREATIVE HOUSE',
    yoriTitle: 'YORI',
    yoriStatement: 'Arbeit braucht einen Ort.',
    yoriBody: 'Ein Haus statt unzähliger Tabs. Für Ideen, Termine und die Menschen hinter kreativer Arbeit – mit Räumen, die sich so selbstverständlich anfühlen wie ein echter Schreibtisch.',
    yoriCta: 'Das YORI-Haus entdecken',
    yoriArtworkLabel: 'Raummotiv aus der YORI-Produktvorschau',
    studioCategory: '03 / ZUSAMMENARBEIT',
    studioTitle: 'Etwas Eigenes vor?',
    studioBody: 'Von der ersten Frage bis zu einem sinnvollen Prototyp. Beratung, Workshops und Umsetzung – ohne unnötigen Überbau.',
    studioCta: 'Studio entdecken',
  },
  en: {
    eyebrow: 'SAIMÔR / THE WORLDS',
    heading: 'One continuous thread.\nMore room for what matters.',
    intro: 'Not another screen full of functions. Places where thought, work and decisions can come together.',
    moraCategory: '01 / INTELLIGENCE',
    moraTitle: 'MÔRA',
    moraStatement: 'Keep the thought moving.',
    moraBody: 'Context often gets lost between messages, projects and meetings. MÔRA helps keep it visible – with sources, boundaries and your approval before actions.',
    moraCta: 'Explore MÔRA',
    moraArtworkLabel: 'Concept illustration · no live data',
    moraRingTop: 'SOURCES',
    moraRingRight: 'CONTEXT',
    moraRingBottom: 'APPROVALS',
    yoriCategory: '02 / CREATIVE HOUSE',
    yoriTitle: 'YORI',
    yoriStatement: 'Work deserves a place.',
    yoriBody: 'A house instead of endless tabs. For ideas, appointments and the people behind creative work – with rooms that feel as natural as a real desk.',
    yoriCta: 'Explore the YORI house',
    yoriArtworkLabel: 'Room artwork from the YORI product preview',
    studioCategory: '03 / WORKING TOGETHER',
    studioTitle: 'Something in mind?',
    studioBody: 'From the first question to a useful prototype. Consulting, workshops and implementation without unnecessary complexity.',
    studioCta: 'Explore Studio',
  },
} as const;

export default function SaimorShowcase({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <section id="products" className={styles.section} aria-labelledby="products-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>{c.eyebrow}</span>
          <div className={styles.headerGrid}>
            <h2 id="products-title">{c.heading.split('\n').map((line, i) => <span key={line}>{i > 0 ? <span className={styles.headingSecond}>{line}</span> : line}</span>)}</h2>
            <p>{c.intro}</p>
          </div>
        </header>

        <article className={`${styles.feature} ${styles.mora}`}>
          <div className={styles.featureCopy}>
            <span className={styles.featureNumber}>{c.moraCategory}</span>
            <h3>{c.moraTitle}</h3>
            <p className={styles.featureStatement}>{c.moraStatement}</p>
            <p className={styles.featureBody}>{c.moraBody}</p>
            <Link href={locale === 'de' ? '/mora' : '/en/mora'} className={styles.featureLink}>{c.moraCta}<ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
          <div className={styles.moraArtwork} aria-label={c.moraArtworkLabel} role="img">
            <div className={styles.moraGlow} />
            <div className={styles.moraOrbitOne} />
            <div className={styles.moraOrbitTwo} />
            <div className={styles.moraOrbitThree} />
            <span className={styles.orbitTop}>{c.moraRingTop}</span>
            <span className={styles.orbitRight}>{c.moraRingRight}</span>
            <span className={styles.orbitBottom}>{c.moraRingBottom}</span>
            <span className={styles.moraCore} aria-hidden="true">M<span>Ô</span>RA</span>
            <span className={styles.artworkDisclaimer}>{c.moraArtworkLabel}</span>
          </div>
        </article>

        <article className={`${styles.feature} ${styles.yori}`}>
          <div className={styles.yoriArtwork}>
            <Image src="/world/luana/room-desk.webp" alt="" fill sizes="(max-width: 800px) 100vw, 55vw" className={styles.yoriImage} />
            <span className={styles.yoriArtworkCaption}>{c.yoriArtworkLabel}</span>
          </div>
          <div className={styles.featureCopy}>
            <span className={styles.featureNumber}>{c.yoriCategory}</span>
            <h3>{c.yoriTitle}</h3>
            <p className={styles.featureStatement}>{c.yoriStatement}</p>
            <p className={styles.featureBody}>{c.yoriBody}</p>
            <Link href={locale === 'de' ? '/yori' : '/en/yori'} className={styles.featureLink}>{c.yoriCta}<ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </article>

        <div className={styles.studioRow}>
          <div>
            <span className={styles.featureNumber}>{c.studioCategory}</span>
            <h3>{c.studioTitle}</h3>
            <p>{c.studioBody}</p>
          </div>
          <Link href={locale === 'de' ? '/studio' : '/en/studio'} className={styles.studioLink}>{c.studioCta}<ArrowRight size={19} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
