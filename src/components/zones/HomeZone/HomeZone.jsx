import styles from './HomeZone.module.css';

const SIGNPOST_X = 2200;

export default function HomeZone() {
  return (
    <div className={styles.zone}>
      <div
        className={styles.signpost}
        style={{ left: `${SIGNPOST_X}px` }}
        aria-label="Senal de direccion"
      >
        <div className={styles.pole} />

        <div className={`${styles.sign} ${styles.signLeft}`}>
          <span>Tech</span>
        </div>

        <div className={`${styles.sign} ${styles.signRight}`}>
          <span>Cine</span>
        </div>
      </div>
    </div>
  );
}
