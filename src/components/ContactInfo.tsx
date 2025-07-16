
import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ContactInfo = () => {
  const { t } = useTranslation('contact');

  const contactItems = [
    {
      icon: Phone,
      title: t('info.phone'),
      content: '+216 56 829 717',
      href: 'tel:+21656829717'
    },
    {
      icon: Mail,
      title: t('info.email'),
      content: 'contact@spadadibattaglia.com',
      href: 'mailto:contact@spadadibattaglia.com'
    },
    {
      icon: MapPin,
      title: t('info.address'),
      content: 'P9, Tunis, La Marsa, Tunisia',
      href: null
    },
    {
      icon: Clock,
      title: t('info.hours'),
      content: null,
      href: null
    }
  ];

  return (
    <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl lg:text-2xl font-light text-gray-900 mb-4 lg:mb-6 font-montserrat">
        {t('info.title')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {contactItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
              <item.icon className="w-3 h-3 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 mb-1 text-sm">{item.title}</h3>
              {item.content ? (
                item.href ? (
                  <a 
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm break-words"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-gray-600 text-sm break-words">{item.content}</p>
                )
              ) : (
                <div className="text-gray-600 space-y-1 text-xs">
                  <p>{t('info.hoursDetails.weekdays')}</p>
                  <p>{t('info.hoursDetails.saturday')}</p>
                  <p>{t('info.hoursDetails.sunday')}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
