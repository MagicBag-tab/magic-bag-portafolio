import { useEffect, useRef } from 'react';

// =========================================
// useGameLoop — loop de animación con requestAnimationFrame
// Recibe: callback update(deltaTime) en segundos
// =========================================
export function useGameLoop(update) {
  // Guardamos la referencia al callback para no necesitar re-registrar el efecto
  const updateRef = useRef(update);
  const rafRef    = useRef(null);
  const lastTimeRef = useRef(null);

  // Actualiza la referencia cuando el callback cambia
  useEffect(() => {
    updateRef.current = update;
  }, [update]);

  useEffect(() => {
    const loop = (timestamp) => {
      // Primer frame: inicializar tiempo
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      // Calcular deltaTime en segundos (capped a 100ms para evitar saltos grandes)
      const rawDelta = timestamp - lastTimeRef.current;
      const deltaTime = Math.min(rawDelta, 100) / 1000;
      lastTimeRef.current = timestamp;

      // Ejecutar la lógica del juego
      updateRef.current(deltaTime);

      // Pedir el siguiente frame
      rafRef.current = requestAnimationFrame(loop);
    };

    // Iniciar el loop
    rafRef.current = requestAnimationFrame(loop);

    // Cleanup: cancelar al desmontar
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lastTimeRef.current = null;
    };
  }, []); // solo se ejecuta una vez al montar
}
