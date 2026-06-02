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
import { FLOATING_BLOCKS } from '../../data/platforms';
import styles from './FloatingBlocks.module.css';

const FLOWERS = {
  cosmo: flowerCosmo,
  daffodil: flowerDaffodil,
  daisy: flowerDaisy,
  lavender: flowerLavender,
  pansy: flowerPansy,
  tulip: flowerTulip,
};

export default function FloatingBlocks() {
  return (
    <div className={styles.layer} aria-hidden="true">
      {FLOATING_BLOCKS.map((block) => (
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
                src={FLOWERS[flower]}
                alt=""
                className={styles.platformFlower}
                style={{
                  left: `calc(${((index + 1) / (block.flowers.length + 1)) * 100}% - 19px)`,
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
