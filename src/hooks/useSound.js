import { useState, useRef, useCallback } from 'react';

// =========================================
// useSound — manejo de audio on/off
// Retorna: { soundEnabled, toggleSound, playSound, stopSound }
// =========================================
export function useSound(initialEnabled = true) {
  const [soundEnabled, setSoundEnabled] = useState(initialEnabled);
  const audioRefs = useRef({}); // caché de objetos Audio

  // Alternar sonido global
  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      // Pausar o reanudar todos los audios en caché
      Object.values(audioRefs.current).forEach((audio) => {
        if (next) {
          // No auto-reanuda — el componente decide cuándo reproducir
        } else {
          audio.pause();
        }
      });
      return next;
    });
  }, []);

  // Reproducir un sonido por URL
  // options: { loop, volume }
  const playSound = useCallback((url, options = {}) => {
    if (!soundEnabled) return null;

    const { loop = false, volume = 0.6 } = options;

    // Reutilizar instancia existente si ya fue creada
    if (!audioRefs.current[url]) {
      audioRefs.current[url] = new Audio(url);
    }

    const audio = audioRefs.current[url];
    audio.loop   = loop;
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play().catch(() => {
      // El navegador puede bloquear autoplay sin interacción del usuario
      console.warn('[useSound] No se pudo reproducir:', url);
    });

    return audio;
  }, [soundEnabled]);

  // Detener un sonido por URL
  const stopSound = useCallback((url) => {
    const audio = audioRefs.current[url];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  return { soundEnabled, toggleSound, playSound, stopSound };
}
