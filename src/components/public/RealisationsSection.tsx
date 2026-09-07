import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { POLES_SERVICES } from '../../data/polesServices';
import { REALISATIONS, RealisationStatut } from '../../data/realisations';
import { PoleServiceId } from '../../types';

// IdentitÃƒÂ© visuelle par pÃƒÂ´le (sans images rÃƒÂ©elles pour l'instant)
const POLE_STYLE: Record<PoleServiceId, { badge: string; card: string; ring: string; dot: string }> = {
  fondation_deploiement: {
    badge: 'bg-[#E1EAF2] text-[#0B2A4A] border-[#C3CEDA]',
    card: 'from-[#0B2A4A] to-[#14456F]',
    ring: 'hover:border-[#0B2A4A]/40',
    dot: 'bg-[#0B2A4A]',
  },
  accompagnement_boutique: {
    badge: 'bg-[#C9DFF2]/40 text-[#0B2A4A] border-[#C9DFF2]',
    card: 'from-[#C9A227] to-[#B08A1D]',
    ring: 'hover:border-[#C9A227]/50',
    dot: 'bg-[#C9A227]',
  },
  dev_sur_mesure: {
    badge: 'bg-[#E1EAF2] text-[#14456F] border-[#C3CEDA]',
    card: 'from-[#14456F] to-[#0B2A4A]',
    ring: 'hover:border-[#14456F]/40',
    dot: 'bg-[#14456F]',
  },
  identite_reseaux: {
    badge: 'bg-[#C9DFF2]/40 text-[#0B2A4A] border-[#C9DFF2]',
    card: 'from-[#C9A227] to-[#B08A1D]',
    ring: 'hover:border-[#C9A227]/50',
    dot: 'bg-[#C9A227]',
  },
};

const statutLabel = (s: RealisationStatut): string => (s === 'livree' ? 'LivrÃƒÂ©e' : 'En cours');

interface RealisationsSectionProps {
  onOpenQuote?: () => void;
}

export const RealisationsSection: React.FC<RealisationsSectionProps> = ({ onOpenQuote }) => {
  const { setIsQuoteModalOpen } = useApp();
  const [filtre, setFiltre] = useState<PoleServiceId | 'tous'>('tous');

  const liste = filtre === 'tous' ? REALISATIONS : REALISATIONS.filter(r => r.poleServiceId === filtre);

  const ouvrirDevis = onOpenQuote ?? (() => setIsQuoteModalOpen(true));

  return (
    <section id="realisations-section" className="py-20 bg-[#ffffff] border-t border-[#D9E2EC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* En-tÃƒÂªte de section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9A227] mb-3">
              Nos rÃƒÂ©alisations Ã¢â‚¬â€ ÃƒÂ©tudes de cas
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0B2A4A] tracking-tight mb-3">
              Des projets concrets, livrÃƒÂ©s sous supervision
            </h2>
            <p className="text-[#545f73] text-sm sm:text-base leading-relaxed">
              Chaque dossier prÃƒÂ©sentÃƒÂ© ici reflÃƒÂ¨te notre mÃƒÂ©thode : cadrage, production technique
              ou crÃƒÂ©ative, puis livraison contrÃƒÂ´lÃƒÂ©e par la direction.
            </p>
          </div>
          <button
            onClick={ouvrirDevis}
            className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#0B2A4A] hover:bg-[#071A2E] text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors cursor-pointer"
          >
            <span>Discuter d'un projet</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filtres par pÃƒÂ´le */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setFiltre('tous')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer border ${
              filtre === 'tous'
                ? 'bg-[#0B2A4A] text-white border-[#0B2A4A]'
                : 'bg-white text-[#545f73] border-[#C3CEDA] hover:border-[#0B2A4A]/40'
            }`}
          >
            Tous les pÃƒÂ´les
          </button>
          {POLES_SERVICES.map(pole => (
            <button
              key={pole.id}
              onClick={() => setFiltre(pole.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer border ${
                filtre === pole.id
                  ? 'bg-[#0B2A4A] text-white border-[#0B2A4A]'
                  : 'bg-white text-[#545f73] border-[#C3CEDA] hover:border-[#0B2A4A]/40'
              }`}
            >
              {pole.titre}
            </button>
          ))}
        </div>
        {/* Grille de rÃƒÂ©alisations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {liste.map(r => {
            const pole = POLES_SERVICES.find(p => p.id === r.poleServiceId);
            const style = POLE_STYLE[r.poleServiceId];
            return (
              <article
                key={r.id}
                className={`group rounded-2xl border border-[#D9E2EC] bg-white overflow-hidden shadow-xs transition-all hover:shadow-md cursor-pointer ${style.ring}`}
              >
                {/* Visuel de tÃƒÂªte Ã¢â‚¬â€ emplacement identitÃƒÂ© visuelle */}
                <div className={`relative h-32 bg-gradient-to-br ${style.card}`}>
                  <div className="absolute inset-0 bg-[#071A2E]/10" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 text-[#0B2A4A] border border-white/50 ${style.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                      {pole?.numero ?? 'PÃƒÂ´le'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-white/90">
                      <Clock className="w-3 h-3" />
                      {r.annee}
                    </span>
                  </div>
                </div>

                {/* Corps de la fiche */}
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-display font-bold text-sm text-[#0B2A4A] leading-snug">
                      {r.titre}
                    </h3>
                    <span className={`shrink-0 inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      r.statut === 'livree'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      {statutLabel(r.statut)}
                    </span>
                  </div>
                  <p className="text-xs text-[#545f73] leading-relaxed mb-3">
                    {r.realisation}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {r.livrables.map((l, i) => (
                      <span key={i} className="text-[10px] font-mono text-[#14456F] bg-[#EEF3F8] border border-[#C3CEDA]/60 rounded px-1.5 py-0.5">
                        {l}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#D9E2EC]/60">
                    <div className="flex items-center gap-1 text-[10px] text-[#707974]">
                      <Layers className="w-3 h-3" />
                      <span className="font-mono">{r.technologies.slice(0, 2).join(' Ã‚Â· ')}</span>
                    </div>
                    <button
                      onClick={ouvrirDevis}
                      className="text-[11px] font-bold text-[#0B2A4A] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Un projet similaire ?</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {liste.length === 0 && (
          <div className="py-14 text-center text-sm text-[#545f73] bg-[#F7F9FC] rounded-2xl border border-[#D9E2EC]">
            Aucune rÃƒÂ©alisation enregistrÃƒÂ©e pour ce pÃƒÂ´le pour l'instant.

          </div>
        )}
      </div>
    </section>
  );
};
