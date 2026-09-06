import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Poste, ModeleTest, CandidatInfo } from '../../types';
import { 
  Briefcase, 
  Code2, 
  Megaphone, 
  Video, 
  Palette, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  Link as LinkIcon, 
  FileText, 
  Upload, 
  Clock, 
  ShieldCheck, 
  Copy, 
  Check, 
  Plus, 
  Trash2,
  Calendar,
  Building2,
  Printer
} from 'lucide-react';

interface CandidateApplicationFlowProps {
  onOpenTrackingWithCode: (code: string) => void;
}

export const CandidateApplicationFlow: React.FC<CandidateApplicationFlowProps> = ({ onOpenTrackingWithCode }) => {
  const { 
    postes, 
    testTemplates, 
    createCandidature, 
    submitTestResponse,
    selectedPosteForApplication,
    setSelectedPosteForApplication,
    setPublicView,
    setIsDirectorMode,
    setDirectorTab
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [chosenPosteId, setChosenPosteId] = useState<string>(
    selectedPosteForApplication || postes[0]?.id || ''
  );

  const [candidatForm, setCandidatForm] = useState<CandidatInfo>({
    nom: '',
    email: '',
    telephone: '',
    ville: 'Ouagadougou',
    anneesExperience: '2-3 ans',
    portfolioUrl: '',
    githubUrl: '',
    linkedinUrl: '',
    presentation: '',
  });

  const [activeCandidatureId, setActiveCandidatureId] = useState<string | null>(null);
  const [activeCodeSuivi, setActiveCodeSuivi] = useState<string>('');
  const [activeTestToken, setActiveTestToken] = useState<string>('');

  const [contenuTexte, setContenuTexte] = useState<string>('');
  const [liensExternes, setLiensExternes] = useState<string[]>(['']);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  const currentPoste = postes.find(p => p.id === chosenPosteId) || postes[0];
  const currentTestTemplate = testTemplates.find(t => t.posteId === chosenPosteId) || testTemplates[0];

  const getPosteIcon = (code: string) => {
    switch (code) {
      case 'dev_frontend': return <Code2 className="w-5 h-5" />;
      case 'community_manager': return <Megaphone className="w-5 h-5" />;
      case 'videaste': return <Video className="w-5 h-5" />;
      case 'graphiste': return <Palette className="w-5 h-5" />;
      default: return <Briefcase className="w-5 h-5" />;
    }
  };

  const handleSelectPoste = (posteId: string) => {
    setChosenPosteId(posteId);
    setSelectedPosteForApplication(posteId);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidatForm.nom || !candidatForm.email || !candidatForm.telephone) return;

    const cand = createCandidature(candidatForm, chosenPosteId);
    setActiveCandidatureId(cand.id);
    setActiveCodeSuivi(cand.codeSuivi);
    setActiveTestToken(cand.tokenAccesTest);

    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCandidatureId) return;

    const validLinks = liensExternes.filter(l => l.trim().length > 0);
    submitTestResponse(
      activeCandidatureId,
      contenuTexte,
      validLinks,
      uploadedFileName || undefined
    );

    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddLinkInput = () => {
    setLiensExternes([...liensExternes, '']);
  };

  const handleUpdateLink = (index: number, val: string) => {
    const updated = [...liensExternes];
    updated[index] = val;
    setLiensExternes(updated);
  };

  const handleRemoveLink = (index: number) => {
    if (liensExternes.length <= 1) {
      setLiensExternes(['']);
      return;
    }
    setLiensExternes(liensExternes.filter((_, i) => i !== index));
  };

  const handleCopyPrivateUrl = () => {
    const privateUrl = `https://agenceos.bf/test-prive/${activeTestToken}`;
    navigator.clipboard.writeText(privateUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="pt-28 pb-20 bg-[#faf8ff] min-h-screen text-[#131b2e]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        
        {/* Header Badge & Title (Stitch Mockup 6 style) */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaedff] text-[#003629] text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-[#c0c9c3]/50">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>CADRE DE RECRUTEMENT • SESSION EN COURS Q2</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#003629] tracking-tight mb-3">
            Parcours Collaborateur & Concours Technique
          </h1>
          <p className="text-[#545f73] text-sm sm:text-base leading-relaxed">
            Processus de sélection rigoureux et anonymisé valorisant les talents du Burkina Faso. Évaluation impartiale, pratique et supervisée directement par le Directeur.
          </p>
        </div>

        {/* 4-Step Stepper Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { num: 1, title: '01. Choix du Poste', desc: 'Profil recherché' },
            { num: 2, title: '02. Candidature', desc: 'Identité & parcours' },
            { num: 3, title: '03. Épreuve Privée', desc: 'Test technique' },
            { num: 4, title: '04. Confirmation', desc: 'Récépissé & suivi' },
          ].map(s => {
            const isActive = currentStep === s.num;
            const isDone = currentStep > s.num;

            return (
              <div 
                key={s.num}
                className={`p-4 rounded-xl border transition-all ${
                  isActive 
                    ? 'bg-[#1b4d3e] text-white border-[#003629] shadow-sm'
                    : isDone
                    ? 'bg-[#baeed9]/40 text-[#003629] border-[#c0c9c3]'
                    : 'bg-white text-[#545f73] border-[#e2e7ff]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-mono text-xs font-bold uppercase ${isActive ? 'text-[#baeed9]' : isDone ? 'text-emerald-700' : 'text-[#707974]'}`}>
                    {s.title}
                  </span>
                  {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                </div>
                <p className={`text-xs ${isActive ? 'text-white/80' : 'text-[#545f73]'}`}>
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* ÉTAPE 1 : CHOIX DU POSTE                                                  */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#e2e7ff] p-6 sm:p-8 shadow-xs">
              <div className="mb-6">
                <span className="font-mono text-xs uppercase tracking-wider text-[#1b4d3e] font-bold">
                  POSTES OUVERTS AU BURKINA FASO
                </span>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-[#003629] mt-1">
                  Sélectionnez le corps de métier pour lequel vous postulez
                </h2>
                <p className="text-xs sm:text-sm text-[#545f73] mt-1">
                  Chaque candidature déclenchera une épreuve technique spécifique créée par notre direction.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {postes.map(poste => {
                  const isSelected = chosenPosteId === poste.id;
                  const isHiring = poste.ouvertRecrutement;

                  return (
                    <div
                      key={poste.id}
                      onClick={() => isHiring && handleSelectPoste(poste.id)}
                      className={`rounded-xl border p-5 transition-all relative flex flex-col justify-between ${
                        !isHiring 
                          ? 'opacity-60 bg-[#f2f3ff] border-[#e2e7ff] cursor-not-allowed'
                          : isSelected
                          ? 'bg-[#f2f3ff] border-2 border-[#1b4d3e] shadow-sm cursor-pointer'
                          : 'bg-white hover:bg-[#faf8ff] border-[#c0c9c3] hover:border-[#1b4d3e] cursor-pointer'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 rounded-lg bg-[#eaedff] text-[#003629] flex items-center justify-center">
                            {getPosteIcon(poste.codeMetier)}
                          </div>
                          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                            isHiring 
                              ? 'bg-[#baeed9] text-[#002117]'
                              : 'bg-[#e2e7ff] text-[#545f73]'
                          }`}>
                            {isHiring ? 'Session Ouverte' : 'Bientôt disponible'}
                          </span>
                        </div>

                        <h3 className="font-display font-bold text-base text-[#003629] mb-1.5">
                          {poste.nom}
                        </h3>
                        <p className="text-xs text-[#545f73] mb-4 leading-relaxed">
                          {poste.descriptionCourte}
                        </p>

                        <div className="mb-4">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#707974] block mb-1.5">
                            Compétences clés évaluées :
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {poste.competencesCles.map(c => (
                              <span key={c} className="text-[11px] bg-white text-[#131b2e] border border-[#e2e7ff] px-2 py-0.5 rounded font-medium">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        disabled={!isHiring}
                        className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                          !isHiring
                            ? 'bg-[#e2e7ff] text-[#707974] cursor-not-allowed'
                            : 'bg-[#1b4d3e] hover:bg-[#003629] text-white shadow-sm'
                        }`}
                      >
                        <span>Choisir ce profil et continuer</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ÉTAPE 2 : FORMULAIRE D'INFORMATIONS DU CANDIDAT                           */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl border border-[#e2e7ff] shadow-xs p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-[#e2e7ff] pb-4 mb-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#1b4d3e] flex items-center gap-1.5 mb-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  Poste ciblé : {currentPoste?.nom}
                </span>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-[#003629]">
                  Renseignez vos coordonnées de contact
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-xs font-medium text-[#545f73] hover:text-[#003629] flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Changer de profil
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cand-nom" className="block text-xs font-bold text-[#131b2e] mb-1">
                    Nom & Prénom(s) complets *
                  </label>
                  <input
                    id="cand-nom"
                    type="text"
                    required
                    placeholder="Ex: Oumar Compaoré"
                    value={candidatForm.nom}
                    onChange={(e) => setCandidatForm({ ...candidatForm, nom: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="cand-email" className="block text-xs font-bold text-[#131b2e] mb-1">
                    Adresse Email professionnelle *
                  </label>
                  <input
                    id="cand-email"
                    type="email"
                    required
                    placeholder="Ex: oumar.dev@gmail.com"
                    value={candidatForm.email}
                    onChange={(e) => setCandidatForm({ ...candidatForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="cand-tel" className="block text-xs font-bold text-[#131b2e] mb-1">
                    Téléphone / WhatsApp *
                  </label>
                  <input
                    id="cand-tel"
                    type="tel"
                    required
                    placeholder="+226 70 11 22 33"
                    value={candidatForm.telephone}
                    onChange={(e) => setCandidatForm({ ...candidatForm, telephone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:bg-white font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="cand-ville" className="block text-xs font-bold text-[#131b2e] mb-1">
                    Ville de résidence *
                  </label>
                  <select
                    id="cand-ville"
                    value={candidatForm.ville}
                    onChange={(e) => setCandidatForm({ ...candidatForm, ville: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] focus:outline-none focus:border-[#1b4d3e] focus:bg-white"
                  >
                    <option value="Ouagadougou">Ouagadougou</option>
                    <option value="Bobo-Dioulasso">Bobo-Dioulasso</option>
                    <option value="Koudougou">Koudougou</option>
                    <option value="Fada N'Gourma">Fada N'Gourma</option>
                    <option value="Autre ville du Burkina Faso">Autre ville BF</option>
                    <option value="Autre pays (Afrique de l'Ouest)">Autre pays (Afrique Ouest)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="cand-exp" className="block text-xs font-bold text-[#131b2e] mb-1">
                    Expérience pratique
                  </label>
                  <select
                    id="cand-exp"
                    value={candidatForm.anneesExperience}
                    onChange={(e) => setCandidatForm({ ...candidatForm, anneesExperience: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] focus:outline-none focus:border-[#1b4d3e] focus:bg-white"
                  >
                    <option value="Moins d'1 an (Débutant motivé)">Moins d'1 an (Débutant)</option>
                    <option value="1 à 2 ans">1 à 2 ans</option>
                    <option value="3 à 5 ans">3 à 5 ans</option>
                    <option value="+5 ans (Confirmé / Senior)">+5 ans (Confirmé)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label htmlFor="cand-portfolio" className="block text-xs font-bold text-[#131b2e] mb-1">
                    Lien Portfolio / Behance / Dépôt démo
                  </label>
                  <input
                    id="cand-portfolio"
                    type="url"
                    placeholder="https://..."
                    value={candidatForm.portfolioUrl}
                    onChange={(e) => setCandidatForm({ ...candidatForm, portfolioUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:bg-white font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="cand-github" className="block text-xs font-bold text-[#131b2e] mb-1">
                    GitHub / Profil LinkedIn
                  </label>
                  <input
                    id="cand-github"
                    type="url"
                    placeholder="https://..."
                    value={candidatForm.githubUrl}
                    onChange={(e) => setCandidatForm({ ...candidatForm, githubUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cand-motivation" className="block text-xs font-bold text-[#131b2e] mb-1">
                  Brève note d'intention & motivations
                </label>
                <textarea
                  id="cand-motivation"
                  rows={3}
                  placeholder="En quelques lignes : votre rapport aux outils numériques, vos réalisations antérieures au Burkina Faso ou vos disponibilités..."
                  value={candidatForm.presentation}
                  onChange={(e) => setCandidatForm({ ...candidatForm, presentation: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:bg-white"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#c0c9c3]/50 text-xs text-[#131b2e] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#1b4d3e] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[#003629]">Épreuve pratique immédiate :</strong> À la validation de cette étape, un jeton privé unique vous donnera accès au test technique homologué pour le profil <strong className="text-[#003629]">{currentPoste?.nom}</strong>.
                </p>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-[#545f73] hover:text-[#131b2e] cursor-pointer"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-[#1b4d3e] hover:bg-[#003629] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <span>Accéder à mon épreuve technique privée</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ÉTAPE 3 : TEST TECHNIQUE PRIVÉ SELON LE POSTE                             */}
        {/* ========================================================================= */}
        {currentStep === 3 && (
          <div className="space-y-6">
            
            {/* Header Token Box */}
            <div className="bg-[#003629] text-white rounded-2xl p-6 sm:p-8 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="p-1 rounded bg-[#baeed9]/20 text-[#baeed9]">
                      <Lock className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#baeed9]">
                      SESSION TECHNIQUE OFFICIELLE SCELLÉE
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                    {currentTestTemplate?.titre}
                  </h2>
                  <p className="text-xs text-white/70 mt-0.5">
                    Candidat : <strong className="text-white">{candidatForm.nom}</strong> · Référence : <code className="text-[#baeed9] font-mono font-bold">{activeCodeSuivi}</code>
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl border border-white/15 shrink-0">
                  <Clock className="w-5 h-5 text-[#baeed9]" />
                  <div>
                    <span className="text-[10px] text-white/60 block font-mono">Délai alloué</span>
                    <span className="text-xs font-bold text-white font-mono">{currentTestTemplate?.delaiJours} jours ouvrés</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex-1 bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-xs font-mono text-white/90 truncate">
                  https://agenceos.bf/test-prive/{activeTestToken}
                </div>
                <button
                  type="button"
                  onClick={handleCopyPrivateUrl}
                  className="px-4 py-2 rounded-lg bg-[#baeed9] hover:bg-[#9ed1bd] text-[#002117] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Lien copié !' : 'Copier lien privé'}</span>
                </button>
              </div>
            </div>

            {/* Test Subject & Instructions */}
            <div className="bg-white rounded-2xl border border-[#e2e7ff] p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h3 className="font-display font-bold text-base text-[#003629] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#1b4d3e]" />
                  Directives et énoncé de l'épreuve
                </h3>
                <div className="bg-[#faf8ff] p-5 rounded-xl border border-[#e2e7ff] text-xs sm:text-sm text-[#131b2e] whitespace-pre-line leading-relaxed font-sans">
                  {currentTestTemplate?.consignes}
                </div>
              </div>

              {/* Deliverables Required */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#131b2e] mb-2.5">
                  Livrables formels attendus :
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#545f73]">
                  {currentTestTemplate?.livrablesAttendus.map((l, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Evaluation Barème */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#131b2e] mb-2.5">
                  Critères de notation par le Directeur (Sur 20 points) :
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentTestTemplate?.criteresEvaluation.map((crit, idx) => (
                    <span key={idx} className="text-xs bg-[#f2f3ff] text-[#003629] border border-[#c0c9c3]/50 px-3 py-1 rounded-lg font-mono font-medium">
                      • {crit}
                    </span>
                  ))}
                </div>
              </div>

              {/* Restitution Form */}
              <form onSubmit={handleTestSubmit} className="pt-6 border-t border-[#e2e7ff] space-y-5">
                <h3 className="font-display font-bold text-lg text-[#003629]">
                  Bordereau de Restitution du Test
                </h3>

                <div>
                  <label htmlFor="test-content-text" className="block text-xs font-bold text-[#131b2e] mb-1">
                    Note explicative de méthodologie / Contenu rédigé *
                  </label>
                  <textarea
                    id="test-content-text"
                    required
                    rows={5}
                    placeholder="Détaillez vos choix techniques, vos arbitrages pour la connectivité locale ou collez le texte demandé..."
                    value={contenuTexte}
                    onChange={(e) => setContenuTexte(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:bg-white"
                  />
                </div>

                {/* External links */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-[#131b2e]">
                      Liens vers livrables externes (GitHub, Figma, Google Drive, Vercel, YouTube)
                    </label>
                    <button
                      type="button"
                      onClick={handleAddLinkInput}
                      className="text-xs text-[#003629] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Ajouter un lien
                    </button>
                  </div>

                  <div className="space-y-2">
                    {liensExternes.map((lien, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <LinkIcon className="w-3.5 h-3.5 text-[#707974] absolute left-3 top-3" />
                          <input
                            type="url"
                            placeholder="https://github.com/... ou https://figma.com/..."
                            value={lien}
                            onChange={(e) => handleUpdateLink(idx, e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:bg-white font-mono"
                          />
                        </div>
                        {liensExternes.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveLink(idx)}
                            className="p-2 text-[#707974] hover:text-red-600 rounded-lg hover:bg-[#f2f3ff] cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated File Attachment */}
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    Pièce jointe / Archive (optionnel - ZIP, PDF, maquettes)
                  </label>
                  <div className="border-2 border-dashed border-[#c0c9c3] hover:border-[#1b4d3e] rounded-xl p-5 text-center bg-[#faf8ff] transition-colors">
                    <Upload className="w-6 h-6 text-[#545f73] mx-auto mb-2" />
                    {uploadedFileName ? (
                      <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#003629]">
                        <FileText className="w-4 h-4" />
                        <span>Fichier rattaché : {uploadedFileName} (1.8 Mo)</span>
                        <button
                          type="button"
                          onClick={() => setUploadedFileName('')}
                          className="text-red-600 hover:underline text-[11px] ml-2 cursor-pointer"
                        >
                          Retirer
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs text-[#545f73] mb-2">
                          Glissez-déposez un fichier ou cliquez sur le bouton pour simuler l'archive
                        </p>
                        <button
                          type="button"
                          onClick={() => setUploadedFileName(`${candidatForm.nom.toLowerCase().replace(/\s+/g, '-')}-livrable-test.zip`)}
                          className="text-xs px-3 py-1.5 bg-white border border-[#c0c9c3] rounded-lg text-[#003629] font-bold hover:bg-[#eaedff] cursor-pointer"
                        >
                          Simuler le rattachement d'une archive ZIP
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[#e2e7ff]">
                  <span className="text-xs text-[#545f73]">
                    Le test sera immédiatement transmis dans le registre du Directeur.
                  </span>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-[#1b4d3e] hover:bg-[#003629] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <span>Transmettre mon épreuve pour évaluation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* ÉTAPE 4 : CONFIRMATION & SUIVI OFFICIEL                                   */}
        {/* ========================================================================= */}
        {currentStep === 4 && (
          <div className="bg-white rounded-2xl border border-[#e2e7ff] p-8 sm:p-10 shadow-sm space-y-8">
            
            {/* Header Status Confirmation */}
            <div className="text-center max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#baeed9] text-[#003629] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#003629] bg-[#eaedff] px-3 py-1 rounded-full">
                DOSSIER ENREGISTRÉ SOUS SCEAU OFFICIEL
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#003629] mt-3">
                Votre candidature a été transmise avec succès !
              </h2>
              <p className="text-xs sm:text-sm text-[#545f73] mt-2 leading-relaxed">
                Le dossier et l'épreuve technique de <strong className="text-[#131b2e]">{candidatForm.nom}</strong> pour le poste de <strong className="text-[#131b2e]">{currentPoste?.nom}</strong> sont désormais entre les mains de la Direction Technique.
              </p>
            </div>

            {/* Official Receipt Card (Stitch Mockup 6 style) */}
            <div className="max-w-2xl mx-auto rounded-2xl border-2 border-[#1b4d3e] bg-[#faf8ff] p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-[#c0c9c3] pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#003629] text-white flex items-center justify-center font-bold text-xs">
                    AOS
                  </div>
                  <div>
                    <span className="font-display font-bold text-sm text-[#003629] block">Récépissé de Dépôt de Candidature</span>
                    <span className="text-[10px] font-mono text-[#545f73]">BURKINA FASO · OUAGADOUGOU</span>
                  </div>
                </div>
                <button
                  onClick={() => window.print()}
                  className="hidden sm:flex items-center gap-1.5 text-xs text-[#003629] font-bold hover:underline cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimer le reçu</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs mb-6">
                <div>
                  <span className="text-[#545f73] font-mono block text-[10px] uppercase">Numéro Unique</span>
                  <span className="font-mono font-bold text-sm text-[#003629]">{activeCodeSuivi}</span>
                </div>
                <div>
                  <span className="text-[#545f73] font-mono block text-[10px] uppercase">Statut Actuel</span>
                  <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-[11px] inline-block mt-0.5">
                    En cours d'évaluation
                  </span>
                </div>
                <div>
                  <span className="text-[#545f73] font-mono block text-[10px] uppercase">Délai Délibération</span>
                  <span className="font-semibold text-[#131b2e]">24 à 48 heures GMT</span>
                </div>
              </div>

              {/* 4 Life-cycle milestones */}
              <div className="border-t border-[#e2e7ff] pt-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#707974] block mb-3 font-bold">
                  Cycle de vie de votre dossier :
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-lg bg-[#baeed9]/40 border border-emerald-300">
                    <span className="text-[10px] font-mono font-bold text-emerald-800 block">JALON 1</span>
                    <span className="font-bold text-emerald-950 text-[11px]">Dossier Reçu</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#baeed9]/40 border border-emerald-300">
                    <span className="text-[10px] font-mono font-bold text-emerald-800 block">JALON 2</span>
                    <span className="font-bold text-emerald-950 text-[11px]">Test Rendu</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#eaedff] border border-[#1b4d3e] text-[#003629]">
                    <span className="text-[10px] font-mono font-bold text-[#1b4d3e] block">JALON 3</span>
                    <span className="font-bold text-[11px]">Instruction Dir.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-[#e2e7ff] text-[#707974]">
                    <span className="text-[10px] font-mono font-bold block">JALON 4</span>
                    <span className="text-[11px]">Décision Finale</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onOpenTrackingWithCode(activeCodeSuivi)}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#1b4d3e] hover:bg-[#003629] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <span>Ouvrir l'écran de suivi en direct</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setPublicView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] text-[#003629] border border-[#c0c9c3] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retourner à l'accueil</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
