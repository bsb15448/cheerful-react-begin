
import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const slides = [
    {
      image: '/mainbg.png',
      title: "L'Élégance\nProfessionnelle",
      subtitle: "Découvrez notre collection exclusive de tenues professionnelles"
    },
    {
      image: '/banner2.jpg',
      title: "Style &\nRaffinement",
      subtitle: "Une collection qui allie confort et élégance"
    },
    {
      image: '/banner3.jpg',
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
    <section className="relative min-h-[57.6vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url("${slide.image}")`,
          }}
        />
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[57.6vh] items-center justify-center px-4">
        <div className="text-center text-white">
          <h1 className="animate-fade-in font-sans text-5xl font-bold leading-tight md:text-7xl whitespace-pre-line">
            {slides[currentSlide].title}
          </h1>
          <p className="mt-6 animate-fade-in-delayed font-body text-xl md:text-2xl">
            {slides[currentSlide].subtitle}
          </p>
          <a
            href="#products"
            className="group mt-8 inline-block animate-fade-in-delayed rounded-full bg-white px-8 py-4 font-sans font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg"
          >
            Explorer la Collection
          </a>

          {/* Navigation Dots */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex space-x-3">
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
          
          {/* Scroll Down Arrow */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>
    </section>
  );
};
