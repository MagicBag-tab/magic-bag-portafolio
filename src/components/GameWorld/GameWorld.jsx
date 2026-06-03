import { useState, useRef, useCallback, useEffect } from 'react';
import Cat from '../Cat/Cat';
import ParallaxLayer from '../ParallaxLayer/ParallaxLayer';
import HomeZone from '../zones/HomeZone/HomeZone';
import GameboyZone from '../zones/GameboyZone/GameboyZone';
import CinemaZone from '../zones/CinemaZone/CinemaZone';
import { useWorldCamera } from '../../hooks/useWorldCamera';
import {
  GAMEBOY_X,
  OBJECT_IDS,
  WORLD_WIDTH,
} from '../../constants/game';
import {
  worldBackground,
  starField,
  cloudShadows,
  cloudLayer,
  tileGrassLeft,
  tileGrassTop,
  tileGrassRight,
  tileGroundFill,
  grassPatch1,
  grassPatch2,
  grassPatch3,
  star,
  bgMusic1,
  clickSfx,
} from '../../assets/index';
import styles from './GameWorld.module.css';

const PARALLAX_LAYERS = [
  {
    id: 'background',
    speed: 0,
    imageUrl: worldBackground,
    height: '100%',
    zIndex: 1,
    style: { top: 0, backgroundSize: 'cover', backgroundPosition: 'center' },
  },
  {
    id: 'stars',
    speed: 0.04,
    imageUrl: starField,
    height: '100%',
    zIndex: 2,
    style: {
      top: 0,
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'repeat-x',
      backgroundPosition: 'top',
    },
  },
  {
    id: 'cloud-shadows',
    speed: 0.14,
    imageUrl: cloudShadows,
    height: '62%',
    zIndex: 3,
    style: {
      top: '8%',
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'repeat-x',
      backgroundPosition: 'center',
    },
  },
  {
    id: 'clouds',
    speed: 0.24,
    imageUrl: cloudLayer,
    height: '58%',
    zIndex: 4,
    style: {
      top: '4%',
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'repeat-x',
      backgroundPosition: 'center',
    },
  },
];

const GRASS_PATCHES = [
  { img: grassPatch1, x: 420, bottom: '24%', width: 34 },
  { img: grassPatch2, x: 960, bottom: '24.5%', width: 42 },
  { img: grassPatch3, x: 1510, bottom: '24%', width: 34 },
  { img: grassPatch2, x: 2140, bottom: '24.5%', width: 42 },
  { img: grassPatch1, x: 2870, bottom: '24%', width: 34 },
  { img: grassPatch3, x: 3420, bottom: '24%', width: 34 },
  { img: grassPatch2, x: 4170, bottom: '24.5%', width: 42 },
  { img: grassPatch1, x: 4920, bottom: '24%', width: 34 },
  { img: grassPatch3, x: 5580, bottom: '24%', width: 34 },
];

const INTERACTABLES = [
  { id: OBJECT_IDS.GAMEBOY, x: GAMEBOY_X + 300 },
];

const LIFE_STARS = [0, 1, 2, 3, 4];

export default function GameWorld({ onNavigate, soundEnabled, selectedCat }) {
  const [nearObjectId, setNearObjectId] = useState(null);
  const [cameraOffsetX, setCameraOffsetX] = useState(0);

  const { computeCamera } = useWorldCamera();
  const musicRef = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const audio = new Audio(bgMusic1);
    audio.loop = true;
    audio.volume = 0.35;
    musicRef.current = audio;
    window.__gameMusic = audio;

    const startMusic = () => {
      if (!hasStarted.current) {
        hasStarted.current = true;
        audio.play().catch(() => {});
      }
    };

    window.addEventListener('keydown', startMusic, { once: true });
    window.addEventListener('click', startMusic, { once: true });

    return () => {
      audio.pause();
      window.removeEventListener('keydown', startMusic);
      window.removeEventListener('click', startMusic);
      delete window.__gameMusic;
    };
  }, []);

  useEffect(() => {
    const audio = musicRef.current;
    if (!audio) return;
    if (soundEnabled) {
      if (hasStarted.current) audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [soundEnabled]);

  const handleNearObject = useCallback((id) => {
    setNearObjectId(id);
  }, []);

  const handleLeaveObject = useCallback(() => {
    setNearObjectId(null);
  }, []);

  const handlePositionChange = useCallback((catX) => {
    const offset = computeCamera(catX);
    setCameraOffsetX(offset);
  }, [computeCamera]);

  const handleGameboyActivate = useCallback(() => {
    const sfx = new Audio(clickSfx);
    sfx.volume = 0.6;
    sfx.play().catch(() => {});
    onNavigate('about');
  }, [onNavigate]);

  return (
    <div className={styles.world} aria-label="Mundo del portafolio">
      {PARALLAX_LAYERS.map((layer) => (
        <ParallaxLayer
          key={layer.id}
          speed={layer.speed}
          offsetX={cameraOffsetX}
          zIndex={layer.zIndex}
          height={layer.height}
          imageUrl={layer.imageUrl}
          style={layer.style}
        />
      ))}

      <div
        className={styles.groundDecorLayer}
        style={{ transform: `translateX(${-cameraOffsetX}px)` }}
        aria-hidden="true"
      >
        {GRASS_PATCHES.map((patch, index) => (
          <img
            key={`${patch.x}-${index}`}
            src={patch.img}
            alt=""
            className={styles.grassPatch}
            style={{
              left: `${patch.x}px`,
              bottom: patch.bottom,
              width: `${patch.width}px`,
            }}
          />
        ))}
      </div>

      <div
        className={styles.groundLayer}
        style={{
          transform: `translateX(${-cameraOffsetX}px)`,
          '--tile-left': `url(${tileGrassLeft})`,
          '--tile-top': `url(${tileGrassTop})`,
          '--tile-right': `url(${tileGrassRight})`,
          '--tile-fill': `url(${tileGroundFill})`,
          width: `${WORLD_WIDTH}px`,
        }}
        aria-hidden="true"
      >
        <div className={styles.groundTopRow}>
          <span className={styles.groundLeft} />
          <span className={styles.groundCenter} />
          <span className={styles.groundRight} />
        </div>
        <div className={styles.groundFill} />
      </div>

      <div
        className={styles.worldContent}
        style={{ transform: `translateX(${-cameraOffsetX}px)` }}
      >
        <GameboyZone
          isNear={nearObjectId === OBJECT_IDS.GAMEBOY}
          onActivate={handleGameboyActivate}
        />

        <HomeZone />
        <CinemaZone />

        <Cat
          interactables={INTERACTABLES}
          onNearObject={handleNearObject}
          onLeaveObject={handleLeaveObject}
          onPositionChange={handlePositionChange}
          selectedCat={selectedCat}
        />
      </div>

      <div className={styles.lifeStars} aria-label="Vidas">
        {LIFE_STARS.map((life) => (
          <img key={life} src={star} alt="" aria-hidden="true" />
        ))}
      </div>

      <div className={styles.controls} aria-label="Controles del juego">
        <span>Izq / Der Mover</span>
        <span>Espacio Saltar</span>
        <span>Shift Correr</span>
        <span>Clic Entrar</span>
      </div>
    </div>
  );
}
