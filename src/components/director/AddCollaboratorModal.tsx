import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, UserPlus, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AddCollaboratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCollaboratorModal: React.FC<AddCollaboratorModalProps> = ({ isOpen, onClose }) => {
  const { postes, addCollaborateurManuel } = useApp();

  const [form, setForm] = useState({
    nom: '',
    email: '',
    telephone: '',
    ville: 'Ouagadougou',
    posteId: postes[0]?.id || '',
    specialite: '',
    notes: 'Personne de confiance intégrée directement par la Direction.',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom || !form.email || !form.telephone) return;

    addCollaborateurManuel({
      nom: form.nom,
      email: form.email,
      telephone: form.telephone,
      ville: form.ville,
      posteId: form.posteId,
      specialite: form.specialite || 'Collaborateur partenaire direct',
      notes: form.notes,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto font-sans">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-[#D9E2EC] overflow-hidden my-8 text-[#131b2e]">
        
        {/* Header */}
        <div className="bg-[#0B2A4A] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C9DFF2] text-[#071A2E] flex items-center justify-center font-bold">
              <UserPlus className="w-4 h-4 text-[#071A2E]" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">Ajouter un Collaborateur Direct</h3>
              <p className="text-[11px] text-white/70">Intégration directe de confiance (sans passage d'épreuve)</p>
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
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#14456F] mx-auto" />
              <h4 className="text-base font-bold text-[#0B2A4A] font-display">Collaborateur enregistré !</h4>
              <p className="text-xs text-[#545f73]">
                {form.nom} est désormais inscrit dans l'équipe active de AgenceOS.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 bg-[#E1EAF2] rounded-xl border border-[#14456F]/20 text-[#0B2A4A] text-xs flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#14456F] shrink-0 mt-0.5" />
                <p>
                  Ce formulaire habilite un prestataire ou un talent de confiance sans obligation de passer l'épreuve publique.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1 font-mono">
                  Nom et Prénom(s) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Alassane Kabore"
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#14456F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1 font-mono">
                    Adresse Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alassane@agenceos.bf"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#14456F] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1 font-mono">
                    Téléphone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+226 70 00 11 22"
                    value={form.telephone}
                    onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#14456F] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1 font-mono">
                    Pôle Métier attribué *
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
                    Ville de rattachement
                  </label>
                  <select
                    value={form.ville}
                    onChange={(e) => setForm({ ...form, ville: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] focus:outline-none focus:border-[#14456F]"
                  >
                    <option value="Ouagadougou">Ouagadougou</option>
                    <option value="Bobo-Dioulasso">Bobo-Dioulasso</option>
                    <option value="Koudougou">Koudougou</option>
                    <option value="Autre ville BF">Autre ville BF</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1 font-mono">
                  Spécialité opérationnelle
                </label>
                <input
                  type="text"
                  placeholder="Ex: Expert React & Next.js, ou Spécialiste Motion design..."
                  value={form.specialite}
                  onChange={(e) => setForm({ ...form, specialite: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#14456F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1 font-mono">
                  Notes internes de Direction
                </label>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#14456F]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-[#545f73] hover:text-[#131b2e] transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  id="btn-add-manual-collab"
                  className="px-5 py-2.5 rounded-lg bg-[#14456F] hover:bg-[#0B2A4A] text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5 text-white" />
                  <span>Enregistrer le Collaborateur</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
