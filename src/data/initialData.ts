import { Poste, ModeleTest, Candidature, Collaborateur, DemandeDevis, Tache } from '../types';

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

export const INITIAL_TEST_TEMPLATES: ModeleTest[] = [
  {
    id: 'test-dev-front',
    posteId: 'poste-dev-front',
    titre: 'Défi Front-end : Composant interactif de suivi de commande AgenceExpress',
    consignes: `Concevoir une interface mobile-first en React (ou HTML/Tailwind) pour une plateforme de livraison locale à Ouagadougou.
1. Afficher la carte récapitulative de la commande avec le statut étape par étape (Validée -> Préparation -> En cours de livraison à Wayalghin -> Livrée).
2. Inclure un bouton d'action interactif avec retour visuel immédiat (Appel au livreur ou géolocalisation WhatsApp).
3. Le code doit être propre, accessible et fluide sans temps de chargement lourd sur les réseaux mobiles locaux.`,
    livrablesAttendus: [
      'Lien vers dépôt GitHub ou Sandbox (CodeSandbox, StackBlitz)',
      'Lien vers démo en ligne active (Vercel, Netlify) ou archive zip',
      'Brève note explicative sur les choix d’optimisation mobile',
    ],
    typeRendu: 'mixte',
    delaiJours: 3,
    criteresEvaluation: [
      'Fidélité ergonomique et propreté du design mobile',
      'Qualité et organisation du code React/TypeScript',
      'Performance et fluidité sur mobile (3G/4G)',
      'Respect des délais de soumission',
    ],
    derniereModification: '2026-08-20',
  },
  {
    id: 'test-cm',
    posteId: 'poste-cm',
    titre: 'Mise en situation CM : Lancement d’une marque locale bio à Ouagadougou',
    consignes: `La marque "SahelNectar" lance sa nouvelle gamme de jus de bissap et gingembre bio en bouteille premium.
1. Rédiger 2 publications distinctes :
   - Un post d’annonce pour Facebook (ton convivial, appel au partage, mise en avant des points de vente à Ouaga et Bobo).
   - Un script court pour vidéo TikTok / Reel (accroche 3 premières secondes, mise en scène, appel à l'action WhatsApp).
2. Proposer un calendrier éditorial condensé sur 7 jours avec thèmes et objectifs.`,
    livrablesAttendus: [
      'Texte rédigé des 2 publications (avec hashtags ciblés et emojis pertinents)',
      'Scénario de la vidéo Reel/TikTok (accroche + visuel suggéré)',
      'Tableau du calendrier 7 jours (Google Docs ou Notion ou texte structuré)',
    ],
    typeRendu: 'texte',
    delaiJours: 2,
    criteresEvaluation: [
      'Puissance de l’accroche et pertinence du ton culturel burkinabè',
      'Structure logique du calendrier de lancement',
      'Qualité de la syntaxe et orthographe irréprochable',
    ],
    derniereModification: '2026-08-22',
  },
  {
    id: 'test-videaste',
    posteId: 'poste-videaste',
    titre: 'Brief Réalisation : Spot promotionnel 30 secondes "Digitalisez votre PME"',
    consignes: `Créer ou scénariser un spot dynamique de 30 secondes s'adressant aux commerçants et PME du Burkina Faso pour les inciter à créer leur site web et booster leur présence.
1. Si vous avez déjà tourné des projets : partager un lien direct vers 1 à 2 vidéos courtes représentatives de votre style (Drive, YouTube, Instagram).
2. Fournir un découpage technique/storyboard écrit de 30 secondes (Plans, musiques/effets sonores, textes incrustés à l'écran).`,
    livrablesAttendus: [
      'Lien direct vers 1 vidéo courte réalisée (portfolio/démo active)',
      'Script écrit minute par minute (découpage visuel + son)',
    ],
    typeRendu: 'lien',
    delaiJours: 3,
    criteresEvaluation: [
      'Dynamisme du rythme et découpage des plans',
      'Clarté du message commercial en moins de 30 secondes',
      'Qualité technique de l’étalonnage et du son',
    ],
    derniereModification: '2026-08-25',
  },
  {
    id: 'test-graphiste',
    posteId: 'poste-graphiste',
    titre: 'Création d’identité visuelle : Logo & badge pour "Sahel AgriTech"',
    consignes: `Sahel AgriTech est une jeune entreprise burkinabè qui connecte les producteurs maraîchers aux marchés urbains via le mobile.
1. Imaginer le logo principal (symbole + typographie) inspiré de l'agriculture moderne et de l'innovation sahélienne.
2. Décliner le logo sur fond blanc et sur fond sombre.
3. Proposer une palette de 3 couleurs principales avec codes HEX et une maquette miniature de carte de visite ou bannière réseaux sociaux.`,
    livrablesAttendus: [
      'Lien Figma, Behance, Google Drive ou export PDF/PNG des propositions',
      'Courte note expliquant la symbolique du visuel retenu',
    ],
    typeRendu: 'lien',
    delaiJours: 3,
    criteresEvaluation: [
      'Originalité et force symbolique du logo',
      'Harmonie des couleurs et choix typographiques',
      'Rigueur des fichiers et de la présentation',
    ],
    derniereModification: '2026-08-26',
  },
];

