import CinemaCarousel from './CinemaCarousel';
import PokemonAudience from './PokemonAudience';
import {
  CINEMA_SCREEN_X,
  CINEMA_SCREEN_Y,
} from '../../../constants/game';
import styles from './CinemaZone.module.css';

// =========================================
// CinemaZone — zona derecha del mundo (x: 3200–6000)
//
// Contiene:
//   - Carrusel de cine y ficha descriptiva
//   - Pokémon sentados como audiencia
// =========================================
export default function CinemaZone() {
  return (
    <div className={styles.zone}>
      {/* ── Carrusel de cine y ficha ── */}
      <div
        className={styles.cinemaScreenPos}
        style={{
          left: `${CINEMA_SCREEN_X}px`,
          top:  `${CINEMA_SCREEN_Y}px`,
        }}
      >
        <CinemaCarousel />
      </div>

      {/* ── Pokémon audiencia ── */}
      <PokemonAudience nearProjectId={null} />
    </div>
  );
}
