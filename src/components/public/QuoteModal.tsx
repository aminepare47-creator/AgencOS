import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Sparkles, 
  Check, 
  Send, 
  CheckCircle2, 
  Building2, 
  Phone, 
  Mail, 
  MapPin,
  FileText
} from 'lucide-react';

export const QuoteModal: React.FC = () => {
  const { isQuoteModalOpen, setIsQuoteModalOpen, submitDemandeDevis } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [newQuoteId, setNewQuoteId] = useState('');

  const [form, setForm] = useState({
    clientNom: '',
    entreprise: '',
    email: '',
    telephone: '',
    ville: 'Ouagadougou',
    typeOffre: 'digitalisation_az' as 'digitalisation_az' | 'boost_digital' | 'sur_mesure',
    servicesRequis: ['Identité visuelle (Logo & Charte)', 'Site web responsive'],
    budgetEstime: '400 000 - 750 000 FCFA',
    descriptionProjet: '',
  });

  if (!isQuoteModalOpen) return null;

  const toggleService = (service: string) => {
    setForm(prev => {
      const exists = prev.servicesRequis.includes(service);
      return {
        ...prev,
        servicesRequis: exists 
          ? prev.servicesRequis.filter(s => s !== service)
          : [...prev.servicesRequis, service]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientNom || !form.email || !form.descriptionProjet) return;

    const created = submitDemandeDevis({
      clientNom: form.clientNom,
      entreprise: form.entreprise || 'Entreprise en création',
      email: form.email,
      telephone: form.telephone || '+226 (Non précisé)',
      ville: form.ville,
      typeOffre: form.typeOffre,
      servicesRequis: form.servicesRequis.length > 0 ? form.servicesRequis : ['Pack Digitalisation Générale'],
      budgetEstime: form.budgetEstime,
      descriptionProjet: form.descriptionProjet,
    });

    setNewQuoteId(created.id);
    setSubmitted(true);
  };

  const handleClose = () => {
    setIsQuoteModalOpen(false);
    setSubmitted(false);
  };

  const availableServices = [
    'Identité visuelle (Logo & Charte)',
    'Site web responsive mobile-first',
    'Boutique / Catalogue e-commerce',
    'Application web / mobile sur mesure',
    'Community management & Réseaux',
    'Production vidéo & Reels promotionnels',
    'Publicités ciblées (Meta / Google Ads)',
    'Audit & Refonte technique de plateforme'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto font-sans">
      <div className="relative w-full max-w-2xl bg-white text-[#131b2e] rounded-2xl shadow-xl border border-[#D9E2EC] overflow-hidden my-8">
        
        {/* Header modal */}
        <div className="bg-[#0B2A4A] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C9DFF2]/20 text-[#C9DFF2] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-white">
                Simulateur de Devis & Estimation de Projet
              </h3>
              <p className="text-[11px] text-white/70">
                AgenceOS · Tarifs transparents en Francs CFA (Burkina Faso)
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#C9DFF2] text-[#0B2A4A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-display font-bold text-[#0B2A4A]">
                Demande de devis enregistrée !
              </h4>
              <p className="text-xs sm:text-sm text-[#545f73] max-w-md mx-auto leading-relaxed">
                Votre projet pour <strong className="text-[#131b2e]">{form.entreprise || form.clientNom}</strong> a été indexé sous la référence <code className="bg-[#E1EAF2] px-2 py-0.5 rounded font-mono text-[#0B2A4A] font-bold border border-[#C3CEDA]/50">{newQuoteId}</code>. Notre direction technique analyse votre cahier des charges et prendra contact avec vous.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-lg bg-[#14456F] hover:bg-[#0B2A4A] text-white font-bold text-xs cursor-pointer shadow-sm transition-colors"
                >
                  Fermer la fenêtre
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Type d'offre */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#131b2e] uppercase tracking-wider mb-2">
                  1. Formule principale ciblée
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, typeOffre: 'digitalisation_az' })}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      form.typeOffre === 'digitalisation_az'
                        ? 'border-2 border-[#14456F] bg-[#EEF3F8] text-[#0B2A4A]'
                        : 'border-[#C3CEDA] bg-white hover:bg-[#F7F9FC] text-[#545f73]'
                    }`}
                  >
                    <p className="text-xs font-display font-bold text-[#0B2A4A]">Offre A : A à Z</p>
                    <p className="text-[10px] text-[#545f73] mt-0.5">Fondation numérique complète</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm({ ...form, typeOffre: 'boost_digital' })}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      form.typeOffre === 'boost_digital'
                        ? 'border-2 border-[#14456F] bg-[#EEF3F8] text-[#0B2A4A]'
                        : 'border-[#C3CEDA] bg-white hover:bg-[#F7F9FC] text-[#545f73]'
                    }`}
                  >
                    <p className="text-xs font-display font-bold text-[#0B2A4A]">Offre B : Boost</p>
                    <p className="text-[10px] text-[#545f73] mt-0.5">Régie mensuelle & marketing</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm({ ...form, typeOffre: 'sur_mesure' })}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      form.typeOffre === 'sur_mesure'
                        ? 'border-2 border-[#14456F] bg-[#EEF3F8] text-[#0B2A4A]'
                        : 'border-[#C3CEDA] bg-white hover:bg-[#F7F9FC] text-[#545f73]'
                    }`}
                  >
                    <p className="text-xs font-display font-bold text-[#0B2A4A]">Sur Mesure</p>
                    <p className="text-[10px] text-[#545f73] mt-0.5">Application web/mobile métier</p>
                  </button>
                </div>
              </div>

              {/* Services requis */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#131b2e] uppercase tracking-wider mb-2">
                  2. Modules & prestations souhaités
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {availableServices.map((service) => {
                    const selected = form.servicesRequis.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium border flex items-center justify-between transition-colors text-left cursor-pointer ${
                          selected
                            ? 'bg-[#C9DFF2]/50 text-[#071A2E] border-[#14456F] font-bold'
                            : 'bg-[#F7F9FC] text-[#131b2e] border-[#C3CEDA] hover:bg-white'
                        }`}
                      >
                        <span className="truncate">{service}</span>
                        {selected && <Check className="w-3.5 h-3.5 text-[#0B2A4A] shrink-0 ml-1.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fourchette de budget */}
              <div>
                <label htmlFor="quote-budget" className="block text-xs font-mono font-bold text-[#131b2e] uppercase tracking-wider mb-1.5">
                  3. Enveloppe budgétaire prévisionnelle (en FCFA)
                </label>
                <select
                  id="quote-budget"
                  value={form.budgetEstime}
                  onChange={(e) => setForm({ ...form, budgetEstime: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] text-xs text-[#131b2e] bg-[#F7F9FC] focus:outline-none focus:border-[#14456F] focus:bg-white font-mono"
                >
                  <option value="250 000 - 450 000 FCFA">250 000 - 450 000 FCFA (Lancement léger / Logo + Vitrine)</option>
                  <option value="450 000 - 850 000 FCFA">450 000 - 850 000 FCFA (Pack Digitalisation A à Z standard)</option>
                  <option value="850 000 - 1 500 000 FCFA">850 000 - 1 500 000 FCFA (Pack Pro : Web, Mobile & Réseaux)</option>
                  <option value="1 500 000 - 3 500 000 FCFA">1 500 000 - 3 500 000 FCFA (Plateforme web/mobile sur mesure)</option>
                  <option value="+3 500 000 FCFA">+ 3 500 000 FCFA (Projet d'envergure / Écosystème complet)</option>
                </select>
              </div>

              {/* Vos coordonnées */}
              <div className="space-y-3 pt-2 border-t border-[#D9E2EC]">
                <label className="block text-xs font-mono font-bold text-[#131b2e] uppercase tracking-wider">
                  4. Vos coordonnées de contact
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Votre nom complet *"
                      value={form.clientNom}
                      onChange={(e) => setForm({ ...form, clientNom: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#14456F] focus:bg-white"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Nom de l'entreprise ou marque"
                      value={form.entreprise}
                      onChange={(e) => setForm({ ...form, entreprise: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#14456F] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email de contact *"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#14456F] focus:bg-white"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Téléphone / WhatsApp"
                      value={form.telephone}
                      onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#14456F] focus:bg-white font-mono"
                    />
                  </div>
                  <div>
                    <select
                      value={form.ville}
                      onChange={(e) => setForm({ ...form, ville: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] focus:outline-none focus:border-[#14456F] focus:bg-white"
                    >
                      <option value="Ouagadougou">Ouagadougou</option>
                      <option value="Bobo-Dioulasso">Bobo-Dioulasso</option>
                      <option value="Koudougou">Koudougou</option>
                      <option value="Autre ville BF">Autre ville BF</option>
                      <option value="Diaspora / International">Diaspora</option>
                    </select>
                  </div>
                </div>

                <div>
                  <textarea
                    required
                    rows={3}
                    placeholder="Décrivez brièvement votre projet, vos délais ou vos fonctionnalités spécifiques *"
                    value={form.descriptionProjet}
                    onChange={(e) => setForm({ ...form, descriptionProjet: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#14456F] focus:bg-white"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3 flex items-center justify-between border-t border-[#D9E2EC]">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-semibold text-[#545f73] hover:text-[#131b2e] cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#14456F] hover:bg-[#0B2A4A] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Soumettre ma demande d'estimation</span>
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
