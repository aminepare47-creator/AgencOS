import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Users, 
  Plus, 
  ShieldCheck, 
  Award, 
  Phone, 
  Mail, 
  Search
} from 'lucide-react';

interface CollaboratorsTabProps {
  onOpenAddCollab: () => void;
}

export const CollaboratorsTab: React.FC<CollaboratorsTabProps> = ({ onOpenAddCollab }) => {
  const { collaborateurs, postes, toggleCollaborateurStatut } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatut, setFilterStatut] = useState<string>('all');
  const [filterPoste, setFilterPoste] = useState<string>('all');

  const filteredCollabs = collaborateurs.filter(c => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = 
      !q ||
      c.nom.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.specialite?.toLowerCase().includes(q) ||
      c.ville.toLowerCase().includes(q);

    const matchesStatut = filterStatut === 'all' || c.statut === filterStatut;
    const matchesPoste = filterPoste === 'all' || c.posteId === filterPoste;

    return matchesQuery && matchesStatut && matchesPoste;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#003629] font-display">
            Registre des Collaborateurs Officiels
          </h2>
          <p className="text-xs sm:text-sm text-[#545f73] mt-0.5">
            Pilotez les prestataires et experts mobilisables pour les missions clientes de l'agence.
          </p>
        </div>

        <button
          onClick={onOpenAddCollab}
          id="btn-add-collaborator-tab"
          className="px-4 py-2.5 rounded-lg bg-[#1b4d3e] hover:bg-[#003629] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Ajouter un collaborateur direct</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e2e7ff] shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#707974] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Rechercher par nom, spécialité..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:bg-white"
          />
        </div>

        <div>
          <select
            value={filterStatut}
            onChange={(e) => setFilterStatut(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] focus:outline-none focus:border-[#1b4d3e] focus:bg-white"
          >
            <option value="all">Tous les statuts</option>
            <option value="actif">Collaborateurs actifs uniquement</option>
            <option value="inactif">Collaborateurs inactifs</option>
          </select>
        </div>

        <div>
          <select
            value={filterPoste}
            onChange={(e) => setFilterPoste(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] focus:outline-none focus:border-[#1b4d3e] focus:bg-white"
          >
            <option value="all">Tous les pôles métiers</option>
            {postes.map(p => (
              <option key={p.id} value={p.id}>{p.nom}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCollabs.map(collab => {
          const poste = postes.find(p => p.id === collab.posteId);
          const isActif = collab.statut === 'actif';

          return (
            <div
              key={collab.id}
              className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-xs transition-all flex flex-col justify-between ${
                isActif ? 'border-[#e2e7ff] hover:border-[#1b4d3e]' : 'border-[#e2e7ff] opacity-60 bg-[#faf8ff]'
              }`}
            >
              <div>
                {/* Top badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <StatusBadge statut={collab.statut} type="collaborateur" />

                  {collab.ajouteManuellement ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#eaedff] text-[#003629] border border-[#1b4d3e]/30 px-2.5 py-0.5 rounded-full font-mono">
                      <ShieldCheck className="w-3 h-3 text-[#1b4d3e]" />
                      Confiance directe
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#baeed9] text-[#002117] border border-emerald-300 px-2.5 py-0.5 rounded-full font-mono">
                      <Award className="w-3 h-3 text-emerald-800" />
                      Validé par test
                    </span>
                  )}
                </div>

                {/* Profile header */}
                <div className="flex items-start gap-3.5 mb-3.5">
                  {collab.avatarUrl ? (
                    <img
                      src={collab.avatarUrl}
                      alt={collab.nom}
                      className="w-12 h-12 rounded-xl object-cover border border-[#c0c9c3] shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-[#faf8ff] text-[#003629] font-bold border border-[#c0c9c3] flex items-center justify-center text-base shrink-0 font-mono">
                      {collab.nom.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-bold text-[#131b2e] font-display">{collab.nom}</h3>
                    <p className="text-xs font-bold text-[#003629]">{poste?.nom.split('(')[0]}</p>
                    <p className="text-[11px] text-[#707974]">{collab.ville}</p>
                  </div>
                </div>

                {/* Specialite & Notes */}
                {collab.specialite && (
                  <div className="bg-[#faf8ff] p-3 rounded-xl text-xs text-[#131b2e] mb-3.5 border border-[#e2e7ff]">
                    <span className="font-bold text-[#003629] block text-[10px] uppercase tracking-wider mb-0.5 font-mono">
                      Spécialité opérationnelle :
                    </span>
                    {collab.specialite}
                  </div>
                )}

                {/* Contact details */}
                <div className="space-y-1.5 text-xs text-[#545f73] mb-4 pt-2 border-t border-[#e2e7ff] font-mono">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#707974]" />
                    <span>{collab.telephone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#707974]" />
                    <span className="truncate">{collab.email}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-[#e2e7ff] flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#707974] font-mono">
                  Entrée : {collab.dateEntree}
                </span>

                <button
                  type="button"
                  onClick={() => toggleCollaborateurStatut(collab.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer font-mono ${
                    isActif
                      ? 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  {isActif ? 'Désactiver' : 'Réactiver'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
