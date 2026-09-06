import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Poste, 
  ModeleTest, 
  Candidature, 
  Collaborateur, 
  DemandeDevis,
  CandidatInfo,
  StatutCandidature,
  Tache,
  StatutTache
} from '../types';
import { 
  INITIAL_POSTES, 
  INITIAL_TEST_TEMPLATES, 
  INITIAL_CANDIDATURES, 
  INITIAL_COLLABORATEURS, 
  INITIAL_DEVIS,
  INITIAL_TACHES
} from '../data/initialData';

export type PublicPageView = 
  | 'home' 
  | 'services' 
  | 'why_us' 
  | 'contact' 
  | 'candidate_flow' 
  | 'candidate_tracking'
  | 'privacy'
  | 'support';

interface AppContextType {
  // Navigation
  isDirectorMode: boolean;
  setIsDirectorMode: (active: boolean) => void;
  publicView: PublicPageView;
  setPublicView: (view: PublicPageView) => void;
  directorTab: 'overview' | 'applications' | 'collaborators' | 'tests' | 'quotes' | 'settings';
  setDirectorTab: (tab: 'overview' | 'applications' | 'collaborators' | 'tests' | 'quotes' | 'settings') => void;
  
  // Collaborateur Space & Session
  currentCollaborateur: Collaborateur | null;
  setCurrentCollaborateur: (collab: Collaborateur | null) => void;
  isCollabSpaceOpen: boolean;
  setIsCollabSpaceOpen: (open: boolean) => void;
  loginCollaborateur: (identifiant: string, motDePasse?: string) => boolean;
  logoutCollaborateur: () => void;

  // Selected candidate / tracking
  selectedCandidatureCode: string | null;
  setSelectedCandidatureCode: (code: string | null) => void;
  directTestToken: string | null;
  setDirectTestToken: (token: string | null) => void;
  selectedPosteForApplication: string | null;
  setSelectedPosteForApplication: (posteId: string | null) => void;

  // Quote modal trigger
  isQuoteModalOpen: boolean;
  setIsQuoteModalOpen: (open: boolean) => void;

  // State data
  postes: Poste[];
  testTemplates: ModeleTest[];
  candidatures: Candidature[];
  collaborateurs: Collaborateur[];
  devisList: DemandeDevis[];
  taches: Tache[];

  // Actions
  createCandidature: (candidat: CandidatInfo, posteId: string) => Candidature;
  submitTestResponse: (
    candidatureId: string, 
    contenuTexte: string, 
    liensExternes: string[], 
    nomFichier?: string
  ) => void;
  evaluateCandidature: (
    candidatureId: string, 
    decision: 'valider' | 'refuser' | 'demander_complement',
    note?: number, 
    commentaire?: string
  ) => void;
  addCollaborateurManuel: (collab: {
    nom: string;
    email: string;
    telephone: string;
    ville: string;
    posteId: string;
    specialite?: string;
    notes?: string;
  }) => void;
  toggleCollaborateurStatut: (id: string) => void;
  updateTestTemplate: (updated: ModeleTest) => void;
  createTestTemplate: (template: Omit<ModeleTest, 'id' | 'derniereModification'>) => ModeleTest;
  updatePoste: (updated: Poste) => void;
  addPoste: (poste: Omit<Poste, 'id'>) => void;
  togglePosteRecrutement: (posteId: string) => void;
  submitDemandeDevis: (devis: Omit<DemandeDevis, 'id' | 'dateDemande' | 'statut'>) => DemandeDevis;
  updateDevisStatut: (id: string, statut: DemandeDevis['statut'], notes?: string) => void;
  
