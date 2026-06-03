import CinemaCarousel from './CinemaCarousel';
import PokemonAudience from './PokemonAudience';
import {
  CINEMA_SCREEN_X,
  CINEMA_SCREEN_Y,
} from '../../../constants/game';
import styles from './CinemaZone.module.css';

export default function CinemaZone() {
  return (
    <div className={styles.zone}>
      <div
        className={styles.cinemaScreenPos}
        style={{
          left: `${CINEMA_SCREEN_X}px`,
          top: `${CINEMA_SCREEN_Y}px`,
        }}
      >
        <CinemaCarousel />
      </div>

      <PokemonAudience nearProjectId={null} />
    </div>
  );
}
