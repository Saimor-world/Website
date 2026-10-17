'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Pause, Play, RotateCcw } from 'lucide-react';
import MoraOsFace from './MoraOsFace';
import MoraPerspective from './MoraPerspective';
import MoraAtmosphere from './MoraAtmosphere';
import styles from './MoraDeepView.module.css';

type Scene = 'uncertainty' | 'mora' | 'clarity';
type Props = { locale: 'de' | 'en' };
const COPY = {
  de: {
    back: 'Zurück', world: 'DIE WELT DER KI', question: 'Alles klingt möglich.', doubt: 'Aber was ist wirklich wahr?',
    meet: 'MÔRA begegnen', name: 'MÔRA.', presence: 'Einen Moment. Wir schauen genauer hin.', look: 'Durch ihre Augen sehen',
    reset: 'Noch einmal',
    status: 'INSZENIERUNG · KEINE LIVE-ANALYSE', pause: 'Bewegung pausieren',
  },
  en: {
    back: 'Back', world: 'THE WORLD OF AI', question: 'Everything sounds possible.', doubt: 'But what is actually true?',
    meet: 'Meet MÔRA', name: 'MÔRA.', presence: 'A moment. Let’s look a little closer.', look: 'See through her eyes',
    reset: 'Experience again',
    status: 'STAGED EXPERIENCE · NO LIVE ANALYSIS', pause: 'Pause motion',
  },
} as const;

/** A cinematic passage from unfamiliar mist through MÔRA’s eyes into morning light.
 * Moving mist gives way to morning light. No fetching, live AI claims or invented face.
 */
export default function MoraDeepView({ locale }: Props) {
  const c = COPY[locale];
  const world = useRef<HTMLDivElement>(null);
  const look = (x: number, y: number) => {
    world.current?.style.setProperty('--look-x', String(x));
    world.current?.style.setProperty('--look-y', String(y));
  };
  const [scene, setScene] = useState<Scene>('uncertainty');
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [crossing, setCrossing] = useState(false);
  const [morning, setMorning] = useState(false);
  const [hurry, setHurry] = useState(false);
  const arrive = useCallback(() => setMorning(true), []);
  const heading = useRef<HTMLHeadingElement>(null);
  const crossingTimer = useRef<number | undefined>(undefined);
  const focusRequested = useRef(false);

  const go = (next: Scene) => {
    look(0, 0);
    setMorning(false);
    setHurry(false);
    window.history.pushState(null, '', next === 'uncertainty' ? window.location.pathname : `#${next}`);
    focusRequested.current = true;
    setScene(next);
  };

  useEffect(() => {
    if (!focusRequested.current) return;
    const frame = window.requestAnimationFrame(() => {
      heading.current?.focus({ preventScroll: true });
      focusRequested.current = false;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [scene]);

  useEffect(() => {
    const restore = () => {
      window.clearTimeout(crossingTimer.current);
      setCrossing(false);
      setMorning(false);
      setHurry(false);
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
    <div ref={world} className={styles.world} data-scene={scene} data-paused={paused} data-crossing={crossing}>
      <div className={styles.atmosphere} aria-hidden="true">
        <MoraAtmosphere dawn={scene === 'clarity'} hurry={hurry} paused={paused}
          reduced={reduced} onArrival={arrive} />
        <div className={styles.grain} />
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
        ) : scene === 'clarity' ? <MoraPerspective locale={locale} morning={morning} onLight={() => setHurry(true)} onLook={look} still={paused || reduced} /> : (
          <div key="encounter" className={styles.encounter} data-testid="deep-mora">
            <div className={styles.presence} aria-label={locale === 'de' ? 'MÔRAs leuchtende Augen' : 'MÔRA’s luminous eyes'}>
              <div className={styles.stoneStage}>
                <Image src="/brand/mora-stone-v1.png" width={504} height={504} sizes="(max-width: 700px) 240px, 320px" priority draggable={false} className={styles.stone} alt={locale === 'de' ? 'MÔRA, Jadestein' : 'MÔRA, jade stone'} />
                <MoraOsFace size={320} />
              </div>
            </div>
            <div key={scene} className={styles.encounterText}>
              <h1 ref={heading} tabIndex={-1}>{c.name}</h1>
              <p className={styles.lead}>{c.presence}</p>
              <button type="button" className={styles.primary} disabled={crossing} onClick={see}>{c.look}<ArrowRight size={17} /></button>
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
