// =========================================
// DATOS DE PROYECTOS — portafolio
// Rellena con tu info real cuando estés lista
// =========================================

export const projects = [
  {
    id: 1,
    title: 'Magic Portfolio',
    shortDesc: 'Portafolio interactivo 2D',
    longDescription:
      'Un portafolio personal único construido con React + Vite. El usuario controla un gatito pixel art que navega por un mundo 2D con parallax para descubrir las secciones del portafolio.',
    tech: ['React', 'Vite', 'JavaScript', 'CSS Modules'],
    github: 'https://github.com/tu-usuario/magic-portfolio',
    demo: 'https://tu-demo.vercel.app',
    video: '',
    screenshot: '',
    pokemon: 'pikachu',     // pokémon guardián de esta sala
    doorX: 4350,            // posición de su puerta en el mundo (= DOOR_START_X)
    color: '#FFD700',       // color acento de esta sala
  },
  {
    id: 2,
    title: 'Proyecto Dos',
    shortDesc: 'Aplicación web full-stack',
    longDescription:
      'Descripción más larga con detalles de implementación, retos y soluciones del segundo proyecto.',
    tech: ['Vue', 'Node.js', 'MongoDB'],
    github: 'https://github.com/tu-usuario/proyecto-dos',
    demo: '',
    video: '',
    screenshot: '',
    pokemon: 'eevee',
    doorX: 4570,            // DOOR_START_X + DOOR_SPACING
    color: '#C77DFF',
  },
  {
    id: 3,
    title: 'Proyecto Tres',
    shortDesc: 'API REST con base de datos',
    longDescription:
      'Descripción más larga con detalles de implementación del tercer proyecto.',
    tech: ['Python', 'Flask', 'PostgreSQL'],
    github: 'https://github.com/tu-usuario/proyecto-tres',
    demo: 'https://proyecto-tres.vercel.app',
    video: '',
    screenshot: '',
    pokemon: 'bulbasaur',
    doorX: 4790,            // DOOR_START_X + DOOR_SPACING * 2
    color: '#80ED99',
  },
];
