import { PoleService } from '../types';

export const POLES_SERVICES: PoleService[] = [
  {
    id: 'fondation_deploiement',
    numero: 'Pôle 01',
    titre: 'Fondation et Déploiement',
    sousTitre: 'Mise en place complète de la présence numérique d’une entreprise qui démarre',
    descriptionCourte: 'Prise en charge intégrale de la création et du déploiement initial de votre socle numérique : site web vitrine ou institutionnel, architecture logicielle de base, boîtes courriels professionnelles et identité technique.',
    descriptionDetaillee: 'Ce pôle s’adresse spécifiquement aux entreprises naissantes, PME ou institutions traditionnelles au Burkina Faso qui effectuent leur premier pas vers la numérisation. Nous concevons un écosystème pérenne, sécurisé et conforme dès le premier jour, sans dette technique.',
    publicCible: 'Entreprises en création, nouvelles filiales, PME et commerces traditionnels formalisant leur canal numérique.',
    livrablesCles: [
      'Conception et mise en ligne du site web institutionnel ou vitrine (responsive mobile-first)',
      'Déploiement de l’infrastructure de base (hébergement haute disponibilité, certificats SSL, CDN)',
      'Configuration du nom de domaine officiel (.bf ou .com) et boîtes courriels professionnelles',
      'Intégration initiale des points de contact (formulaire de devis, redirection WhatsApp entreprise)',
      'Audit de conformité réglementaire locale (respect de la loi CIL du Burkina Faso)',
      'Guide technique d’administration remis à vos équipes pour une autonomie totale'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Cloudflare DNS', 'SSL/TLS', 'Infra Cloud'],
    delaiMoyen: '3 à 5 semaines',
    modeleTarifaire: 'Forfait clé en main en FCFA'
  },
  {
    id: 'accompagnement_boutique',
    numero: 'Pôle 02',
    titre: 'Accompagnement et Boutique Digitale',
    sousTitre: 'Suivi continu & solutions e-commerce pour les entreprises déjà présentes qui veulent se développer',
    descriptionCourte: 'Solutions e-commerce complètes et accompagnement opérationnel continu pour les entreprises disposant déjà d’une présence en ligne et souhaitant accélérer leurs ventes et fidéliser leur clientèle.',
    descriptionDetaillee: 'Déploiement de catalogues interactifs, boutiques marchandes fluides et modules d’encaissement direct adaptés aux habitudes de paiement locales (Orange Money, Moov Money, Wave, cartes bancaires). Suivi récurrent des performances de conversion et maintenance proactive.',
    publicCible: 'Commerçants, marques locales, distributeurs et entreprises de services souhaitant vendre en continu sur Internet.',
    livrablesCles: [
      'Création de boutique en ligne ou catalogue de produits avec gestion de stock en temps réel',
      'Passerelles de paiement Mobile Money intégrées (Orange Money, Moov Money, Wave) et virement',
      'Module de commande directe par panier ou via bouton WhatsApp pour le marché local',
      'Accompagnement continu : suivi mensuel des ventes, maintenance corrective et évolutive',
      'Optimisation continue du taux de conversion (CRO) et tunnels de paiement simplifiés',
      'Assistance technique dédiée et rapports périodiques d’activité commerciale'
    ],
    technologies: ['E-Commerce Engine', 'APIs Mobile Money', 'WhatsApp Business API', 'Dashboard Analytics'],
    delaiMoyen: '4 à 6 semaines + Suivi mensuel',
    modeleTarifaire: 'Mise en place + Abonnement d’accompagnement'
  },
  {
    id: 'dev_sur_mesure',
    numero: 'Pôle 03',
    titre: 'Développement Web & Mobile sur Mesure',
    sousTitre: 'Solutions logicielles avancées et applications métier répondant à des processus spécifiques',
    descriptionCourte: 'Conception et développement sur mesure de plateformes web complexes, portails intranet, ERP/CRM allégés et applications mobiles iOS/Android natives ou hybrides avec mode offline-first.',
    descriptionDetaillee: 'Pour les organisations ayant des exigences fonctionnelles uniques ne pouvant être satisfaites par des solutions sur étagère. Nous bâtissons des architectures robustes et résilientes face aux contraintes locales de connectivité sahélienne.',
    publicCible: 'Entreprises digitalisées, startups, ONG, institutions financières et sociétés de logistique.',
    livrablesCles: [
      'Développement de plateformes web métier complexes (portails clients, espaces partenaires, dashboards)',
      'Applications mobiles iOS et Android avec fonctionnement 100% offline et synchronisation automatique',
      'Conception d’APIs REST sécurisées et interfaçage avec vos systèmes informatiques existants',
      'Supervision technique assurée par un développeur full-stack expérimenté (code review systématique)',
      'Tests d’intrusion, audits de performance et sécurité des données sensibles',
      'Code source entièrement documenté et transféré au client à la livraison'
    ],
    technologies: ['TypeScript', 'React Native', 'Node.js', 'PostgreSQL / Supabase', 'PWA Offline', 'Docker'],
    delaiMoyen: '6 à 12 semaines selon cahier des charges',
    modeleTarifaire: 'Devis sur mesure selon spécifications'
  },
  {
    id: 'identite_reseaux',
    numero: 'Pôle 04',
    titre: 'Identité Digitale & Gestion de Réseaux Sociaux',
    sousTitre: 'Création de marque mémorable et animation stratégique de vos communautés en ligne',
    descriptionCourte: 'Valorisation globale de votre image de marque : conception de charte graphique et logotype, storytelling percutant, gestion professionnelle des réseaux sociaux (Facebook, TikTok, LinkedIn) et production vidéo.',
    descriptionDetaillee: 'Une présence technique ne suffit pas sans rayonnement ni crédibilité. Notre pôle créatif réunit graphistes designers, community managers et vidéastes pour produire des contenus à fort engagement qui transforment votre audience en clients fidèles.',
    publicCible: 'Marques en quête de notoriété, entreprises voulant professionnaliser leur communication et dirigeants.',
    livrablesCles: [
      'Création d’identité visuelle complète : logotype vectoriel, charte typographique et déclinaisons print/web',
      'Élaboration du calendrier éditorial stratégique mensuel et charte de modération',
      'Animation quotidienne et modération active de vos comptes sociaux (Facebook, TikTok, LinkedIn, Instagram)',
      'Production vidéo courte (Reels, TikTok, capsules 30s) avec sound design et habillage dynamique',
      'Conception graphique des bannières promotionnelles, affiches et visuels de campagne',
      'Gestion et optimisation des campagnes publicitaires ciblées (Meta Ads, TikTok Ads) en zone UEMOA'
    ],
    technologies: ['Figma', 'Illustrator', 'Premiere Pro / DaVinci', 'Meta Business Suite', 'TikTok Ads Manager'],
    delaiMoyen: 'Sprint continu mensuel',
    modeleTarifaire: 'Pack création ou Forfait mensuel régie'
  }
];
