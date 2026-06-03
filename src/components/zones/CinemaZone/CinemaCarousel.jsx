import { useState, useEffect } from 'react';
import { projects } from '../../../data/projects';
import { CINEMA_CAROUSEL_MS } from '../../../constants/game';
import { cinemaScreenFrame } from '../../../assets/index';
import styles from './CinemaCarousel.module.css';

const POKE_SPRITE = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

const POKEMON_IDS = {
  pikachu: 25,
  eevee: 133,
  gengar: 94,
  snorlax: 143,
  bulbasaur: 1,
};

export default function CinemaCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

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
      <div className={styles.screenArea}>
        <div className={styles.projectorBeam} aria-hidden="true" />

        <div className={styles.tvFrame}>
          <img
            src={cinemaScreenFrame}
            alt=""
            aria-hidden="true"
            className={styles.tvImage}
          />

          <div className={styles.projectViewport}>
            {project.screenshot ? (
              <img src={project.screenshot} alt={project.title} className={styles.screenshot} />
            ) : (
              <div className={styles.placeholder} style={{ '--accent': project.color }}>
                <span className={styles.placeholderIcon}>*</span>
                <span>{project.title}</span>
              </div>
            )}

            <div className={styles.controls}>
              <button className={styles.arrowBtn} onClick={handlePrev} aria-label="Proyecto anterior">
                &lt;
              </button>
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
              <button className={styles.arrowBtn} onClick={handleNext} aria-label="Proyecto siguiente">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

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
              GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`${styles.linkBtn} ${styles.linkAccent}`}>
              Demo
            </a>
          )}
        </div>

        <div className={styles.guardian}>
          <img src={POKE_SPRITE(pokemonId)} alt={project.pokemon} className={styles.guardianSprite} />
          <div className={styles.guardianLabel}>{project.pokemon}</div>
        </div>
      </div>
    </div>
  );
}
