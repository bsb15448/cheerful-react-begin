import { motion } from 'framer-motion';
import { useI18n } from '../lib/i18n';

export default function Testimonials() {
  const { t } = useI18n();

  const testimonials = [
    { text: t('testimonials.t1'), author: t('testimonials.t1.author'), role: t('testimonials.t1.role') },
    { text: t('testimonials.t2'), author: t('testimonials.t2.author'), role: t('testimonials.t2.role') },
    { text: t('testimonials.t3'), author: t('testimonials.t3.author'), role: t('testimonials.t3.role') },
  ];

  return (
    <section className="py-28 lg:py-40 bg-brand-dark section-padding">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-20"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-brand-gold rounded-full" />
              <span className="text-[12px] tracking-[0.25em] uppercase text-brand-gold font-semibold">
                {t('testimonials.tag')}
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.1]">
              {t('testimonials.title1')}
              <br />
              <em className="text-gradient-gold italic font-semibold">{t('testimonials.title2')}</em>
            </h2>
          </div>
          <a href="#booking" className="btn-primary text-[13px] !py-3 !px-7 self-start lg:self-auto">
            <span>{t('testimonials.cta')}</span>
          </a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="card-glass p-7 lg:p-8 flex flex-col justify-between rounded-lg"
            >
              <div>
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-brand-gold text-[13px]">★</span>
                  ))}
                </div>
                <p className="text-[14px] text-brand-cream/65 leading-[1.8]">
                  « {item.text} »
                </p>
              </div>

              <div className="mt-7 pt-5 border-t border-brand-charcoal/20">
                <div className="font-display text-base font-medium">{item.author}</div>
                <div className="text-[11px] text-brand-muted/60 tracking-wider mt-1">{item.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
