import { tileGrassLeft, tileGrassTop, tileGrassRight } from '../../../assets/index';
import styles from './FloatingBlocks.module.css';

// Generamos algunos bloques fijos en el cielo
const BLOCKS = [
  { id: 1, x: 400,  y: 350, width: 3 },
  { id: 2, x: 700,  y: 250, width: 4 },
  { id: 3, x: 1200, y: 300, width: 2 },
  { id: 4, x: 2600, y: 280, width: 5 },
  { id: 5, x: 3100, y: 180, width: 3 },
  { id: 6, x: 4500, y: 220, width: 4 },
  { id: 7, x: 5200, y: 320, width: 3 },
];

export default function FloatingBlocks() {
  return (
    <>
      {BLOCKS.map((block) => (
        <div
          key={block.id}
          className={styles.platform}
          style={{
            left: `${block.x}px`,
            bottom: `${block.y}px`,
          }}
        >
          {/* Lado izquierdo */}
          <div className={styles.tile} style={{ backgroundImage: `url(${tileGrassLeft})` }} />
          
          {/* Medio */}
          {Array.from({ length: block.width }).map((_, i) => (
            <div key={i} className={styles.tile} style={{ backgroundImage: `url(${tileGrassTop})` }} />
          ))}
          
          {/* Lado derecho */}
          <div className={styles.tile} style={{ backgroundImage: `url(${tileGrassRight})` }} />
        </div>
      ))}
    </>
  );
}
