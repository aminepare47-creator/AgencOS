import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Mail, 
  Phone, 
  Search, 
  UserPlus, 
  ChevronRight,
  LifeBuoy
} from 'lucide-react';
import { POLES_SERVICES } from '../data/polesServices';

interface FooterProps {
  onOpenTrackingWithCode?: (code: string) => void;
  onOpenCollabSpace?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTrackingWithCode, onOpenCollabSpace }) => {
  const { setPublicView, setIsDirectorMode, setIsQuoteModalOpen, setIsCollabSpaceOpen } = useApp();
  const [quickSearchCode, setQuickSearchCode] = useState('');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearchCode.trim() && onOpenTrackingWithCode) {
      onOpenTrackingWithCode(quickSearchCode.trim());
      setQuickSearchCode('');
    }
  };

  return (
    <footer className="bg-[#071A2E] text-[#D9E2EC] border-t border-[#0B2A4A] font-sans">
      {/* Top CTA Banner */}
      <div className="border-b border-white/10 bg-[#0B2A4A] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#C9DFF2]/15 text-[#C9DFF2] border border-[#C9DFF2]/30 mb-2 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              DIGITALISATION DES ENTREPRISES
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display">
              Prêt à digitaliser votre entreprise ?
            </h3>
            <p className="text-white/70 text-xs sm:text-sm mt-1 max-w-xl">
              Solutions web, mobiles et accompagnement continu des entreprises du Burkina Faso.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-5 py-2.5 rounded-lg bg-[#C9DFF2] hover:bg-[#A7C7E0] text-[#071A2E] text-xs sm:text-sm font-bold shadow-sm transition-colors text-center cursor-pointer"
            >
              Demander un devis
            </button>
            <button
              onClick={() => {
                setIsDirectorMode(false);
                setPublicView('candidate_flow');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-semibold transition-colors text-center flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-[#C9DFF2]" />
              <span>Rejoindre l'équipe</span>
            </button>
          </div>
        </div>
      </div>
      {/* Main Footer Content */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Col 1: Identity & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#C9DFF2] text-[#071A2E] font-extrabold flex items-center justify-center text-sm font-display">
                AOS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg text-white font-display">AgenceOS</span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-[#C9DFF2] border border-white/10">
                    Burkina Faso
                  </span>
                </div>
                <p className="text-xs text-white/70">Transformation & Accompagnement Numérique</p>
              </div>
            </div>

            <p className="text-xs text-white/75 leading-relaxed pr-4">
              Agence de digitalisation des entreprises burkinabè : création de plateformes
              web & mobiles, e-commerce, identité visuelle et gestion des réseaux sociaux.
            </p>

            <div className="pt-2 space-y-2 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C9DFF2] shrink-0" />
                <span className="font-mono font-bold text-white">+226 55 30 08 68</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C9DFF2] shrink-0" />
                <span className="font-mono">contact@agenceos.bf</span>
              </div>
            </div>
          </div>

          {/* Col 2: The 4 Official Service Poles (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Pôles de Service
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              {POLES_SERVICES.map(pole => (
                <li key={pole.id}>
                  <button 
                    onClick={() => { 
                      setIsDirectorMode(false); 
                      setPublicView('services'); 
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#C9DFF2] transition-colors flex items-start gap-1.5 cursor-pointer text-left group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#C9DFF2] shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                    <span>{pole.titre}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <button
                onClick={() => {
                  setIsDirectorMode(false);
                  setPublicView('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-[11px] text-[#C9DFF2] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Découvrir les livrables par pôle</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
          {/* Col 3: Recrutement Collaborateurs (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>Recrutement</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </h4>
            <p className="text-[11px] text-white/70 leading-relaxed">
              Sélection par épreuve technique privée pour les talents du Burkina :
            </p>
            <ul className="space-y-1 text-xs text-white/70 font-mono">
              <li>• Dév. Front-end</li>
              <li>• Community Manager</li>
              <li>• Vidéaste / Monteur</li>
              <li>• Graphiste Designer</li>
            </ul>
            <button
              onClick={() => {
                setIsDirectorMode(false);
                setPublicView('candidate_flow');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#C9DFF2] hover:underline pt-1 cursor-pointer"
            >
              <span>Accéder au test (4 étapes)</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Col 4: Suivi Candidat & Support Client (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Suivi de Candidature
            </h4>
            
            <form onSubmit={handleQuickSearch} className="space-y-2">
              <label htmlFor="quick-tracking-input" className="text-[11px] text-white/70 block font-mono">
                Code de suivi (AOS-...)
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  id="quick-tracking-input"
                  type="text"
                  placeholder="Ex: AOS-DEV-9120"
                  value={quickSearchCode}
                  onChange={(e) => setQuickSearchCode(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#C9DFF2] font-mono"
                />
                <button
                  type="submit"
                  className="p-2 rounded-lg bg-[#C9DFF2] hover:bg-[#A7C7E0] text-[#071A2E] font-bold transition-colors cursor-pointer shrink-0"
                  title="Consulter mon dossier"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <div className="pt-3 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  if (onOpenCollabSpace) {
                    onOpenCollabSpace();
                  } else {
                    setIsCollabSpaceOpen(true);
                  }
                }}
                className="w-full flex items-center justify-between text-xs text-white/80 hover:text-[#C9DFF2] transition-colors cursor-pointer py-1"
              >
                <span className="flex items-center gap-2">
                  <UserPlus className="w-3.5 h-3.5 text-[#C9DFF2]" />
                  <span>Espace Collaborateur</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              </button>

              <button
                onClick={() => {
                  setIsDirectorMode(false);
                  setPublicView('support');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full flex items-center justify-between text-xs text-white/80 hover:text-[#C9DFF2] transition-colors cursor-pointer py-1"
              >
                <span className="flex items-center gap-2">
                  <LifeBuoy className="w-3.5 h-3.5 text-[#C9DFF2]" />
                  <span>Support & Assistance Client</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              </button>

              <button
                onClick={() => {
                  setIsDirectorMode(false);
                  setPublicView('privacy');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full flex items-center justify-between text-xs text-white/80 hover:text-[#C9DFF2] transition-colors cursor-pointer py-1"
              >
                <span>Politique de confidentialité</span>
                <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 text-xs text-white/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} AgenceOS Burkina Faso · Tous droits réservés.</p>
        </div>

      </div>
    </footer>
  );
};