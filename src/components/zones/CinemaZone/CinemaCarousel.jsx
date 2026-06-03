import { useState, useEffect } from 'react';
import { projects } from '../../../data/projects';
import { CINEMA_CAROUSEL_MS } from '../../../constants/game';
import styles from './CinemaCarousel.module.css';

// URL base para sprites de Pokémon
const POKE_SPRITE = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

// Mapa de nombre a ID de PokeAPI (guardián del proyecto)
const POKEMON_IDS = {
  pikachu:   25,
  eevee:     133,
  gengar:    94,
  snorlax:   143,
  bulbasaur: 1,
};

export default function CinemaCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, CINEMA_CAROUSEL_MS);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const project = projects[activeIndex];
  const pokemonId = POKEMON_IDS[project.pokemon] ?? 25;

  return (
    <div className={styles.carouselWrapper}>
      
      {/* ── Haz de luz del proyector ── */}
      <div className={styles.projectorBeam} aria-hidden="true" />

      {/* ── Pantalla Gigante ── */}
      <div className={styles.screenArea}>
        <div className={styles.frame}>
          {project.screenshot ? (
            <img src={project.screenshot} alt={project.title} className={styles.screenshot} />
          ) : (
            <div className={styles.placeholder} style={{ '--accent': project.color }}>
              <span className={styles.placeholderIcon}>🎬</span>
              <span>{project.title}</span>
            </div>
          )}

          {/* Indicadores */}
          <div className={styles.controls}>
            <button className={styles.arrowBtn} onClick={handlePrev}>◄</button>
            <div className={styles.dots}>
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Proyecto ${i + 1}`}
                />
              ))}
            </div>
            <button className={styles.arrowBtn} onClick={handleNext}>►</button>
          </div>
        </div>
        
        {/* Patas de la pantalla */}
        <div className={styles.stand}>
          <div className={styles.standLeg} />
          <div className={styles.standLeg} />
        </div>
      </div>

      {/* ── Ficha del Proyecto ── */}
      <div className={styles.projectCard} key={`card-${project.id}`}>
        <h2 className={styles.cardTitle}>{project.title}</h2>
        <div className={styles.divider} />
        
        <p className={styles.cardDesc}>{project.shortDesc}</p>
        
        <div className={styles.techStack}>
          {project.tech.map((t) => (
            <span key={t} className={styles.badge}>{t}</span>
          ))}
        </div>

        <div className={styles.cardLinks}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
              GitHub ↗
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`${styles.linkBtn} ${styles.linkAccent}`}>
              Demo ↗
            </a>
          )}
        </div>

        {/* Guardián del proyecto reaccionando en la ficha */}
        <div className={styles.guardian}>
          <img src={POKE_SPRITE(pokemonId)} alt={project.pokemon} className={styles.guardianSprite} />
          <div className={styles.guardianLabel}>{project.pokemon}</div>
        </div>
      </div>

    </div>
  );
}
