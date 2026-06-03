# 📁 assets/audio/

Coloca aquí los archivos de audio del portafolio.

## Archivos esperados

| Archivo             | Tipo           | Descripción                        |
|---------------------|----------------|------------------------------------|
| `bg-music.mp3`      | Música de fondo| Loop principal (lo-fi / dreamy)    |
| `jump.mp3`          | Efecto de sonido| Sonido al saltar                  |
| `land.mp3`          | Efecto de sonido| Sonido al aterrizar               |
| `portal.mp3`        | Efecto de sonido| Sonido al entrar a un portal      |
| `click.mp3`         | Efecto de sonido| Click en objeto clickeable        |

## Especificaciones
- Formato: **MP3** (amplia compatibilidad)
- Música de fondo: loop seamless, volumen bajo (~0.4)
- Efectos: cortos (< 1 segundo), volumen medio (~0.7)

## Uso
Los sonidos se reproducen con el hook `useSound` en `src/hooks/useSound.js`:
```js
const { playSound } = useSound();
playSound('/assets/audio/jump.mp3', { volume: 0.7 });
```

## Sugerencias de fuentes gratuitas
- https://freesound.org
- https://pixabay.com/music/
- https://opengameart.org
