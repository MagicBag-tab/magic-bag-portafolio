import { useState, useRef, useCallback, useEffect } from 'react';
import Cat from '../Cat/Cat';
import ParallaxLayer from '../ParallaxLayer/ParallaxLayer';
import ClickableObject from '../ClickableObject/ClickableObject';
import { OBJECT_IDS, CAMERA_LERP, CAMERA_OFFSET_X } from '../../constants/game';

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

// ─── Configuración de objetos del mundo ──────────────────────────────────────
const WORLD_OBJECTS = [
  {
    id: OBJECT_IDS.CLOUD,
    x: 600,
    bottomOffset: 200,
    label: 'Intro',
    icon: null,         // usamos imagen real en ClickableObject
    color: 'transparent',
    screen: 'intro',
  },
  {
    id: OBJECT_IDS.DESK,
    x: 1400,
    bottomOffset: 30,
    label: 'Proyectos',
    icon: null,
    color: 'transparent',
    screen: 'projects',
  },
  {
    id: OBJECT_IDS.PORTAL,
    x: 2600,
    bottomOffset: 30,
    label: 'Sobre mí',
    icon: null,
    color: 'transparent',
    screen: 'about',
  },
];

// ─── Capas de parallax con imágenes reales ────────────────────────────────────
// Nota: el sky es el fondo fijo, las demás capas se mueven a distinta velocidad
const PARALLAX_LAYERS = [
  {
    id: 'sky',
    speed: 0.0,           // cielo fijo, no se mueve
    imageUrl: skyBg,
    height: '100%',
    zIndex: 1,
    style: { top: 0, backgroundSize: 'cover', backgroundPosition: 'center', minWidth: '100%' },
  },
  {
    id: 'clouds-far',
    speed: 0.12,
    imageUrl: cloudsFar,
    height: '55%',
    zIndex: 2,
    style: { top: 0, backgroundSize: 'auto 100%', backgroundRepeat: 'repeat-x' },
  },
  {
    id: 'clouds-near-1',
    speed: 0.22,
    imageUrl: cloudsNear1,
    height: '45%',
    zIndex: 3,
    style: { top: '5%', backgroundSize: 'auto 100%', backgroundRepeat: 'repeat-x' },
  },
  {
    id: 'clouds-near-2',
    speed: 0.30,
    imageUrl: cloudsNear2,
    height: '40%',
    zIndex: 4,
    style: { top: '10%', backgroundSize: 'auto 100%', backgroundRepeat: 'repeat-x' },
  },
  {
    id: 'mountains',
    speed: 0.45,
    imageUrl: mountainsBg,
    height: '60%',
    zIndex: 5,
    style: { bottom: '12%', top: 'auto', backgroundSize: 'auto 100%', backgroundRepeat: 'repeat-x', backgroundPosition: 'bottom' },
  },
  {
    id: 'ground-flowers',
    speed: 0.85,
    imageUrl: groundFlowers,
    height: '18%',
    zIndex: 6,
    style: { bottom: '12%', top: 'auto', backgroundSize: 'auto 100%', backgroundRepeat: 'repeat-x', backgroundPosition: 'bottom' },
  },
  {
    id: 'ground',
    speed: 1.0,
    imageUrl: groundBg,
    height: '15%',
    zIndex: 7,
    style: { bottom: 0, top: 'auto', backgroundSize: 'auto 100%', backgroundRepeat: 'repeat-x', backgroundPosition: 'bottom' },
  },
];

// ─── Nubes pixel art flotantes en el mundo ────────────────────────────────────
// Cada una alterna entre versión A y B para efecto de parpadeo suave
const PIXEL_CLOUDS = [
  { id: 'pc1', x: 300,  y: 80,  imgA: cloudA1, imgB: cloudB1, scale: 2.5, delay: 0    },
  { id: 'pc2', x: 900,  y: 60,  imgA: cloudA2, imgB: cloudB2, scale: 2.0, delay: 1500 },
  { id: 'pc3', x: 1700, y: 90,  imgA: cloudA1, imgB: cloudB1, scale: 2.8, delay: 800  },
  { id: 'pc4', x: 2400, y: 70,  imgA: cloudA2, imgB: cloudB2, scale: 2.2, delay: 2000 },
  { id: 'pc5', x: 3200, y: 85,  imgA: cloudA1, imgB: cloudB1, scale: 1.8, delay: 500  },
];