export const INITIAL_CANDIDATURES: Candidature[] = [
  {
    id: 'cand-001',
    codeSuivi: 'AOS-DEV-9120',
    posteId: 'poste-dev-front',
    statut: 'en_evaluation',
    dateCreation: '2026-09-02T10:30:00Z',
    testAssigneId: 'test-dev-front',
    tokenAccesTest: 'test-token-abdoul-9120',
    candidat: {
      nom: 'Abdoul Kader Ouedraogo',
      email: 'abdoul.kader.dev@gmail.com',
      telephone: '+226 70 23 45 67',
      ville: 'Ouagadougou (Karpala)',
      anneesExperience: '3 ans',
      portfolioUrl: 'https://kader-dev.tech',
      githubUrl: 'https://github.com/abdoul-kader-bf',
      presentation: 'Passionné de React et Next.js, j’ai déjà développé des solutions de gestion de stock et plusieurs sites e-commerce pour des boutiques de Ouaga.',
    },
    soumission: {
      id: 'sub-001',
      candidatureId: 'cand-001',
      modeleTestId: 'test-dev-front',
      contenuTexte: `J'ai réalisé le composant avec React 19, Tailwind CSS et des icônes Lucide.
J'ai particulièrement soigné la légèreté du bundle pour que le chargement soit quasi instantané sur les connexions 3G/4G locales à Ouaga.
L'intégration WhatsApp utilise directement l'API wa.me avec un message pré-rempli contenant le numéro de suivi.`,
      liensExternes: [
        'https://github.com/abdoul-kader-bf/agence-express-tracker',
        'https://agence-express-preview.vercel.app',
      ],
      nomFichierSimule: 'agenceos-tracker-component.zip',
      tailleFichierSimule: '1.2 Mo',
      dateSoumission: '2026-09-04T15:20:00Z',
      noteDirecteur: 17,
      commentaireDirecteur: 'Excellente maîtrise technique. Le code est propre, bien structuré et la version mobile est impeccable.',
    },
    historique: [
      { date: '2026-09-02T10:30:00Z', statut: 'recue', message: 'Candidature enregistrée en ligne' },
      { date: '2026-09-02T10:32:00Z', statut: 'test_en_cours', message: 'Lien privé unique de test généré' },
      { date: '2026-09-04T15:20:00Z', statut: 'en_evaluation', message: 'Test soumis par le candidat, en attente de décision du Directeur' },
    ],
  },
  {
    id: 'cand-002',
    codeSuivi: 'AOS-CM-4081',
    posteId: 'poste-cm',
    statut: 'test_en_cours',
    dateCreation: '2026-09-04T09:15:00Z',
    testAssigneId: 'test-cm',
    tokenAccesTest: 'test-token-fatimata-4081',
    candidat: {
      nom: 'Fatimata Sanogo',
      email: 'sanogo.fatima.pro@gmail.com',
      telephone: '+226 76 89 12 34',
      ville: 'Bobo-Dioulasso',
      anneesExperience: '2 ans',
      portfolioUrl: 'https://linkedin.com/in/fatimata-sanogo-cm',
      presentation: 'Spécialiste du storytelling sur les réseaux sociaux. J’ai géré la communauté d’une marque de cosmétique locale avec +15k abonnés.',
    },
    historique: [
      { date: '2026-09-04T09:15:00Z', statut: 'recue', message: 'Candidature enregistrée en ligne' },
      { date: '2026-09-04T09:16:00Z', statut: 'test_en_cours', message: 'Test privé ouvert. Délai restant : 2 jours' },
    ],
  },
  {
    id: 'cand-003',
    codeSuivi: 'AOS-GR-7734',
    posteId: 'poste-graphiste',
    statut: 'validee',
    dateCreation: '2026-08-28T14:00:00Z',
    testAssigneId: 'test-graphiste',
    tokenAccesTest: 'test-token-ibrahim-7734',
    candidat: {
      nom: 'Ibrahim Traoré',
      email: 'ibrahim.design.agenceos@gmail.com',
      telephone: '+226 78 50 11 22',
      ville: 'Ouagadougou (Dassasgho)',
      anneesExperience: '4 ans',
      portfolioUrl: 'https://behance.net/ibrahim-traore-art',
      presentation: 'Designer d’identité visuelle et UI/UX designer. Passionné par l’alliance des motifs contemporains et du minimalisme international.',
    },
    soumission: {
      id: 'sub-003',
      candidatureId: 'cand-003',
      modeleTestId: 'test-graphiste',
      contenuTexte: `Proposition de marque pour Sahel AgriTech :
J'ai conçu un monogramme combinant un épi stylisé et des ondes de connectivité numérique.
Palette sélectionnée : Vert Ocre (#2D6A4F) représentant la fertilité, Or Soleil (#E0A96D) et Bleu Nuit tech (#1D2D44).`,
      liensExternes: [
        'https://figma.com/@ibrahim/sahel-agritech-brand-kit',
        'https://behance.net/gallery/sahel-agritech-case',
      ],
      dateSoumission: '2026-08-30T17:45:00Z',
      noteDirecteur: 19,
      commentaireDirecteur: 'Travail remarquable, respect absolu du brief et de la culture locale. Profil très prometteur.',
      dateEvaluation: '2026-08-31T11:00:00Z',
    },
    historique: [
      { date: '2026-08-28T14:00:00Z', statut: 'recue', message: 'Candidature enregistrée' },
      { date: '2026-08-28T14:02:00Z', statut: 'test_en_cours', message: 'Accès au test attribué' },
      { date: '2026-08-30T17:45:00Z', statut: 'en_evaluation', message: 'Test soumis par le candidat' },
      { date: '2026-08-31T11:00:00Z', statut: 'validee', message: 'Candidature validée par le Directeur. Compte Collaborateur créé.' },
    ],
  },
  {
    id: 'cand-004',
    codeSuivi: 'AOS-VID-1209',
    posteId: 'poste-videaste',
    statut: 'refusee',
    dateCreation: '2026-08-24T16:20:00Z',
    testAssigneId: 'test-videaste',
    tokenAccesTest: 'test-token-moussa-1209',
    candidat: {
      nom: 'Moussa Sawadogo',
      email: 'sawadogo.moussa.vid@yahoo.fr',
      telephone: '+226 65 14 28 90',
      ville: 'Koudougou',
      anneesExperience: '1 an',
      presentation: 'Débutant en montage CapCut et tournage smartphone.',
    },
    soumission: {
      id: 'sub-004',
      candidatureId: 'cand-004',
      modeleTestId: 'test-videaste',
      contenuTexte: 'Lien Drive vers un montage rapide.',
      liensExternes: ['https://drive.google.com/open?id=demo-sawadogo'],
      dateSoumission: '2026-08-27T18:00:00Z',
      noteDirecteur: 10,
      commentaireDirecteur: 'Qualité audio insuffisante pour nos standards actuels, rythme trop lent. Encouragé à perfectionner son sound design et re-postuler.',
      dateEvaluation: '2026-08-28T09:00:00Z',
    },
    historique: [
      { date: '2026-08-24T16:20:00Z', statut: 'recue', message: 'Candidature enregistrée' },
      { date: '2026-08-24T16:21:00Z', statut: 'test_en_cours', message: 'Test privé généré' },
      { date: '2026-08-27T18:00:00Z', statut: 'en_evaluation', message: 'Test soumis' },
      { date: '2026-08-28T09:00:00Z', statut: 'refusee', message: 'Candidature non retenue suite à l’évaluation du test' },
    ],
  },
];

