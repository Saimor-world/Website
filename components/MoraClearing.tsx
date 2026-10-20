'use client';

import { useEffect, useRef, type CSSProperties, type RefObject } from 'react';
import styles from './MoraClearing.module.css';

/** A photographic place with independent light, mist, water and airborne depth. */
export default function MoraClearing({ look, still = false }: { look?: RefObject<{ x: number; y: number }>; still?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const controls = useRef({ look, still }); controls.current = { look, still };
  useEffect(() => {
    const layers = root.current?.querySelectorAll<HTMLElement>('[data-parallax]');
    if (!layers) return;
    let frame = 0, previous = performance.now(), x = 0, y = 0;
    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      const dt = Math.min(.05, Math.max(0, (now - previous) / 1000)); previous = now;
      if (document.hidden || controls.current.still) return;
      const target = controls.current.look?.current;
      const follow = 1 - Math.exp(-dt * 4);
      const nx = x + ((target?.x ?? 0) - x) * follow;
      const ny = y + ((target?.y ?? 0) - y) * follow;
      if (Math.abs(nx - x) + Math.abs(ny - y) < .0001) return;
      x = nx; y = ny;
      // Only transform prepared layers. Inheriting pointer CSS variables from the
      // whole scene invalidated gradients, masks and all 36 particle styles.
      layers.forEach(layer => {
        const depth = Number(layer.dataset.parallax);
        layer.style.transform = `translate3d(${(x * depth).toFixed(2)}px,${(y * depth * .6).toFixed(2)}px,0)`;
      });
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <div ref={root} className={styles.clearing} data-testid="deep-clearing" aria-hidden="true">
    <div className={styles.landscapeMotion} data-parallax="-12"><div className={styles.landscape} /></div>
    <svg className={styles.connections} viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
      <g fill="none" stroke="#e8dcad" strokeWidth=".7" strokeLinecap="round">
        <path d="M490 720 Q515 570 530 460 T600 230 Q620 150 680 70" />
        <path d="M530 460 Q420 400 370 280 T260 80 M370 280 Q280 270 210 190 M600 230 Q720 260 810 130 M600 230 Q550 150 560 20" />
        <path d="M490 720 Q350 610 210 590 M530 460 Q660 410 780 450 T1010 400 M680 70 Q760 50 810 -10" />
      </g>
    </svg>
    <div className={styles.sun} data-parallax="22" />
    <div className={styles.rays} data-parallax="-25" />
    <div className={styles.water} />
    <div className={styles.breath} data-parallax="32" />
    <div className={styles.motes} data-parallax="-38">{Array.from({ length: 36 }, (_, i) => <i key={i} style={{
      '--x': `${(i * 37 + 11) % 100}%`, '--y': `${(i * 23 + 7) % 90}%`,
      '--delay': `${-i * 1.7}s`, '--duration': `${16 + i % 7 * 3}s`,
      '--size': `${i % 5 === 0 ? 7 : i % 3 === 0 ? 4 : 2}px`,
    } as CSSProperties} />)}</div>
    <div className={styles.nearMist} data-parallax="18" />
    <div className={styles.leftLight} />
    <div className={styles.shade} />
  </div>;
}
