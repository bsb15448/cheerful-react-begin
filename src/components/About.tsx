import { motion } from 'framer-motion';
import { useI18n } from '../lib/i18n';

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="py-28 lg:py-40 section-padding">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative mb-20 lg:mb-28 overflow-hidden"
        >
          <img
            src="/images/experience-interior.jpg"
            alt="Intérieur confortable du van"
            className="w-full aspect-[21/9] object-cover"
            loading="lazy"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-brand-gold rounded-full" />
              <span className="text-[12px] tracking-[0.25em] uppercase text-brand-gold font-semibold">
                {t('about.tag')}
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.1] tracking-[-0.01em]">
              {t('about.title1')}
              <br />
              <em className="text-gradient-gold italic font-semibold">{t('about.title2')}</em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:pt-4"
          >
            <p className="text-[15px] text-brand-cream/60 leading-[1.9] mb-5">
              {t('about.p1')}
            </p>
            <p className="text-[15px] text-brand-cream/60 leading-[1.9] mb-10">
              {t('about.p2')}
            </p>

            <a href="#booking" className="btn-primary">
              <span>{t('about.cta')}</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
