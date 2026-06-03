import { useState, useEffect, useRef } from 'react';

export function useKeyboard() {

  const keysRef = useRef({ left: false, right: false, jump: false });

  const [keys, setKeys] = useState({ left: false, right: false, jump: false });

  useEffect(() => {

    const KEY_MAP = {
      ArrowLeft:  'left',
      ArrowRight: 'right',
      Space:      'jump',
      ArrowUp:    'jump',
    };

    const handleKeyDown = (e) => {
      const action = KEY_MAP[e.code];
      if (!action) return;

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

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
}
