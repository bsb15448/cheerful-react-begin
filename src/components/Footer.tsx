import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin, ChevronRight, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Top Section with Curved Border */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-8 bg-gray-900 rounded-b-[50%_20px]"></div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Column 1: About Us */}
          <div className="space-y-4">
            <Link to="/" className="block mb-6 transition-transform hover:scale-105 duration-300">
              <img src="/logo.png" alt="ELLES" className="h-12 invert" />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              ELLES est votre partenaire privilégié pour les vêtements de travail personnalisés.
              Nous offrons des solutions adaptées à chaque métier, alliant qualité, confort et style.
            </p>
            <div className="flex space-x-3 pt-4">
              <a href="#" className="bg-gray-800 p-2.5 rounded-full hover:bg-primary transition-all duration-300 hover:scale-110 shadow-md">
                <Facebook className="h-4 w-4 text-white" />
              </a>
              <a href="#" className="bg-gray-800 p-2.5 rounded-full hover:bg-primary transition-all duration-300 hover:scale-110 shadow-md">
                <Instagram className="h-4 w-4 text-white" />
              </a>
              <a href="#" className="bg-gray-800 p-2.5 rounded-full hover:bg-primary transition-all duration-300 hover:scale-110 shadow-md">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-4 w-4 text-white"
                >
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-6 relative after:content-[''] after:absolute after:w-12 after:h-1 after:bg-white after:left-0 after:-bottom-2">
              Liens utiles
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/", name: "Accueil" },
                { to: "/metiers", name: "Métiers" },
                { to: "/personalization", name: "Personnalisation" },
                { to: "/devis", name: "Demander un devis" },
                { to: "/nos-packs", name: "Nos Packs" },
              ].map((link, index) => (
                <li key={index} className="transition-transform hover:translate-x-1 duration-200">
                  <Link to={link.to} className="text-gray-300 hover:text-white flex items-center group">
                    <ChevronRight className="h-3 w-3 mr-2 text-white group-hover:translate-x-1 transition-transform" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-6 relative after:content-[''] after:absolute after:w-12 after:h-1 after:bg-white after:left-0 after:-bottom-2">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 text-white mr-3 mt-0.5 group-hover:animate-pulse" />
                <span className="text-gray-300 group-hover:text-white transition-colors">123 Rue du Commerce, 75001 Paris, France</span>
              </li>
              <li className="flex items-center group">
                <Phone className="h-5 w-5 text-white mr-3 group-hover:rotate-12 transition-transform" />
                <a href="tel:0123456789" className="text-gray-300 group-hover:text-white transition-colors hover:underline">01 23 45 67 89</a>
              </li>
              <li className="flex items-center group">
                <Mail className="h-5 w-5 text-white mr-3 group-hover:scale-110 transition-transform" />
                <a href="mailto:contact@elles.com" className="text-gray-300 group-hover:text-white transition-colors hover:underline">contact@elles.com</a>
              </li>
            </ul>
            <div className="pt-4 bg-gray-800/50 p-4 rounded-lg shadow-inner mt-4">
              <h5 className="text-sm font-semibold mb-3 flex items-center">
                <ExternalLink className="h-4 w-4 mr-2 text-white" />
                Horaires d'ouverture:
              </h5>
              <p className="text-gray-300 text-sm">
                Lun - Ven: 9h00 - 18h00<br />
                Sam: 10h00 - 16h00<br />
                Dim: Fermé
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with additional links and copyright */}
        <div className="pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} ELLES. Tous droits réservés.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-2">
              {[
                { to: "/terms", name: "Conditions d'utilisation" },
                { to: "/privacy", name: "Politique de confidentialité" },
                { to: "/faq", name: "FAQ" },
                { to: "/livraison", name: "Livraison" },
                { to: "/retours", name: "Retours" },
              ].map((link, index) => (
                <Link key={index} to={link.to} className="text-gray-400 hover:text-white text-sm transition-colors duration-200 hover:underline">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
