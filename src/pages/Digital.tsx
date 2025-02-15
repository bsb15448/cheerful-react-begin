
import { motion } from 'framer-motion';
import { Code, PenTool, Smartphone, Layout, Paintbrush, Globe } from 'lucide-react';
import ParallaxText from '../components/ParallaxText';

const Digital = () => {
  const services = [
    {
      icon: <PenTool className="h-8 w-8" />,
      title: "Design Graphique",
      description: "Création d'identités visuelles uniques, logos et supports marketing qui captivent votre audience."
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Applications Mobiles",
      description: "Développement d'applications mobiles innovantes pour iOS et Android, offrant une expérience utilisateur exceptionnelle."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Sites Web",
      description: "Conception et développement de sites web responsifs et modernes qui reflètent votre image de marque."
    },
    {
      icon: <Layout className="h-8 w-8" />,
      title: "UI/UX Design",
      description: "Création d'interfaces intuitives et d'expériences utilisateur fluides pour vos projets digitaux."
    },
    {
      icon: <Paintbrush className="h-8 w-8" />,
      title: "Branding Digital",
      description: "Développement de votre présence en ligne avec une stratégie de marque cohérente et impactante."
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Développement Sur Mesure",
      description: "Solutions techniques personnalisées pour répondre à vos besoins spécifiques."
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-black to-rich-black">
        <div className="absolute inset-0 bg-[url('/images/banners/digital-banner.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
        <ParallaxText y={[0, -100]}>
          <div className="relative z-10 text-center px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-gold-400"
            >
              Services Digitaux
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-200 max-w-2xl mx-auto"
            >
              Transformez votre vision en réalité numérique avec nos solutions créatives et innovantes
            </motion.p>
          </div>
        </ParallaxText>
      </div>

      {/* Services Grid */}
      <div className="py-20 px-4 bg-gradient-to-b from-rich-black to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gold-400 mb-6">
              Nos Services Digitaux
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              De la conception à la réalisation, nous vous accompagnons dans tous vos projets digitaux avec expertise et créativité.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-gold-600 to-gold-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-black/50 backdrop-blur-xl p-8 rounded-lg border border-gold-500/10 hover:border-gold-500/30 transition-all duration-300">
                  <div className="text-gold-400 mb-4 group-hover:scale-110 transform transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gold-400 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-300">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-to-t from-rich-black to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-gold-600 to-gold-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-black/50 backdrop-blur-xl p-12 rounded-lg border border-gold-500/10">
              <h2 className="text-3xl font-bold text-gold-400 mb-6">
                Prêt à Démarrer Votre Projet Digital ?
              </h2>
              <p className="text-gray-300 mb-8">
                Contactez-nous pour discuter de vos besoins et découvrir comment nous pouvons vous aider à atteindre vos objectifs.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-400 text-black font-semibold rounded-lg hover:from-gold-500 hover:to-gold-300 transition-all duration-300"
              >
                Contactez-Nous
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Digital;
