import { motion } from 'framer-motion';
import { useI18n } from '../lib/i18n';

export default function WhyChooseUs() {
  const { t } = useI18n();

  const reasons = [
    { title: t('why.r1.title'), desc: t('why.r1.desc') },
    { title: t('why.r2.title'), desc: t('why.r2.desc') },
    { title: t('why.r3.title'), desc: t('why.r3.desc') },
    { title: t('why.r4.title'), desc: t('why.r4.desc') },
    { title: t('why.r5.title'), desc: t('why.r5.desc') },
  ];

  return (
    <section className="py-28 lg:py-40 section-padding">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-brand-gold rounded-full" />
              <span className="text-[12px] tracking-[0.25em] uppercase text-brand-gold font-semibold">
                {t('why.tag')}
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.1] mb-5">
              {t('why.title1')}
              <br />
              <em className="text-gradient-gold italic font-semibold">{t('why.title2')}</em>
            </h2>
            <p className="text-[15px] text-brand-cream/50 leading-[1.8] max-w-md">
              {t('why.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 relative"
          >
            <img
              src="/images/chauffeur.jpg"
              alt="Chauffeur professionnel"
              className="w-full aspect-[4/5] object-cover object-top"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/30 to-transparent" />
          </motion.div>
        </div>

        <div className="lg:pt-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group py-7 border-b border-brand-charcoal/20 first:border-t"
            >
              <div className="flex items-start gap-5">
                <span className="font-display text-[1.6rem] font-light text-brand-gold/25 leading-none mt-0.5 flex-shrink-0 w-8">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-lg lg:text-xl font-medium mb-1.5 group-hover:text-brand-gold transition-colors duration-300">
                    {r.title}
                  </h3>
                  <p className="text-[13px] text-brand-cream/50 leading-[1.8]">{r.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10"
          >
            <a href="#booking" className="btn-primary">
              <span>{t('why.cta')}</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
