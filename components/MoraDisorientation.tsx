'use client';

import { useEffect, useRef, type RefObject } from 'react';
import styles from './MoraDisorientation.module.css';

type Props = { active: boolean; paused: boolean; reduced: boolean; focus: RefObject<number>; pointer: RefObject<{ x: number; y: number }> };
/** A restless, reactive field resolves toward a stable centre as the visitor holds MÔRA. */
export default function MoraDisorientation(props: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const controls = useRef(props); controls.current = props;
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    let ctx: CanvasRenderingContext2D | null = null;
    try { ctx = el.getContext('2d'); } catch { return; }
    if (!ctx) return;
    const context = ctx;
    let frame = 0, previous = performance.now(), clock = 0, lastDraw = -100;
    const resize = () => { el.width = Math.min(innerWidth, 900); el.height = Math.min(innerHeight, 700); };
    resize(); window.addEventListener('resize', resize);
    const sync = () => { previous = performance.now(); };
    document.addEventListener('visibilitychange', sync);
    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      const c = controls.current;
      const dt = Math.max(0, (now - previous) / 1000); previous = now;
      if (!c.active) { context.clearRect(0, 0, el.width, el.height); return; }
      if (!c.paused && !c.reduced && !document.hidden) clock += dt;
      if (now - lastDraw < 42) return;
      lastDraw = now;
      const w = el.width, h = el.height, f = c.focus.current ?? 0, p = c.pointer.current ?? { x: 0, y: 0 };
      context.clearRect(0, 0, w, h);
      const points = Array.from({ length: 30 }, (_, i) => {
        const a = i * 2.399963, r = .12 + (i % 9) * .043;
        const restlessX = .5 + Math.cos(a + clock * (.025 + i % 3 * .013)) * r + Math.sin(clock * .19 + i) * .045 - p.x * Math.cos(i) * .055;
        const restlessY = .5 + Math.sin(a - clock * .018) * r + Math.cos(clock * .14 + i) * .04 - p.y * Math.sin(i) * .045;
        const stableX = .5 + Math.cos(a) * r * .7, stableY = .44 + Math.sin(a) * r * .62;
        return { x: (restlessX * (1 - f) + stableX * f) * w, y: (restlessY * (1 - f) + stableY * f) * h };
      });
      for (let i = 0; i < points.length; i++) {
        const a = points[i], b = points[(i + 11) % points.length];
        context.beginPath(); context.moveTo(a.x, a.y);
        context.quadraticCurveTo((a.x + b.x) / 2 + Math.sin(clock * .1 + i) * 28 * (1 - f), (a.y + b.y) / 2, b.x, b.y);
        context.strokeStyle = `rgba(${Math.round(127 + f * 90)},${Math.round(150 + f * 51)},${Math.round(155 - f * 24)},${.025 + f * .075})`;
        context.lineWidth = .6; context.stroke();
        const glow = context.createRadialGradient(a.x, a.y, 0, a.x, a.y, 5 + f * 4);
        glow.addColorStop(0, `rgba(${Math.round(178 + f * 55)},${Math.round(195 + f * 15)},${Math.round(196 - f * 50)},${.18 + f * .15})`);
        glow.addColorStop(1, 'rgba(100,130,120,0)');
        context.fillStyle = glow; context.fillRect(a.x - 10, a.y - 10, 20, 20);
      }
    };
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', sync); };
  }, []);
  return <canvas ref={canvas} className={styles.field} data-active={props.active} aria-hidden="true" />;
}
