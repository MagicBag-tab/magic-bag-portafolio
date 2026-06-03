import styles from './HomeZone.module.css';

export default function HomeZone() {
  return (
    <div className={styles.zone}>
      <div
        className={styles.floatingText}
        style={{ left: '2160px' }}
      >
        Magic Bag Portfolio
      </div>
    </div>
  );
}
