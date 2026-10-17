import type { CSSProperties } from 'react';
import styles from './MoraClearing.module.css';

/** A photographic place with independent light, mist, water and airborne depth. */
export default function MoraClearing() {
  return <div className={styles.clearing} data-testid="deep-clearing" aria-hidden="true">
    <div className={styles.landscape} />
    <div className={styles.sun} />
    <div className={styles.rays} />
    <div className={styles.water} />
    <div className={styles.breath} />
    <div className={styles.motes}>{Array.from({ length: 24 }, (_, i) => <i key={i} style={{
      '--x': `${(i * 37 + 11) % 100}%`, '--y': `${(i * 23 + 7) % 90}%`,
      '--delay': `${-i * 1.7}s`, '--duration': `${16 + i % 7 * 3}s`,
      '--size': `${i % 5 === 0 ? 3 : 1.5}px`,
    } as CSSProperties} />)}</div>
    <div className={styles.nearMist} />
    <div className={styles.shade} />
  </div>;
}
