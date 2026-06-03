import { projects } from '../../../data/projects';
import styles from './ProjectDetailScreen.module.css';

// URL base para sprites de Pokémon
const POKE_SPRITE = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

// Mapa de nombre a ID de PokeAPI
const POKEMON_IDS = {
  pikachu:   25,
  eevee:     133,
  gengar:    94,
  snorlax:   143,
  bulbasaur: 1,
};

// =========================================
// ProjectDetailScreen — sala de detalle de un proyecto
// Estética: sala de cine interior oscura
//
// Props:
//   project  — objeto del proyecto activo
//   onBack   — callback para volver al mundo
// =========================================
export default function ProjectDetailScreen({ project, onBack, onPrevProject, onNextProject, hasPrev, hasNext }) {
  const pokemonId = POKEMON_IDS[project.pokemon] ?? 25;

  return (
    <div className={styles.screen} style={{ '--accent': project.color }}>

      {/* ── Fondo de estrellas / cielo nocturno ── */}
      <div className={styles.starsBg} aria-hidden="true">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={styles.star}
            style={{
              left:             `${Math.random() * 100}%`,
              top:              `${Math.random() * 100}%`,
              animationDelay:   `${Math.random() * 3}s`,
              width:            `${Math.random() * 3 + 1}px`,
              height:           `${Math.random() * 3 + 1}px`,
            }}
          />
        ))}
      </div>

      {/* ── Header ── */}
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

      {/* ── Pantalla de cine (preview del proyecto) ── */}
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

        {/* Efecto de borde de cine */}
        <div className={styles.cinemaMask} />
      </div>

      {/* ── Info del proyecto ── */}
      <div className={styles.infoSection}>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.description}>{project.longDescription}</p>

        {/* Stack tecnológico */}
        <div className={styles.techStack}>
          {project.tech.map((t) => (
            <span key={t} className={styles.techBadge}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── Navegación anterior / siguiente ── */}
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

      {/* ── Pokémon guardián en la esquina ── */}
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
