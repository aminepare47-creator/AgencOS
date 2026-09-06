import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LifeBuoy, 
  Phone, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  Send, 
  AlertCircle, 
  ArrowLeft, 
  ShieldCheck, 
  Server, 
  ExternalLink,
  HelpCircle
} from 'lucide-react';

export const SupportPage: React.FC = () => {
  const { setPublicView } = useApp();
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketRef, setTicketRef] = useState('');

  const [form, setForm] = useState({
    nom: '',
    email: '',
    telephone: '',
    organisation: '',
    priorite: 'normale' as 'basse' | 'normale' | 'urgente',
    poleConcerne: 'dev_sur_mesure',
    sujet: '',
    description: '',
  });

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom || !form.email || !form.description) return;

    const ref = `TK-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketRef(ref);
    setTicketSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#131b2e] pt-28 pb-20 font-sans">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={() => {
              setPublicView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0B2A4A] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l'accueil</span>
          </button>
        </div>

        {/* Hero Support */}
        <div className="bg-white rounded-2xl border border-[#D9E2EC] p-8 sm:p-10 mb-8 shadow-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E1EAF2] text-[#0B2A4A] text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-[#C3CEDA]/50">
            <LifeBuoy className="w-3.5 h-3.5 text-[#14456F]" />
            <span>PORTAIL D'ASSISTANCE & SUPPORT TECHNIQUE</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#0B2A4A] tracking-tight mb-3">
            Centre d’Assistance & Support Client
          </h1>
          <p className="text-sm text-[#545f73] max-w-2xl leading-relaxed">
            Notre équipe technique et nos développeurs assurent la continuité de vos plateformes, boutiques e-commerce et présences digitales au Burkina Faso et en Afrique de l'Ouest.
          </p>

          {/* Prominent Temporary Contact Box (mandated by specs) */}
          <div className="mt-6 p-5 rounded-xl bg-[#0B2A4A] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#C9DFF2] font-bold block">
                LIGNE DIRECTE DE PERMANENCE (NUMÉRO OFFICIEL TEMPORAIRE)
              </span>
              <div className="text-2xl font-bold font-mono tracking-tight text-white mt-0.5">
                +226 55 30 08 68
              </div>
              <p className="text-xs text-white/80 mt-1">
                Ligne d’appel d’urgence et permanence WhatsApp active 5j/7 de 08h00 à 17h30 GMT.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="https://wa.me/22655300868"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-lg bg-[#C9DFF2] hover:bg-[#a6e6cb] text-[#071A2E] font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#0B2A4A]" />
                <span>Ouvrir WhatsApp</span>
              </a>
              <a
                href="tel:+22655300868"
                className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Appeler</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3 Status & SLA Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          
          <div className="bg-white rounded-2xl border border-[#D9E2EC] p-6 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#EEF3F8] text-[#0B2A4A] flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B2A4A] mb-1">
              Plages de Disponibilité
            </h3>
            <p className="text-xs text-[#545f73] leading-relaxed">
              Du Lundi au Vendredi : <strong>08h00 – 17h30 GMT</strong>. Astreinte critique pour les pannes bloquantes 7j/7 pour les clients sous contrat de maintenance.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#D9E2EC] p-6 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#EEF3F8] text-[#0B2A4A] flex items-center justify-center mb-4">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B2A4A] mb-1">
              Statut des Systèmes
            </h3>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-emerald-800">100% Opérationnel</span>
            </div>
            <p className="text-xs text-[#545f73] leading-relaxed">
              Infrastructures DNS, serveurs d’hébergement, bases de données et passerelles Mobile Money fonctionnelles.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#D9E2EC] p-6 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#EEF3F8] text-[#0B2A4A] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-[#0B2A4A] mb-1">
              Garantie d'Intervention
            </h3>
            <p className="text-xs text-[#545f73] leading-relaxed">
              Prise en charge sous <strong>2 heures ouvrées</strong> pour les incidents de production et sous <strong>24 heures</strong> pour les évolutions mineures.
            </p>
          </div>

        </div>

        {/* Ticket Form or Confirmation */}
        <div className="bg-white rounded-2xl border border-[#D9E2EC] p-8 sm:p-10 shadow-xs">
          
          {ticketSubmitted ? (
            <div className="py-8 text-center max-w-lg mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#C9DFF2] text-[#0B2A4A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B2A4A] bg-[#E1EAF2] px-3 py-1 rounded-full">
                TICKET ENREGISTRÉ · RÉF {ticketRef}
              </span>
              <h2 className="font-display font-bold text-2xl text-[#0B2A4A]">
                Demande d'intervention reçue !
              </h2>
              <p className="text-xs sm:text-sm text-[#545f73] leading-relaxed">
                Notre équipe technique a bien reçu votre signalement concernant <strong className="text-[#131b2e]">{form.sujet || 'votre requête'}</strong>. Un ingénieur prendra attache avec vous sur le numéro <strong className="text-[#0B2A4A]">{form.telephone}</strong>.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setTicketSubmitted(false);
                    setForm({
                      nom: '',
                      email: '',
                      telephone: '',
                      organisation: '',
                      priorite: 'normale',
                      poleConcerne: 'dev_sur_mesure',
                      sujet: '',
                      description: '',
                    });
                  }}
                  className="px-6 py-2.5 rounded-lg bg-[#14456F] hover:bg-[#0B2A4A] text-white font-bold text-xs cursor-pointer shadow-sm transition-colors"
                >
                  Soumettre un autre ticket
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="space-y-6">
              
              <div>
                <h3 className="font-display font-bold text-xl text-[#0B2A4A]">
                  Ouvrir un ticket d’assistance technique
                </h3>
                <p className="text-xs text-[#545f73] mt-1">
                  Remplissez ce formulaire pour notifier directement nos développeurs d'un besoin de support ou d'un incident.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    Votre Nom Complet *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Moussa Ouédraogo"
                    value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] focus:outline-none focus:border-[#14456F] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    Email professionnel *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="moussa@entreprise.bf"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] focus:outline-none focus:border-[#14456F] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    Téléphone / WhatsApp direct *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+226 70 00 00 00"
                    value={form.telephone}
                    onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] focus:outline-none focus:border-[#14456F] focus:bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    Entreprise / Organisation
                  </label>
                  <input
                    type="text"
                    placeholder="Nom de votre structure"
                    value={form.organisation}
                    onChange={(e) => setForm({ ...form, organisation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] focus:outline-none focus:border-[#14456F] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    Pôle de service concerné
                  </label>
                  <select
                    value={form.poleConcerne}
                    onChange={(e) => setForm({ ...form, poleConcerne: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] focus:outline-none focus:border-[#14456F] focus:bg-white"
                  >
                    <option value="fondation_deploiement">Pôle 1 : Fondation et déploiement (site vitrine, DNS, emails)</option>
                    <option value="accompagnement_boutique">Pôle 2 : Accompagnement & boutique e-commerce (paiements, stock)</option>
                    <option value="dev_sur_mesure">Pôle 3 : Développement web & mobile sur mesure (bug applicatif, API)</option>
                    <option value="identite_reseaux">Pôle 4 : Identité digitale & Réseaux sociaux (contenus, accès)</option>
                    <option value="autre">Autre demande technique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    Niveau d'urgence
                  </label>
                  <select
                    value={form.priorite}
                    onChange={(e) => setForm({ ...form, priorite: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] focus:outline-none focus:border-[#14456F] focus:bg-white"
                  >
                    <option value="basse">Basse (Question générale, amélioration)</option>
                    <option value="normale">Normale (Dysfonctionnement partiel)</option>
                    <option value="urgente">Urgente (Plateforme indisponible, panne de vente)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Objet de la demande *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Problème d'encaissement Mobile Money ou mise à jour contenu"
                  value={form.sujet}
                  onChange={(e) => setForm({ ...form, sujet: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] focus:outline-none focus:border-[#14456F] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Description détaillée de la situation *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Décrivez les symptômes observés, les pages concernées ou les messages d'erreur rencontrés..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] focus:outline-none focus:border-[#14456F] focus:bg-white"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#D9E2EC]">
                <span className="text-xs text-[#545f73]">
                  Numéro direct d'astreinte : <strong className="text-[#0B2A4A] font-mono">+226 55 30 08 68</strong>
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#14456F] hover:bg-[#0B2A4A] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmettre le ticket au support</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
