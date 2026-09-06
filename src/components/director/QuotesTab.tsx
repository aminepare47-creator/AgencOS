import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatutDevis } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Sparkles, 
  Search, 
  Phone, 
  Mail, 
  MessageSquare 
} from 'lucide-react';

export const QuotesTab: React.FC = () => {
  const { devisList, updateDevisStatut } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatut, setFilterStatut] = useState<string>('all');

  const filteredDevis = devisList.filter(d => {
    const q = searchQuery.toLowerCase().trim();
    const servicesText = d.servicesRequis ? d.servicesRequis.join(' ').toLowerCase() : '';
    const serviceDemandeText = (d.serviceDemande || '').toLowerCase();

    const matchesQuery = 
      !q ||
      d.entreprise.toLowerCase().includes(q) ||
      d.clientNom.toLowerCase().includes(q) ||
      d.ville.toLowerCase().includes(q) ||
      serviceDemandeText.includes(q) ||
      servicesText.includes(q);

    const matchesStatut = filterStatut === 'all' || d.statut === filterStatut;
    return matchesQuery && matchesStatut;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0B2A4A] font-display">
            Devis Reçus & Portefeuille Prospects
          </h2>
          <p className="text-xs sm:text-sm text-[#545f73] mt-0.5">
            Toutes les demandes de chiffrage transmises par les entreprises via le simulateur ou le formulaire de contact.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-white border border-[#C3CEDA] text-[#131b2e] font-bold">
            Total : {devisList.length}
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-[#E1EAF2] border border-[#14456F]/20 text-[#0B2A4A] font-bold">
            Nouveaux : {devisList.filter(d => d.statut === 'nouveau').length}
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#D9E2EC] shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#707974] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Rechercher une entreprise, un client ou une ville..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#14456F] focus:bg-white"
          />
        </div>

        <div>
          <select
            value={filterStatut}
            onChange={(e) => setFilterStatut(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] focus:outline-none focus:border-[#14456F] focus:bg-white"
          >
            <option value="all">Tous les états de suivi</option>
            <option value="nouveau">Nouveaux (À contacter)</option>
            <option value="contacte">Contacté / Proposition transmise</option>
            <option value="signe">Contrat signé / Gagné</option>
            <option value="archive">Archivés</option>
          </select>
        </div>
      </div>

      {/* Quotes Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredDevis.map(devis => {
          const isNew = devis.statut === 'nouveau';
          const cleanPhone = devis.telephone.replace(/[^0-9]/g, '');
          const waUrl = `https://wa.me/${cleanPhone}?text=Bonjour%20${encodeURIComponent(devis.clientNom)},%20Direction%20de%20AgenceOS.%20J'ai%20bien%20reçu%20votre%20demande%20de%20devis%20pour%20${encodeURIComponent(devis.entreprise)}.`;

          return (
            <div
              key={devis.id}
              className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-xs transition-all flex flex-col justify-between ${
                isNew ? 'border-2 border-[#14456F]' : 'border-[#D9E2EC]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <StatusBadge statut={devis.statut} type="devis" />
                  <span className="text-[11px] text-[#707974] font-mono">
                    Reçu le {new Date(devis.dateDemande).toLocaleDateString('fr-FR')}
                  </span>
                </div>

                <div className="mb-3">
                  <h3 className="text-base font-bold text-[#131b2e] font-display">{devis.entreprise}</h3>
                  <p className="text-xs text-[#545f73]">
                    Interlocuteur : <strong className="text-[#131b2e]">{devis.clientNom}</strong> · {devis.ville}
                  </p>
                </div>

                {/* Service & Budget pill */}
                <div className="flex flex-wrap gap-2 mb-3 text-xs">
                  <span className="bg-[#F7F9FC] text-[#131b2e] border border-[#C3CEDA] px-2.5 py-1 rounded-lg font-medium">
                    {devis.serviceDemande || (devis.servicesRequis && devis.servicesRequis[0]) || 'Transformation Digitale'}
                  </span>
                  <span className="bg-[#E1EAF2] text-[#0B2A4A] border border-[#14456F]/30 px-2.5 py-1 rounded-lg font-bold font-mono">
                    Budget : {devis.budgetEstime}
                  </span>
                  {devis.delaiSouhaite && (
                    <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-lg font-medium font-mono">
                      Échéance : {devis.delaiSouhaite}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="bg-[#F7F9FC] p-3 rounded-xl border border-[#D9E2EC] text-xs text-[#545f73] leading-relaxed mb-4 italic">
                  "{devis.descriptionProjet}"
                </div>

                {/* Contact info */}
                <div className="space-y-1 text-xs text-[#545f73] mb-4 pt-2 border-t border-[#D9E2EC] font-mono">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#707974]" />
                    <span>{devis.telephone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#707974]" />
                    <span className="truncate">{devis.email}</span>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-[#D9E2EC] flex flex-wrap items-center justify-between gap-2 text-xs">
                {/* Status selector */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-[#707974] font-medium font-mono uppercase">Statut :</span>
                  <select
                    value={devis.statut}
                    onChange={(e) => updateDevisStatut(devis.id, e.target.value as StatutDevis)}
                    className="px-2.5 py-1 rounded-lg border border-[#C3CEDA] text-xs bg-[#F7F9FC] text-[#131b2e] font-bold focus:outline-none focus:border-[#14456F] font-mono"
                  >
                    <option value="nouveau">Nouveau</option>
                    <option value="contacte">Contacté</option>
                    <option value="signe">Signé</option>
                    <option value="archive">Archivé</option>
                  </select>
                </div>

                {/* WhatsApp & Email direct action */}
                <div className="flex items-center gap-2 font-mono">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#14456F] hover:bg-[#0B2A4A] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-white" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${devis.email}?subject=AgenceOS%20-%20Votre%20demande%20de%20devis`}
                    className="px-3 py-1.5 rounded-lg bg-[#F7F9FC] hover:bg-[#E1EAF2] text-[#0B2A4A] border border-[#C3CEDA] font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
