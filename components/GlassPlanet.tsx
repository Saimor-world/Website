import type { CSSProperties } from 'react';
import styles from './GlassPlanet.module.css';

export type GlassBiome = 'forest' | 'water' | 'earth' | 'light' | 'stone';

/** Glass colour per world: the tint of the sphere, its rim and its glow. */
export const TINT: Record<GlassBiome, string> = {
  forest: '128,214,156',
  water: '118,186,244',
  earth: '238,192,112',
  light: '255,226,150',
  stone: '200,206,220',
};

/**
 * A glass planet in the style of the OS: the inner world is a piece of the website's own photos
 * (forest, water, earth, light, stone), seen through tinted glass with depth, a light reflection, a fine rim
 * and a soft glow. Static layers only; the inner world drifts slowly by transform when `still` is off.
 */
export default function GlassPlanet({ biome, size, still = false, className, style }: {
  biome: GlassBiome; size: number; still?: boolean; className?: string; style?: CSSProperties;
}) {
  return <span className={`${styles.planet}${className ? ` ${className}` : ''}`} data-glass={biome} data-still={still} aria-hidden="true"
    style={{ ...style, '--d': `${size}px`, '--tint': TINT[biome] } as CSSProperties}>
    <span className={styles.halo} />
    <span className={styles.sphere}>
      <span className={styles.world} style={{ backgroundImage: `url(/images/deep-view/planet-${biome}.webp)` }} />
      <span className={styles.tint} />
      <span className={styles.depth} />
      <span className={styles.gloss} />
    </span>
  </span>;
}
