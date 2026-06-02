import {
  screenshotFlowdesk,
  screenshotGallery,
  screenshotMusic,
  screenshotEpic,
  screenshotEstacion,
} from '../assets/index';

export const projects = [
  {
    id: 1,
    title: 'FlowDesk',
    shortDesc: 'Sistema de gestión de inventarios',
    longDescription:
      'Plataforma multiempresa para la gestión de inventarios, movimientos de stock, empleados y analíticas. Incluye sistema de autenticación con roles, importación de productos desde Excel y panel de análisis.',
    tech: ['Vue 3', 'TypeScript', 'Go', 'PostgreSQL', 'Docker', 'JWT'],
    github: 'https://github.com/MagicBag-tab/flowdesk-frt',
    demo: '',
    pokemon: 'pikachu',
    color: '#3498db',
    screenshot: screenshotFlowdesk,
  },
  {
    id: 2,
    title: 'Magic Bag Gallery',
    shortDesc: 'Galería de arte contemporáneo',
    longDescription:
      'Aplicación web para gestionar el inventario y ventas de una galería de arte. Incluye catálogo público, gestión de artistas y colecciones, tours guiados con reservas, y reportes con exportación CSV.',
    tech: ['React 18', 'Go', 'PostgreSQL', 'JWT', 'Docker', 'Recharts'],
    github: 'https://github.com/MagicBag-tab/magic-bag-gallery-api',
    demo: '',
    pokemon: 'eevee',
    color: '#9b59b6',
    screenshot: screenshotGallery,
  },
  {
    id: 3,
    title: 'Music Mood API',
    shortDesc: 'Tracker de ánimo generado por canciones',
    longDescription:
      'API REST para gestionar canciones clasificadas por estado de ánimo, con artistas, álbumes y sistema de ratings. Sin frameworks, construida con net/http puro.',
    tech: ['Go', 'PostgreSQL', 'Docker', 'Swagger'],
    github: 'https://github.com/MagicBag-tab/music-mood-api',
    demo: 'https://music-mood-api-1.onrender.com',
    pokemon: 'bulbasaur',
    color: '#2ecc71',
    screenshot: screenshotMusic,
  },
  {
    id: 4,
    title: 'Epic: The Musical API',
    shortDesc: 'API de sagas y canciones',
    longDescription:
      'API RESTful para gestionar las sagas y canciones del musical Epic: The Musical, construida en Go puro con SQLite. Incluye datos semilla del musical completo.',
    tech: ['Go', 'SQLite', 'Docker'],
    github: 'https://github.com/MagicBag-tab/epic-api',
    demo: '',
    pokemon: 'snorlax',
    color: '#e74c3c',
    screenshot: screenshotEpic,
  },
  {
    id: 5,
    title: 'Recomendaciones de Videojuegos',
    shortDesc: 'Interfaz de personalización',
    longDescription:
      'Interfaz para visualizar recomendaciones personalizadas de videojuegos obtenidas mediante una API externa. Proyecto académico.',
    tech: ['React', 'JavaScript', 'Vite', 'API REST'],
    github: '',
    demo: '',
    pokemon: 'gengar',
    color: '#f1c40f',
    screenshot: null,
  },
  {
    id: 6,
    title: 'Estación Meteorológica',
    shortDesc: 'Sistema embebido IoT y CUDA',
    longDescription:
      'Sistema embebido de captura de datos meteorológicos en tiempo real mediante sensores conectados a un ESP32. Procesamiento en GPU usando CUDA. Proyecto académico.',
    tech: ['C++', 'C', 'ESP32', 'CUDA', 'IoT'],
    github: '',
    demo: '',
    pokemon: 'pikachu', // reutilizado
    color: '#e67e22',
    screenshot: screenshotEstacion,
  },
];
