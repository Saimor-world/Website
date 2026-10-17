import styles from './MoraUncertainty.module.css';

/** Slowly moving shadows give the field depth without telling the visitor what to feel. */
export default function MoraUncertainty() {
  return <div className={styles.uncertainty} aria-hidden="true"><div className={styles.rift} /><div className={styles.shadow} /></div>;
}
