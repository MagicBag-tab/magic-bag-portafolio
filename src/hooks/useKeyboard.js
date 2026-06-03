import { useState, useEffect, useRef } from 'react';

// =========================================
// useKeyboard — captura teclas de movimiento
// Retorna: { left, right, jump }
// =========================================
export function useKeyboard() {
  // Ref para las teclas presionadas (no necesita re-render)
  const keysRef = useRef({ left: false, right: false, jump: false });

  // Estado que sí dispara re-render para que los componentes reaccionen
  const [keys, setKeys] = useState({ left: false, right: false, jump: false });

  useEffect(() => {
    // Mapa de teclas → acción
    const KEY_MAP = {
      ArrowLeft:  'left',
      ArrowRight: 'right',
      Space:      'jump',
      ArrowUp:    'jump', // también salta con flecha arriba
    };

    const handleKeyDown = (e) => {
      const action = KEY_MAP[e.code];
      if (!action) return;

      // Previene scroll de la página con las flechas / espacio
      e.preventDefault();

      if (!keysRef.current[action]) {
        keysRef.current = { ...keysRef.current, [action]: true };
        setKeys({ ...keysRef.current });
      }
    };

    const handleKeyUp = (e) => {
      const action = KEY_MAP[e.code];
      if (!action) return;

      keysRef.current = { ...keysRef.current, [action]: false };
      setKeys({ ...keysRef.current });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Cleanup: remover listeners al desmontar
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []); // solo se ejecuta una vez al montar

  return keys;
}
