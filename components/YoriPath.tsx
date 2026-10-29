'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import styles from './YoriPath.module.css';

type Props = { locale: 'de' | 'en' };

// A spark of light among the roots, drawn in art pixels like MÔRA and the universe.
// Always faintly there; it wakes up when you come close: hover (desktop) or resting near the
// middle of the screen (touch). Only transform and opacity move.
const SPARK = [
  '...#...',
  '...#...',
  '..###..',
  '###O###',
  '..###..',
  '...#...',
  '...#...',
];
const MOTES = [
  { x: -14, y: -6, d: '0s' },
  { x: 12, y: -12, d: '.7s' },
  { x: 16, y: 8, d: '1.4s' },
  { x: -9, y: 12, d: '2.1s' },
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
          <svg className={styles.spark} viewBox="0 0 7 7" width="21" height="21" shapeRendering="crispEdges">
            {SPARK.flatMap((row, y) => [...row].map((cell, x) => cell === '.' ? null
              : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={cell === 'O' ? '#fff7dc' : '#f2c66b'} />))}
          </svg>
          {MOTES.map((m, i) => (
            <i key={i} className={styles.mote} style={{ left: `calc(50% + ${m.x}px)`, top: `calc(50% + ${m.y}px)`, animationDelay: m.d }} />
          ))}
          <span className={styles.name}>YORI</span>
        </span>
      </a>
      {opening ? createPortal(<div className={styles.passage} aria-hidden="true" />, document.body) : null}
    </>
  );
}
