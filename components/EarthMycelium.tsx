import MoraOrb from './MoraOrb';
import styles from './EarthMycelium.module.css';

/**
 * Fine luminous threads growing from the Earth's underside —
 * the Lichtung's roots, continuing as a network. MÔRA sits at a node.
 * CSS-only motion; paused by the page toggle and prefers-reduced-motion.
 */
export default function EarthMycelium() {
  return (
    <div className={styles.field} data-testid="earth-mycelium">
      <svg className={styles.network} viewBox="0 0 1000 720" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
        <defs>
          <radialGradient id="earthMyceliumHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f4e7ad" stopOpacity="0.55" />
            <stop offset="40%" stopColor="#8fcdb0" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#5a9b70" stopOpacity="0" />
          </radialGradient>
        </defs>

        <path className={styles.filament} d="M70 8C150 92 188 128 248 208S292 348 214 492 148 628 96 718" />
        <path className={styles.filament} d="M210 0C258 96 332 148 372 236S412 392 348 528 318 648 356 720" />
        <path className={styles.filament} d="M498 0C486 108 462 188 498 286S568 412 522 548 468 650 502 720" />
        <path className={styles.filament} d="M792 4C742 98 676 158 632 256S608 408 676 528 758 648 824 720" />
        <path className={styles.filament} d="M938 0C886 86 812 148 748 246S718 392 792 508 878 632 948 720" />
        <path className={styles.filament} d="M40 220C120 250 188 228 248 208M748 246C820 210 900 188 980 170" />

        <path className={styles.hypha} d="M248 208C322 246 412 258 498 286M372 236C438 258 470 274 498 286M632 256C572 272 532 280 498 286" />
        <path className={styles.hypha} d="M498 286C428 352 372 438 348 528M498 286C582 358 648 438 676 528" />
        <path className={styles.hypha} d="M214 492C292 512 392 522 498 548M676 528C598 540 552 546 522 548" />
        <path className={styles.gold} d="M248 208C300 188 360 210 372 236C430 200 520 176 498 286C560 210 640 198 632 256" />
        <path className={styles.gold} d="M498 286C470 360 520 430 522 548" />

        <circle className={styles.halo} cx="248" cy="208" r="28" />
        <circle className={styles.halo} cx="498" cy="286" r="36" />
        <circle className={styles.halo} cx="632" cy="256" r="24" />
        <circle className={styles.halo} cx="348" cy="528" r="26" />
        <circle className={styles.halo} cx="676" cy="528" r="22" />

        <circle className={styles.node} cx="248" cy="208" r="2.4" />
        <circle className={styles.node} cx="372" cy="236" r="2" />
        <circle className={styles.node} cx="498" cy="286" r="2.8" />
        <circle className={styles.node} cx="632" cy="256" r="2.2" />
        <circle className={styles.node} cx="214" cy="492" r="1.8" />
        <circle className={styles.node} cx="348" cy="528" r="2.2" />
        <circle className={styles.node} cx="522" cy="548" r="2" />
        <circle className={styles.node} cx="676" cy="528" r="2.1" />
        <circle className={styles.node} cx="748" cy="246" r="1.7" />
      </svg>
      <span className={styles.mora}>
        <MoraOrb size={48} state="rest" label="MÔRA" />
      </span>
    </div>
  );
}
