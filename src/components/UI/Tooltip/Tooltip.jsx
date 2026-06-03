import styles from './Tooltip.module.css';

// =========================================
// Tooltip — burbuja que aparece sobre objetos cuando el gato está cerca
// Props:
//   label   — texto a mostrar
//   visible — booleano
// =========================================
export default function Tooltip({ label = '¡Entrar!', visible = false }) {
  return (
    <div className={`${styles.tooltip} ${visible ? styles.visible : ''}`}>
      <span className={styles.text}>{label}</span>
      <div className={styles.arrow} />
    </div>
  );
}
