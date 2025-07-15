
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ShippingPolicy = () => {
  const navigate = useNavigate();

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
              <p><strong>POLITIQUE D'EXPÉDITION – MYLITTLEHERO</strong><br/><strong>Dernière mise à jour : 16 février 2025</strong></p>
              <hr className="my-4 border-gray-300" />
              <p><strong>1. Objet</strong><br/>La présente Politique d'Expédition a pour objet de définir les modalités et délais applicables à l'exécution des commandes passées sur le site <strong>mylittlehero.co</strong>. En utilisant nos Services, vous acceptez les présentes dispositions relatives à la création, l'impression et la livraison des produits.</p>
              <hr className="my-4 border-gray-300" />
              <p><strong>2. Délais de Production et de Livraison</strong></p>
              <p>2.1. <strong>Création et Validation</strong><br/>Chaque livre est personnalisé et fait l'objet d'une validation minutieuse. Le délai de création et de validation est compris entre <strong>2 et 4 jours ouvrés</strong>.</p>
              <p>2.2. <strong>Impression</strong><br/>La phase d'impression, réalisée sur un papier de haute qualité, s'effectue dans un délai de <strong>2 à 3 jours ouvrés</strong>.</p>
              <p>2.3. <strong>Livraison</strong><br/>La livraison est assurée par nos partenaires logistiques et dépend de votre localisation. Le délai de livraison est estimé entre <strong>2 et 4 jours ouvrés</strong>.</p>
              <p>2.4. <strong>Délai Total Estimé</strong><br/>En cumulant les étapes de création, validation, impression et livraison, le délai total estimé pour la réception de votre commande se situe entre <strong>6 et 11 jours ouvrés</strong>.</p>
              <hr className="my-4 border-gray-300" />
              <p><strong>3. Engagement de Qualité et Limitation de Responsabilité</strong><br/>Nous mettons tout en œuvre pour respecter ces délais et garantir une qualité optimale de nos produits. Toutefois, les délais indiqués sont donnés à titre indicatif et ne constituent pas une garantie contractuelle. En cas de retard dû à des circonstances indépendantes de notre volonté (notamment, mais sans s'y limiter, des conditions météorologiques défavorables, des problèmes logistiques ou des cas de force majeure), <strong>MyLittleHero</strong> ne pourra être tenu responsable.</p>
              <hr className="my-4 border-gray-300" />
              <p><strong>4. Contact</strong><br/>Pour toute question ou information complémentaire relative à notre politique d'expédition, nous vous invitons à nous contacter à l'adresse suivante :<br/><strong><a href="mailto:Mylittleheroteam@gmail.com" className="text-blue-600 hover:text-blue-800">Mylittleheroteam@gmail.com</a></strong></p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShippingPolicy;
