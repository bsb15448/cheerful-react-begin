
import { useState, useEffect } from "react";
import { HeroSection } from "../components/HeroSection";
import ProductGrid from "../components/ProductGrid";
import AboutSection from "../components/AboutSection";
import VideoSection from "../components/VideoSection";
import FAQ from "../components/FAQ";
import ReviewSection from "../components/ReviewSection";
import ProjectGallery from "../components/ProjectGallery";
import LoadingScreen from "../components/LoadingScreen";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const Index = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (minimum 2 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <main className="min-h-screen">
        {/* Hero Section with improved height */}
        <HeroSection />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Video Section */}
        <VideoSection />

        {/* Project Gallery with improved spacing */}
        <div className="py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Exemples de notre travail</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez nos réalisations et projets pour des clients de différents secteurs professionnels.
            </p>
          </motion.div>
          <ProjectGallery />
        </div>

        {/* Reviews Section with background */}
        <div className="bg-gray-50">
          <ReviewSection />
        </div>

        {/* FAQ Section with improved spacing */}
        <div className="py-20 bg-white">
          <FAQ />
        </div>
      </main>
    </>
  );
};

export default Index;
