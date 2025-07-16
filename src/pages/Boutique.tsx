import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const Boutique = () => {
  const {
    t
  } = useTranslation('boutique');
  return <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* About Section with Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto mb-24">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 tracking-wide">
                {t('about.title')}
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed font-light">
                {t('about.text')}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed font-light">
                {t('about.description')}
              </p>
            </div>
            
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                <img src="/lovable-uploads/ff77746c-f78f-42b7-9b26-65a46249268f.png" alt="Professional man in blue suit" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gray-50 rounded-lg p-12 md:p-16">
            <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-wide uppercase">
              Du casual au chic, nous avons tout ce qu'il vous faut
            </h3>
            <p className="text-xl text-gray-600 mb-8 font-light">
              pour être à la pointe de la mode masculine
            </p>
            <button className="bg-gray-900 text-white px-12 py-4 rounded-lg font-light tracking-wide uppercase hover:bg-gray-800 transition-colors duration-300">
              Découvrir la Collection
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>;
};
export default Boutique;