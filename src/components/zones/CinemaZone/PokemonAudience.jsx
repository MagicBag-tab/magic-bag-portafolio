import { POKEMON_AUDIENCE } from '../../../constants/game';
import styles from './PokemonAudience.module.css';

const POKE_SPRITE_URL = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

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

            {isReacting && (
              <div className={styles.exclamation} aria-hidden="true">!</div>
            )}
          </div>
        );
      })}
    </>
  );
}
