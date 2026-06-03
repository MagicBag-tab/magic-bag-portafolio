// =========================================
// CONSTANTES DEL MUNDO — 3 ZONAS
// Mundo total: 6000px de ancho
// =========================================

// ─── Física del gatito ────────────────────────────────────────────────────────
export const GRAVITY      = 0.6;
export const JUMP_FORCE   = -13;
export const WALK_SPEED   = 3;
export const RUN_SPEED    = 6;

// ─── Geometría del mundo ──────────────────────────────────────────────────────
export const WORLD_WIDTH  = 6000;
export const WORLD_HEIGHT = 600;

// Zonas
export const ZONE_LEFT_START   = 0;
export const ZONE_LEFT_END     = 1800;
export const ZONE_CENTER_START = 1800;
export const ZONE_CENTER_END   = 3200;
export const ZONE_RIGHT_START  = 3200;
export const ZONE_RIGHT_END    = 6000;

// ─── Gatito ───────────────────────────────────────────────────────────────────
export const CAT_SPAWN_X        = 2200;   // posición X inicial (zona central)
export const FRAME_SIZE         = 64;     // tamaño de cada frame del sprite (px)
export const SPRITE_COLS        = 14;     // columnas en el sprite sheet
export const SPRITE_SCALE       = 2;      // factor de escala visual

// FLOOR_Y dinámico — se calcula en runtime según el alto del viewport
// El suelo visual está en bottom 15% → groundTop = 85% del alto
// El gato (128px) se posa con su base en el groundTop
export const getFloorY = () => {
  const groundTop = window.innerHeight * 0.855;
  return groundTop - FRAME_SIZE * SPRITE_SCALE;
};

// Límite del precipicio — zona izquierda
export const CLIFF_EDGE_X = 1580;

// ─── Cámara ───────────────────────────────────────────────────────────────────
export const CAMERA_LERP     = 0.1;   // suavidad (0=rígida, 1=instantánea)
export const CAMERA_OFFSET_X = 0.4;   // gato aparece al 40% del ancho de pantalla

// ─── Detección de proximidad ──────────────────────────────────────────────────
export const NEAR_THRESHOLD = 110;    // distancia (px) para mostrar tooltip

// ─── Animaciones del sprite sheet ─────────────────────────────────────────────
export const CAT_ANIMATIONS = {
  idle: { row: 0, frames: 4,  fps: 6  },
  walk: { row: 1, frames: 8,  fps: 12 },
  run:  { row: 2, frames: 8,  fps: 16 },
  jump: { row: 3, frames: 4,  fps: 10 },
  land: { row: 4, frames: 3,  fps: 10 },
};

// ─── Velocidades de parallax ──────────────────────────────────────────────────
// 0 = fijo (sky), 1 = se mueve igual que el mundo (suelo)
export const PARALLAX_SPEEDS = {
  sky:          0.0,
  cloudsFar:    0.10,
  cloudsNear1:  0.22,
  cloudsNear2:  0.30,
  mountains:    0.45,
  groundFlower: 0.85,
  ground:       1.0,
};

// ─── Gameboy (zona izquierda) ──────────────────────────────────────────────────
export const GAMEBOY_X               = 820;    // posición X en el mundo
export const GAMEBOY_Y               = 130;    // desde arriba del viewport
export const GAMEBOY_WIDTH           = 260;
export const GAMEBOY_HEIGHT          = 360;
export const GAMEBOY_SCREEN_W        = 160;    // pantalla interna (píxeles Game Boy: 160×144)
export const GAMEBOY_SCREEN_H        = 144;
// Offsets de la pantalla dentro del body de la Gameboy
export const GAMEBOY_SCREEN_OFFSET_X = 50;
export const GAMEBOY_SCREEN_OFFSET_Y = 62;

// ─── Cine (zona derecha) ──────────────────────────────────────────────────────
export const CINEMA_SCREEN_X    = 3420;   // posición X en el mundo
export const CINEMA_SCREEN_Y    = 60;     // desde arriba del viewport
export const CINEMA_SCREEN_W    = 520;
export const CINEMA_SCREEN_H    = 300;
export const CINEMA_CAROUSEL_MS = 5000;  // ms entre proyectos en el carrusel

// ─── Pokémon (audiencia) ──────────────────────────────────────────────────────
// Posiciones X absolutas en el mundo, Y relativo al suelo (bottom offset)
export const POKEMON_AUDIENCE = [
  { id: 'snorlax',   pokeId: 143, x: 3620, scale: 2.2, delay: 0,    projectId: null },
  { id: 'pikachu',   pokeId: 25,  x: 3740, scale: 1.6, delay: 600,  projectId: 1    },
  { id: 'eevee',     pokeId: 133, x: 3840, scale: 1.5, delay: 1200, projectId: 2    },
  { id: 'gengar',    pokeId: 94,  x: 3950, scale: 1.7, delay: 400,  projectId: null },
  { id: 'bulbasaur', pokeId: 1,   x: 4060, scale: 1.5, delay: 900,  projectId: 3    },
];

// ─── Puertas de proyectos ─────────────────────────────────────────────────────
export const DOOR_START_X  = 4350;   // X de la primera puerta
export const DOOR_SPACING  = 220;    // espacio entre puertas
export const DOOR_WIDTH    = 90;
export const DOOR_HEIGHT   = 120;

// ─── IDs de objetos interactivos en el mundo ──────────────────────────────────
export const OBJECT_IDS = {
  GAMEBOY:    'gameboy',
  DOOR_BASE:  'door_',        // + projectId (ej: 'door_1', 'door_2')
};

// ─── Alias para compatibilidad con imports existentes ─────────────────────────
export const FLOOR_Y              = 520;   // valor estático de respaldo
export const NEAR_OBJECT_THRESHOLD = NEAR_THRESHOLD;
// FRAME_SIZE, SPRITE_SCALE, SPRITE_COLS ya exportados arriba