// =========================================
// GameWorld — mundo 2D scrolleable con parallax y assets reales
// =========================================
export default function GameWorld({ onNavigate }) {
  const [nearObjectId, setNearObjectId]   = useState(null);
  const [cameraOffsetX, setCameraOffsetX] = useState(0);
  // Alternancia A/B de nubes pixel art
  const [cloudVariant, setCloudVariant]   = useState(false);

  const cameraRef   = useRef(0);
  const musicRef    = useRef(null);
  const hasStarted  = useRef(false); // música inicia con primera interacción

  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1280;
  const targetCameraX = CAMERA_OFFSET_X * viewportWidth;

  // ── Música de fondo ──────────────────────────────────────────────────────────
  useEffect(() => {
    const audio = new Audio(bgMusic1);
    audio.loop   = true;
    audio.volume = 0.35;
    musicRef.current = audio;

    // Iniciar con la primera interacción del usuario (política de autoplay)
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
    };
  }, []);

  // ── Alternancia de nubes pixel art cada 1.5s ─────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      setCloudVariant((v) => !v);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // ── Callbacks del gato ────────────────────────────────────────────────────────
  const handleNearObject = useCallback((objectId) => {
    setNearObjectId(objectId);
  }, []);

  const handleLeaveObject = useCallback(() => {
    setNearObjectId(null);
  }, []);

  const handleCameraUpdate = useCallback((worldX) => {
    const targetOffset = worldX - targetCameraX;
    const current = cameraRef.current;
    const next = current + (targetOffset - current) * CAMERA_LERP;
    cameraRef.current = Math.max(0, next);
    setCameraOffsetX(cameraRef.current);
  }, [targetCameraX]);

  // ── Click en objeto clickeable ────────────────────────────────────────────────
  const handleObjectClick = useCallback((objectId) => {
    // Efecto de sonido al entrar
    const sfx = new Audio(clickSfx);
    sfx.volume = 0.6;
    sfx.play().catch(() => {});

    const obj = WORLD_OBJECTS.find((o) => o.id === objectId);
    if (obj) onNavigate(obj.screen);
  }, [onNavigate]);

  // ── Exposer función para pausar/reanudar música (para el toggle de sonido) ──
  // Se inyecta al window temporalmente para que App.jsx pueda controlarlo
  useEffect(() => {
    window.__gameMusic = musicRef.current;
    return () => { delete window.__gameMusic; };
  }, []);

  return (
    <div className={styles.world} aria-label="Mundo del portafolio">

      {/* ── Capas de parallax ── */}
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

      {/* ── Nubes pixel art flotantes (en parallax intermedio) ── */}
      {PIXEL_CLOUDS.map((cloud) => {
        const img = cloudVariant ? cloud.imgB : cloud.imgA;
        const parallaxX = -(cameraOffsetX * 0.28); // velocidad intermedia
        return (
          <img
            key={cloud.id}
            src={img}
            alt=""
            aria-hidden="true"
            className={styles.pixelCloud}
            style={{
              left: `${cloud.x + parallaxX}px`,
              top:  `${cloud.y}px`,
              width: `${128 * cloud.scale}px`,
              animationDelay: `${cloud.delay}ms`,
            }}
          />
        );
      })}

      {/* ── Contenido del mundo (se mueve con la cámara) ── */}
      <div
        className={styles.worldContent}
        style={{ transform: `translateX(${-cameraOffsetX}px)` }}
      >
        {/* Objetos clickeables */}
        {WORLD_OBJECTS.map((obj) => (
          <ClickableObject
            key={obj.id}
            id={obj.id}
            x={obj.x}
            y={obj.bottomOffset}
            label={obj.label}
            icon={obj.icon}
            color={obj.color}
            isNear={nearObjectId === obj.id}
            onClick={handleObjectClick}
          />
        ))}

        {/* Gatito */}
        <Cat
          objects={WORLD_OBJECTS.map((o) => ({ id: o.id, x: o.x }))}
          onNearObject={handleNearObject}
          onLeaveObject={handleLeaveObject}
          onPositionChange={handleCameraUpdate}
          cameraOffsetX={0}
        />
      </div>

      {/* ── HUD de controles ── */}
      <div className={styles.controls}>
        <span>← → &nbsp;Mover</span>
        <span>Espacio &nbsp;Saltar</span>
        <span>Clic &nbsp;Entrar</span>
      </div>
    </div>
  );
}
