'use client';

import { useEffect, useRef } from 'react';

type Pin = { key: string; name: string; lat: number; lng: number };
type Props = { pins: Pin[]; still: boolean; label: string; className?: string };

const TEX_W = 1024;
const TEX_H = 512;
const TILT = (38 * Math.PI) / 180; // view centre latitude
const LIGHT = (() => { const v = [-0.62, 0.42, 0.66]; const l = Math.hypot(...v); return v.map(n => n / l); })();
const D2R = Math.PI / 180;

// Seeded random so the root network is identical on server, client and every frame.
function rng(seed: number) { let s = seed; return () => ((s = (s * 16807) % 2147483647) / 2147483647); }

type Seg = { a: [number, number]; b: [number, number]; depth: number };
function growRoots(origins: [number, number][]): { segs: Seg[]; tips: [number, number][] } {
  const r = rng(7);
  const segs: Seg[] = [];
  const tips: [number, number][] = [];
  const grow = (p: [number, number], dir: number, len: number, depth: number) => {
    if (depth > 5 || len < 1.2) { tips.push(p); return; }
    const steps = 3;
    let cur = p;
    for (let i = 0; i < steps; i++) {
      dir += (r() - 0.5) * 0.5;
      const nxt: [number, number] = [cur[0] + Math.sin(dir) * len / steps, cur[1] + Math.cos(dir) * len / steps / Math.cos(cur[0] * D2R)];
      segs.push({ a: cur, b: nxt, depth });
      cur = nxt;
    }
    const n = depth < 2 ? 2 : r() < 0.45 ? 2 : 1;
    for (let k = 0; k < n; k++) grow(cur, dir + (k === 0 ? -1 : 1) * (0.35 + r() * 0.45), len * (0.62 + r() * 0.12), depth + 1);
  };
  origins.forEach(o => { const arms = 4; for (let i = 0; i < arms; i++) grow(o, (i / arms) * Math.PI * 2 + r() * 0.8, 13, 0); });
  return { segs, tips };
}

