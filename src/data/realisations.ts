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

// Fiches d'études de cas — ajoutées par le Directeur au fil des VRAIES livraisons.
// Tant que le tableau est vide, la section affiche un état vide (aucune réalisation).
export const REALISATIONS: Realisation[] = [];