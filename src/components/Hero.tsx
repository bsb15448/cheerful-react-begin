import { motion } from 'framer-motion';
import { useState } from 'react';
import { useI18n } from '../lib/i18n';

export default function Hero() {
  const { t } = useI18n();
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState('');
  const [service, setService] = useState('');

  const serviceOptions = [
    { value: 'airport', label: t('service.airport') },
    { value: 'business', label: t('service.business') },
    { value: 'event', label: t('service.event') },
    { value: 'excursion', label: t('service.excursion') },
    { value: 'other', label: t('service.other') },
  ];

  const handleQuickBooking = () => {
    const text = `Bonjour, je souhaite réserver :\n📅 Date : ${date || 'À définir'}\n👥 Passagers : ${passengers || 'À définir'}\n🚐 Service : ${serviceOptions.find(s => s.value === service)?.label || 'À définir'}`;
    window.open(`https://wa.me/33600000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  const inputBase =
    'bg-brand-charcoal/40 border border-brand-charcoal/30 text-brand-cream text-[13px] font-body rounded-lg px-4 py-3.5 focus:border-brand-gold/40 focus:outline-none focus:ring-1 focus:ring-brand-gold/20 transition-all appearance-none cursor-pointer w-full placeholder:text-brand-cream/30';

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Van confortable en déplacement"
          className="w-full h-full object-cover object-center"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/50 to-brand-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/30" />
      </div>

      <div className="relative z-10 section-padding w-full max-w-[1400px] mx-auto pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-[680px]"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-[2px] bg-brand-gold rounded-full" />
            <span className="text-[12px] font-body font-semibold tracking-[0.25em] uppercase text-brand-gold">
              {t('hero.tag')}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-[clamp(2.6rem,5.5vw,4.8rem)] font-light leading-[1] mb-6 tracking-[-0.02em]"
          >
            {t('hero.title1')}
            <br />
            <em className="text-gradient-gold font-semibold italic">{t('hero.title2')}</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-base lg:text-lg text-brand-cream/60 font-light leading-[1.7] max-w-[460px] mb-10"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Booking form */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="card-glass rounded-xl p-5 lg:p-6 mb-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div>
                <label className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-brand-cream/50 mb-2 font-semibold">
                  <svg className="w-3.5 h-3.5 text-brand-cream/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  {t('hero.date')}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputBase}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-brand-cream/50 mb-2 font-semibold">
                  <svg className="w-3.5 h-3.5 text-brand-cream/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                  {t('hero.passengers')}
                </label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className={inputBase}
                  style={{ backgroundColor: 'transparent' }}
                >
                  <option value="" className="bg-brand-charcoal text-brand-cream">{t('hero.passengersPlaceholder')}</option>
                  <option value="1-2" className="bg-brand-charcoal text-brand-cream">{t('hero.passengers12')}</option>
                  <option value="3-4" className="bg-brand-charcoal text-brand-cream">{t('hero.passengers34')}</option>
                  <option value="5-6" className="bg-brand-charcoal text-brand-cream">{t('hero.passengers56')}</option>
                  <option value="7+" className="bg-brand-charcoal text-brand-cream">{t('hero.passengers7')}</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-brand-cream/50 mb-2 font-semibold">
                  <svg className="w-3.5 h-3.5 text-brand-cream/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                  </svg>
                  {t('hero.tripType')}
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className={inputBase}
                  style={{ backgroundColor: 'transparent' }}
                >
                  <option value="" className="bg-brand-charcoal text-brand-cream">{t('hero.tripPlaceholder')}</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-brand-charcoal text-brand-cream">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#booking" className="btn-primary flex-1 text-center rounded-lg">
                <span>{t('hero.requestQuote')}</span>
              </a>
              <button
                onClick={handleQuickBooking}
                className="btn-outline rounded-lg gap-2 flex-shrink-0"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t('hero.whatsappBook')}
              </button>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-[13px] text-brand-cream/35 font-body"
          >
            {t('hero.socialProof')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