  // Tâches Collaborateurs actions
  updateTacheStatut: (
    tacheId: string, 
    statut: StatutTache, 
    details?: { 
      lienLivrable?: string; 
      tempsPasseHeures?: number; 
      commentaireDirecteur?: string;
    }
  ) => void;
  createTache: (tache: Omit<Tache, 'id' | 'dateAssignation'>) => Tache;

  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * Génère et attribue l'identité numérique d'un collaborateur :
 * numéro de membre unique (AOS-MBR-<année>-<NNN>), code d'accès par défaut
 * et données encodées dans le QR code de la carte de membre.
 */
const finalizeCollaborateurIdentity = (
  collab: Omit<Collaborateur, 'numeroMembre'> & Partial<Pick<Collaborateur, 'numeroMembre' | 'motDePasse' | 'qrCodeData'>>,
  existants: Collaborateur[],
  upsert: (updater: (prev: Collaborateur[]) => Collaborateur[]) => void
) => {
  const annee = new Date().getFullYear();
  const prochainNumero = existants.length + 1;
  const numeroMembre = collab.numeroMembre || `AOS-MBR-${annee}-${String(prochainNumero).padStart(3, '0')}`;
  const complet: Collaborateur = {
    ...collab,
    numeroMembre,
    // Générer un code d'accès initial communiqué par le Directeur au collaborateur
    motDePasse: collab.motDePasse || `AOS-${Math.floor(1000 + Math.random() * 9000)}`,
    qrCodeData:
      collab.qrCodeData ||
      `AGENCEOS://MEMBER/${numeroMembre}/${collab.nom.toUpperCase().replace(/\s+/g, '-')}`,
  };
  upsert(prev => [complet, ...prev]);
};

const STORAGE_KEYS = {
  POSTES: 'agenceos_postes_v1',
  TESTS: 'agenceos_tests_v1',
  CANDIDATURES: 'agenceos_candidatures_v1',
  COLLABORATEURS: 'agenceos_collabs_v1',
  DEVIS: 'agenceos_devis_v1',
  TACHES: 'agenceos_taches_v1',
  CURRENT_COLLAB: 'agenceos_current_collab_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDirectorMode, setIsDirectorMode] = useState<boolean>(false);
  const [publicView, setPublicView] = useState<PublicPageView>('home');
  const [directorTab, setDirectorTab] = useState<'overview' | 'applications' | 'collaborators' | 'tests' | 'quotes' | 'settings'>('overview');
  const [selectedCandidatureCode, setSelectedCandidatureCode] = useState<string | null>(null);
  const [directTestToken, setDirectTestToken] = useState<string | null>(null);
  const [selectedPosteForApplication, setSelectedPosteForApplication] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);

