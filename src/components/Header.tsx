import React, { useState } from 'react';
import { useApp, PublicPageView } from '../context/AppContext';
import { 
  Search, 
  Menu, 
  X, 
  Phone, 
  FileText,
  LifeBuoy,
  Briefcase,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  onOpenTracking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTracking }) => {
  const { 
    isDirectorMode, 
    setIsDirectorMode, 
    publicView, 
    setPublicView, 
    setIsQuoteModalOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (view: PublicPageView) => {
    setIsDirectorMode(false);
    setPublicView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#ffffff] border-b border-[#e2e7ff] shadow-[0_1px_4px_rgba(19,27,46,0.04)] font-sans">
      <div className="h-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => navigateTo('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded bg-[#1b4d3e] text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-[#003629] transition-colors">
            <span className="font-display tracking-tight text-white font-bold">AOS</span>
          </div>
          <div className="h-6 w-px bg-[#c0c9c3] hidden sm:block"></div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg text-[#003629] uppercase tracking-tight leading-none">
              AgenceOS
            </span>
            <span className="font-mono text-[10px] text-[#545f73] uppercase tracking-wider mt-0.5 font-medium">
              BURKINA FASO
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 h-full">
          <button
            onClick={() => navigateTo('home')}
            className={`h-full flex items-center px-1 text-sm font-medium transition-colors cursor-pointer ${
              publicView === 'home' && !isDirectorMode
                ? 'text-[#003629] font-bold border-b-2 border-[#003629]'
                : 'text-[#404945] hover:text-[#131b2e] border-b-2 border-transparent'
            }`}
          >
            Accueil
          </button>
          
          <button
            onClick={() => navigateTo('services')}
            className={`h-full flex items-center px-1 text-sm font-medium transition-colors cursor-pointer ${
              publicView === 'services' && !isDirectorMode
                ? 'text-[#003629] font-bold border-b-2 border-[#003629]'
                : 'text-[#404945] hover:text-[#131b2e] border-b-2 border-transparent'
            }`}
          >
            Services (4 Pôles)
          </button>
          
          <button
            onClick={() => navigateTo('candidate_flow')}
            className={`h-full flex items-center px-1 text-sm font-medium transition-colors cursor-pointer ${
              publicView === 'candidate_flow' && !isDirectorMode
                ? 'text-[#003629] font-bold border-b-2 border-[#003629]'
                : 'text-[#404945] hover:text-[#131b2e] border-b-2 border-transparent'
            }`}
          >
            Rejoindre l'équipe
          </button>
          
          <button
            onClick={() => navigateTo('contact')}
            className={`h-full flex items-center px-1 text-sm font-medium transition-colors cursor-pointer ${
              publicView === 'contact' && !isDirectorMode
                ? 'text-[#003629] font-bold border-b-2 border-[#003629]'
                : 'text-[#404945] hover:text-[#131b2e] border-b-2 border-transparent'
            }`}
          >
            Contact
          </button>

          <button
            onClick={() => navigateTo('support')}
            className={`h-full flex items-center px-1 text-sm font-medium transition-colors cursor-pointer ${
              publicView === 'support' && !isDirectorMode
                ? 'text-[#003629] font-bold border-b-2 border-[#003629]'
                : 'text-[#404945] hover:text-[#131b2e] border-b-2 border-transparent'
            }`}
          >
            Support
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Support Phone number badge */}
          <a
            href="tel:+22655300868"
            className="hidden xl:flex items-center gap-1.5 text-xs font-mono text-[#003629] bg-[#f2f3ff] hover:bg-[#eaedff] px-2.5 py-1.5 rounded-lg border border-[#c0c9c3]/50 transition-colors"
            title="Ligne officielle de contact AgenceOS"
          >
            <Phone className="w-3.5 h-3.5 text-[#1b4d3e]" />
            <span className="font-bold">+226 55 30 08 68</span>
          </a>

          {/* Suivi Candidature quick button */}
          <button
            onClick={onOpenTracking}
            className="hidden sm:flex items-center gap-1.5 text-xs text-[#545f73] hover:text-[#003629] font-medium px-2.5 py-1.5 rounded-lg hover:bg-[#f2f3ff] transition-colors cursor-pointer"
            title="Consulter l'état de votre dossier avec votre référence"
          >
            <Search className="w-3.5 h-3.5 text-[#545f73]" />
            <span>Suivi de dossier</span>
          </button>

          {/* Discuter d'un projet Button (Primary Client CTA) */}
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="inline-flex items-center justify-center bg-[#1b4d3e] hover:bg-[#003629] text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            Discuter d'un projet
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#545f73] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#e2e7ff] px-4 py-4 space-y-2 shadow-lg">
          <button
            onClick={() => navigateTo('home')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              publicView === 'home' && !isDirectorMode ? 'bg-[#f2f3ff] text-[#003629] font-bold' : 'text-[#404945]'
            }`}
          >
            Accueil
          </button>
          
          <button
            onClick={() => navigateTo('services')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              publicView === 'services' && !isDirectorMode ? 'bg-[#f2f3ff] text-[#003629] font-bold' : 'text-[#404945]'
            }`}
          >
            Services (Les 4 Pôles)
          </button>
          
          <button
            onClick={() => navigateTo('candidate_flow')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              publicView === 'candidate_flow' && !isDirectorMode ? 'bg-[#f2f3ff] text-[#003629] font-bold' : 'text-[#404945]'
            }`}
          >
            Rejoindre l'équipe (Collaborateur)
          </button>
          
          <button
            onClick={() => navigateTo('contact')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              publicView === 'contact' && !isDirectorMode ? 'bg-[#f2f3ff] text-[#003629] font-bold' : 'text-[#404945]'
            }`}
          >
            Contact
          </button>

          <button
            onClick={() => navigateTo('support')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              publicView === 'support' && !isDirectorMode ? 'bg-[#f2f3ff] text-[#003629] font-bold' : 'text-[#404945]'
            }`}
          >
            Support & Assistance (+226 55 30 08 68)
          </button>

          <div className="pt-3 border-t border-[#f2f3ff] space-y-2">
            <button
              onClick={() => {
                onOpenTracking();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#545f73] bg-[#f2f3ff] rounded-lg cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-[#003629]" />
                <span>Suivre mon dossier candidat</span>
              </span>
            </button>

            <a
              href="tel:+22655300868"
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono text-[#003629] bg-[#eaedff] rounded-lg font-bold"
            >
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>Appel / Urgence : +226 55 30 08 68</span>
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
