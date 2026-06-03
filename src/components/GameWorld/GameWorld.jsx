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
} from '../../constants/game';
import {
  skyBg,
  mountainsBg,
  groundBg,
  groundFlowers,
  cloudA1,
  cloudB1,
  cloudA2,
  cloudB2,
  flower1,
  flower2,
  flower3,
  star,
  bgMusic1,
  clickSfx,
} from '../../assets/index';
import styles from './GameWorld.module.css';

const PARALLAX_LAYERS = [
  {
    id: 'sky',
    speed: 0,
    imageUrl: skyBg,
    height: '100%',
    zIndex: 1,
    style: { top: 0, backgroundSize: 'cover', backgroundPosition: 'center' },
  },
  {
    id: 'mountains',
    speed: 0.35,
    imageUrl: mountainsBg,
    height: '72%',
    zIndex: 4,
    style: {
      bottom: 0,
      top: 'auto',
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'repeat-x',
      backgroundPosition: 'bottom',
    },
  },
  {
    id: 'ground-flowers',
    speed: 0.78,
    imageUrl: groundFlowers,
    height: '34%',
    zIndex: 7,
    style: {
      bottom: '10%',
      top: 'auto',
      backgroundSize: 'auto 130%',
      backgroundRepeat: 'repeat-x',
      backgroundPosition: 'bottom',
    },
  },
  {
    id: 'ground',
    speed: 1,
    imageUrl: groundBg,
    height: '34%',
    zIndex: 9,
    style: {
      bottom: 0,
      top: 'auto',
      backgroundSize: 'auto 142%',
      backgroundRepeat: 'repeat-x',
      backgroundPosition: 'bottom',
    },
  },
];

const PIXEL_CLOUDS = [
  { id: 'pc1', x: 140, y: 44, imgA: cloudA1, imgB: cloudB1, scale: 2.2, opacity: 0.92, delay: 0 },
  { id: 'pc2', x: 460, y: 116, imgA: cloudA2, imgB: cloudB2, scale: 1.6, opacity: 0.72, delay: 900 },
  { id: 'pc3', x: 820, y: 66, imgA: cloudA1, imgB: cloudB1, scale: 2.8, opacity: 0.88, delay: 400 },
  { id: 'pc4', x: 1180, y: 138, imgA: cloudA2, imgB: cloudB2, scale: 1.9, opacity: 0.68, delay: 1600 },
  { id: 'pc5', x: 1560, y: 38, imgA: cloudA1, imgB: cloudB1, scale: 2.4, opacity: 0.9, delay: 700 },
  { id: 'pc6', x: 1940, y: 104, imgA: cloudA2, imgB: cloudB2, scale: 1.7, opacity: 0.75, delay: 1300 },
  { id: 'pc7', x: 2320, y: 58, imgA: cloudA1, imgB: cloudB1, scale: 3.1, opacity: 0.92, delay: 500 },
  { id: 'pc8', x: 2760, y: 132, imgA: cloudA2, imgB: cloudB2, scale: 1.8, opacity: 0.7, delay: 1800 },
  { id: 'pc9', x: 3160, y: 48, imgA: cloudA1, imgB: cloudB1, scale: 2.7, opacity: 0.88, delay: 1100 },
  { id: 'pc10', x: 3540, y: 100, imgA: cloudA2, imgB: cloudB2, scale: 2, opacity: 0.76, delay: 600 },
  { id: 'pc11', x: 3920, y: 62, imgA: cloudA1, imgB: cloudB1, scale: 2.4, opacity: 0.86, delay: 1500 },
  { id: 'pc12', x: 4280, y: 142, imgA: cloudA2, imgB: cloudB2, scale: 1.7, opacity: 0.7, delay: 300 },
  { id: 'pc13', x: 4660, y: 48, imgA: cloudA1, imgB: cloudB1, scale: 3, opacity: 0.9, delay: 1000 },
  { id: 'pc14', x: 5060, y: 118, imgA: cloudA2, imgB: cloudB2, scale: 1.9, opacity: 0.74, delay: 1700 },
  { id: 'pc15', x: 5440, y: 58, imgA: cloudA1, imgB: cloudB1, scale: 2.5, opacity: 0.88, delay: 800 },
  { id: 'pc16', x: 5780, y: 132, imgA: cloudA2, imgB: cloudB2, scale: 1.6, opacity: 0.68, delay: 1200 },
];

const WORLD_FLOWERS = [
  { img: flower1, x: 1780, size: 122, rotate: -8 },
  { img: flower3, x: 1990, size: 104, rotate: 12 },
  { img: flower2, x: 2240, size: 116, rotate: -5 },
  { img: flower1, x: 2520, size: 130, rotate: 10 },
  { img: flower3, x: 2820, size: 118, rotate: -12 },
  { img: flower2, x: 3090, size: 108, rotate: 6 },
  { img: flower1, x: 3340, size: 136, rotate: -10 },
  { img: flower3, x: 4080, size: 112, rotate: 8 },
  { img: flower2, x: 4680, size: 120, rotate: -6 },
];

const INTERACTABLES = [
  { id: OBJECT_IDS.GAMEBOY, x: GAMEBOY_X + 215 },
];

const LIFE_STARS = [0, 1, 2, 3, 4];

export default function GameWorld({ onNavigate, soundEnabled, selectedCat }) {
  const [nearObjectId, setNearObjectId] = useState(null);
  const [cameraOffsetX, setCameraOffsetX] = useState(0);
  const [cloudVariant, setCloudVariant] = useState(false);

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

  useEffect(() => {
    const id = setInterval(() => setCloudVariant((v) => !v), 1500);
    return () => clearInterval(id);
  }, []);

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

      {PIXEL_CLOUDS.map((cloud) => {
        const img = cloudVariant ? cloud.imgB : cloud.imgA;
        const parallaxX = -(cameraOffsetX * 0.2);
        return (
          <img
            key={cloud.id}
            src={img}
            alt=""
            aria-hidden="true"
            className={styles.pixelCloud}
            style={{
              left: `${cloud.x + parallaxX}px`,
              top: `${cloud.y}px`,
              width: `${108 * cloud.scale}px`,
              opacity: cloud.opacity,
              animationDelay: `${cloud.delay}ms`,
            }}
          />
        );
      })}

      <div
        className={styles.flowerDecorLayer}
        style={{ transform: `translateX(${-cameraOffsetX}px)` }}
        aria-hidden="true"
      >
        {WORLD_FLOWERS.map((flower, index) => (
          <img
            key={`${flower.x}-${index}`}
            src={flower.img}
            alt=""
            className={styles.groundFlower}
            style={{
              left: `${flower.x}px`,
              width: `${flower.size}px`,
              transform: `rotate(${flower.rotate}deg)`,
            }}
          />
        ))}
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
