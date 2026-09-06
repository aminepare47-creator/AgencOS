import React, { useState } from 'react';
import {
  CalendarDays,
  Clock,
  FileCheck2,
  Send,
  BadgeCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatutTache, Tache } from '../../types';

export const STATUT_LABEL: Record<StatutTache, string> = {
  a_faire: 'À faire',
  en_cours: 'En cours',
  en_revue_directeur: 'En revue (Directeur)',
  validee: 'Validée',
  terminee: 'Terminée',
};

export const STATUT_STYLE: Record<StatutTache, string> = {
  a_faire: 'bg-slate-100 text-slate-700 border-slate-200',
  en_cours: 'bg-blue-50 text-blue-700 border-blue-200',
  en_revue_directeur: 'bg-amber-50 text-amber-700 border-amber-200',
  validee: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  terminee: 'bg-[#baeed9] text-[#002117] border-[#9ed1bd]',
};

const PRIORITE_STYLE: Record<Tache['priorite'], string> = {
  normale: 'text-slate-500',
  haute: 'text-orange-600 font-semibold',
  urgente: 'text-red-600 font-bold',
};

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });

export const TacheCard: React.FC<{ tache: Tache; showDeliverAction?: boolean }> = ({ tache, showDeliverAction }) => {
  const { updateTacheStatut } = useApp();
  const [lien, setLien] = useState('');
  const [heures, setHeures] = useState('');
  const [showForm, setShowForm] = useState(false);

  const submitForReview = () => {
    updateTacheStatut(tache.id, 'en_revue_directeur', {
      lienLivrable: lien.trim() || undefined,
      tempsPasseHeures: heures ? Number(heures) : undefined,
    });
    setShowForm(false);
  };

  return (
    <div className="rounded-xl border border-[#e2e7ff] bg-white p-5 shadow-xs">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
        <div>
          <p className="text-[11px] font-mono text-[#1b4d3e] font-semibold uppercase tracking-wide mb-1">
            {tache.projetNom}
          </p>
          <h4 className="font-bold text-sm text-[#003629]">{tache.titre}</h4>
        </div>
        <span className={`text-[11px] px-2.5 py-1 rounded-full border font-semibold ${STATUT_STYLE[tache.statut]}`}>
          {STATUT_LABEL[tache.statut]}
        </span>
      </div>
      <p className="text-xs text-[#545f73] leading-relaxed mb-3">{tache.description}</p>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#545f73] mb-3">
        <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> Livraison : {fmtDate(tache.dateLivraisonEstimee)}</span>
        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {tache.tempsPasseHeures}/{tache.tempsEstimeHeures} h</span>
        <span className={PRIORITE_STYLE[tache.priorite]}>Priorité : {tache.priorite}</span>
      </div>
      {tache.livrablesAttendus && (
        <ul className="text-[11px] text-[#545f73] list-disc pl-4 mb-3 space-y-0.5">
          {tache.livrablesAttendus.map((l, i) => <li key={i}>{l}</li>)}
        </ul>
      )}
      {tache.commentaireDirecteur && (
        <p className="text-[11px] text-[#1b4d3e] bg-[#f2f3ff] border border-[#e2e7ff] rounded-lg px-3 py-2 mb-3">
          <strong>Directeur :</strong> {tache.commentaireDirecteur}
        </p>
      )}
      {tache.noteDirecteur && (
        <p className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 mb-3">
          <BadgeCheck className="w-3.5 h-3.5 inline mr-1" />{tache.noteDirecteur}
        </p>
      )}

      {showDeliverAction && (tache.statut === 'a_faire' || tache.statut === 'en_cours') && (
        showForm ? (
          <div className="space-y-2 border-t border-[#e2e7ff] pt-3">
            <input
              type="url"
              value={lien}
              onChange={(e) => setLien(e.target.value)}
              placeholder="Lien du livrable (GitHub, Figma, Drive...)"
              className="w-full border border-[#c0c9c3] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1b4d3e]"
            />
            <input
              type="number"
              min="0"
              value={heures}
              onChange={(e) => setHeures(e.target.value)}
              placeholder="Temps passé (heures)"
              className="w-full border border-[#c0c9c3] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#1b4d3e]"
            />
            <div className="flex gap-2">
              <button
                onClick={submitForReview}
                className="inline-flex items-center gap-1.5 bg-[#1b4d3e] hover:bg-[#003629] text-white text-xs font-semibold px-3.5 py-2 rounded-lg cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> Soumettre au Directeur
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="text-xs text-[#545f73] px-3 py-2 hover:underline cursor-pointer"
              >
                Annuler
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-1.5 bg-[#f2f3ff] hover:bg-[#eaedff] border border-[#c0c9c3] text-[#003629] text-xs font-semibold px-3.5 py-2 rounded-lg cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" /> Soumettre un livrable
          </button>
        )
      )}
      {tache.lienLivrable && (
        <a
          href={tache.lienLivrable}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] text-blue-700 hover:underline mt-2"
        >
          <FileCheck2 className="w-3.5 h-3.5" /> Livrable soumis
        </a>
      )}
    </div>
  );
};
