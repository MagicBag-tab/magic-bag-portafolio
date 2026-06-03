import Tooltip from '../../UI/Tooltip/Tooltip';
import { DOOR_WIDTH, DOOR_HEIGHT } from '../../../constants/game';
import styles from './ProjectDoor.module.css';

// =========================================
// ProjectDoor — puerta clickeable por proyecto
// Estilo: pixel art con marco decorativo y glow en hover
//
// Props:
//   project  — objeto del proyecto (title, id, color, doorX)
//   isNear   — booleano: el gato está cerca
//   onClick  — callback(projectId)
// =========================================
export default function ProjectDoor({ project, isNear = false, onClick }) {
  return (
    <div
      className={`${styles.doorWrapper} ${isNear ? styles.near : ''}`}
      style={{
        left:    `${project.doorX}px`,
        '--door-color': project.color,
      }}
      onClick={() => onClick?.(project.id)}
      role="button"
      tabIndex={0}
      aria-label={`Entrar al proyecto: ${project.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(project.id)}
    >
      {/* Tooltip */}
      <Tooltip label="¡Entrar!" visible={isNear} />

      {/* Nombre del proyecto (cartelito encima) */}
      <div className={styles.label}>{project.title}</div>

      {/* Marco de la puerta */}
      <div className={styles.doorFrame}>

        {/* Arco superior */}
        <div className={styles.arch} />

        {/* Hoja de la puerta */}
        <div className={styles.door}>
          {/* Vitral / ventanita con preview */}
          <div className={styles.window}>
            <span className={styles.windowIcon}>🎬</span>
          </div>

          {/* Manija */}
          <div className={styles.knob} />

          {/* Línea central de la puerta */}
          <div className={styles.doorLine} />
        </div>

        {/* Peldaños */}
        <div className={styles.step} />
      </div>

      {/* Halo de glow */}
      <div className={styles.glow} />
    </div>
  );
}
