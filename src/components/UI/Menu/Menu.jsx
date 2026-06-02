import { useState } from 'react';
import styles from './Menu.module.css';
import { projects } from '../../../data/projects';

export default function Menu({ soundEnabled, onToggleSound, onNavigate, currentScreen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(currentScreen === 'projects' ? 'projects' : 'about');

  const routeTab = currentScreen === 'about' || currentScreen === 'projects' ? currentScreen : null;
  const visibleTab = routeTab ?? activeTab;
  const isOpen = menuOpen || Boolean(routeTab);

  const closeMenu = () => {
    setActiveTab(visibleTab);
    setMenuOpen(false);
    onNavigate('world');
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
      return;
    }

    setMenuOpen(true);
    onNavigate(activeTab);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setMenuOpen(true);
    onNavigate(tab);
  };

  return (
    <>
      <button
        id="hamburger-btn"
        className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}
        onClick={toggleMenu}
        aria-label={isOpen ? 'Cerrar menu' : 'Abrir menu'}
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
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-label="Menu principal"
          >
            <div className={styles.header}>
              <div className={styles.tabs}>
                <button
                  className={`${styles.tabBtn} ${visibleTab === 'about' ? styles.tabActive : ''}`}
                  onClick={() => switchTab('about')}
                >
                  Sobre mi
                </button>
                <button
                  className={`${styles.tabBtn} ${visibleTab === 'projects' ? styles.tabActive : ''}`}
                  onClick={() => switchTab('projects')}
                >
                  Proyectos
                </button>
              </div>

              <button
                className={styles.soundBtn}
                onClick={onToggleSound}
                aria-label={soundEnabled ? 'Silenciar' : 'Activar sonido'}
              >
                {soundEnabled ? 'Audio ON' : 'Audio OFF'}
              </button>
            </div>

            <div className={styles.content}>
              {visibleTab === 'about' && <AboutContent />}
              {visibleTab === 'projects' && <ProjectsContent />}
            </div>

            <button className={styles.closeBtn} onClick={closeMenu}>Cerrar</button>
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
          Guatemala - <a href="mailto:sarahestrada33@gmail.com">sarahestrada33@gmail.com</a>
        </p>
        <div className={styles.socialLinks}>
          <a href="https://github.com/MagicBag-tab" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/sarah-estrada-5347282b2/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Sobre mi</h2>
        <p className={styles.text}>
          Estudiante de tercer ano de Ingenieria en Ciencias de la Computacion en la Universidad del Valle de Guatemala, con promedio de 95 puntos y reconocimientos academicos. Me interesa el desarrollo de software y el analisis de datos, especialmente entender como los usuarios interactuan con productos digitales y usar esa informacion para apoyar decisiones estrategicas.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Tecnologias</h2>
        <div className={styles.badgesGrid}>
          {technologies.map((tech) => (
            <span key={tech} className={styles.badge}>{tech}</span>
          ))}
        </div>
      </section>

      <div className={styles.columns}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Educacion</h2>
          <div className={styles.item}>
            <h3 className={styles.itemTitle}>Universidad del Valle de Guatemala</h3>
            <span className={styles.date}>2024 - actualidad</span>
            <p className={styles.text}>Licenciatura en Ingenieria en Ciencias de la Computacion y Tecnologias de la Informacion</p>
            <p className={styles.textSub}>Promedio anual: 95 puntos - Mencion Honorifica - Honor al Merito Academico</p>
          </div>
          <div className={styles.item}>
            <h3 className={styles.itemTitle}>Colegio Bilingue El Prado</h3>
            <span className={styles.date}>Graduacion: noviembre 2023</span>
            <p className={styles.text}>Bachillerato en Ciencias y Letras con Orientacion en Computacion</p>
            <p className={styles.textSub}>Promedio de graduacion: 96 puntos - Galardon de la Riva por Excelencia Academica</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experiencia</h2>
          <div className={styles.item}>
            <h3 className={styles.itemTitle}>Alorica - Practicante</h3>
            <span className={styles.date}>septiembre 2023</span>
            <p className={styles.text}>Practica profesional en las areas de Recursos Humanos e IT. Apoyo administrativo, organizacion de informacion y soporte tecnico basico.</p>
          </div>
          <div className={styles.item}>
            <h3 className={styles.itemTitle}>Vandit Games - Game Jam 2024</h3>
            <p className={styles.text}>Participacion en el desarrollo colaborativo de un videojuego en un entorno de trabajo agil y de tiempo limitado.</p>
          </div>
        </section>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Reconocimientos y liderazgo</h2>
        <ul className={styles.list}>
          <li>Honor al Merito Academico - 2025</li>
          <li>Mencion Honorifica - 2024</li>
          <li>Tesorera de la Junta Directiva del Club de Voluntariado - 2026</li>
          <li>Tesorera del Consejo Estudiantil - 2020 a 2022</li>
        </ul>
      </section>
    </div>
  );
}

function ProjectsContent() {
  return (
    <div className={styles.scrollArea}>
      <h2 className={styles.sectionTitle}>Proyectos destacados</h2>
      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectCard} style={{ '--accent': project.color }}>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectShort}>{project.shortDesc}</p>
            <p className={styles.projectLong}>{project.longDescription}</p>

            <div className={styles.techStack}>
              {project.tech.map((tech) => (
                <span key={tech} className={styles.techBadge}>{tech}</span>
              ))}
            </div>

            <div className={styles.links}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className={styles.linkBtn}>GitHub</a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer" className={`${styles.linkBtn} ${styles.linkAccent}`}>Demo</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
