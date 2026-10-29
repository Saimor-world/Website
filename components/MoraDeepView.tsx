'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Pause, Play, RotateCcw } from 'lucide-react';
import MoraFocusStone, { type MoraFocusHandle } from './MoraFocusStone';
import MoraPerspective from './MoraPerspective';
import DeepViewScenery, { type DeepViewStage } from './DeepViewScenery';
import MoraUncertainty from './MoraUncertainty';
import styles from './MoraDeepView.module.css';

type Scene = 'uncertainty' | 'mora' | 'clarity';
/** Clarity timeline (ms): light first, the forest grows out of it, then the view settles on the river. */
const FOREST_AT = 1200, RIVER_AT = 4400, MORNING_AT = 6400;
type Props = { locale: 'de' | 'en' };
const COPY = {
  de: {
    back: 'Zurück', world: 'DIE WELT DER KI', question: 'Alles antwortet.', doubt: 'Aber worauf kannst du dich verlassen?',
    meet: 'MÔRA begegnen', name: 'MÔRA.', presence: 'Lass uns sehen, was zusammengehört.', look: 'Durch ihre Augen sehen',
    reset: 'Noch einmal',
    status: 'PRODUKTVORSCHAU · KEINE LIVE-DATEN', pause: 'Bewegung pausieren',
  },
  en: {
    back: 'Back', world: 'THE WORLD OF AI', question: 'Everything answers.', doubt: 'But what can you rely on?',
    meet: 'Meet MÔRA', name: 'MÔRA.', presence: 'Let’s see what belongs together.', look: 'See through her eyes',
    reset: 'Experience again',
    status: 'PRODUCT PREVIEW · NO LIVE DATA', pause: 'Pause motion',
  },
} as const;

/** A cinematic passage from the stars through MÔRA’s eyes into morning light at the river.
 * Transform/opacity only, timers instead of render loops. No fetching, live AI claims or invented face.
 */
