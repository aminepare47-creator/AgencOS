import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Award, 
  MapPin, 
  Building2, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Target,
  Layers,
  Cpu
} from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const { setPublicView, setIsQuoteModalOpen } = useApp();

  return (
    <section id="why-us-section" className="py-20 bg-[#F7F9FC] text-[#131b2e] border-t border-[#D9E2EC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Top Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E1EAF2] text-[#0B2A4A] text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-[#C3CEDA]/50">
            <Target className="w-3.5 h-3.5" />
            <span>SECTION 02 — ORGANISATION & GOUVERNANCE DE L'AGENCE</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0B2A4A] tracking-tight mb-3">
            L'organisation de l'Agence : rigueur technique et responsabilité
          </h2>
          <p className="text-[#545f73] text-sm sm:text-base leading-relaxed">
            L'Agence repose sur une organisation structurée : un corps de spécialistes burkinabè,
            placé sous la supervision technique et la responsabilité directe du Directeur fondateur.
          </p>
        </div>

        {/* 3 Core Strengths Cards (Stitch card pattern) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1 */}
          <div className="bg-white border border-[#D9E2EC] rounded-2xl p-7 flex flex-col justify-between hover:border-[#14456F] transition-colors shadow-xs">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E1EAF2] text-[#0B2A4A] flex items-center justify-center font-bold mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#0B2A4A] mb-2">
                Supervision Technique Directe
              </h3>
              <p className="text-xs sm:text-sm text-[#545f73] leading-relaxed">
                Toutes les réalisations (code source, architectures de données, maquettes, contenus et vidéos) sont personnellement vérifiées et homologuées par le Directeur Technique. Vous bénéficiez d'une garantie de qualité industrielle sans compromis.
              </p>
            </div>
            <div className="pt-6 border-t border-[#D9E2EC] mt-6 text-xs text-[#14456F] font-bold flex items-center gap-2 font-mono">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>ZÉRO SOUS-TRAITANCE OPAQUE</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#D9E2EC] rounded-2xl p-7 flex flex-col justify-between hover:border-[#14456F] transition-colors shadow-xs">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#C9DFF2] text-[#071A2E] flex items-center justify-center font-bold mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#0B2A4A] mb-2">
                Sélection par Concours Pratique
              </h3>
              <p className="text-xs sm:text-sm text-[#545f73] leading-relaxed">
                Nos collaborateurs ne sont pas retenus sur un simple CV. Chaque développeur, community manager ou graphiste passe une épreuve technique scellée et notée sur barème officiel, garantissant une maîtrise opérationnelle éprouvée.
              </p>
            </div>
            <div className="pt-6 border-t border-[#D9E2EC] mt-6 text-xs text-[#14456F] font-bold flex items-center gap-2 font-mono">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>COMPÉTENCES 100% PROUVÉES</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#D9E2EC] rounded-2xl p-7 flex flex-col justify-between hover:border-[#14456F] transition-colors shadow-xs">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E1EAF2] text-[#0B2A4A] flex items-center justify-center font-bold mb-5">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#0B2A4A] mb-2">
                Calibré pour le Burkina Faso & l'UEMOA
              </h3>
              <p className="text-xs sm:text-sm text-[#545f73] leading-relaxed">
                Nous maîtrisons les usages locaux : navigation mobile prioritaire, optimisation de bande passante 3G/4G, tunnels WhatsApp fluides et intégration des paiements Mobile Money (Orange Money, Moov Money, Wave).
              </p>
            </div>
            <div className="pt-6 border-t border-[#D9E2EC] mt-6 text-xs text-[#14456F] font-bold flex items-center gap-2 font-mono">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>SOUVERAINETÉ & TARIFS EN FCFA</span>
            </div>
          </div>

        </div>

        {/* Vision Stratégique 5 - 10 ans */}
        <div className="bg-[#0B2A4A] text-white rounded-2xl p-8 sm:p-10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C9DFF2] text-xs font-mono font-bold uppercase tracking-wider border border-white/10">
                <Building2 className="w-3.5 h-3.5" />
                <span>FEUILLE DE ROUTE STRATÉGIQUE · 2025 - 2030</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                De l'agence agile en ligne au futur hub d'excellence physique à Ouagadougou
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                AgenceOS opère aujourd'hui sous une structure agile 100% numérique, offrant une réactivité maximale et des coûts d'intervention optimisés pour les entreprises. Notre plan de développement prévoit la construction de nos espaces physiques de coworking et de production numérique au Faso.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-white/10 border border-white/15 p-3.5 rounded-xl">
                  <span className="font-bold text-[#C9DFF2] block mb-1 font-mono text-[11px] uppercase">
                    Phase 1 (Actuelle)
                  </span>
                  <span className="text-white/80 leading-relaxed text-[11px] block">
                    Direction technique unifiée, portail d'évaluation et prestations de digitalisation de référence.
                  </span>
                </div>
                <div className="bg-white/10 border border-white/15 p-3.5 rounded-xl">
                  <span className="font-bold text-white block mb-1 font-mono text-[11px] uppercase">
                    Phase 2 (2026-2027)
                  </span>
                  <span className="text-white/80 leading-relaxed text-[11px] block">
                    Plateforme collaborative de mission et contrats automatisés pour notre collectif de talents.
                  </span>
                </div>
                <div className="bg-white/10 border border-white/15 p-3.5 rounded-xl">
                  <span className="font-bold text-white block mb-1 font-mono text-[11px] uppercase">
                    Phase 3 (2028+)
                  </span>
                  <span className="text-white/80 leading-relaxed text-[11px] block">
                    Hub physique avec studios d'enregistrement, laboratoire d'innovation et bureaux à Ouaga 2000.
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full py-3.5 px-5 rounded-lg bg-[#C9DFF2] hover:bg-[#A7C7E0] text-[#071A2E] font-bold text-xs sm:text-sm shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Lancer un projet avec nous</span>
              </button>

              <button
                onClick={() => {
                  setPublicView('candidate_flow');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3.5 px-5 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Rejoindre la communauté de talents</span>
                <ArrowRight className="w-4 h-4 text-[#C9DFF2]" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
