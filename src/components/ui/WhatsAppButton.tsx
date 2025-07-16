
import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const WhatsAppButton = () => {
  const { t } = useTranslation('whatsapp');
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const whatsappNumber = "+21612345678"; // Replace with actual WhatsApp number
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeMessage(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-close the welcome message after 5 seconds of being shown
  useEffect(() => {
    if (showWelcomeMessage) {
      const autoCloseTimer = setTimeout(() => {
        setShowWelcomeMessage(false);
      }, 5000);

      return () => clearTimeout(autoCloseTimer);
    }
  }, [showWelcomeMessage]);

  const handleWhatsAppClick = () => {
    const message = t('defaultMessage');
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const dismissWelcomeMessage = () => {
    setShowWelcomeMessage(false);
  };

  return (
    <>
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 group border border-gray-700/30"
        aria-label={t('ariaLabel')}
      >
        <MessageCircle 
          className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" 
        />
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-black text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          {t('tooltip')}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
        </div>
        
        {/* Pulse effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-black rounded-full animate-ping opacity-20"></div>
      </button>

      {/* Welcome Message - Coming out of the button */}
      {showWelcomeMessage && (
        <div className="fixed bottom-24 right-2 z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 max-w-xs animate-in fade-in slide-in-from-bottom-right duration-500 transform origin-bottom-right">
          {/* Speech bubble tail pointing to WhatsApp button */}
          <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-white"></div>
          <div className="absolute -bottom-3 right-8 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-gray-200"></div>
          
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800 font-medium leading-relaxed">
                {t('welcomeMessage')}
              </p>
            </div>
            <button
              onClick={dismissWelcomeMessage}
              className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close message"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;
