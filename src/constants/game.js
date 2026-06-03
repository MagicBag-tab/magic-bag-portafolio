// =========================================
// CONSTANTES FÍSICAS Y DE LAYOUT DEL JUEGO
// =========================================

// Física del gatito
export const GRAVITY = 0.5;           // px por frame² (aceleración hacia abajo)
export const JUMP_FORCE = -12;        // velocidad inicial del salto (negativo = arriba)
export const WALK_SPEED = 3;          // px por frame al caminar
export const RUN_SPEED = 6;           // px por frame al correr (con Shift)

// Geometría del mundo
// FLOOR_Y = altura donde el gato toca el suelo, en px desde arriba del mundo
// El suelo está en bottom: 15% del viewport → top ≈ 85% del viewport
// El gato mide FRAME_SIZE * SPRITE_SCALE = 128px de alto
// Entonces su borde superior al pararse = viewportHeight * 0.85 - 128
// Usamos 520 para un viewport de ~760px (ajustable)
export const FLOOR_Y = 520;           // posición Y del pie del gato (px desde arriba)
export const WORLD_WIDTH = 4000;      // ancho total del mundo en px
export const VIEWPORT_HEIGHT = 600;  // alto del área de juego

// Sprite sheet del gatito
export const FRAME_SIZE = 64;         // tamaño de cada frame (64×64 px)
export const SPRITE_COLS = 14;        // columnas en el sprite sheet
export const SPRITE_SCALE = 2;        // factor de escala visual del sprite

// Detección de proximidad
export const NEAR_OBJECT_THRESHOLD = 80; // distancia (px) para mostrar "¡Entra!"

// Cámara / parallax
export const CAMERA_LERP = 0.1;       // suavidad de la cámara (0 = rígida, 1 = instantánea)
export const CAMERA_OFFSET_X = 0.4;   // el gatito aparece al 40% del ancho de pantalla

// IDs de objetos clickeables en el mundo
export const OBJECT_IDS = {
  DESK: 'desk',         // Mesa → navega a Proyectos
  PORTAL: 'portal',     // Portal → navega a Sobre mí
  CLOUD: 'cloud',       // Nube → navega a Intro
};
