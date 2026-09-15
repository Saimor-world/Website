import Image from 'next/image';
import styles from './BrandSigil.module.css';

/** The approved 2026-09-13 master artwork. Placement and size belong to the caller. */
export default function BrandSigil({ decorative = false, priority = false, sizes = '(max-width: 700px) 80px, (max-width: 1000px) 20vw, (max-width: 1383px) 21vw, 280px' }: { decorative?: boolean; priority?: boolean; sizes?: string }) {
  return <span className={styles.frame}>
    <Image src="/brand/saimor-sigil-restored-v1.png" alt={decorative ? '' : 'Saimôr'} width={1254} height={1254} sizes={sizes} quality={95} priority={priority} className={styles.image} />
  </span>;
}
