import { useState, useRef, useCallback } from 'react';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useGameLoop } from '../../hooks/useGameLoop';
import { useCatAnimation } from '../../hooks/useCatAnimation';
import {
  GRAVITY,
  JUMP_FORCE,
  WALK_SPEED,
  RUN_SPEED,
  FLOOR_Y,
  WORLD_WIDTH,
  FRAME_SIZE,
  SPRITE_SCALE,
  NEAR_OBJECT_THRESHOLD,
} from '../../constants/game';

// ─── Assets reales ────────────────────────────────────────────────────────────
import { catSprite, jumpSfx } from '../../assets/index';

import styles from './Cat.module.css';

// Posición inicial del gatito en el mundo
const INITIAL_X = 150;

// FLOOR_Y dinámico: el suelo está en bottom 15% del viewport
// El gato de 128px de alto tiene que pararse justo encima
const getFloorY = () => {
  const vh = window.innerHeight;
  const groundTop = vh * 0.85;       // el suelo arranca al 85% del alto
  const catHeight = FRAME_SIZE * SPRITE_SCALE;
  return groundTop - catHeight;      // borde superior del gato al estar en el suelo
};

// =========================================
// Cat — personaje principal con sprite sheet real
// Props:
//   onNearObject(objectId)  — callback al acercarse a un objeto
//   onLeaveObject()         — callback al alejarse de todos
//   onPositionChange(worldX)— callback con posición X actual (para cámara)
//   objects                 — array de { id, x } del mundo
// =========================================
export default function Cat({
  onNearObject,
  onLeaveObject,
  onPositionChange,
  objects = [],
}) {
  // Estado de posición y física
  const floorY      = useRef(getFloorY());
  const posRef      = useRef({ x: INITIAL_X, y: floorY.current });
  const velRef      = useRef({ x: 0, y: 0 });
  const onGroundRef = useRef(true);
  const nearObjRef  = useRef(null);
  const jumpedRef   = useRef(false);

  // Estado React (solo para re-render visual)
  const [renderPos,  setRenderPos]  = useState({ x: INITIAL_X, y: floorY.current });
  const [catState,   setCatState]   = useState('idle');
  const [facingLeft, setFacingLeft] = useState(false);

  // Teclas
  const keys    = useKeyboard();
  const keysRef = useRef(keys);
  keysRef.current = keys;

  // Refs para callbacks estables
  const onNearRef     = useRef(onNearObject);
  const onLeaveRef    = useRef(onLeaveObject);
  const onPosRef      = useRef(onPositionChange);
  onNearRef.current   = onNearObject;
  onLeaveRef.current  = onLeaveObject;
  onPosRef.current    = onPositionChange;

  // Animación del sprite
  const { spriteStyle } = useCatAnimation(catState, facingLeft, catSprite);

  // ── Sonido de salto ──────────────────────────────────────────────────────────
  const playJumpSound = useCallback(() => {
    const sfx = new Audio(jumpSfx);
    sfx.volume = 0.5;
    sfx.play().catch(() => {});
  }, []);

  // ── Loop del juego ───────────────────────────────────────────────────────────
  const update = useCallback(() => {
    const k       = keysRef.current;
    const pos     = posRef.current;
    const vel     = velRef.current;
    let onGround  = onGroundRef.current;

    // ── Movimiento horizontal ──
    if (k.right) {
      vel.x = k.shift ? RUN_SPEED : WALK_SPEED;
    } else if (k.left) {
      vel.x = k.shift ? -RUN_SPEED : -WALK_SPEED;
    } else {
      vel.x = 0;
    }

    // ── Salto ──
    if (k.jump && onGround && !jumpedRef.current) {
      vel.y = JUMP_FORCE;
      onGround = false;
      jumpedRef.current = true;
      playJumpSound();
    }
    // Reset del flag cuando se suelta la tecla
    if (!k.jump) {
      jumpedRef.current = false;
    }

    // ── Gravedad ──
    vel.y += GRAVITY;

    // ── Actualizar posición ──
    pos.x += vel.x;
    pos.y += vel.y;

    // ── Límites horizontales ──
    const catW = FRAME_SIZE * SPRITE_SCALE;
    pos.x = Math.max(0, Math.min(pos.x, WORLD_WIDTH - catW));

    // ── Colisión con el suelo ──
    if (pos.y >= floorY.current) {
      pos.y     = floorY.current;
      vel.y     = 0;
      onGround  = true;
    }

    onGroundRef.current = onGround;

    // ── Estado de animación ──
    let newState = 'idle';
    if (!onGround) {
      newState = vel.y < 0 ? 'jump' : 'land';
    } else if (vel.x !== 0) {
      newState = Math.abs(vel.x) >= RUN_SPEED ? 'run' : 'walk';
    }

    // ── Dirección ──
    const newFacing = vel.x < 0 ? true : vel.x > 0 ? false : facingLeft;

    // ── Detección de objetos cercanos ──
    let closest     = null;
    let closestDist = NEAR_OBJECT_THRESHOLD;
    for (const obj of objects) {
      const dist = Math.abs(pos.x + (FRAME_SIZE * SPRITE_SCALE) / 2 - obj.x);
      if (dist < closestDist) {
        closestDist = dist;
        closest     = obj.id;
      }
    }

    if (closest !== nearObjRef.current) {
      nearObjRef.current = closest;
      if (closest) onNearRef.current?.(closest);
      else         onLeaveRef.current?.();
    }

    // ── Notificar posición a la cámara ──
    onPosRef.current?.(pos.x);

    // ── Actualizar estado React ──
    setRenderPos({ x: pos.x, y: pos.y });
    setCatState(newState);
    setFacingLeft(newFacing);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useGameLoop(update);

  // Tamaño visual del sprite escalado
  const displaySize = FRAME_SIZE * SPRITE_SCALE;

  return (
    <div
      className={styles.cat}
      style={{
        left: `${renderPos.x}px`,
        top:  `${renderPos.y - displaySize}px`,
        ...spriteStyle,
      }}
      aria-label="Gatito protagonista"
    />
  );
}
