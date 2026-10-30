'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Pause, Play } from 'lucide-react';
import type { MoraMood } from './MoraCharacter';
import PixelMora from './pixel/PixelMora';
import { BiomePlanet, type Biome } from './pixel/PixelWorld';
import styles from './MoraProductPage.module.css';

type Props = { locale: 'de' | 'en' };

const COPY = {
  de: {
    file: 'Dateien',
    calendar: 'Termine',
    open: 'Offene Dinge',
    personaEyebrow: 'WER MÔRA IST',
    personaTitle: 'Eine eigene Art, an deiner Seite zu sein.',
    personaText: 'MÔRA ist der Jadestein im Saimôr-Zeichen. Ihre Adern stehen für die Verbindungen zwischen Wissen und Arbeit. Ihr Blick zeigt, ob sie zuhört, nachdenkt oder etwas mitteilen möchte. Du gibst die Richtung vor.',
    statesLabel: 'Zustand wählen',
    states: [
      ['rest', 'Ruht', 'Nichts Neues. MÔRA hält den Stand und bleibt still.'],
      ['dream', 'Träumt', 'MÔRA ordnet, was passiert ist: verbindet nur mit Grund und verwirft Rauschen.'],
      ['speak', 'Spricht', 'MÔRA bringt einen Gedanken auf den Punkt und macht den nächsten Schritt nachvollziehbar.'],
      ['listen', 'Hört zu', 'Du gibst den Gedanken vor. MÔRA bleibt aufmerksam und hält den Zusammenhang.'],
    ] as [MoraMood, string, string][],
    sample: 'EIN BEISPIEL · KEINE LIVE-DATEN',
    contextHint: 'Wähle einen Zusammenhang.',
    contexts: [
      ['Die aktuelle Fassung.', 'Die Rückfrage gehört zum Angebot. Beides bleibt zusammen, bevor du weiterarbeitest.'],
      ['Mit Kontext in den Termin.', 'Zum Gespräch am Freitag gehören das Angebot und die noch offene Rückfrage.'],
      ['Ein klarer nächster Schritt.', 'Die Freigabe fehlt noch. Erst prüfen, dann das Angebot vor dem Termin bereitstellen.'],
    ],
    exampleEyebrow: 'EIN ZUSAMMENHANG',
    exampleTitle: 'Drei Signale. Eine Arbeitslage.',
    exampleBody: 'Ein Dokument wurde geändert. Ein Termin rückt näher. Eine Freigabe fehlt. Statt drei Apps und einen Chat neu zusammenzusetzen, bleibt daraus eine gemeinsame Lage.',
    deepEyebrow: 'DEEP VIEW',
    deepTitle: 'Vom Wald ins SAIMÔR-Universe.',
    deepText: 'Mit MÔRA vom Wasser im Wald durch das Licht nach oben. Jeder Planet trägt ein Stück unserer Welt und zeigt einen Teil von SAIMÔR.',
    deepCta: 'Mitkommen',
  },
  en: {
    file: 'Files',
    calendar: 'Meetings',
    open: 'Open work',
    personaEyebrow: 'WHO MÔRA IS',
    personaTitle: 'Her own way of being by your side.',
    personaText: 'MÔRA is the jade stone in the Saimôr sign. Her veins represent the connections between knowledge and work. Her expression shows when she is listening, thinking or sharing something. You set the direction.',
    statesLabel: 'Choose a state',
    states: [
      ['rest', 'Resting', 'Nothing new. MÔRA keeps the state and stays quiet.'],
      ['dream', 'Dreaming', 'MÔRA sorts what happened: connects only with a reason and drops noise.'],
      ['speak', 'Speaking', 'MÔRA puts a thought into words and makes the next step understandable.'],
      ['listen', 'Listening', 'You bring the thought. MÔRA stays attentive and keeps the context together.'],
    ] as [MoraMood, string, string][],
    sample: 'AN EXAMPLE · NO LIVE DATA',
    contextHint: 'Choose a connection.',
    contexts: [
      ['The current version.', 'The question belongs with the proposal. Both stay together before you continue.'],
      ['Context for the meeting.', 'Friday’s conversation connects to the proposal and the remaining question.'],
      ['A clear next step.', 'Approval is still pending. Check it first, then prepare the proposal before the meeting.'],
    ],
    exampleEyebrow: 'ONE CONTEXT',
    exampleTitle: 'Three signals. One working state.',
    exampleBody: 'A document changed. A meeting is getting closer. An approval is missing. Instead of rebuilding the situation across three apps and a chat, it stays one coherent state.',
    deepEyebrow: 'DEEP VIEW',
    deepTitle: 'From the forest into the SAIMÔR universe.',
    deepText: 'With MÔRA from the water in the forest up through the light. Every planet carries a piece of our world and shows a part of SAIMÔR.',
    deepCta: 'Come along',
  },
};

