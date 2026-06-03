import { useState, useEffect } from 'react';
import { projects } from '../../../data/projects';
import { CINEMA_CAROUSEL_MS } from '../../../constants/game';
import styles from './CinemaScreen.module.css';

export default function CinemaScreen({ activeProjectId = null, width = 520, height = 300 }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Carrusel automático — se pausa si hay un proyecto activo externo
  useEffect(() => {
    if (activeProjectId) return; // si hay proyecto forzado, no rotamos

    const interval = setInterval(() => {
      setCurrentIdx((i) => (i + 1) % projects.length);
    }, CINEMA_CAROUSEL_MS);

    return () => clearInterval(interval);
  }, [activeProjectId]);

  // Si hay proyecto activo desde el exterior, lo mostramos
  const displayIdx = activeProjectId
    ? projects.findIndex((p) => p.id === activeProjectId)
    : currentIdx;

  const project = projects[displayIdx] ?? projects[0];

  return (
    <div className={styles.screenWrapper}>

      {/* ── Haz de luz del proyector ── */}
      <div className={styles.projectorBeam} aria-hidden="true" />

      {/* ── Marco de la pantalla ── */}
      <div className={styles.frame} style={{ width: `${width}px`, height: `${height}px` }}>

        {/* Contenido de la pantalla */}
        <div className={styles.content} key={project.id}>

          {/* Screenshot o placeholder */}
          {project.screenshot ? (
            <img
              src={project.screenshot}
              alt={project.title}
              className={styles.screenshot}
            />
          ) : (
            <div
              className={styles.screenshotPlaceholder}
              style={{ '--accent': project.color }}
            >
              <span className={styles.placeholderIcon}>🎬</span>
              <span className={styles.placeholderTitle}>{project.title}</span>
            </div>
          )}

          {/* Info del proyecto */}
          <div className={styles.info}>
            <h2 className={styles.title}>{project.title}</h2>
            <p className={styles.desc}>{project.shortDesc}</p>
            <div className={styles.techBadges}>
              {project.tech.slice(0, 4).map((t) => (
                <span key={t} className={styles.badge}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Indicadores de slide */}
        <div className={styles.dots}>
          {projects.map((p, i) => (
            <button
              key={p.id}
              className={`${styles.dot} ${i === displayIdx ? styles.dotActive : ''}`}
              onClick={() => setCurrentIdx(i)}
              aria-label={`Proyecto ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Soporte / patas de la pantalla ── */}
      <div className={styles.stand}>
        <div className={styles.standLeg} />
        <div className={styles.standLeg} />
      </div>
    </div>
  );
}
