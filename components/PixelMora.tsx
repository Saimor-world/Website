'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import styles from './PixelMora.module.css';

/** Sprite grid of the final set: 40 × 40 art pixels. */
export const PIXEL_GRID = 40;
const SRC = '/mora/pixel/';

export type PixelMoraState = 'idle' | 'thinking' | 'approval' | 'night';

/**
 * Pixel MÔRA from the final set (base layers only, no accessories, nothing painted on).
 * Integer scaling only; states show through calm motion and a small hint, never through new frames.
 * `still` (reduced motion, Lite) renders a quiet still image. Increment `hop` for a small jump.
 */
export default function PixelMora({ scale, state = 'idle', still = false, hop = 0, className }: {
  scale: number; state?: PixelMoraState; still?: boolean; hop?: number; className?: string;
}) {
  const unit = Math.max(1, Math.round(scale));
  const [blink, setBlink] = useState(false);
  const [hopping, setHopping] = useState(false);

  useEffect(() => {
    if (still || state === 'night') return;
    let open: number | undefined;
    const timer = window.setInterval(() => {
      setBlink(true);open = window.setTimeout(() => setBlink(false), 140);
    }, 5600);
    return () => { window.clearInterval(timer);if (open !== undefined) window.clearTimeout(open); };
  }, [still, state]);

  useEffect(() => {
    if (!hop || still) return;
    setHopping(true);
    const timer = window.setTimeout(() => setHopping(false), 560);
    return () => window.clearTimeout(timer);
  }, [hop, still]);

  const eyes = state === 'night' || blink ? 'eyes_closed' : 'eyes';
  return <span className={`${styles.mora}${className ? ` ${className}` : ''}`} data-pixel-mora data-state={state}
    data-still={still} data-hop={hopping || undefined} aria-hidden="true"
    style={{ '--u': `${unit}px`, width: PIXEL_GRID * unit, height: PIXEL_GRID * unit } as CSSProperties}>
    <span className={styles.figure}>
      {/* Plain <img>: next/image would re-encode and resample the 40 px sprites, which blurs the pixels. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {['body', 'light', 'face', eyes].map((layer) => <img key={layer} src={`${SRC}${layer}.png`} alt=""
        className={`${styles.layer} ${layer === 'light' ? styles.light : ''}`} draggable={false} width={PIXEL_GRID * unit} height={PIXEL_GRID * unit} />)}
    </span>
    {state === 'approval' ? <span className={styles.hint} /> : null}
  </span>;
}
