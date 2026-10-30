'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import styles from './PixelMora.module.css';

/** Sprite grid of the final set: 40 × 40 art pixels (see docs/mora-pixel/SOURCE.json). */
export const PIXEL_GRID = 40;
const SRC = '/mora/pixel/';

export type MoraOutfit = 'default' | 'captain';
export type MoraMood = 'idle' | 'hop' | 'fly' | 'sleep' | 'talk';
export type MoraLook = -1 | 0 | 1;

/**
 * Wardrobe slots in the OS order (neck, head, clip). The default wardrobe is scarf, sprout and moon clip;
 * the captain's hat takes the head slot and hides the clip, exactly as `hides: ['clip']` in mora-traits.json.
 */
const OUTFITS: Record<MoraOutfit, string[]> = {
  default: ['traits/neck-scarf', 'traits/head-sprout', 'traits/clip-moon'],
  captain: ['traits/neck-scarf', 'traits/head-captain'],
};

/**
 * Pixel MÔRA from the final set. Integer scaling only and plain <img> layers, so every art pixel stays sharp.
 * Moods change motion (CSS, transform only), never the drawing; sleep is closed eyes and slow breath.
 * `still` keeps her calm: open eyes, no motion.
 */
export default function PixelMora({ scale, outfit = 'default', mood = 'idle', look = 0, still = false, className, style }: {
  scale: number; outfit?: MoraOutfit; mood?: MoraMood; look?: MoraLook; still?: boolean; className?: string; style?: CSSProperties;
}) {
  const unit = Math.max(1, Math.round(scale));
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    if (still || mood === 'sleep') { setBlink(false); return; }
    let close: number | undefined, open: number | undefined;
    const next = () => {
      close = window.setTimeout(() => {
        setBlink(true);
        open = window.setTimeout(() => { setBlink(false); next(); }, 140);
      }, 2600 + Math.round(Math.random() * 3400));
    };
    next();
    return () => { window.clearTimeout(close); window.clearTimeout(open); };
  }, [still, mood]);

  const eyes = mood === 'sleep' || blink ? 'eyes_closed' : still || look === 0 ? 'eyes' : look < 0 ? 'eyes_l' : 'eyes_r';
  const layers = ['body', 'light', 'face', eyes, ...OUTFITS[outfit]];
  const size = PIXEL_GRID * unit;
  return <span className={`${styles.mora}${className ? ` ${className}` : ''}`} data-pixel-mora data-outfit={outfit} data-mood={mood}
    data-still={still} data-cheap-motion aria-hidden="true" style={{ ...style, '--u': `${unit}px`, width: size, height: size } as CSSProperties}>
    <span className={styles.figure} data-cheap-motion>
      {/* Plain <img>: next/image would resample the 40 px sprites and blur the pixels. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {layers.map((layer, index) => <img key={index} src={`${SRC}${layer}.png`} alt="" draggable={false}
        className={`${styles.layer}${layer === 'light' ? ` ${styles.light}` : ''}`} width={size} height={size} />)}
    </span>
  </span>;
}
