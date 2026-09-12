import Image from 'next/image';
import styles from './OrbitalScene.module.css';

/** Real browser-rendered orbits and moons; the landscape contains none of these. */
export default function OrbitalScene() {
  return <div className={styles.scene} aria-hidden="true">
    <div className={styles.aura} />
    <div className={`${styles.orbit} ${styles.outer}`}><span className={styles.moon} /></div>
    <div className={`${styles.orbit} ${styles.middle}`}><span className={`${styles.moon} ${styles.emerald}`} /></div>
    <div className={`${styles.orbit} ${styles.inner}`}><span className={styles.star} /></div>
    <div className={styles.crossing} />
    <Image src="/saimor-hero-sigil.svg" alt="" width={240} height={240} unoptimized className={styles.sigil} />
  </div>;
}