export const INITIAL_COLLABORATEURS: Collaborateur[] = [
  {
    id: 'collab-001',
    nom: 'Inoussa Compaoré',
    email: 'inoussa.compaore@agenceos.bf',
    telephone: '+226 70 88 99 00',
    ville: 'Ouagadougou (Ouaga 2000)',
    posteId: 'poste-dev-front',
    dateEntree: '2026-07-01',
    statut: 'actif',
    ajouteManuellement: true, // Collaborateur de confiance intégré direct par le directeur
    specialite: 'Lead Front-end & Intégration React / Tailwind / TypeScript',
    projetsEnCours: 2,
    notes: 'Développeur expérimenté, binôme de confiance du Directeur sur les architectures d’applications.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    numeroMembre: 'AOS-MBR-2026-001',
    motDePasse: 'collab123',
    qrCodeData: 'AGENCEOS://MEMBER/AOS-MBR-2026-001/INOUSSA-COMPAORE/DEV-FRONTEND',
    chatMetadata: {
      lastSeen: '2026-09-06T07:15:00Z',
      channels: ['general', 'pole-dev-sur-mesure', 'projets-en-cours'],
      isOnline: true
    }
  },
  {
    id: 'collab-002',
    nom: 'Ibrahim Traoré',
    email: 'ibrahim.design.agenceos@gmail.com',
    telephone: '+226 78 50 11 22',
    ville: 'Ouagadougou (Dassasgho)',
    posteId: 'poste-graphiste',
    dateEntree: '2026-08-31',
    statut: 'actif',
    ajouteManuellement: false, // Issu de la validation du test candidat (cand-003)
    sourceCandidatureId: 'cand-003',
    specialite: 'Branding, Logos vectoriels & UI Design',
    projetsEnCours: 1,
    notes: 'Recruté via le test privé (note: 19/20). Très autonome et créatif.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    numeroMembre: 'AOS-MBR-2026-002',
    motDePasse: 'collab123',
    qrCodeData: 'AGENCEOS://MEMBER/AOS-MBR-2026-002/IBRAHIM-TRAORE/DESIGN-BRANDING',
    chatMetadata: {
      lastSeen: '2026-09-06T06:50:00Z',
      channels: ['general', 'pole-identite-reseaux'],
      isOnline: true
    }
  },
  {
    id: 'collab-003',
    nom: 'Aïcha Guira',
    email: 'aicha.guira@agenceos.bf',
    telephone: '+226 71 33 44 55',
    ville: 'Ouagadougou (Zone du Bois)',
    posteId: 'poste-cm',
    dateEntree: '2026-07-15',
    statut: 'actif',
    ajouteManuellement: true, // Connaissance de confiance
    specialite: 'Social Media Manager & Stratégie d’Influence',
    projetsEnCours: 2,
    notes: 'Partenaire de communication de confiance. Excellente gestion des campagnes et conversion.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    numeroMembre: 'AOS-MBR-2026-003',
    motDePasse: 'collab123',
    qrCodeData: 'AGENCEOS://MEMBER/AOS-MBR-2026-003/AICHA-GUIRA/COMMUNITY-MANAGER',
    chatMetadata: {
      lastSeen: '2026-09-05T18:30:00Z',
      channels: ['general', 'pole-identite-reseaux', 'campagnes-ads'],
      isOnline: false
    }
  },
];