export default function EarthGlobe({ pins, still, label, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pinsRef = useRef(pins);
  pinsRef.current = pins;
  const stillRef = useRef(still);
  stillRef.current = still;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    let alive = true;
    let visible = true;
    let tex: Uint8ClampedArray | null = null;
    let frame: ImageData | null = null;
    let lut: { idx: Int32Array; row: Int32Array; lon: Float32Array; mrg: Float32Array; mb: Float32Array; ar: Float32Array; ag: Float32Array; ab: Float32Array } | null = null;
    let S = 0;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const roots = growRoots([[54.13, 8.86], [48.78, 9.18], [44, 24]]);

    const img = new Image();
    img.decoding = 'async';
    img.src = '/earth/blue-marble-2048.jpg';
    img.onload = () => {
      const off = document.createElement('canvas');
      off.width = TEX_W; off.height = TEX_H;
      const o = off.getContext('2d');
      if (!o) return;
      o.drawImage(img, 0, 0, TEX_W, TEX_H);
      const d = o.getImageData(0, 0, TEX_W, TEX_H).data;
      // Colour grade: subdue deserts (warm, bright land) towards olive/umber, deepen oceans to teal-navy.
      for (let i = 0; i < d.length; i += 4) {
        let r = d[i], g = d[i + 1], b = d[i + 2];
        const lum = 0.3 * r + 0.59 * g + 0.11 * b;
        const warm = Math.max(0, (r - b) / 255);
        const k = Math.min(1, warm * 1.6);
        r = r * (1 - k) + (lum * 0.78 + 18) * k; g = g * (1 - k) + (lum * 0.74 + 16) * k; b = b * (1 - k) + (lum * 0.52 + 10) * k;
        if (b > r && b > g) { r *= 0.45; g = g * 0.62 + 6; b = b * 0.62 + 4; }
        // Warm golden night grade; clamp bright ice so it never turns harsh white.
        const l2 = 0.3 * r + 0.59 * g + 0.11 * b;
        if (l2 > 170) { const f = 170 / l2; r *= f; g *= f; b *= f; }
        d[i] = Math.min(255, r * 0.78 + l2 * 0.22 + 10); d[i + 1] = g * 0.7 + l2 * 0.12 + 4; d[i + 2] = b * 0.55 + 2;
      }
      tex = d;
      resize();
    };

    const resize = () => {
      const css = canvas.clientWidth;
      const dpr = Math.min(window.devicePixelRatio || 1, css < 500 ? 1.5 : 1.25);
      S = Math.max(64, Math.round(css * dpr));
      canvas.width = S; canvas.height = S;
      frame = ctx.createImageData(S, S);
      const R = S / 2 - 1, c = S / 2;
      const idx: number[] = [], row: number[] = [], lon: number[] = [], day: number[] = [], rim: number[] = [], rimWarm: number[] = [];
      for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
        const nx = (x + 0.5 - c) / R, ny = (c - y - 0.5) / R, q = nx * nx + ny * ny;
        if (q > 1) continue;
        const nz = Math.sqrt(1 - q);
        const lat = Math.asin(ny * Math.cos(TILT) + nz * Math.sin(TILT));
        const lo = Math.atan2(nx, nz * Math.cos(TILT) - ny * Math.sin(TILT));
        const l = nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2];
        const t = Math.min(1, Math.max(0, (l + 0.08) / 0.38));
        idx.push((y * S + x) * 4);
        row.push(Math.min(TEX_H - 1, Math.floor((0.5 - lat / Math.PI) * TEX_H)) * TEX_W);
        lon.push((lo / (2 * Math.PI)) * TEX_W);
        day.push(t * t * (3 - 2 * t));
        const e = Math.pow(1 - nz, 2.6);
        rim.push(e); rimWarm.push(Math.max(0, l + 0.3));
      }
      const n = idx.length, mrg = new Float32Array(n), mb = new Float32Array(n), ar = new Float32Array(n), ag = new Float32Array(n), ab = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const dy = day[i], night = 1 - dy, e = rim[i], w = rimWarm[i];
        mrg[i] = 0.08 + 0.85 * dy; mb[i] = 0.1 + 0.85 * dy;
        ar[i] = night * 8 + e * (255 * w * 1.1 + 60); ag[i] = night * 10 + e * (180 * w * 1.1 + 40); ab[i] = night * 12 + e * (80 * w * 1.1 + 10);
      }
      const ixa = Int32Array.from(idx);
      for (let i = 0; i < n; i++) frame.data[ixa[i] + 3] = 255;
      lut = { idx: ixa, row: Int32Array.from(row), lon: Float32Array.from(lon), mrg, mb, ar, ag, ab };
      lastSh = NaN;
      draw(performance.now());
    };

    const project = (lat: number, lng: number, lc: number) => {
      const φ = lat * D2R, λ = (lng - lc) * D2R;
      const x = Math.cos(φ) * Math.sin(λ);
      const y = Math.cos(TILT) * Math.sin(φ) - Math.sin(TILT) * Math.cos(φ) * Math.cos(λ);
      const z = Math.sin(TILT) * Math.sin(φ) + Math.cos(TILT) * Math.cos(φ) * Math.cos(λ);
      const R = S / 2 - 1;
      return { x: S / 2 + x * R, y: S / 2 - y * R, z };
    };

    let last = 0;
    let lastSh = NaN;
    const draw = (now: number) => {
      if (!tex || !lut || !frame) return;
      const t = now / 1000;
      const lc = 11 + 26 * Math.sin(t * 0.09); // slow rocking spin, Europe stays in view
      const shift = (lc / 360) * TEX_W;
      const px = frame.data, L = lut;
      const sh = Math.floor(shift + TEX_W * 1.5), n = L.idx.length, lon = L.lon, row = L.row, ix = L.idx, mrg = L.mrg, mb = L.mb, ar = L.ar, ag = L.ag, ab = L.ab;
      // The texture only moves when the spin crosses a whole texel; reuse the last pixels otherwise.
      if (sh !== lastSh) { lastSh = sh; for (let i = 0; i < n; i++) {
        let u = Math.floor(lon[i] + sh) % TEX_W;
        if (u < 0) u += TEX_W;
        const s = (row[i] + u) << 2, o = ix[i], m = mrg[i];
        px[o] = tex[s] * m + ar[i];
        px[o + 1] = tex[s + 1] * m + ag[i];
        px[o + 2] = tex[s + 2] * mb[i] + ab[i];
      } }
      ctx.putImageData(frame, 0, 0);

      // Root network: thin, sparse, fading with depth; only the front hemisphere.
      const k = S / 900;
      ctx.lineCap = 'round';
      ctx.globalCompositeOperation = 'lighter';
      for (const pass of [0, 1]) {
        ctx.beginPath();
        for (const sg of roots.segs) {
          const a = project(sg.a[0], sg.a[1], lc), b = project(sg.b[0], sg.b[1], lc);
          if (a.z < 0.08 || b.z < 0.08) continue;
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        }
        ctx.strokeStyle = pass ? 'rgba(215,255,230,.85)' : 'rgba(120,240,180,.28)';
        ctx.lineWidth = (pass ? 1.4 : 6) * k;
        ctx.stroke();
      }
      // Gold sparks at a subset of tips, breathing.
      roots.tips.forEach((p, i) => {
        if (i % 2) return;
        const q = project(p[0], p[1], lc);
        if (q.z < 0.15) return;
        const a = 0.5 + 0.5 * Math.sin(t * 1.6 + i);
        const g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, 18 * k);
        g.addColorStop(0, `rgba(255,236,190,${0.55 + 0.45 * a})`); g.addColorStop(0.35, `rgba(255,190,90,${0.35 * a + 0.15})`); g.addColorStop(1, 'rgba(255,170,60,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(q.x, q.y, 18 * k, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalCompositeOperation = 'source-over';
      // Real region pins from the Earth API.
      pinsRef.current.forEach((p, i) => {
        const q = project(p.lat, p.lng, lc);
        if (q.z < 0.1) return;
        const pulse = (t * 0.45 + i * 0.5) % 1;
        ctx.strokeStyle = `rgba(255,225,160,${1 - pulse})`; ctx.lineWidth = 2 * k;
        ctx.beginPath(); ctx.arc(q.x, q.y, (8 + pulse * 26) * k, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = '#fff4cf'; ctx.shadowColor = '#ffc860'; ctx.shadowBlur = 16 * k;
        ctx.beginPath(); ctx.arc(q.x, q.y, 6 * k, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
        ctx.font = `500 ${Math.round(24 * k)}px Inter, system-ui, sans-serif`;
        ctx.lineWidth = 5 * k; ctx.strokeStyle = 'rgba(4,8,10,.75)';
        const ty = q.y + (i % 2 ? 30 : -14) * k;
        ctx.strokeText(p.name, q.x + 16 * k, ty); ctx.fillStyle = '#fff6e2'; ctx.fillText(p.name, q.x + 16 * k, ty);
      });
    };

    const loop = (now: number) => {
      if (!alive) return;
      if (visible && !stillRef.current && !reduced && now - last > 33) { last = now; draw(now); }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    const ro = new ResizeObserver(() => { if (tex) resize(); });
    ro.observe(canvas);
    return () => { alive = false; cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className={className} role="img" aria-label={label} />;
}
