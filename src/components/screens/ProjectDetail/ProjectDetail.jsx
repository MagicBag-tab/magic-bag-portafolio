import styles from './ProjectDetail.module.css';

export default function ProjectDetail({ project, onBack }) {
  if (!project) return null;

  return (
    <div className={styles.screen}>
      <div className={styles.card}>

        <button
          id="detail-back-btn"
          className={styles.backBtn}
          onClick={onBack}
          aria-label="Volver a proyectos"
        >
          ← Proyectos
        </button>

        <div className={styles.header}>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.description}>{project.description}</p>
        </div>

        <div className={styles.demoArea}>
          {project.video ? (
            <iframe
              className={styles.iframe}
              src={project.video}
              title={`Demo de ${project.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
              allowFullScreen
            />
          ) : project.screenshot ? (
            <img
              className={styles.screenshot}
              src={project.screenshot}
              alt={`Screenshot de ${project.title}`}
            />
          ) : (
            <div className={styles.demoPlaceholder}>
              <span>🖥️</span>
              <p>Demo próximamente</p>
            </div>
          )}
        </div>

        <p className={styles.longDescription}>{project.longDescription}</p>

        <div className={styles.techStack}>
          {project.tech.map((t) => (
            <span key={t} className={styles.techTag}>{t}</span>
          ))}
        </div>

        <div className={styles.links}>
          {project.github && (
            <a
              id={`github-link-${project.id}`}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              🐙 GitHub
            </a>
          )}
          {project.demo && (
            <a
              id={`demo-link-${project.id}`}
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.link} ${styles.linkPrimary}`}
            >
              🚀 Ver demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
