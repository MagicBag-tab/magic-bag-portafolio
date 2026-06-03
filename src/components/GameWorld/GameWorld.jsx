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
  getFloorY,
} from '../../constants/game';
import { projects } from '../../data/projects';

// ─── Assets ───────────────────────────────────────────────────────────────────
import {
  skyBg,
  cloudsFar,
  cloudsNear1,
  cloudsNear2,
  mountainsBg,
  groundBg,
  groundFlowers,
  cloudA1, cloudB1,
  cloudA2, cloudB2,
  bgMusic1,
  clickSfx,
} from '../../assets/index';

import styles from './GameWorld.module.css';

// ─── Capas de parallax ────────────────────────────────────────────────────────
// Nota sobre el gap: las capas de nubes y montañas se superponen verticalmente
// usando altura mayor y ajuste de backgroundPosition para evitar huecos.
const PARALLAX_LAYERS = [
  {
    id: 'sky',
    speed: 0.0,
    imageUrl: skyBg,
    height: '100%',
    zIndex: 1,
    style: { top: 0, backgroundSize: 'cover', backgroundPosition: 'center' },
  },
  {
    id: 'clouds-far',
    speed: 0.10,
    imageUrl: cloudsFar,
    height: '70%',        // más alto para cubrir sin gap
    zIndex: 2,
    style: { top: '-5%', backgroundSize: 'auto 100%', backgroundRepeat: 'repeat-x' },
  },
  {
    id: 'clouds-near-1',
    speed: 0.22,
    imageUrl: cloudsNear1,
    height: '55%',
    zIndex: 3,
    style: { top: '0%', backgroundSize: 'auto 100%', backgroundRepeat: 'repeat-x' },
  },
  {
    id: 'clouds-near-2',
    speed: 0.30,
    imageUrl: cloudsNear2,
    height: '55%',
    zIndex: 4,
    style: { top: '5%', backgroundSize: 'auto 100%', backgroundRepeat: 'repeat-x' },
  },
  {
    id: 'mountains',
    speed: 0.45,
    imageUrl: mountainsBg,
    height: '70%',        // más alto para llegar hasta el suelo
    zIndex: 5,
    style: {
      bottom: 0,
      top: 'auto',
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'repeat-x',
      backgroundPosition: 'bottom center',
    },
  },
  {
    id: 'ground-flowers',
    speed: 0.85,
    imageUrl: groundFlowers,
    height: '22%',        // flores del suelo, más altas para solapar el suelo
    zIndex: 6,
    style: {
      bottom: '12%',
      top: 'auto',
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'repeat-x',
      backgroundPosition: 'bottom',
    },
  },
  {
    id: 'ground',
    speed: 1.0,
    imageUrl: groundBg,
    height: '16%',
    zIndex: 7,
    style: {
      bottom: 0,
      top: 'auto',
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'repeat-x',
      backgroundPosition: 'bottom',
    },
  },
];

// ─── Nubes pixel art flotantes ─────────────────────────────────────────────────
const PIXEL_CLOUDS = [
  { id: 'pc1', x: 400,  y: 60,  imgA: cloudA1, imgB: cloudB1, scale: 2.4, delay: 0    },
  { id: 'pc2', x: 1100, y: 45,  imgA: cloudA2, imgB: cloudB2, scale: 2.0, delay: 1200 },
  { id: 'pc3', x: 2000, y: 70,  imgA: cloudA1, imgB: cloudB1, scale: 2.6, delay: 600  },
  { id: 'pc4', x: 2900, y: 50,  imgA: cloudA2, imgB: cloudB2, scale: 2.1, delay: 1800 },
  { id: 'pc5', x: 3900, y: 65,  imgA: cloudA1, imgB: cloudB1, scale: 1.9, delay: 400  },
  { id: 'pc6', x: 4800, y: 55,  imgA: cloudA2, imgB: cloudB2, scale: 2.2, delay: 1000 },
];

// ─── Lista de interactables para el gato ──────────────────────────────────────
// Incluye la Gameboy y todas las puertas de proyectos
const buildInteractables = () => {
  const list = [
    { id: OBJECT_IDS.GAMEBOY, x: GAMEBOY_X + 130 }, // centro de la Gameboy
  ];
  projects.forEach((p) => {
    list.push({ id: `${OBJECT_IDS.DOOR_BASE}${p.id}`, x: p.doorX + 45 });
  });
  return list;
};

