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
    <section id="contact-section" className="py-20 bg-[#F7F9FC] text-[#131b2e] border-t border-[#D9E2EC]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* En-tête de section */}
        <div className="max-w-3xl mb-12">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#C9A227] mb-3">
            Section 03 — Correspondance officielle
          </p>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#0B2A4A] tracking-tight mb-3">
            Saisir la Direction de l'Agence
          </h1>
          <p className="text-[#545f73] text-sm sm:text-base leading-relaxed">
            Pour toute demande institutionnelle, projet de transformation numérique, appel d'offres
            ou partenariat au Burkina Faso et dans la zone UEMOA, utilisez le bordereau ci-dessous :
            il constitue le canal officiel d'entrée de votre demande.
          </p>
        </div>

        {/* 2 Columns: Bordereau de Liaison & Standard Direction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* Left Column (7 cols): Bordereau de Liaison */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#D9E2EC] p-6 sm:p-8 shadow-xs">
            <div className="border-b border-[#D9E2EC] pb-4 mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-[#C9A227] font-bold">
                BORDEREAU DE LIAISON & DEMANDE D'ENTRETIEN
              </span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0B2A4A] mt-1">
                Formulaire officiel de transmission directe
              </h2>
              <p className="text-xs text-[#545f73] mt-1">
                Votre demande sera traitée en priorité par le Directeur Technique Fondateur.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#C9DFF2] text-[#0B2A4A] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#0B2A4A]">
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
                    className="px-5 py-2.5 bg-[#EEF3F8] hover:bg-[#E1EAF2] text-[#0B2A4A] text-xs font-bold rounded-lg border border-[#C3CEDA] transition-colors cursor-pointer"
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
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#14456F] focus:bg-white"
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
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#14456F] focus:bg-white"
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
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#14456F] focus:bg-white"
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
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#14456F] focus:bg-white font-mono"
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
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] focus:outline-none focus:border-[#14456F] focus:bg-white"
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
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#C3CEDA] bg-[#F7F9FC] text-xs text-[#131b2e] placeholder:text-[#707974] focus:outline-none focus:border-[#14456F] focus:bg-white"
                  />
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    id="contact-cil"
                    type="checkbox"
                    checked={formData.consentementCil}
                    onChange={(e) => setFormData({ ...formData, consentementCil: e.target.checked })}
                    className="mt-0.5 rounded border-[#C3CEDA] text-[#14456F] focus:ring-[#14456F]"
                  />
                  <label htmlFor="contact-cil" className="text-[11px] text-[#545f73] leading-relaxed">
                    J'autorise AgenceOS à traiter ces données conformément aux dispositions de la loi N°001-2021/AN du Burkina Faso relative à la protection des données personnelles (CIL).
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-[#14456F] hover:bg-[#0B2A4A] text-white text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
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
            
            <div className="bg-white rounded-2xl border border-[#D9E2EC] p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#C9A227] font-bold">
                  STANDARD INSTITUTIONNEL
                </span>
                <h3 className="font-display font-bold text-lg text-[#0B2A4A] mt-1">
                  Siège Opérationnel & Coordonnées
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#131b2e]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EEF3F8] text-[#0B2A4A] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B2A4A]">Adresse Postale & Bureaux</h4>
                    <p className="text-xs text-[#545f73] mt-0.5">
                      Avenue Pascal Zagré, Zone 2000, Ouagadougou, Burkina Faso
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EEF3F8] text-[#0B2A4A] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B2A4A]">Permanence Opérationnelle</h4>
                    <p className="text-xs text-[#545f73] mt-0.5">
                      Lundi au Vendredi : 08h00 – 17h30 GMT
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EEF3F8] text-[#0B2A4A] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B2A4A]">Téléphone & WhatsApp</h4>
                    <p className="text-xs font-mono text-[#545f73] mt-0.5">
                      +226 25 30 00 00 / WhatsApp : +226 70 00 00 00
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EEF3F8] text-[#0B2A4A] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B2A4A]">Courriels Officiels</h4>
                    <p className="text-xs font-mono text-[#545f73] mt-0.5">
                      contact@agenceos.bf · direction@agenceos.bf
                    </p>
                  </div>
                </div>
              </div>

              {/* Mentions Légales & Immatriculation */}
              <div className="pt-4 border-t border-[#D9E2EC] text-xs text-[#545f73] space-y-1">
                <p className="font-mono text-[11px]">
                  <strong>IFU :</strong> 00123456A · <strong>RCCM :</strong> BF-OUA-01-2024-B12-00432
                </p>
                <p className="text-[11px]">
                  Société enregistrée sous l'égide de la Chambre de Commerce et d'Industrie du Burkina Faso (CCI-BF).
                </p>
              </div>
            </div>

            {/* Option secondaire : configurateur */}
            <div className="border border-[#D9E2EC] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-1.5">
                <FileText className="w-3.5 h-3.5 text-[#C9A227]" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0B2A4A]">
                  Option complémentaire
                </span>
              </div>
              <p className="text-xs text-[#545f73] leading-relaxed mb-3">
                Pour une estimation budgétaire immédiate, le configurateur de devis permet de
                sélectionner vos modules et d'obtenir une estimation en FCFA.
              </p>
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="text-xs font-semibold text-[#14456F] hover:text-[#0B2A4A] underline underline-offset-2 cursor-pointer"
              >
                Ouvrir le configurateur de devis →
              </button>
            </div>

          </div>

        </div>

        {/* Section FAQ Institutionnelle (Stitch Mockup 4 style) */}
        <div className="bg-white rounded-2xl border border-[#D9E2EC] p-6 sm:p-10 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="font-mono text-xs uppercase tracking-wider text-[#C9A227] font-bold">
              QUESTIONS FRÉQUEMMENT POSÉES
            </span>
            <h3 className="font-display font-bold text-2xl text-[#0B2A4A] mt-1">
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
                  className="rounded-xl border border-[#D9E2EC] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 bg-[#F7F9FC] hover:bg-[#EEF3F8] transition-colors cursor-pointer"
                  >
                    <span className="font-display font-bold text-sm sm:text-base text-[#0B2A4A]">
                      {item.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#545f73] shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#0B2A4A]' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 bg-white border-t border-[#D9E2EC] text-xs sm:text-sm text-[#545f73] leading-relaxed">
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
