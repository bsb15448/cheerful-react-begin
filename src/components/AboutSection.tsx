
import React from 'react';
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="bg-muted py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[450px] rounded-lg overflow-hidden shadow-2xl"
          >
            <img
              src="/AboutImage.png"
              alt="Notre Histoire"
              className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Notre Histoire</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Depuis 2010, ELLES s'engage à fournir des vêtements professionnels d'exception. Notre mission est de marier le confort, l'élégance et le professionnalisme pour les secteurs les plus exigeants.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Chaque pièce est élaborée avec un soin méticuleux, en sélectionnant des matériaux premium et des techniques de fabrication innovantes pour garantir durabilité et confort tout au long de votre journée professionnelle.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-6 pt-4"
            >
              <div className="text-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="text-3xl font-bold text-primary">13+</div>
                <div className="text-sm text-gray-600">Années d'expérience</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="text-3xl font-bold text-primary">10k+</div>
                <div className="text-sm text-gray-600">Clients satisfaits</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-gray-600">Support client</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
