import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import French translations
import frHeader from './locales/header/fr.json';
import frFooter from './locales/footer/fr.json';
import frHome from './locales/home/fr.json';
import frMobileSidebar from './locales/mobileSidebar/fr.json';
import frCheckout from './locales/checkout/fr.json';
import frCategory from './locales/category/fr.json';
import frProduct from './locales/product/fr.json';
import frContact from './locales/contact/fr.json';
import frCommon from './locales/common/fr.json';
import frCart from './locales/cart/fr.json';
import frFilters from './locales/filters/fr.json';
import frProductCard from './locales/productCard/fr.json';
import frProductGrid from './locales/productGrid/fr.json';
import frPromotions from './locales/promotions/fr.json';
import frNotFound from './locales/notFound/fr.json';
import frCategoryPage from './locales/categoryPage/fr.json';
import frWhatsapp from './locales/whatsapp/fr.json';
import frHero from './locales/hero/fr.json';
import frBoutique from './locales/boutique/fr.json';

// Import English translations
import enHeader from './locales/header/en.json';
import enFooter from './locales/footer/en.json';
import enHome from './locales/home/en.json';
import enMobileSidebar from './locales/mobileSidebar/en.json';
import enCheckout from './locales/checkout/en.json';
import enCategory from './locales/category/en.json';
import enProduct from './locales/product/en.json';
import enContact from './locales/contact/en.json';
import enCommon from './locales/common/en.json';
import enCart from './locales/cart/en.json';
import enFilters from './locales/filters/en.json';
import enProductCard from './locales/productCard/en.json';
import enProductGrid from './locales/productGrid/en.json';
import enPromotions from './locales/promotions/en.json';
import enNotFound from './locales/notFound/en.json';
import enCategoryPage from './locales/categoryPage/en.json';
import enWhatsapp from './locales/whatsapp/en.json';
import enHero from './locales/hero/en.json';
import enBoutique from './locales/boutique/en.json';

const resources = {
  fr: {
    header: frHeader,
    footer: frFooter,
    home: frHome,
    mobileSidebar: frMobileSidebar,
    checkout: frCheckout,
    category: frCategory,
    product: frProduct,
    contact: frContact,
    common: frCommon,
    cart: frCart,
    filters: frFilters,
    productCard: frProductCard,
    productGrid: frProductGrid,
    promotions: frPromotions,
    notFound: frNotFound,
    categoryPage: frCategoryPage,
    whatsapp: frWhatsapp,
    hero: frHero,
    boutique: frBoutique,
  },
  en: {
    header: enHeader,
    footer: enFooter,
    home: enHome,
    mobileSidebar: enMobileSidebar,
    checkout: enCheckout,
    category: enCategory,
    product: enProduct,
    contact: enContact,
    common: enCommon,
    cart: enCart,
    filters: enFilters,
    productCard: enProductCard,
    productGrid: enProductGrid,
    promotions: enPromotions,
    notFound: enNotFound,
    categoryPage: enCategoryPage,
    whatsapp: enWhatsapp,
    hero: enHero,
    boutique: enBoutique,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // default language
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
    // Enable namespace support
    defaultNS: 'common',
    ns: ['header', 'footer', 'home', 'mobileSidebar', 'checkout', 'category', 'product', 'contact', 'common', 'cart', 'filters', 'productCard', 'productGrid', 'promotions', 'notFound', 'categoryPage', 'whatsapp', 'hero', 'boutique'],
  });

export default i18n;