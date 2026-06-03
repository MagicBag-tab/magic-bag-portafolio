import { useState, useCallback } from 'react';
import './styles/globals.css';

import GameWorld            from './components/GameWorld/GameWorld';
import ProjectDetailScreen  from './components/screens/ProjectDetail/ProjectDetailScreen';
import CatSelectScreen      from './components/screens/CatSelectScreen/CatSelectScreen';
import Menu                 from './components/UI/Menu/Menu';
import { projects }         from './data/projects';

// =========================================
// App — estado global y routing del portafolio
//
// Pantallas:
//   'catSelect'     — selección de personaje
//   'world'         — GameWorld siempre montado
//   'projectDetail' — sala de detalle del proyecto
//   'about'         — pantalla "sobre mí" (se activa desde la Gameboy)
// =========================================
export default function App() {
  const [selectedCat,      setSelectedCat]      = useState(() => localStorage.getItem('selectedCat') || null);
  const [currentScreen,    setCurrentScreen]    = useState(selectedCat ? 'world' : 'catSelect');
  const [selectedProject,  setSelectedProject]  = useState(null);
  const [soundEnabled,     setSoundEnabled]      = useState(true);

  const handleCatSelect = useCallback((catType) => {
    localStorage.setItem('selectedCat', catType);
    setSelectedCat(catType);
    setCurrentScreen('world');
  }, []);

  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      const music = window.__gameMusic;
      if (music) {
        next ? music.play().catch(() => {}) : music.pause();
      }
      return next;
    });
  }, []);

  const handleNavigate = useCallback((screen) => {
    setCurrentScreen(screen);
  }, []);

  const handleProjectNav = useCallback((direction) => {
    setSelectedProject((prev) => {
      if (!prev) return prev;
      const idx  = projects.findIndex((p) => p.id === prev.id);
      const next = projects[idx + direction];
      return next ?? prev;
    });
  }, []);

  const handleBackToWorld = useCallback(() => {
    setCurrentScreen('world');
  }, []);

  return (
    <>
      {currentScreen === 'catSelect' && (
        <CatSelectScreen onSelect={handleCatSelect} />
      )}

      {/*
        GameWorld siempre montado si ya se seleccionó gato — preserva la posición.
      */}
      {currentScreen !== 'catSelect' && (
        <GameWorld
          onNavigate={handleNavigate}
          soundEnabled={soundEnabled}
          selectedCat={selectedCat}
        />
      )}

      {/* ── Sala de detalle del proyecto ── */}
      {currentScreen === 'projectDetail' && selectedProject && (
        <ProjectDetailScreen
          project={selectedProject}
          onBack={handleBackToWorld}
          onPrevProject={() => handleProjectNav(-1)}
          onNextProject={() => handleProjectNav(+1)}
          hasPrev={projects.findIndex((p) => p.id === selectedProject.id) > 0}
          hasNext={projects.findIndex((p) => p.id === selectedProject.id) < projects.length - 1}
        />
      )}

      {/* ── Menú hamburguesa — siempre visible ── */}
      {currentScreen !== 'catSelect' && (
        <Menu
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onNavigate={handleNavigate}
          currentScreen={currentScreen}
        />
      )}
    </>
  );
}
