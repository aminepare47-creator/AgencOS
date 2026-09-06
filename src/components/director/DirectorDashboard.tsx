import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OverviewTab } from './OverviewTab';
import { ApplicationsTab } from './ApplicationsTab';
import { CollaboratorsTab } from './CollaboratorsTab';
import { TestTemplatesTab } from './TestTemplatesTab';
import { QuotesTab } from './QuotesTab';
import { SettingsTab } from './SettingsTab';
import { ApplicationDetailModal } from './ApplicationDetailModal';
import { AddCollaboratorModal } from './AddCollaboratorModal';
import { DirectorTab } from '../../types';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  CheckSquare, 
  Sparkles, 
  Settings, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  ExternalLink 
} from 'lucide-react';

export const DirectorDashboard: React.FC = () => {
  const { 
    directorTab, 
    setDirectorTab, 
    setIsDirectorMode, 
    setPublicView,
    candidatures, 
    devisList 
  } = useApp();

  const [selectedCandidatureId, setSelectedCandidatureId] = useState<string | null>(null);
  const [isAddCollabOpen, setIsAddCollabOpen] = useState(false);

  const pendingTestsCount = candidatures.filter(c => c.statut === 'en_evaluation').length;
  const newQuotesCount = devisList.filter(d => d.statut === 'nouveau').length;

  const tabs: { id: DirectorTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'overview', label: 'Vue d’ensemble', icon: <LayoutDashboard className="w-4 h-4" /> },
    { 
      id: 'applications', 
      label: 'Candidatures & Tests', 
      icon: <FileText className="w-4 h-4" />, 
      badge: pendingTestsCount > 0 ? pendingTestsCount : undefined 
    },
    { id: 'collaborators', label: 'Collaborateurs', icon: <Users className="w-4 h-4" /> },
    { id: 'tests', label: 'Modèles d’épreuves', icon: <CheckSquare className="w-4 h-4" /> },
    { 
      id: 'quotes', 
      label: 'Devis Reçus', 
      icon: <Sparkles className="w-4 h-4" />, 
      badge: newQuotesCount > 0 ? newQuotesCount : undefined 
    },
    { id: 'settings', label: 'Paramètres', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#131b2e] flex flex-col font-sans">
      {/* Top Director Admin Header (Stitch Mockup 5 style) */}
      <header className="bg-white text-[#131b2e] border-b border-[#D9E2EC] sticky top-0 z-40 shadow-xs">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left Brand & Return */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsDirectorMode(false);
                  setPublicView('home');
                }}
                className="p-2 rounded-lg bg-[#F7F9FC] hover:bg-[#E1EAF2] text-[#0B2A4A] border border-[#C3CEDA] transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                title="Retour au portail public"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Portail Public</span>
              </button>

              <div className="h-6 w-px bg-[#D9E2EC] hidden sm:block" />

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0B2A4A] flex items-center justify-center font-bold text-white text-xs font-display">
                  AOS
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm tracking-tight text-[#0B2A4A] font-display">
                      AgenceOS
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-[#C9DFF2] text-[#071A2E] border border-emerald-300 px-2 py-0.2 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-800" />
                      Direction Technique
                    </span>
                  </div>
                  <span className="text-[10px] text-[#545f73] block -mt-0.5 font-mono">
                    Cabinet de Contrôle & Recrutement
                  </span>
                </div>
              </div>
            </div>

            {/* Right Alerts & Shortcuts */}
            <div className="flex items-center gap-3">
              {pendingTestsCount > 0 && (
                <button
                  onClick={() => setDirectorTab('applications')}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E1EAF2] border border-[#14456F] text-[#0B2A4A] text-xs font-bold font-mono cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5 text-[#14456F]" />
                  <span>{pendingTestsCount} test(s) à évaluer</span>
                </button>
              )}

              <button
                onClick={() => {
                  setIsDirectorMode(false);
                  setPublicView('home');
                }}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#F7F9FC] text-[#545f73] hover:text-[#0B2A4A] border border-[#C3CEDA] text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Voir site public</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 border-t border-[#D9E2EC] no-scrollbar">
            {tabs.map(tab => {
              const isActive = directorTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`director-tab-${tab.id}`}
                  onClick={() => setDirectorTab(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#14456F] text-white shadow-xs'
                      : 'text-[#545f73] hover:text-[#0B2A4A] hover:bg-[#EEF3F8]'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold font-mono ${
                      isActive ? 'bg-[#C9DFF2] text-[#071A2E]' : 'bg-[#14456F] text-white'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Tab Content View */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {directorTab === 'overview' && (
          <OverviewTab
            onSelectCandidature={(id) => setSelectedCandidatureId(id)}
            onOpenAddCollab={() => setIsAddCollabOpen(true)}
          />
        )}

        {directorTab === 'applications' && (
          <ApplicationsTab
            onSelectCandidature={(id) => setSelectedCandidatureId(id)}
          />
        )}

        {directorTab === 'collaborators' && (
          <CollaboratorsTab
            onOpenAddCollab={() => setIsAddCollabOpen(true)}
          />
        )}

        {directorTab === 'tests' && (
          <TestTemplatesTab />
        )}

        {directorTab === 'quotes' && (
          <QuotesTab />
        )}

        {directorTab === 'settings' && (
          <SettingsTab />
        )}
      </main>

      {/* Modals */}
      <ApplicationDetailModal
        candidatureId={selectedCandidatureId}
        onClose={() => setSelectedCandidatureId(null)}
      />

      <AddCollaboratorModal
        isOpen={isAddCollabOpen}
        onClose={() => setIsAddCollabOpen(false)}
      />
    </div>
  );
};
