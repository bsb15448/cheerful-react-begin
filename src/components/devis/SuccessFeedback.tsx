
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home } from "lucide-react";
import { motion } from "framer-motion";

interface SuccessFeedbackProps {
  onBackToHome: () => void;
}

export const SuccessFeedback = ({ onBackToHome }: SuccessFeedbackProps) => {
  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-lg mx-auto text-center space-y-8 bg-white p-10 rounded-xl shadow-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto"
        >
          <CheckCircle2 className="w-14 h-14 text-green-500" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-gray-800">Merci pour votre demande !</h2>
        
        <div className="space-y-4 text-gray-600">
          <p className="text-lg">
            Nous avons bien reçu votre demande de devis.
          </p>
          <p>
            Notre équipe l'examine et vous enverra une réponse détaillée par email dans les plus brefs délais.
          </p>
        </div>
        
        <div className="pt-4">
          <Button
            onClick={onBackToHome}
            className="mt-6"
            size="lg"
          >
            <Home className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>
        </div>

        <p className="text-sm text-gray-500 pt-4">
          Un email de confirmation a été envoyé à l'adresse fournie.
        </p>
      </motion.div>
    </div>
  );
};
