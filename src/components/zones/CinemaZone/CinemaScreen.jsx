import { useState, useEffect } from 'react';
import { projects } from '../../../data/projects';
import { CINEMA_CAROUSEL_MS } from '../../../constants/game';
import styles from './CinemaScreen.module.css';

export default function CinemaScreen({ activeProjectId = null, width = 520, height = 300 }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (activeProjectId) return;

    const interval = setInterval(() => {
      setCurrentIdx((i) => (i + 1) % projects.length);
    }, CINEMA_CAROUSEL_MS);

    return () => clearInterval(interval);
  }, [activeProjectId]);

  const displayIdx = activeProjectId
    ? projects.findIndex((p) => p.id === activeProjectId)
    : currentIdx;

  const project = projects[displayIdx] ?? projects[0];

  return (
    <div className={styles.screenWrapper}>

      <div className={styles.projectorBeam} aria-hidden="true" />

      <div className={styles.frame} style={{ width: `${width}px`, height: `${height}px` }}>

        <div className={styles.content} key={project.id}>

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

      <div className={styles.stand}>
        <div className={styles.standLeg} />
        <div className={styles.standLeg} />
      </div>
    </div>
  );
}
