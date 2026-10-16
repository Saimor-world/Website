'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, RotateCcw } from 'lucide-react';
import MoraOsFace from './MoraOsFace';
import styles from './MoraDeepView.module.css';

type Scene = 'uncertainty' | 'mora' | 'clarity';
type Props = { locale: 'de' | 'en' };
const COPY = {
  de: {
    back: 'Zurück', world: 'DIE WELT DER KI', question: 'Alles klingt möglich.', doubt: 'Aber was ist wirklich wahr?',
    meet: 'MÔRA begegnen', name: 'MÔRA.', presence: 'Einen Moment. Wir schauen genauer hin.', look: 'Durch ihre Augen sehen',
    clarity: 'Sieh den Unterschied.', clarityLabel: 'DURCH MÔRAS AUGEN',
    truths: ['Was belegt ist.', 'Was Vermutung bleibt.', 'Was du entscheidest.'],
    product: 'MÔRA kennenlernen', lab: 'Das Prinzip dahinter', reset: 'Noch einmal',
    status: 'INSZENIERUNG · KEINE LIVE-ANALYSE', pause: 'Bewegung pausieren',
    noise: ['Gewissheit.', 'Verbindung.', 'Entscheidung.'],
  },
  en: {
    back: 'Back', world: 'THE WORLD OF AI', question: 'Everything sounds possible.', doubt: 'But what is actually true?',
    meet: 'Meet MÔRA', name: 'MÔRA.', presence: 'A moment. Let’s look a little closer.', look: 'See through her eyes',
    clarity: 'See the difference.', clarityLabel: 'THROUGH MÔRA’S EYES',
    truths: ['What is evidenced.', 'What remains a guess.', 'What you decide.'],
    product: 'Discover MÔRA', lab: 'Explore the principle', reset: 'Experience again',
    status: 'STAGED EXPERIENCE · NO LIVE ANALYSIS', pause: 'Pause motion',
    noise: ['Certainty.', 'Connection.', 'Decision.'],
  },
} as const;

/** A staged film in three acts. No fetching, AI claims, scene floor or invented face.
 * The same light field loses its ambiguity as the visitor moves through MÔRA's eyes.
 */
