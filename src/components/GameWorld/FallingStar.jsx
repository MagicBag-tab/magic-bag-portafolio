import { useState, useEffect } from 'react';
import { fallingStarSprite } from '../../assets/index';
import styles from './FallingStar.module.css';

export default function FallingStar() {
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState({ top: 56, left: 600 });

  useEffect(() => {
    let hideTimeout;

    const triggerStar = () => {
      setPosition({
        top: Math.random() * 180 + 24,
        left: Math.random() * 5200 + 280,
      });
      setActive(true);

      hideTimeout = window.setTimeout(() => {
        setActive(false);
      }, 3000);
    };

    triggerStar();

    const interval = window.setInterval(() => {
      triggerStar();
    }, 12000 + Math.random() * 13000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(hideTimeout);
    };
  }, []);

  if (!active) return null;

  return (
    <div
      className={styles.starContainer}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      aria-hidden="true"
    >
      <div className={styles.sprite} style={{ backgroundImage: `url(${fallingStarSprite})` }} />
    </div>
  );
}
