import { useState } from 'react';
import styles from './ClickableObject.module.css';

// =========================================
// ClickableObject — objeto del mundo que activa navegación
// Props:
//   id         — identificador único del objeto
//   x          — posición X en el mundo (px)
//   y          — posición Y en el mundo (px, desde arriba)
//   label      — etiqueta visible (ej: "Mesa", "Portal")
//   icon       — emoji o ícono del objeto
//   isNear     — booleano: el gato está cerca
//   onClick    — callback al hacer clic
//   color      — color de fondo placeholder
// =========================================
export default function ClickableObject({
  id,
  x = 0,
  y = 0,
  label = '',
  icon = '🚪',
  isNear = false,
  onClick,
  color = '#d4b8f0',
}) {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (onClick) onClick(id);
  };

  return (
    <div
      className={`${styles.object} ${isNear ? styles.near : ''} ${hovered ? styles.hovered : ''}`}
      style={{ left: `${x}px`, bottom: `${y}px` }}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`Interactuar con ${label}`}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {/* Indicador "¡Entra!" cuando el gato está cerca */}
      {isNear && (
        <div className={styles.prompt}>
          <span className={styles.promptArrow}>▼</span>
          <span className={styles.promptText}>¡Entra!</span>
        </div>
      )}

      {/* Cuerpo del objeto */}
      <div
        className={styles.body}
        style={{ backgroundColor: color }}
      >
        <span className={styles.icon} role="img" aria-hidden="true">
          {icon}
        </span>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}
