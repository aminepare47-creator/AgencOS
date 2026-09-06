import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Search, 
  ChevronRight, 
  User, 
  Award,
  Filter
} from 'lucide-react';

interface ApplicationsTabProps {
  onSelectCandidature: (id: string) => void;
}

export const ApplicationsTab: React.FC<ApplicationsTabProps> = ({ onSelectCandidature }) => {
  const { candidatures, postes } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatut, setFilterStatut] = useState<string>('all');
  const [filterPoste, setFilterPoste] = useState<string>('all');

  // Filter logic
  const filteredCandidatures = candidatures.filter(cand => {
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = 
      !query ||
      cand.candidat.nom.toLowerCase().includes(query) ||
      cand.candidat.email.toLowerCase().includes(query) ||
      cand.codeSuivi.toLowerCase().includes(query) ||
      cand.candidat.ville.toLowerCase().includes(query);

    const matchesStatut = filterStatut === 'all' || cand.statut === filterStatut;
    const matchesPoste = filterPoste === 'all' || cand.posteId === filterPoste;

    return matchesQuery && matchesStatut && matchesPoste;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#003629] font-display">
            Candidatures & Épreuves Techniques
          </h2>
          <p className="text-xs sm:text-sm text-[#545f73] mt-0.5">
            Dépouillement des dossiers, examen des livrables et homologation des accès collaborateurs.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-white border border-[#c0c9c3] text-[#131b2e] font-bold">
            Total : {candidatures.length}
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 font-bold">
            À corriger : {candidatures.filter(c => c.statut === 'en_evaluation').length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e2e7ff] shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#707974] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Recherche (nom, email, code AOS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:bg-white"
            />
          </div>

          {/* Filter Statut */}
          <div>
            <select
              value={filterStatut}
              onChange={(e) => setFilterStatut(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] focus:outline-none focus:border-[#1b4d3e] focus:bg-white"
            >
              <option value="all">Tous les statuts</option>
              <option value="en_evaluation">À évaluer (Tests rendus)</option>
              <option value="validee">Validées (Collaborateurs intégrés)</option>
              <option value="test_en_cours">Test en cours</option>
              <option value="refusee">Non retenues</option>
            </select>
          </div>

          {/* Filter Poste */}
          <div>
            <select
              value={filterPoste}
              onChange={(e) => setFilterPoste(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] focus:outline-none focus:border-[#1b4d3e] focus:bg-white"
            >
              <option value="all">Tous les métiers</option>
              {postes.map(p => (
                <option key={p.id} value={p.id}>{p.nom}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick status tabs pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#e2e7ff]">
          <span className="text-[11px] font-bold text-[#707974] mr-1 font-mono uppercase">Raccourcis :</span>
          <button
            onClick={() => setFilterStatut('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors font-mono cursor-pointer ${
              filterStatut === 'all' 
                ? 'bg-[#1b4d3e] text-white' 
                : 'bg-[#faf8ff] text-[#545f73] border border-[#c0c9c3] hover:text-[#003629]'
            }`}
          >
            Tous ({candidatures.length})
          </button>
          <button
            onClick={() => setFilterStatut('en_evaluation')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors font-mono cursor-pointer ${
              filterStatut === 'en_evaluation' 
                ? 'bg-amber-600 text-white' 
                : 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100'
            }`}
          >
            À corriger ({candidatures.filter(c => c.statut === 'en_evaluation').length})
          </button>
          <button
            onClick={() => setFilterStatut('validee')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors font-mono cursor-pointer ${
              filterStatut === 'validee' 
                ? 'bg-emerald-700 text-white' 
                : 'bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100'
            }`}
          >
            Validés ({candidatures.filter(c => c.statut === 'validee').length})
          </button>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-2xl border border-[#e2e7ff] shadow-xs overflow-hidden">
        {filteredCandidatures.length === 0 ? (
          <div className="py-12 text-center text-[#545f73] text-xs">
            <User className="w-8 h-8 text-[#707974] mx-auto mb-2" />
            <p className="font-bold text-[#003629]">Aucun dossier ne correspond à vos filtres.</p>
            <p className="text-[#545f73] mt-0.5">Essayez de réinitialiser la recherche.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#e2e7ff]">
            {filteredCandidatures.map(cand => {
              const poste = postes.find(p => p.id === cand.posteId);
              const isToReview = cand.statut === 'en_evaluation';

              return (
                <div
                  key={cand.id}
                  onClick={() => onSelectCandidature(cand.id)}
                  className={`p-4 sm:p-5 hover:bg-[#faf8ff] transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isToReview ? 'bg-amber-50/50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#faf8ff] border border-[#c0c9c3] text-[#003629] flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 font-mono">
                      {cand.candidat.nom.slice(0, 2).toUpperCase()}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-mono text-xs font-bold text-[#003629] bg-[#eaedff] border border-[#1b4d3e]/20 px-2 py-0.5 rounded">
                          {cand.codeSuivi}
                        </span>
                        <StatusBadge statut={cand.statut} />
                        {cand.soumission?.noteDirecteur !== undefined && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-900 bg-[#baeed9] border border-emerald-300 px-2 py-0.5 rounded font-mono">
                            <Award className="w-3 h-3 text-emerald-800" />
                            {cand.soumission.noteDirecteur}/20
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-[#131b2e] font-display">
                        {cand.candidat.nom}
                      </h4>
                      <p className="text-xs text-[#545f73] font-medium">
                        {poste?.nom} · <span className="text-[#707974]">{cand.candidat.ville} ({cand.candidat.anneesExperience})</span>
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-[#707974] mt-1 font-mono">
                        <span>Email : {cand.candidat.email}</span>
                        <span>·</span>
                        <span>Tél : {cand.candidat.telephone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#e2e7ff]">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-[#707974] block font-mono uppercase">Soumis le</span>
                      <span className="text-xs text-[#131b2e] font-bold font-mono">
                        {new Date(cand.dateCreation).toLocaleDateString('fr-FR')}
                      </span>
                    </div>

                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                        isToReview
                          ? 'bg-[#1b4d3e] text-white hover:bg-[#003629] shadow-xs'
                          : 'bg-[#faf8ff] text-[#003629] border border-[#c0c9c3] hover:bg-[#eaedff]'
                      }`}
                    >
                      <span>{isToReview ? 'Noter le test' : 'Consulter'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
