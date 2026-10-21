'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import styles from './YoriPath.module.css';

type Props = { locale: 'de' | 'en' };
type P = [number, number];

// Tapered ribbon along a cubic bezier, in px relative to the MÔRA hub centre.
function ribbon(a: P, b: P, c: P, d: P, w0: number, w1: number) {
  const n = 28;
  const at = (t: number): P => {
    const u = 1 - t;
    return [u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0], u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1]];
  };
  const left: P[] = [];
  const right: P[] = [];
  for (let i = 0; i <= n; i += 1) {
    const t = i / n;
    const p = at(t);
    const q = at(Math.min(1, t + 0.01));
    const r = at(Math.max(0, t - 0.01));
    const dx = q[0] - r[0];
    const dy = q[1] - r[1];
    const len = Math.hypot(dx, dy) || 1;
    const w = (w0 + (w1 - w0) * t) / 2;
    left.push([p[0] - (dy / len) * w, p[1] + (dx / len) * w]);
    right.push([p[0] + (dy / len) * w, p[1] - (dx / len) * w]);
  }
  const pts = [...left, ...right.reverse()];
  return { d: `M${pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L')} Z`, dots: [0.3, 0.55, 0.8].map(at) };
}

const WIDE = ribbon([16, 20], [30, 40], [48, 46], [70, 48], 2.4, 0.9);
const PHONE = ribbon([26, -4], [48, -20], [76, -14], [101, 10], 2.2, 0.9);

export default function YoriPath({ locale }: Props) {
  const router = useRouter();
  const [opening, setOpening] = useState(false);
  const href = locale === 'de' ? '/yori' : '/en/yori';
  const de = locale === 'de';

  const go = () => {
    if (opening) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      router.push(href);
      return;
    }
    setOpening(true);
    window.setTimeout(() => router.push(href), 900);
  };

  const thread = (r: typeof WIDE, cls: string) => (
    <svg className={`${styles.thread} ${cls}`} viewBox="-20 -60 160 140" width="160" height="140" aria-hidden="true">
      <path className={styles.glow} d={r.d} />
      <path className={styles.core} d={r.d} />
      {r.dots.map((p, i) => (
        <circle key={i} className={styles.pulse} cx={p[0]} cy={p[1]} r="1.8" style={{ animationDelay: `${i * 0.45}s` }} />
      ))}
    </svg>
  );

  return (
    <div className={`${styles.anchor} ${opening ? styles.opening : ''}`} data-testid="yori-path">
      {thread(WIDE, styles.threadWide)}
      {thread(PHONE, styles.threadPhone)}
      <button type="button" className={styles.orb} onClick={go} aria-label={de ? 'Ein anderer Weg: zu YORI' : 'Another path: to YORI'}>
        <span className={styles.halo} aria-hidden="true" />
        <span className={styles.ball} aria-hidden="true" />
        <span className={styles.kanji} aria-hidden="true">縁</span>
        <span className={styles.sparks} aria-hidden="true"><i /><i /><i /></span>
        <span className={styles.label} aria-hidden="true">{de ? 'ein anderer Weg' : 'another path'}</span>
      </button>
      {opening ? createPortal(<div className={styles.passage} aria-hidden="true" />, document.body) : null}
    </div>
  );
}
