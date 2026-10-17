import type { CSSProperties } from 'react';
import styles from './MoraClearing.module.css';

/** A photographic place with independent light, mist, water and airborne depth. */
export default function MoraClearing() {
  return <div className={styles.clearing} data-testid="deep-clearing" aria-hidden="true">
    <div className={styles.landscape} />
    <svg className={styles.connections} viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
      <g fill="none" stroke="#e8dcad" strokeWidth=".7" strokeLinecap="round">
        <path d="M490 720 Q515 570 530 460 T600 230 Q620 150 680 70" />
        <path d="M530 460 Q420 400 370 280 T260 80 M370 280 Q280 270 210 190 M600 230 Q720 260 810 130 M600 230 Q550 150 560 20" />
        <path d="M490 720 Q350 610 210 590 M530 460 Q660 410 780 450 T1010 400 M680 70 Q760 50 810 -10" />
      </g>
    </svg>
    <svg className={styles.waterMycelium} viewBox="0 0 1000 260" preserveAspectRatio="none">
      <g fill="none" stroke="#ead8a7" strokeWidth=".65" strokeLinecap="round">
        <path d="M80 200 Q220 150 370 170 T700 105 Q820 90 930 40 M370 170 Q410 100 520 90 T760 30 M520 90 Q475 55 400 45 M700 105 Q740 170 870 180 M370 170 Q380 210 510 235" />
        <path d="M220 164 Q180 115 90 120 M610 130 Q560 165 620 205 M780 96 Q840 120 960 110" />
      </g>
      <g fill="#f1dfae">{[[220,164],[370,170],[520,90],[610,130],[700,105],[780,96],[870,180]].map(([cx,cy]) => <circle key={cx} cx={cx} cy={cy} r="2.2" />)}</g>
    </svg>
    <div className={styles.sun} />
    <div className={styles.rays} />
    <div className={styles.water} />
    <div className={styles.breath} />
    <div className={styles.motes}>{Array.from({ length: 36 }, (_, i) => <i key={i} style={{
      '--x': `${(i * 37 + 11) % 100}%`, '--y': `${(i * 23 + 7) % 90}%`,
      '--delay': `${-i * 1.7}s`, '--duration': `${16 + i % 7 * 3}s`,
      '--size': `${i % 5 === 0 ? 7 : i % 3 === 0 ? 4 : 2}px`,
    } as CSSProperties} />)}</div>
    <div className={styles.nearMist} />
    <div className={styles.shade} />
  </div>;
}
