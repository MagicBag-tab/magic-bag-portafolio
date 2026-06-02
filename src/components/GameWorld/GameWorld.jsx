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
import FallingStar from './FallingStar';
import FloatingBlocks from './FloatingBlocks';
import {
  worldBackground,
  starField,
  cloudShadows,
  cloudLayer,
  purpleBackground,
  denseStars,
  tileGrassLeft,
  tileGrassTop,
  tileGrassRight,
  tileGroundFill,
  grassPatch1,
  grassPatch2,
  grassPatch3,
  flower1,
  flower2,
  flower3,
  star,
  flowerCosmo,
  flowerDaffodil,
  flowerDaisy,
  flowerLavender,
  flowerLily,
  flowerLilyValley,
  flowerOrchid,
  flowerPansy,
  flowerPoppy,
  flowerRose,
  flowerSunflower,
  flowerTulip,
  bgMusic1,
  bgMusic2,
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
    id: 'dense-stars',
    speed: 0.06,
    imageUrl: denseStars,
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
  {
    id: 'purple-background',
    speed: 0.18,
    imageUrl: purpleBackground,
    height: '52%',
    zIndex: 5,
    style: {
      bottom: '24%',
      top: 'auto',
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'repeat-x',
      backgroundPosition: 'bottom',
    },
  },
];

const GRASS_PATCHES = [
  { img: grassPatch1, x: 120, bottom: '24%', width: 34 },
  { img: grassPatch2, x: 360, bottom: '24.5%', width: 42 },
  { img: grassPatch3, x: 620, bottom: '24%', width: 34 },
  { img: grassPatch2, x: 960, bottom: '24.5%', width: 42 },
  { img: grassPatch1, x: 1280, bottom: '24%', width: 34 },
  { img: grassPatch3, x: 1510, bottom: '24%', width: 34 },
  { img: grassPatch2, x: 1840, bottom: '24.5%', width: 42 },
  { img: grassPatch1, x: 2140, bottom: '24%', width: 34 },
  { img: grassPatch3, x: 2460, bottom: '24%', width: 34 },
  { img: grassPatch1, x: 2870, bottom: '24%', width: 34 },
  { img: grassPatch3, x: 3420, bottom: '24%', width: 34 },
  { img: grassPatch2, x: 3920, bottom: '24.5%', width: 42 },
  { img: grassPatch2, x: 4170, bottom: '24.5%', width: 42 },
  { img: grassPatch1, x: 4920, bottom: '24%', width: 34 },
  { img: grassPatch3, x: 5580, bottom: '24%', width: 34 },
];

const FLOWER_PATCHES = [
  { img: flower1, x: 260, bottom: '24%', width: 84 },
  { img: flowerRose, x: 340, bottom: '23.5%', width: 48 },
  { img: flowerCosmo, x: 450, bottom: '23%', width: 64 },
  { img: flowerTulip, x: 610, bottom: '23.8%', width: 50 },
  { img: flowerDaffodil, x: 780, bottom: '24%', width: 70 },
  { img: flowerDaisy, x: 950, bottom: '23.5%', width: 50 },
  { img: flowerSunflower, x: 1040, bottom: '23%', width: 74 },
  { img: flower3, x: 1160, bottom: '24%', width: 78 },
  { img: flowerLavender, x: 1400, bottom: '23%', width: 64 },
  { img: flowerPansy, x: 1600, bottom: '24%', width: 58 },
  { img: flower1, x: 1780, bottom: '24%', width: 92 },
  { img: flowerLily, x: 2000, bottom: '24%', width: 70 },
  { img: flowerLilyValley, x: 2150, bottom: '23.5%', width: 54 },
  { img: flower3, x: 2360, bottom: '24%', width: 74 },
  { img: flowerDaisy, x: 2510, bottom: '24%', width: 52 },
  { img: flowerOrchid, x: 2650, bottom: '23%', width: 68 },
  { img: flowerPansy, x: 2820, bottom: '24%', width: 60 },
  { img: flower2, x: 3040, bottom: '24%', width: 86 },
  { img: flowerTulip, x: 3180, bottom: '23.8%', width: 58 },
  { img: flowerPoppy, x: 3300, bottom: '23.5%', width: 58 },
  { img: flowerRose, x: 3550, bottom: '24%', width: 72 },
  { img: flower1, x: 3740, bottom: '24%', width: 90 },
  { img: flowerLavender, x: 3890, bottom: '23%', width: 62 },
  { img: flowerSunflower, x: 4100, bottom: '23%', width: 80 },
  { img: flowerTulip, x: 4250, bottom: '24%', width: 66 },
  { img: flower3, x: 4380, bottom: '24%', width: 76 },
  { img: flowerLily, x: 4540, bottom: '23.8%', width: 66 },
  { img: flowerCosmo, x: 4700, bottom: '23.5%', width: 60 },
  { img: flowerDaisy, x: 4950, bottom: '24%', width: 50 },
  { img: flower2, x: 5160, bottom: '24%', width: 84 },
  { img: flowerRose, x: 5290, bottom: '23.5%', width: 54 },
  { img: flowerLavender, x: 5400, bottom: '23%', width: 68 },
  { img: flowerSunflower, x: 5610, bottom: '23%', width: 78 },
  { img: flowerOrchid, x: 5800, bottom: '24%', width: 70 },
];

const INTERACTABLES = [
  { id: OBJECT_IDS.GAMEBOY, x: GAMEBOY_X + 300 },
];

const LIFE_STARS = [0, 1, 2, 3, 4];

export default function GameWorld({ soundEnabled, selectedCat, onNavigate }) {
  const [nearObjectId, setNearObjectId] = useState(null);
  const [cameraOffsetX, setCameraOffsetX] = useState(0);

  const { computeCamera } = useWorldCamera();
  const musicRef = useRef(null);
  const trackIndexRef = useRef(0);
  const soundEnabledRef = useRef(soundEnabled);
  const hasStarted = useRef(false);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    const tracks = [bgMusic1, bgMusic2];
    let currentAudio = null;
    let trackIndex = 0;
    let started = false;

    const playTrack = (index) => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = '';
      }
      const audio = new Audio(tracks[index]);
      audio.volume = 0.35;
      audio.addEventListener('ended', () => {
        trackIndex = (trackIndex + 1) % tracks.length;
        if (started && soundEnabledRef.current) playTrack(trackIndex);
      });
      currentAudio = audio;
      musicRef.current = audio;
      window.__gameMusic = audio;
      if (started && soundEnabledRef.current) audio.play().catch(() => {});
    };

    playTrack(trackIndex);

    const startMusic = () => {
      if (!started) {
        started = true;
        hasStarted.current = true;
        if (soundEnabledRef.current) currentAudio?.play().catch(() => {});
      }
    };

    window.addEventListener('keydown', startMusic, { once: true });
    window.addEventListener('click', startMusic, { once: true });

    return () => {
      window.removeEventListener('keydown', startMusic);
      window.removeEventListener('click', startMusic);
      // Keep audio alive (singleton) — don't destroy it
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
    onNavigate?.('projects');
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
        className={styles.floatingBlocksLayer}
        style={{ transform: `translateX(${-cameraOffsetX}px)` }}
        aria-hidden="true"
      >
        <FloatingBlocks />
      </div>

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

        {FLOWER_PATCHES.map((patch, index) => (
          <img
            key={`flower-${patch.x}-${index}`}
            src={patch.img}
            alt=""
            className={styles.flowerPatch}
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
        <FallingStar />
        
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
        <span>Clic Interactuar</span>
      </div>
    </div>
  );
}
