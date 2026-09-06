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
              Ouagadougou, Burkina Faso — Service de digitalisation des entreprises
            </p>
          </div>
        </div>

        {/* Déclaration de mission */}
        <div className="max-w-4xl mb-10">
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#0B2A4A] leading-[1.15] mb-6">
            L'Agence accompagne la transformation numérique des entreprises
            du Burkina Faso et de l'espace UEMOA.
          </h1>
          <p className="text-base sm:text-lg text-[#545f73] leading-relaxed max-w-3xl">
            De la création de l'entreprise jusqu'au déploiement complet de sa présence numérique —
            sites institutionnels, applications mobiles, identité digitale — l'Agence prend en charge
            l'ensemble de la chaîne de digitalisation, sous supervision technique directe et avec des
            livrables garantis.
          </p>
        </div>

        {/* Actions officielles */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14">
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
            <span>Candidater — rejoindre le corps de métiers</span>
            <ChevronRight className="w-4 h-4 text-[#545f73]" />
          </button>
        </div>

        {/* Chiffres clés — présentation rapport officiel */}
        <div className="rounded-xl border border-[#D9E2EC] bg-white shadow-sm overflow-hidden mb-14">
          <div className="bg-[#071A2E] px-6 py-2.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]"></span>
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/90 font-semibold">
              Chiffres clés de l'Agence — exercice en cours
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#D9E2EC]">
            {[
              { value: '04', label: 'Pôles de service officiels', sub: 'Structure établie' },
              { value: '05', label: 'Métiers représentés', sub: 'Dev, CM, vidéo, design, gestion' },
              { value: '100%', label: 'Productions supervisées', sub: 'Par la direction technique' },
              { value: '24h', label: 'Délai de première réponse', sub: 'Toute demande enregistrée' },
            ].map((k, i) => (
              <div key={i} className="p-5 sm:p-6">
                <p className="font-display font-bold text-3xl text-[#0B2A4A] mb-1">{k.value}</p>
                <p className="text-xs font-semibold text-[#131b2e] leading-snug">{k.label}</p>
                <p className="text-[11px] text-[#545f73] mt-1 font-mono uppercase tracking-wide">{k.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bandeau d'engagement */}
        <div className="rounded-xl border border-[#C9A227]/50 bg-[#F7F9FC] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-[#0B2A4A]">
                Engagement de conformité et de supervision
              </h4>
              <p className="text-xs text-[#545f73] mt-0.5 max-w-2xl leading-relaxed">
                L'ensemble des productions de l'Agence est supervisé par le Directeur fondateur,
                développeur full-stack. Traitement des données conforme à la loi burkinabè
                N°001-2021/AN (CIL) et aux bonnes pratiques de sécurité.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenCandidateFlow}
            className="shrink-0 px-4 py-2 bg-[#0B2A4A] hover:bg-[#071A2E] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Intégrer l'équipe
          </button>
        </div>

      </div>
    </section>
  );
};