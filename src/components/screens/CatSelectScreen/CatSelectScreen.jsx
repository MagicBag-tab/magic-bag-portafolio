import { useState } from 'react';
import styles from './CatSelectScreen.module.css';
import { catSpriteBlack, catSpriteGinger, catSpriteWhite } from '../../../assets';

const CATS = [
  { id: 'black',  name: 'Gato Negro',   src: catSpriteBlack },
  { id: 'ginger', name: 'Gato Naranja', src: catSpriteGinger },
  { id: 'white',  name: 'Gato Blanco',  src: catSpriteWhite },
];

export default function CatSelectScreen({ onSelect }) {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState('black'); // default

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1 className={styles.title}>✦ elige tu compañero ✦</h1>
        
        <div className={styles.catsContainer}>
          {CATS.map((cat) => (
            <div
              key={cat.id}
              className={`${styles.catCard} ${selected === cat.id ? styles.selected : ''}`}
              onClick={() => setSelected(cat.id)}
              onMouseEnter={() => setHovered(cat.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className={styles.spriteContainer}>
                <div
                  className={styles.sprite}
                  style={{
                    backgroundImage: `url(${cat.src})`,
                    animationPlayState: hovered === cat.id || selected === cat.id ? 'running' : 'paused'
                  }}
                />
              </div>
              <span className={styles.catName}>{cat.name}</span>
            </div>
          ))}
        </div>

        <button
          className={styles.startBtn}
          onClick={() => onSelect(selected)}
        >
          ¡Empezar aventura!
        </button>
      </div>
    </div>
  );
}
