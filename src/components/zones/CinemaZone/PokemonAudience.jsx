import { POKEMON_AUDIENCE } from '../../../constants/game';
import styles from './PokemonAudience.module.css';

// ─── URL base de sprites PokeAPI ──────────────────────────────────────────────
const POKE_SPRITE_URL = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

// =========================================
// PokemonAudience — Pokémon sentados mirando la pantalla
// Son decorativos, tienen animación CSS idle
//
// Props:
//   nearProjectId — id del proyecto al que el gato está cerca
//                   El Pokémon guardián de ese proyecto "reacciona"
// =========================================
export default function PokemonAudience({ nearProjectId = null }) {
  return (
    <>
      {POKEMON_AUDIENCE.map((poke) => {
        const isReacting = nearProjectId !== null && poke.projectId === nearProjectId;

        return (
          <div
            key={poke.id}
            className={`${styles.pokemon} ${isReacting ? styles.reacting : ''}`}
            style={{
              left:             `${poke.x}px`,
              animationDelay:   `${poke.delay}ms`,
              '--scale':        poke.scale,
            }}
            aria-hidden="true"
          >
            <img
              src={POKE_SPRITE_URL(poke.pokeId)}
              alt={poke.id}
              className={styles.sprite}
              style={{
                width:  `${48 * poke.scale}px`,
                height: `${48 * poke.scale}px`,
              }}
              loading="lazy"
            />
            {/* Reacción: exclamación cuando el proyecto está activo */}
            {isReacting && (
              <div className={styles.exclamation} aria-hidden="true">!</div>
            )}
          </div>
        );
      })}
    </>
  );
}