export default function MoraDeepView({ locale }: Props) {
  const c = COPY[locale];
  const world = useRef<HTMLDivElement>(null);
  const lookLayer = useRef<HTMLDivElement>(null);
  const clock = useRef(0);
  const focusControl = useRef<MoraFocusHandle>(null);
  const [focusing, setFocusing] = useState(false);
  const [focusReset, setFocusReset] = useState(0);
  const focusProgress = useCallback((amount: number) => { world.current?.style.setProperty('--focus', String(amount)); }, []);
  // A gentle look around the clearing: one CSS-transitioned translate, no render loop.
  const look = (x: number, y: number) => {
    if (lookLayer.current) lookLayer.current.style.translate = `${(-x * 1.6).toFixed(2)}% ${(-y * 1).toFixed(2)}%`;
  };
  const [entry, setEntry] = useState<'portal' | 'mora' | null>(null);
  const [scene, setScene] = useState<Scene>('uncertainty');
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [crossing, setCrossing] = useState(false);
  const [morning, setMorning] = useState(false);
  const [hurry, setHurry] = useState(false);
  const [stage, setStage] = useState<DeepViewStage>('stars');
  const heading = useRef<HTMLHeadingElement>(null);
  const crossingTimer = useRef<number | undefined>(undefined);
  const focusRequested = useRef(false);

  const go = (next: Scene) => {
    look(0, 0);
    focusProgress(next === 'clarity' ? 1 : 0); setFocusing(false); setFocusReset(value => value + 1);
    clock.current = 0;
    setMorning(false);
    setHurry(false);
    window.history.pushState(null, '', next === 'uncertainty' ? window.location.pathname + window.location.search : `#${next}`);
    window.dispatchEvent(new Event('hashchange'));
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
      focusProgress(window.location.hash === '#clarity' ? 1 : 0); setFocusing(false); setFocusReset(value => value + 1);
      clock.current = 0;
      const origin = new URLSearchParams(window.location.search).get('from');
      setEntry(origin === 'portal' || origin === 'mora' ? origin : null);
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
  }, [focusProgress]);

  useEffect(() => {
    if (scene !== 'uncertainty' || paused || reduced) return;
    let timer: number | undefined;
    const schedule = () => {
      window.clearTimeout(timer);
      if (!document.hidden) timer = window.setTimeout(() => {
        window.history.replaceState(null, '', '#mora');
        setScene('mora');
      }, 7200);
    };
    schedule();
    document.addEventListener('visibilitychange', schedule);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', schedule);
    };
  }, [scene, paused, reduced]);

  // Clarity: stage timers that stop while paused and resume where they left off.
  useEffect(() => {
    if (scene !== 'clarity') { clock.current = 0; setStage('stars'); return; }
    const apply = (time: number) => {
      setStage(time >= RIVER_AT ? 'river' : time >= FOREST_AT ? 'forest' : 'light');
      if (time >= MORNING_AT) setMorning(true);
    };
    if (reduced || (paused && hurry)) { clock.current = MORNING_AT; apply(MORNING_AT); return; }
    if (hurry) clock.current = Math.max(clock.current, MORNING_AT - 1200);
    apply(clock.current);
    if (paused) return;
    const started = Date.now() - clock.current;
    const timers = [FOREST_AT, RIVER_AT, MORNING_AT].filter(mark => mark > clock.current)
      .map(mark => window.setTimeout(() => { clock.current = mark; apply(mark); }, mark - clock.current));
    return () => { timers.forEach(timer => window.clearTimeout(timer)); clock.current = Math.min(MORNING_AT, Date.now() - started); };
  }, [scene, paused, reduced, hurry]);

  const see = () => {
    if (reduced || paused) { go('clarity'); return; }
    setCrossing(true);
    crossingTimer.current = window.setTimeout(() => {
      setCrossing(false);
      go('clarity');
    }, 1150);
  };

  const home = locale === 'de' ? '/de' : '/en';
  const product = locale === 'de' ? '/mora' : '/en/mora';
  const backHref = entry === 'portal' ? `${home}#system` : entry === 'mora' ? `${product}#deep-view` : home;
  const backLabel = entry === 'portal' ? (locale === 'de' ? 'Zurück zum Portal' : 'Back to the portal') : entry === 'mora' ? (locale === 'de' ? 'Zurück zu MÔRA' : 'Back to MÔRA') : c.back;
  const languageHref = `${locale === 'de' ? '/en/mora/deep-view' : '/mora/deep-view'}${entry ? `?from=${entry}` : ''}`;

  return (
    <div ref={world} className={styles.world} data-scene={scene} data-stage={stage} data-paused={paused} data-crossing={crossing} data-focusing={focusing}>
      <div className={styles.atmosphere} aria-hidden="true">
        <DeepViewScenery ref={lookLayer} stage={stage} still={paused || reduced} />
        <div className={styles.passage} />
      </div>

      <header className={styles.topbar}>
        <Link href={backHref} className={styles.back}><ArrowLeft size={15} />{backLabel}</Link>
        <span className={styles.mark}>SAIMÔR <span>/</span> {locale === 'de' ? 'MÔRAs Blick' : "MÔRA's View"}</span>
        <div className={styles.controls}>
          <Link className={styles.language} href={languageHref} aria-label={locale === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'}>{locale === 'de' ? 'EN' : 'DE'}</Link>
          <button type="button" className={styles.motion} onClick={() => setPaused(value => !value)} aria-label={c.pause} aria-pressed={paused}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>
        </div>
      </header>

      <section className={styles.stage} aria-label={locale === 'de' ? 'Deep View – Inszenierte Begegnung' : 'Deep View – Staged encounter'} aria-busy={crossing || focusing}>
        {scene === 'uncertainty' ? (
          <div key="opening" className={styles.intro} data-testid="deep-uncertainty">
            <MoraUncertainty />
            <p className={styles.eyebrow}>{c.world}</p>
            <h1 ref={heading} tabIndex={-1}>{c.question}</h1>
            <p className={styles.doubt}>{c.doubt}</p>
            <button type="button" className={styles.quietAction} onClick={() => go('mora')}>{c.meet}<ArrowRight size={17} /></button>
          </div>
        ) : scene === 'clarity' ? <MoraPerspective locale={locale} morning={morning} onLight={() => setHurry(true)} onLook={look} still={paused || reduced} /> : (
          <div key="encounter" className={styles.encounter} data-testid="deep-mora">
            <div className={styles.presence} aria-label={locale === 'de' ? 'MÔRAs leuchtende Augen' : 'MÔRA’s luminous eyes'}>
              <MoraFocusStone key={focusReset} ref={focusControl} locale={locale} paused={paused} reduced={reduced} disabled={crossing}
                onProgress={focusProgress} onActive={setFocusing} onSettled={see} />
            </div>
            <div key={scene} className={styles.encounterText}>
              <h1 ref={heading} tabIndex={-1}>{c.name}</h1>
              <p className={styles.lead}>{c.presence}</p>
              <button type="button" className={styles.primary} disabled={crossing || focusing} onClick={() => focusControl.current?.enter()}>{c.look}<ArrowRight size={17} /></button>
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
