import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ExternalLink, 
  FileText, 
  Award, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin 
} from 'lucide-react';

interface ApplicationDetailModalProps {
  candidatureId: string | null;
  onClose: () => void;
}

export const ApplicationDetailModal: React.FC<ApplicationDetailModalProps> = ({ 
  candidatureId, 
  onClose 
}) => {
  const { candidatures, postes, testTemplates, evaluateCandidature } = useApp();

  const cand = candidatures.find(c => c.id === candidatureId);
  const poste = cand ? postes.find(p => p.id === cand.posteId) : null;
  const testTemplate = cand ? testTemplates.find(t => t.id === cand.testAssigneId) : null;

  const [noteInput, setNoteInput] = useState<number>(cand?.soumission?.noteDirecteur || 16);
  const [commentInput, setCommentInput] = useState<string>(cand?.soumission?.commentaireDirecteur || '');
  const [successFeedback, setSuccessFeedback] = useState<string | null>(null);

  if (!cand) return null;

  const handleAction = (decision: 'valider' | 'refuser' | 'demander_complement') => {
    evaluateCandidature(cand.id, decision, Number(noteInput), commentInput);

    if (decision === 'valider') {
      setSuccessFeedback('Candidature homologuée ! Le profil a été automatiquement intégré à la liste des Collaborateurs actifs.');
    } else if (decision === 'refuser') {
      setSuccessFeedback('Candidature marquée comme non retenue.');
    } else {
      setSuccessFeedback('Demande de révision enregistrée.');
    }

    setTimeout(() => {
      setSuccessFeedback(null);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto font-sans">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-[#e2e7ff] overflow-hidden my-8 text-[#131b2e]">
        
        {/* Modal Top Bar */}
        <div className="bg-[#003629] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#baeed9] text-[#002117] flex items-center justify-center font-bold text-xs font-mono">
              {cand.codeSuivi.split('-')[1]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-display text-white">{cand.candidat.nom}</h3>
                <StatusBadge statut={cand.statut} />
              </div>
              <p className="text-[11px] text-white/70">
                Code Suivi : <span className="font-mono text-[#baeed9] font-bold">{cand.codeSuivi}</span> · {poste?.nom}
              </p>
            </div>
          </div>
          <button
            id="detail-modal-close"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Alert if action performed */}
        {successFeedback && (
          <div className="p-4 bg-[#baeed9] border-b border-emerald-300 text-[#002117] text-xs font-bold flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-800" />
            <span>{successFeedback}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Candidate Profile Summary */}
          <div className="bg-[#faf8ff] p-5 rounded-xl border border-[#e2e7ff]">
            <h4 className="text-xs font-bold text-[#003629] uppercase tracking-wider mb-3 flex items-center gap-1.5 font-mono">
              <User className="w-3.5 h-3.5 text-[#003629]" />
              Profil & Coordonnées du Candidat
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#545f73] mb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#707974]" />
                <span className="truncate">{cand.candidat.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#707974]" />
                <span>{cand.candidat.telephone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#707974]" />
                <span>{cand.candidat.ville} ({cand.candidat.anneesExperience})</span>
              </div>
            </div>

            {/* Links */}
            {(cand.candidat.portfolioUrl || cand.candidat.githubUrl) && (
              <div className="flex flex-wrap gap-2 pt-3 border-t border-[#e2e7ff] text-xs">
                {cand.candidat.portfolioUrl && (
                  <a
                    href={cand.candidat.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#003629] hover:underline font-bold bg-white px-3 py-1 rounded-lg border border-[#c0c9c3] font-mono"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Portfolio / Liens</span>
                  </a>
                )}
                {cand.candidat.githubUrl && (
                  <a
                    href={cand.candidat.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#545f73] hover:text-[#131b2e] font-semibold bg-white px-3 py-1 rounded-lg border border-[#c0c9c3] font-mono"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Profil GitHub / Pro</span>
                  </a>
                )}
              </div>
            )}

            {cand.candidat.presentation && (
              <div className="mt-3 pt-3 border-t border-[#e2e7ff] text-xs text-[#545f73]">
                <span className="font-bold text-[#131b2e]">Motivation : </span>
                {cand.candidat.presentation}
              </div>
            )}
          </div>

          {/* Test Assigné & Consignes */}
          <div className="border border-[#e2e7ff] rounded-xl p-5 bg-[#faf8ff] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#003629] uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <FileText className="w-3.5 h-3.5 text-[#1b4d3e]" />
                Épreuve technique attribuée
              </span>
              <span className="text-[11px] text-[#707974] font-medium font-mono">
                Délai : {testTemplate?.delaiJours} jours
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#131b2e] font-display">{testTemplate?.titre}</h4>
            <div className="text-xs text-[#545f73] bg-white p-3.5 rounded-lg leading-relaxed whitespace-pre-line border border-[#e2e7ff]">
              {testTemplate?.consignes}
            </div>
          </div>

          {/* Solution Soumise par le Candidat */}
          <div className="border border-[#e2e7ff] rounded-xl p-5 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-[#e2e7ff] pb-3">
              <h4 className="text-xs font-bold text-[#003629] uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-[#1b4d3e]" />
                Rendu soumis par le candidat
              </h4>
              {cand.soumission && (
                <span className="text-[11px] text-[#707974] font-mono">
                  Soumis le {new Date(cand.soumission.dateSoumission).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              )}
            </div>

            {cand.soumission ? (
              <div className="space-y-4">
                {/* Contenu Texte */}
                <div>
                  <span className="text-[11px] font-bold text-[#131b2e] uppercase tracking-wider block mb-1 font-mono">
                    Explication & Réponses rédigées :
                  </span>
                  <div className="p-4 rounded-xl bg-[#faf8ff] border border-[#e2e7ff] text-xs text-[#131b2e] whitespace-pre-line leading-relaxed font-sans">
                    {cand.soumission.contenuTexte || '(Aucune explication texte)'}
                  </div>
                </div>

                {/* Liens externes */}
                {cand.soumission.liensExternes && cand.soumission.liensExternes.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold text-[#131b2e] uppercase tracking-wider block mb-1 font-mono">
                      Livrables externes vérifiables :
                    </span>
                    <div className="space-y-1.5">
                      {cand.soumission.liensExternes.map((link, idx) => (
                        <a
                          key={idx}
                          href={link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] hover:bg-white text-xs text-[#003629] font-bold transition-colors font-mono"
                        >
                          <span className="truncate">{link}</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-2" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fichier joint simulé */}
                {cand.soumission.nomFichierSimule && (
                  <div>
                    <span className="text-[11px] font-bold text-[#131b2e] uppercase tracking-wider block mb-1 font-mono">
                      Fichier joint :
                    </span>
                    <div className="p-3 rounded-lg border border-[#e2e7ff] bg-[#faf8ff] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-[#131b2e] font-semibold">
                        <FileText className="w-4 h-4 text-[#003629]" />
                        <span>{cand.soumission.nomFichierSimule}</span>
                        <span className="text-[#707974] font-mono">({cand.soumission.tailleFichierSimule || 'Archive'})</span>
                      </div>
                      <span className="text-[11px] text-[#002117] font-bold bg-[#baeed9] border border-emerald-300 px-2.5 py-0.5 rounded font-mono">
                        Téléchargement prêt
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-[#545f73] bg-[#faf8ff] rounded-lg border border-[#e2e7ff]">
                <Clock className="w-6 h-6 text-[#1b4d3e] mx-auto mb-1 animate-pulse" />
                <p className="font-bold text-[#003629]">Test en cours de réalisation</p>
                <p className="text-[#707974] mt-0.5">Le candidat n'a pas encore validé sa soumission.</p>
              </div>
            )}
          </div>

          {/* Section Délibération & Actions du Directeur */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#faf8ff] space-y-4 border border-[#e2e7ff]">
            <h4 className="text-xs font-bold text-[#003629] uppercase tracking-wider flex items-center gap-2 font-mono">
              <Award className="w-4 h-4 text-[#1b4d3e]" />
              Délibération & Homologation du Directeur
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="sm:col-span-1">
                <label htmlFor="eval-note" className="block text-xs text-[#545f73] font-bold mb-1 font-mono">
                  Note technique (/20)
                </label>
                <input
                  id="eval-note"
                  type="number"
                  min={0}
                  max={20}
                  value={noteInput}
                  onChange={(e) => setNoteInput(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-lg bg-white border border-[#c0c9c3] text-[#003629] text-base font-bold text-center focus:outline-none focus:border-[#1b4d3e] font-mono"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="eval-comment" className="block text-xs text-[#545f73] font-bold mb-1 font-mono">
                  Commentaire & Appréciation officielle
                </label>
                <input
                  id="eval-comment"
                  type="text"
                  placeholder="Ex: Excellente rigueur mobile-first, respect des critères burkinabè."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#c0c9c3] text-xs text-[#131b2e] focus:outline-none focus:border-[#1b4d3e] placeholder:text-[#707974]"
                />
              </div>
            </div>

            {/* Decision Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                id="btn-valider-collaborateur"
                type="button"
                onClick={() => handleAction('valider')}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-[#1b4d3e] hover:bg-[#003629] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Valider et intégrer comme Collaborateur</span>
              </button>

              <button
                id="btn-demander-revision"
                type="button"
                onClick={() => handleAction('demander_complement')}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-white hover:bg-[#eaedff] text-[#003629] font-bold text-xs border border-[#c0c9c3] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#003629]" />
                <span>Demander un complément</span>
              </button>

              <button
                id="btn-refuser-candidature"
                type="button"
                onClick={() => handleAction('refuser')}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-xs border border-rose-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Refuser la candidature</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
