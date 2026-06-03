import Tooltip from '../../UI/Tooltip/Tooltip';
import styles from './ProjectDoor.module.css';

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

      <Tooltip label="¡Entrar!" visible={isNear} />

      <div className={styles.label}>{project.title}</div>

      <div className={styles.doorFrame}>

        <div className={styles.arch} />

        <div className={styles.door}>

          <div className={styles.window}>
            <span className={styles.windowIcon}>🎬</span>
          </div>

          <div className={styles.knob} />

          <div className={styles.doorLine} />
        </div>

        <div className={styles.step} />
      </div>

      <div className={styles.glow} />
    </div>
  );
}
