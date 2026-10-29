'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import {
  makeStars, paintMoon, paintNebula, paintPlanet, paintStars, planetCanvasSize, planetGeometry,
  type Bitmap, type PlanetKind,
} from '@/lib/pixel/pixelArt';
import styles from './PixelWorld.module.css';

/**
 * Website port of the OS pixel world (mora-ui components/world/PixelPlanet.tsx): the same painter,
 * the same rules. Everything is painted into small bitmaps and enlarged by whole numbers only.
 */
export const SKY_PX = 3;
const LIGHT = { x: -0.6, y: -0.45 };

function draw(canvas: HTMLCanvasElement | null, bitmap: Bitmap) {
  if (!canvas || typeof ImageData === 'undefined') return;
  const context = canvas.getContext('2d');
  if (!context) return; // jsdom: no canvas
  if (canvas.width !== bitmap.w) canvas.width = bitmap.w;
  if (canvas.height !== bitmap.h) canvas.height = bitmap.h;
  context.putImageData(new ImageData(new Uint8ClampedArray(bitmap.data), bitmap.w, bitmap.h), 0, 0);
}

/** A hand-set pixel planet. Its surface turns one step every 1.2 s, only while visible and not still. */
export function PixelPlanet({ kind, diameter, seed, px, still, folders, activity, open, className, style }: {
  kind: PlanetKind; diameter: number; seed: number; px: number; still: boolean;
  folders?: number; activity?: number; open?: number; className?: string; style?: CSSProperties;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const spec = useMemo(() => ({ kind, d: diameter, seed, light: LIGHT, folders, activity, open }), [kind, diameter, seed, folders, activity, open]);
  const geometry = useMemo(() => planetGeometry(spec), [spec]);
  const size = planetCanvasSize(spec) * px;
  useEffect(() => {
    let frame = 0, visible = true;
    draw(canvas.current, paintPlanet(spec, geometry, frame));
    if (still) return;
    const sight = typeof IntersectionObserver === 'undefined' || !canvas.current ? null
      : new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    if (sight && canvas.current) sight.observe(canvas.current);
    const timer = window.setInterval(() => {
      if (document.hidden || !visible) return;
      frame += 1; draw(canvas.current, paintPlanet(spec, geometry, frame));
    }, 1200);
    return () => { window.clearInterval(timer); sight?.disconnect(); };
  }, [spec, geometry, still]);
  return <canvas ref={canvas} className={`${styles.pixel}${className ? ` ${className}` : ''}`} data-planet={kind} aria-hidden="true"
    style={{ ...style, width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }} />;
}

/** A mini moon: painted once. */
export function PixelMoon({ kind, diameter, seed, px, className, style }: {
  kind: PlanetKind; diameter: number; seed: number; px: number; className?: string; style?: CSSProperties;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const bitmap = useMemo(() => paintMoon(kind, diameter, seed, LIGHT, false), [kind, diameter, seed]);
  useEffect(() => { draw(canvas.current, bitmap); }, [bitmap]);
  const size = bitmap.w * px;
  return <canvas ref={canvas} className={`${styles.pixel}${className ? ` ${className}` : ''}`} aria-hidden="true"
    style={{ ...style, width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }} />;
}

/** The pixel sky: dithered nebula and stars painted once per viewport size; a twinkle layer blinks in steps. */
export function PixelSky({ still }: { still: boolean }) {
  const nebula = useRef<HTMLCanvasElement>(null);
  const stars = useRef<HTMLCanvasElement>(null);
  const twinkle = useRef<HTMLCanvasElement>(null);
  const [view, setView] = useState({ w: 0, h: 0 });
  useEffect(() => {
    let timer = 0;
    const read = () => setView({ w: window.innerWidth, h: window.innerHeight });
    const onResize = () => { window.clearTimeout(timer); timer = window.setTimeout(read, 160); };
    read();
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); window.clearTimeout(timer); };
  }, []);
  const w = Math.max(8, Math.ceil(view.w / SKY_PX)), h = Math.max(8, Math.ceil(view.h / SKY_PX));
  useEffect(() => {
    if (!view.w || !view.h) return;
    draw(nebula.current, paintNebula(w, h));
    const field = makeStars(w, h);
    draw(stars.current, paintStars(w, h, field, false));
    draw(twinkle.current, paintStars(w, h, field, true));
  }, [w, h, view.w, view.h]);
  const size = { width: w * SKY_PX, height: h * SKY_PX };
  return <div className={styles.sky} data-still={still} aria-hidden="true" data-testid="pixel-sky">
    <canvas ref={nebula} className={styles.pixel} style={size} />
    <canvas ref={stars} className={styles.pixel} style={size} />
    <canvas ref={twinkle} className={`${styles.pixel} ${styles.twinkle}`} style={size} data-cheap-motion />
  </div>;
}
