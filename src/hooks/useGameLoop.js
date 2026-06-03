import { useEffect, useRef } from 'react';

export function useGameLoop(update) {

  const updateRef = useRef(update);
  const rafRef    = useRef(null);
  const lastTimeRef = useRef(null);

  useEffect(() => {
    updateRef.current = update;
  }, [update]);

  useEffect(() => {
    const loop = (timestamp) => {

      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      const rawDelta = timestamp - lastTimeRef.current;
      const deltaTime = Math.min(rawDelta, 100) / 1000;
      lastTimeRef.current = timestamp;

      updateRef.current(deltaTime);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lastTimeRef.current = null;
    };
  }, []);
}
