import GameboyScreen from './GameboyScreen';
import Tooltip from '../../UI/Tooltip/Tooltip';
import {
  GAMEBOY_X,
  GAMEBOY_WIDTH,
  GAMEBOY_HEIGHT,
  GAMEBOY_SCREEN_W,
  GAMEBOY_SCREEN_H,
  CLIFF_EDGE_X,
} from '../../../constants/game';

import styles from './GameboyZone.module.css';

export default function GameboyZone({ isNear = false, onActivate }) {
  return (
    <div className={styles.zone}>

      <div
        className={styles.voidBg}
        style={{ width: `${CLIFF_EDGE_X}px` }}
      />

      <div
        className={styles.cliffEdge}
        style={{ left: `${CLIFF_EDGE_X}px` }}
      />

      <div
        className={styles.gameboyWrapper}
        style={{
          left:   `${GAMEBOY_X}px`,
          top:    `18%`,
          width:  `${GAMEBOY_WIDTH}px`,
          height: `${GAMEBOY_HEIGHT}px`,
        }}
        onClick={onActivate}
        role="button"
        tabIndex={0}
        aria-label="Gameboy — ver sobre mí"
        onKeyDown={(e) => e.key === 'Enter' && onActivate?.()}
      >

        <Tooltip label="¡Sobre mí!" visible={isNear} />

        <div className={styles.gameboyBody}>

          <div className={styles.gameboyLogo}>
            <span className={styles.logoLine}>◆</span>
            <span className={styles.logoText}>Game Boy</span>
          </div>

          <div className={styles.screenOuter}>
            <div className={styles.screenInner}>

              <div className={styles.dotMatrix}>
                <span>DOT MATRIX WITH STEREO SOUND</span>
              </div>

              <div
                className={styles.lcdScreen}
                style={{
                  width:  `${GAMEBOY_SCREEN_W}px`,
                  height: `${GAMEBOY_SCREEN_H}px`,
                }}
              >
                <GameboyScreen />
              </div>
            </div>
          </div>

          <div className={styles.controlsRow}>

            <div className={styles.dpad}>
              <div className={`${styles.dpadBtn} ${styles.dpadUp}`}   />
              <div className={`${styles.dpadBtn} ${styles.dpadDown}`} />
              <div className={`${styles.dpadBtn} ${styles.dpadLeft}`} />
              <div className={`${styles.dpadBtn} ${styles.dpadRight}`}/>
              <div className={styles.dpadCenter} />
            </div>

            <div className={styles.startSelect}>
              <div className={styles.selectBtn}>
                <span>SELECT</span>
              </div>
              <div className={styles.startBtn}>
                <span>START</span>
              </div>
            </div>

            <div className={styles.abButtons}>
              <div className={`${styles.abBtn} ${styles.btnB}`}>B</div>
              <div className={`${styles.abBtn} ${styles.btnA}`}>A</div>
            </div>
          </div>

          <div className={styles.speaker}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={styles.speakerDot} />
            ))}
          </div>

        </div>

        <div className={`${styles.glow} ${isNear ? styles.glowActive : ''}`} />
      </div>

      <div className={styles.voidClouds} aria-hidden="true">
        <div className={`${styles.voidCloud} ${styles.vc1}`} />
        <div className={`${styles.voidCloud} ${styles.vc2}`} />
        <div className={`${styles.voidCloud} ${styles.vc3}`} />
      </div>
    </div>
  );
}
