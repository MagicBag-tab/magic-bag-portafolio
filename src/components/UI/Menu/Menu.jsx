import { useState } from 'react';
import styles from './Menu.module.css';

export default function Menu({ soundEnabled, onToggleSound, onNavigate, currentScreen }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu  = () => setIsOpen(false);

  const handleNavigate = (screen) => {
    onNavigate(screen);
    closeMenu();
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
        <div
          className={styles.overlay}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <nav
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
        aria-label="Menú de navegación"
      >

        <p className={styles.panelTitle}>✨ Menú</p>

        <ul className={styles.navList}>
          <li>
            <button
              id="menu-world-btn"
              className={`${styles.navItem} ${currentScreen === 'world' ? styles.navItemActive : ''}`}
              onClick={() => handleNavigate('world')}
            >
              🌍 Mundo
            </button>
          </li>
          <li>
            <button
              id="menu-about-btn"
              className={`${styles.navItem} ${currentScreen === 'about' ? styles.navItemActive : ''}`}
              onClick={() => handleNavigate('about')}
            >
              🐱 Sobre mí
            </button>
          </li>
          <li>
            <button
              id="menu-projects-btn"
              className={`${styles.navItem} ${currentScreen === 'projects' ? styles.navItemActive : ''}`}
              onClick={() => handleNavigate('projects')}
            >
              💜 Proyectos
            </button>
          </li>
        </ul>

        <div className={styles.divider} />

        <button
          id="sound-toggle-btn"
          className={styles.soundToggle}
          onClick={onToggleSound}
          aria-label={soundEnabled ? 'Silenciar' : 'Activar sonido'}
        >
          <span className={styles.soundIcon}>
            {soundEnabled ? '🔊' : '🔇'}
          </span>
          <span className={styles.soundLabel}>
            {soundEnabled ? 'Sonido ON' : 'Sonido OFF'}
          </span>
        </button>
      </nav>
    </>
  );
}
