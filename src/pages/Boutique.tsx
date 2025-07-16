import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Clock } from 'lucide-react';

const Boutique = () => {
  const { t } = useTranslation('boutique');

  const galleryImages = [
    {
      src: '/lovable-uploads/a0ae31b6-3896-47e5-920e-28630168af92.png',
      alt: 'Elegant man in grey suit'
    },
    {
      src: '/lovable-uploads/ff77746c-f78f-42b7-9b26-65a46249268f.png',
      alt: 'Professional man in blue suit'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('gallery.subtitle')}
            </p>
          </div>

          {/* Gallery Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('gallery.title')}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {galleryImages.map((image, index) => (
                <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t('about.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t('about.text')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.description')}
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {t('contact.title')}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">{t('contact.address')}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">{t('contact.phone')}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">{t('contact.hours')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-primary/5 rounded-lg p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Du casual au chic, nous avons tout ce qu'il vous faut
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              pour être à la pointe de la mode masculine
            </p>
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Découvrir la Collection
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Boutique;