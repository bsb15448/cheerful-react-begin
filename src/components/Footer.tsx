import { useState } from 'react';
import { Phone, Mail, MapPin, ChevronUp } from 'lucide-react';

const languages = [
  { code: 'fr', flag: '/images/flags/fr.svg' },
  { code: 'en', flag: '/images/flags/gb.svg' },
  { code: 'ar', flag: '/images/flags/sa.svg' },
  { code: 'it', flag: '/images/flags/it.svg' },
];

export default function Footer() {
  const [currentLang, setCurrentLang] = useState(languages[0]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative border-t border-brand-charcoal/15">
      {/* Main footer */}
      <div className="py-20 lg:py-28 section-padding">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">

            {/* Brand column */}
            <div className="md:col-span-4 lg:col-span-5">
              <img src="/images/logo.png" alt="L.S Transport" className="h-10 mb-6" />
              <p className="text-[14px] text-brand-cream/40 leading-[1.9] max-w-sm mb-8">
                Service de transport privé d'exception dans la région PACA.
                Confort, ponctualité et discrétion pour chacun de vos déplacements.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://wa.me/33600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-brand-charcoal/30 flex items-center justify-center hover:border-brand-gold/50 hover:bg-brand-gold/5 transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-brand-cream/50 hover:fill-brand-gold transition-colors">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-brand-charcoal/30 flex items-center justify-center hover:border-brand-gold/50 hover:bg-brand-gold/5 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-brand-cream/50">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="md:col-span-2 lg:col-span-2">
              <h4 className="text-[11px] tracking-[0.2em] uppercase text-brand-cream/60 font-semibold mb-6">
                Navigation
              </h4>
              <nav className="flex flex-col gap-3">
                {[
                  { href: '#about', label: 'À propos' },
                  { href: '#experience', label: 'Expérience' },
                  { href: '#services', label: 'Services' },
                  { href: '#testimonials', label: 'Témoignages' },
                  { href: '#booking', label: 'Réservation' },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[13px] text-brand-cream/35 hover:text-brand-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="md:col-span-3 lg:col-span-2">
              <h4 className="text-[11px] tracking-[0.2em] uppercase text-brand-cream/60 font-semibold mb-6">
                Contact
              </h4>
              <div className="space-y-4">
                <a href="tel:+33600000000" className="flex items-center gap-3 text-[13px] text-brand-cream/35 hover:text-brand-gold transition-colors duration-300">
                  <Phone className="w-4 h-4 text-brand-cream/25 flex-shrink-0" />
                  +33 6 00 00 00 00
                </a>
                <a href="mailto:contact@lstransport.fr" className="flex items-center gap-3 text-[13px] text-brand-cream/35 hover:text-brand-gold transition-colors duration-300">
                  <Mail className="w-4 h-4 text-brand-cream/25 flex-shrink-0" />
                  contact@lstransport.fr
                </a>
                <div className="flex items-start gap-3 text-[13px] text-brand-cream/35">
                  <MapPin className="w-4 h-4 text-brand-cream/25 flex-shrink-0 mt-0.5" />
                  <span>Région PACA, France</span>
                </div>
              </div>
            </div>

            {/* Legal & Language */}
            <div className="md:col-span-3 lg:col-span-3">
              <h4 className="text-[11px] tracking-[0.2em] uppercase text-brand-cream/60 font-semibold mb-6">
                Informations
              </h4>
              <nav className="flex flex-col gap-3 mb-8">
                {[
                  { href: '#', label: 'Mentions légales' },
                  { href: '#', label: 'Politique de confidentialité' },
                  { href: '#', label: 'Conditions générales' },
                  { href: '#', label: 'Politique de cookies' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[13px] text-brand-cream/35 hover:text-brand-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Language switcher */}
              <div>
                <span className="text-[11px] tracking-[0.15em] uppercase text-brand-cream/30 font-medium block mb-3">
                  Langue
                </span>
                <div className="flex items-center gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setCurrentLang(lang)}
                      className={`w-9 h-9 rounded-md border flex items-center justify-center transition-all duration-200 ${
                        currentLang.code === lang.code
                          ? 'border-brand-gold/50 bg-brand-gold/10'
                          : 'border-brand-charcoal/30 hover:border-brand-charcoal/50'
                      }`}
                      aria-label={lang.code}
                    >
                      <span className="text-lg leading-none">{lang.flag}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-charcoal/10">
        <div className="section-padding py-6 max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-brand-muted/35">
              © {new Date().getFullYear()} L.S Transport — Van Prestige. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[11px] text-brand-muted/35">
                SIRET : XXX XXX XXX XXXXX
              </span>
              <button
                onClick={scrollToTop}
                className="w-8 h-8 rounded-full border border-brand-charcoal/25 flex items-center justify-center hover:border-brand-gold/40 hover:bg-brand-gold/5 transition-all duration-300"
                aria-label="Retour en haut"
              >
                <ChevronUp className="w-4 h-4 text-brand-cream/40" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom padding for mobile sticky CTA */}
      <div className="lg:hidden h-16" />
    </footer>
  );
}
