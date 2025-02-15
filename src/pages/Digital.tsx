
import { motion } from 'framer-motion';
import { Code, PenTool, Smartphone, Layout, Paintbrush, Globe, ArrowRight, Check } from 'lucide-react';
import ParallaxText from '../components/ParallaxText';

const Digital = () => {
  const services = [
    {
      icon: <PenTool className="h-8 w-8" />,
      title: "Design Graphique",
      description: "Création d'identités visuelles uniques, logos et supports marketing qui captivent votre audience.",
      features: ["Identité visuelle", "Logos", "Chartes graphiques", "Supports marketing"]
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Applications Mobiles",
      description: "Développement d'applications mobiles innovantes pour iOS et Android, offrant une expérience utilisateur exceptionnelle.",
      features: ["iOS & Android", "UX/UI Design", "Performance", "Maintenance"]
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Sites Web",
      description: "Conception et développement de sites web responsifs et modernes qui reflètent votre image de marque.",
      features: ["Sites vitrines", "E-commerce", "Blogs", "Applications web"]
    },
    {
      icon: <Layout className="h-8 w-8" />,
      title: "UI/UX Design",
      description: "Création d'interfaces intuitives et d'expériences utilisateur fluides pour vos projets digitaux.",
      features: ["Wireframes", "Prototypes", "Tests utilisateurs", "Design system"]
    },
    {
      icon: <Paintbrush className="h-8 w-8" />,
      title: "Branding Digital",
      description: "Développement de votre présence en ligne avec une stratégie de marque cohérente et impactante.",
      features: ["Stratégie digitale", "Réseaux sociaux", "Content marketing", "SEO"]
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Développement Sur Mesure",
      description: "Solutions techniques personnalisées pour répondre à vos besoins spécifiques.",
      features: ["Architecture", "APIs", "Intégration", "Sécurité"]
    }
  ];

  const stats = [
    { number: "150+", label: "Projets Réalisés" },
    { number: "98%", label: "Clients Satisfaits" },
    { number: "15+", label: "Années d'Expérience" },
    { number: "24/7", label: "Support Client" }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section with Gradient Overlay */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/banners/digital-banner.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-black/70 to-black/90" />
        <ParallaxText y={[0, -100]}>
          <div className="relative z-10 text-center px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
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

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-b from-black to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  {stat.number}
                </h3>
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid with Modern Design */}
      <div className="py-20 px-4 bg-gradient-to-b from-purple-900/20 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
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
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-black/50 backdrop-blur-xl p-8 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300">
                  <div className="text-purple-400 mb-4 group-hover:scale-110 transform transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-purple-400 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-400">
                        <Check className="h-4 w-4 mr-2 text-purple-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section with Modern Design */}
      <div className="py-20 px-4 bg-gradient-to-t from-purple-900/20 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-black/50 backdrop-blur-xl p-12 rounded-lg border border-purple-500/10">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
                Prêt à Démarrer Votre Projet Digital ?
              </h2>
              <p className="text-gray-300 mb-8">
                Contactez-nous pour discuter de vos besoins et découvrir comment nous pouvons vous aider à atteindre vos objectifs.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-500/25"
              >
                Contactez-Nous
                <ArrowRight className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Digital;
