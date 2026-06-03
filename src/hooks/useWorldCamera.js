import { useRef, useCallback } from 'react';
import { CAMERA_LERP, CAMERA_OFFSET_X, WORLD_WIDTH } from '../constants/game';

// =========================================
// useWorldCamera — cálculo de cámara con lerp
// La cámara sigue al gatito con suavidad
//
// Retorna:
//   cameraRef        — ref con el offset actual (no causa re-renders)
//   computeCamera(catX) — función que actualiza cameraRef
//   getCameraOffset()   — getter del valor actual
// =========================================
export function useWorldCamera() {
  const cameraRef = useRef(0);

  // Calcula el nuevo offset de cámara dado catX
  // y lo guarda en cameraRef (sin setState → sin re-render extra)
  const computeCamera = useCallback((catX) => {
    const viewportW = window.innerWidth;

    // Queremos que el gato aparezca al CAMERA_OFFSET_X% del viewport
    const targetOffset = catX - CAMERA_OFFSET_X * viewportW;

    // Lerp suave
    const current = cameraRef.current;
    const next = current + (targetOffset - current) * CAMERA_LERP;

    // Clamp: no mostrar más allá de los bordes del mundo
    const maxOffset = WORLD_WIDTH - viewportW;
    cameraRef.current = Math.max(0, Math.min(next, maxOffset));

    return cameraRef.current;
  }, []);

  const getCameraOffset = useCallback(() => cameraRef.current, []);

  return { cameraRef, computeCamera, getCameraOffset };
}
