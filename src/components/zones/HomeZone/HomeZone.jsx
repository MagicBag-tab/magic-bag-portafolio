import { flower1, flower2, flower3 } from '../../../assets/index';
import styles from './HomeZone.module.css';

const SIGNPOST_X = 2200;

const FLOWERS = [
  { img: flower1, x: 1900, size: 55, rotate: -8  },
  { img: flower3, x: 2050, size: 45, rotate: 12  },
  { img: flower2, x: 2350, size: 50, rotate: -5  },
  { img: flower1, x: 2700, size: 48, rotate: 10  },
  { img: flower3, x: 2900, size: 52, rotate: -12 },
  { img: flower2, x: 3100, size: 44, rotate: 6   },
];

export default function HomeZone() {
  return (
    <div className={styles.zone}>

      <div
        className={styles.signpost}
        style={{ left: `${SIGNPOST_X}px` }}
        aria-label="Señal de dirección"
      >

        <div className={styles.pole} />

        <div className={`${styles.sign} ${styles.signLeft}`}>
          <span>◀ Tech</span>
        </div>

        <div className={`${styles.sign} ${styles.signRight}`}>
          <span>Cine ▶</span>
        </div>
      </div>

      {FLOWERS.map((f, i) => (
        <img
          key={i}
          src={f.img}
          alt=""
          aria-hidden="true"
          className={styles.flower}
          style={{
            left:      `${f.x}px`,
            width:     `${f.size}px`,
            transform: `rotate(${f.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
