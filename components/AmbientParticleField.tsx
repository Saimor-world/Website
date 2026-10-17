'use client';

import { useEffect, useRef, type RefObject } from 'react';
import styles from './AmbientParticleField.module.css';
import { WATER_BANKS, waterPoint, waterProjection } from './waterGeometry';

type Props = {
  scene?: 'mist' | 'clearing' | 'ambient'; paused?: boolean; reduced?: boolean;
  focus?: RefObject<number>; dawn?: RefObject<number>; pointer?: RefObject<{ x: number; y: number; energy?: number }>;
  tone?: 'jade' | 'warm';
  chapter?: RefObject<number>;
};
const ease = (start: number, end: number, value: number) => {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
};
/** Soft light shared by the encounter and product previews; the same field settles into water at dawn. */
export default function AmbientParticleField(props: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const controls = useRef(props); controls.current = props;
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    let ctx: CanvasRenderingContext2D | null = null;
    try { ctx = el.getContext('2d'); } catch { return; }
    if (!ctx) return;
    const context = ctx;
    let frame = 0, previous = performance.now(), clock = 0;
    let lastPaint = '', visible = true, viewWidth = 900, viewHeight = 700;
    let chapter = -1;
    const cursor = { x: 0, y: 0 };
    const dust = Array.from({ length: 24 }, () => ({ x: 0, y: 0, life: 0 }));
    let dustIndex = 0, dustClock = 0;
    const chapterBlend = [0, 0, 0];
    // Preallocate geometry. RAF follows the display (including 120 Hz), not a 24 fps timer.
    const points = Array.from({ length: 72 }, (_, i) => ({
      x: 0, y: 0, light: 0, a: i * 2.399963, r: .12 + (i % 9) * .043,
    }));
    const sprite = document.createElement('canvas');
    sprite.width = sprite.height = 64;
    const brush = sprite.getContext('2d');
    if (!brush) return;
    const glow = brush.createRadialGradient(32, 32, 0, 32, 32, 32);
    glow.addColorStop(0, 'rgba(237,229,185,.9)');
    glow.addColorStop(.22, 'rgba(181,213,191,.42)');
    glow.addColorStop(1, 'rgba(100,130,120,0)');
    brush.fillStyle = glow; brush.fillRect(0, 0, 64, 64);
    const motion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let systemReduced = Boolean(motion?.matches);
    const syncMotion = () => { systemReduced = Boolean(motion?.matches); lastPaint = ''; };
    motion?.addEventListener?.('change', syncMotion);
    const resize = () => {
      const bounds = el.getBoundingClientRect();
      viewWidth = bounds.width || 900; viewHeight = bounds.height || 700;
      el.width = Math.max(1, Math.min(bounds.width, 900));
      el.height = Math.max(1, Math.min(bounds.height, 700));
      lastPaint = '';
    };
    resize();
    const observer = new ResizeObserver(resize); observer.observe(el);
    const intersection = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    intersection?.observe(el);
    const sync = () => { previous = performance.now(); };
    document.addEventListener('visibilitychange', sync);
    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      const c = controls.current;
      const dt = Math.min(.05, Math.max(0, (now - previous) / 1000)); previous = now;
      if (document.hidden || !visible) return;
      const still = c.paused || c.reduced || systemReduced;
      if (!still) clock += dt;
      const ambient = !c.scene || c.scene === 'ambient';
      const d = c.scene === 'clearing' ? c.dawn?.current ?? 0 : 0;
      const fade = 1 - ease(.35, 1, d) * .45;
      const targetChapter = c.chapter?.current ?? -1;
      if (!still) chapter += (targetChapter - chapter) * (1 - Math.exp(-dt * 7));
      chapterBlend.forEach((amount, index) => {
        const target = targetChapter === index ? 1 : 0;
        chapterBlend[index] = still ? target : amount + (target - amount) * (1 - Math.exp(-dt * 5));
      });
      // Keep the original points alive through the passage, not a new field on arrival.
      const paint = `${clock}:${d}:${c.focus?.current}:${c.pointer?.current?.x}:${c.pointer?.current?.y}:${c.scene}:${c.tone}:${still}:${targetChapter}`;
      if (paint === lastPaint) return;
      lastPaint = paint;
      const w = el.width, h = el.height, f = ambient ? 0 : c.focus?.current ?? 0;
      const target = c.pointer?.current ?? { x: 0, y: 0 };
      const follow = still ? 1 : 1 - Math.exp(-dt * 5);
      const movement = Math.hypot(target.x - cursor.x, target.y - cursor.y);
      cursor.x += (target.x - cursor.x) * follow;
      cursor.y += (target.y - cursor.y) * follow;
      const p = cursor;
      const water = ease(.06, .72, d);
      const project = waterProjection(viewWidth, viewHeight, d, p.x, p.y);
      const phase = ambient ? 'ambient' : d >= 1 ? 'water-memory' : c.scene === 'clearing' ? 'water' : 'field';
      if (el.dataset.phase !== phase) el.dataset.phase = phase;
      const opacity = fade.toFixed(3);
      if (el.dataset.fade !== opacity) el.dataset.fade = opacity;
      context.clearRect(0, 0, w, h);
      context.save();
      if (water > .99) {
        context.beginPath();
        WATER_BANKS.forEach(([u, v], i) => {
          const bank = project(u, v);
          if (i === 0) context.moveTo(bank.x * w, bank.y * h); else context.lineTo(bank.x * w, bank.y * h);
        });
        context.closePath(); context.clip();
      }
      const count = ambient ? 22 : 72;
      let interaction = 0;
      for (let i = 0; i < count; i++) {
        const point = points[i], { a, r } = point;
        const restlessX = .5 + Math.cos(a + clock * (.13 + i % 3 * .037)) * r + Math.sin(clock * .55 + i) * .045 - p.x * Math.cos(i) * .055;
        const restlessY = .5 + Math.sin(a - clock * .09) * r + Math.cos(clock * .42 + i) * .04 - p.y * Math.sin(i) * .045;
        const stableX = .5 + Math.cos(a) * r * .7, stableY = .44 + Math.sin(a) * r * .62;
        const x = restlessX * (1 - f) + stableX * f, y = restlessY * (1 - f) + stableY * f;
        const t = (i / count + clock * .075) % 1;
        const lane = Math.sin(a) * .88;
        const bed = waterPoint(t, lane + Math.sin(clock * 1.6 + i) * .035);
        const gathered = waterPoint(t, lane * .28);
        bed.u += (gathered.u - bed.u) * chapterBlend[0];
        const protectedPlace = waterPoint(.37, 0);
        bed.u += (protectedPlace.u + Math.cos(a + clock * .55) * .065 - bed.u) * chapterBlend[2];
        bed.v += (protectedPlace.v + Math.sin(a + clock * .55) * .026 - bed.v) * chapterBlend[2];
        const flow = project(bed.u, bed.v);
        point.x = (x * (1 - water) + flow.x * water) * w;
        point.y = (y * (1 - water) + flow.y * water) * h;
        const distance = Math.hypot(point.x / w - (p.x + 1) / 2, point.y / h - (p.y + 1) / 2);
        const pulse = c.pointer?.current?.energy ?? 0;
        const chapterLight = targetChapter < 0 ? 0 : .35 + .45 * (.5 + .5 * Math.sin(t * 16 - clock * (3 + chapter) + lane * chapter * 4));
        point.light = still ? 0 : Math.max(Math.max(0, 1 - distance / (.2 + pulse * .2)), chapterLight) * water;
        interaction = Math.max(interaction, point.light);
      }
      const strength = interaction.toFixed(3), chapterName = String(targetChapter);
      if (el.dataset.interaction !== strength) el.dataset.interaction = strength;
      if (el.dataset.chapter !== chapterName) el.dataset.chapter = chapterName;
      for (let i = 0; i < count; i++) {
        const a = points[i], sky = points[(i + 11) % count], root = points[(i + (targetChapter === 1 ? 5 : 3)) % count];
        const bx = sky.x * (1 - water) + root.x * water, by = sky.y * (1 - water) + root.y * water;
        if (!ambient) {
          context.beginPath(); context.moveTo(a.x, a.y);
          context.quadraticCurveTo((a.x + bx) / 2 + Math.sin(clock * .3 + i) * (10 + water * 20), (a.y + by) / 2 - water * 6, bx, by);
          const traveling = .65 + Math.sin(clock * 5 - i * .65) * .35;
          context.strokeStyle = `rgba(213,230,181,${(.045 + f * .12) * fade + a.light * .6 * traveling})`;
          context.lineWidth = .6 + a.light * .7; context.stroke();
        }
        const radius = (ambient ? 9 : 6) + f * 4 + a.light * 7;
        context.globalAlpha = (.42 + f * .2) * fade + a.light * .6;
        context.drawImage(sprite, a.x - radius, a.y - radius, radius * 2, radius * 2);
        context.globalAlpha = 1;
      }
      context.restore();
      // A small, pooled wake follows the pointer in every encounter phase.
      // Emission follows elapsed time, so 120 Hz does not double the density.
      if (!ambient && !still) {
        dustClock += dt;
        if (movement > .015 && dustClock >= .025) {
          const mote = dust[dustIndex++ % dust.length];
          mote.x = (p.x + 1) / 2 * w; mote.y = (p.y + 1) / 2 * h; mote.life = 1;
          dustClock = 0;
        }
        for (let i = 0; i < dust.length; i++) {
          const mote = dust[i];
          if (mote.life <= 0) continue;
          mote.life = Math.max(0, mote.life - dt * 1.5);
          mote.x += Math.sin(i * 2.4) * dt * 9; mote.y -= dt * 12;
          const radius = 3 + mote.life * 5;
          context.globalAlpha = mote.life * .75;
          context.drawImage(sprite, mote.x - radius, mote.y - radius, radius * 2, radius * 2);
        }
        context.globalAlpha = 1;
      }
      if (!still && c.pointer?.current?.energy) c.pointer.current.energy = Math.max(0, c.pointer.current.energy - dt * .65);
    };
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); intersection?.disconnect(); motion?.removeEventListener?.('change', syncMotion); document.removeEventListener('visibilitychange', sync); };
  }, []);
  return <canvas ref={canvas} className={styles.field} data-scene={props.scene ?? 'ambient'} aria-hidden="true" />;
}
