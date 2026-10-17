'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MoveHorizontal } from 'lucide-react';
import MoraOsFace from './MoraOsFace';
import styles from './MoraPerspective.module.css';

const COPY = {
  de: { waiting: 'Durch MÔRAs Augen', title: 'Klarheit.', light: 'Licht hereinlassen', next: 'Mit MÔRA weiter', explore: 'Die Lichtung erkunden', hint: 'Bewege deinen Blick.', instructions: 'Bewege die Maus oder streiche über die Lichtung. Mit den Pfeiltasten kannst du dich ebenfalls umsehen.', arrival: 'Ein neuer Blick.' },
  en: { waiting: 'Through MÔRA’s eyes', title: 'Clarity.', light: 'Let the light in', next: 'Continue with MÔRA', explore: 'Explore the clearing', hint: 'Let your gaze wander.', instructions: 'Move the pointer or swipe across the clearing. You can also look around with the arrow keys.', arrival: 'A new perspective.' },
} as const;

/** An open place to explore, with an optional next step rather than an end card. */
export default function MoraPerspective({ locale, morning, onLight, onLook, still }: {
  locale: 'de' | 'en'; morning: boolean; onLight: () => void;
  onLook: (x: number, y: number) => void; still: boolean;
}) {
  const c = COPY[locale];
  const heading = useRef<HTMLHeadingElement>(null);
  const gaze = useRef({ x: 0, y: 0 });
  const [explored, setExplored] = useState(false);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, [morning]);
  const look = (x: number, y: number) => {
    if (still) return;
    gaze.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
    onLook(gaze.current.x, gaze.current.y);
    setExplored(true);
  };
  return (
    <div className={styles.perspective} data-testid="deep-clarity" data-morning={morning}>
      <h1 ref={heading} tabIndex={-1} className={styles.unspoken}>{morning ? c.title : c.waiting}</h1>
      <p id="clearing-instructions" className={styles.unspoken}>{c.instructions}</p>
      <div className={styles.explore} role="region" tabIndex={0} aria-label={c.explore} aria-describedby="clearing-instructions"
        onPointerMove={event => {
          const bounds = event.currentTarget.getBoundingClientRect();
          look((event.clientX - bounds.left) / bounds.width * 2 - 1, (event.clientY - bounds.top) / bounds.height * 2 - 1);
        }}
        onPointerLeave={() => { if (!still) onLook(0, 0); }}
        onKeyDown={event => {
          if (still) return;
          const direction = { ArrowLeft: [-.35, 0], ArrowRight: [.35, 0], ArrowUp: [0, -.35], ArrowDown: [0, .35] }[event.key];
          if (direction) { event.preventDefault(); look(gaze.current.x + direction[0], gaze.current.y + direction[1]); }
          if (event.key === 'Home') { event.preventDefault(); gaze.current = { x: 0, y: 0 }; onLook(0, 0); }
        }} />
      {morning && <div className={styles.arrival} aria-hidden="true"><span />{c.arrival}</div>}
      {morning && !still && !explored && <p className={styles.hint}><MoveHorizontal size={14} />{c.hint}</p>}
      <div className={styles.action}>
        {morning ? (
          <Link className={styles.guide} href={locale === 'de' ? '/mora' : '/en/mora'}>
            <span className={styles.stone}><Image src="/brand/mora-stone-v1.png" alt="" width={72} height={72} /><MoraOsFace size={72} state="rest" /></span>
            <span>{c.next}</span><ArrowUpRight size={15} />
          </Link>
        ) : <button type="button" className={styles.quiet} onClick={onLight}>{c.light}</button>}
      </div>
    </div>
  );
}
