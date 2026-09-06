import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Users, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  Plus 
} from 'lucide-react';

interface OverviewTabProps {
  onSelectCandidature: (id: string) => void;
  onOpenAddCollab: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onSelectCandidature, onOpenAddCollab }) => {
  const { 
    candidatures, 
    collaborateurs, 
    postes, 
    devisList, 
    setDirectorTab 
  } = useApp();

  // Metrics
  const totalCandidatures = candidatures.length;
  const pendingEvaluationCount = candidatures.filter(c => c.statut === 'en_evaluation').length;
  const inProgressTestsCount = candidatures.filter(c => c.statut === 'test_en_cours').length;
  const validatedCount = candidatures.filter(c => c.statut === 'validee').length;

  const totalCollaborateurs = collaborateurs.length;
  const activeCollaborateurs = collaborateurs.filter(c => c.statut === 'actif').length;
  const manualCollaborateurs = collaborateurs.filter(c => c.ajouteManuellement).length;
  const recruitedFromTest = collaborateurs.filter(c => !c.ajouteManuellement).length;

  const newQuotes = devisList.filter(d => d.statut === 'nouveau').length;

  // Breakdown of active collaborators by job
  const collaboratorsByJob = postes.map(p => {
    const count = collaborateurs.filter(c => c.posteId === p.id && c.statut === 'actif').length;
    return {
      poste: p,
      count,
    };
  });

  return (
    <div className="space-y-8 font-sans">
      
      {/* Welcome & Director Role Headline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#003629] text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div>
          <span className="text-[11px] font-mono font-bold text-[#baeed9] uppercase tracking-wider block mb-1">
            Tableau de Bord Direction · Supervision Technique
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Pilotage Opérationnel & Recrutement
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl leading-relaxed">
            Évaluez les tests techniques des postulants burkinabè, organisez votre équipe d'experts et traitez les demandes de devis clients.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenAddCollab}
            className="px-4 py-2.5 rounded-lg bg-white hover:bg-[#faf8ff] text-[#003629] font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#003629]" />
            <span>Ajouter un collaborateur direct</span>
          </button>

          <button
            onClick={() => setDirectorTab('applications')}
            className="px-4 py-2.5 rounded-lg bg-[#1b4d3e] hover:bg-[#002117] text-white font-bold text-xs border border-white/20 transition-colors flex items-center gap-1.5 cursor-pointer font-mono"
          >
            <Clock className="w-4 h-4 text-[#baeed9]" />
            <span>{pendingEvaluationCount} test(s) à évaluer</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Tests to Evaluate */}
        <div 
          onClick={() => setDirectorTab('applications')}
          className="bg-white rounded-2xl border border-[#e2e7ff] p-5 sm:p-6 shadow-xs hover:border-[#1b4d3e] cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-[#545f73] uppercase tracking-wider font-mono">
              Tests à évaluer
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#003629] font-display">
            {pendingEvaluationCount}
          </div>
          <p className="text-xs text-amber-800 font-bold mt-1 flex items-center gap-1 font-mono">
            <span>En attente de notation</span>
            <ArrowRight className="w-3 h-3 ml-auto" />
          </p>
        </div>

        {/* Card 2: Collaborateurs Actifs */}
        <div 
          onClick={() => setDirectorTab('collaborators')}
          className="bg-white rounded-2xl border border-[#e2e7ff] p-5 sm:p-6 shadow-xs hover:border-[#1b4d3e] cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-[#545f73] uppercase tracking-wider font-mono">
              Collaborateurs Actifs
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#baeed9] text-[#003629] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#003629] font-display">
            {activeCollaborateurs} <span className="text-xs text-[#545f73] font-normal font-mono">/ {totalCollaborateurs}</span>
          </div>
          <p className="text-xs text-[#545f73] mt-1">
            {manualCollaborateurs} de confiance · {recruitedFromTest} via test
          </p>
        </div>

        {/* Card 3: Total Candidatures */}
        <div 
          onClick={() => setDirectorTab('applications')}
          className="bg-white rounded-2xl border border-[#e2e7ff] p-5 sm:p-6 shadow-xs hover:border-[#1b4d3e] cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-[#545f73] uppercase tracking-wider font-mono">
              Total Dossiers
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#f2f3ff] text-[#003629] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#003629] font-display">
            {totalCandidatures}
          </div>
          <p className="text-xs text-[#545f73] mt-1 font-mono">
            {inProgressTestsCount} en cours · {validatedCount} validé(s)
          </p>
        </div>

        {/* Card 4: Demandes Devis Clients */}
        <div 
          onClick={() => setDirectorTab('quotes')}
          className="bg-white rounded-2xl border border-[#e2e7ff] p-5 sm:p-6 shadow-xs hover:border-[#1b4d3e] cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-[#545f73] uppercase tracking-wider font-mono">
              Devis Clients Reçus
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#eaedff] text-[#003629] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#003629] font-display">
            {devisList.length}
          </div>
          <p className="text-xs text-[#003629] font-bold mt-1 font-mono">
            {newQuotes} nouveau(x) projet(s)
          </p>
        </div>
      </div>

      {/* Two Column Layout: Pending Submissions & Collaborator Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Pending Test Submissions */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#e2e7ff] p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e2e7ff] pb-4 mb-4">
            <div>
              <h3 className="text-base font-bold text-[#003629] flex items-center gap-2 font-display">
                <Clock className="w-4 h-4 text-[#1b4d3e]" />
                <span>Tests Soumis en Attente d'Évaluation</span>
              </h3>
              <p className="text-xs text-[#545f73]">
                Consultez le travail des candidats et décidez de leur intégration
              </p>
            </div>
            <button
              onClick={() => setDirectorTab('applications')}
              className="text-xs text-[#003629] font-bold hover:underline cursor-pointer font-mono"
            >
              Voir tout ({candidatures.length})
            </button>
          </div>

          {candidatures.filter(c => c.statut === 'en_evaluation').length === 0 ? (
            <div className="py-8 text-center text-[#545f73] text-xs bg-[#faf8ff] rounded-xl border border-[#e2e7ff]">
              <CheckCircle2 className="w-8 h-8 text-[#1b4d3e] mx-auto mb-2" />
              <p className="font-bold text-[#003629]">Tous les tests soumis ont été évalués !</p>
              <p className="text-[#545f73] mt-0.5">Aucune candidature en attente de délibération.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {candidatures
                .filter(c => c.statut === 'en_evaluation')
                .map(cand => {
                  const poste = postes.find(p => p.id === cand.posteId);
                  return (
                    <div
                      key={cand.id}
                      className="p-4 rounded-xl border border-[#e2e7ff] bg-[#faf8ff] hover:border-[#1b4d3e] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-bold text-[#003629]">
                            {cand.codeSuivi}
                          </span>
                          <span className="text-[10px] uppercase font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.2 rounded font-mono">
                            À noter
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-[#131b2e] font-display">
                          {cand.candidat.nom}
                        </h4>
                        <p className="text-xs text-[#545f73]">
                          {poste?.nom} · {cand.candidat.ville}
                        </p>
                        {cand.soumission && (
                          <p className="text-[11px] text-[#545f73] mt-1 line-clamp-1 italic">
                            "{cand.soumission.contenuTexte.slice(0, 90)}..."
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => onSelectCandidature(cand.id)}
                        className="px-4 py-2 rounded-lg bg-[#1b4d3e] hover:bg-[#003629] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
                      >
                        <span>Évaluer le test</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Right: Team Breakdown by Discipline */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#e2e7ff] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="border-b border-[#e2e7ff] pb-4 mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#003629] font-display">
                  Pôles d'Expertise Actifs
                </h3>
                <p className="text-xs text-[#545f73]">
                  Répartition des talents opérationnels
                </p>
              </div>
              <button
                onClick={() => setDirectorTab('collaborators')}
                className="text-xs text-[#003629] font-bold hover:underline cursor-pointer font-mono"
              >
                Gérer ({activeCollaborateurs})
              </button>
            </div>

            <div className="space-y-4">
              {collaboratorsByJob.map(item => (
                <div key={item.poste.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#131b2e]">{item.poste.nom.split('(')[0]}</span>
                    <span className="font-bold text-[#003629] font-mono">{item.count} expert(s)</span>
                  </div>
                  <div className="w-full bg-[#faf8ff] rounded-full h-2 overflow-hidden border border-[#e2e7ff]">
                    <div 
                      className="bg-[#1b4d3e] h-2 rounded-full transition-all"
                      style={{ 
                        width: `${Math.min(100, Math.max(10, (item.count / (activeCollaborateurs || 1)) * 100))}%` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[#e2e7ff] mt-6 bg-[#faf8ff] -mx-6 -mb-6 p-4 rounded-b-2xl">
            <p className="text-xs text-[#545f73] mb-2">
              Besoin d'intégrer rapidement un graphiste ou développeur de confiance ?
            </p>
            <button
              onClick={onOpenAddCollab}
              className="w-full py-2 px-3 rounded-lg bg-white hover:bg-[#eaedff] border border-[#c0c9c3] text-[#003629] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#003629]" />
              <span>Ajouter directement une connaissance de confiance</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Client Quotes Box */}
      <div className="bg-white rounded-2xl border border-[#e2e7ff] p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#e2e7ff] pb-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-[#003629] flex items-center gap-2 font-display">
              <Sparkles className="w-4 h-4 text-[#1b4d3e]" />
              <span>Dernières Demandes de Devis Reçues</span>
            </h3>
            <p className="text-xs text-[#545f73]">
              Opportunités d'entreprises burkinabè en attente de réponse
            </p>
          </div>
          <button
            onClick={() => setDirectorTab('quotes')}
            className="text-xs text-[#003629] font-bold hover:underline cursor-pointer font-mono"
          >
            Tous les devis ({devisList.length})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {devisList.slice(0, 3).map(devis => (
            <div key={devis.id} className="p-4 rounded-xl border border-[#e2e7ff] bg-[#faf8ff] hover:border-[#1b4d3e] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <StatusBadge statut={devis.statut} type="devis" />
                  <span className="text-[10px] text-[#707974] font-mono">
                    {new Date(devis.dateDemande).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#131b2e] font-display">{devis.entreprise}</h4>
                <p className="text-xs text-[#545f73] mb-1">{devis.clientNom} · {devis.ville}</p>
                <p className="text-xs font-bold text-[#003629] mb-2 font-mono">Budget : {devis.budgetEstime}</p>
                <p className="text-xs text-[#545f73] line-clamp-2 italic">
                  "{devis.descriptionProjet}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#e2e7ff] mt-3 flex items-center justify-between">
                <span className="text-[11px] text-[#707974] font-mono">{devis.telephone}</span>
                <button
                  onClick={() => setDirectorTab('quotes')}
                  className="text-xs font-bold text-[#003629] hover:underline cursor-pointer"
                >
                  Examiner
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
