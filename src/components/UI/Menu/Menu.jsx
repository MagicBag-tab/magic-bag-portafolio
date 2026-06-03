import { useState, useEffect } from 'react';
import styles from './Menu.module.css';
import { projects } from '../../../data/projects';

export default function Menu({ soundEnabled, onToggleSound, onNavigate, currentScreen }) {
  const [isOpen, setIsOpen] = useState(currentScreen === 'about' || currentScreen === 'projects');
  const [activeTab, setActiveTab] = useState(currentScreen === 'projects' ? 'projects' : 'about');

  // Si desde fuera nos piden abrir el menú (ej: clic en la Gameboy cambia currentScreen a 'about')
  useEffect(() => {
    if (currentScreen === 'about') {
      setIsOpen(true);
      setActiveTab('about');
    } else if (currentScreen === 'projects') {
      setIsOpen(true);
      setActiveTab('projects');
    }
  }, [currentScreen]);

  const toggleMenu = () => {
    if (isOpen) {
      setIsOpen(false);
      onNavigate('world'); // Regresa al mundo al cerrar
    } else {
      setIsOpen(true);
      onNavigate(activeTab);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    onNavigate('world');
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    onNavigate(tab);
  };

  return (
    <>
      <button
        id="hamburger-btn"
        className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}
        onClick={toggleMenu}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen}
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={closeMenu} aria-hidden="true">
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()} // Evitar cerrar al hacer clic dentro
            role="dialog"
            aria-label="Menú principal"
          >
            {/* Header del Modal */}
            <div className={styles.header}>
              <div className={styles.tabs}>
                <button
                  className={`${styles.tabBtn} ${activeTab === 'about' ? styles.tabActive : ''}`}
                  onClick={() => switchTab('about')}
                >
                  🐱 Sobre mí
                </button>
                <button
                  className={`${styles.tabBtn} ${activeTab === 'projects' ? styles.tabActive : ''}`}
                  onClick={() => switchTab('projects')}
                >
                  💜 Proyectos
                </button>
              </div>
              
              <button
                className={styles.soundBtn}
                onClick={onToggleSound}
                aria-label={soundEnabled ? 'Silenciar' : 'Activar sonido'}
              >
                {soundEnabled ? '🔊 ON' : '🔇 OFF'}
              </button>
            </div>

            {/* Cuerpo del Modal */}
            <div className={styles.content}>
              {activeTab === 'about' && <AboutContent />}
              {activeTab === 'projects' && <ProjectsContent />}
            </div>
            
            <button className={styles.closeBtn} onClick={closeMenu}>Cerrar ✖</button>
          </div>
        </div>
      )}
    </>
  );
}

function AboutContent() {
  const technologies = [
    'HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Go', 'Python', 'C++', 'TypeScript',
    'APIs REST', 'Git', 'Android Studio', 'Jetpack Compose', 'CUDA', 'IoT', 'PostgreSQL', 'SQLite', 'Docker'
  ];

  return (
    <div className={styles.scrollArea}>
      <div className={styles.profileHeader}>
        <h1 className={styles.nameTitle}>Sarah Rachel Estrada Bonilla</h1>
        <p className={styles.subtitle}>
          Guatemala · <a href="mailto:sarahestrada33@gmail.com">sarahestrada33@gmail.com</a> · +502 47532799
        </p>
        <div className={styles.socialLinks}>
          <a href="https://github.com/MagicBag-tab" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/sarah-estrada-5347282b2/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>✨ Sobre mí</h2>
        <p className={styles.text}>
          Estudiante de tercer año de Ingeniería en Ciencias de la Computación en la Universidad del Valle de Guatemala, con promedio de 95 puntos y reconocimientos académicos. Me interesa el desarrollo de software y el análisis de datos, especialmente entender cómo los usuarios interactúan con productos digitales y usar esa información para apoyar decisiones estratégicas.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🛠️ Tecnologías</h2>
        <div className={styles.badgesGrid}>
          {technologies.map(tech => (
            <span key={tech} className={styles.badge}>{tech}</span>
          ))}
        </div>
      </section>

      <div className={styles.columns}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🎓 Educación</h2>
          <div className={styles.item}>
            <h3 className={styles.itemTitle}>Universidad del Valle de Guatemala</h3>
            <span className={styles.date}>2024 – actualidad</span>
            <p className={styles.text}>Licenciatura en Ingeniería en Ciencias de la Computación y Tecnologías de la Información</p>
            <p className={styles.textSub}>Promedio anual: 95 puntos · Mención Honorífica · Honor al Mérito Académico</p>
          </div>
          <div className={styles.item}>
            <h3 className={styles.itemTitle}>Colegio Bilingüe El Prado</h3>
            <span className={styles.date}>Graduación: noviembre 2023</span>
            <p className={styles.text}>Bachillerato en Ciencias y Letras con Orientación en Computación</p>
            <p className={styles.textSub}>Promedio de graduación: 96 puntos · Galardón de la Riva por Excelencia Académica</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>💼 Experiencia</h2>
          <div className={styles.item}>
            <h3 className={styles.itemTitle}>Alorica — Practicante</h3>
            <span className={styles.date}>septiembre 2023</span>
            <p className={styles.text}>Práctica profesional en las áreas de Recursos Humanos e IT. Apoyo administrativo, organización de información y soporte técnico básico.</p>
          </div>
          <div className={styles.item}>
            <h3 className={styles.itemTitle}>Vandit Games — Game Jam 2024</h3>
            <p className={styles.text}>Participación en el desarrollo colaborativo de un videojuego en un entorno de trabajo ágil y de tiempo limitado.</p>
          </div>
        </section>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🏆 Reconocimientos y Liderazgo</h2>
        <ul className={styles.list}>
          <li>Honor al Mérito Académico — 2025</li>
          <li>Mención Honorífica — 2024</li>
          <li>Tesorera de la Junta Directiva del Club de Voluntariado — 2026</li>
          <li>Tesorera del Consejo Estudiantil — 2020 a 2022</li>
        </ul>
      </section>
    </div>
  );
}

function ProjectsContent() {
  return (
    <div className={styles.scrollArea}>
      <h2 className={styles.sectionTitle}>🚀 Proyectos Destacados</h2>
      <div className={styles.projectsGrid}>
        {projects.map(project => (
          <div key={project.id} className={styles.projectCard} style={{ '--accent': project.color }}>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectShort}>{project.shortDesc}</p>
            <p className={styles.projectLong}>{project.longDescription}</p>
            
            <div className={styles.techStack}>
              {project.tech.map(t => (
                <span key={t} className={styles.techBadge}>{t}</span>
              ))}
            </div>

            <div className={styles.links}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className={styles.linkBtn}>GitHub ↗</a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer" className={`${styles.linkBtn} ${styles.linkAccent}`}>Demo ↗</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