  // Check URL hash (#directeur) or query param (?admin=true or ?directeur=true)
  useEffect(() => {
    const checkHash = () => {
      if (
        window.location.hash === '#directeur' ||
        window.location.search.includes('directeur=true') ||
        window.location.search.includes('admin=true')
      ) {
        setIsDirectorMode(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    // Discreet keyboard shortcut: Alt + Shift + D
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        setIsDirectorMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Load from localStorage or defaults
  const [postes, setPostes] = useState<Poste[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.POSTES);
      return saved ? JSON.parse(saved) : INITIAL_POSTES;
    } catch {
      return INITIAL_POSTES;
    }
  });

  const [testTemplates, setTestTemplates] = useState<ModeleTest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTS);
      return saved ? JSON.parse(saved) : INITIAL_TEST_TEMPLATES;
    } catch {
      return INITIAL_TEST_TEMPLATES;
    }
  });

  const [candidatures, setCandidatures] = useState<Candidature[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CANDIDATURES);
      return saved ? JSON.parse(saved) : INITIAL_CANDIDATURES;
    } catch {
      return INITIAL_CANDIDATURES;
    }
  });

  const [collaborateurs, setCollaborateurs] = useState<Collaborateur[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COLLABORATEURS);
      return saved ? JSON.parse(saved) : INITIAL_COLLABORATEURS;
    } catch {
      return INITIAL_COLLABORATEURS;
    }
  });

  const [devisList, setDevisList] = useState<DemandeDevis[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DEVIS);
      return saved ? JSON.parse(saved) : INITIAL_DEVIS;
    } catch {
      return INITIAL_DEVIS;
    }
  });

  const [taches, setTaches] = useState<Tache[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TACHES);
      return saved ? JSON.parse(saved) : INITIAL_TACHES;
    } catch {
      return INITIAL_TACHES;
    }
  });

  const [currentCollaborateur, setCurrentCollaborateur] = useState<Collaborateur | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_COLLAB);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isCollabSpaceOpen, setIsCollabSpaceOpen] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_COLLAB);
      return !!saved;
    } catch {
      return false;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.POSTES, JSON.stringify(postes));
    } catch (e) {
      console.error(e);
    }
  }, [postes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(testTemplates));
    } catch (e) {
      console.error(e);
    }
  }, [testTemplates]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CANDIDATURES, JSON.stringify(candidatures));
    } catch (e) {
      console.error(e);
    }
  }, [candidatures]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COLLABORATEURS, JSON.stringify(collaborateurs));
    } catch (e) {
      console.error(e);
    }
  }, [collaborateurs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DEVIS, JSON.stringify(devisList));
    } catch (e) {
      console.error(e);
    }
  }, [devisList]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TACHES, JSON.stringify(taches));
    } catch (e) {
      console.error(e);
    }
  }, [taches]);

  useEffect(() => {
    try {
      if (currentCollaborateur) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_COLLAB, JSON.stringify(currentCollaborateur));
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_COLLAB);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentCollaborateur]);

  // Auth: Collaborateur Login / Logout
  const loginCollaborateur = (identifiant: string, motDePasse?: string): boolean => {
    const cleanId = identifiant.trim().toLowerCase();
    const found = collaborateurs.find(c => 
      c.email.toLowerCase() === cleanId || 
      c.numeroMembre.toLowerCase() === cleanId ||
      c.id.toLowerCase() === cleanId
    );

    if (found && found.statut === 'actif') {
      const cleanPass = motDePasse ? motDePasse.trim() : '';
      // Accès strict : le code d'accès personnel doit correspondre exactement
      // (à remplacer par Supabase Auth lors de la migration base de données)
      if (cleanPass && cleanPass === found.motDePasse) {
        setCurrentCollaborateur(found);
        setIsCollabSpaceOpen(true);
        return true;
      }
    }
    return false;
  };

  const logoutCollaborateur = () => {
    setCurrentCollaborateur(null);
    setIsCollabSpaceOpen(false);
  };

  // Action: Collaborateur updates the status of one of his tasks
  const updateTacheStatut = (
    tacheId: string,
    statut: StatutTache,
    details?: {
      lienLivrable?: string;
      tempsPasseHeures?: number;
      commentaireDirecteur?: string;
    }
  ) => {
    setTaches(prev => prev.map(t => {
      if (t.id !== tacheId) return t;
      return {
        ...t,
        statut,
        lienLivrable: details?.lienLivrable || t.lienLivrable,
        tempsPasseHeures: details?.tempsPasseHeures ?? t.tempsPasseHeures,
        commentaireDirecteur: details?.commentaireDirecteur || t.commentaireDirecteur,
        dateLivraisonReelle:
          statut === 'validee' || statut === 'terminee'
            ? t.dateLivraisonReelle || new Date().toISOString()
            : t.dateLivraisonReelle,
      };
    }));
  };

  // Action: Director creates and assigns a new task
  const createTache = (tache: Omit<Tache, 'id' | 'dateAssignation'>): Tache => {
    const newTache: Tache = {
      ...tache,
      id: `task-${Date.now()}`,
      dateAssignation: new Date().toISOString(),
    };
    setTaches(prev => [newTache, ...prev]);
    return newTache;
  };

  // Action: Candidate applies (Step 2 finished -> generates private test token and codeSuivi)
  const createCandidature = (candidat: CandidatInfo, posteId: string): Candidature => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const poste = postes.find(p => p.id === posteId);
    const prefix = poste?.codeMetier ? poste.codeMetier.toUpperCase().slice(0, 3) : 'AOS';
    const codeSuivi = `AOS-${prefix}-${randomNum}`;
    const tokenAccesTest = `test-priv-${Date.now()}-${randomNum}`;
    
    // Test assigné : peut être absent si aucun test n'est encore configuré pour ce poste
    const template = testTemplates.find(t => t.posteId === posteId);

    const newCandidature: Candidature = {
      id: `cand-${Date.now()}`,
      codeSuivi,
      candidat,
      posteId,
      statut: template ? 'test_en_cours' : 'recue',
      dateCreation: new Date().toISOString(),
      testAssigneId: template ? template.id : '',
      tokenAccesTest,
      historique: [
        {
          date: new Date().toISOString(),
          statut: 'recue',
          message: 'Dossier de candidature initial réceptionné avec succès.',
        },
        ...(template
          ? [{
              date: new Date().toISOString(),
              statut: 'test_en_cours' as StatutCandidature,
              message: `Accès au test privé "${template.titre}" généré. Délai imparti : ${template.delaiJours} jours.`,
            }]
          : [{
              date: new Date().toISOString(),
              statut: 'recue' as StatutCandidature,
              message: 'En attente de la configuration du test par le Directeur pour ce poste.',
            }]),
      ],
    };

    setCandidatures(prev => [newCandidature, ...prev]);
    return newCandidature;
  };

  // Action: Candidate submits test (Step 3 finished -> enters en_evaluation)
  const submitTestResponse = (
    candidatureId: string, 
    contenuTexte: string, 
    liensExternes: string[], 
    nomFichier?: string
  ) => {
    setCandidatures(prev => prev.map(cand => {
      if (cand.id !== candidatureId) return cand;

      const soumission = {
        id: `sub-${Date.now()}`,
        candidatureId,
        modeleTestId: cand.testAssigneId,
        contenuTexte,
        liensExternes,
        nomFichierSimule: nomFichier || undefined,
        tailleFichierSimule: nomFichier ? '1.8 Mo' : undefined,
        dateSoumission: new Date().toISOString(),
      };

      const updatedHistorique = [
        ...cand.historique,
        {
          date: new Date().toISOString(),
          statut: 'en_evaluation' as StatutCandidature,
          message: 'Test soumis par le candidat. Transmission au Directeur pour correction et délibération.',
        },
      ];

      return {
        ...cand,
        statut: 'en_evaluation',
        soumission,
        historique: updatedHistorique,
      };
    }));
  };

  // Action: Director reviews candidacy (Validate -> turns into Collaborator, or Refuse)
  const evaluateCandidature = (
    candidatureId: string, 
    decision: 'valider' | 'refuser' | 'demander_complement',
    note?: number, 
    commentaire?: string
  ) => {
    const cand = candidatures.find(c => c.id === candidatureId);
    if (!cand) return;

    let nouveauStatut: StatutCandidature = cand.statut;
    let messageHist = '';

    if (decision === 'valider') {
      nouveauStatut = 'validee';
      messageHist = `Candidature validée par le Directeur (Note : ${note || '18'}/20). Accès Collaborateur accordé.`;

      // Automatically add as Collaborateur if not already created
      const existingCollab = collaborateurs.find(col => col.sourceCandidatureId === candidatureId);
      if (!existingCollab) {
        const newCollab = {
          id: `collab-${Date.now()}`,
          nom: cand.candidat.nom,
          email: cand.candidat.email,
          telephone: cand.candidat.telephone,
          ville: cand.candidat.ville,
          posteId: cand.posteId,
          dateEntree: new Date().toISOString().split('T')[0],
          statut: 'actif' as const,
          ajouteManuellement: false, // Provenance test candidat
          sourceCandidatureId: candidatureId,
          specialite: `Issu du recrutement validé (${cand.codeSuivi})`,
          projetsEnCours: 0,
          notes: commentaire || 'Candidat ayant brillamment réussi le test technique.',
        };
        finalizeCollaborateurIdentity(newCollab, collaborateurs, setCollaborateurs);
      }
    } else if (decision === 'refuser') {
      nouveauStatut = 'refusee';
      messageHist = `Candidature non retenue suite à l'analyse du test. Motif : ${commentaire || 'Profil non aligné avec les exigences actuelles.'}`;
    } else {
      messageHist = `Demande de complément transmise au candidat : ${commentaire || 'Informations supplémentaires requises.'}`;
    }

    setCandidatures(prev => prev.map(c => {
      if (c.id !== candidatureId) return c;
      return {
        ...c,
        statut: nouveauStatut,
        soumission: c.soumission ? {
          ...c.soumission,
          noteDirecteur: note !== undefined ? note : c.soumission.noteDirecteur,
          commentaireDirecteur: commentaire || c.soumission.commentaireDirecteur,
          dateEvaluation: new Date().toISOString(),
          evaluePar: 'Directeur Fondateur',
        } : undefined,
        historique: [
          ...c.historique,
          {
            date: new Date().toISOString(),
            statut: nouveauStatut,
            message: messageHist,
          },
        ],
      };
    }));
  };

  // Action: Director adds a trusted person directly without public test
  const addCollaborateurManuel = (collab: {
    nom: string;
    email: string;
    telephone: string;
    ville: string;
    posteId: string;
    specialite?: string;
    notes?: string;
  }) => {
    const newCollab = {
      id: `collab-man-${Date.now()}`,
      nom: collab.nom,
      email: collab.email,
      telephone: collab.telephone,
      ville: collab.ville,
      posteId: collab.posteId,
      dateEntree: new Date().toISOString().split('T')[0],
      statut: 'actif' as const,
      ajouteManuellement: true, // Direct Director Trust insertion
      specialite: collab.specialite || 'Collaborateur partenaire direct',
      projetsEnCours: 1,
      notes: collab.notes || 'Ajouté directement par le Directeur.',
    };

    finalizeCollaborateurIdentity(newCollab, collaborateurs, setCollaborateurs);
  };

  const toggleCollaborateurStatut = (id: string) => {
    setCollaborateurs(prev => prev.map(col => {
      if (col.id !== id) return col;
      return {
        ...col,
        statut: col.statut === 'actif' ? 'inactif' : 'actif',
      };
    }));
  };

  const updateTestTemplate = (updated: ModeleTest) => {
    setTestTemplates(prev => prev.map(t => t.id === updated.id ? {
      ...updated,
      derniereModification: new Date().toISOString().split('T')[0],
    } : t));
  };

  const createTestTemplate = (template: Omit<ModeleTest, 'id' | 'derniereModification'>): ModeleTest => {
    const newTest: ModeleTest = {
      ...template,
      id: `test-${Date.now()}`,
      derniereModification: new Date().toISOString().split('T')[0],
    };
    setTestTemplates(prev => [newTest, ...prev]);
    return newTest;
  };

  const updatePoste = (updated: Poste) => {
    setPostes(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const addPoste = (poste: Omit<Poste, 'id'>) => {
    const newPoste: Poste = {
      ...poste,
      id: `poste-${Date.now()}`,
    };
    setPostes(prev => [...prev, newPoste]);
  };

  const togglePosteRecrutement = (posteId: string) => {
    setPostes(prev => prev.map(p => p.id === posteId ? { ...p, ouvertRecrutement: !p.ouvertRecrutement } : p));
  };

  const submitDemandeDevis = (devis: Omit<DemandeDevis, 'id' | 'dateDemande' | 'statut'>): DemandeDevis => {
    const newDevis: DemandeDevis = {
      ...devis,
      id: `dev-${Date.now()}`,
      dateDemande: new Date().toISOString(),
      statut: 'nouveau',
    };
    setDevisList(prev => [newDevis, ...prev]);
    return newDevis;
  };

  const updateDevisStatut = (id: string, statut: DemandeDevis['statut'], notes?: string) => {
    setDevisList(prev => prev.map(d => {
      if (d.id !== id) return d;
      return {
        ...d,
        statut,
        notesDirecteur: notes || d.notesDirecteur,
      };
    }));
  };

  const resetAllData = () => {
    setPostes(INITIAL_POSTES);
    setTestTemplates(INITIAL_TEST_TEMPLATES);
    setCandidatures(INITIAL_CANDIDATURES);
    setCollaborateurs(INITIAL_COLLABORATEURS);
    setDevisList(INITIAL_DEVIS);
    localStorage.removeItem(STORAGE_KEYS.POSTES);
    localStorage.removeItem(STORAGE_KEYS.TESTS);
    localStorage.removeItem(STORAGE_KEYS.CANDIDATURES);
    localStorage.removeItem(STORAGE_KEYS.COLLABORATEURS);
    localStorage.removeItem(STORAGE_KEYS.DEVIS);
    localStorage.removeItem(STORAGE_KEYS.TACHES);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_COLLAB);
  };

  return (
    <AppContext.Provider
      value={{
        isDirectorMode,
        setIsDirectorMode,
        publicView,
        setPublicView,
        directorTab,
        setDirectorTab,
        selectedCandidatureCode,
        setSelectedCandidatureCode,
        directTestToken,
        setDirectTestToken,
        selectedPosteForApplication,
        setSelectedPosteForApplication,
        currentCollaborateur,
        setCurrentCollaborateur,
        isCollabSpaceOpen,
        setIsCollabSpaceOpen,
        loginCollaborateur,
        logoutCollaborateur,
        isQuoteModalOpen,
        setIsQuoteModalOpen,
        postes,
        testTemplates,
        candidatures,
        collaborateurs,
        devisList,
        taches,
        createCandidature,
        submitTestResponse,
        evaluateCandidature,
        addCollaborateurManuel,
        toggleCollaborateurStatut,
        updateTestTemplate,
        createTestTemplate,
        updatePoste,
        addPoste,
        togglePosteRecrutement,
        submitDemandeDevis,
        updateDevisStatut,
        updateTacheStatut,
        createTache,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
