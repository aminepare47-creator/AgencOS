import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/public/Hero';
import { ServicesSection } from './components/public/ServicesSection';
import { WhyUsSection } from './components/public/WhyUsSection';
import { RealisationsSection } from './components/public/RealisationsSection';
import { ContactSection } from './components/public/ContactSection';
import { PrivacyPolicyPage } from './components/public/PrivacyPolicyPage';
import { SupportPage } from './components/public/SupportPage';
import { QuoteModal } from './components/public/QuoteModal';
import { CandidateApplicationFlow } from './components/candidate/CandidateApplicationFlow';
import { TrackApplicationModal } from './components/candidate/TrackApplicationModal';
import { DirectorDashboard } from './components/director/DirectorDashboard';
import { CollaborateurSpace } from './components/collaborateur/CollaborateurSpace';

function AppContent() {
  const { 
    isDirectorMode, 
    publicView, 
    setPublicView, 
    isCollabSpaceOpen,
    setIsCollabSpaceOpen,
    setIsQuoteModalOpen 
  } = useApp();

  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [trackInitialCode, setTrackInitialCode] = useState('');

  const handleOpenTrackingWithCode = (code: string) => {
    setTrackInitialCode(code);
    setIsTrackModalOpen(true);
  };

  // If Director mode is activated, show Director Dashboard
  if (isDirectorMode) {
    return <DirectorDashboard />;
  }

  // If Collaborateur space is open, show Collaborateur Space (auth-gated inside)
  if (isCollabSpaceOpen) {
    return <CollaborateurSpace />;
  }

  // Public Views
  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] font-sans selection:bg-[#C9DFF2] selection:text-[#071A2E]">
      {/* Public Navigation Header */}
      <Header
        onOpenTracking={() => {
          setTrackInitialCode('');
          setIsTrackModalOpen(true);
        }}
      />

      {/* Main Public Content Router */}
      <main className="flex-1">
        {publicView === 'home' && (
          <>
            <Hero onOpenCandidateFlow={() => {
              setPublicView('candidate_flow');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />
            <ServicesSection onOpenQuote={() => setIsQuoteModalOpen(true)} />
            <RealisationsSection onOpenQuote={() => setIsQuoteModalOpen(true)} />
            <WhyUsSection />
            <ContactSection />
          </>
        )}

        {publicView === 'services' && (
          <div className="pt-[92px]">
            <ServicesSection onOpenQuote={() => setIsQuoteModalOpen(true)} />
            <ContactSection />
          </div>
        )}

        {publicView === 'why_us' && (
          <div className="pt-[92px]">
            <WhyUsSection />
            <ContactSection />
          </div>
        )}

        {publicView === 'contact' && (
          <div className="pt-[92px]">
            <ContactSection />
          </div>
        )}

        {publicView === 'candidate_flow' && (
          <CandidateApplicationFlow
            onOpenTrackingWithCode={handleOpenTrackingWithCode}
          />
        )}

        {publicView === 'privacy' && (
          <PrivacyPolicyPage />
        )}

        {publicView === 'support' && (
          <SupportPage />
        )}
      </main>

      {/* Public Footer */}
      <Footer
        onOpenTrackingWithCode={handleOpenTrackingWithCode}
        onOpenCollabSpace={() => setIsCollabSpaceOpen(true)}
      />

      {/* Modals */}
      <QuoteModal />

      <TrackApplicationModal
        isOpen={isTrackModalOpen}
        onClose={() => {
          setIsTrackModalOpen(false);
          setTrackInitialCode('');
        }}
        initialCode={trackInitialCode}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
