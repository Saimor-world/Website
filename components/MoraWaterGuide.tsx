'use client';

import { useEffect, useId, useRef, type RefObject } from 'react';
import MoraCharacterBody from './MoraCharacterBody';
import styles from './MoraWaterGuide.module.css';

/** The canonical light body follows the existing water flight path and fading trace. */
export default function MoraWaterGuide({ chapter, still, label, onActivate, buttonRef, interactive = true, locale = 'de' }: {
  locale?: 'de' | 'en'; chapter: number; still: boolean; label: string; onActivate: () => void; buttonRef: RefObject<HTMLButtonElement>; interactive?: boolean;
}) {
  const stone = useRef<HTMLSpanElement>(null), trail = useRef<SVGPathElement>(null);
  const gradient = useRef<SVGLinearGradientElement>(null);
  const traceId = `mora-flight-${useId().replace(/:/g, '')}`;
  const controls = useRef({ chapter, still, interactive }); controls.current = { chapter, still, interactive };
  const engaged = useRef({ pointer: false, focus: false });
  const interaction = useRef({ x: 0, y: 0, touchedAt: -Infinity });
  useEffect(() => {
    let frame = 0, previous = performance.now(), time = 0, x = .5, y = .85;
    const tail = Array.from({ length: 18 }, () => ({ x, y }));
    let previousChapter = -2, previousInteractive: boolean | null = null;
    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      const dt = Math.min(.05, Math.max(0, (now - previous) / 1000)); previous = now;
      const c = controls.current;
      if (document.hidden) return;
      // Autonomous, bounded wandering; contextual chapters gently attract her.
      const perches = [[.5,.78],[.63,.67],[.43,.72],[.65,.79]];
      const mobile = innerWidth <= 700;
      const modeChanged = previousInteractive !== c.interactive;
      const anchor = !c.interactive ? [.85,1] :
        [[.58,.70],[.72,.76],[.81,.61]][c.chapter] ?? perches[Math.floor(time / 9) % perches.length];
      const desiredX = mobile && c.interactive && c.chapter >= 0 ? .82 : anchor[0];
      const tx = Math.max(76 / innerWidth, Math.min((innerWidth - (mobile ? 76 : 195)) / innerWidth, desiredX));
      const desiredY = mobile && c.interactive && c.chapter >= 0 ? .36 + c.chapter * .085 : anchor[1];
      const ty = Math.min(desiredY, Math.max(.25, 1 - (mobile ? 195 : 170) / innerHeight));
      if (c.still || modeChanged) {
        if (previousChapter === c.chapter && !modeChanged) return;
        x = tx; y = ty;
        tail.forEach(point => { point.x = x; point.y = y; });
      } else if (!c.interactive || (!engaged.current.pointer && !engaged.current.focus)) {
        time += dt;
        const follow = 1 - Math.exp(-dt * 3.4);
        const flying = c.interactive && c.chapter < 0 && time % 9 < 2.5;
        const goalX = tx + (flying ? Math.sin(time * 1.9) * .018 : 0);
        const goalY = ty + (flying ? Math.cos(time * 2.5) * .012 : 0);
        x += (goalX - x) * follow;
        y += (goalY - y) * follow;
        if (Math.abs(goalX - x) * innerWidth < .25) x = goalX;
        if (Math.abs(goalY - y) * innerHeight < .25) y = goalY;
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
      previousChapter = c.chapter;previousInteractive = c.interactive;
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
  return <div className={styles.flight} data-guide-chapter={chapter} data-still={still} data-passive={!interactive}>
    <span ref={stone} className={styles.position}>
    <svg className={styles.trace} viewBox="0 0 280 280" aria-hidden="true">
      <defs><linearGradient id={traceId} ref={gradient} gradientUnits="userSpaceOnUse" x2="140" y2="140"><stop stopColor="#f2dfaa" stopOpacity="0" /><stop offset="1" stopColor="#f2dfaa" stopOpacity=".7" /></linearGradient></defs>
      <path ref={trail} stroke={`url(#${traceId})`} />
    </svg>
    <span className={styles.light} aria-hidden="true" />
      <button ref={buttonRef} className={styles.companion} type="button" onClick={onActivate} disabled={!interactive} aria-hidden={!interactive}
        onPointerEnter={() => { engaged.current.pointer = true; }} onPointerLeave={() => { engaged.current.pointer = false; }}
        onFocus={() => { engaged.current.focus = true; }} onBlur={() => { engaged.current.focus = false; }}>
        <span className={styles.stone}>
          <MoraCharacterBody locale={locale} still={still} state={chapter >= 0 ? 'listening' : 'idle'}
            interaction={interaction} />
        </span><span className={styles.caption}>{label}</span>
      </button>
      <i /><i /><i />
    </span>
  </div>;
}
