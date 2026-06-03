import { useState } from 'react';
import styles from './AboutScreen.module.css';

const SKILLS = [
  { name: 'React',      icon: 'react/react-original' },
  { name: 'JavaScript',icon: 'javascript/javascript-original' },
  { name: 'TypeScript', icon: 'typescript/typescript-original' },
  { name: 'HTML5',      icon: 'html5/html5-original' },
  { name: 'CSS3',       icon: 'css3/css3-original' },
  { name: 'Node.js',    icon: 'nodejs/nodejs-original' },
  { name: 'Python',     icon: 'python/python-original' },
  { name: 'Git',        icon: 'git/git-original' },
  { name: 'Figma',      icon: 'figma/figma-original' },
  { name: 'MongoDB',    icon: 'mongodb/mongodb-original' },
];

const ACHIEVEMENTS = [
  { icon: '🎓', text: 'Ingeniería en Sistemas' },
  { icon: '💻', text: '2+ años de experiencia' },
  { icon: '🚀', text: '10+ proyectos completados' },
  { icon: '🌟', text: 'Top del salón en Algoritmos' },
];

const SOCIAL = [
  { name: 'GitHub',   icon: '🐙', url: 'https://github.com/tu-usuario' },
  { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/in/tu-usuario' },
  { name: 'Email',    icon: '✉️', url: 'mailto:tu@email.com' },
];

const TABS = ['Historia', 'Skills', 'Logros', 'Contacto'];

export default function AboutScreen({ onBack }) {
  const [activeTab, setActiveTab] = useState('Historia');

  return (
    <div className={styles.screen}>

      <div className={styles.decorativeCat} aria-hidden="true">🐱</div>

      <div className={styles.container}>

        <div className={styles.profileHeader}>
          <div className={styles.avatar}>✨</div>
          <div className={styles.profileInfo}>
            <h1 className={styles.name}>Tu Nombre</h1>
            <p className={styles.role}>Desarrolladora · Diseñadora · Soñadora</p>
          </div>
        </div>

        <div className={styles.tabs} role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab}
              id={`about-tab-${tab.toLowerCase()}`}
              role="tab"
              aria-selected={activeTab === tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.tabContent} role="tabpanel">

          {activeTab === 'Historia' && (
            <div className={styles.historyContent}>
              <p>
                Hola 👋 Soy una desarrolladora apasionada por crear experiencias digitales
                mágicas. Me encanta combinar diseño creativo con código limpio para construir
                interfaces que sorprendan a los usuarios.
              </p>
              <p>
                Actualmente estudiando Ingeniería en Sistemas, con experiencia en
                desarrollo web front-end y diseño UI/UX. Siempre buscando aprender nuevas
                tecnologías y llevar mis proyectos al siguiente nivel.
              </p>
              <p>
                Cuando no estoy programando, me encuentras escuchando música lo-fi,
                jugando videojuegos indie o dibujando pixel art 🎨
              </p>
            </div>
          )}

          {activeTab === 'Skills' && (
            <div className={styles.skillsGrid}>
              {SKILLS.map((skill) => (
                <div key={skill.name} className={styles.skillCard}>
                  <img
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}.svg`}
                    alt={skill.name}
                    className={styles.skillIcon}
                    loading="lazy"
                  />
                  <span className={styles.skillName}>{skill.name}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Logros' && (
            <div className={styles.achievementsList}>
              {ACHIEVEMENTS.map((a, i) => (
                <div key={i} className={styles.achievement}>
                  <span className={styles.achievementIcon}>{a.icon}</span>
                  <span className={styles.achievementText}>{a.text}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Contacto' && (
            <div className={styles.contactSection}>
              <p className={styles.contactIntro}>
                ¡Me encantaría conectar contigo! 💌
              </p>
              <div className={styles.socialLinks}>
                {SOCIAL.map((s) => (
                  <a
                    key={s.name}
                    id={`social-${s.name.toLowerCase()}`}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={s.name}
                  >
                    <span>{s.icon}</span>
                    <span>{s.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        id="about-back-btn"
        className={styles.backBtn}
        onClick={onBack}
      >
        ← Volver al mundo
      </button>
    </div>
  );
}