/** The three signals as small nature planets, the same as in the hero and the Deep View. */
const NODES: Biome[] = ['forest', 'water', 'light'];

export default function MoraProductPage({ locale }: Props) {
  const c = COPY[locale];
  const [context, setContext] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const visibility = () => setHidden(document.hidden);
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const motion = () => setReduced(Boolean(media?.matches));
    visibility(); motion();
    document.addEventListener('visibilitychange', visibility); media?.addEventListener?.('change', motion);
    return () => { document.removeEventListener('visibilitychange', visibility); media?.removeEventListener?.('change', motion); };
  }, []);
  const still = paused || hidden;
  const deepHref = `${locale === 'de' ? '/mora/deep-view' : '/en/mora/deep-view'}?from=mora`;
  const securityHref = locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check';

  return (
    <div className={styles.page} data-testid="mora-product" data-paused={still}>
      <section className="border-y border-white/[.08] bg-[#0b1c15] px-5 py-20 sm:px-8 md:py-28 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
          <div>
            <p className="font-mono text-[12px] font-semibold tracking-[.2em] text-[#e0bd67]/85">{c.exampleEyebrow}</p>
            <h2 className="mt-5 font-serif text-4xl font-light leading-[.96] tracking-[-.04em] text-white/95 sm:text-6xl">{c.exampleTitle}</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#dce9e0]/80 sm:text-base">{c.exampleBody}</p>
          </div>
          <div className={styles.contextBlock}>
            <div className={styles.contextMap} role="group" aria-label={c.contextHint}>
              <div className={styles.orbit} aria-hidden="true" />
              {/* MÔRA between the three signals, looking at the one you chose. */}
              <div className={styles.characterStage} aria-hidden="true">
                <PixelMora scale={3} mood="talk" look={context === 0 ? -1 : 1} still={still || reduced} />
              </div>
              {[c.file, c.calendar, c.open].map((label, i) => <ContextNode key={label} active={context === i} onClick={() => setContext(i)}
                className={[styles.files, styles.calendar, styles.openWork][i]} label={label}
                icon={<span className={styles.planetDot}><BiomePlanet biome={NODES[i]} diameter={12} px={2} still={still || reduced} /></span>} />)}
            </div>
            <div className={`${styles.contextReadout} ${styles.bubble}`} aria-live="polite" data-testid="mora-context-preview">
              <span>{c.sample}</span>
              <h3>{c.contexts[context][0]}</h3>
              <p>{c.contexts[context][1]}</p>
            </div>
            <button type="button" className={styles.motion} aria-pressed={paused} onClick={() => setPaused(value => !value)}>
              {paused ? <Play size={13} /> : <Pause size={13} />}
              {locale === 'de' ? paused ? 'Bewegung fortsetzen' : 'Bewegung pausieren' : paused ? 'Resume motion' : 'Pause motion'}
            </button>
          </div>
        </div>
      </section>

      <section id="deep-view" className="relative scroll-mt-24 overflow-hidden px-5 py-24 sm:px-8 md:py-32 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(104,190,155,.12),transparent_26%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl text-center [&_p]:mx-auto">
          <div>
            <div className={styles.deepMora} aria-hidden="true"><PixelMora scale={3} outfit="captain" mood="fly" still={still || reduced} /></div>
            <p className="font-mono text-[12px] font-semibold tracking-[.2em] text-[#e0bd67]/85">{c.deepEyebrow}</p>
            <h2 className="mt-5 font-serif text-5xl font-light leading-[.92] tracking-[-.045em] sm:text-7xl">{c.deepTitle}</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#dce9e0]/80 sm:text-base">{c.deepText}</p>
            <Link href={deepHref} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#f0d38c] transition hover:text-[#ffe3a0]">{c.deepCta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          </div>
        </div>
      </section>

    </div>
  );
}

function ContextNode({ className, icon, label, active, onClick }: { className: string; icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return <button type="button" className={`${styles.contextNode} ${className}`} aria-pressed={active} onClick={onClick}>
    {icon}<span>{label}</span>
  </button>;
}
