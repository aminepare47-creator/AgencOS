import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  X, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Award,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface TrackApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode?: string;
}

export const TrackApplicationModal: React.FC<TrackApplicationModalProps> = ({ 
  isOpen, 
  onClose,
  initialCode = '' 
}) => {
  const { candidatures, postes, testTemplates } = useApp();
  const [searchQuery, setSearchQuery] = useState(initialCode);
  const [searched, setSearched] = useState(Boolean(initialCode));

  if (!isOpen) return null;

  const foundCandidature = candidatures.find(c => 
    c.codeSuivi.toLowerCase() === searchQuery.trim().toLowerCase() ||
    c.candidat.email.toLowerCase() === searchQuery.trim().toLowerCase()
  );

  const matchedPoste = foundCandidature 
    ? postes.find(p => p.id === foundCandidature.posteId)
    : null;

  const matchedTest = foundCandidature
    ? testTemplates.find(t => t.id === foundCandidature.testAssigneId)
    : null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto font-sans">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#D9E2EC] overflow-hidden my-8 text-[#131b2e]">
        
        {/* Header */}
        <div className="bg-[#0B2A4A] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C9DFF2]/20 text-[#C9DFF2] flex items-center justify-center">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                Portail de Suivi de Candidature
              </h3>
              <p className="text-[11px] text-white/70">
                Consultez l'état d'instruction de votre test et la délibération officielle
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Entrez votre numéro unique (ex: AOS-DEV-9120) ou votre email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#14456F] focus:bg-white font-mono"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#14456F] hover:bg-[#0B2A4A] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Consulter</span>
            </button>
          </form>

          {/* Search Results */}
          {searched && (
            foundCandidature ? (
              <div className="space-y-6">
                
                {/* Status Hero Card */}
                <div className="bg-[#F7F9FC] rounded-xl p-5 sm:p-6 border border-[#D9E2EC]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9E2EC] pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-[#0B2A4A]">
                          {foundCandidature.codeSuivi}
                        </span>
                        <StatusBadge statut={foundCandidature.statut} />
                      </div>
                      <h4 className="text-lg font-bold text-[#0B2A4A] font-display">
                        {foundCandidature.candidat.nom}
                      </h4>
                      <p className="text-xs text-[#545f73]">
                        Poste visé : <strong className="text-[#131b2e]">{matchedPoste?.nom || 'Poste agence'}</strong> · Localisation : {foundCandidature.candidat.ville}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-mono text-[#707974] block uppercase">Horodatage de Dépôt</span>
                      <span className="text-xs font-bold text-[#131b2e] font-mono">
                        {new Date(foundCandidature.dateCreation).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Specific Status Alert Box */}
                  {foundCandidature.statut === 'validee' && (
                    <div className="p-4 rounded-xl bg-[#C9DFF2]/40 border border-emerald-300 text-[#071A2E] space-y-2">
                      <div className="flex items-center gap-2 font-bold text-sm font-display text-emerald-950">
                        <UserCheck className="w-5 h-5 text-emerald-800" />
                        <span>Félicitations ! Vous êtes Collaborateur Officiel d'AgenceOS</span>
                      </div>
                      <p className="text-xs leading-relaxed text-[#131b2e]">
                        Votre épreuve technique a été officiellement homologuée par la Direction Technique. Vos coordonnées sont intégrées à la réserve active de talents. Le cabinet prendra attache avec vous sur WhatsApp au <strong className="text-[#0B2A4A]">{foundCandidature.candidat.telephone}</strong>.
                      </p>
                      {foundCandidature.soumission?.noteDirecteur && (
                        <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-emerald-300 text-xs font-bold text-emerald-900 font-mono">
                          <Award className="w-4 h-4 text-emerald-700" />
                          <span>Note finale attribuée : {foundCandidature.soumission.noteDirecteur} / 20</span>
                        </div>
                      )}
                    </div>
                  )}

                  {foundCandidature.statut === 'en_evaluation' && (
                    <div className="p-4 rounded-xl bg-[#E1EAF2] border border-[#14456F] text-[#0B2A4A] space-y-1">
                      <div className="flex items-center gap-2 font-bold text-xs text-[#0B2A4A]">
                        <Clock className="w-4 h-4 text-[#14456F]" />
                        <span>Épreuve en cours d'instruction par la Direction</span>
                      </div>
                      <p className="text-xs text-[#545f73]">
                        Votre rendu a bien été réceptionné le {foundCandidature.soumission?.dateSoumission ? new Date(foundCandidature.soumission.dateSoumission).toLocaleDateString('fr-FR') : 'récemment'}. La délibération sera rendue sous 24 à 48 heures ouvrées.
                      </p>
                    </div>
                  )}

                  {foundCandidature.statut === 'test_en_cours' && (
                    <div className="p-4 rounded-xl bg-[#EEF3F8] border border-[#C3CEDA] text-[#131b2e] space-y-2">
                      <div className="flex items-center gap-2 font-bold text-xs text-[#0B2A4A]">
                        <FileText className="w-4 h-4 text-[#14456F]" />
                        <span>Session technique en attente de restitution</span>
                      </div>
                      <p className="text-xs text-[#545f73]">
                        Votre jeton d'accès au test pour l'épreuve "{matchedTest?.titre}" est actif.
                      </p>
                    </div>
                  )}

                  {foundCandidature.statut === 'refusee' && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-950 space-y-1">
                      <div className="flex items-center gap-2 font-bold text-xs text-red-800">
                        <AlertCircle className="w-4 h-4 text-red-700" />
                        <span>Candidature non retenue pour cette session</span>
                      </div>
                      <p className="text-xs text-red-900 leading-relaxed">
                        {foundCandidature.soumission?.commentaireDirecteur || 'Le niveau requis sur les critères d’évaluation n’a pas été atteint. Nous vous remercions pour votre rigueur et vous encourageons à candidater lors des prochaines sessions.'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Timeline / History */}
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#131b2e] uppercase tracking-wider mb-3">
                    Historique du dossier
                  </h4>
                  <div className="space-y-2.5">
                    {foundCandidature.historique.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs">
                        <div className="w-6 h-6 rounded-full bg-[#C9DFF2] text-[#0B2A4A] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px] font-mono">
                          {idx + 1}
                        </div>
                        <div className="flex-1 bg-[#F7F9FC] p-3 rounded-lg border border-[#D9E2EC]">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-semibold text-[#131b2e]">{step.message}</span>
                            <span className="text-[10px] text-[#707974] shrink-0 font-mono">
                              {new Date(step.date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <StatusBadge statut={step.statut} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                </div>
            ) : (
              <div className="py-8 text-center space-y-3 bg-[#F7F9FC] rounded-xl border border-[#D9E2EC] p-6">
                <AlertCircle className="w-8 h-8 text-[#707974] mx-auto" />
                <h4 className="text-sm font-bold text-[#0B2A4A] font-display">Aucune candidature trouvée</h4>
                <p className="text-xs text-[#545f73] max-w-sm mx-auto">
                  Aucun dossier ne correspond à la référence "<strong>{searchQuery}</strong>". Vérifiez l'orthographe du code (ex: AOS-DEV-9120) ou l'adresse email.
                </p>
              </div>
            )
          )}

        </div>
      </div>
    </div>
  );
};
