import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCarousel } from '@/hooks';
import { Button, SafeImage } from '@/components/common';

interface BannerSlide {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  accent: string;
}

interface BannerHeroProps {
  slides: BannerSlide[];
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export const BannerHero: React.FC<BannerHeroProps> = ({
  slides,
  primaryButtonText = 'Reserve a Table',
  primaryButtonLink = '/reservations',
  secondaryButtonText = 'View Menu',
  secondaryButtonLink = '/menu',
}) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [targetSlideIndex, setTargetSlideIndex] = useState(0);
  const [transitionPhase, setTransitionPhase] = useState('idle'); // 'idle', 'fadeOut', 'fadeIn'
  
  const { 
    currentIndex, 
    isTransitioning, 
    nextSlide, 
    prevSlide, 
    goToSlide 
  } = useCarousel({
    itemCount: slides.length,
    autoPlay: true,
    interval: 6000,
  });

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle slide transition
  const initiateTransition = (targetSlide: number) => {
    if (transitionPhase === 'idle' && targetSlide !== currentIndex) {
      setTargetSlideIndex(targetSlide);

      // Phase 1: Quick fade out (0.4s)
      setTransitionPhase('fadeOut');

      setTimeout(() => {
        // Phase 2: Switch content and fade in (0.6s)
        goToSlide(targetSlide);
        setTransitionPhase('fadeIn');

        setTimeout(() => {
          // Phase 3: Return to idle
          setTransitionPhase('idle');
        }, 600);
      }, 400);
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Smooth Crossfade Images with Continuous Zoom */}
      <AnimatePresence>
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          const isNext = index === targetSlideIndex && transitionPhase !== 'idle';

          return (
            <motion.div
              key={`image-${index}`}
              initial={{ opacity: 0, scale: 1 }}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.15 : 1,
                transition: {
                  opacity: { 
                    duration: isActive ? 0.6 : 0.4,
                    ease: "easeInOut"
                  },
                  scale: {
                    duration: isActive ? 6 : 0.4,
                    ease: isActive ? "linear" : "easeOut"
                  }
                }
              }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="absolute inset-0 w-full h-full"
              style={{
                zIndex: isActive ? 2 : 0
              }}
            >
              <div className="relative w-full h-full" style={{ minHeight: '100%' }}>
                <SafeImage
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  priority={index === 0}
                  className="object-cover"
                  quality={90}
                />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Much Darker Heritage Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(135deg,
            rgba(28, 28, 28, 0.85) 0%,
            rgba(28, 28, 28, 0.75) 25%,
            rgba(196, 181, 151, 0.1) 50%,
            rgba(28, 28, 28, 0.75) 75%,
            rgba(28, 28, 28, 0.85) 100%)`
        }}
      ></div>
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to top,
            rgba(28, 28, 28, 0.85) 0%,
            rgba(28, 28, 28, 0.75) 50%,
            rgba(28, 28, 28, 0.85) 100%)`
        }}
      ></div>
      {/* Heavy Edge Darkening */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `radial-gradient(ellipse at center,
            transparent 25%,
            rgba(28, 28, 28, 0.3) 60%,
            rgba(28, 28, 28, 0.6) 90%,
            rgba(28, 28, 28, 0.8) 100%)`
        }}
      ></div>

      {/* Content with Beautiful Text Effects */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="container text-center text-white">
          <div className="max-w-5xl mx-auto">
            {/* Title */}
            <h1
              key={`title-${currentIndex}`}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 md:mb-6 leading-tight tracking-wide"
              style={{
                color: '#d9c5a0',
                textShadow: '0 4px 10px rgba(0,0,0,0.8)',
                fontFamily: 'var(--font-display)',
                transform: transitionPhase === 'fadeOut' ? 'translateY(-20px)' :
                          transitionPhase === 'fadeIn' ? 'translateY(30px)' :
                          'translateY(0px)',
                opacity: transitionPhase === 'idle' ? 1 : 0,
                transition: transitionPhase === 'fadeOut'
                  ? 'all 0.4s cubic-bezier(0.4, 0, 0.6, 1)'
                  : 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                letterSpacing: '0.05em',
                wordSpacing: '0.2em'
              }}
            >
              {slides[currentIndex].title.split(' ').map((word, index) => (
                <span
                  key={`${currentIndex}-${index}`}
                  className="inline-block"
                  style={{
                    transform: transitionPhase === 'fadeOut' ? 'translateY(-15px)' :
                              transitionPhase === 'fadeIn' ? 'translateY(20px)' :
                              'translateY(0px)',
                    opacity: transitionPhase === 'idle' ? 1 : 0,
                    transition: transitionPhase === 'fadeOut'
                      ? `all 0.4s cubic-bezier(0.4, 0, 0.6, 1) ${index * 0.05}s`
                      : `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + (index * 0.1)}s`,
                    marginRight: '0.2em'
                  }}
                >
                  {word === slides[currentIndex].accent ? (
                    <span
                      style={{
                        color: '#e6c07a',
                        textShadow: '0 4px 15px rgba(0,0,0,0.9), 0 0 20px rgba(230, 192, 122, 0.3)'
                      }}
                    >
                      {word}
                    </span>
                  ) : (
                    <span>{word}</span>
                  )}
                </span>
              ))}
            </h1>

            {/* Enhanced Subtitle with Improved Typography */}
            <p
              key={`subtitle-${currentIndex}`}
              className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4"
              style={{
                color: '#c4b597',
                lineHeight: '1.8',
                fontWeight: 400,
                fontFamily: 'var(--font-body)',
                opacity: transitionPhase === 'idle' ? 1 : 0,
                transform: transitionPhase === 'fadeOut' ? 'translateY(-10px) scale(0.98)' :
                          transitionPhase === 'fadeIn' ? 'translateY(20px) scale(0.98)' :
                          'translateY(0) scale(1)',
                transition: transitionPhase === 'fadeOut'
                  ? 'all 0.4s cubic-bezier(0.4, 0, 0.6, 1) 0.05s'
                  : 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.65s',
                textShadow: '0 2px 4px rgba(0,0,0,0.4)',
              }}
            >
              {slides[currentIndex].subtitle.split(' ').map((word, index) => (
                <span
                  key={`subtitle-word-${currentIndex}-${index}`}
                  className="inline-block"
                  style={{
                    opacity: transitionPhase === 'idle' ? 1 : 0,
                    transform: transitionPhase === 'fadeOut' ? 'translateY(-5px)' :
                              transitionPhase === 'fadeIn' ? 'translateY(10px)' :
                              'translateY(0)',
                    transition: transitionPhase === 'fadeOut'
                      ? `all 0.3s cubic-bezier(0.4, 0, 0.6, 1) ${0.05 + (index * 0.01)}s`
                      : `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${0.7 + (index * 0.015)}s`,
                    marginRight: '0.25em'
                  }}
                >
                  {word}
                </span>
              ))}
            </p>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row justify-center gap-6"
              style={{
                opacity: transitionPhase === 'idle' ? 1 : 0,
                transform: transitionPhase === 'fadeOut' ? 'translateY(-5px)' :
                          transitionPhase === 'fadeIn' ? 'translateY(15px)' :
                          'translateY(0)',
                transition: transitionPhase === 'fadeOut'
                  ? 'opacity 0.3s cubic-bezier(0.4, 0, 0.6, 1) 0.1s, transform 0.3s cubic-bezier(0.4, 0, 0.6, 1) 0.1s'
                  : 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.8s, transform 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.8s',
              }}
            >
              {primaryButtonText && primaryButtonLink && (
                <Button 
                  variant="primary" 
                  size="lg" 
                  href={primaryButtonLink}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  }
                  iconPosition="right"
                >
                  {primaryButtonText}
                </Button>
              )}
              
              {secondaryButtonText && secondaryButtonLink && (
                <Button 
                  variant="secondary" 
                  size="lg" 
                  href={secondaryButtonLink}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  }
                  iconPosition="right"
                >
                  {secondaryButtonText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Hidden Until Hover, Full Height Clickable Areas */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-0 bottom-0 w-[15%] flex items-center justify-start pl-4 sm:pl-8 z-20 opacity-0 hover:opacity-100 transition-opacity duration-300 group"
        aria-label="Previous slide"
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-sm border border-white/10 group-hover:bg-black/30 group-hover:border-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-0 bottom-0 w-[15%] flex items-center justify-end pr-4 sm:pr-8 z-20 opacity-0 hover:opacity-100 transition-opacity duration-300 group"
        aria-label="Next slide"
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-sm border border-white/10 group-hover:bg-black/30 group-hover:border-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>

      {/* Banner Navigation - Exact Styling from Original */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => initiateTransition(index)}
              className={`transition-all duration-300 focus:outline-none`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div 
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-amber-400 scale-110"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                style={{
                  boxShadow: currentIndex === index ? '0 0 8px rgba(230, 192, 122, 0.6)' : 'none'
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerHero;