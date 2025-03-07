
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const PaymentFailure = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto rounded-lg bg-white shadow-xl p-8"
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-24 w-24 bg-red-100 rounded-full mb-6">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Paiement échoué</h1>
          <p className="text-gray-600 mb-8">
            Nous n'avons pas pu traiter votre paiement. Veuillez vérifier vos informations de paiement et réessayer.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate('/cart')}
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au panier
            </Button>
            <Button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFailure;
