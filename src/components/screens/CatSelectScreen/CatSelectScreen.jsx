import { useState } from 'react';
import { CATS, DEFAULT_CAT_ID } from '../../../data/cats';
import { FRAME_SIZE, SPRITE_COLS, SPRITE_SCALE } from '../../../constants/game';
import styles from './CatSelectScreen.module.css';

export default function CatSelectScreen({ onSelect }) {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(DEFAULT_CAT_ID);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1 className={styles.title}>elige tu companero</h1>

        <div className={styles.catsContainer}>
          {CATS.map((cat) => {
            const previewScale = SPRITE_SCALE;
            const previewWidth = SPRITE_COLS * FRAME_SIZE * previewScale;
            const previewY = cat.preview.row * FRAME_SIZE * previewScale;
            const previewEndX = cat.preview.frames * FRAME_SIZE * previewScale;
            const duration = (cat.preview.frames / cat.preview.fps) * 1000;
            const isActive = hovered === cat.id || selected === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                className={`${styles.catCard} ${selected === cat.id ? styles.selected : ''}`}
                onClick={() => setSelected(cat.id)}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ '--cat-accent': cat.accent }}
              >
                <span className={styles.spriteContainer}>
                  <span
                    className={styles.sprite}
                    style={{
                      backgroundImage: `url(${cat.sprite})`,
                      backgroundSize: `${previewWidth}px auto`,
                      '--preview-y': `-${previewY}px`,
                      '--preview-end-x': `-${previewEndX}px`,
                      animationDuration: `${duration}ms`,
                      animationTimingFunction: `steps(${cat.preview.frames})`,
                      animationPlayState: isActive ? 'running' : 'paused',
                    }}
                  />
                </span>
                <span className={styles.catName}>{cat.name}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className={styles.startBtn}
          onClick={() => onSelect(selected)}
        >
          Empezar aventura
        </button>
      </div>
    </div>
  );
}
