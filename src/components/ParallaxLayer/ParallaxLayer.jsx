import styles from './ParallaxLayer.module.css';
import { WORLD_WIDTH } from '../../constants/game';

export default function ParallaxLayer({
  speed = 0.5,
  offsetX = 0,
  zIndex = 0,
  height = '100%',
  color = 'transparent',
  imageUrl = '',
  repeat = 'repeat-x',
  children,
  style = {},
  className = '',
}) {

  const translateX = -(offsetX * speed);

  const layerStyle = {
    transform: `translateX(${translateX}px)`,
    width: `${WORLD_WIDTH}px`,
    height,
    backgroundColor: color,
    zIndex,
    backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
    backgroundRepeat: repeat,
    backgroundPosition: 'bottom center',
    backgroundSize: imageUrl ? 'auto 100%' : 'auto',
    ...style,
  };

  return (
    <div
      className={`${styles.layer} ${className}`}
      style={layerStyle}
    >
      {children}
    </div>
  );
}
