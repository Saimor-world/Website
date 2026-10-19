import Link from 'next/link';
import { ArrowUpRight, CircleHelp, Fingerprint, ShieldAlert } from 'lucide-react';
import styles from './AiRealityTeaser.module.css';

const COPY = {
  de: {
    eyebrow: 'REALITÄTSPRÜFUNG / KI',
    introduction: 'Drei Fragen, die eine überzeugende Antwort offenlässt.',
    layers: [
      { number: '01', Icon: CircleHelp, question: 'Klingt sicher.', counterpoint: 'Ist es auch belegt?' },
      { number: '02', Icon: Fingerprint, question: 'Wirkt verbunden.', counterpoint: 'Gehört es wirklich zusammen?' },
      { number: '03', Icon: ShieldAlert, question: 'Kann etwas auslösen.', counterpoint: 'Wer gibt es frei?' },
    ],
    step: 'Inszenierte Begegnung · keine Live-Analyse',
    action: 'Realitätsprüfung öffnen',
  },
  en: {
    eyebrow: 'REALITY CHECK / AI',
    introduction: 'Three questions a convincing answer may leave unanswered.',
    layers: [
      { number: '01', Icon: CircleHelp, question: 'Sounds certain.', counterpoint: 'Is there evidence?' },
      { number: '02', Icon: Fingerprint, question: 'Looks connected.', counterpoint: 'Does it really belong together?' },
      { number: '03', Icon: ShieldAlert, question: 'Could trigger an action.', counterpoint: 'Who approved it?' },
    ],
    step: 'Staged encounter · no live analysis',
    action: 'Open Reality Check',
  },
} as const;

/** A hint of the risky / fascinating AI landscape. The page beyond supplies clarity. */
export default function AiRealityTeaser({ locale }: { locale: 'de' | 'en' }) {
  const c = COPY[locale];
  return (
    <aside className={styles.world} aria-label={c.eyebrow}>
      <div className={styles.glow} aria-hidden="true" />
      <p className={styles.eyebrow}>{c.eyebrow}</p>
      <p className={styles.intro}>{c.introduction}</p>
      <div className={styles.signals}>
        {c.layers.map(({ number, Icon, question, counterpoint }) => (
          <div className={styles.signal} key={number}>
            <span className={styles.number}>{number}</span>
            <Icon size={20} strokeWidth={1.2} aria-hidden="true" className={styles.icon} />
            <div className={styles.signalText}>
              <strong>{question}</strong>
              <span>{counterpoint}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.ending}>
        <span className={styles.disclaimer}>{c.step}</span>
        <Link href={locale === 'de' ? '/mora/deep-view' : '/en/mora/deep-view'} className={styles.link}>
          {c.action}<ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
