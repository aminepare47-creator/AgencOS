import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Smartphone, 
  Globe2, 
  Share2, 
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeroProps {
  onOpenCandidateFlow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCandidateFlow }) => {
  const { setIsQuoteModalOpen, setPublicView } = useApp();

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#ffffff]">
      
      {/* Subtle institutional grid watermark background */}
      <div className="absolute inset-0 bg-[radial-gradient(#E1EAF2_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Institutional Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#EEF3F8] border border-[#C3CEDA]/50 text-xs font-semibold text-[#0B2A4A] mb-8 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          <span className="tracking-wide uppercase font-mono text-[11px]">
            Agence de Transformation Numérique · Ouagadougou, Burkina Faso
          </span>
        </div>

        {/* Main Headline */}
        <div className="max-w-4xl mb-8">
          <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-5xl tracking-tight text-[#0B2A4A] leading-[1.15] mb-6">
            Accompagner la souveraineté numérique et la modernisation des entreprises au Burkina Faso et en Afrique de l'Ouest.
          </h1>
          <p className="text-base sm:text-xl text-[#545f73] font-normal leading-relaxed max-w-3xl">
            Conception d'infrastructures logicielles pérennes, numérisation des processus métiers critiques, et déploiement de plateformes web et mobiles à haute résilience opérationnelle.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16">
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="inline-flex items-center justify-center gap-2.5 bg-[#14456F] hover:bg-[#0B2A4A] text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <span>Discuter d'un projet</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenCandidateFlow}
            className="inline-flex items-center justify-center gap-2.5 bg-[#EEF3F8] hover:bg-[#E1EAF2] text-[#0B2A4A] border border-[#C3CEDA] font-semibold text-sm sm:text-base px-6 py-3.5 rounded-lg transition-colors cursor-pointer"
          >
            <span>Rejoindre l'équipe</span>
            <ChevronRight className="w-4 h-4 text-[#545f73]" />
          </button>
        </div>

        {/* Visual Hero Banner / Architecture Representation */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#0B2A4A] to-[#14456F] text-white p-6 sm:p-10 shadow-lg border border-[#071A2E] overflow-hidden mb-16">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#C9DFF2]/10 blur-2xl pointer-events-none"></div>
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-white font-mono text-xs font-semibold uppercase tracking-wider mb-4 border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9DFF2]"></span>
                <span>Pôle de développement régional • Ouagadougou · Zone 2000</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                Une double expertise adaptée au marché burkinabè
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6">
                De la création ex-nihilo d'une présence digitale complète jusqu'au boost de performance pour les plateformes existantes, AgenceOS déploie des solutions pérennes conformes aux réalités de connectivité et de paiements sous-régionaux.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs">
                <div>
                  <p className="text-white/60 uppercase font-mono text-[10px]">Architecture</p>
                  <p className="font-semibold text-white mt-0.5">Cloud & Offline-first</p>
                </div>
                <div>
                  <p className="text-white/60 uppercase font-mono text-[10px]">Paiements</p>
                  <p className="font-semibold text-white mt-0.5">Orange / Moov / Wave</p>
                </div>
                <div>
                  <p className="text-white/60 uppercase font-mono text-[10px]">Conformité</p>
                  <p className="font-semibold text-white mt-0.5">Normes CIL Burkina</p>
                </div>
                <div>
                  <p className="text-white/60 uppercase font-mono text-[10px]">Support</p>
                  <p className="font-semibold text-white mt-0.5">Équipe locale réactive</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto shrink-0">
              <div className="bg-white text-[#131b2e] p-5 rounded-xl border border-white/20 shadow-md max-w-sm">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-[#14456F]" />
                  <span className="font-bold text-xs uppercase tracking-wider text-[#0B2A4A] font-mono">
                    Gouvernance AgenceOS
                  </span>
                </div>
                <p className="text-xs text-[#545f73] mb-4 leading-relaxed">
                  Chaque projet est supervisé directement par un directeur full-stack avec engagement sur les délais de livraison et audit technique de sécurité.
                </p>
                <button
                  onClick={() => setPublicView('services')}
                  className="w-full py-2 px-3 bg-[#EEF3F8] hover:bg-[#E1EAF2] text-[#0B2A4A] text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explorer nos 4 pôles de service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Metric blocks matching Stitch Mockup 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          
          <div className="p-6 sm:p-8 rounded-xl bg-[#EEF3F8] border border-[#D9E2EC]">
            <p className="font-display font-bold text-4xl text-[#0B2A4A] mb-2">
              +50
            </p>
            <h3 className="font-bold text-sm text-[#131b2e] uppercase tracking-wide font-mono mb-1">
              Organisations accompagnées
            </h3>
            <p className="text-xs sm:text-sm text-[#545f73] leading-relaxed">
              Entreprises, PME, commerçants et structures publiques accompagnées dans leur passage au numérique durable.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-xl bg-[#EEF3F8] border border-[#D9E2EC]">
            <p className="font-display font-bold text-4xl text-[#0B2A4A] mb-2">
              100%
            </p>
            <h3 className="font-bold text-sm text-[#131b2e] uppercase tracking-wide font-mono mb-1">
              Compétences locales certifiées
            </h3>
            <p className="text-xs sm:text-sm text-[#545f73] leading-relaxed">
              Ingénierie basée à Ouagadougou valorisant l'expertise et le capital technique des talents du Burkina Faso.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-xl bg-[#EEF3F8] border border-[#D9E2EC]">
            <p className="font-display font-bold text-4xl text-[#0B2A4A] mb-2 font-mono">
              UEMOA
            </p>
            <h3 className="font-bold text-sm text-[#131b2e] uppercase tracking-wide font-mono mb-1">
              Disponibilité & conformité
            </h3>
            <p className="text-xs sm:text-sm text-[#545f73] leading-relaxed">
              Alignement strict sur les normes CIL, régulations CEDEAO et intégration native des flux monétiques régionaux.
            </p>
          </div>

        </div>

        {/* Section Les 4 Pôles de Service Officiels */}
        <div className="mb-20">
          <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#C9A227] font-bold">
                PÔLES DE SERVICE OFFICIELS · STRUCTURE RIGOUROUSE
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B2A4A] mt-2">
                4 domaines d'ingénierie clairement définis
              </h2>
              <p className="text-[#545f73] text-sm sm:text-base mt-2 max-w-2xl">
                Pas de discours vague d'informatique générale : une prise en charge ciblée selon la maturité de votre structure.
              </p>
            </div>

            <button
              onClick={() => setPublicView('services')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2A4A] hover:underline cursor-pointer shrink-0"
            >
              <span>Voir le détail des 4 pôles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Pôle 01 : Fondation et déploiement */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#ffffff] border-2 border-[#D9E2EC] hover:border-[#14456F] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#14456F] uppercase tracking-wider bg-[#EEF3F8] px-2.5 py-1 rounded">
                    Pôle 01
                  </span>
                  <Layers className="w-5 h-5 text-[#14456F]" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#0B2A4A] mb-2">
                  Fondation et Déploiement
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#14456F] mb-2">
                  Mise en place complète de la présence numérique d'une entreprise qui démarre
                </p>
                <p className="text-sm text-[#545f73] leading-relaxed mb-4">
                  Site web vitrine responsive, infrastructure de base sécurisée, noms de domaine professionnels et conformité réglementaire CIL.
                </p>
                <ul className="space-y-2 text-xs text-[#404945]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Site institutionnel haute performance optimisé mobile (3G/4G)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Hébergement cloud, certificats SSL et boîtes emails professionnelles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Accompagnement administratif et déclaration légale CIL Burkina</span>
                  </li>
                </ul>
              </div>

              <div className="pt-5 mt-4 border-t border-[#D9E2EC] flex items-center justify-between">
                <span className="text-xs font-mono text-[#545f73]">Entreprises en création & PME</span>
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="text-xs font-bold text-[#0B2A4A] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Chiffrer ce pôle</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Pôle 02 : Accompagnement et boutique digitale */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#ffffff] border-2 border-[#D9E2EC] hover:border-[#14456F] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#14456F] uppercase tracking-wider bg-[#EEF3F8] px-2.5 py-1 rounded">
                    Pôle 02
                  </span>
                  <Smartphone className="w-5 h-5 text-[#14456F]" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#0B2A4A] mb-2">
                  Accompagnement et Boutique Digitale
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#14456F] mb-2">
                  Suivi continu & solutions e-commerce pour accélérer et vendre
                </p>
                <p className="text-sm text-[#545f73] leading-relaxed mb-4">
                  Pour les entreprises déjà présentes souhaitant vendre en continu avec encaissements locaux (Orange Money, Moov Money, Wave).
                </p>
                <ul className="space-y-2 text-xs text-[#404945]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Boutique marchande ou catalogue interactif avec gestion de stock</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Passerelles Mobile Money (Orange Money, Moov, Wave) et WhatsApp direct</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Suivi régulier des ventes, maintenance évolutive et assistance technique</span>
                  </li>
                </ul>
              </div>

              <div className="pt-5 mt-4 border-t border-[#D9E2EC] flex items-center justify-between">
                <span className="text-xs font-mono text-[#545f73]">Commerces & Marques locales</span>
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="text-xs font-bold text-[#0B2A4A] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Chiffrer ce pôle</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Pôle 03 : Développement web & mobile sur mesure */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#ffffff] border-2 border-[#D9E2EC] hover:border-[#14456F] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#14456F] uppercase tracking-wider bg-[#EEF3F8] px-2.5 py-1 rounded">
                    Pôle 03
                  </span>
                  <Globe2 className="w-5 h-5 text-[#14456F]" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#0B2A4A] mb-2">
                  Développement Web & Mobile sur Mesure
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#14456F] mb-2">
                  Solutions logicielles avancées taillées pour vos processus métiers spécifiques
                </p>
                <p className="text-sm text-[#545f73] leading-relaxed mb-4">
                  Plateformes web complexes, portails d'entreprise, applications mobiles offline-first adaptées aux contraintes de connectivité sahélienne.
                </p>
                <ul className="space-y-2 text-xs text-[#404945]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Applications mobiles Android / iOS avec mode 100% hors-ligne</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Développement d'APIs REST sécurisées et interconnexions bancaires</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Supervision par le Directeur Full-Stack avec revue de code systématique</span>
                  </li>
                </ul>
              </div>

              <div className="pt-5 mt-4 border-t border-[#D9E2EC] flex items-center justify-between">
                <span className="text-xs font-mono text-[#545f73]">Startups, ONG, Entreprises matures</span>
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="text-xs font-bold text-[#0B2A4A] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Chiffrer ce pôle</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Pôle 04 : Identité digitale & gestion de réseaux sociaux */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#ffffff] border-2 border-[#D9E2EC] hover:border-[#14456F] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#14456F] uppercase tracking-wider bg-[#EEF3F8] px-2.5 py-1 rounded">
                    Pôle 04
                  </span>
                  <Share2 className="w-5 h-5 text-[#14456F]" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#0B2A4A] mb-2">
                  Identité Digitale & Gestion de Réseaux Sociaux
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#14456F] mb-2">
                  Branding fort & animation de communautés pour transformer vos abonnés en clients
                </p>
                <p className="text-sm text-[#545f73] leading-relaxed mb-4">
                  Création de charte graphique, logos, production de formats vidéo courts (TikTok, Reels) et modération active de vos communautés.
                </p>
                <ul className="space-y-2 text-xs text-[#404945]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Identité visuelle complète (logo vectoriel, charte, supports print & web)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Calendrier éditorial stratégique et modération quotidienne 5j/7</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Production de vidéos courtes dynamiques (formats 9:16) et campagnes ads</span>
                  </li>
                </ul>
              </div>

              <div className="pt-5 mt-4 border-t border-[#D9E2EC] flex items-center justify-between">
                <span className="text-xs font-mono text-[#545f73]">Toutes organisations & Leaders</span>
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="text-xs font-bold text-[#0B2A4A] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Chiffrer ce pôle</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Section Équipe & Métiers représentés */}
        <div id="metiers" className="mb-20 pt-10 border-t border-[#D9E2EC]">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-xs uppercase tracking-wider text-[#C9A227] font-bold">
              PÔLE INGÉNIERIE & MÉTIERS
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B2A4A] mt-2">
              Une équipe d'experts burkinabè aux compétences complémentaires
            </h2>
            <p className="text-[#545f73] text-sm sm:text-base mt-2">
              AgenceOS réunit sous la conduite d'un Directeur/Fondateur (développeur full-stack) des spécialistes dédiés à chaque maillon de votre chaîne numérique.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Metier 1: Développeur Front-end */}
            <div className="p-6 rounded-xl bg-[#EEF3F8] border border-[#D9E2EC]">
              <div className="w-10 h-10 rounded-lg bg-[#ffffff] text-[#0B2A4A] border border-[#C3CEDA]/50 flex items-center justify-center mb-4">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-[#0B2A4A] mb-1">
                Développeurs Front-end
              </h3>
              <p className="text-xs text-[#545f73] leading-relaxed mb-3">
                Spécialistes React, Next.js et Tailwind CSS garantissant des interfaces rapides, fluides et optimisées pour le mobile.
              </p>
              <div className="text-[11px] font-mono text-[#C9A227] font-semibold">
                React · TS · Tailwind · Offline
              </div>
            </div>

            {/* Metier 2: Community Manager */}
            <div className="p-6 rounded-xl bg-[#EEF3F8] border border-[#D9E2EC]">
              <div className="w-10 h-10 rounded-lg bg-[#ffffff] text-[#0B2A4A] border border-[#C3CEDA]/50 flex items-center justify-center mb-4">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-[#0B2A4A] mb-1">
                Community Managers
              </h3>
              <p className="text-xs text-[#545f73] leading-relaxed mb-3">
                Pilotes de l'e-réputation, du storytelling local et de la conversion sur les réseaux sociaux (Meta, TikTok, LinkedIn).
              </p>
              <div className="text-[11px] font-mono text-[#C9A227] font-semibold">
                Social Ads · Copywriting · Modération
              </div>
            </div>

            {/* Metier 3: Vidéaste */}
            <div className="p-6 rounded-xl bg-[#EEF3F8] border border-[#D9E2EC]">
              <div className="w-10 h-10 rounded-lg bg-[#ffffff] text-[#0B2A4A] border border-[#C3CEDA]/50 flex items-center justify-center mb-4">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-[#0B2A4A] mb-1">
                Vidéastes & Monteurs
              </h3>
              <p className="text-xs text-[#545f73] leading-relaxed mb-3">
                Captation et post-production de formats courts (Reels, TikTok) et spots publicitaires percutants au sound design soigné.
              </p>
              <div className="text-[11px] font-mono text-[#C9A227] font-semibold">
                Formats 9:16 · Montage 4K · Sound FX
              </div>
            </div>

            {/* Metier 4: Graphiste */}
            <div className="p-6 rounded-xl bg-[#EEF3F8] border border-[#D9E2EC]">
              <div className="w-10 h-10 rounded-lg bg-[#ffffff] text-[#0B2A4A] border border-[#C3CEDA]/50 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-[#0B2A4A] mb-1">
                Graphistes & Designers
              </h3>
              <p className="text-xs text-[#545f73] leading-relaxed mb-3">
                Architectes visuels concevant des chartes graphiques mémorables, des identités fortes et des assets print & digital.
              </p>
              <div className="text-[11px] font-mono text-[#C9A227] font-semibold">
                Illustrator · Figma · Identité visuelle
              </div>
            </div>

          </div>

          {/* Institutional Quality Charter */}
          <div className="mt-8 p-6 rounded-xl bg-[#ffffff] border border-[#14456F]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C9DFF2] text-[#0B2A4A] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0B2A4A]">
                  Supervision Technique & Gouvernance Déontologique
                </h4>
                <p className="text-xs text-[#545f73]">
                  Direction assurée par un développeur full-stack expérimenté, garantissant l'intégrité du code, le respect des délais et la conformité aux lois burkinabè (CIL).
                </p>
              </div>
            </div>

            <button
              onClick={onOpenCandidateFlow}
              className="shrink-0 px-4 py-2 bg-[#EEF3F8] hover:bg-[#E1EAF2] text-[#0B2A4A] text-xs font-bold rounded-lg border border-[#C3CEDA] transition-colors cursor-pointer"
            >
              Postuler à l'équipe
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
