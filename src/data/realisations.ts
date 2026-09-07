import { PoleServiceId } from '../types';

export type RealisationStatut = 'livree' | 'en_cours';

export interface Realisation {
  id: string;
  poleServiceId: PoleServiceId;
  titre: string;
  contexte: string;
  realisation: string;
  livrables: string[];
  technologies: string[];
  statut: RealisationStatut;
  annee: string;
}

// Fiches d'études de cas — à remplacer/étoffer par le Directeur
// au fil des vraies livraisons. Le site est conçu pour en accueillir beaucoup.
export const REALISATIONS: Realisation[] = [
  {
    id: 'real-01',
    poleServiceId: 'fondation_deploiement',
    titre: 'Site vitrine institutionnel — société de services',
    contexte: 'Entreprise en création souhaitant formaliser sa présence en ligne dès le premier jour.',
    realisation: 'Cadrage de la marque, conception et mise en ligne d’un site vitrine responsive, déploiement de l’infrastructure et configuration des outils de contact.',
    livrables: ['Site responsive', 'Hébergement + domaine .bf', 'Boîtes courriels', 'Formulaire de contact'],
    technologies: ['React', 'Tailwind CSS', 'Cloudflare DNS', 'SSL/TLS'],
    statut: 'livree',
    annee: '2026',
  },
  {
    id: 'real-02',
    poleServiceId: 'accompagnement_boutique',
    titre: 'Boutique en ligne — commerçant local',
    contexte: 'Commerçant déjà présent physiquement souhaitant vendre en continu sur Internet.',
    realisation: 'Catalogue de produits avec gestion de stock, bouton de commande WhatsApp et intégration des canaux de paiement Mobile Money.',
    livrables: ['Catalogue en ligne', 'Commande WhatsApp', 'Orange Money / Moov / Wave', 'Suivi mensuel'],
    technologies: ['E-Commerce', 'WhatsApp Business API', 'APIs Mobile Money'],
    statut: 'en_cours',
    annee: '2026',
  },
  {
    id: 'real-03',
    poleServiceId: 'dev_sur_mesure',
    titre: 'Portail métier — gestion de feuilles de route',
    contexte: 'Organisation ayant des processus internes à numériser au-delà du simple site vitrine.',
    realisation: 'Conception d’un portail sur mesure répondant à un processus spécifique, avec espace authentifié et interface de suivi.',
    livrables: ['Portail sur mesure', 'Espace authentifié', 'Interface de suivi', 'API sécurisée'],
    technologies: ['TypeScript', 'Node.js', 'PostgreSQL / Supabase'],
    statut: 'en_cours',
    annee: '2026',
  },
  {
    id: 'real-04',
    poleServiceId: 'identite_reseaux',
    titre: 'Identité visuelle & animation réseaux — marque locale',
    contexte: 'Marque souhaitant professionnaliser son image et sa communication en ligne.',
    realisation: 'Création d’une charte graphique cohérente et déploiement d’une stratégie éditoriale de contenus routée vers l’engagement de l’audience.',
    livrables: ['Logotype & charte', 'Calendrier éditorial', 'Annonce réseaux sociaux', 'Bannières & visuels'],
    technologies: ['Figma', 'Meta Business Suite', 'Production vidéo courte'],
    statut: 'livree',
    annee: '2026',
  },
];