import { useState, useEffect } from 'react';
import { fallingStarSprite } from '../../../assets/index';
import styles from './FallingStar.module.css';

export default function FallingStar() {
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState({ top: 50, left: 0 });

  useEffect(() => {
    const triggerStar = () => {
      // Posición aleatoria arriba
      const top = Math.random() * 200 + 20; // 20px a 220px
      const left = Math.random() * 2000; // a lo largo de las primeras zonas
      setPosition({ top, left });
      setActive(true);

      // La animación dura ~3s, luego se oculta y espera
      setTimeout(() => {
        setActive(false);
      }, 3000);
    };

    // Estrella fugaz cada 12 a 25 segundos
    const interval = setInterval(() => {
      triggerStar();
    }, 12000 + Math.random() * 13000);

    return () => clearInterval(interval);
  }, []);

  if (!active) return null;

  return (
    <div
      className={styles.starContainer}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`
      }}
    >
      <div className={styles.sprite} style={{ backgroundImage: `url(${fallingStarSprite})` }} />
    </div>
  );
}
