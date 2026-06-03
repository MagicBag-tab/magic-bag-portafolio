import styles from './Tooltip.module.css';

export default function Tooltip({ label = '¡Entrar!', visible = false }) {
  return (
    <div className={`${styles.tooltip} ${visible ? styles.visible : ''}`}>
      <span className={styles.text}>{label}</span>
      <div className={styles.arrow} />
    </div>
  );
}
