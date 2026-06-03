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

export default function CinemaZone({ nearObjectId, onEnterDoor }) {

  const nearDoorProjectId = nearObjectId?.startsWith('door_')
    ? parseInt(nearObjectId.replace('door_', ''), 10)
    : null;

  return (
    <div className={styles.zone}>

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

      <PokemonAudience nearProjectId={nearDoorProjectId} />

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
