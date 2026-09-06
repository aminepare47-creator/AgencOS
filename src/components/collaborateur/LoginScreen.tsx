import React, { useState } from 'react';
import { IdCard, Lock, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LoginScreen: React.FC = () => {
  const { loginCollaborateur, setPublicView } = useApp();
  const [identifiant, setIdentifiant] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const ok = loginCollaborateur(identifiant, motDePasse);
      setLoading(false);
      if (!ok) {
        setError("Identifiant ou code d'accès incorrect, ou compte inactif.");
      }
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#071A2E] to-[#14456F] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-[#14456F] text-white flex items-center justify-center">
            <IdCard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-[#0B2A4A]">Espace Collaborateur</h1>
            <p className="text-xs text-[#545f73]">Accès réservé aux membres de l'équipe</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0B2A4A] mb-1.5">
              Identifiant (email ou numéro de membre)
            </label>
            <input
              type="text"
              value={identifiant}
              onChange={(e) => setIdentifiant(e.target.value)}
              placeholder="Email ou numéro de membre"
              className="w-full border border-[#C3CEDA] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#14456F] focus:ring-1 focus:ring-[#14456F]"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0B2A4A] mb-1.5">
              Code d'accès personnel
            </label>
            <input
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-[#C3CEDA] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#14456F] focus:ring-1 focus:ring-[#14456F]"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" /> {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#14456F] hover:bg-[#0B2A4A] text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors disabled:opacity-60 cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            <span>Se connecter</span>
          </button>
        </form>

        <p className="mt-6 text-[11px] text-[#545f73] text-center">
          Pas encore membre ?{' '}
          <button
            onClick={() => setPublicView('candidate_flow')}
            className="text-[#C9A227] font-semibold hover:underline cursor-pointer"
          >
            Postuler pour rejoindre l'équipe
          </button>
        </p>
      </div>
    </div>
  );
};
