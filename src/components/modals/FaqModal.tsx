
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold text-primary mb-4">
            Questions Fréquentes
          </DialogTitle>
          <p className="text-center text-gray-600 mb-6">
            Toutes les informations dont vous avez besoin concernant nos produits et services
          </p>
        </DialogHeader>
        <div className="mt-4 max-h-[70vh] overflow-y-auto pr-4">
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="item-1" className="border rounded-md shadow-sm bg-white p-2">
              <AccordionTrigger className="text-primary font-medium hover:no-underline px-4">
                Quels sont les délais de livraison ?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 px-4">
                Nous livrons en France métropolitaine sous 2-4 jours ouvrés. Pour les commandes internationales, comptez 5-7 jours ouvrés.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border rounded-md shadow-sm bg-white p-2">
              <AccordionTrigger className="text-primary font-medium hover:no-underline px-4">
                Comment puis-je retourner un article ?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 px-4">
                Vous disposez de 30 jours pour retourner un article. Il doit être non porté et dans son emballage d'origine. Les frais de retour sont gratuits.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border rounded-md shadow-sm bg-white p-2">
              <AccordionTrigger className="text-primary font-medium hover:no-underline px-4">
                Proposez-vous des réductions pour les commandes en gros ?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 px-4">
                Oui, nous proposons des tarifs préférentiels pour les commandes professionnelles en grande quantité. Contactez notre service commercial pour plus d'informations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border rounded-md shadow-sm bg-white p-2">
              <AccordionTrigger className="text-primary font-medium hover:no-underline px-4">
                Quels sont vos délais de personnalisation ?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 px-4">
                Les délais de personnalisation varient selon la complexité et le volume de votre commande. En règle générale, comptez 3-5 jours ouvrés supplémentaires pour les personnalisations standards, et 5-7 jours pour les personnalisations complexes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border rounded-md shadow-sm bg-white p-2">
              <AccordionTrigger className="text-primary font-medium hover:no-underline px-4">
                Puis-je recevoir des échantillons avant de passer commande ?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 px-4">
                Oui, nous proposons un service d'échantillonnage pour les commandes professionnelles. Contactez notre équipe commerciale pour discuter de vos besoins spécifiques et organiser l'envoi d'échantillons.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6" className="border rounded-md shadow-sm bg-white p-2">
              <AccordionTrigger className="text-primary font-medium hover:no-underline px-4">
                Comment entretenir mes vêtements professionnels ?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 px-4">
                Nos vêtements sont conçus pour un entretien facile. La plupart peuvent être lavés en machine à 30°C. Pour les vêtements plus délicats, suivez les instructions sur l'étiquette. Évitez l'utilisation d'eau de javel et le séchage à haute température pour prolonger la durée de vie des tissus.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FaqModal;
