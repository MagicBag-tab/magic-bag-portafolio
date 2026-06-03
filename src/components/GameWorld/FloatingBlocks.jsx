import {
  tileGrassLeft,
  tileGrassTop,
  tileGrassRight,
  tileGroundFill,
} from '../../assets/index';
import styles from './FloatingBlocks.module.css';

const BLOCKS = [
  { id: 1, x: 360, y: 360, width: 3 },
  { id: 2, x: 760, y: 250, width: 4 },
  { id: 3, x: 1180, y: 330, width: 2 },
  { id: 4, x: 1880, y: 270, width: 3 },
  { id: 5, x: 2580, y: 300, width: 5 },
  { id: 6, x: 3120, y: 190, width: 3 },
  { id: 7, x: 3920, y: 260, width: 4 },
  { id: 8, x: 4560, y: 220, width: 4 },
  { id: 9, x: 5240, y: 320, width: 3 },
];

export default function FloatingBlocks() {
  return (
    <div className={styles.layer} aria-hidden="true">
      {BLOCKS.map((block) => (
        <div
          key={block.id}
          className={styles.platform}
          style={{
            left: `${block.x}px`,
            bottom: `${block.y}px`,
          }}
        >
          <div className={styles.tile} style={{ backgroundImage: `url(${tileGrassLeft})` }} />
          {Array.from({ length: block.width }).map((_, index) => (
            <div
              key={`${block.id}-${index}`}
              className={styles.tile}
              style={{ backgroundImage: `url(${tileGrassTop})` }}
            />
          ))}
          <div className={styles.tile} style={{ backgroundImage: `url(${tileGrassRight})` }} />
          <div
            className={styles.platformShadow}
            style={{ backgroundImage: `url(${tileGroundFill})` }}
          />
        </div>
      ))}
    </div>
  );
}
