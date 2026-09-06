import React, { useState } from 'react';
import { 
  Layers, 
  ShoppingBag, 
  Smartphone, 
  Palette, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Server, 
  Sparkles, 
  HelpCircle,
  ShieldCheck,
  Zap,
  Code2,
  Megaphone,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { POLES_SERVICES } from '../../data/polesServices';
import { PoleServiceId } from '../../types';

interface ServicesSectionProps {
  onOpenQuote: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuote }) => {
  const { setPublicView, setIsQuoteModalOpen } = useApp();
  const [selectedPoleFilter, setSelectedPoleFilter] = useState<string>('all');

  const getPoleIcon = (id: PoleServiceId) => {
    switch (id) {
      case 'fondation_deploiement':
        return <Layers className="w-5 h-5 text-[#1b4d3e]" />;
      case 'accompagnement_boutique':
        return <ShoppingBag className="w-5 h-5 text-[#1b4d3e]" />;
      case 'dev_sur_mesure':
        return <Code2 className="w-5 h-5 text-[#1b4d3e]" />;
      case 'identite_reseaux':
        return <Palette className="w-5 h-5 text-[#1b4d3e]" />;
      default:
        return <Layers className="w-5 h-5 text-[#1b4d3e]" />;
    }
  };

  const displayedPoles = selectedPoleFilter === 'all' 
    ? POLES_SERVICES 
    : POLES_SERVICES.filter(p => p.id === selectedPoleFilter);

  return (
    <section id="services-section" className="py-20 bg-[#faf8ff] border-t border-[#e2e7ff] font-sans">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaedff] text-[#003629] text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-[#c0c9c3]/50">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>STRUCTURE OFFICIELLE DES PRESTATIONS · AGENCEOS</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#003629] tracking-tight mb-4">
            Nos 4 Pôles d'Ingénierie & de Services
          </h2>
          <p className="text-[#545f73] text-sm sm:text-base leading-relaxed">
            Une architecture de services claire, rigoureuse et spécialisée. Nous rejetons les discours vagues d'informatique générale pour vous offrir des compétences pointues et des livrables garantis.
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setSelectedPoleFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedPoleFilter === 'all'
                  ? 'bg-[#1b4d3e] text-white shadow-xs'
                  : 'bg-white text-[#545f73] border border-[#c0c9c3] hover:border-[#1b4d3e]'
              }`}
            >
              Tous les 4 Pôles
            </button>
            {POLES_SERVICES.map(pole => (
              <button
                key={pole.id}
                onClick={() => setSelectedPoleFilter(pole.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedPoleFilter === pole.id
                    ? 'bg-[#1b4d3e] text-white shadow-xs'
                    : 'bg-white text-[#545f73] border border-[#c0c9c3] hover:border-[#1b4d3e]'
                }`}
              >
                {pole.numero} : {pole.titre.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* The 4 Poles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {displayedPoles.map((pole) => (
            <div 
              key={pole.id}
              className="bg-white rounded-2xl border-2 border-[#e2e7ff] hover:border-[#1b4d3e] transition-all p-7 sm:p-9 shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Header of Card */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] flex items-center justify-center shrink-0">
                      {getPoleIcon(pole.id)}
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1b4d3e] block">
                        {pole.numero}
                      </span>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-[#003629]">
                        {pole.titre}
                      </h3>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-[#545f73] bg-[#faf8ff] px-2.5 py-1 rounded-md border border-[#e2e7ff] shrink-0 font-medium">
                    {pole.delaiMoyen}
                  </span>
                </div>

                {/* Subtitle / Promise */}
                <p className="text-xs sm:text-sm font-semibold text-[#1b4d3e] mb-3 leading-snug">
                  {pole.sousTitre}
                </p>

                {/* Detailed Description */}
                <p className="text-xs sm:text-sm text-[#545f73] leading-relaxed mb-6">
                  {pole.descriptionCourte}
                </p>

                {/* Public Cible Box */}
                <div className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#e2e7ff] mb-6">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#003629] block mb-1">
                    Cible prioritaire
                  </span>
                  <p className="text-xs text-[#131b2e]">
                    {pole.publicCible}
                  </p>
                </div>

                {/* Key Deliverables */}
                <div className="space-y-2.5 mb-6">
                  <span className="text-xs font-mono font-bold uppercase text-[#131b2e] block tracking-wide">
                    Livrables contractuels majeurs :
                  </span>
                  {pole.livrablesCles.map((livrable, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs text-[#404945] leading-relaxed">
                        {livrable}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="pt-2 mb-6">
                  <span className="text-[10px] font-mono text-[#707974] uppercase block mb-2">
                    Technologies & Outillage :
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {pole.technologies.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[#faf8ff] border border-[#c0c9c3]/60 text-[11px] font-mono text-[#003629]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-5 border-t border-[#e2e7ff] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <span className="text-xs font-mono font-semibold text-[#545f73]">
                  {pole.modeleTarifaire}
                </span>
                <button
                  onClick={onOpenQuote}
                  className="px-4 py-2.5 rounded-lg bg-[#1b4d3e] hover:bg-[#003629] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Demander un devis pour ce pôle</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Institutional Quality Assurance Banner */}
        <div className="rounded-2xl bg-white border border-[#e2e7ff] p-8 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#eaedff] text-[#003629] font-mono text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1b4d3e]" />
                <span>SUPERVISION TECHNIQUE EXCLUSIVE</span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#003629]">
                Une méthodologie dirigée par un Développeur Full-Stack
              </h3>
              <p className="text-xs sm:text-sm text-[#545f73] leading-relaxed">
                Toutes les productions des pôles (code source front-end, vidéos, identités graphiques et stratégies de diffusion) sont rigoureusement supervisées et validées par le Directeur technique avant toute livraison finale. Pas de sous-traitance opaque : un interlocuteur burkinabè unique engagé sur vos résultats.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={onOpenQuote}
                className="w-full py-3 px-5 rounded-lg bg-[#1b4d3e] hover:bg-[#003629] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <span>Chiffrer mon projet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setPublicView('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3 px-5 rounded-lg bg-[#faf8ff] hover:bg-[#eaedff] text-[#003629] border border-[#c0c9c3] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Contacter la direction (+226 55 30 08 68)</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
