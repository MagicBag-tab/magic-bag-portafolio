import { crispyTvFrame } from '../../../assets/index';
import styles from './HomeZone.module.css';

const TV_X = 2120;

export default function HomeZone() {
  return (
    <div className={styles.zone}>
      <div
        className={styles.floatingText}
        style={{ left: `2200px` }}
      >
        Magic Bag Portlofio
      </div>
    </div>
  );
}
