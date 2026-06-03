import styles from './ProjectDetailScreen.module.css';

const POKE_SPRITE = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

const POKEMON_IDS = {
  pikachu:   25,
  eevee:     133,
  gengar:    94,
  snorlax:   143,
  bulbasaur: 1,
};

const STARS = Array.from({ length: 30 }, (_, i) => {
  const size = ((i * 7) % 3) + 1;
  return {
    left: `${(i * 37) % 100}%`,
    top: `${(i * 53 + 17) % 100}%`,
    animationDelay: `${((i * 19) % 30) / 10}s`,
    width: `${size}px`,
    height: `${size}px`,
  };
});

export default function ProjectDetailScreen({ project, onBack, onPrevProject, onNextProject, hasPrev, hasNext }) {
  const pokemonId = POKEMON_IDS[project.pokemon] ?? 25;

  return (
    <div className={styles.screen} style={{ '--accent': project.color }}>

      <div className={styles.starsBg} aria-hidden="true">
        {STARS.map((star, i) => (
          <div
            key={i}
            className={styles.star}
            style={star}
          />
        ))}
      </div>

      <div className={styles.header}>
        <button
          id="project-back-btn"
          className={styles.backBtn}
          onClick={onBack}
          aria-label="Volver al mundo"
        >
          ← Volver
        </button>

        <div className={styles.externalLinks}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkBtn}
              id={`project-github-${project.id}`}
            >
              GitHub ↗
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.linkBtn} ${styles.linkBtnAccent}`}
              id={`project-demo-${project.id}`}
            >
              Demo ↗
            </a>
          )}
        </div>
      </div>

      <div className={styles.cinemaFrame}>
        {project.video ? (
          <iframe
            src={project.video}
            title={project.title}
            className={styles.iframe}
            allowFullScreen
          />
        ) : project.screenshot ? (
          <img
            src={project.screenshot}
            alt={`Screenshot de ${project.title}`}
            className={styles.screenshot}
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderEmoji}>🎬</span>
            <p className={styles.placeholderText}>{project.title}</p>
          </div>
        )}

        <div className={styles.cinemaMask} />
      </div>

      <div className={styles.infoSection}>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.description}>{project.longDescription}</p>

        <div className={styles.techStack}>
          {project.tech.map((t) => (
            <span key={t} className={styles.techBadge}>{t}</span>
          ))}
        </div>
      </div>

      <div className={styles.projectNav}>
        {hasPrev ? (
          <button
            className={styles.navBtn}
            onClick={onPrevProject}
            aria-label="Proyecto anterior"
          >
            ← Anterior
          </button>
        ) : <div />}

        {hasNext ? (
          <button
            className={styles.navBtn}
            onClick={onNextProject}
            aria-label="Proyecto siguiente"
          >
            Siguiente →
          </button>
        ) : <div />}
      </div>

      <div className={styles.guardian} aria-hidden="true">
        <img
          src={POKE_SPRITE(pokemonId)}
          alt={project.pokemon}
          className={styles.guardianSprite}
        />
        <div className={styles.guardianLabel}>{project.pokemon}</div>
      </div>
    </div>
  );
}
