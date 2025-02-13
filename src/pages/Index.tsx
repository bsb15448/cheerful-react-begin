
import { useState } from "react";
import { HeroSection } from "../components/HeroSection";
import ProductGrid from "../components/ProductGrid";
import AboutSection from "../components/AboutSection";
import FeaturesSection from "../components/FeaturesSection";
import FAQ from "../components/FAQ";
import ReviewSection from "../components/ReviewSection";
import ProjectGallery from "../components/ProjectGallery";
import { WelcomeDialog } from "../components/WelcomeDialog";
import { cn } from "@/lib/utils";

const Index = () => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <>
      <WelcomeDialog />
      <HeroSection />
      
      {/* About Section */}
      <AboutSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Reviews Section */}
      <ReviewSection />

      {/* Project Gallery */}
      <ProjectGallery />

      {/* FAQ Section */}
      <FAQ />
    </>
  );
};

export default Index;
