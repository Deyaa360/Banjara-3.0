import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { AnimatedSection, ResponsiveContainer, SectionHeader, SafeImage } from '@/components/common';
import { useCarousel } from '@/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  quote: string;
  image?: string;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  title = "What Our Guests Say",
  subtitle = "Hear from our valued patrons about their dining experiences",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    currentIndex,
    isTransitioning,
    nextSlide,
    prevSlide,
    goToSlide,
    setIsPaused,
  } = useCarousel({
    itemCount: testimonials.length,
    autoPlay: true,
    interval: 6000,
  });

  // Height animation fix
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
  const testimonialRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  useEffect(() => {
    if (testimonialRef.current) {
      setContainerHeight(testimonialRef.current.offsetHeight);
    }
    // Recalculate height on window resize
    const handleResize = () => {
      if (testimonialRef.current) {
        setContainerHeight(testimonialRef.current.offsetHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.3, 
              delay: 0.1 * i,
              ease: "easeOut" 
            }}
          >
            <Star 
              className={`w-5 h-5 ${i < rating ? 'text-gold-400 fill-gold-400' : 'text-charcoal-400 stroke-charcoal-400'}`}
              strokeWidth={i < rating ? 0 : 1.5}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  const { themeMode } = useTheme();
  
  // Apply theme-specific styles
  const bgColor = themeMode === 'dark' 
    ? 'bg-charcoal-900' 
    : 'bg-walnut-50';
  
  const textColor = themeMode === 'dark'
    ? 'text-beige-100'
    : 'text-walnut-800';
    

  const cardBg = themeMode === 'dark'
    ? 'bg-charcoal-800 border-gold-500/20'
    : 'bg-walnut-300/30 border-walnut-600/40 backdrop-blur-sm';
    
  const quoteColor = themeMode === 'dark'
    ? 'text-charcoal-700'
    : 'text-walnut-600';

  return (
    <section className={`relative bg-walnut-400 overflow-hidden`}>
      {/* --- Wave Divider for Seamless Transition --- */}
      <div className="w-full overflow-hidden mb-0 -mt-1" style={{ pointerEvents: 'none' }}>
        <svg 
          className="w-full h-16 sm:h-20 md:h-24 lg:h-32"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          style={{ display: 'block', position: 'relative', zIndex: 1, pointerEvents: 'auto' }}
        >
          <g fill="#1a1a1a">
            <path d="M1000 0H0v52C62.5 28 125 4 250 4c250 0 250 96 500 96 125 0 187.5-24 250-48V0Z"></path>
          </g>
        </svg>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large walnut circle in center-right */}
        <div 
          className="absolute top-1/2 right-1/3 transform -translate-y-1/2" 
          style={{ 
            width: '800px', 
            height: '800px', 
            background: themeMode === 'dark'
              ? 'radial-gradient(circle, rgba(121, 89, 57, 0.15) 0%, rgba(121, 89, 57, 0.05) 60%, transparent 100%)'
              : 'radial-gradient(circle, rgba(121, 89, 57, 0.3) 0%, rgba(121, 89, 57, 0.1) 60%, transparent 100%)',
            filter: 'blur(120px)',
            opacity: 0.8
          }}
        ></div>
        
        {/* Extra large gold circle in bottom-left */}
        <div 
          className="absolute bottom-0 left-0 transform translate-y-1/4" 
          style={{ 
            width: '1000px', 
            height: '1000px', 
            background: themeMode === 'dark'
              ? 'radial-gradient(circle, rgba(230, 192, 122, 0.15) 0%, rgba(230, 192, 122, 0.05) 60%, transparent 100%)'
              : 'radial-gradient(circle, rgba(230, 192, 122, 0.25) 0%, rgba(230, 192, 122, 0.1) 60%, transparent 100%)',
            filter: 'blur(150px)',
            opacity: 0.7
          }}
        ></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23715436\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        ></div>
        
        {/* Decorative quote marks */}
        <div className="absolute top-20 left-10 opacity-10">
          <Quote size={200} className={quoteColor} />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10 transform rotate-180">
          <Quote size={200} className={quoteColor} />
        </div>
      </div>

      <ResponsiveContainer>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <SectionHeader
            title={title}
            subtitle={subtitle}
            accentWord="Guests"
            size="large"
            decorative={true}
            theme="light"
          />
        </motion.div>

        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Testimonial Carousel */}
          <motion.div
            animate={{ height: containerHeight || 'auto' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden rounded-3xl"
            style={{ position: 'relative' }}
          >
            <AnimatePresence mode="sync">
              <motion.div 
                key={`testimonial-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
                ref={testimonialRef}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id} 
                    className={`${index === currentIndex ? 'block' : 'hidden'}`}
                  >
                    <div className={`${cardBg} rounded-3xl p-10 sm:p-12 md:p-16 border shadow-[0_8px_25px_-8px_rgba(79,59,38,0.15)] relative overflow-hidden`}>
                      {/* Subtle texture overlay */}
                      <div className="absolute inset-0 opacity-8" 
                        style={{ 
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23715436\' fill-opacity=\'0.15\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'1\'/%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'1\'/%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'1\'/%3E%3Ccircle cx=\'20\' cy=\'40\' r=\'0.5\'/%3E%3Ccircle cx=\'40\' cy=\'20\' r=\'0.5\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        }}
                      ></div>
                      {/* Subtle gradient overlay for depth */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${themeMode === 'dark' ? 'from-charcoal-700/20 via-transparent to-charcoal-800/10' : 'from-walnut-200/40 via-transparent to-walnut-400/20'} rounded-3xl`}></div>
                      
                      <div className="text-center relative">
                        {/* Large decorative quote icon */}
                        <div className="flex justify-center mb-8">
                          <div className="w-16 h-16 rounded-full bg-walnut-500/20 flex items-center justify-center">
                            <Quote size={32} className={`${themeMode === 'dark' ? 'text-gold-400' : 'text-walnut-700'}`} />
                          </div>
                        </div>
                        
                        {/* Testimonial Text */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                        >
                          <p className={`text-xl md:text-2xl lg:text-3xl ${textColor} font-serif italic mb-8 leading-relaxed max-w-4xl mx-auto`}>
                            "{testimonial.quote}"
                          </p>
                        </motion.div>
                        
                        {/* Rating */}
                        <div className="mb-8 flex justify-center">
                          {renderStars(testimonial.rating)}
                        </div>
                        
                        {/* Author info */}
                        <div className="text-center">
                          <h4 className={`font-display ${textColor} font-semibold text-xl mb-2`}>{testimonial.name}</h4>
                          {testimonial.role && (
                            <p className={`${themeMode === 'dark' ? 'text-beige-200' : 'text-walnut-600'} text-sm font-serif italic`}>{testimonial.role}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-14 h-14 rounded-full ${
              themeMode === 'dark' 
                ? 'border-2 border-gold-500/40 text-gold-400 hover:text-gold-300 hover:border-gold-400/60 hover:bg-gold-500/10' 
                : 'border-2 border-walnut-700/50 text-walnut-700 hover:text-walnut-800 hover:border-walnut-800/70 hover:bg-walnut-700/10'
            } flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm`}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-14 h-14 rounded-full ${
              themeMode === 'dark' 
                ? 'border-2 border-gold-500/40 text-gold-400 hover:text-gold-300 hover:border-gold-400/60 hover:bg-gold-500/10' 
                : 'border-2 border-walnut-700/50 text-walnut-700 hover:text-walnut-800 hover:border-walnut-800/70 hover:bg-walnut-700/10'
            } flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm`}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* Indicator Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`transition-all duration-300 rounded-full relative ${
                  isActive 
                    ? `w-10 h-3 ${themeMode === 'dark' ? 'bg-gold-500 shadow-[0_2px_8px_rgba(212,175,55,0.5)]' : 'bg-walnut-700 shadow-[0_2px_8px_rgba(121,89,57,0.5)]'}` 
                    : `w-3 h-3 ${themeMode === 'dark' ? 'bg-gold-500/40 hover:bg-gold-500/60' : 'bg-walnut-500/60 hover:bg-walnut-600/80'}`
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                {isActive && (
                  <span className={`absolute inset-0 rounded-full animate-ping ${themeMode === 'dark' ? 'bg-gold-500/30' : 'bg-walnut-500/30'}`} style={{ animationDuration: '1.5s' }}></span>
                )}
              </button>
            );
          })}
        </div>
      </ResponsiveContainer>
    </section>
  );
};

export default TestimonialsSection;