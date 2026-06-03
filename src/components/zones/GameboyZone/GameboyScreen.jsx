// =========================================
// GameboyScreen — pantalla interna de la Gameboy
// Muestra: skills, nombre, links
// Renderizado dentro de la pantalla LCD de la Gameboy CSS
// =========================================

// Skills con íconos Devicon
const SKILLS = [
  { name: 'React',      icon: 'devicon-react-original',        color: '#61dafb' },
  { name: 'JS',         icon: 'devicon-javascript-plain',       color: '#f7df1e' },
  { name: 'CSS',        icon: 'devicon-css3-plain',             color: '#264de4' },
  { name: 'HTML',       icon: 'devicon-html5-plain',            color: '#e34f26' },
  { name: 'Node',       icon: 'devicon-nodejs-plain',           color: '#339933' },
  { name: 'Git',        icon: 'devicon-git-plain',              color: '#f05032' },
  { name: 'Vite',       icon: 'devicon-vitejs-plain',           color: '#646cff' },
  { name: 'Figma',      icon: 'devicon-figma-plain',            color: '#f24e1e' },
];

import styles from './GameboyScreen.module.css';

export default function GameboyScreen() {
  return (
    <div className={styles.screen}>
      {/* Encabezado con avatar */}
      <div className={styles.header}>
        <div className={styles.avatar} aria-label="Avatar">
          <span>✨</span>
        </div>
        <div className={styles.nameBlock}>
          <p className={styles.name}>Sarah</p>
          <p className={styles.role}>Dev ♡</p>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Grid de skills */}
      <p className={styles.sectionLabel}>SKILLS</p>
      <div className={styles.skillsGrid}>
        {SKILLS.map((skill) => (
          <div key={skill.name} className={styles.skill} title={skill.name}>
            <i
              className={`${skill.icon} colored`}
              style={{ fontSize: '14px', color: skill.color }}
            />
          </div>
        ))}
      </div>

      <div className={styles.divider} />

      {/* Links */}
      <div className={styles.links}>
        <a
          href="https://github.com/tu-usuario"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          onClick={(e) => e.stopPropagation()}
        >
          GH
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          onClick={(e) => e.stopPropagation()}
        >
          IN
        </a>
      </div>
    </div>
  );
}
