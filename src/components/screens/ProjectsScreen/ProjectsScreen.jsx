import { useState } from 'react';
import { projects } from '../../../data/projects';

import { flower1, flower2, flower3, star } from '../../../assets/index';

import styles from './ProjectsScreen.module.css';

const DECORATIVE_FLOWERS = [
  { img: flower1, x: '5%',  y: '20%', size: 80,  rotate: -10, delay: 0    },
  { img: flower2, x: '12%', y: '55%', size: 65,  rotate: 8,   delay: 0.3  },
  { img: flower3, x: '88%', y: '15%', size: 70,  rotate: 12,  delay: 0.6  },
  { img: flower1, x: '82%', y: '60%', size: 75,  rotate: -5,  delay: 0.2  },
  { img: star,    x: '20%', y: '10%', size: 55,  rotate: 20,  delay: 0.9  },
  { img: flower2, x: '72%', y: '80%', size: 60,  rotate: -15, delay: 0.4  },
  { img: star,    x: '90%', y: '45%', size: 50,  rotate: 0,   delay: 0.7  },
  { img: flower3, x: '3%',  y: '80%', size: 65,  rotate: 5,   delay: 1.1  },
];

export default function ProjectsScreen({ onSelectProject, onBack, visitorName }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className={styles.screen}>

      <div className={styles.flowersBg} aria-hidden="true">
        {DECORATIVE_FLOWERS.map((f, i) => (
          <img
            key={i}
            src={f.img}
            alt=""
            className={styles.flowerDeco}
            style={{
              left:              f.x,
              top:               f.y,
              width:             `${f.size}px`,
              transform:         `rotate(${f.rotate}deg)`,
              animationDelay:    `${f.delay}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>✨ Mis Proyectos</h1>
        {visitorName && (
          <p className={styles.subtitle}>Para ti, {visitorName} 🎀</p>
        )}
      </div>

      <div className={styles.nodesContainer}>

        <svg className={styles.connectors} aria-hidden="true">
          {projects.map((project, i) => {
            if (i === 0) return null;
            const prev = projects[i - 1];
            const x1 = (prev.flowerPosition.x / 900) * 100;
            const y1 = (prev.flowerPosition.y / 400) * 100;
            const x2 = (project.flowerPosition.x / 900) * 100;
            const y2 = (project.flowerPosition.y / 400) * 100;
            return (
              <line
                key={`line-${project.id}`}
                x1={`${x1}%`} y1={`${y1}%`}
                x2={`${x2}%`} y2={`${y2}%`}
                stroke="rgba(212, 184, 240, 0.6)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
            );
          })}
        </svg>

        {projects.map((project) => (
          <button
            key={project.id}
            id={`project-node-${project.id}`}
            className={`${styles.node} ${hoveredId === project.id ? styles.nodeHovered : ''}`}
            style={{
              left: `${(project.flowerPosition.x / 900) * 100}%`,
              top:  `${(project.flowerPosition.y / 400) * 100}%`,
            }}
            onClick={() => onSelectProject(project)}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            aria-label={`Ver proyecto ${project.title}`}
          >
            <span className={styles.nodeIcon}>💜</span>
            <span className={styles.nodeTitle}>{project.title}</span>
            <span className={styles.nodeTech}>
              {project.tech.slice(0, 2).join(' · ')}
            </span>
          </button>
        ))}
      </div>

      <button
        id="projects-back-btn"
        className={styles.backBtn}
        onClick={onBack}
        aria-label="Volver al mundo"
      >
        ← Volver
      </button>
    </div>
  );
}
