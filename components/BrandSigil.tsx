import Image from 'next/image';
import styles from './BrandSigil.module.css';

/** The approved 2026-09-13 master artwork. Placement and size belong to the caller. */
export default function BrandSigil({ decorative = false, priority = false }: { decorative?: boolean; priority?: boolean }) {
  return <span className={styles.frame}>
    <Image src="/brand/saimor-sigil-restored-v1.webp" alt={decorative ? '' : 'Saimôr'} width={1024} height={1024} sizes="(max-width: 700px) 96px, 280px" quality={90} priority={priority} className={styles.image} />
  </span>;
}
