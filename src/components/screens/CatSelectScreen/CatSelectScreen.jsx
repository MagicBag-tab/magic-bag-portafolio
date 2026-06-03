import { useState } from 'react';
import { CATS, DEFAULT_CAT_ID } from '../../../data/cats';
import { useCatAnimation } from '../../../hooks/useCatAnimation';
import styles from './CatSelectScreen.module.css';

function AnimatedCatPreview({ cat, isSelected }) {
  const { spriteStyle, imageStyle } = useCatAnimation('walk', true, cat.sprite);

  return (
    <div className={styles.previewWrapper}>
      <div
        style={{
          ...spriteStyle,
          position: 'relative',
          transform: 'scaleX(-1) scale(2)',
          transformOrigin: 'center bottom',
          filter: isSelected
            ? `drop-shadow(0 0 12px ${cat.accent}) brightness(1.3)`
            : 'brightness(1.1)',
          transition: 'filter 0.2s',
        }}
      >
        <img src={cat.sprite} alt="" style={imageStyle} draggable={false} />
      </div>
    </div>
  );
}

export default function CatSelectScreen({ onSelect }) {
  const [selected, setSelected] = useState(DEFAULT_CAT_ID);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Elige tu companero</h1>

        <div className={styles.catsContainer}>
          {CATS.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`${styles.catCard} ${selected === cat.id ? styles.selected : ''}`}
              onClick={() => setSelected(cat.id)}
              style={{ '--cat-accent': cat.accent }}
            >
              <AnimatedCatPreview cat={cat} isSelected={selected === cat.id} />
              <span className={styles.catName}>{cat.name}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          className={styles.startBtn}
          onClick={() => onSelect(selected)}
        >
          Empezar aventura ✦
        </button>
      </div>
    </div>
  );
}
