import styles from './ParallaxLayer.module.css';

// =========================================
// ParallaxLayer — capa reutilizable del parallax
// Props:
//   speed       — factor de velocidad relativa al movimiento de cámara (0=fijo, 1=junto con cámara)
//   offsetX     — desplazamiento horizontal de la cámara (px)
//   zIndex      — profundidad de la capa
//   height      — altura de la capa (px o %)
//   color       — color de fondo placeholder
//   imageUrl    — URL de imagen de fondo (opcional)
//   repeat      — 'repeat-x' | 'no-repeat' | 'repeat' (para el background)
//   children    — elementos dentro de la capa
//   style       — estilos adicionales
// =========================================
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
  // Calcular el desplazamiento parallax
  // Las capas más lejanas (speed bajo) se mueven más despacio
  const translateX = -(offsetX * speed);

  const layerStyle = {
    transform: `translateX(${translateX}px)`,
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
