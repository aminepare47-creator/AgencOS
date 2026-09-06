import { Poste } from '../types';

/**
 * Configuration initiale : uniquement les postes (métiers) officiels de l'agence,
 * structure métier permanente définie par le cahier des charges (§1 et §5).
 *
 * NOTE (préparation base de données) : les autres collections (candidatures,
 * collaborateurs, tâches, devis, tests) démarrent vides — toutes les données
 * réelles seront créées via l'application puis stockées en base (Supabase).
 * Plus aucune donnée de démonstration n'est embarquée dans le code.
 */
export const INITIAL_POSTES: Poste[] = [
  {
    id: 'poste-dev-front',
    nom: 'Développeur Front-end (React / Tailwind)',
    codeMetier: 'dev_frontend',
    descriptionCourte: 'Conception d’interfaces web et mobiles modernes, réactives et optimisées pour les réseaux d’Afrique de l’Ouest.',
    descriptionComplete: 'Vous serez chargé d’intégrer des maquettes UI précises, de développer des interfaces React/TypeScript ultra-rapides et d’assurer une ergonomie mobile irréprochable sur smartphones et connexions locales.',
    competencesCles: ['React / Vite', 'Tailwind CSS', 'TypeScript', 'Responsive Mobile-first', 'Consommation d’API REST'],
    ouvertRecrutement: true,
    typeContrat: 'Freelance / Mission',
    icone: 'Code2',
  },
  {
    id: 'poste-cm',
    nom: 'Community Manager & Stratège Social Media',
    codeMetier: 'community_manager',
    descriptionCourte: 'Gestion d’image de marque, création de contenus percutants et animation de communautés (Facebook, TikTok, LinkedIn).',
    descriptionComplete: 'Vous piloterez la voix des entreprises clientes sur les plateformes numériques burkinabè et sous-régionales. Vous concevrez des calendriers éditoriaux, rédigerez des accroches engageantes et suivrez les statistiques de conversion.',
    competencesCles: ['Stratégie de contenu', 'Copywriting engageant', 'Meta Business Suite', 'TikTok & Reels', 'Modération de communauté'],
    ouvertRecrutement: true,
    typeContrat: 'Freelance / Mission',
    icone: 'Megaphone',
  },
  {
    id: 'poste-videaste',
    nom: 'Vidéaste & Monteur Contenus Vidéo',
    codeMetier: 'videaste',
    descriptionCourte: 'Scénarisation, captation et montage de vidéos dynamiques (reels promotionnels, spots publicitaires, interviews de marques).',
    descriptionComplete: 'Vous produirez des vidéos courtes à fort impact visuel adaptées aux formats verticaux et publicitaires. Maîtrise du rythme, du sound design et des sous-titres captivants exigée.',
    competencesCles: ['Premiere Pro / CapCut Pro', 'Scénarisation courte', 'Colorimétrie & Sound design', 'Formats verticaux 9:16', 'Storytelling visuel'],
    ouvertRecrutement: true,
    typeContrat: 'Freelance / Mission',
    icone: 'Video',
  },
  {
    id: 'poste-graphiste',
    nom: 'Graphiste & Designer d’Identité Visuelle',
    codeMetier: 'graphiste',
    descriptionCourte: 'Création de logos uniques, chartes graphiques complètes, affiches publicitaires et déclinaisons print/digital.',
    descriptionComplete: 'Vous forgerez la signature visuelle des entreprises qui se créent ou se modernisent au Burkina Faso : logos mémorables, typographies équilibrées, visuels pour réseaux sociaux et supports physiques.',
    competencesCles: ['Adobe Illustrator / Photoshop', 'Figma', 'Identité de marque', 'Design vectoriel', 'Exportations print & web'],
    ouvertRecrutement: true,
    typeContrat: 'Freelance / Mission',
    icone: 'Palette',
  },
];

// Collections démarrant vides : toutes les données réelles viendront de la base (Supabase)
export const INITIAL_TEST_TEMPLATES = [];
export const INITIAL_CANDIDATURES = [];
export const INITIAL_COLLABORATEURS = [];
export const INITIAL_TACHES = [];
export const INITIAL_DEVIS = [];
