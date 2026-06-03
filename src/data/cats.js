import {
  catSpriteBlack,
  catSpriteGinger,
  catSpriteWhite,
} from '../assets/index';

export const DEFAULT_CAT_ID = 'black';

export const CATS = [
  {
    id: 'black',
    name: 'Gato negro',
    sprite: catSpriteBlack,
    accent: '#d4b8f0',
    preview: { row: 25, frames: 5, fps: 6 },
  },
  {
    id: 'ginger',
    name: 'Gato naranja',
    sprite: catSpriteGinger,
    accent: '#f0b36a',
    preview: { row: 25, frames: 5, fps: 6 },
  },
  {
    id: 'white',
    name: 'Gato blanco',
    sprite: catSpriteWhite,
    accent: '#f8e9ff',
    preview: { row: 25, frames: 5, fps: 6 },
  },
];

export function getCatById(catId) {
  return CATS.find((cat) => cat.id === catId) ?? CATS[0];
}
