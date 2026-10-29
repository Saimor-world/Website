import BrandSigil from './BrandSigil';
import styles from './OrbitalScene.module.css';

/** Real browser-rendered orbits and moons; the landscape contains none of these. */
export default function OrbitalScene() {
  return <div className={styles.scene} aria-hidden="true" data-testid="hero-orbits">
    <div className={styles.aura} />
    <div data-cheap-motion className={`${styles.orbit} ${styles.outer}`}><span className={styles.moon} /></div>
    <div data-cheap-motion className={`${styles.orbit} ${styles.middle}`}><span className={`${styles.moon} ${styles.emerald}`} /></div>
    <div data-cheap-motion className={`${styles.orbit} ${styles.inner}`}><span className={styles.star} /></div>
    <div className={styles.crossing} />
    <div className={styles.sigil}><BrandSigil decorative priority /></div>
  </div>;
}
