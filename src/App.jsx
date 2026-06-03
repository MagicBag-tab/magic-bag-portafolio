import { useState, useCallback } from 'react';
import './styles/globals.css';

import GameWorld            from './components/GameWorld/GameWorld';
import ProjectDetailScreen  from './components/screens/ProjectDetail/ProjectDetailScreen';
import Menu                 from './components/UI/Menu/Menu';
import { projects }         from './data/projects';

// =========================================
// App — estado global y routing del portafolio
//
// Pantallas:
//   'world'         — GameWorld siempre montado
//   'projectDetail' — sala de detalle del proyecto
//   'about'         — pantalla "sobre mí" (se activa desde la Gameboy)
// =========================================
export default function App() {
  const [currentScreen,    setCurrentScreen]    = useState('world');
  const [selectedProject,  setSelectedProject]  = useState(null);
  const [soundEnabled,     setSoundEnabled]      = useState(true);

  // ── Toggle de sonido ────────────────────────────────────────────────────────
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

  // ── Navegación ──────────────────────────────────────────────────────────────
  const handleNavigate = useCallback((screen) => {
    setCurrentScreen(screen);
  }, []);

  // ── Entrar a la sala de un proyecto ─────────────────────────────────────────
  const handleEnterDoor = useCallback((projectId) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setCurrentScreen('projectDetail');
    }
  }, []);

  // ── Navegar entre proyectos dentro de la sala de detalle ────────────────────
  const handleProjectNav = useCallback((direction) => {
    setSelectedProject((prev) => {
      if (!prev) return prev;
      const idx  = projects.findIndex((p) => p.id === prev.id);
      const next = projects[idx + direction];
      return next ?? prev;
    });
  }, []);

  // ── Volver al mundo desde cualquier pantalla ─────────────────────────────────
  const handleBackToWorld = useCallback(() => {
    setCurrentScreen('world');
  }, []);

  return (
    <>
      {/*
        GameWorld siempre montado — preserva la posición del gatito.
        Las pantallas internas van encima con position: fixed.
      */}
      <GameWorld
        onNavigate={handleNavigate}
        onEnterDoor={handleEnterDoor}
        soundEnabled={soundEnabled}
      />

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
      <Menu
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onNavigate={handleNavigate}
        currentScreen={currentScreen}
      />
    </>
  );
}
