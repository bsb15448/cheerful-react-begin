
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';

const ConditionsGenerales = () => {
  const navigate = useNavigate();
  useVisitorTracking('/conditions-generales');

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
          <div className="shopify-policy__body">
            <div className="rte">
              <h2><br/></h2>
              <p><strong>CONDITIONS GÉNÉRALES DE VENTE – MYLITTLEHERO</strong></p>
              <p><strong>Préambule</strong><br/>Les présentes Conditions Générales de Vente (ci-après les « CGV ») régissent l'ensemble des ventes conclues entre <strong>MyLittleHero</strong>, (ci-après « l'Éditeur » ou « nous »), et tout client (ci-après « le Client » ou « vous ») passant commande de livres personnalisés pour enfants via le site internet&nbsp;<strong>mylittlehero.co</strong> ou par tout autre moyen commercial.</p>
              <p>En passant commande, le Client déclare avoir pris connaissance des présentes CGV et les accepter sans réserve.</p>
              <hr className="my-4 border-gray-300" />
              <p><strong>1. Objet</strong><br/>Les présentes CGV ont pour objet de définir les modalités de commande, de paiement, de livraison et d'exécution des ventes de livres personnalisés proposés par l'Éditeur. Chaque livre est personnalisé selon les informations communiquées par le Client et validées par ce dernier avant production.</p>
              <hr className="my-4 border-gray-300" />
              <p><strong>2. Champ d'application</strong><br/>Les CGV s'appliquent à toutes les ventes conclues avec le Client, que ce soit via le site <strong>mylittlehero.co</strong> ou par tout autre moyen. Toute commande implique l'adhésion sans réserve du Client aux présentes CGV.</p>
              <hr className="my-4 border-gray-300" />
              <p><strong>3. Commande</strong><br/>3.1. <strong>Processus de commande</strong><br/>Le Client sélectionne le livre souhaité, procède à sa personnalisation via les outils mis à disposition sur <strong>mylittlehero.co</strong> et valide sa commande en confirmant l'exactitude des informations fournies.<br/>3.2. <strong>Validation</strong><br/>La commande n'est considérée comme définitive qu'après validation par le Client et confirmation par l'Éditeur par courrier électronique. L'Éditeur se réserve le droit d'annuler toute commande en cas d'inexactitude des données fournies ou pour tout motif légitime.</p>
              <hr className="my-4 border-gray-300" />
              <p><strong>4. Prix</strong><br/>Les prix des livres personnalisés sont indiqués en euros (€), toutes taxes comprises (TTC), et n'incluent pas les frais d'expédition, sauf mention contraire. L'Éditeur se réserve le droit de modifier ses prix à tout moment ; toutefois, les produits seront facturés sur la base des tarifs en vigueur au moment de la commande.</p>
              <hr className="my-4 border-gray-300" />
              <p><strong>5. Modalités de paiement</strong><br/>Le règlement de la commande s'effectue en ligne par carte bancaire ou par tout autre moyen de paiement sécurisé proposé sur <strong>mylittlehero.co</strong>. La commande sera traitée dès réception du paiement intégral. En cas de refus ou d'annulation du paiement par l'établissement financier, la commande sera automatiquement annulée.</p>
              <hr className="my-4 border-gray-300" />
              <p><strong>6. Personnalisation et production</strong><br/>6.1. <strong>Personnalisation</strong><br/>Les informations fournies par le Client pour la personnalisation du livre sont de sa seule responsabilité. Il est recommandé de vérifier minutieusement ces informations avant validation définitive de la commande.<br/>6.2. <strong>Délai de production</strong><br/>La production des livres personnalisés s'effectue dans un délai de [préciser le délai] jours ouvrés après validation de la commande. Ce délai est donné à titre indicatif et ne saurait engager la responsabilité de l'Éditeur en cas de retard dû à des circonstances exceptionnelles.</p>
              <hr className="my-4 border-gray-300" />
              <p><strong>7. Livraison</strong><br/>7.1. <strong>Modalités</strong><br/>Les livres sont livrés à l'adresse indiquée par le Client lors de la commande. Les frais et délais de livraison seront précisés lors du processus de commande sur <strong>mylittlehero.co</strong>.<br/>7.2. <strong>Réception</strong><br/>Le Client est tenu de vérifier la conformité de la livraison au moment de la réception. En cas de dommages apparents ou de non-conformité, le Client devra en informer l'Éditeur dans les plus brefs délais afin de convenir d'un échange ou d'un remboursement.</p>
              <hr className="my-4 border-gray-300" />
              <p><strong>8. Rétractation</strong><br/>Conformément aux dispositions légales en vigueur, le Client dispose d'un délai de 14 jours à compter de la réception du produit pour exercer son droit de rétractation, sauf dans le cas où la personnalisation rendrait le produit unique et non revendable. En cas d'exercice du droit de rétractation, le Client devra retourner le livre dans son état d'origine et aux frais du Client, sauf accord contraire de l'Éditeur.</p>
              <hr className="my-4 border-gray-300" />
              <p><strong>9. Garantie et service après-vente</strong><br/>Les produits fournis bénéficient de la garantie légale de conformité et de la garantie contre les vices cachés. Pour tout problème relatif à la conformité du produit ou pour toute réclamation, le Client est invité à contacter le service client de l'Éditeur via [adresse e-mail de contact] ou par courrier recommandé adressé à [adresse du siège].</p>
              <hr className="my-4 border-gray-300" />
              <p><strong>10. Propriété intellectuelle</strong><br/>Tous les éléments de création, y compris les textes, illustrations et animations, sont la propriété exclusive de l'Éditeur ou de ses partenaires et sont protégés par les lois en vigueur sur la propriété intellectuelle. Toute reproduction, représentation ou utilisation, même partielle, est strictement interdite sans autorisation préalable écrite.</p>
              <hr className="my-4 border-gray-300" />
              <p><strong>11. Responsabilité</strong><br/>L'Éditeur ne pourra être tenu responsable des dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité d'utiliser les produits commercialisés, sauf en cas de faute prouvée de sa part. La responsabilité de l'Éditeur est limitée au montant de la commande ayant donné lieu au dommage.</p>
              <hr className="my-4 border-gray-300" />
              <p><strong>12. Données personnelles</strong><br/>Les informations personnelles collectées lors de la commande sont utilisées exclusivement pour le traitement de la commande et la gestion de la relation client. Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée, le Client dispose d'un droit d'accès, de rectification et de suppression des données le concernant en contactant le service client de l'Éditeur.</p>
              <hr className="my-4 border-gray-300" />
              <p><strong>13. Loi applicable et juridiction compétente</strong><br/>Les présentes CGV sont régies par le droit français. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut d'accord, le litige sera porté devant les tribunaux compétents du ressort du siège social de l'Éditeur.</p>
              <hr className="my-4 border-gray-300" />
              <p><strong>14. Dispositions finales</strong><br/>Les présentes CGV constituent l'intégralité de l'accord entre l'Éditeur et le Client. Toute modification ou renonciation à l'un quelconque des termes des présentes CGV devra être formalisée par un avenant écrit signé par les deux parties.</p>
              <hr className="my-4 border-gray-300" />
              <p><em>Date de dernière mise à jour : 16 février 2025</em></p>
              <p><em>NB : Ce document est fourni à titre indicatif et doit être adapté en fonction des spécificités de votre activité. Il est recommandé de consulter un avocat spécialisé pour s'assurer de la conformité juridique des présentes Conditions Générales de Vente.</em></p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConditionsGenerales;
