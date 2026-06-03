import { useState } from 'react';
import CinemaScreen from './CinemaScreen';
import PokemonAudience from './PokemonAudience';
import ProjectDoor from './ProjectDoor';
import { projects } from '../../../data/projects';
import {
  CINEMA_SCREEN_X,
  CINEMA_SCREEN_Y,
  CINEMA_SCREEN_W,
  CINEMA_SCREEN_H,
} from '../../../constants/game';
import styles from './CinemaZone.module.css';

// =========================================
// CinemaZone — zona derecha del mundo (x: 3200–6000)
//
// Contiene:
//   - Pantalla de cine gigante (carrusel de proyectos)
//   - Pokémon sentados como audiencia
//   - Puertas clickeables por proyecto
//
// Props:
//   nearObjectId  — id del objeto más cercano al gato ('door_1', 'door_2', etc.)
//   onEnterDoor   — callback(projectId) al clickear una puerta
// =========================================
export default function CinemaZone({ nearObjectId, onEnterDoor }) {
  // Proyecto "activo" según la puerta cercana
  const nearDoorProjectId = nearObjectId?.startsWith('door_')
    ? parseInt(nearObjectId.replace('door_', ''), 10)
    : null;

  return (
    <div className={styles.zone}>

      {/* ── Suelo especial de la zona de cine ── */}
      {/* (el suelo normal ya lo pone el parallax, aquí agregamos detalles) */}

      {/* ── Pantalla de cine ── */}
      <div
        className={styles.cinemaScreenPos}
        style={{
          left: `${CINEMA_SCREEN_X}px`,
          top:  `${CINEMA_SCREEN_Y}px`,
        }}
      >
        <CinemaScreen
          activeProjectId={nearDoorProjectId}
          width={CINEMA_SCREEN_W}
          height={CINEMA_SCREEN_H}
        />
      </div>

      {/* ── Pokémon audiencia ── */}
      <PokemonAudience nearProjectId={nearDoorProjectId} />

      {/* ── Puertas de proyectos ── */}
      {projects.map((project) => (
        <ProjectDoor
          key={project.id}
          project={project}
          isNear={nearObjectId === `door_${project.id}`}
          onClick={onEnterDoor}
        />
      ))}
    </div>
  );
}
