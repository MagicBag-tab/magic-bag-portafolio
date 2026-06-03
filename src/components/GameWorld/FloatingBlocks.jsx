import {
  tileGrassLeft,
  tileGrassTop,
  tileGrassRight,
  tileGroundFill,
  flowerCosmo,
  flowerDaffodil,
  flowerDaisy,
  flowerLavender,
  flowerPansy,
  flowerTulip,
} from '../../assets/index';
import styles from './FloatingBlocks.module.css';

const BLOCKS = [
  { id: 1, x: 1880, y: 270, width: 3, flowers: [flowerCosmo, flowerDaisy] },
  { id: 2, x: 2520, y: 322, width: 5, flowers: [flowerDaffodil, flowerPansy] },
  { id: 3, x: 3160, y: 205, width: 3, flowers: [flowerLavender] },
  { id: 4, x: 3920, y: 276, width: 4, flowers: [flowerTulip, flowerDaisy] },
  { id: 5, x: 4580, y: 236, width: 4, flowers: [flowerCosmo] },
  { id: 6, x: 5260, y: 328, width: 3, flowers: [flowerPansy, flowerLavender] },
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
          <div className={styles.platformFlowers}>
            {block.flowers.map((flower, index) => (
              <img
                key={`${block.id}-flower-${index}`}
                src={flower}
                alt=""
                className={styles.platformFlower}
                style={{ left: `${56 + index * 70}px` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
