import { useState, useEffect, useRef } from 'react';
import { CAT_ANIMATIONS, FRAME_SIZE, SPRITE_COLS, SPRITE_SCALE } from '../constants/game';

const DISPLAY_SIZE = FRAME_SIZE * SPRITE_SCALE;
const DEFAULT_SHEET_WIDTH = SPRITE_COLS * FRAME_SIZE;

export function useCatAnimation(state = 'idle', facingLeft = false, spriteUrl = '') {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [sheetWidth, setSheetWidth] = useState(DEFAULT_SHEET_WIDTH);
  const frameRef = useRef(0);
  const stateRef = useRef(state);
  const spriteRef = useRef(spriteUrl);
  const lastTimeRef = useRef(null);

  useEffect(() => {
    if (!spriteUrl) {
      return;
    }

    const image = new Image();
    image.onload = () => {
      setSheetWidth(image.naturalWidth || DEFAULT_SHEET_WIDTH);
    };
    image.src = spriteUrl;
  }, [spriteUrl]);

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
    overflow: 'hidden',
    position: 'absolute',
    imageRendering: 'pixelated',
    transform: facingLeft ? 'scaleX(1)' : 'scaleX(-1)',
  };

  const imageStyle = {
    position: 'absolute',
    left: `-${frameX * SPRITE_SCALE}px`,
    top: `-${frameY * SPRITE_SCALE}px`,
    width: `${sheetWidth * SPRITE_SCALE}px`,
    height: 'auto',
    maxWidth: 'none',
    imageRendering: 'pixelated',
    pointerEvents: 'none',
    userSelect: 'none',
  };

  return {
    spriteStyle,
    imageStyle,
    currentFrame,
    displaySize: DISPLAY_SIZE,
  };
}
