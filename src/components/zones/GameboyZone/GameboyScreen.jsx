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
];

export default function GameboyScreen() {
  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <span className={styles.prompt}>TECH</span>
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
          onClick={(e) => e.stopPropagation()}
        >
          GH
        </a>
        <a
          href="https://www.linkedin.com/in/sarah-estrada-5347282b2/"
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
