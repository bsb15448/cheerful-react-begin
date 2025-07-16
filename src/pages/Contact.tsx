
import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';
import GoogleMap from '@/components/GoogleMap';

const Contact = () => {
  const { t } = useTranslation('contact');

  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 font-montserrat">
              {t('title')}
            </h1>
            <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          {/* Main Content - Same Height Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Contact Form - Left Side */}
            <div className="order-2 lg:order-1">
              <ContactForm />
            </div>

            {/* Map Container - Right Side */}
            <div className="order-1 lg:order-2 flex flex-col">
              {/* Map */}
              <div className="flex-1">
                <GoogleMap />
              </div>
              {/* Contact Info at Bottom */}
              <div className="mt-4">
                <ContactInfo />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
