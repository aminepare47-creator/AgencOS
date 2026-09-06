import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, X, ArrowRight, AlertCircle, KeyRound, Eye, EyeOff } from 'lucide-react';

interface DirectorAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DirectorAuthModal: React.FC<DirectorAuthModalProps> = ({ isOpen, onClose }) => {
  const { setIsDirectorMode } = useApp();
  const [accessKey, setAccessKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // Clé d'accès définie par le Directeur via la variable d'environnement
    // VITE_DIRECTEUR_ACCESS_KEY (aucune clé en dur dans le code).
    // À remplacer par Supabase Auth lors de la migration base de données.
    const expectedKey = (import.meta.env.VITE_DIRECTEUR_ACCESS_KEY as string | undefined)?.trim().toLowerCase();
    if (!expectedKey) {
      setError(true);
      return;
    }
    if (accessKey.trim().toLowerCase() === expectedKey) {
      setIsDirectorMode(true);
      onClose();
      setAccessKey('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans">
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-[#D9E2EC] overflow-hidden text-[#131b2e]">
        
        {/* Header */}
        <div className="bg-[#071A2E] text-white p-6 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#C9DFF2] text-[#071A2E] flex items-center justify-center font-bold">
                <Lock className="w-4 h-4 text-[#071A2E]" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-display text-white">Espace Direction AgenceOS</h3>
                <p className="text-[10px] font-mono text-[#C9DFF2]">Portail d'administration interne</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Form */}
        <form onSubmit={handleVerify} className="p-6 space-y-4">
          <p className="text-xs text-[#545f73] leading-relaxed">
            Espace réservé à la direction et aux fondateurs d'AgenceOS pour la gestion des candidats, devis et barèmes techniques.
          </p>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#131b2e] block">
              Mot de passe / Clé d'accès
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Clé d'accès confidentielle..."
                value={accessKey}
                onChange={(e) => {
                  setAccessKey(e.target.value);
                  setError(false);
                }}
                autoFocus
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] focus:border-[#14456F] text-xs font-mono pr-10 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-[#707974] hover:text-[#131b2e] p-0.5 cursor-pointer"
                title={showPassword ? "Masquer" : "Afficher"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-[11px] text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Clé d'accès incorrecte. Contactez le fondateur si vous avez perdu votre accès.</span>
              </p>
            )}
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 px-3 rounded-lg border border-[#C3CEDA] text-xs font-semibold text-[#545f73] hover:bg-[#F7F9FC] transition-colors cursor-pointer text-center"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 px-3 rounded-lg bg-[#14456F] hover:bg-[#0B2A4A] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Accéder</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-center pt-1 border-t border-[#D9E2EC]">
            <span className="text-[10px] font-mono text-[#545f73] block mt-2">
              Raccourci clavier direct : <strong className="text-[#14456F]">Alt + Shift + D</strong>
            </span>
          </div>
        </form>

      </div>
    </div>
  );
};
