import { useState, useCallback } from 'react';
import './styles/globals.css';

// ─── Componentes del mundo ─────────────────────────────────────────────────────
import GameWorld from './components/GameWorld/GameWorld';

// ─── Pantallas ─────────────────────────────────────────────────────────────────
import IntroScreen    from './components/screens/IntroScreen/IntroScreen';
import ProjectsScreen from './components/screens/ProjectsScreen/ProjectsScreen';
import ProjectDetail  from './components/screens/ProjectDetail/ProjectDetail';
import AboutScreen    from './components/screens/AboutScreen/AboutScreen';

// ─── UI global ─────────────────────────────────────────────────────────────────
import Menu from './components/UI/Menu/Menu';

// =========================================
// App — estado global del portafolio
// =========================================
export default function App() {
  const [currentScreen, setCurrentScreen]     = useState('world');
  const [visitorName, setVisitorName]         = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [soundEnabled, setSoundEnabled]       = useState(true);

  // ── Toggle de sonido ─────────────────────────────────────────────────────────
  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      // Controlar la música de fondo del GameWorld
      const music = window.__gameMusic;
      if (music) {
        if (next) {
          music.play().catch(() => {});
        } else {
          music.pause();
        }
      }
      return next;
    });
  }, []);

  // ── Navegación ───────────────────────────────────────────────────────────────
  const navigate = useCallback((screen) => {
    setCurrentScreen(screen);
  }, []);

  const handleIntroComplete = useCallback((name) => {
    setVisitorName(name);
    setCurrentScreen('world');
  }, []);

  const handleSelectProject = useCallback((project) => {
    setSelectedProject(project);
    setCurrentScreen('projectDetail');
  }, []);

  const handleBackFromDetail = useCallback(() => {
    setCurrentScreen('projects');
  }, []);

  const handleBackToWorld = useCallback(() => {
    setCurrentScreen('world');
  }, []);

  return (
    <>
      {/*
        GameWorld SIEMPRE montado — preserva la posición del gatito.
        Las pantallas internas se muestran encima con position: fixed.
      */}
      <GameWorld onNavigate={navigate} soundEnabled={soundEnabled} />

      {/* Pantalla de intro */}
      {currentScreen === 'intro' && (
        <IntroScreen onComplete={handleIntroComplete} />
      )}

      {/* Pantalla de proyectos */}
      {currentScreen === 'projects' && (
        <ProjectsScreen
          onSelectProject={handleSelectProject}
          onBack={handleBackToWorld}
          visitorName={visitorName}
        />
      )}

      {/* Detalle de proyecto */}
      {currentScreen === 'projectDetail' && selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onBack={handleBackFromDetail}
        />
      )}

      {/* Pantalla sobre mí */}
      {currentScreen === 'about' && (
        <AboutScreen onBack={handleBackToWorld} />
      )}

      {/*
        Menú hamburguesa — siempre visible, z-index máximo
      */}
      <Menu
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onNavigate={navigate}
        currentScreen={currentScreen}
      />
    </>
  );
}
