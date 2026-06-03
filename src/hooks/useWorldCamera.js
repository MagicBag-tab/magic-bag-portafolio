import { useRef, useCallback } from 'react';
import { CAMERA_LERP, CAMERA_OFFSET_X, WORLD_WIDTH } from '../constants/game';

export function useWorldCamera() {
  const cameraRef = useRef(0);

  const computeCamera = useCallback((catX) => {
    const viewportW = window.innerWidth;

    const targetOffset = catX - CAMERA_OFFSET_X * viewportW;

    const current = cameraRef.current;
    const next = current + (targetOffset - current) * CAMERA_LERP;

    const maxOffset = WORLD_WIDTH - viewportW;
    cameraRef.current = Math.max(0, Math.min(next, maxOffset));

    return cameraRef.current;
  }, []);

  const getCameraOffset = useCallback(() => cameraRef.current, []);

  return { cameraRef, computeCamera, getCameraOffset };
}
