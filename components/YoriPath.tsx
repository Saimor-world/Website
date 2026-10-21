'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './YoriPath.module.css';

// The hidden way to YORI: one golden thread leaves the Earth underside and ends at a small door.
const LEAVES = [
  { x: -18, y: -8, r: -40, d: 0 }, { x: 22, y: -30, r: 60, d: 0.08 }, { x: -34, y: -46, r: 120, d: 0.16 },
  { x: 30, y: -12, r: -90, d: 0.22 }, { x: 8, y: -58, r: 30, d: 0.3 }, { x: -6, y: -26, r: 160, d: 0.36 },
];
const FLIES = [
  { x: '-46px', y: '-30px', d: '0s' }, { x: '38px', y: '-52px', d: '1.4s' }, { x: '56px', y: '6px', d: '2.6s' }, { x: '-28px', y: '22px', d: '3.5s' },
];

export default function YoriPath({ locale }: { locale: 'de' | 'en' }) {
  const router = useRouter();
  const [opening, setOpening] = useState(false);
  const href = locale === 'de' ? '/yori' : '/en/yori';
  const label = locale === 'de' ? 'ein anderer Weg' : 'another path';

  const enter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault();
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => router.push(href), 1150);
  };

  return (
    <div className={styles.path} data-testid="yori-path" data-opening={opening}>
      <svg className={`${styles.thread} ${styles.threadWide}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M51 48 C 55 52, 58 50, 62 55 S 70 64, 74.6 63.4" />
        <path className={styles.twig} d="M63 46 C 61 50, 60.5 53, 58 55" />
      </svg>
      <svg className={`${styles.thread} ${styles.threadPhone}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M50 62 C 56 66, 63 69, 68 74 S 75 82, 77 85.6" />
        <path className={styles.twig} d="M68 74 C 64 76, 62 78, 58 78.5" />
      </svg>
      <a href={href} onClick={enter} className={styles.door} aria-label={locale === 'de' ? 'Ein anderer Weg: zu YORI' : 'Another path: to YORI'}>
        <span className={styles.kanji} aria-hidden="true">縁</span>
        <span className={styles.glow} aria-hidden="true" />
        <span className={styles.frame} aria-hidden="true">
          <span className={styles.light} />
          <span className={styles.leaf}><i /></span>
        </span>
        {FLIES.map((f, i) => <span key={i} className={styles.fly} style={{ '--fx': f.x, '--fy': f.y, animationDelay: f.d } as React.CSSProperties} aria-hidden="true" />)}
        <span className={styles.label}>{label}</span>
      </a>
      {opening ? createPortal(
        <div className={styles.passage} aria-hidden="true">
          {LEAVES.map((l, i) => <span key={i} className={styles.leafFall} style={{ '--lx': `${l.x}vw`, '--ly': `${l.y}vh`, '--lr': `${l.r}deg`, animationDelay: `${l.d}s` } as React.CSSProperties} />)}
        </div>,
        document.body,
      ) : null}
    </div>
  );
}
