
import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SizeGuideModal from './SizeGuideModal';

const Footer = () => {
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const { t } = useTranslation('footer');

  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <img src="/lovable-uploads/69b552f1-586a-4e89-9275-11ee73acf808.png" alt="Paola Di Battiglia" className="h-12 w-auto mb-6" />
            <p className="text-gray-600 text-sm mb-8 leading-relaxed font-light">
              {t('brand.description')}
            </p>
            
            {/* Contact info */}
            <div className="space-y-3 text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-gray-400" />
                <span>{t('contact.phone')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-gray-400" />
                <span>{t('contact.email')}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-gray-400" />
                <span>{t('contact.address')}</span>
              </div>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="font-medium text-gray-900 mb-6 text-sm tracking-wide uppercase">{t('sections.collections')}</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-light">
                  {t('links.costumes')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-light">
                  {t('links.chemises')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-light">
                  {t('links.accessoires')}
                </a>
              </li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="font-medium text-gray-900 mb-6 text-sm tracking-wide uppercase">{t('sections.services')}</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => setIsSizeGuideOpen(true)} className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-light text-left">
                  {t('links.sizeGuide')}
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-light">
                  {t('links.livraison')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-light">
                  {t('links.retours')}
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-light">
                  {t('links.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment methods */}
          <div>
            <h3 className="font-medium text-gray-900 mb-6 text-sm tracking-wide uppercase">{t('sections.payment')}</h3>
            <div className="flex flex-wrap gap-2">
              <img src="/lovable-uploads/d96e264c-4c78-436f-8046-7b929a4d5ce8.png" alt="Moyens de paiement acceptés" className="h-8 w-auto" />
            </div>
          </div>
        </div>

        {/* Bottom section with copyright and developer credit */}
        <div className="border-t border-gray-100 pt-12 mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-xs text-gray-500 font-light tracking-wide">
                {t('copyright')}
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-xs text-gray-500 font-light tracking-wide">
                {t('developer.text')}{' '}
                <a href="https://ihebchebbi.pro/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 transition-colors underline">
                  {t('developer.name')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </footer>
  );
};

export default Footer;
