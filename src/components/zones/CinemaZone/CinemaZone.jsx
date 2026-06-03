import CinemaCarousel from './CinemaCarousel';
import {
  CINEMA_SCREEN_X,
} from '../../../constants/game';
import styles from './CinemaZone.module.css';

export default function CinemaZone() {
  return (
    <div className={styles.zone}>
      <div
        className={styles.cinemaScreenPos}
        style={{
          left: `${CINEMA_SCREEN_X}px`,
        }}
      >
        <CinemaCarousel />
      </div>
    </div>
  );
}
