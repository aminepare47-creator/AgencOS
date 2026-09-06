import React, { useState } from 'react';
import {
  Layers,
  ShoppingBag,
  Code2,
  Palette,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  FileText,
} from 'lucide-react';
import { POLES_SERVICES } from '../../data/polesServices';
import { PoleServiceId } from '../../types';

interface ServicesSectionProps {
  onOpenQuote: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuote }) => {
  const [openPole, setOpenPole] = useState<PoleServiceId | null>(null);

  const getPoleIcon = (id: PoleServiceId) => {
    switch (id) {
      case 'fondation_deploiement':
        return <Layers className="w-5 h-5 text-[#0B2A4A]" />;
      case 'accompagnement_boutique':
        return <ShoppingBag className="w-5 h-5 text-[#0B2A4A]" />;
      case 'dev_sur_mesure':
        return <Code2 className="w-5 h-5 text-[#0B2A4A]" />;
      case 'identite_reseaux':
        return <Palette className="w-5 h-5 text-[#0B2A4A]" />;
      default:
        return <Layers className="w-5 h-5 text-[#0B2A4A]" />;
    }
  };

  return (
    <section id="services-section" className="py-20 bg-white border-t border-[#D9E2EC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* En-tête de section */}
        <div className="max-w-3xl mb-12">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9A227] mb-3">
            Section 01 — Structure officielle des prestations
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0B2A4A] tracking-tight mb-4">
            Les quatre pôles officiels de prestation de l'Agence
          </h2>
          <p className="text-[#545f73] text-sm sm:text-base leading-relaxed">
            L'activité de l'Agence est organisée en quatre pôles distincts, chacun doté de compétences
            dédiées et de livrables définis. Chaque prestation fait l'objet d'une fiche officielle
            consultable avant contractualisation.
          </p>
        </div>

        {/* Fiches officielles des pôles */}
        <div className="space-y-4 mb-12">
          {POLES_SERVICES.map((pole) => {
            const isOpen = openPole === pole.id;
            return (
              <div
                key={pole.id}
                className={`bg-white rounded-xl border transition-colors ${
                  isOpen ? 'border-[#C9A227]' : 'border-[#D9E2EC] hover:border-[#14456F]'
                } overflow-hidden`}
              >
                {/* Ligne principale de la fiche */}
                <button
                  onClick={() => setOpenPole(isOpen ? null : pole.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center gap-4 cursor-pointer"
                >
                  <div className="shrink-0 w-12 text-center">
                    <p className="font-display font-bold text-xl text-[#C9A227] leading-none">
                      {pole.numero.replace('Pôle ', '')}
                    </p>
                    <p className="font-mono text-[9px] uppercase text-[#545f73] mt-1">Pôle</p>
                  </div>
                  <div className="w-px h-10 bg-[#D9E2EC] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-1">
                      {getPoleIcon(pole.id)}
                      <h3 className="font-display font-bold text-base sm:text-lg text-[#0B2A4A] truncate">
                        {pole.titre}
                      </h3>
                    </div>
                    <p className="text-xs text-[#545f73] leading-snug">{pole.sousTitre}</p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#545f73] shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#0B2A4A]' : ''}`}
                  />
                </button>

                {/* Fiche détaillée dépliable */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#D9E2EC] bg-[#F7F9FC]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
                      <div>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0B2A4A] mb-2">
                          Objet de la prestation
                        </p>
                        <p className="text-xs text-[#545f73] leading-relaxed mb-5">
                          {pole.descriptionCourte}
                        </p>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0B2A4A] mb-2">
                          Entités concernées
                        </p>
                        <p className="text-xs text-[#545f73] leading-relaxed mb-5">
                          {pole.publicCible}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2.5 py-1 rounded bg-white border border-[#D9E2EC] text-[11px] font-mono text-[#0B2A4A]">
                            Délai : {pole.delaiMoyen}
                          </span>
                          <span className="px-2.5 py-1 rounded bg-white border border-[#D9E2EC] text-[11px] font-mono text-[#0B2A4A]">
                            {pole.modeleTarifaire}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0B2A4A] mb-2">
                          Livrables garantis au contrat
                        </p>
                        <div className="space-y-2 mb-5">
                          {pole.livrablesCles.map((livrable, idx) => (
                            <div key={idx} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                              <span className="text-xs text-[#404945] leading-relaxed">{livrable}</span>
                            </div>
                          ))}
                        </div>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0B2A4A] mb-2">
                          Technologies et outillage
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {pole.technologies.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded bg-white border border-[#C3CEDA]/60 text-[11px] font-mono text-[#0B2A4A]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-5 border-t border-[#D9E2EC]">
                      <button
                        onClick={onOpenQuote}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0B2A4A] hover:bg-[#071A2E] text-white font-bold text-xs transition-colors cursor-pointer"
                      >
                        <span>Demander un devis pour ce pôle</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={onOpenQuote}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-[#EEF3F8] text-[#0B2A4A] border border-[#C3CEDA] font-semibold text-xs transition-colors cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#C9A227]" />
                        <span>Cadrer le cahier des charges avec la direction</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Note de gouvernance - une ligne, sans doublon */}
        <p className="text-[11px] text-[#545f73] flex items-center gap-2 max-w-2xl">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] shrink-0" />
          Chaque prestation est supervisée et validée par la Direction technique avant livraison finale.
        </p>

      </div>
    </section>
  );
};