export const INITIAL_TACHES: Tache[] = [
  // Tâches pour Inoussa Compaoré (collab-001)
  {
    id: 'task-001',
    collaborateurId: 'collab-001',
    titre: 'Intégration du catalogue responsive mobile et tunnel WhatsApp',
    description: 'Développer le composant de catalogue interactif pour la cliente Kadiatou Couture avec sélection des modèles et bouton de commande directe via WhatsApp.',
    projetNom: 'Kadiatou Couture & Créations',
    statut: 'en_cours',
    priorite: 'haute',
    dateAssignation: '2026-09-02T10:00:00Z',
    dateLivraisonEstimee: '2026-09-10T18:00:00Z',
    tempsEstimeHeures: 24,
    tempsPasseHeures: 16,
    livrablesAttendus: [
      'Composant React mobile-first avec filtres par catégorie',
      'Intégration du pré-remplissage du panier dans le message WhatsApp'
    ],
    poleServiceId: 'accompagnement_boutique',
    commentaireDirecteur: 'Super début d\'intégration. Veiller à la compression WebP des photos pour préserver les connexions 3G.'
  },
  {
    id: 'task-002',
    collaborateurId: 'collab-001',
    titre: 'Refonte de l\'interface de prise de rendez-vous en ligne',
    description: 'Concevoir l\'interface de sélection des créneaux horaires médicaux avec synchronisation de calendrier pour la Clinique de la Paix.',
    projetNom: 'Clinique de la Paix Ouaga',
    statut: 'a_faire',
    priorite: 'normale',
    dateAssignation: '2026-09-05T09:00:00Z',
    dateLivraisonEstimee: '2026-09-18T18:00:00Z',
    tempsEstimeHeures: 32,
    tempsPasseHeures: 0,
    livrablesAttendus: [
      'Calendrier hebdomadaire interactif',
      'Validation de formulaire avec confirmation par SMS / WhatsApp'
    ],
    poleServiceId: 'dev_sur_mesure'
  },
  {
    id: 'task-003',
    collaborateurId: 'collab-001',
    titre: 'Optimisation de la vitesse et compatibilité Offline-First PWA',
    description: 'Mise en cache du service worker et optimisation du build pour un chargement en moins de 1,5 seconde sur smartphone 3G à Ouaga.',
    projetNom: 'Plateforme Logistique Sanfo',
    statut: 'validee',
    priorite: 'haute',
    dateAssignation: '2026-08-15T08:00:00Z',
    dateLivraisonEstimee: '2026-08-25T18:00:00Z',
    dateLivraisonReelle: '2026-08-24T16:30:00Z',
    tempsEstimeHeures: 20,
    tempsPasseHeures: 18,
    livrablesAttendus: ['Rapport Lighthouse > 95', 'Service worker actif sans régression'],
    lienLivrable: 'https://github.com/agenceos-bf/sanfo-logistics-core/pull/12',
    noteDirecteur: 'Validation Directeur : Performance excellente, score Lighthouse mobile à 98/100.',
    poleServiceId: 'dev_sur_mesure'
  },
  {
    id: 'task-004',
    collaborateurId: 'collab-001',
    titre: 'Composants du formulaire de devis dynamique AgenceOS',
    description: 'Intégration du sélecteur à 4 pôles de service et calcul d\'estimation budgétaire en FCFA.',
    projetNom: 'Portail Interne AgenceOS',
    statut: 'terminee',
    priorite: 'normale',
    dateAssignation: '2026-08-01T09:00:00Z',
    dateLivraisonEstimee: '2026-08-08T18:00:00Z',
    dateLivraisonReelle: '2026-08-07T14:00:00Z',
    tempsEstimeHeures: 16,
    tempsPasseHeures: 14,
    livrablesAttendus: ['Composant modal accessible', 'Validation des champs obligatoires'],
    lienLivrable: 'https://github.com/agenceos-bf/portal/pull/4',
    noteDirecteur: 'Validé avec félicitations.',
    poleServiceId: 'fondation_deploiement'
  },

  // Tâches pour Ibrahim Traoré (collab-002 - Graphiste)
  {
    id: 'task-005',
    collaborateurId: 'collab-002',
    titre: 'Conception de l\'identité visuelle et charte graphique complète',
    description: 'Création du logotype vectoriel, choix des typographies, palette chromatique et déclinaisons papeterie/kakémono.',
    projetNom: 'Kadiatou Couture & Créations',
    statut: 'en_revue_directeur',
    priorite: 'haute',
    dateAssignation: '2026-09-01T11:00:00Z',
    dateLivraisonEstimee: '2026-09-07T17:00:00Z',
    tempsEstimeHeures: 16,
    tempsPasseHeures: 15,
    livrablesAttendus: [
      'Logo vectoriel SVG/EPS (version principale, monochrome, icône)',
      'Guide des normes graphiques PDF (12 pages)'
    ],
    lienLivrable: 'https://figma.com/@agenceos/kadiatou-couture-brand-guidelines',
    commentaireDirecteur: 'En cours de revue par le Directeur. Très belle harmonie des teintes ocre et or.'
  },
  {
    id: 'task-006',
    collaborateurId: 'collab-002',
    titre: 'Kit graphique & maquettes UI/UX Sahel AgriTech',
    description: 'Création des écrans clés de la web-app de gestion agricole et export des icônes SVG optimisées.',
    projetNom: 'Sahel AgriTech BF',
    statut: 'validee',
    priorite: 'haute',
    dateAssignation: '2026-08-25T14:00:00Z',
    dateLivraisonEstimee: '2026-08-30T18:00:00Z',
    dateLivraisonReelle: '2026-08-30T11:00:00Z',
    tempsEstimeHeures: 20,
    tempsPasseHeures: 19,
    livrablesAttendus: ['Maquettes desktop + mobile sur Figma', 'Assets vectoriels exportés'],
    lienLivrable: 'https://figma.com/@agenceos/sahel-agritech-ui-final',
    noteDirecteur: 'Validation Directeur : Respect parfait du barème et des contrastes WCAG AA.',
    poleServiceId: 'identite_reseaux'
  },

  // Tâches pour Aïcha Guira (collab-003 - Community Manager)
  {
    id: 'task-007',
    collaborateurId: 'collab-003',
    titre: 'Calendrier éditorial mensuel & rédaction des 12 publications',
    description: 'Élaboration de la stratégie de contenu Facebook et Instagram pour le lancement de la collection de rentrée.',
    projetNom: 'Kadiatou Couture & Créations',
    statut: 'en_cours',
    priorite: 'normale',
    dateAssignation: '2026-09-03T10:00:00Z',
    dateLivraisonEstimee: '2026-09-12T18:00:00Z',
    tempsEstimeHeures: 12,
    tempsPasseHeures: 8,
    livrablesAttendus: [
      'Grille éditoriale Google Sheets avec dates, visuels associés et accroches',
      'Brief des visuels pour le graphiste'
    ],
    poleServiceId: 'identite_reseaux'
  },
  {
    id: 'task-008',
    collaborateurId: 'collab-003',
    titre: 'Pilotage de la campagne Meta Ads SahelNectar (Bissap & Gingembre)',
    description: 'Création des audiences Ouagadougou et Bobo-Dioulasso, A/B testing des créas et modération des commentaires.',
    projetNom: 'SahelNectar Boissons Bio',
    statut: 'validee',
    priorite: 'urgente',
    dateAssignation: '2026-08-20T09:00:00Z',
    dateLivraisonEstimee: '2026-08-28T18:00:00Z',
    dateLivraisonReelle: '2026-08-28T16:00:00Z',
    tempsEstimeHeures: 18,
    tempsPasseHeures: 17,
    livrablesAttendus: ['Rapport de conversion publicitaire', 'Plus de 450 prospects qualifiés générés'],
    lienLivrable: 'https://docs.google.com/presentation/sahelnectar-campagne-bilan',
    noteDirecteur: 'Validation Directeur : Campagne ultra-rentable, ROAS supérieur à 3.4.',
    poleServiceId: 'identite_reseaux'
  }
];

