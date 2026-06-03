import GameboyScreen from './GameboyScreen';
import Tooltip from '../../UI/Tooltip/Tooltip';
import {
  GAMEBOY_X,
  GAMEBOY_WIDTH,
  GAMEBOY_HEIGHT,
  GAMEBOY_SCREEN_W,
  GAMEBOY_SCREEN_H,
  GAMEBOY_SCREEN_OFFSET_X,
  GAMEBOY_SCREEN_OFFSET_Y,
  CLIFF_EDGE_X,
  OBJECT_IDS,
} from '../../../constants/game';

import styles from './GameboyZone.module.css';

// =========================================
// GameboyZone — zona izquierda del mundo (x: 0–1800)
//
// Contiene:
//   - Suelo que termina abruptamente en CLIFF_EDGE_X
//   - Borde del precipicio con efecto de profundidad
//   - Gameboy flotante (CSS puro, estilo DMG-01)
//   - Fondo de vacío (cielo más oscuro)
//
// Props:
//   isNear — booleano: el gatito está cerca de la Gameboy
//   onActivate — callback al clickear la Gameboy
// =========================================
export default function GameboyZone({ isNear = false, onActivate }) {
  return (
    <div className={styles.zone}>

      {/* ── Fondo de "vacío" a la izquierda del precipicio ── */}
      <div
        className={styles.voidBg}
        style={{ width: `${CLIFF_EDGE_X}px` }}
      />

      {/* ── Borde del precipicio ── */}
      <div
        className={styles.cliffEdge}
        style={{ left: `${CLIFF_EDGE_X}px` }}
      />

      {/* ── Gameboy flotante (CSS DMG-01) ── */}
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
        {/* Tooltip */}
        <Tooltip label="¡Sobre mí!" visible={isNear} />

        {/* ── Cuerpo de la Gameboy (CSS) ── */}
        <div className={styles.gameboyBody}>

          {/* Logotipo superior */}
          <div className={styles.gameboyLogo}>
            <span className={styles.logoLine}>◆</span>
            <span className={styles.logoText}>Game Boy</span>
          </div>

          {/* Marco de la pantalla */}
          <div className={styles.screenOuter}>
            <div className={styles.screenInner}>

              {/* Dot matrix label */}
              <div className={styles.dotMatrix}>
                <span>DOT MATRIX WITH STEREO SOUND</span>
              </div>

              {/* Pantalla LCD con el contenido React */}
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

          {/* Controles — fila central */}
          <div className={styles.controlsRow}>
            {/* D-Pad */}
            <div className={styles.dpad}>
              <div className={`${styles.dpadBtn} ${styles.dpadUp}`}   />
              <div className={`${styles.dpadBtn} ${styles.dpadDown}`} />
              <div className={`${styles.dpadBtn} ${styles.dpadLeft}`} />
              <div className={`${styles.dpadBtn} ${styles.dpadRight}`}/>
              <div className={styles.dpadCenter} />
            </div>

            {/* Start / Select */}
            <div className={styles.startSelect}>
              <div className={styles.selectBtn}>
                <span>SELECT</span>
              </div>
              <div className={styles.startBtn}>
                <span>START</span>
              </div>
            </div>

            {/* Botones A / B */}
            <div className={styles.abButtons}>
              <div className={`${styles.abBtn} ${styles.btnB}`}>B</div>
              <div className={`${styles.abBtn} ${styles.btnA}`}>A</div>
            </div>
          </div>

          {/* Altavoces */}
          <div className={styles.speaker}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={styles.speakerDot} />
            ))}
          </div>

        </div>
        {/* Halo de brillo */}
        <div className={`${styles.glow} ${isNear ? styles.glowActive : ''}`} />
      </div>

      {/* ── Nubes decorativas en la zona del vacío ── */}
      <div className={styles.voidClouds} aria-hidden="true">
        <div className={`${styles.voidCloud} ${styles.vc1}`} />
        <div className={`${styles.voidCloud} ${styles.vc2}`} />
        <div className={`${styles.voidCloud} ${styles.vc3}`} />
      </div>
    </div>
  );
}
