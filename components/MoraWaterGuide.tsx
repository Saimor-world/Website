'use client';

import { useEffect, useId, useRef } from 'react';
import Image from 'next/image';
import MoraOsFace from './MoraOsFace';
import styles from './MoraWaterGuide.module.css';

/** MÔRA's own jade face becomes a small guiding light, leaving a fading flight trace. */
export default function MoraWaterGuide({ chapter, still }: { chapter: number; still: boolean }) {
  const stone = useRef<HTMLSpanElement>(null), trail = useRef<SVGPathElement>(null);
  const gradient = useRef<SVGLinearGradientElement>(null);
  const traceId = `mora-flight-${useId().replace(/:/g, '')}`;
  const controls = useRef({ chapter, still }); controls.current = { chapter, still };
  useEffect(() => {
    let frame = 0, previous = performance.now(), time = 0, x = .5, y = .85;
    const tail = Array.from({ length: 18 }, () => ({ x, y }));
    let previousChapter = -2;
    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      const dt = Math.min(.05, Math.max(0, (now - previous) / 1000)); previous = now;
      const c = controls.current;
      if (document.hidden) return;
      const anchor = [[.58,.70],[.72,.76],[.81,.61]][c.chapter] ?? [.55,.81];
      const mobile = innerWidth <= 700;
      const tx = mobile && c.chapter >= 0 ? .89 : anchor[0];
      const ty = mobile && c.chapter >= 0 ? .36 + c.chapter * .085 : anchor[1];
      if (c.still) {
        if (previousChapter === c.chapter) return;
        x = tx; y = ty;
        tail.forEach(point => { point.x = x; point.y = y; });
      } else {
        time += dt;
        const follow = 1 - Math.exp(-dt * 3.4);
        x += (tx + Math.sin(time * 1.9) * .018 - x) * follow;
        y += (ty + Math.cos(time * 2.5) * .012 - y) * follow;
        // A time-based spring keeps the flight and its trace consistent at 60/120 Hz.
        tail[0].x = x; tail[0].y = y;
        for (let i = 1; i < tail.length; i++) {
          const lag = 1 - Math.exp(-dt * 22);
          tail[i].x += (tail[i - 1].x - tail[i].x) * lag;
          tail[i].y += (tail[i - 1].y - tail[i].y) * lag;
          const dx = (tail[i].x - x) * innerWidth, dy = (tail[i].y - y) * innerHeight;
          const distance = Math.hypot(dx, dy), limit = mobile ? 70 : 130;
          if (distance > limit) {
            tail[i].x = x + dx / distance * limit / innerWidth;
            tail[i].y = y + dy / distance * limit / innerHeight;
          }
        }
      }
      previousChapter = c.chapter;
      stone.current?.style.setProperty('transform', `translate3d(${x * innerWidth}px,${y * innerHeight}px,0)`);
      // Rasterize only the bounded trace, not a viewport-sized SVG every frame.
      const localX = (value: number) => 140 + (value - x) * innerWidth;
      const localY = (value: number) => 140 + (value - y) * innerHeight;
      trail.current?.setAttribute('d', tail.map((point, i) => `${i ? 'L' : 'M'}${localX(point.x).toFixed(1)} ${localY(point.y).toFixed(1)}`).join(' '));
      gradient.current?.setAttribute('x1', String(localX(tail[tail.length - 1].x)));
      gradient.current?.setAttribute('y1', String(localY(tail[tail.length - 1].y)));
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <div className={styles.flight} data-guide-chapter={chapter} data-still={still} aria-hidden="true">
    <span ref={stone} className={styles.position}>
    <svg className={styles.trace} viewBox="0 0 280 280">
      <defs><linearGradient id={traceId} ref={gradient} gradientUnits="userSpaceOnUse" x2="140" y2="140"><stop stopColor="#f2dfaa" stopOpacity="0" /><stop offset="1" stopColor="#f2dfaa" stopOpacity=".7" /></linearGradient></defs>
      <path ref={trail} stroke={`url(#${traceId})`} />
    </svg>
    <span className={styles.light} />
      <span className={styles.stone}><Image src="/brand/mora-stone-v1.png" alt="" width={44} height={44} unoptimized />
        <MoraOsFace size={34} state="rest" />
      </span>
      <i /><i /><i />
    </span>
  </div>;
}
