'use client';

import { useEffect, useState, type CSSProperties, type PointerEvent } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, RotateCcw } from 'lucide-react';
import MoraOrb from './MoraOrb';
import styles from './MoraDeepView.module.css';

type Props = { locale: 'de' | 'en' };
type Scene = 'uncertainty' | 'mora' | 'clarity';

const COPY = {
  de: {
    home: 'Zurück',
    ambiguity: 'DIE WELT DER KI',
    uncertain: 'Alles klingt möglich.',
    doubt: 'Aber was ist wirklich wahr?',
    skip: 'MÔRA begegnen',
    moraEyebrow: 'DU BIST NICHT MEHR ALLEIN IM RAUSCHEN',
    mora: 'MÔRA.',
    presence: 'Sie sieht hin, wo andere nur antworten.',
    look: 'Durch ihre Augen sehen',
    clarityEyebrow: 'DURCH MÔRAS AUGEN',
    clarity: 'Aus Rauschen wird Klarheit.',
    truth: ['Was belegt ist.', 'Was Vermutung bleibt.', 'Was du entscheidest.'],
    reset: 'Noch einmal',
    product: 'MÔRA kennenlernen',
    lab: 'Das Prinzip dahinter',
    status: 'INSZENIERUNG · KEINE LIVE-ANALYSE',
  },
  en: {
    home: 'Back',
    ambiguity: 'THE WORLD OF AI',
    uncertain: 'Everything sounds possible.',
    doubt: 'But what is actually true?',
    skip: 'Meet MÔRA',
    moraEyebrow: 'YOU ARE NO LONGER ALONE IN THE NOISE',
    mora: 'MÔRA.',
    presence: 'She looks closer when others merely answer.',
    look: 'See through her eyes',
    clarityEyebrow: 'THROUGH MÔRA’S EYES',
    clarity: 'Noise becomes clarity.',
    truth: ['What is evidenced.', 'What remains a guess.', 'What you decide.'],
    reset: 'Experience again',
    product: 'Discover MÔRA',
    lab: 'Explore the principle',
    status: 'STAGED EXPERIENCE · NO LIVE ANALYSIS',
  },
} as const;

/**
 * A cinematic brand experience, not a fake real-time AI analysis.
 * The technical deterministic example lives separately in the optional lab.
 * Intro auto-transitions; visitors can skip, revisit or opt out of motion.
 */
export default function MoraDeepView({ locale }: Props) {
  const c = COPY[locale];
  const [scene, setScene] = useState<Scene>('uncertainty');
  const [gaze, setGaze] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (scene !== 'uncertainty') return;
    const reduced = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const id = window.setTimeout(() => setScene('mora'), 2050);
    return () => window.clearTimeout(id);
  }, [scene]);

  function trackEyes(event: PointerEvent<HTMLElement>) {
    if (scene === 'uncertainty') return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = Math.max(-7, Math.min(7, ((event.clientX - rect.left) / rect.width - .5) * 14));
    const y = Math.max(-5, Math.min(5, ((event.clientY - rect.top) / rect.height - .5) * 10));
    setGaze({ x, y });
  }

  return (
    <main
      className={styles.world}
      data-scene={scene}
      onPointerMove={trackEyes}
      onPointerLeave={() => setGaze({ x: 0, y: 0 })}
      style={{ '--eye-x': `${gaze.x}px`, '--eye-y': `${gaze.y}px` } as CSSProperties}
    >
      <div className={styles.atmosphere} aria-hidden="true">
        <div className={styles.darkSky} />
        <div className={styles.opening} />
        <div className={styles.threadOne} />
        <div className={styles.threadTwo} />
        <div className={styles.lightDust} />
      </div>

      <header className={styles.topbar}>
        <Link className={styles.back} href={locale === 'de' ? '/de' : '/en'}>
          <ArrowLeft size={16} aria-hidden="true" />{c.home}
        </Link>
        <span className={styles.mark}>SAIMÔR <span> / </span> DEEP VIEW</span>
      </header>

      <section className={styles.stage} aria-label={locale === 'de' ? 'Deep View Experience' : 'Deep View experience'}>
        {scene === 'uncertainty' ? (
          <div key="uncertainty" className={styles.intro} data-testid="deep-uncertainty">
            <p className={styles.eyebrow}>{c.ambiguity}</p>
            <h1>{c.uncertain}</h1>
            <p className={styles.underquestion}>{c.doubt}</p>
            <span className={styles.softLine} aria-hidden="true" />
            <button type="button" className={styles.quietAction} onClick={() => setScene('mora')}>
              {c.skip}<ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div key="mora" className={styles.encounter} data-testid="deep-mora">
            <div className={styles.presence} aria-label={locale === 'de' ? 'MÔRAs leuchtende Augen' : 'MÔRA’s luminous eyes'}>
              <span className={styles.presenceAura} aria-hidden="true" />
              <MoraOrb size={290} state={scene === 'clarity' ? 'speak' : 'dream'} className={styles.stone} label={locale === 'de' ? 'MÔRA, Jadestein' : 'MÔRA, jade stone'} />
              <span className={styles.faceShadow} aria-hidden="true" />
              <span className={styles.eyes} aria-hidden="true">
                <span className={styles.eye}><span className={styles.iris}><span className={styles.pupil} /></span></span>
                <span className={styles.eye}><span className={styles.iris}><span className={styles.pupil} /></span></span>
              </span>
              <span className={styles.gazeHalo} aria-hidden="true" />
            </div>

            <div className={styles.encounterText}>
              <p className={styles.eyebrow}>{scene === 'clarity' ? c.clarityEyebrow : c.moraEyebrow}</p>
              <h1>{scene === 'clarity' ? c.clarity : c.mora}</h1>
              {scene === 'mora' ? (
                <>
                  <p className={styles.lead}>{c.presence}</p>
                  <button type="button" className={styles.primary} onClick={() => setScene('clarity')}>
                    {c.look}<ArrowRight size={18} aria-hidden="true" />
                  </button>
                </>
              ) : (
                <div className={styles.reveal} data-testid="deep-clarity">
                  <div className={styles.principles}>
                    {c.truth.map((item, index) => (
                      <p key={item}><span>0{index + 1}</span>{item}</p>
                    ))}
                  </div>
                  <div className={styles.links}>
                    <Link href={locale === 'de' ? '/mora' : '/en/mora'} className={styles.primary}>{c.product}<ArrowUpRight size={18} aria-hidden="true" /></Link>
                    <Link href={locale === 'de' ? '/mora/deep-view/lab' : '/en/mora/deep-view/lab'} className={styles.quietAction}>{c.lab}<ArrowRight size={16} aria-hidden="true" /></Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      <footer className={styles.footer}>
        <span className={styles.disclosure}>{c.status}</span>
        {scene !== 'uncertainty' && (
          <button type="button" className={styles.replay} onClick={() => {
            setScene('uncertainty');
            setGaze({ x: 0, y: 0 });
          }}>
            <RotateCcw size={14} aria-hidden="true" />{c.reset}
          </button>
        )}
      </footer>
    </main>
  );
}
