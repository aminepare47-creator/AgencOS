import React from 'react';
import {
  BadgeCheck,
  CalendarDays,
  Mail,
  Phone,
  MapPin,
  Briefcase,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { fmtDate } from './TacheCard';

/* Carte de membre numérique : numéro unique + QR code */
export const MemberCard: React.FC = () => {
  const { currentCollaborateur, postes } = useApp();
  if (!currentCollaborateur) return null;
  const poste = postes.find(p => p.id === currentCollaborateur.posteId);

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#0B2A4A] to-[#14456F] text-white p-6 shadow-lg relative overflow-hidden">
      <div className="absolute -right-14 -top-14 w-52 h-52 rounded-full bg-[#C9DFF2]/10 blur-2xl pointer-events-none" />
      <div className="flex items-start justify-between gap-4 relative z-10">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#C9DFF2] mb-2">
            Membre officiel · AgenceOS Burkina Faso
          </p>
          <h3 className="font-display font-bold text-xl">{currentCollaborateur.nom}</h3>
          <p className="text-xs text-white/70 mt-0.5">{poste?.nom || 'Collaborateur'}</p>
          <p className="mt-4 text-xs font-mono font-bold tracking-wider text-[#C9DFF2]">
            {currentCollaborateur.numeroMembre}
          </p>
          <p className="text-[10px] text-white/50 mt-1">Membre depuis le {fmtDate(currentCollaborateur.dateEntree)}</p>
        </div>
        <div className="shrink-0 bg-white p-2 rounded-lg shadow-sm">
          {currentCollaborateur.qrCodeData ? (
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(currentCollaborateur.qrCodeData)}`}
              alt="QR code carte de membre"
              width={96}
              height={96}
              className="block"
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center text-[#0B2A4A] text-xs">QR</div>
          )}
        </div>
      </div>
      <div className="mt-4 relative z-10 inline-flex items-center gap-1.5 text-[10px] text-white/60 bg-white/10 border border-white/15 rounded-full px-3 py-1">
        <BadgeCheck className="w-3.5 h-3.5 text-[#C9DFF2]" />
        Identité numérique vérifiée par le Directeur
      </div>
    </div>
  );
};

/* Onglet Profil */
export const ProfilTab: React.FC = () => {
  const { currentCollaborateur, postes } = useApp();
  if (!currentCollaborateur) return null;
  const poste = postes.find(p => p.id === currentCollaborateur.posteId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <MemberCard />
      <div className="rounded-xl bg-white border border-[#D9E2EC] p-6">
        <h3 className="font-display font-bold text-base text-[#0B2A4A] mb-4">Informations personnelles</h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-3 text-[#545f73]">
            <Briefcase className="w-4 h-4 text-[#14456F]" />
            {poste?.nom}{currentCollaborateur.specialite ? ` · ${currentCollaborateur.specialite}` : ''}
          </li>
          <li className="flex items-center gap-3 text-[#545f73]">
            <Mail className="w-4 h-4 text-[#14456F]" /> {currentCollaborateur.email}
          </li>
          <li className="flex items-center gap-3 text-[#545f73]">
            <Phone className="w-4 h-4 text-[#14456F]" /> {currentCollaborateur.telephone}
          </li>
          <li className="flex items-center gap-3 text-[#545f73]">
            <MapPin className="w-4 h-4 text-[#14456F]" /> {currentCollaborateur.ville}
          </li>
          <li className="flex items-center gap-3 text-[#545f73]">
            <CalendarDays className="w-4 h-4 text-[#14456F]" />
            Entré(e) le {fmtDate(currentCollaborateur.dateEntree)}
            {currentCollaborateur.ajouteManuellement && ' (ajout direct par le Directeur)'}
          </li>
          <li className="flex items-center gap-3">
            <span
              className={`text-[11px] px-2.5 py-1 rounded-full border font-semibold ${
                currentCollaborateur.statut === 'actif'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              Statut : {currentCollaborateur.statut}
            </span>
          </li>
        </ul>
        <p className="mt-5 text-[11px] text-[#545f73] border-t border-[#D9E2EC] pt-4">
          Numéro de membre : <span className="font-mono font-bold text-[#14456F]">{currentCollaborateur.numeroMembre}</span>
          <br />
          Votre QR code identifie votre carte de membre numérique auprès de l'agence. L'espace communautaire de groupe sera disponible dans une prochaine version.
        </p>
      </div>
    </div>
  );
};
