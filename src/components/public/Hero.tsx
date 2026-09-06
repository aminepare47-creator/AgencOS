import React from 'react';
import { ArrowRight, ChevronRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OfficialSeal } from '../common/OfficialSeal';

interface HeroProps {
  onOpenCandidateFlow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCandidateFlow }) => {
  const { setIsQuoteModalOpen } = useApp();

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#ffffff] overflow-hidden">
      {/* Trame de fond institutionnelle discrète */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: 'linear-gradient(#D9E2EC 1px, transparent 1px), linear-gradient(90deg, #D9E2EC 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Filet or supérieur */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#C9A227]" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">

        {/* Identification officielle */}
        <div className="flex items-center gap-3 mb-10">
          <OfficialSeal size={56} />
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#C9A227] font-bold">
              AgenceOS · Établissement numérique
            </p>
            <p className="text-xs text-[#545f73] mt-0.5">
              Burkina Faso — Service de digitalisation des entreprises
            </p>
          </div>
        </div>

        {/* Déclaration de mission */}
        <div className="max-w-4xl mb-10">
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#0B2A4A] leading-[1.15] mb-6">
            L'Agence accompagne la transformation numérique des entreprises
            du Burkina Faso.
          </h1>
          <p className="text-base sm:text-lg text-[#545f73] leading-relaxed max-w-3xl">
            De la création de l'entreprise jusqu'au déploiement complet de sa présence numérique —
            sites institutionnels, applications mobiles, identité digitale — l'Agence prend en charge
            l'ensemble de la chaîne de digitalisation, avec des livrables garantis.
          </p>
        </div>

        {/* Actions officielles */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="inline-flex items-center justify-center gap-2.5 bg-[#0B2A4A] hover:bg-[#071A2E] text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <span> Soumettre un projet </span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenCandidateFlow}
            className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-[#EEF3F8] text-[#0B2A4A] border border-[#C3CEDA] font-semibold text-sm sm:text-base px-6 py-3.5 rounded-lg transition-colors cursor-pointer"
          >
            <span>Rejoindre l'équipe</span>
            <ChevronRight className="w-4 h-4 text-[#545f73]" />
          </button>
        </div>

        {/* Signal de confiance — léger, sans jargon réglementaire */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#545f73]">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
            Supervision technique par un développeur full-stack
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
            Solutions pensées pour le contexte local
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
            Accompagnement continu après livraison
          </span>
        </div>

      </div>
    </section>
  );
};