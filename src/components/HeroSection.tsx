
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const slides = [
    {
      image: '/lovable-uploads/1.png',
      title: "L'Élégance\nProfessionnelle",
      subtitle: "Découvrez notre collection exclusive de tenues professionnelles"
    },
    {
      image: '/lovable-uploads/2.png',
      title: "Style &\nRaffinement",
      subtitle: "Une collection qui allie confort et élégance"
    },
    {
      image: '/lovable-uploads/3.png',
      title: "Excellence\nArtisanale",
      subtitle: "Des pièces uniques créées avec passion"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative min-h-[60vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="h-full w-full flex items-center justify-center">
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-contain md:object-cover"
              style={{ 
                transform: `translateY(${scrollY * 0.2}px)`,
                maxHeight: '100%'
              }}
            />
          </div>
        </div>
      ))}
      
      {/* Overlay with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-sans text-5xl font-bold leading-tight md:text-7xl whitespace-pre-line mb-8"
          >
            {slides[currentSlide].title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 font-body text-xl md:text-2xl mb-10 max-w-2xl mx-auto"
          >
            {slides[currentSlide].subtitle}
          </motion.p>

          {/* Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
