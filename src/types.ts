export type Role = 'visiteur' | 'candidat' | 'collaborateur' | 'directeur';

export type MetierType = 
  | 'dev_frontend' 
  | 'community_manager' 
  | 'videaste' 
  | 'graphiste'
  | 'autre';

// Les 4 Pôles Officiels de l'Agence
export type PoleServiceId = 
  | 'fondation_deploiement' 
  | 'accompagnement_boutique' 
  | 'dev_sur_mesure' 
  | 'identite_reseaux';

export interface PoleService {
  id: PoleServiceId;
  numero: string;
  titre: string;
  sousTitre: string;
  descriptionCourte: string;
  descriptionDetaillee: string;
  publicCible: string;
  livrablesCles: string[];
  technologies: string[];
  delaiMoyen: string;
  modeleTarifaire: string;
}

export interface Poste {
  id: string;
  nom: string;
  codeMetier: MetierType;
  descriptionCourte: string;
  descriptionComplete: string;
  competencesCles: string[];
  ouvertRecrutement: boolean;
  typeContrat: 'Freelance / Mission' | 'Temps partiel' | 'Projet';
  icone: string;
}

export type StatutCandidature = 
  | 'recue' 
  | 'test_en_cours' 
  | 'en_evaluation' 
  | 'validee' 
  | 'refusee';

export type TypeRenduTest = 'texte' | 'lien' | 'fichier' | 'mixte';

export interface ModeleTest {
  id: string;
  posteId: string;
  titre: string;
  consignes: string;
  livrablesAttendus: string[];
  typeRendu: TypeRenduTest;
  delaiJours: number;
  criteresEvaluation: string[];
  derniereModification: string;
}

export interface SoumissionTest {
  id: string;
  candidatureId: string;
  modeleTestId: string;
  contenuTexte: string;
  liensExternes: string[];
  nomFichierSimule?: string;
  tailleFichierSimule?: string;
  dateSoumission: string;
  noteDirecteur?: number; // sur 20 ou 10
  commentaireDirecteur?: string;
  evaluePar?: string;
  dateEvaluation?: string;
}

export interface CandidatInfo {
  nom: string;
  email: string;
  telephone: string;
  ville: string;
  anneesExperience: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  presentation: string;
}

export interface Candidature {
  id: string;
  codeSuivi: string; // ex: FD-CAND-8942
  candidat: CandidatInfo;
  posteId: string;
  statut: StatutCandidature;
  dateCreation: string;
  testAssigneId: string;
  tokenAccesTest: string; // Lien privé unique : /test/:tokenAccesTest
  soumission?: SoumissionTest;
  historique: Array<{
    date: string;
    statut: StatutCandidature;
    message: string;
  }>;
}

export interface Collaborateur {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  ville: string;
  posteId: string;
  dateEntree: string;
  statut: 'actif' | 'inactif';
  ajouteManuellement: boolean; // true si connaissance de confiance ajoutée par Directeur
  sourceCandidatureId?: string;
  specialite?: string;
  projetsEnCours?: number;
  notes?: string;
  avatarUrl?: string;
  // Identité numérique officielle et carte de membre
  numeroMembre: string; // ex: AOS-MBR-2026-001 (auto-généré à la validation)
  motDePasse?: string; // code d'accès personnel
  qrCodeData?: string; // encodage du badge numérique
  // Métadonnées préparées pour la messagerie communautaire future (sans UI de chat immédiate)
  chatMetadata?: {
    lastSeen?: string;
    channels?: string[];
    isOnline?: boolean;
  };
}

export type StatutTache = 
  | 'a_faire' 
  | 'en_cours' 
  | 'en_revue_directeur' 
  | 'validee' 
  | 'terminee';

export type PrioriteTache = 'normale' | 'haute' | 'urgente';

export interface Tache {
  id: string;
  collaborateurId: string;
  titre: string;
  description: string;
  projetNom: string;
  statut: StatutTache;
  priorite: PrioriteTache;
  dateAssignation: string; // ISO format
  dateLivraisonEstimee: string; // ISO format
  dateLivraisonReelle?: string; // ISO format
  tempsEstimeHeures: number;
  tempsPasseHeures: number;
  livrablesAttendus?: string[];
  lienLivrable?: string;
  commentaireDirecteur?: string;
  noteDirecteur?: string;
  poleServiceId?: PoleServiceId;
}

export type DirectorTab = 'overview' | 'applications' | 'collaborators' | 'tests' | 'quotes' | 'settings';

export type StatutDevis = 'nouveau' | 'contacte' | 'devis_envoye' | 'signe' | 'archive' | 'rejete';

export interface DemandeDevis {
  id: string;
  clientNom: string;
  entreprise: string;
  email: string;
  telephone: string;
  ville: string;
  typeOffre: 'digitalisation_az' | 'boost_digital' | 'sur_mesure';
  servicesRequis: string[];
  budgetEstime: string; // en FCFA
  descriptionProjet: string;
  dateDemande: string;
  statut: StatutDevis;
  notesDirecteur?: string;
  serviceDemande?: string;
  delaiSouhaite?: string;
}
