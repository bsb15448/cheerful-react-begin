
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import FaqModal from "./modals/FaqModal";

const FAQ = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewMoreClick = () => {
    setIsModalOpen(true);
  };

  return (
    <section id="faq" className="py-20">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Questions Fréquentes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nous avons rassemblé les questions les plus courantes pour vous aider à trouver rapidement les informations dont vous avez besoin.
          </p>
        </motion.div>
        
        <div className="mx-auto mt-12 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Accordion type="single" collapsible className="bg-white rounded-lg p-4 shadow-sm">
              <AccordionItem value="item-1" className="border-b border-gray-100">
                <AccordionTrigger className="text-primary font-medium py-4 hover:no-underline">
                  Quels sont les délais de livraison ?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Nous livrons en France métropolitaine sous 2-4 jours ouvrés. Pour les commandes internationales, comptez 5-7 jours ouvrés.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b border-gray-100">
                <AccordionTrigger className="text-primary font-medium py-4 hover:no-underline">
                  Comment puis-je retourner un article ?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Vous disposez de 30 jours pour retourner un article. Il doit être non porté et dans son emballage d'origine. Les frais de retour sont gratuits.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b-0">
                <AccordionTrigger className="text-primary font-medium py-4 hover:no-underline">
                  Proposez-vous des réductions pour les commandes en gros ?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  Oui, nous proposons des tarifs préférentiels pour les commandes professionnelles en grande quantité. Contactez notre service commercial pour plus d'informations.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 text-center"
          >
            <Button 
              onClick={handleViewMoreClick} 
              variant="outline" 
              className="rounded-full px-8 py-6 border-primary text-primary hover:bg-primary/5"
            >
              Voir plus de questions
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* FAQ Modal */}
      <FaqModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default FAQ;