export default function MoraDeepView({ locale }: Props) {
  const c = COPY[locale];
  const [scene, setScene] = useState<Scene>('uncertainty');
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [crossing, setCrossing] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const crossingTimer = useRef<number | undefined>(undefined);

  const go = (next: Scene) => {
    window.history.pushState(null, '', next === 'uncertainty' ? window.location.pathname : `#${next}`);
    setScene(next);
    window.requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }));
  };

  useEffect(() => {
    const restore = () => {
      window.clearTimeout(crossingTimer.current);
      setCrossing(false);
      setScene(window.location.hash === '#clarity' ? 'clarity' : window.location.hash === '#mora' ? 'mora' : 'uncertainty');
    };
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReduced(Boolean(media?.matches));
    syncMotion();
    restore();
    window.addEventListener('popstate', restore);
    media?.addEventListener?.('change', syncMotion);
    return () => {
      window.clearTimeout(crossingTimer.current);
      window.removeEventListener('popstate', restore);
      media?.removeEventListener?.('change', syncMotion);
    };
  }, []);

  useEffect(() => {
    if (scene !== 'uncertainty' || paused || reduced) return;
    let timer: number | undefined;
    const schedule = () => {
      window.clearTimeout(timer);
      if (!document.hidden) timer = window.setTimeout(() => {
        window.history.replaceState(null, '', '#mora');
        setScene('mora');
      }, 4800);
    };
    schedule();
    document.addEventListener('visibilitychange', schedule);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', schedule);
    };
  }, [scene, paused, reduced]);

  const see = () => {
    if (reduced || paused) { go('clarity'); return; }
    setCrossing(true);
    crossingTimer.current = window.setTimeout(() => {
      setCrossing(false);
      go('clarity');
    }, 1150);
  };

  return (
    <div className={styles.world} data-scene={scene} data-paused={paused} data-crossing={crossing}>
      <div className={styles.atmosphere} aria-hidden="true">
        <div className={styles.sky} />
        <div className={styles.grain} />
        <svg className={styles.field} viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="reality-thread" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#b8c9ab" stopOpacity="0" />
              <stop offset=".5" stopColor="#d7bd7c" stopOpacity=".42" />
              <stop offset="1" stopColor="#5fba9e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className={styles.unresolved} fill="none" stroke="url(#reality-thread)" strokeWidth="1">
            <path d="M-160 610 C290 120 380 900 940 210 S1320 850 1660 190" />
            <path d="M-100 750 C310 210 540 980 1010 380 S1490 700 1600 390" />
            <path d="M-140 500 C330 1030 440 80 1060 690 S1400 200 1640 620" />
            <path d="M60 -100 C1050 100 120 690 1430 1030" />
            <path d="M380 -180 C1440 410 100 590 990 1130" />
          </g>
          <g className={styles.resolved} fill="none" stroke="#8daa8c" strokeWidth=".7">
            <path d="M720 190 C720 380 310 320 280 640" />
            <path d="M720 190 C720 380 720 430 720 640" strokeDasharray="3 9" />
            <path d="M720 190 C720 380 1130 320 1160 640" stroke="#d5bd80" />
          </g>
        </svg>
        <div className={styles.fragments}>{c.noise.map(word => <span key={word}>{word}</span>)}</div>
        <div className={styles.passage} />
      </div>

      <header className={styles.topbar}>
        <Link href={locale === 'de' ? '/de' : '/en'} className={styles.back}><ArrowLeft size={15} />{c.back}</Link>
        <span className={styles.mark}>SAIMÔR <span>/</span> REALITY CHECK</span>
        <div className={styles.controls}>
          <Link className={styles.language} href={locale === 'de' ? '/en/mora/deep-view' : '/mora/deep-view'} aria-label={locale === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'}>{locale === 'de' ? 'EN' : 'DE'}</Link>
          <button type="button" className={styles.motion} onClick={() => setPaused(value => !value)} aria-label={c.pause} aria-pressed={paused}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>
        </div>
      </header>

      <section className={styles.stage} aria-label={locale === 'de' ? 'Deep View Experience' : 'Deep View experience'} aria-busy={crossing}>
        {scene === 'uncertainty' ? (
          <div key="opening" className={styles.intro} data-testid="deep-uncertainty">
            <p className={styles.eyebrow}>{c.world}</p>
            <h1 ref={heading} tabIndex={-1}>{c.question}</h1>
            <p className={styles.doubt}>{c.doubt}</p>
            <button type="button" className={styles.quietAction} onClick={() => go('mora')}>{c.meet}<ArrowRight size={17} /></button>
          </div>
        ) : (
          <div key="encounter" className={styles.encounter} data-testid="deep-mora">
            <div className={styles.presence} aria-label={locale === 'de' ? 'MÔRAs leuchtende Augen' : 'MÔRA’s luminous eyes'}>
              <div className={styles.stoneStage}>
                <Image src="/brand/mora-stone-v1.png" width={504} height={504} sizes="(max-width: 700px) 240px, 320px" priority draggable={false} className={styles.stone} alt={locale === 'de' ? 'MÔRA, Jadestein' : 'MÔRA, jade stone'} />
                <MoraOsFace size={320} state={scene === 'clarity' ? 'rest' : undefined} />
              </div>
            </div>
            <div key={scene} className={styles.encounterText}>
              {scene === 'mora' ? (
                <>
                  <h1 ref={heading} tabIndex={-1}>{c.name}</h1>
                  <p className={styles.lead}>{c.presence}</p>
                  <button type="button" className={styles.primary} disabled={crossing} onClick={see}>{c.look}<ArrowRight size={17} /></button>
                </>
              ) : (
                <div className={styles.reveal} data-testid="deep-clarity">
                  <p className={styles.eyebrow}>{c.clarityLabel}</p>
                  <h1 ref={heading} tabIndex={-1}>{c.clarity}</h1>
                  <div className={styles.principles}>{c.truths.map((truth, index) => <p key={truth}><span className={styles.evidence} data-kind={index} aria-hidden="true" />{truth}</p>)}</div>
                  <div className={styles.links}>
                    <Link href={locale === 'de' ? '/mora' : '/en/mora'} className={styles.primary}>{c.product}<ArrowUpRight size={17} /></Link>
                    <Link href={locale === 'de' ? '/mora/deep-view/lab' : '/en/mora/deep-view/lab'} className={styles.quietAction}>{c.lab}<ArrowRight size={15} /></Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
      <footer className={styles.footer}>
        <span className={styles.disclosure}>{c.status}</span>
        {scene !== 'uncertainty' ? <button type="button" className={styles.replay} disabled={crossing} onClick={() => go('uncertainty')}><RotateCcw size={13} />{c.reset}</button> : null}
      </footer>
    </div>
  );
}
