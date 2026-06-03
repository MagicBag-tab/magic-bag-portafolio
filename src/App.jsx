import { useState, useCallback } from 'react';
import './styles/globals.css';

import GameWorld            from './components/GameWorld/GameWorld';
import ProjectDetailScreen  from './components/screens/ProjectDetail/ProjectDetailScreen';
import Menu                 from './components/UI/Menu/Menu';
import { projects }         from './data/projects';

export default function App() {
  const [currentScreen,    setCurrentScreen]    = useState('world');
  const [selectedProject,  setSelectedProject]  = useState(null);
  const [soundEnabled,     setSoundEnabled]      = useState(true);

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

  const handleEnterDoor = useCallback((projectId) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setCurrentScreen('projectDetail');
    }
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

      <GameWorld
        onNavigate={handleNavigate}
        onEnterDoor={handleEnterDoor}
        soundEnabled={soundEnabled}
      />

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

      <Menu
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onNavigate={handleNavigate}
        currentScreen={currentScreen}
      />
    </>
  );
}
