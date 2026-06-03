import { useState, useRef, useCallback } from 'react';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useGameLoop } from '../../hooks/useGameLoop';
import { useCatAnimation } from '../../hooks/useCatAnimation';
import {
  GRAVITY,
  JUMP_FORCE,
  WALK_SPEED,
  RUN_SPEED,
  WORLD_WIDTH,
  FRAME_SIZE,
  SPRITE_SCALE,
  NEAR_THRESHOLD,
  CAT_SPAWN_X,
  CLIFF_EDGE_X,
  OBJECT_IDS,
  getFloorY,
} from '../../constants/game';
import { projects } from '../../data/projects';

// ─── Assets reales ────────────────────────────────────────────────────────────
import { catSprite, jumpSfx } from '../../assets/index';

import styles from './Cat.module.css';

// =========================================
// Cat — personaje principal pixel art
//
// Props:
//   interactables   — array de { id, x } del mundo (Gameboy, puertas, etc.)
//   onNearObject(id) — callback al acercarse a un objeto
//   onLeaveObject()  — callback al alejarse de todos los objetos
//   onPositionChange(x) — callback con posición X para la cámara
// =========================================
export default function Cat({
  interactables = [],
  onNearObject,
  onLeaveObject,
  onPositionChange,
}) {
  // ── Física ───────────────────────────────────────────────────────────────────
  const floorYRef   = useRef(getFloorY());
  const posRef      = useRef({ x: CAT_SPAWN_X, y: floorYRef.current });
  const velRef      = useRef({ x: 0, y: 0 });
  const onGroundRef = useRef(true);
  const jumpedRef   = useRef(false);
  const nearObjRef  = useRef(null);

  // ── Estado React (solo para re-render visual) ─────────────────────────────────
  const [renderPos,  setRenderPos]  = useState({ x: CAT_SPAWN_X, y: floorYRef.current });
  const [catState,   setCatState]   = useState('idle');
  const [facingLeft, setFacingLeft] = useState(false);

  // ── Teclas ───────────────────────────────────────────────────────────────────
  const keys    = useKeyboard();
  const keysRef = useRef(keys);
  keysRef.current = keys;

  // ── Refs estables para callbacks ──────────────────────────────────────────────
  const onNearRef    = useRef(onNearObject);
  const onLeaveRef   = useRef(onLeaveObject);
  const onPosRef     = useRef(onPositionChange);
  onNearRef.current  = onNearObject;
  onLeaveRef.current = onLeaveObject;
  onPosRef.current   = onPositionChange;

  // ── Animación del sprite ──────────────────────────────────────────────────────
  const { spriteStyle } = useCatAnimation(catState, facingLeft, catSprite);

  // ── Sonido de salto ───────────────────────────────────────────────────────────
  const playJump = useCallback(() => {
    const sfx = new Audio(jumpSfx);
    sfx.volume = 0.45;
    sfx.play().catch(() => {});
  }, []);

  // ── Game loop ─────────────────────────────────────────────────────────────────
  const update = useCallback(() => {
    const k      = keysRef.current;
    const pos    = posRef.current;
    const vel    = velRef.current;
    let onGround = onGroundRef.current;
    const floorY = floorYRef.current;
    const catW   = FRAME_SIZE * SPRITE_SCALE;

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
      playJump();
    }
    if (!k.jump) jumpedRef.current = false;

    // ── Gravedad ──
    vel.y += GRAVITY;

    // ── Actualizar posición ──
    pos.x += vel.x;
    pos.y += vel.y;

    // ── Límites del mundo ──
    pos.x = Math.max(0, Math.min(pos.x, WORLD_WIDTH - catW));

    // ── Colisión con el precipicio (zona izquierda) ──
    // El gato no puede pasar más allá del borde del cliff
    if (pos.x < CLIFF_EDGE_X - catW) {
      pos.x = CLIFF_EDGE_X - catW;
      vel.x = 0;
    }

    // ── Colisión con el suelo ──
    if (pos.y >= floorY) {
      pos.y    = floorY;
      vel.y    = 0;
      onGround = true;
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

    // ── Detección de objetos interactivos ──
    const catCenter = pos.x + catW / 2;
    let closest     = null;
    let closestDist = NEAR_THRESHOLD;

    for (const obj of interactables) {
      const dist = Math.abs(catCenter - obj.x);
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

    // ── Sync visual ──
    setRenderPos({ x: pos.x, y: pos.y });
    setCatState(newState);
    setFacingLeft(newFacing);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGameLoop(update);

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
