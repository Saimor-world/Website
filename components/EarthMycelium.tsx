'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './EarthMycelium.module.css';
import { isLiteMode } from '@/lib/lite-mode-script';

/** Where the hidden YORI spark sits, as a share of the field (kept in sync with YoriPath.module.css). */
export const YORI_SPOT = { desktop: { x: 0.64, y: 0.5 }, phone: { x: 0.62, y: 0.46 } };

type Node = { x: number; y: number; w: number };

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Hyphae grow from the Earth's edge downward, wander, branch and thin out; light sits on some junctions.
 * Deterministic (same seed, same network), drawn once per width: threads into one canvas, light into another.
 */
function paint(threads: HTMLCanvasElement, lights: HTMLCanvasElement, width: number, height: number) {
  const phone = width <= 700;
  const scale = Math.min(window.devicePixelRatio || 1, 2);
  const random = mulberry32(phone ? 11 : 7);
  const t = threads.getContext('2d'), l = lights.getContext('2d');
  if (!t || !l) return;
  for (const [canvas, context] of [[threads, t], [lights, l]] as const) {
    canvas.width = Math.round(width * scale); canvas.height = Math.round(height * scale);
    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.clearRect(0, 0, width, height);
  }
  t.lineCap = 'round';
  const nodes: Node[] = [];
  // The network runs almost to the end of the section, so the underside never ends in an empty black band.
  const reach = height * 0.94;
  const grow = (x: number, y: number, angle: number, w: number, depth: number, toward?: { x: number; y: number }) => {
    let length = 0;
    // Each hypha stops at its own depth, so the network frays out instead of ending on one line.
    const end = toward ? reach : reach * (0.72 + random() * 0.26);
    const limit = (phone ? 52 : 110) * depth + random() * (phone ? 50 : 80);
    while (y < end && length < limit) {
      const step = 3 + random() * 4;
      if (toward) angle += (Math.atan2(toward.y - y, toward.x - x) - angle) * 0.18;
      const nx = x + Math.cos(angle) * step, ny = y + Math.sin(angle) * step;
      t.strokeStyle = `rgba(${206 + random() * 24},${226 + random() * 16},${196 + random() * 18},${Math.min(0.8, 0.22 + w * 0.32)})`;
      t.lineWidth = Math.max(0.35, w);
      t.beginPath(); t.moveTo(x, y); t.quadraticCurveTo((x + nx) / 2 + (random() - 0.5) * 3, (y + ny) / 2, nx, ny); t.stroke();
      x = nx; y = ny; length += step;
      if (toward && Math.hypot(toward.x - x, toward.y - y) < 4) break;
      // Wander, but keep growing downward like hyphae under the soil.
      angle += (random() - 0.5) * 0.5;
      angle = Math.max(0.4, Math.min(Math.PI - 0.4, angle * 0.92 + (Math.PI / 2) * 0.08));
      w *= 0.986;
      if (!toward && depth > 1 && random() < 0.07) {
        nodes.push({ x, y, w });
        grow(x, y, angle + (random() < 0.5 ? -1 : 1) * (0.5 + random() * 0.7), w * 0.7, depth - 1);
      }
    }
    nodes.push({ x, y, w });
  };
  // The Earth's edge is curved (deepest in the middle): every hypha starts on it, never in the sky.
  const edge = (x: number) => { const u = (x / width) * 2 - 1; return height * (phone ? 0.03 : 0.07) * (1 - u * u) + 2; };
  const roots = phone ? 10 : 14;
  for (let i = 0; i < roots; i++) {
    const x = width * (0.05 + (0.9 * (i + random() * 0.6)) / roots);
    grow(x, edge(x) + random() * 4, Math.PI / 2 + (random() - 0.5) * 0.6, phone ? 0.9 + random() * 0.7 : 1.4 + random() * 1.1, 4);
  }
  // One hypha leads to the hidden YORI spark, so the spark sits on the network, not beside it.
  const spot = phone ? YORI_SPOT.phone : YORI_SPOT.desktop;
  const target = { x: width * spot.x, y: height * spot.y };
  grow(target.x - width * 0.08, edge(target.x - width * 0.08), Math.PI / 2, phone ? 1.1 : 1.5, 1, target);
  for (const node of nodes) {
    if (random() > (phone ? 0.22 : 0.28)) continue;
    l.fillStyle = random() < 0.4 ? 'rgba(242,198,107,.9)' : 'rgba(205,240,220,.85)';
    l.beginPath(); l.arc(node.x, node.y, 1.1 + node.w, 0, Math.PI * 2); l.fill();
  }
}

/**
 * Mycelium on the underside of the Earth: the closing part of the round world (hero top, portal inside,
 * underside here). Painted once per width, no per-frame drawing; the light layer breathes in opacity only and
 * pauses offscreen. A hidden YORI spark (children) sits on one of the threads.
 */
export default function EarthMycelium({ children }: { children?: ReactNode } = {}) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const threadsRef = useRef<HTMLCanvasElement>(null);
  const lightsRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(true);
  const [grow, setGrow] = useState<'still' | 'armed' | 'on'>('still');

  useEffect(() => {
    const field = fieldRef.current, threads = threadsRef.current, lights = lightsRef.current;
    if (!field || !threads || !lights) return undefined;
    let width = 0, timer = 0;
    const draw = () => {
      const bounds = field.getBoundingClientRect();
      if (!bounds.width || Math.round(bounds.width) === width) return;
      width = Math.round(bounds.width);
      paint(threads, lights, bounds.width, bounds.height);
    };
    draw();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(() => { window.clearTimeout(timer); timer = window.setTimeout(draw, 150); });
    observer.observe(field);
    return () => { observer.disconnect(); window.clearTimeout(timer); };
  }, []);

  // Pause the breathing light while the underside is offscreen.
  useEffect(() => {
    const field = fieldRef.current;
    if (!field || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: '120px 0px' });
    observer.observe(field);
    return () => observer.disconnect();
  }, []);

  // The network grows in once, the first time the underside comes into view.
  useEffect(() => {
    const field = fieldRef.current;
    if (!field || typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || isLiteMode()) return undefined;
    setGrow('armed');
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setGrow('on');
      observer.disconnect();
    }, { threshold: 0.15 });
    observer.observe(field);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={fieldRef} className={styles.field} data-testid="earth-mycelium" data-active={active ? 'on' : 'off'} data-grow={grow}>
      <canvas ref={threadsRef} className={styles.threads} aria-hidden="true" />
      <canvas ref={lightsRef} className={styles.lights} aria-hidden="true" />
      {children}
    </div>
  );
}
