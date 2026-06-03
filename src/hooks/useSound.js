import { useState, useRef, useCallback } from 'react';

export function useSound(initialEnabled = true) {
  const [soundEnabled, setSoundEnabled] = useState(initialEnabled);
  const audioRefs = useRef({});

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;

      Object.values(audioRefs.current).forEach((audio) => {
        if (!next) {
          audio.pause();
        }
      });
      return next;
    });
  }, []);

  const playSound = useCallback((url, options = {}) => {
    if (!soundEnabled) return null;

    const { loop = false, volume = 0.6 } = options;

    if (!audioRefs.current[url]) {
      audioRefs.current[url] = new Audio(url);
    }

    const audio = audioRefs.current[url];
    audio.loop   = loop;
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play().catch(() => {

      console.warn('[useSound] No se pudo reproducir:', url);
    });

    return audio;
  }, [soundEnabled]);

  const stopSound = useCallback((url) => {
    const audio = audioRefs.current[url];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  return { soundEnabled, toggleSound, playSound, stopSound };
}
