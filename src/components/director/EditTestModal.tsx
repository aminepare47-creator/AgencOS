import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ModeleTest, TypeRenduTest } from '../../types';
import { X, FileText, CheckCircle2, Trash2 } from 'lucide-react';

interface EditTestModalProps {
  test: ModeleTest | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EditTestModal: React.FC<EditTestModalProps> = ({ test, isOpen, onClose }) => {
  const { postes, updateTestTemplate, createTestTemplate } = useApp();

  const isEditing = Boolean(test);

  const [form, setForm] = useState({
    posteId: test?.posteId || postes[0]?.id || '',
    titre: test?.titre || '',
    consignes: test?.consignes || '',
    typeRendu: (test?.typeRendu || 'texte') as TypeRenduTest,
    delaiJours: test?.delaiJours || 3,
    livrablesAttendus: test?.livrablesAttendus || ['Lien direct vers la solution'],
    criteresEvaluation: test?.criteresEvaluation || ['Pertinence technique', 'Respect des délais'],
  });

  const [newLivrable, setNewLivrable] = useState('');
  const [newCritere, setNewCritere] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleAddLivrable = () => {
    if (!newLivrable.trim()) return;
    setForm(prev => ({ ...prev, livrablesAttendus: [...prev.livrablesAttendus, newLivrable.trim()] }));
    setNewLivrable('');
  };

  const handleRemoveLivrable = (idx: number) => {
    setForm(prev => ({ ...prev, livrablesAttendus: prev.livrablesAttendus.filter((_, i) => i !== idx) }));
  };

  const handleAddCritere = () => {
    if (!newCritere.trim()) return;
    setForm(prev => ({ ...prev, criteresEvaluation: [...prev.criteresEvaluation, newCritere.trim()] }));
    setNewCritere('');
  };

  const handleRemoveCritere = (idx: number) => {
    setForm(prev => ({ ...prev, criteresEvaluation: prev.criteresEvaluation.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.titre || !form.consignes) return;

    if (isEditing && test) {
      updateTestTemplate({
        ...test,
        posteId: form.posteId,
        titre: form.titre,
        consignes: form.consignes,
        typeRendu: form.typeRendu,
        delaiJours: form.delaiJours,
        livrablesAttendus: form.livrablesAttendus,
        criteresEvaluation: form.criteresEvaluation,
      });
    } else {
      createTestTemplate({
        posteId: form.posteId,
        titre: form.titre,
        consignes: form.consignes,
        typeRendu: form.typeRendu,
        delaiJours: form.delaiJours,
        livrablesAttendus: form.livrablesAttendus,
        criteresEvaluation: form.criteresEvaluation,
      });
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto font-sans">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-[#D9E2EC] overflow-hidden my-8 text-[#131b2e]">
        
        {/* Header */}
        <div className="bg-[#0B2A4A] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C9DFF2] text-[#071A2E] flex items-center justify-center font-bold">
              <FileText className="w-4 h-4 text-[#071A2E]" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                {isEditing ? 'Modifier le Modèle de Test Privé' : 'Nouveau Modèle d\'Épreuve'}
              </h3>
              <p className="text-[11px] text-white/70">Attribué automatiquement aux candidats postulant à ce métier</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#14456F] mx-auto" />
              <h4 className="text-base font-bold text-[#0B2A4A] font-display">Modèle d'épreuve enregistré !</h4>
              <p className="text-xs text-[#545f73]">
                Les prochaines candidatures sur ce profil recevront immédiatement ces consignes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#131b2e] mb-1 font-mono">
                    Métier associé *
                  </label>
                  <select
                    value={form.posteId}
                    onChange={(e) => setForm({ ...form, posteId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] focus:outline-none focus:border-[#14456F]"
                  >
                    {postes.map(p => (
                      <option key={p.id} value={p.id}>{p.nom}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1 font-mono">
                    Délai imparti (jours)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={14}
                    value={form.delaiJours}
                    onChange={(e) => setForm({ ...form, delaiJours: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] focus:outline-none focus:border-[#14456F] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1 font-mono">
                  Titre du test technique *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Défi Développeur : Composant React de commande mobile à Ouaga"
                  value={form.titre}
                  onChange={(e) => setForm({ ...form, titre: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#14456F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1 font-mono">
                  Type de restitution requis
                </label>
                <select
                  value={form.typeRendu}
                  onChange={(e) => setForm({ ...form, typeRendu: e.target.value as TypeRenduTest })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] focus:outline-none focus:border-[#14456F]"
                >
                  <option value="texte">Texte libre argumenté</option>
                  <option value="lien">Lien externe (GitHub, Figma, Google Drive, Loom)</option>
                  <option value="fichier">Téléversement de fichier / archive ZIP</option>
                  <option value="mixte">Mixte (Texte + Liens + Fichiers au choix)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1 font-mono">
                  Consignes complètes & cas pratique *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Décrivez précisément le contexte, la mise en situation, les contraintes et ce que vous attendez du candidat..."
                  value={form.consignes}
                  onChange={(e) => setForm({ ...form, consignes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#14456F]"
                />
              </div>

              {/* Livrables attendus */}
              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1 font-mono">
                  Livrables attendus (liste à puces)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Ex: Lien vers repo GitHub public ou démo en ligne"
                    value={newLivrable}
                    onChange={(e) => setNewLivrable(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#14456F]"
                  />
                  <button
                    type="button"
                    onClick={handleAddLivrable}
                    className="px-3.5 py-2 bg-[#F7F9FC] hover:bg-[#E1EAF2] text-[#0B2A4A] rounded-lg text-xs font-bold border border-[#C3CEDA] cursor-pointer"
                  >
                    Ajouter
                  </button>
                </div>
                <div className="space-y-1">
                  {form.livrablesAttendus.map((l, i) => (
                    <div key={i} className="flex items-center justify-between text-xs bg-[#F7F9FC] px-3 py-2 rounded-lg border border-[#D9E2EC] text-[#131b2e]">
                      <span>• {l}</span>
                      <button type="button" onClick={() => handleRemoveLivrable(i)} className="text-[#707974] hover:text-rose-600 cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Critères d'évaluation */}
              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1 font-mono">
                  Critères d'évaluation Directeur
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Ex: Rigueur d'exécution et réactivité mobile"
                    value={newCritere}
                    onChange={(e) => setNewCritere(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#14456F]"
                  />
                  <button
                    type="button"
                    onClick={handleAddCritere}
                    className="px-3.5 py-2 bg-[#F7F9FC] hover:bg-[#E1EAF2] text-[#0B2A4A] rounded-lg text-xs font-bold border border-[#C3CEDA] cursor-pointer"
                  >
                    Ajouter
                  </button>
                </div>
                <div className="space-y-1">
                  {form.criteresEvaluation.map((c, i) => (
                    <div key={i} className="flex items-center justify-between text-xs bg-[#F7F9FC] px-3 py-2 rounded-lg border border-[#D9E2EC] text-[#131b2e]">
                      <span>• {c}</span>
                      <button type="button" onClick={() => handleRemoveCritere(i)} className="text-[#707974] hover:text-rose-600 cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#D9E2EC] flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-[#545f73] hover:text-[#131b2e] transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#14456F] hover:bg-[#0B2A4A] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  {isEditing ? 'Mettre à jour le modèle' : 'Créer le modèle de test'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
