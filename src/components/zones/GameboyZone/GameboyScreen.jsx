import { useState } from 'react';
import styles from './GameboyScreen.module.css';

const SKILLS = [
  'React',
  'JavaScript',
  'CSS',
  'HTML',
  'Node',
  'Git',
  'Vite',
  'Figma',
  'Docker',
  'Go',
  'Python',
  'Vue',
  'C++',
];

export default function GameboyScreen() {
  const [activeTab, setActiveTab] = useState('tech');

  const handleTabClick = (event, tab) => {
    event.stopPropagation();
    setActiveTab(tab);
  };

  return (
    <div className={styles.screen}>
      <div className={styles.tabs} aria-label="Secciones de la computadora">
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'tech' ? styles.tabActive : ''}`}
          onClick={(event) => handleTabClick(event, 'tech')}
        >
          TECH
        </button>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'about' ? styles.tabActive : ''}`}
          onClick={(event) => handleTabClick(event, 'about')}
        >
          SOBRE MI
        </button>
      </div>

      {activeTab === 'tech' ? <TechPanel /> : <AboutPanel />}
    </div>
  );
}

function TechPanel() {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.prompt}>STACK</span>
        <span className={styles.cursor} />
      </div>

      <div className={styles.grid}>
        {SKILLS.map((skill) => (
          <span key={skill} className={styles.skill}>
            {skill}
          </span>
        ))}
      </div>

      <div className={styles.footer}>
        <a
          href="https://github.com/MagicBag-tab"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          onClick={(event) => event.stopPropagation()}
        >
          GH
        </a>
        <a
          href="https://www.linkedin.com/in/sarah-estrada-5347282b2/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          onClick={(event) => event.stopPropagation()}
        >
          IN
        </a>
      </div>
    </div>
  );
}

function AboutPanel() {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.prompt}>SARAH</span>
        <span className={styles.cursor} />
      </div>

      <div className={styles.about}>
        <p>
          Estudiante de Ciencias de la Computacion en UVG.
        </p>
        <p>
          Me gusta crear productos digitales con datos, software y mucho detalle visual.
        </p>
        <p>
          Guatemala - promedio 95 - desarrollo web, IoT y APIs.
        </p>
      </div>
    </div>
  );
}
