// =========================================
// Imports de assets — sprites del gatito
// Usamos "cat 1" (gatito negro) como protagonista
// =========================================

// Sprite sheet principal
import catSprite from '../assets/sprites/cat 1 (64х64).png';

// Exportamos para uso en componentes
export { catSprite };

// Variantes disponibles (para posible selector futuro)
// import catSprite2 from '../assets/sprites/cat 2 (64х64).png'; // gatito café
// import catSprite3 from '../assets/sprites/cat 3 (64х64).png'; // gatito gris

// ─── Backgrounds ───────────────────────────────────────────────────────────────
import skyBg         from '../assets/backgrounds/sky.png';
import cloudsFar     from '../assets/backgrounds/clauds-far.png';
import cloudsNear1   from '../assets/backgrounds/clauds-near-1.png';
import cloudsNear2   from '../assets/backgrounds/clauds-near-2.png';
import mountainsBg   from '../assets/backgrounds/mountains.png';
import groundBg      from '../assets/backgrounds/ground.png';
import groundFlowers from '../assets/backgrounds/ground-flowers.png';

// Nubes pixel art individuales (animadas A/B)
import cloudA1 from '../assets/backgrounds/claud-a1.png';
import cloudB1 from '../assets/backgrounds/claud-b1.png';
import cloudA2 from '../assets/backgrounds/claud-a2.png';
import cloudB2 from '../assets/backgrounds/claud-b2.png';

export {
  skyBg,
  cloudsFar,
  cloudsNear1,
  cloudsNear2,
  mountainsBg,
  groundBg,
  groundFlowers,
  cloudA1, cloudB1,
  cloudA2, cloudB2,
};

// ─── Flores decorativas ────────────────────────────────────────────────────────
import flower1 from '../assets/flowers/flower-1.png'; // lily rosa pixel art
import flower2 from '../assets/flowers/flower-2.png'; // lily blanca pixel art
import flower3 from '../assets/flowers/flower-3.png'; // daisy blanca pixel art
import petal   from '../assets/flowers/petal.png';
import star    from '../assets/flowers/star.png';

export { flower1, flower2, flower3, petal, star };

// ─── Audio ─────────────────────────────────────────────────────────────────────
import bgMusic1 from '../assets/audio/bg_music-1.wav';
import bgMusic2 from '../assets/audio/bg-music-2.wav';
import jumpSfx  from '../assets/audio/jump.wav';
import clickSfx from '../assets/audio/click.wav';

export { bgMusic1, bgMusic2, jumpSfx, clickSfx };
