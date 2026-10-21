'use client';

import { useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import styles from './YoriPath.module.css';

type Props = { locale: 'de' | 'en' };

export default function YoriPath({ locale }: Props) {
  const router = useRouter();
  const [opening, setOpening] = useState(false);
  const href = locale === 'de' ? '/yori' : '/en/yori';
  const de = locale === 'de';

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault();
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => router.push(href), 900);
  };

  return (
    <div className={`${styles.layer} ${opening ? styles.opening : ''}`} data-testid="yori-path">
      <svg className={`${styles.thread} ${styles.threadWide}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M51 29 C 53 33, 58 36, 61.5 40 S 65.6 48, 66 53" vectorEffect="non-scaling-stroke" />
      </svg>
      <svg className={`${styles.thread} ${styles.threadPhone}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M56 48.5 C 62 46, 68 45, 73 47.5 S 78.5 51, 80 52.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <a href={href} className={styles.orb} onClick={onClick} aria-label={de ? 'Ein anderer Weg: zu YORI' : 'Another path: to YORI'}>
        <span className={styles.halo} aria-hidden="true" />
        <span className={styles.core} aria-hidden="true" />
        <span className={styles.kanji} aria-hidden="true">縁</span>
        <span className={styles.sparks} aria-hidden="true"><i /><i /><i /></span>
        <span className={styles.label} aria-hidden="true">{de ? 'ein anderer Weg' : 'another path'}</span>
      </a>
      {opening ? createPortal(<div className={styles.passage} aria-hidden="true" />, document.body) : null}
    </div>
  );
}
