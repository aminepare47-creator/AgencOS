import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings, 
  Briefcase, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Building,
  MapPin
} from 'lucide-react';

export const SettingsTab: React.FC = () => {
  const { postes, togglePosteRecrutement, createPoste, resetAllData } = useApp();

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // New Poste Form
  const [isAddingPoste, setIsAddingPoste] = useState(false);
  const [newPosteNom, setNewPosteNom] = useState('');
  const [newPosteCode, setNewPosteCode] = useState('');
  const [newPosteDesc, setNewPosteDesc] = useState('');
  const [newPosteSkills, setNewPosteSkills] = useState('');

  const handleAddPoste = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPosteNom || !newPosteDesc) return;

    createPoste({
      nom: newPosteNom,
      codeMetier: newPosteCode || newPosteNom.toLowerCase().replace(/\s+/g, '_'),
      descriptionCourte: newPosteDesc,
      competencesCles: newPosteSkills ? newPosteSkills.split(',').map(s => s.trim()) : ['Autonomie', 'Rigueur'],
      ouvertRecrutement: true,
    });

    setNewPosteNom('');
    setNewPosteCode('');
    setNewPosteDesc('');
    setNewPosteSkills('');
    setIsAddingPoste(false);
  };

  const handleReset = () => {
    resetAllData();
    setIsResetConfirmOpen(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl font-sans">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-[#003629] font-display">
          Paramétrage & Gouvernance Agence
        </h2>
        <p className="text-xs sm:text-sm text-[#545f73] mt-0.5">
          Contrôle des flux de recrutement par métier, coordonnées territoriales et réinitialisation du banc de test.
        </p>
      </div>

      {resetSuccess && (
        <div className="p-4 bg-[#baeed9] border border-emerald-300 rounded-xl text-xs font-bold text-[#002117] flex items-center gap-2 font-mono">
          <CheckCircle2 className="w-4 h-4 text-emerald-800" />
          <span>Données réinitialisées avec succès aux valeurs de démonstration officielles d'AgenceOS !</span>
        </div>
      )}

      {/* Recrutement par Métier */}
      <div className="bg-white rounded-2xl border border-[#e2e7ff] p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e2e7ff] pb-4">
          <div>
            <h3 className="text-base font-bold text-[#003629] flex items-center gap-2 font-display">
              <Briefcase className="w-4 h-4 text-[#1b4d3e]" />
              <span>Pôles de Recrutement Actifs</span>
            </h3>
            <p className="text-xs text-[#545f73]">
              Activez ou suspendez la réception des candidatures et le passage des tests
            </p>
          </div>

          <button
            onClick={() => setIsAddingPoste(!isAddingPoste)}
            className="px-3.5 py-1.5 rounded-lg bg-[#faf8ff] hover:bg-[#eaedff] text-[#003629] border border-[#c0c9c3] text-xs font-bold flex items-center gap-1.5 transition-colors self-start cursor-pointer font-mono"
          >
            <Plus className="w-3.5 h-3.5 text-[#003629]" />
            <span>{isAddingPoste ? 'Annuler' : 'Ajouter un métier'}</span>
          </button>
        </div>

        {/* Add Poste Form */}
        {isAddingPoste && (
          <form onSubmit={handleAddPoste} className="p-4 bg-[#faf8ff] rounded-xl border border-[#e2e7ff] space-y-3">
            <h4 className="text-xs font-bold text-[#003629] uppercase tracking-wider font-mono">
              Nouveau métier au recrutement
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1 font-mono">Intitulé du poste *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Rédacteur SEO & Copywriter"
                  value={newPosteNom}
                  onChange={(e) => setNewPosteNom(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-[#c0c9c3] text-xs bg-white text-[#131b2e] focus:outline-none focus:border-[#1b4d3e]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1 font-mono">Code métier unique</label>
                <input
                  type="text"
                  placeholder="Ex: redacteur_seo"
                  value={newPosteCode}
                  onChange={(e) => setNewPosteCode(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-[#c0c9c3] text-xs bg-white text-[#131b2e] focus:outline-none focus:border-[#1b4d3e] font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1 font-mono">Description courte *</label>
              <input
                type="text"
                required
                placeholder="Ex: Rédaction de contenus persuasifs et optimisation du référencement web"
                value={newPosteDesc}
                onChange={(e) => setNewPosteDesc(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-[#c0c9c3] text-xs bg-white text-[#131b2e] focus:outline-none focus:border-[#1b4d3e]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1 font-mono">Compétences clés (séparées par virgules)</label>
              <input
                type="text"
                placeholder="Ex: SEO, Français irréprochable, Storytelling, WordPress"
                value={newPosteSkills}
                onChange={(e) => setNewPosteSkills(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-[#c0c9c3] text-xs bg-white text-[#131b2e] focus:outline-none focus:border-[#1b4d3e]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-1 font-mono">
              <button
                type="button"
                onClick={() => setIsAddingPoste(false)}
                className="px-3 py-1.5 text-xs text-[#545f73] hover:text-[#131b2e] cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#1b4d3e] hover:bg-[#003629] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                Créer et ouvrir au recrutement
              </button>
            </div>
          </form>
        )}

        {/* Existing Postes list */}
        <div className="space-y-3">
          {postes.map(poste => (
            <div
              key={poste.id}
              className="p-4 rounded-xl border border-[#e2e7ff] bg-[#faf8ff] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-bold text-[#131b2e] font-display">{poste.nom}</h4>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono ${
                    poste.ouvertRecrutement 
                      ? 'bg-[#baeed9] text-[#002117] border border-emerald-300'
                      : 'bg-[#f2f3ff] text-[#545f73] border border-[#c0c9c3]'
                  }`}>
                    {poste.ouvertRecrutement ? 'Recrutement actif' : 'Suspendu'}
                  </span>
                </div>
                <p className="text-xs text-[#545f73] max-w-xl">
                  {poste.descriptionCourte}
                </p>
              </div>

              <button
                type="button"
                onClick={() => togglePosteRecrutement(poste.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 font-mono cursor-pointer ${
                  poste.ouvertRecrutement
                    ? 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
                    : 'bg-[#1b4d3e] hover:bg-[#003629] text-white'
                }`}
              >
                {poste.ouvertRecrutement ? 'Suspendre' : 'Ouvrir'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Agency Identity & Context Box */}
      <div className="bg-white rounded-2xl border border-[#e2e7ff] p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#003629] flex items-center gap-2 font-display">
          <Building className="w-4 h-4 text-[#1b4d3e]" />
          <span>AgenceOS · Présence Institutionnelle</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#545f73]">
          <div className="p-3.5 bg-[#faf8ff] rounded-xl border border-[#e2e7ff]">
            <span className="font-bold text-[#003629] block mb-1 font-mono">Bureaux Principaux</span>
            <p className="text-[#131b2e]">Ouaga 2000, Ouagadougou</p>
            <p className="text-[#707974]">Burkina Faso (Afrique de l'Ouest)</p>
          </div>
          <div className="p-3.5 bg-[#faf8ff] rounded-xl border border-[#e2e7ff]">
            <span className="font-bold text-[#003629] block mb-1 font-mono">Pôles Territoriaux</span>
            <p className="text-[#131b2e]">Ouagadougou & Bobo-Dioulasso</p>
            <p className="text-[#707974]">Rayonnement UEMOA & Diaspora</p>
          </div>
          <div className="p-3.5 bg-[#faf8ff] rounded-xl border border-[#e2e7ff]">
            <span className="font-bold text-[#003629] block mb-1 font-mono">Canaux Financiers</span>
            <p className="text-[#131b2e]">Orange Money, Moov Money, Wave</p>
            <p className="text-[#707974]">Virements bancaires UEMOA</p>
          </div>
        </div>
      </div>

      {/* Maintenance Zone */}
      <div className="bg-rose-50/50 rounded-2xl border border-rose-200 p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-rose-900 font-bold text-sm font-display">
          <AlertTriangle className="w-5 h-5 text-rose-600" />
          <span>Maintenance & Réinitialisation</span>
        </div>
        <p className="text-xs text-rose-900/80">
          Remet à zéro l'ensemble des candidatures, des collaborateurs et des demandes de devis aux données initiales de référence.
        </p>

        {isResetConfirmOpen ? (
          <div className="p-3.5 bg-white rounded-xl border border-rose-300 space-y-2">
            <p className="text-xs font-bold text-rose-900 font-mono">
              Confirmer la réinitialisation complète des données ?
            </p>
            <div className="flex items-center gap-2 font-mono">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Confirmer le reset
              </button>
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-1.5 bg-[#faf8ff] text-[#545f73] hover:text-[#131b2e] border border-[#c0c9c3] rounded-lg text-xs font-bold cursor-pointer"
              >
                Annuler
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="px-4 py-2 rounded-lg bg-white hover:bg-rose-100 text-rose-800 font-bold text-xs border border-rose-300 transition-colors flex items-center gap-1.5 cursor-pointer font-mono"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-700" />
            <span>Réinitialiser les données de démo</span>
          </button>
        )}
      </div>
    </div>
  );
};
