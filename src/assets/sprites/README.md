# 📁 assets/sprites/

Coloca aquí el sprite sheet del gatito.

## Archivo esperado
- `cat-sprite.png` — sprite sheet principal del gatito pixel art

## Especificaciones
- Tamaño por frame: **64×64 px**
- Columnas: **14**
- Filas: **72** (1008 frames en total)
- Fondo: **transparente** (PNG con canal alfa)

## Animaciones (confirmar filas con el archivo)
| Animación | Fila | Frames | FPS |
|-----------|------|--------|-----|
| idle      | 0    | 4      | 6   |
| walk      | 1    | 8      | 12  |
| run       | 2    | 8      | 16  |
| jump      | 3    | 4      | 10  |
| land      | 4    | 3      | 10  |

> Ajusta las filas en `src/hooks/useCatAnimation.js` → constante `ANIMATIONS`
> según lo que veas en el archivo `black cat with text.png`.
