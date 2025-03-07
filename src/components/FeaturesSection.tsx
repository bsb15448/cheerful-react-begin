
import { Truck, Paintbrush, FileText, Clock, Shield, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Truck className="h-12 w-12 text-primary transition-transform group-hover:scale-110" />,
      secondaryIcon: <Clock className="h-6 w-6 text-secondary absolute -right-2 -top-2" />,
      title: "Logistique Premium",
      description: "Service de transport dédié avec suivi en temps réel et engagement de livraison express pour vos commandes professionnelles."
    },
    {
      icon: <Paintbrush className="h-12 w-12 text-primary transition-transform group-hover:scale-110" />,
      secondaryIcon: <Shield className="h-6 w-6 text-secondary absolute -right-2 -top-2" />,
      title: "Conception Sur Mesure",
      description: "Solutions personnalisées développées par nos experts avec une sélection rigoureuse de matériaux haute performance pour vos projets d'entreprise."
    },
    {
      icon: <FileText className="h-12 w-12 text-primary transition-transform group-hover:scale-110" />,
      secondaryIcon: <BadgeCheck className="h-6 w-6 text-secondary absolute -right-2 -top-2" />,
      title: "Conseil Stratégique",
      description: "Analyse approfondie de vos enjeux professionnels pour des recommandations d'excellence avec un accompagnement de proximité sur le long terme."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Nos Services Premium</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl">
            Des solutions d'excellence conçues pour répondre aux exigences des professionnels les plus exigeants, avec un engagement constant envers la qualité et votre satisfaction.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group flex flex-col items-center text-center p-10 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative border border-gray-100"
            >
              <div className="mb-8 p-5 rounded-full bg-secondary/5 relative">
                {feature.icon}
                {feature.secondaryIcon}
              </div>
              <h3 className="text-2xl font-bold text-primary mb-5 group-hover:text-secondary transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
