'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import styles from './YoriPath.module.css';

type Props = { locale: 'de' | 'en' };

// A hidden crack of light among the roots. Nothing to see until you come close:
// hover (desktop) or scrolling it slowly into the middle of the screen (touch).
const MOTES = [
  { x: -14, y: -10, d: '0s' },
  { x: 12, y: -16, d: '.6s' },
  { x: 18, y: 6, d: '1.2s' },
  { x: -8, y: 14, d: '1.8s' },
  { x: 4, y: -24, d: '2.4s' },
];

export default function YoriPath({ locale }: Props) {
  const router = useRouter();
  const ref = useRef<HTMLAnchorElement>(null);
  const [opening, setOpening] = useState(false);
  const [near, setNear] = useState(false);
  const href = locale === 'de' ? '/yori' : '/en/yori';
  const de = locale === 'de';

  // Touch devices have no hover: open the crack while it rests near the centre of the screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia?.('(hover: hover)').matches) return undefined;
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin: '-38% 0px -38% 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const go = (event: React.MouseEvent) => {
    event.preventDefault();
    if (opening) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      router.push(href);
      return;
    }
    setOpening(true);
    window.setTimeout(() => router.push(href), 850);
  };

  return (
    <>
      <a
        ref={ref}
        href={href}
        onClick={go}
        className={`${styles.spot} ${opening ? styles.opening : ''}`}
        data-near={near}
        data-testid="yori-path"
        aria-label={de ? 'Ein anderer Weg: YORI' : 'Another path: YORI'}
      >
        <span className={styles.light} aria-hidden="true">
          <svg className={styles.crack} viewBox="-30 -30 60 60" width="60" height="60">
            <path className={styles.crackGlow} d="M-3 -22 L1 -11 L-2 -4 L3 3 L0 10 L2 19" />
            <path className={styles.crackCore} d="M-3 -22 L1 -11 L-2 -4 L3 3 L0 10 L2 19" />
            <path className={styles.crackCore} d="M-2 -4 L-9 -1 M3 3 L9 7" />
          </svg>
          {MOTES.map((m, i) => (
            <i key={i} className={styles.mote} style={{ left: `calc(50% + ${m.x}px)`, top: `calc(50% + ${m.y}px)`, animationDelay: m.d }} />
          ))}
          <span className={styles.kanji}>縁</span>
        </span>
      </a>
      {opening ? createPortal(<div className={styles.passage} aria-hidden="true" />, document.body) : null}
    </>
  );
}
