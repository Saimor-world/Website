'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import styles from './MoraPerspective.module.css';

const COPY = {
  de: {
    label: 'DURCH MÔRAS AUGEN', example: 'FIKTIVE SZENE',
    claim: 'Wir starten morgen.', open: 'Noch nicht freigegeben.',
    whisper: 'Eine Antwort kann sicher klingen.', context: 'Ein Vorschlag ist noch keine Entscheidung.',
    look: 'Genauer hinsehen', source: 'PROJEKTCHAT · 09:14', approval: 'FREIGABE · 09:32',
    quote: '„Vorschlag: Wir starten morgen.“', missing: '„Noch keine Freigabe. Bitte warten.“',
    choose: 'Was machst du daraus?', clarify: 'Freigabe klären', wait: 'Offen lassen',
    clarified: 'Erst klären.', waiting: 'Bewusst offen.', yours: 'Die Entscheidung bleibt bei dir.',
    result: 'Nur in dieser Szene gewählt. Keine Nachricht, keine Aktion ausgelöst.',
    product: 'MÔRA kennenlernen', lab: 'Das Prinzip dahinter',
  },
  en: {
    label: 'THROUGH MÔRA’S EYES', example: 'FICTIONAL SCENE',
    claim: 'We launch tomorrow.', open: 'Not yet approved.',
    whisper: 'An answer can sound certain.', context: 'A suggestion is not a decision.',
    look: 'Look closer', source: 'PROJECT CHAT · 09:14', approval: 'APPROVAL · 09:32',
    quote: '“Suggestion: let’s launch tomorrow.”', missing: '“Not approved yet. Please wait.”',
    choose: 'What will you do with this?', clarify: 'Clarify approval', wait: 'Leave it open',
    clarified: 'Clarify first.', waiting: 'Deliberately open.', yours: 'The decision stays with you.',
    result: 'A choice in this scene only. No message sent, no action taken.',
    product: 'Discover MÔRA', lab: 'Explore the principle',
  },
} as const;

/** Local, fictional scene: a confident claim changes when its context becomes visible. */
export default function MoraPerspective({ locale }: { locale: 'de' | 'en' }) {
  const c = COPY[locale];
  const [revealed, setRevealed] = useState(false);
  const [decision, setDecision] = useState<'clarify' | 'wait' | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [revealed, decision]);

  return (
    <div className={styles.perspective} data-testid="deep-clarity"
      data-revealed={revealed} data-decided={Boolean(decision)}
      onPointerMove={event => {
        event.currentTarget.style.setProperty('--gaze-x', `${event.clientX}px`);
        event.currentTarget.style.setProperty('--gaze-y', `${event.clientY}px`);
      }}>
      <div className={styles.light} aria-hidden="true" />
      <svg className={styles.constellation} viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth=".7">
          <path className={styles.tangle} d="M-90 140 C880 540 120 -50 830 550 S180 220 1120 70 M80 650 C800 150 180 590 1050 290" />
          <path className={styles.thread} d="M160 365 Q330 170 500 200 Q680 170 840 365" />
          <path className={styles.thread} d="M160 365 Q500 620 840 365" strokeDasharray="3 9" />
        </g>
        <g className={styles.thread} fill="currentColor"><circle cx="160" cy="365" r="3" /><circle cx="840" cy="365" r="3" /></g>
      </svg>
      <div className={styles.title}>
        <p className={styles.label}>{c.label} <span>· {c.example}</span></p>
        <h1 ref={heading} tabIndex={-1}>
          {decision ? (decision === 'clarify' ? c.clarified : c.waiting) : revealed ? c.open : c.claim}
        </h1>
        <p className={styles.whisper}>{decision ? c.yours : revealed ? c.context : c.whisper}</p>
      </div>
      <div className={styles.sources} aria-hidden={!revealed}>
        <blockquote className={styles.source}>
          <cite>{c.source}</cite><p>{c.quote}</p>
        </blockquote>
        <blockquote className={styles.source}>
          <cite>{c.approval}</cite><p>{c.missing}</p>
        </blockquote>
      </div>
      <div className={styles.actions}>
        {!revealed ? (
          <button type="button" className={styles.look} onClick={() => setRevealed(true)}>
            {c.look}<ArrowRight size={17} />
          </button>
        ) : !decision ? (
          <div className={styles.choice} role="group" aria-label={c.choose}>
            <p>{c.choose}</p>
            <div>
              <button type="button" className={styles.look} onClick={() => setDecision('clarify')}>{c.clarify}<ArrowRight size={17} /></button>
              <button type="button" className={styles.quiet} onClick={() => setDecision('wait')}>{c.wait}</button>
            </div>
          </div>
        ) : (
          <div className={styles.ending}>
            <p role="status">{c.result}</p>
            <div>
              <Link className={styles.look} href={locale === 'de' ? '/mora' : '/en/mora'}>{c.product}<ArrowUpRight size={17} /></Link>
              <Link className={styles.quiet} href={locale === 'de' ? '/mora/deep-view/lab' : '/en/mora/deep-view/lab'}>{c.lab}</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
