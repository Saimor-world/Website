'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import {
  bayer, makeStars, paintMoon, paintNebula, paintPlanet, paintStars, planetCanvasSize, planetGeometry,
  type Bitmap, type Geometry, type PlanetKind,
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

/** Nature biomes for the planets: surfaces taken from the website's own photos (public/images/pixel/biome-*.png). */
export type Biome = 'forest' | 'water' | 'earth' | 'light' | 'stone';
const RIM: Record<Biome, [number, number, number]> = {
  forest: [120, 200, 140], water: [120, 190, 230], earth: [230, 200, 130], light: [255, 220, 150], stone: [180, 180, 190],
};
const biomeTextures = new Map<Biome, Promise<ImageData | null>>();
function biomeTexture(biome: Biome) {
  let texture = biomeTextures.get(biome);
  if (!texture) {
    texture = new Promise(resolve => {
      if (typeof Image === 'undefined') { resolve(null); return; }
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas'); canvas.width = image.width; canvas.height = image.height;
        const context = canvas.getContext('2d');
        if (!context) { resolve(null); return; }
        context.drawImage(image, 0, 0);
        resolve(context.getImageData(0, 0, image.width, image.height));
      };
      image.onerror = () => resolve(null);
      image.src = `/images/pixel/biome-${biome}.png`;
    });
    biomeTextures.set(biome, texture);
  }
  return texture;
}

/** The biome wrapped on the OS sphere: same geometry and light, stepped (dithered) terminator, soft rim. */
function paintBiome(texture: ImageData, geometry: Geometry, rim: [number, number, number], spin: number): Bitmap {
  const { S, mask, nx, ny, nz, lam } = geometry;
  const data = new Uint8ClampedArray(S * S * 4);
  const fold = (v: number) => { const f = ((v % 2) + 2) % 2; return f > 1 ? 2 - f : f; };
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const i = y * S + x;
    if (!mask[i]) continue;
    const lon = Math.atan2(nx[i], nz[i]) / (Math.PI * 2) + 0.5 + spin;
    const lat = Math.asin(Math.max(-1, Math.min(1, ny[i]))) / Math.PI + 0.5;
    const t = (Math.floor(lat * (texture.height - 1)) * texture.width + Math.floor(fold(lon * 2) * (texture.width - 1))) * 4;
    const level = Math.max(0.12, Math.floor((0.3 + lam[i]) * 4 + (bayer(x, y) - 0.5)) / 4);
    const edge = Math.max(0, 1 - nz[i] - 0.55) * 0.9;
    for (let k = 0; k < 3; k++) data[i * 4 + k] = Math.min(255, texture.data[t + k] * level * 1.15 + rim[k] * edge);
    data[i * 4 + 3] = 255;
  }
  return { w: S, h: S, data };
}

/** A nature planet: its surface turns one step every 1.2 s, only while visible and not still. */
export function BiomePlanet({ biome, diameter, spin = 0, px, still, className, style }: {
  biome: Biome; diameter: number; spin?: number; px: number; still: boolean; className?: string; style?: CSSProperties;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const geometry = useMemo(() => planetGeometry({ kind: 'rock', d: diameter, seed: 1, light: LIGHT }), [diameter]);
  const size = geometry.S * px;
  useEffect(() => {
    let alive = true, frame = 0, visible = true, timer = 0;
    let texture: ImageData | null = null;
    const sight = typeof IntersectionObserver === 'undefined' || !canvas.current ? null
      : new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    if (sight && canvas.current) sight.observe(canvas.current);
    void biomeTexture(biome).then(loaded => {
      if (!alive || !loaded) return;
      texture = loaded;
      draw(canvas.current, paintBiome(loaded, geometry, RIM[biome], spin));
      if (still) return;
      timer = window.setInterval(() => {
        if (!texture || document.hidden || !visible) return;
        frame += 1; draw(canvas.current, paintBiome(texture, geometry, RIM[biome], spin + frame * 0.035));
      }, 1200);
    });
    return () => { alive = false; window.clearInterval(timer); sight?.disconnect(); };
  }, [biome, geometry, spin, still]);
  return <canvas ref={canvas} className={`${styles.pixel}${className ? ` ${className}` : ''}`} data-biome={biome} aria-hidden="true"
    style={{ ...style, width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }} />;
}
