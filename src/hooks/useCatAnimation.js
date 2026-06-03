import { useState, useEffect, useRef } from 'react';
import { CAT_ANIMATIONS, FRAME_SIZE, SPRITE_COLS, SPRITE_SCALE } from '../constants/game';

const DISPLAY_SIZE = FRAME_SIZE * SPRITE_SCALE;

export function useCatAnimation(state = 'idle', facingLeft = false, spriteUrl = '') {
  const [currentFrame, setCurrentFrame] = useState(0);
  const frameRef = useRef(0);
  const stateRef = useRef(state);
  const spriteRef = useRef(spriteUrl);
  const lastTimeRef = useRef(null);

  useEffect(() => {
    if (stateRef.current !== state || spriteRef.current !== spriteUrl) {
      stateRef.current = state;
      spriteRef.current = spriteUrl;
      frameRef.current = 0;
      setCurrentFrame(0);
    }
  }, [state, spriteUrl]);

  useEffect(() => {
    let rafId;

    const animate = (timestamp) => {
      const anim = CAT_ANIMATIONS[stateRef.current] || CAT_ANIMATIONS.idle;
      const interval = 1000 / anim.fps;

      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      if (timestamp - lastTimeRef.current >= interval) {
        frameRef.current = (frameRef.current + 1) % anim.frames;
        setCurrentFrame(frameRef.current);
        lastTimeRef.current = timestamp;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, []);

  const anim = CAT_ANIMATIONS[state] || CAT_ANIMATIONS.idle;
  const frameX = currentFrame * FRAME_SIZE;
  const frameY = anim.row * FRAME_SIZE;

  const spriteStyle = {
    width: `${DISPLAY_SIZE}px`,
    height: `${DISPLAY_SIZE}px`,
    backgroundImage: spriteUrl ? `url(${spriteUrl})` : 'none',
    backgroundPosition: `-${frameX * SPRITE_SCALE}px -${frameY * SPRITE_SCALE}px`,
    backgroundSize: `${SPRITE_COLS * FRAME_SIZE * SPRITE_SCALE}px auto`,
    backgroundRepeat: 'no-repeat',
    imageRendering: 'pixelated',
    transform: facingLeft ? 'scaleX(-1)' : 'scaleX(1)',
    backgroundColor: spriteUrl ? 'transparent' : '#9888cc',
    borderRadius: spriteUrl ? '0' : '8px',
  };

  return {
    spriteStyle,
    currentFrame,
    displaySize: DISPLAY_SIZE,
  };
}
