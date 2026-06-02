import { useState, useRef, useCallback, useEffect } from 'react';
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
  getFloorY,
  SPRITE_FLOOR_OFFSET,
} from '../../constants/game';
import { jumpSfx } from '../../assets/index';
import { DEFAULT_CAT_ID, getCatById } from '../../data/cats';
import { FLOATING_BLOCKS, PLATFORM_TILE_SIZE } from '../../data/platforms';
import styles from './Cat.module.css';

export default function Cat({
  interactables = [],
  onNearObject,
  onLeaveObject,
  onPositionChange,
  selectedCat = DEFAULT_CAT_ID,
}) {
  const initialFloorY = getFloorY();
  const floorYRef = useRef(initialFloorY);
  const posRef = useRef({ x: CAT_SPAWN_X, y: initialFloorY });
  const velRef = useRef({ x: 0, y: 0 });
  const onGroundRef = useRef(true);
  const jumpedRef = useRef(false);
  const nearObjRef = useRef(null);
  const idleTimeRef = useRef(0);

  const [renderPos, setRenderPos] = useState(() => ({ x: CAT_SPAWN_X, y: initialFloorY }));
  const [catState, setCatState] = useState('idle');
  const [facingLeft, setFacingLeft] = useState(false);

  const keys = useKeyboard();
  const keysRef = useRef(keys);
  const onNearRef = useRef(onNearObject);
  const onLeaveRef = useRef(onLeaveObject);
  const onPosRef = useRef(onPositionChange);

  useEffect(() => {
    keysRef.current = keys;
  }, [keys]);

  useEffect(() => {
    onNearRef.current = onNearObject;
    onLeaveRef.current = onLeaveObject;
    onPosRef.current = onPositionChange;
  }, [onNearObject, onLeaveObject, onPositionChange]);

  const activeSprite = getCatById(selectedCat).sprite;
  const { spriteStyle, imageStyle } = useCatAnimation(catState, facingLeft, activeSprite);

  const playJump = useCallback(() => {
    const sfx = new Audio(jumpSfx);
    sfx.volume = 0.45;
    sfx.play().catch(() => {});
  }, []);

  const update = useCallback(() => {
    const k = keysRef.current;
    const pos = posRef.current;
    const vel = velRef.current;
    let onGround = onGroundRef.current;
    const floorY = floorYRef.current;
    const catW = FRAME_SIZE * SPRITE_SCALE;
    const prevY = pos.y;

    if (k.right) {
      vel.x = k.shift ? RUN_SPEED : WALK_SPEED;
    } else if (k.left) {
      vel.x = k.shift ? -RUN_SPEED : -WALK_SPEED;
    } else {
      vel.x = 0;
    }

    if (k.jump && onGround && !jumpedRef.current) {
      vel.y = JUMP_FORCE;
      jumpedRef.current = true;
      playJump();
    }
    if (!k.jump) jumpedRef.current = false;

    vel.y += GRAVITY;
    pos.x += vel.x;
    pos.y += vel.y;
    pos.x = Math.max(0, Math.min(pos.x, WORLD_WIDTH - catW));
    onGround = false;

    if (pos.x < CLIFF_EDGE_X - catW) {
      pos.x = CLIFF_EDGE_X - catW;
      vel.x = 0;
    }

    for (const platform of FLOATING_BLOCKS) {
      const platformTopY = window.innerHeight - platform.y - PLATFORM_TILE_SIZE;
      const platformLeft = platform.x;
      const platformRight = platform.x + (platform.width + 2) * PLATFORM_TILE_SIZE;
      const feetLeft = pos.x + catW * 0.25;
      const feetRight = pos.x + catW * 0.75;
      const horizontallyOverPlatform = feetRight > platformLeft && feetLeft < platformRight;
      const effectivePlatformTop = platformTopY + SPRITE_FLOOR_OFFSET;
      const crossedPlatformTop = prevY <= effectivePlatformTop && pos.y >= effectivePlatformTop;

      if (vel.y >= 0 && horizontallyOverPlatform && crossedPlatformTop) {
        pos.y = effectivePlatformTop;
        vel.y = 0;
        onGround = true;
        break;
      }
    }

    if (pos.y >= floorY) {
      pos.y = floorY;
      vel.y = 0;
      onGround = true;
    }

    onGroundRef.current = onGround;

    let newState = 'idle';
    if (!onGround) {
      newState = vel.y < 0 ? 'jump' : 'land';
    } else if (vel.x !== 0) {
      newState = Math.abs(vel.x) >= RUN_SPEED ? 'run' : 'walk';
    }

    // Idle state machine — sleep after 3s of inactivity
    if (newState === 'idle') {
      idleTimeRef.current += 1000 / 60;
      if (idleTimeRef.current > 3000) {
        newState = 'sleep';
      }
    } else {
      idleTimeRef.current = 0;
    }

    const newFacing = vel.x < 0 ? true : vel.x > 0 ? false : facingLeft;
    const catCenter = pos.x + catW / 2;
    let closest = null;
    let closestDist = NEAR_THRESHOLD;

    for (const obj of interactables) {
      const dist = Math.abs(catCenter - obj.x);
      if (dist < closestDist) {
        closestDist = dist;
        closest = obj.id;
      }
    }

    if (closest !== nearObjRef.current) {
      nearObjRef.current = closest;
      if (closest) onNearRef.current?.(closest);
      else onLeaveRef.current?.();
    }

    onPosRef.current?.(pos.x);
    setRenderPos({ x: pos.x, y: pos.y });
    setCatState(newState);
    setFacingLeft(newFacing);
  }, [facingLeft, interactables, playJump]);

  useGameLoop(update);

  const displaySize = FRAME_SIZE * SPRITE_SCALE;

  return (
    <div
      className={styles.cat}
      style={{
        left: `${renderPos.x}px`,
        top: `${renderPos.y - displaySize}px`,
        ...spriteStyle,
      }}
      aria-label="Gatito protagonista"
    >
      {activeSprite ? (
        <img
          src={activeSprite}
          alt=""
          aria-hidden="true"
          draggable="false"
          className={styles.spriteSheet}
          style={imageStyle}
        />
      ) : (
        <span className={styles.placeholder}>cat</span>
      )}
    </div>
  );
}
