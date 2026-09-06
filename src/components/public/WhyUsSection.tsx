import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, ShieldCheck, Award, MapPin } from 'lucide-react';

const ENGAGEMENTS = [
  {
    icon: ShieldCheck,
    titre: 'Supervision technique directe',
    texte:
      "Toutes les réalisations — code source, architectures de données, maquettes, contenus et vidéos — sont vérifiées et homologuées par le Directeur technique avant livraison.",
    garantie: 'Zéro sous-traitance opaque',
  },
  {
    icon: Award,
    titre: 'Sélection des collaborateurs par épreuve pratique',
    texte:
      "Chaque membre de l'équipe est retenu à l'issue d'une épreuve technique notée sur barème officiel. Aucune compétence n'est déclarée : elle est prouvée.",
    garantie: 'Compétences prouvées',
  },
  {
    icon: MapPin,
    titre: 'Calibré pour le Burkina Faso',
    texte:
      "Navigation mobile prioritaire, optimisation des connexions 3G/4G, tunnels WhatsApp et paiements Mobile Money (Orange Money, Moov Money, Wave). Tarification en FCFA.",
    garantie: 'Tarifs en FCFA',
  },
];

export const WhyUsSection: React.FC = () => {
  const { setIsQuoteModalOpen, setPublicView } = useApp();

  return (
    <section id="why-us-section" className="py-20 bg-[#F7F9FC] border-t border-[#D9E2EC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* En-tête de section */}
        <div className="max-w-3xl mb-12">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9A227] mb-3">
            Section 02 — Organisation et gouvernance de l'Agence
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0B2A4A] tracking-tight mb-4">
            Les engagements institutionnels de l'Agence
          </h2>
          <p className="text-[#545f73] text-sm sm:text-base leading-relaxed">
            Trois engagements fondent la relation de l'Agence avec les entreprises qu'elle accompagne.
          </p>
        </div>

        {/* Engagements — registre officiel */}
        <div className="bg-white rounded-xl border border-[#D9E2EC] divide-y divide-[#D9E2EC] mb-12">
          {ENGAGEMENTS.map((e, i) => (
            <div key={i} className="p-5 sm:p-7 flex flex-col sm:flex-row gap-5 sm:gap-8">
              <div className="sm:w-56 shrink-0">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="font-display font-bold text-lg text-[#C9A227]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <e.icon className="w-4 h-4 text-[#0B2A4A]" />
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base text-[#0B2A4A] leading-snug">
                  {e.titre}
                </h3>
              </div>
              <div className="border-l-2 border-[#C9A227] pl-5 sm:pl-8 flex-1">
                <p className="text-xs sm:text-sm text-[#545f73] leading-relaxed mb-3">
                  {e.texte}
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0B2A4A]">
                  — {e.garantie}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bande d'action pleine largeur */}
        <div className="bg-[#071A2E] rounded-xl p-7 sm:p-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight mb-1.5">
                Exposez votre besoin à la Direction de l'Agence
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-2xl">
                Toute demande fait l'objet d'un accusé de réception et d'un cadrage technique sous 24 heures ouvrées.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-5 py-3 rounded-lg bg-[#C9DFF2] hover:bg-[#A7C7E0] text-[#071A2E] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Soumettre un projet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setPublicView('candidate_flow');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Rejoindre l'équipe</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
