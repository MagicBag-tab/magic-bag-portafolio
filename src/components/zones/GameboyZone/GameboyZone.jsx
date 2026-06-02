import GameboyScreen from './GameboyScreen';
import Tooltip from '../../UI/Tooltip/Tooltip';
import {
  GAMEBOY_X,
  GAMEBOY_WIDTH,
  GAMEBOY_HEIGHT,
  CLIFF_EDGE_X,
} from '../../../constants/game';
import { computerFrame } from '../../../assets/index';
import styles from './GameboyZone.module.css';

const POKE_SPRITE_URL = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export default function GameboyZone({ isNear = false, onActivate }) {
  return (
    <div className={styles.zone}>
      <div
        className={styles.voidBg}
        style={{ width: `${CLIFF_EDGE_X}px` }}
      />

      <div
        className={styles.gameboyWrapper}
        style={{
          left: `${GAMEBOY_X}px`,
          bottom: '20%',
          width: `${GAMEBOY_WIDTH}px`,
          height: `${GAMEBOY_HEIGHT}px`,
        }}
        onClick={onActivate}
        role="button"
        tabIndex={0}
        aria-label="Ver tecnologias"
        onKeyDown={(e) => e.key === 'Enter' && onActivate?.()}
      >
        <Tooltip label="Tecnologias" visible={isNear} />

        <div className={styles.computerPokemon} aria-hidden="true">
          <img src={POKE_SPRITE_URL(133)} alt="" />
        </div>

        <img
          src={computerFrame}
          alt=""
          aria-hidden="true"
          className={styles.computerFrame}
        />

        <div className={styles.screenSlot}>
          <GameboyScreen />
        </div>
      </div>
    </div>
  );
}
