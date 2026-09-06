import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  Eye, 
  Server, 
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Calendar
} from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { setPublicView } = useApp();

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#131b2e] pt-28 pb-20 font-sans">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb & Return */}
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

        {/* Header Title */}
        <div className="bg-white rounded-2xl border border-[#D9E2EC] p-8 sm:p-10 mb-8 shadow-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E1EAF2] text-[#0B2A4A] text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-[#C3CEDA]/50">
            <ShieldCheck className="w-3.5 h-3.5 text-[#14456F]" />
            <span>CONFORMITÉ RÉGLEMENTAIRE BURKINA FASO · CIL</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#0B2A4A] tracking-tight mb-3">
            Politique de Confidentialité & Mentions Légales
          </h1>
          <p className="text-sm text-[#545f73] leading-relaxed">
            Gabarit officiel régissant la collecte, le traitement et la conservation des données pour les clients, partenaires et candidats de l'agence AgenceOS au Burkina Faso.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-[#D9E2EC] text-xs text-[#545f73] font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#14456F]" />
              <span>Dernière mise à jour : 01 Septembre 2025</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#14456F]" />
              <span>Ouagadougou & Bobo-Dioulasso, BF</span>
            </span>
          </div>
        </div>

        {/* Policy Content Sections */}
        <div className="bg-white rounded-2xl border border-[#D9E2EC] p-8 sm:p-10 shadow-xs space-y-10 text-xs sm:text-sm text-[#404945] leading-relaxed">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-base font-bold text-[#0B2A4A] font-display">
              <FileText className="w-5 h-5 text-[#14456F]" />
              <h2>1. Préambule et Cadre Légal</h2>
            </div>
            <p>
              AgenceOS est une agence de transformation et d'ingénierie numérique exerçant au Burkina Faso. La protection de votre vie privée et de vos données professionnelles constitue une priorité absolue.
            </p>
            <p>
              Le présent document est établi en conformité stricte avec la <strong>Loi N°001-2021/AN portant protection des personnes à l'égard du traitement des données à caractère personnel</strong> au Burkina Faso, sous la tutelle de la Commission de l'Informatique et des Libertés (CIL).
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-6 border-t border-[#D9E2EC]">
            <div className="flex items-center gap-2.5 text-base font-bold text-[#0B2A4A] font-display">
              <Eye className="w-5 h-5 text-[#14456F]" />
              <h2>2. Données Collectées & Finalités</h2>
            </div>
            <p>
              Dans le cadre de ses activités, AgenceOS recueille uniquement les données strictement nécessaires aux finalités suivantes :
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Demandes de devis et projets clients :</strong> Nom, prénom, entreprise, adresse email, contact téléphonique / WhatsApp, descriptif du besoin et budget estimé, aux fins d’établissement de propositions commerciales et d’échanges de cadrage technique.
              </li>
              <li>
                <strong>Recrutement de collaborateurs et candidats :</strong> Identité, coordonnées, ville de résidence, parcours professionnel, liens de portfolio/dépôts et réponses aux épreuves techniques scellées, aux fins d'évaluation des aptitudes opérationnelles.
              </li>
              <li>
                <strong>Support & assistance technique :</strong> Coordonnées du contact demandeur, historique des échanges et diagnostics nécessaires à la résolution d'incidents techniques.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-6 border-t border-[#D9E2EC]">
            <div className="flex items-center gap-2.5 text-base font-bold text-[#0B2A4A] font-display">
              <Lock className="w-5 h-5 text-[#14456F]" />
              <h2>3. Confidentialité des Livrables Techniques & Propriété Intellectuelle</h2>
            </div>
            <p>
              Les travaux réalisés dans le cadre des épreuves de recrutement sont utilisés exclusivement pour la notation et ne font l'objet d'aucune exploitation commerciale par l'agence sans accord contractuel préalable.
            </p>
            <p>
              Pour les clients sous contrat, les cahiers des charges, architectures logicielles, codes sources et stratégies de diffusion bénéficient d'un Accord de Non-Divulgation (NDA) bilatéral conforme au droit commercial burkinabè et aux usages OHADA.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-6 border-t border-[#D9E2EC]">
            <div className="flex items-center gap-2.5 text-base font-bold text-[#0B2A4A] font-display">
              <Server className="w-5 h-5 text-[#14456F]" />
              <h2>4. Sécurité & Conservation des Données</h2>
            </div>
            <p>
              Toutes les données transitent via des canaux sécurisés chiffrés (TLS 1.3 / SSL) et sont hébergées sur des infrastructures résilientes dotées de pare-feu et de sauvegardes quotidiennes.
            </p>
            <p>
              Les données des prospects sans suite sont archivées ou supprimées au terme d’une durée de 24 mois. Les données des candidats non retenus sont conservées un maximum de 12 mois pour d'éventuelles sessions ultérieures, sauf demande expresse de suppression.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-6 border-t border-[#D9E2EC]">
            <div className="flex items-center gap-2.5 text-base font-bold text-[#0B2A4A] font-display">
              <ShieldCheck className="w-5 h-5 text-[#14456F]" />
              <h2>5. Vos Droits & Exercice auprès de la Direction</h2>
            </div>
            <p>
              Conformément à la réglementation CIL en vigueur, vous disposez d'un droit d'accès, de rectification, de limitation et de suppression de vos données personnelles.
            </p>
            <p>
              Pour exercer vos droits ou pour toute interrogation relative au traitement de vos informations :
            </p>
            <div className="p-4 rounded-xl bg-[#F7F9FC] border border-[#D9E2EC] space-y-1.5 text-xs font-mono">
              <div className="flex items-center gap-2 text-[#0B2A4A] font-bold">
                <Mail className="w-4 h-4 text-[#14456F]" />
                <span>Courriel : contact@agenceos.bf / dpo@agenceos.bf</span>
              </div>
              <div className="flex items-center gap-2 text-[#0B2A4A] font-bold">
                <Phone className="w-4 h-4 text-[#14456F]" />
                <span>Téléphone / WhatsApp : +226 55 30 08 68</span>
              </div>
              <div className="text-[#545f73] pt-1">
                Adresse : Avenue Pascal Zagré, Zone 2000, Ouagadougou, Burkina Faso
              </div>
            </div>
          </section>

          {/* Section 6 - Note Directeur */}
          <section className="p-4 rounded-xl bg-[#E1EAF2] border border-[#14456F]/20 text-xs text-[#0B2A4A]">
            <p className="font-bold mb-1">Note de la Direction :</p>
            <p className="text-[#545f73]">
              Ce gabarit juridique initial a été rédigé pour le lancement MVP d'AgenceOS. Il sera complété et adapté avec les mentions formelles définitives dès l'inauguration des locaux physiques de l'agence.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
