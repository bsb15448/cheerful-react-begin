
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';

const GoogleMap = () => {
  const { t } = useTranslation('contact');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-80 lg:h-96 relative">
      <div className="relative h-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.8586926394716!2d10.324684876139558!3d36.87687937226562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34f33d7d7a57%3A0x7b2b2b2b2b2b2b2b!2sLa%20Marsa%2C%20Tunisia!5e0!3m2!1sen!2sus!4v1641234567890!5m2!1sen!2sus"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t('map.title')}
        />
        
        {/* Custom Location Marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="relative">
            {/* Pulsing circle animation */}
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75 w-6 h-6"></div>
            {/* Main marker */}
            <div className="relative bg-red-600 rounded-full p-2 shadow-lg">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            {/* Label */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap">
              SPADA DI BATTAGLIA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;
