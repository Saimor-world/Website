'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import styles from './PixelMora.module.css';

/** Sprite grid of the final set: 40 × 40 art pixels. */
export const PIXEL_GRID = 40;
const SRC = '/mora/pixel/';
/** Default wardrobe of mora-ui (lib/mora/mora-traits.json), drawn in slot order: neck, head, clip. */
const TRAITS = ['traits/neck-scarf', 'traits/head-sprout', 'traits/clip-moon'];

export type PixelMoraState = 'idle' | 'thinking' | 'approval' | 'night';

/**
 * Pixel MÔRA from the final set: base layers plus the default scarf, sprout and moon clip, mirrored from mora-ui.
 * Integer scaling only; states show through calm motion and a small hint, never through new frames.
 * `still` (reduced motion, Lite) renders a quiet still image. Increment `hop` for a small jump.
 */
export default function PixelMora({ scale, state = 'idle', still = false, hop = 0, className }: {
  scale: number; state?: PixelMoraState; still?: boolean; hop?: number; className?: string;
}) {
  const unit = Math.max(1, Math.round(scale));
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => { setReducedMotion(Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)); }, []);
  const calm = still || reducedMotion;
  const [blink, setBlink] = useState(false);
  const [hopping, setHopping] = useState(false);
  const [look, setLook] = useState<0 | -1 | 1>(0);
  const box = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (calm || state === 'night') return;
    let open: number | undefined;
    const timer = window.setInterval(() => {
      setBlink(true);open = window.setTimeout(() => setBlink(false), 140);
    }, 5600);
    return () => { window.clearInterval(timer);if (open !== undefined) window.clearTimeout(open); };
  }, [calm, state]);

  // Throttled glance toward the pointer, as in mora-ui (no layout read on every pointer pixel).
  useEffect(() => {
    if (calm || state === 'night') { setLook(0); return; }
    let last = -Infinity;
    const onMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - last < 120) return;
      last = now;
      const bounds = box.current?.getBoundingClientRect(); if (!bounds) return;
      const dx = event.clientX - (bounds.left + bounds.width / 2);
      const dy = event.clientY - (bounds.top + bounds.height / 2);
      setLook(Math.hypot(dx, dy) < 220 ? (dx < -12 ? -1 : dx > 12 ? 1 : 0) : 0);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [calm, state]);

  useEffect(() => {
    if (!hop || still) return;
    setHopping(true);
    const timer = window.setTimeout(() => setHopping(false), 560);
    return () => window.clearTimeout(timer);
  }, [hop, still]);

  const eyes = state === 'night' || blink ? 'eyes_closed' : look < 0 ? 'eyes_l' : look > 0 ? 'eyes_r' : 'eyes';
  return <span ref={box} className={`${styles.mora}${className ? ` ${className}` : ''}`} data-pixel-mora data-state={state}
    data-still={still} data-hop={hopping || undefined} aria-hidden="true"
    style={{ '--u': `${unit}px`, width: PIXEL_GRID * unit, height: PIXEL_GRID * unit } as CSSProperties}>
    <span className={styles.figure}>
      {/* Plain <img>: next/image would re-encode and resample the 40 px sprites, which blurs the pixels. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {['body', 'light', 'face', eyes, ...TRAITS].map((layer, index) => <img key={index} src={`${SRC}${layer}.png`} alt=""
        className={`${styles.layer} ${layer === 'light' ? styles.light : ''}`} draggable={false} width={PIXEL_GRID * unit} height={PIXEL_GRID * unit} />)}
    </span>
    {state === 'approval' ? <span className={styles.hint} /> : null}
  </span>;
}
