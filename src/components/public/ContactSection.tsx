import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  Building2, 
  FileText,
  ChevronDown,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { setIsQuoteModalOpen, submitDemandeDevis } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [formData, setFormData] = useState({
    nom: '',
    fonction: '',
    entite: '',
    email: '',
    telephone: '',
    objet: 'Développement Web & Plateformes Métier',
    message: '',
    consentementCil: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nom || !formData.email || !formData.message) return;

    submitDemandeDevis({
      clientNom: formData.nom,
      entreprise: `${formData.entite || 'Particulier'} (${formData.fonction || 'Non précisé'})`,
      email: formData.email,
      telephone: formData.telephone || '+226 (Non renseigné)',
      ville: 'Ouagadougou',
      typeOffre: formData.objet.includes('Boost') ? 'boost_digital' : 'digitalisation_az',
      servicesRequis: [formData.objet],
      budgetEstime: 'À cadrer selon cahier des charges',
      descriptionProjet: formData.message,
    });

    setSubmitted(true);
  };

  const faqItems = [
    {
      q: "Quels sont les délais habituels d'instruction et de cadrage ?",
      a: "Toute sollicitation adressée via ce bordereau officiel fait l'objet d'un accusé de réception immédiat et d'un premier échange de cadrage technique sous 24 à 48 heures ouvrées par la Direction Technique."
    },
    {
      q: "Quelles sont les modalités de contractualisation proposées ?",
      a: "Nous intervenons sous deux formules juridiques : soit au forfait ferme avec jalons de livraison datés et pénalités de retard, soit en régie mensuelle agile pour l'accompagnement continu (Boost Digital)."
    },
    {
      q: "Comment sont protégées nos données et secrets d'affaires (NDA) ?",
      a: "Préalablement à tout échange de données sensibles ou d'accès à vos systèmes existants, nous soumettons un Accord de Confidentialité bilatéral (NDA) régi par le droit commercial burkinabè."
    },
    {
      q: "Vos architectures logicielles sont-elles conformes à la loi CIL du Burkina Faso ?",
      a: "Absolument. Toutes nos bases de données, flux de paiement Mobile Money et mécanismes d'authentification sont audités pour respecter scrupuleusement la loi N°001-2021/AN relative à la protection des données à caractère personnel."
    }
  ];

  return (
    <section id="contact-section" className="py-20 bg-[#faf8ff] text-[#131b2e] border-t border-[#e2e7ff]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Header Breadcrumb & Title (Stitch Mockup 4 style) */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaedff] text-[#003629] text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-[#c0c9c3]/50">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>DIRECTION GÉNÉRALE DES SERVICES NUMÉRIQUES • BF</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#003629] tracking-tight mb-3">
            Prendre Contact avec l'Agence
          </h1>
          <p className="text-[#545f73] text-sm sm:text-base leading-relaxed">
            Pour les demandes institutionnelles, projets de transformation numérique, appels d'offres ou partenariats au Burkina Faso et dans la zone UEMOA.
          </p>
        </div>

        {/* 2 Columns: Bordereau de Liaison & Standard Direction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* Left Column (7 cols): Bordereau de Liaison */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#e2e7ff] p-6 sm:p-8 shadow-xs">
            <div className="border-b border-[#e2e7ff] pb-4 mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-[#1b4d3e] font-bold">
                BORDEREAU DE LIAISON & DEMANDE D'ENTRETIEN
              </span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#003629] mt-1">
                Formulaire officiel de transmission directe
              </h2>
              <p className="text-xs text-[#545f73] mt-1">
                Votre demande sera traitée en priorité par le Directeur Technique Fondateur.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#baeed9] text-[#003629] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#003629]">
                  Demande transmise avec succès
                </h3>
                <p className="text-xs sm:text-sm text-[#545f73] max-w-md mx-auto leading-relaxed">
                  Merci <strong className="text-[#131b2e]">{formData.nom}</strong>. Votre message a été enregistré sous référence officielle. Notre direction prendra attache avec vous sous 24h ouvrées.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        nom: '',
                        fonction: '',
                        entite: '',
                        email: '',
                        telephone: '',
                        objet: 'Développement Web & Plateformes Métier',
                        message: '',
                        consentementCil: true,
                      });
                    }}
                    className="px-5 py-2.5 bg-[#f2f3ff] hover:bg-[#eaedff] text-[#003629] text-xs font-bold rounded-lg border border-[#c0c9c3] transition-colors cursor-pointer"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-nom" className="block text-xs font-bold text-[#131b2e] mb-1">
                      Nom & Prénom(s) *
                    </label>
                    <input
                      id="contact-nom"
                      type="text"
                      required
                      placeholder="Ex: Seydou Traoré"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-[#131b2e] mb-1">
                      Email professionnel *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="Ex: s.traore@entreprise.bf"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-entite" className="block text-xs font-bold text-[#131b2e] mb-1">
                      Entreprise / Organisation / Institution
                    </label>
                    <input
                      id="contact-entite"
                      type="text"
                      placeholder="Ex: Société Sahélienne de Commerce"
                      value={formData.entite}
                      onChange={(e) => setFormData({ ...formData, entite: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-tel" className="block text-xs font-bold text-[#131b2e] mb-1">
                      Téléphone / WhatsApp Pro *
                    </label>
                    <input
                      id="contact-tel"
                      type="tel"
                      required
                      placeholder="+226 70 00 00 00"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:bg-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-objet" className="block text-xs font-bold text-[#131b2e] mb-1">
                    Objet de la démarche
                  </label>
                  <select
                    id="contact-objet"
                    value={formData.objet}
                    onChange={(e) => setFormData({ ...formData, objet: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] focus:outline-none focus:border-[#1b4d3e] focus:bg-white"
                  >
                    <option value="Offre A : Digitalisation Complète A à Z">Offre A : Digitalisation Complète (Fondation A à Z)</option>
                    <option value="Offre B : Boost Digital & Performance">Offre B : Boost Digital (Accompagnement & Réseaux)</option>
                    <option value="Développement Web & Plateformes Métier">Développement Web & Plateformes Métier</option>
                    <option value="Applications Mobiles Utilitaires">Applications Mobiles Utilitaires</option>
                    <option value="Identité de marque & Design System">Identité de marque & Design System</option>
                    <option value="Partenariat institutionnel / Autre">Partenariat institutionnel / Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-msg" className="block text-xs font-bold text-[#131b2e] mb-1">
                    Message / Spécifications sommaires du besoin *
                  </label>
                  <textarea
                    id="contact-msg"
                    required
                    rows={4}
                    placeholder="Précisez votre activité, vos objectifs, les contraintes éventuelles ou votre calendrier souhaité..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c0c9c3] bg-[#faf8ff] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#1b4d3e] focus:bg-white"
                  />
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    id="contact-cil"
                    type="checkbox"
                    checked={formData.consentementCil}
                    onChange={(e) => setFormData({ ...formData, consentementCil: e.target.checked })}
                    className="mt-0.5 rounded border-[#c0c9c3] text-[#1b4d3e] focus:ring-[#1b4d3e]"
                  />
                  <label htmlFor="contact-cil" className="text-[11px] text-[#545f73] leading-relaxed">
                    J'autorise AgenceOS à traiter ces données conformément aux dispositions de la loi N°001-2021/AN du Burkina Faso relative à la protection des données personnelles (CIL).
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-[#1b4d3e] hover:bg-[#003629] text-white text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmettre le bordereau de liaison</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column (5 cols): Siège Opérationnel & Standard Direction */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-2xl border border-[#e2e7ff] p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#1b4d3e] font-bold">
                  STANDARD INSTITUTIONNEL
                </span>
                <h3 className="font-display font-bold text-lg text-[#003629] mt-1">
                  Siège Opérationnel & Coordonnées
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#131b2e]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f2f3ff] text-[#003629] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#003629]">Adresse Postale & Bureaux</h4>
                    <p className="text-xs text-[#545f73] mt-0.5">
                      Avenue Pascal Zagré, Zone 2000, Ouagadougou, Burkina Faso
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f2f3ff] text-[#003629] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#003629]">Permanence Opérationnelle</h4>
                    <p className="text-xs text-[#545f73] mt-0.5">
                      Lundi au Vendredi : 08h00 – 17h30 GMT
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f2f3ff] text-[#003629] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#003629]">Téléphone & WhatsApp</h4>
                    <p className="text-xs font-mono text-[#545f73] mt-0.5">
                      +226 25 30 00 00 / WhatsApp : +226 70 00 00 00
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f2f3ff] text-[#003629] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#003629]">Courriels Officiels</h4>
                    <p className="text-xs font-mono text-[#545f73] mt-0.5">
                      contact@agenceos.bf · direction@agenceos.bf
                    </p>
                  </div>
                </div>
              </div>

              {/* Mentions Légales & Immatriculation */}
              <div className="pt-4 border-t border-[#e2e7ff] text-xs text-[#545f73] space-y-1">
                <p className="font-mono text-[11px]">
                  <strong>IFU :</strong> 00123456A · <strong>RCCM :</strong> BF-OUA-01-2024-B12-00432
                </p>
                <p className="text-[11px]">
                  Société enregistrée sous l'égide de la Chambre de Commerce et d'Industrie du Burkina Faso (CCI-BF).
                </p>
              </div>
            </div>

            {/* Quick Quote Banner */}
            <div className="bg-[#003629] text-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-[#baeed9]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#baeed9]">
                  CONFIGURATEUR DE DEVIS
                </span>
              </div>
              <h4 className="font-display font-bold text-base text-white mb-2">
                Vous préférez chiffrer vos fonctionnalités ?
              </h4>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                Utilisez notre simulateur interactif pour sélectionner vos modules et obtenir une estimation budgétaire en Francs CFA (XOF).
              </p>
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full py-2.5 px-4 bg-[#baeed9] hover:bg-[#9ed1bd] text-[#002117] text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ouvrir le configurateur de devis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

        {/* Section FAQ Institutionnelle (Stitch Mockup 4 style) */}
        <div className="bg-white rounded-2xl border border-[#e2e7ff] p-6 sm:p-10 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="font-mono text-xs uppercase tracking-wider text-[#1b4d3e] font-bold">
              QUESTIONS FRÉQUEMMENT POSÉES
            </span>
            <h3 className="font-display font-bold text-2xl text-[#003629] mt-1">
              Foire aux questions institutionnelle
            </h3>
            <p className="text-xs sm:text-sm text-[#545f73] mt-1">
              Éléments de réponse sur notre gouvernance, la souveraineté des données et nos engagements.
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-xl border border-[#e2e7ff] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 bg-[#faf8ff] hover:bg-[#f2f3ff] transition-colors cursor-pointer"
                  >
                    <span className="font-display font-bold text-sm sm:text-base text-[#003629]">
                      {item.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#545f73] shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#003629]' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 bg-white border-t border-[#e2e7ff] text-xs sm:text-sm text-[#545f73] leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
