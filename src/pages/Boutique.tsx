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
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-4 tracking-wide">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="w-24 h-px bg-gray-300 mx-auto mb-12"></div>
          </div>

          {/* Gallery Section */}
          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <div className="group relative overflow-hidden rounded-lg shadow-lg h-[400px]">
                <img src="/lovable-uploads/a0ae31b6-3896-47e5-920e-28630168af92.png" alt="Elegant man in grey suit" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-light">{t('gallery.style1')}</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-lg shadow-lg h-[400px]">
                <video src="/videomen.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-light">{t('gallery.collection')}</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-lg shadow-lg h-[400px]">
                <img src="/lovable-uploads/ff77746c-f78f-42b7-9b26-65a46249268f.png" alt="Professional man in blue suit" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-light">{t('gallery.style2')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Section with Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto mb-24">
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 tracking-wide">
                {t('about.title')}
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed font-light">
                {t('about.text')}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed font-light mb-8">
                {t('about.description')}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-600 font-light">{t('about.point1')}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-600 font-light">{t('about.point2')}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-600 font-light">{t('about.point3')}</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                <img src="/lovable-uploads/ff77746c-f78f-42b7-9b26-65a46249268f.png" alt="Professional man in blue suit" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-sm font-light text-gray-600">{t('about.experience')}</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gray-50 rounded-lg p-12 md:p-16">
            <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-wide uppercase">
              {t('cta.title')}
            </h3>
            <p className="text-xl text-gray-600 mb-8 font-light">
              {t('cta.subtitle')}
            </p>
            <button className="bg-gray-900 text-white px-12 py-4 rounded-lg font-light tracking-wide uppercase hover:bg-gray-800 transition-colors duration-300">
              {t('cta.button')}
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>;
};
export default Boutique;