export const INITIAL_DEVIS: DemandeDevis[] = [
  {
    id: 'dev-001',
    clientNom: 'Mme Kadiatou Ouedraogo',
    entreprise: 'Kadiatou Couture & Créations',
    email: 'kadi.couture.bf@gmail.com',
    telephone: '+226 70 12 34 56',
    ville: 'Ouagadougou (Centre-ville)',
    typeOffre: 'digitalisation_az',
    servicesRequis: ['Identité visuelle (Logo + Charte)', 'Site vitrine e-catalogue', 'Création des pages Facebook & TikTok'],
    budgetEstime: '450 000 - 650 000 FCFA',
    descriptionProjet: 'Nous ouvrons un nouvel atelier de confection de prêt-à-porter traditionnel et moderne. Nous avons besoin de tout créer de zéro pour attirer les clients locaux et la diaspora.',
    dateDemande: '2026-09-03T14:20:00Z',
    statut: 'contacte',
    notesDirecteur: 'Premier échange téléphonique très positif. Rendez-vous prévu pour valider la liste des collections à présenter.',
  },
  {
    id: 'dev-002',
    clientNom: 'Dr. Salifou Zoungrana',
    entreprise: 'Clinique de la Paix',
    email: 'contact@clinique-paix-ouaga.com',
    telephone: '+226 76 55 44 33',
    ville: 'Ouagadougou (Somgandé)',
    typeOffre: 'boost_digital',
    servicesRequis: ['Refonte du site web existant', 'Module de prise de rendez-vous en ligne', 'Production de 3 vidéos de présentation'],
    budgetEstime: '850 000 - 1 200 000 FCFA',
    descriptionProjet: 'Notre site actuel a été fait en 2018 et n’est pas adapté aux téléphones. Nous voulons fluidifier l’accès aux consultations et moderniser notre image.',
    dateDemande: '2026-09-05T08:45:00Z',
    statut: 'nouveau',
    notesDirecteur: 'Projet à fort potentiel. Préparer une démo du module de prise de RDV mobile.',
  },
  {
    id: 'dev-003',
    clientNom: 'Boureima Sanfo',
    entreprise: 'Sanfo Distribution & Logistique',
    email: 'b.sanfo@sanfo-distrib.bf',
    telephone: '+226 78 99 88 77',
    ville: 'Bobo-Dioulasso',
    typeOffre: 'sur_mesure',
    servicesRequis: ['Application web interne de suivi des camions', 'Formation de l’équipe'],
    budgetEstime: '1 500 000 - 2 500 000 FCFA',
    descriptionProjet: 'Digitalisation des bons de livraison et suivi en temps réel des tournées entre Ouaga, Bobo et frontières.',
    dateDemande: '2026-08-29T11:10:00Z',
    statut: 'devis_envoye',
    notesDirecteur: 'Proposition technique envoyée le 31 août. En attente de signature du bon de commande.',
  },
];