const INTERACTABLES = buildInteractables();

// =========================================
// GameWorld — mundo 2D con 3 zonas y parallax
// =========================================
export default function GameWorld({ onNavigate, onEnterDoor, soundEnabled }) {
  const [nearObjectId, setNearObjectId]   = useState(null);
  const [cameraOffsetX, setCameraOffsetX] = useState(0);
  const [cloudVariant, setCloudVariant]   = useState(false);

  const { computeCamera }  = useWorldCamera();
  const musicRef           = useRef(null);
  const hasStarted         = useRef(false);

  // ── Música de fondo ───────────────────────────────────────────────────────────
  useEffect(() => {
    const audio = new Audio(bgMusic1);
    audio.loop   = true;
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
    window.addEventListener('click',   startMusic, { once: true });

    return () => {
      audio.pause();
      window.removeEventListener('keydown', startMusic);
      window.removeEventListener('click',   startMusic);
      delete window.__gameMusic;
    };
  }, []);

  // Responder a cambios del toggle de sonido
  useEffect(() => {
    const audio = musicRef.current;
    if (!audio) return;
    if (soundEnabled) {
      if (hasStarted.current) audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [soundEnabled]);

  // ── Alternancia de nubes pixel art (A↔B) cada 1.5s ────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setCloudVariant((v) => !v), 1500);
    return () => clearInterval(id);
  }, []);

  // ── Callbacks del gato ────────────────────────────────────────────────────────
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

  // ── Click en la Gameboy ────────────────────────────────────────────────────────
  const handleGameboyActivate = useCallback(() => {
    const sfx = new Audio(clickSfx);
    sfx.volume = 0.6;
    sfx.play().catch(() => {});
    onNavigate('about');
  }, [onNavigate]);

  // ── Click en una puerta de proyecto ───────────────────────────────────────────
  const handleEnterDoor = useCallback((projectId) => {
    const sfx = new Audio(clickSfx);
    sfx.volume = 0.6;
    sfx.play().catch(() => {});
    onEnterDoor?.(projectId);
  }, [onEnterDoor]);

  return (
    <div className={styles.world} aria-label="Mundo del portafolio">

      {/* ── Capas de parallax (fijas al viewport) ── */}
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

      {/* ── Nubes pixel art flotantes (entre capas) ── */}
      {PIXEL_CLOUDS.map((cloud) => {
        const img        = cloudVariant ? cloud.imgB : cloud.imgA;
        const parallaxX  = -(cameraOffsetX * 0.25);
        return (
          <img
            key={cloud.id}
            src={img}
            alt=""
            aria-hidden="true"
            className={styles.pixelCloud}
            style={{
              left:           `${cloud.x + parallaxX}px`,
              top:            `${cloud.y}px`,
              width:          `${128 * cloud.scale}px`,
              animationDelay: `${cloud.delay}ms`,
            }}
          />
        );
      })}

      {/* ── Contenido del mundo (translateX de cámara) ── */}
      <div
        className={styles.worldContent}
        style={{ transform: `translateX(${-cameraOffsetX}px)` }}
      >
        {/* Zona izquierda — Gameboy */}
        <GameboyZone
          isNear={nearObjectId === OBJECT_IDS.GAMEBOY}
          onActivate={handleGameboyActivate}
        />

        {/* Zona central — cartel y flores */}
        <HomeZone />

        {/* Zona derecha — cine Pokémon */}
        <CinemaZone
          nearObjectId={nearObjectId}
          onEnterDoor={handleEnterDoor}
        />

        {/* Gatito */}
        <Cat
          interactables={INTERACTABLES}
          onNearObject={handleNearObject}
          onLeaveObject={handleLeaveObject}
          onPositionChange={handlePositionChange}
        />
      </div>

      {/* ── HUD de controles ── */}
      <div className={styles.controls} aria-label="Controles del juego">
        <span>← →  Mover</span>
        <span>Espacio  Saltar</span>
        <span>Shift  Correr</span>
        <span>Clic  Entrar</span>
      </div>
    </div>
  );
}
