

export const GRAVITY      = 0.6;
export const JUMP_FORCE   = -13;
export const WALK_SPEED   = 3;
export const RUN_SPEED    = 6;

export const WORLD_WIDTH  = 6000;
export const WORLD_HEIGHT = 600;

export const ZONE_LEFT_START   = 0;
export const ZONE_LEFT_END     = 1800;
export const ZONE_CENTER_START = 1800;
export const ZONE_CENTER_END   = 3200;
export const ZONE_RIGHT_START  = 3200;
export const ZONE_RIGHT_END    = 6000;

export const CAT_SPAWN_X        = 2200;
export const FRAME_SIZE         = 64;
export const SPRITE_COLS        = 14;
export const SPRITE_SCALE       = 2;

export const getFloorY = () => {
  const groundTop = window.innerHeight * 0.76;
  return groundTop - FRAME_SIZE * SPRITE_SCALE;
};

export const CLIFF_EDGE_X = 1580;

export const CAMERA_LERP     = 0.1;
export const CAMERA_OFFSET_X = 0.4;

export const NEAR_THRESHOLD = 110;

export const CAT_ANIMATIONS = {
  idle: { row: 25, frames: 5,  fps: 6  },
  walk: { row: 32, frames: 11, fps: 12 },
  run:  { row: 34, frames: 11, fps: 18 },
  jump: { row: 63, frames: 5,  fps: 10 },
  land: { row: 64, frames: 5,  fps: 10 },
};

export const PARALLAX_SPEEDS = {
  sky:          0.0,
  mountains:    0.45,
  groundFlower: 0.85,
  ground:       1.0,
};

export const GAMEBOY_X               = 720;
export const GAMEBOY_Y               = 130;
export const GAMEBOY_WIDTH           = 430;
export const GAMEBOY_HEIGHT          = 376;
export const GAMEBOY_SCREEN_W        = 160;
export const GAMEBOY_SCREEN_H        = 144;

export const GAMEBOY_SCREEN_OFFSET_X = 50;
export const GAMEBOY_SCREEN_OFFSET_Y = 62;

export const CINEMA_SCREEN_X    = 3420;
export const CINEMA_SCREEN_Y    = 60;
export const CINEMA_SCREEN_W    = 520;
export const CINEMA_SCREEN_H    = 300;
export const CINEMA_CAROUSEL_MS = 5000;

export const POKEMON_AUDIENCE = [
  { id: 'snorlax',   pokeId: 143, x: 3620, scale: 2.2, delay: 0,    projectId: null },
  { id: 'pikachu',   pokeId: 25,  x: 3740, scale: 1.6, delay: 600,  projectId: 1    },
  { id: 'eevee',     pokeId: 133, x: 3840, scale: 1.5, delay: 1200, projectId: 2    },
  { id: 'gengar',    pokeId: 94,  x: 3950, scale: 1.7, delay: 400,  projectId: null },
  { id: 'bulbasaur', pokeId: 1,   x: 4060, scale: 1.5, delay: 900,  projectId: 3    },
];

export const OBJECT_IDS = {
  GAMEBOY:    'gameboy',
};

export const FLOOR_Y              = 520;
export const NEAR_OBJECT_THRESHOLD = NEAR_THRESHOLD;
