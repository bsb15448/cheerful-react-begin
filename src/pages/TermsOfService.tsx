
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';

const TermsOfService = () => {
  const navigate = useNavigate();
  useVisitorTracking('/terms-of-service');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 font-baloo">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 text-center">
            CONDITIONS DE SERVICE – MYLITTLEHERO
          </h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-sm text-slate-600 mb-8">
              <strong>Date de dernière mise à jour :</strong> 16 février 2025
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">1. Introduction</h2>
                <p className="text-slate-700 leading-relaxed">
                  Les présentes Conditions de Service (ci-après « Conditions ») régissent l'accès et l'utilisation du site internet <strong>mylittlehero.co</strong> ainsi que des services proposés par <strong>MyLittleHero</strong> (ci-après « le Service », « nous » ou « notre »). En accédant et en utilisant le Service, vous acceptez expressément de respecter l'ensemble des termes de ces Conditions. Si vous n'acceptez pas ces Conditions, vous ne devez pas utiliser le Service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">2. Objet</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Les présentes Conditions ont pour objet de définir les droits et obligations des utilisateurs dans le cadre de l'accès et de l'utilisation du Service, notamment en ce qui concerne :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>L'accès au site et aux fonctionnalités mises à disposition,</li>
                  <li>La gestion de votre compte utilisateur,</li>
                  <li>L'utilisation des contenus,</li>
                  <li>La protection de la propriété intellectuelle,</li>
                  <li>Les limitations de responsabilité.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">3. Acceptation des Conditions</h2>
                <p className="text-slate-700 leading-relaxed">
                  En utilisant le Service, vous déclarez avoir pris connaissance des présentes Conditions et vous engagez à les respecter intégralement. Nous nous réservons le droit de modifier ou de mettre à jour ces Conditions à tout moment et sans préavis. Les modifications prendront effet dès leur publication sur le site. Votre utilisation continue du Service après toute modification vaudra acceptation des Conditions mises à jour.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">4. Accès au Service</h2>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">4.1. Disponibilité</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Le Service est accessible en ligne 24 heures sur 24 et 7 jours sur 7, sauf en cas de maintenance programmée ou de force majeure.
                </p>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">4.2. Interruption</h3>
                <p className="text-slate-700 leading-relaxed">
                  Nous nous réservons le droit de modifier, suspendre ou interrompre tout ou partie du Service à tout moment, sans préavis, pour des raisons techniques ou opérationnelles.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">5. Utilisation du Site</h2>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">5.1. Usage licite</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Vous vous engagez à utiliser le Service de manière conforme aux lois et règlements en vigueur ainsi qu'aux présentes Conditions.
                </p>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">5.2. Restrictions</h3>
                <p className="text-slate-700 leading-relaxed mb-4">Il vous est interdit de :</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Reproduire, copier, distribuer ou modifier, même partiellement, le contenu du site sans autorisation écrite préalable,</li>
                  <li>Utiliser le Service à des fins illicites, frauduleuses ou nuisibles,</li>
                  <li>Tenter d'accéder de manière non autorisée à tout ou partie du Service (par exemple, par des moyens automatiques ou des techniques de hacking).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">6. Compte Utilisateur</h2>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">6.1. Création de compte</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Certaines fonctionnalités du Service peuvent nécessiter la création d'un compte utilisateur. Vous vous engagez à fournir des informations exactes, complètes et à jour lors de votre inscription.
                </p>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">6.2. Sécurité</h3>
                <p className="text-slate-700 leading-relaxed">
                  Vous êtes responsable de la confidentialité de vos identifiants de connexion et de toutes les activités réalisées sous votre compte. En cas de soupçon d'utilisation frauduleuse, vous devez nous en informer immédiatement.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">7. Propriété Intellectuelle</h2>
                <p className="text-slate-700 leading-relaxed">
                  L'ensemble des contenus présents sur <strong>mylittlehero.co</strong>, incluant, sans s'y limiter, les textes, images, illustrations, logos, vidéos, animations et logiciels, est protégé par le droit d'auteur et constitue la propriété exclusive de <strong>MyLittleHero</strong> ou de ses partenaires. Toute reproduction ou représentation totale ou partielle sans autorisation expresse et écrite est strictement interdite.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">8. Responsabilités</h2>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">8.1. Disponibilité et Fiabilité</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Nous mettons tout en œuvre pour assurer la disponibilité et la fiabilité du Service, mais nous ne pouvons garantir qu'il soit exempt d'erreurs, d'interruptions ou de dysfonctionnements.
                </p>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">8.2. Limitation de Responsabilité</h3>
                <p className="text-slate-700 leading-relaxed">
                  En aucun cas, MyLittleHero ne pourra être tenu responsable des dommages directs ou indirects, pertes de données, perte de profits ou tout autre préjudice résultant de l'utilisation ou de l'impossibilité d'utiliser le Service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">9. Modification des Conditions</h2>
                <p className="text-slate-700 leading-relaxed">
                  Nous nous réservons le droit de modifier ou de mettre à jour ces Conditions à tout moment. Les Conditions modifiées seront publiées sur le site et s'appliqueront dès leur mise en ligne. Il vous appartient de consulter régulièrement cette page afin de prendre connaissance des éventuelles modifications.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">10. Droit Applicable et Juridiction</h2>
                <p className="text-slate-700 leading-relaxed">
                  Les présentes Conditions sont régies par le droit français. En cas de litige relatif à leur interprétation ou leur exécution, et après une tentative de résolution amiable, seuls les tribunaux français compétents seront habilités à en connaître.
                </p>
              </section>

              <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400 mt-8">
                <h2 className="text-xl font-bold text-slate-800 mb-4">11. Contact</h2>
                <p className="text-slate-700 leading-relaxed">
                  Pour toute question ou demande d'information concernant ces Conditions de Service, vous pouvez nous contacter à l'adresse suivante :
                  <br />
                  <a href="mailto:Mylittleheroteam@gmail.com" className="text-orange-600 hover:text-orange-700 underline font-semibold">
                    Mylittleheroteam@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
