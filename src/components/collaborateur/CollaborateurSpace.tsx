import React, { useState } from 'react';
import {
  LayoutDashboard,
  History,
  IdCard,
  LogOut,
  ClipboardList,
  Clock,
  CheckCircle2,
  Send,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LoginScreen } from './LoginScreen';
import { TacheCard } from './TacheCard';
import { ProfilTab } from './ProfilTab';

type CollabTab = 'overview' | 'historique' | 'profil';

export const CollaborateurSpace: React.FC = () => {
  const { currentCollaborateur, logoutCollaborateur, setIsCollabSpaceOpen, taches, postes } = useApp();
  const [tab, setTab] = useState<CollabTab>('overview');

  if (!currentCollaborateur) {
    return <LoginScreen />;
  }

  const mesTaches = taches.filter(t => t.collaborateurId === currentCollaborateur.id);
  const enCours = mesTaches.filter(t => t.statut === 'a_faire' || t.statut === 'en_cours');
  const enRevue = mesTaches.filter(t => t.statut === 'en_revue_directeur');
  const historique = mesTaches.filter(t => t.statut === 'validee' || t.statut === 'terminee');
  const poste = postes.find(p => p.id === currentCollaborateur.posteId);
  const totalHeures = mesTaches.reduce((s, t) => s + (t.tempsPasseHeures || 0), 0);

  const TABS: Array<{ id: CollabTab; label: string; icon: React.ReactNode }> = [
    { id: 'overview', label: "Vue d'ensemble", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'historique', label: 'Historique', icon: <History className="w-4 h-4" /> },
    { id: 'profil', label: 'Profil', icon: <IdCard className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fc] font-sans">
      <header className="bg-[#002117] text-white">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#baeed9] text-[#002117] flex items-center justify-center font-bold text-sm">
              {currentCollaborateur.nom.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">{currentCollaborateur.nom}</p>
              <p className="text-[11px] text-[#baeed9]">{poste?.nom}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCollabSpaceOpen(false)}
              className="text-xs px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 cursor-pointer"
            >
              Quitter l'espace
            </button>
            <button
              onClick={logoutCollaborateur}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-[#baeed9] hover:bg-[#9ed1bd] text-[#002117] font-semibold cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Déconnexion
            </button>
          </div>
        </div>
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-t-lg transition-colors cursor-pointer whitespace-nowrap ${
                tab === t.id ? 'bg-[#f7f8fc] text-[#003629]' : 'text-white/70 hover:text-white'
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8">
        {tab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Tâches actives', value: enCours.length, icon: <ClipboardList className="w-5 h-5" /> },
                { label: 'En revue', value: enRevue.length, icon: <Send className="w-5 h-5" /> },
                { label: 'Projets livrés', value: historique.length, icon: <CheckCircle2 className="w-5 h-5" /> },
                { label: 'Heures cumulées', value: `${totalHeures} h`, icon: <Clock className="w-5 h-5" /> },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-white border border-[#e2e7ff] p-5">
                  <div className="w-9 h-9 rounded-lg bg-[#f2f3ff] text-[#1b4d3e] flex items-center justify-center mb-3">
                    {s.icon}
                  </div>
                  <p className="font-display font-bold text-2xl text-[#003629]">{s.value}</p>
                  <p className="text-[11px] text-[#545f73]">{s.label}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-display font-bold text-lg text-[#003629] mb-3">Mes tâches assignées</h3>
              {enCours.length === 0 ? (
                <p className="text-sm text-[#545f73] bg-white border border-[#e2e7ff] rounded-xl p-6 text-center">
                  Aucune tâche active pour le moment. Le Directeur vous assignera prochainement de nouvelles missions.
                </p>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {enCours.map(t => <TacheCard key={t.id} tache={t} showDeliverAction />)}
                </div>
              )}
            </div>

            {enRevue.length > 0 && (
              <div>
                <h3 className="font-display font-bold text-lg text-[#003629] mb-3">En attente de validation</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {enRevue.map(t => <TacheCard key={t.id} tache={t} />)}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'historique' && (
          <div>
            <h3 className="font-display font-bold text-lg text-[#003629] mb-3">
              Historique des livraisons ({historique.length})
            </h3>
            {historique.length === 0 ? (
              <p className="text-sm text-[#545f73] bg-white border border-[#e2e7ff] rounded-xl p-6 text-center">
                Aucune tâche livrée pour l'instant.
              </p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {historique.map(t => <TacheCard key={t.id} tache={t} />)}
              </div>
            )}
          </div>
        )}

        {tab === 'profil' && <ProfilTab />}
      </main>
    </div>
  );
};
