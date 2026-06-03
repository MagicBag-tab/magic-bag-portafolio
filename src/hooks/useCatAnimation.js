import { useState, useEffect, useRef } from 'react';
import { FRAME_SIZE, SPRITE_COLS, SPRITE_SCALE } from '../constants/game';

// =========================================
// MAPA DE ANIMACIONES DEL SPRITE SHEET
// Ajusta 'row' según el archivo "black cat with text.png"
// Cada fila = una animación, columns = frames de esa animación
// =========================================
const ANIMATIONS = {
  idle: { row: 0, frames: 4,  fps: 6  },
  walk: { row: 1, frames: 8,  fps: 12 },
  run:  { row: 2, frames: 8,  fps: 16 },
  jump: { row: 3, frames: 4,  fps: 10 },
  land: { row: 4, frames: 3,  fps: 10 },
};

// Tamaño visual del sprite (escalado)
const DISPLAY_SIZE = FRAME_SIZE * SPRITE_SCALE;

// =========================================
// useCatAnimation — retorna estilos CSS para el sprite
// Recibe:
//   state     — 'idle' | 'walk' | 'run' | 'jump' | 'land'
//   facingLeft — booleano (espeja el sprite)
//   spriteUrl  — URL/import del sprite sheet
// =========================================
export function useCatAnimation(state = 'idle', facingLeft = false, spriteUrl = '') {
  const [currentFrame, setCurrentFrame] = useState(0);
  const frameRef    = useRef(0);
  const stateRef    = useRef(state);
  const lastTimeRef = useRef(null);

  // Cuando cambia el estado, reseteamos el frame
  useEffect(() => {
    if (stateRef.current !== state) {
      stateRef.current = state;
      frameRef.current = 0;
      setCurrentFrame(0);
    }
  }, [state]);

  // Animación con requestAnimationFrame propio (independiente del game loop)
  useEffect(() => {
    let rafId;

    const animate = (timestamp) => {
      const anim = ANIMATIONS[stateRef.current] || ANIMATIONS.idle;
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
  }, []); // solo una vez

  // Calcular estilos del sprite sheet
  const anim = ANIMATIONS[state] || ANIMATIONS.idle;
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
    // Placeholder visual cuando no hay sprite cargado
    backgroundColor: spriteUrl ? 'transparent' : '#9888cc',
    borderRadius: spriteUrl ? '0' : '8px',
  };

  return {
    spriteStyle,
    currentFrame,
    displaySize: DISPLAY_SIZE,
  };
}
