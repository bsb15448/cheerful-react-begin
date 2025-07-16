
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PromotionBanner from '@/components/PromotionBanner';
import ProductFilters from '@/components/ProductFilters';
import ProductGrid from '@/components/ProductGrid';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import SocialSidebar from '@/components/SocialSidebar';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Header />
      <main className="pt-0">
        <Hero />
        <PromotionBanner />
        <ProductFilters />
        <ProductGrid />
        <Newsletter />
      </main>
      <Footer />
      <ScrollToTop />
      <SocialSidebar />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
