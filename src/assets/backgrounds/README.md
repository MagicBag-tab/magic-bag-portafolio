# 📁 assets/backgrounds/

Coloca aquí las imágenes de fondo para las capas del parallax.

## Archivos esperados

Cada capa del parallax tiene su propio archivo:

| Archivo              | Descripción                              | Velocidad parallax |
|----------------------|------------------------------------------|--------------------|
| `sky.png`            | Cielo degradado (capa más lejana)        | 0.05               |
| `clouds-far.png`     | Nubes lejanas (pequeñas, difusas)        | 0.15               |
| `clouds-near.png`    | Nubes cercanas (más grandes)             | 0.25               |
| `mountains.png`      | Montañas / colinas en el horizonte       | 0.4                |
| `ground.png`         | Suelo / hierba (capa más cercana)        | 1.0                |

## Especificaciones
- Formato: **PNG con fondo transparente** (excepto el cielo)
- Ancho recomendado: **≥ 2048 px** (para cubrir el scroll)
- Las capas de nubes vienen en par A/B para intercambiar animado (opcional)

## Nubes animadas (versiones A y B)
- `cloud-a1.png`, `cloud-b1.png` — primera nube
- `cloud-a2.png`, `cloud-b2.png` — segunda nube
- (etc.)

> Para usar estos archivos, actualiza `GameWorld.jsx` → array `PARALLAX_LAYERS`
> y agrega `imageUrl: '/assets/backgrounds/sky.png'` a cada capa.
