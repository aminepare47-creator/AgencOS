import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ModeleTest } from '../../types';
import { EditTestModal } from './EditTestModal';
import { 
  Plus, 
  Clock, 
  Edit3, 
  CheckCircle2, 
  Eye
} from 'lucide-react';

export const TestTemplatesTab: React.FC = () => {
  const { testTemplates, postes, setPublicView, setSelectedPosteForApplication } = useApp();

  const [selectedTestToEdit, setSelectedTestToEdit] = useState<ModeleTest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (test: ModeleTest) => {
    setSelectedTestToEdit(test);
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedTestToEdit(null);
    setIsModalOpen(true);
  };

  const handlePreviewAsCandidate = (posteId: string) => {
    setSelectedPosteForApplication(posteId);
    setPublicView('candidate_flow');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0B2A4A] font-display">
            Épreuves & Modèles de Tests Métier
          </h2>
          <p className="text-xs sm:text-sm text-[#545f73] mt-0.5">
            Configurez les exercices pratiques, exigences techniques et critères de sélection attribués à chaque profil.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 rounded-lg bg-[#14456F] hover:bg-[#0B2A4A] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Créer un nouveau test</span>
        </button>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testTemplates.map(test => {
          const poste = postes.find(p => p.id === test.posteId);

          return (
            <div
              key={test.id}
              className="bg-white rounded-2xl border border-[#D9E2EC] p-6 shadow-xs hover:border-[#14456F] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-[#0B2A4A] bg-[#E1EAF2] border border-[#14456F]/20 px-3 py-0.5 rounded-full font-mono">
                    {poste?.nom.split('(')[0] || 'Pôle Métier'}
                  </span>

                  <div className="flex items-center gap-2 text-xs text-[#545f73] font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#14456F]" />
                    <span>Délai d'épreuve : <strong className="text-[#131b2e]">{test.delaiJours} jours</strong></span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#131b2e] mb-2 font-display">
                  {test.titre}
                </h3>

                <div className="mb-4">
                  <span className="text-[10px] uppercase font-bold text-[#707974] block mb-1 font-mono">
                    Modalité de restitution : <span className="text-[#131b2e] capitalize">{test.typeRendu}</span>
                  </span>
                  <div className="bg-[#F7F9FC] p-3.5 rounded-xl border border-[#D9E2EC] text-xs text-[#545f73] line-clamp-3 leading-relaxed whitespace-pre-line">
                    {test.consignes}
                  </div>
                </div>

                {/* Expected deliverables preview */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[11px] font-bold text-[#131b2e] uppercase tracking-wider block font-mono">
                    Livrables exigés ({test.livrablesAttendus.length}) :
                  </span>
                  <ul className="space-y-1 text-xs text-[#545f73]">
                    {test.livrablesAttendus.slice(0, 2).map((liv, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="truncate">{liv}</span>
                      </li>
                    ))}
                    {test.livrablesAttendus.length > 2 && (
                      <li className="text-[11px] text-[#707974] pl-5 font-mono">
                        + {test.livrablesAttendus.length - 2} autre(s) livrable(s)...
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#D9E2EC] flex items-center justify-between text-xs">
                <span className="text-[10px] text-[#707974] font-mono">
                  Dernière révision : {test.derniereModification}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePreviewAsCandidate(test.posteId)}
                    className="px-3 py-1.5 rounded-lg bg-[#F7F9FC] hover:bg-[#E1EAF2] text-[#0B2A4A] border border-[#C3CEDA] font-bold flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
                    title="Simuler le parcours côté candidat"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#0B2A4A]" />
                    <span>Aperçu candidat</span>
                  </button>

                  <button
                    onClick={() => handleEdit(test)}
                    className="px-3 py-1.5 rounded-lg bg-[#14456F] hover:bg-[#0B2A4A] text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer text-xs shadow-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-white" />
                    <span>Modifier</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit/Create Modal */}
      <EditTestModal
        test={selectedTestToEdit}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTestToEdit(null);
        }}
      />
    </div>
  );
};
