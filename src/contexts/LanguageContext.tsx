import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n';

type Language = 'fr' | 'en';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('fr');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      setCurrentLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
    setLanguage(newLanguage);
  };

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};