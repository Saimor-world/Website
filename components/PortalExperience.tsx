import Link from 'next/link';
import styles from './PortalExperience.module.css';

/** The painted doorway is the entrance to the shared MÔRA journey. */
export default function PortalExperience({ locale }: { locale: 'de' | 'en' }) {
  return <div className={styles.root}>
    <div className={styles.forestThreshold}>
      <Link className={styles.door} prefetch={false}
        href={`${locale === 'de' ? '/mora/deep-view' : '/en/mora/deep-view'}?from=portal`}
        aria-label={locale === 'de' ? 'Schwelle betreten' : 'Cross the threshold'} />
    </div>
  </div>;
}
