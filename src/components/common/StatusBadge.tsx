import React from 'react';
import { StatutCandidature, StatutDevis } from '../../types';
import { CheckCircle2, Clock, AlertCircle, XCircle, FileText, Send } from 'lucide-react';

interface StatusBadgeProps {
  statut: StatutCandidature | StatutDevis | 'actif' | 'inactif';
  type?: 'candidature' | 'devis' | 'collaborateur';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ statut, type = 'candidature', className = '' }) => {
  if (type === 'collaborateur') {
    const isActif = statut === 'actif';
    return (
      <span
        id={`badge-collab-${statut}`}
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide font-mono ${
          isActif
            ? 'bg-[#C9DFF2] text-[#071A2E] border border-emerald-300'
            : 'bg-[#EEF3F8] text-[#545f73] border border-[#C3CEDA]'
        } ${className}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${isActif ? 'bg-emerald-600' : 'bg-slate-400'}`} />
        {isActif ? 'Actif' : 'Inactif'}
      </span>
    );
  }

  if (type === 'devis') {
    switch (statut) {
      case 'nouveau':
        return (
          <span id="badge-devis-nouveau" className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E1EAF2] text-[#0B2A4A] border border-[#14456F]/30 font-mono ${className}`}>
            <Clock className="w-3.5 h-3.5 text-[#14456F]" />
            Nouveau
          </span>
        );
      case 'contacte':
        return (
          <span id="badge-devis-contacte" className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 font-mono ${className}`}>
            <Send className="w-3.5 h-3.5 text-blue-600" />
            Contacté
          </span>
        );
      case 'devis_envoye':
        return (
          <span id="badge-devis-envoye" className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200 font-mono ${className}`}>
            <FileText className="w-3.5 h-3.5 text-purple-600" />
            Devis transmis
          </span>
        );
      case 'signe':
        return (
          <span id="badge-devis-signe" className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-300 font-mono ${className}`}>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Signé / Gagné
          </span>
        );
      case 'rejete':
        return (
          <span id="badge-devis-rejete" className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200 font-mono ${className}`}>
            <XCircle className="w-3.5 h-3.5 text-rose-500" />
            Sans suite
          </span>
        );
      default:
        return null;
    }
  }

  // Candidature badges
  switch (statut) {
    case 'recue':
      return (
        <span id="badge-cand-recue" className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EEF3F8] text-[#545f73] border border-[#C3CEDA] font-mono ${className}`}>
          <Clock className="w-3.5 h-3.5 text-[#707974]" />
          Reçue
        </span>
      );
    case 'test_en_cours':
      return (
        <span id="badge-cand-test-en-cours" className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-50 text-sky-800 border border-sky-200 font-mono ${className}`}>
          <Clock className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
          Test en cours
        </span>
      );
    case 'en_evaluation':
      return (
        <span id="badge-cand-en-evaluation" className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 font-mono ${className}`}>
          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
          À évaluer
        </span>
      );
    case 'validee':
      return (
        <span id="badge-cand-validee" className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C9DFF2] text-[#071A2E] border border-emerald-300 font-mono ${className}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
          Validée (Collaborateur)
        </span>
      );
    case 'refusee':
      return (
        <span id="badge-cand-refusee" className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-800 border border-rose-200 font-mono ${className}`}>
          <XCircle className="w-3.5 h-3.5 text-rose-500" />
          Non retenue
        </span>
      );
    default:
      return null;
  }
};
