import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star, MapPin, Flame, Leaf } from 'lucide-react';
import { useCarousel } from '@/hooks';

interface FeaturedDish {
  id: string;
  name: string;
  description: string;
  image: string;
  region: string;
  isVegetarian: boolean;
  isSignature: boolean;
  spiceLevel: number;
}

interface FeaturedDishesCarouselProps {
  dishes: FeaturedDish[];
}

const FeaturedDishesCarousel: React.FC<FeaturedDishesCarouselProps> = ({ dishes }) => {
  // Use a default value for server-side rendering to avoid hydration mismatch
  const [windowWidth, setWindowWidth] = useState(1024);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const { 
    currentIndex, 
    isTransitioning, 
    nextSlide, 
    prevSlide, 
    goToSlide,
    setIsPaused,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useCarousel({
    itemCount: dishes.length,
    autoPlay: true,
    interval: 6000,
  });

  // Initialize client-side values and add window resize listener
  useEffect(() => {
    setIsClient(true);
    setWindowWidth(window.innerWidth);
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get visible dishes (center + sides)
  const getVisibleDishes = () => {
    const visibleDishes = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + dishes.length) % dishes.length;
      visibleDishes.push({
        dish: dishes[index],
        position: i,
        index: index
      });
    }
    return visibleDishes;
  };

  const renderSpiceLevel = (level: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(3)].map((_, i) => (
          <Flame 
            key={i} 
            className={`${i < level ? 'text-amber-400 fill-current' : 'text-stone-400/50'} w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative py-2 sm:py-3 md:py-4 overflow-hidden">
      {/* Carousel container */}
      <div 
        className="relative h-[800px] sm:h-[980px] lg:h-[1000px] perspective-1000"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart as any}
        onTouchMove={handleTouchMove as any}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left and right clickable areas with swipe indicators for all screen sizes */}
        <div 
          className="absolute left-0 top-0 w-1/3 h-full z-30 cursor-pointer flex items-center" 
          onClick={prevSlide} 
          aria-label="Previous slide"
        >
          <div className="w-10 h-10 ml-3 sm:ml-5 bg-black/30 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10 hover:border-amber-400/30 group">
            <ChevronLeft size={24} className="text-white/70 group-hover:text-amber-300" />
          </div>
        </div>
        <div 
          className="absolute right-0 top-0 w-1/3 h-full z-30 cursor-pointer flex items-center justify-end" 
          onClick={nextSlide} 
          aria-label="Next slide"
        >
          <div className="w-10 h-10 mr-3 sm:mr-5 bg-black/30 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10 hover:border-amber-400/30 group">
            <ChevronRight size={24} className="text-white/70 group-hover:text-amber-300" />
          </div>
        </div>
        
        <style jsx global>{`
          @keyframes shineEffect {
            0% { transform: translateX(-120%); }
            100% { transform: translateX(120%); }
          }
          
          .shine-effect {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg, 
              transparent 0%, 
              rgba(255, 255, 255, 0.25) 50%, 
              transparent 100%
            );
            transform: translateX(-100%);
            animation: shineEffect 0.4s cubic-bezier(0.1, 0.7, 0.9, 1) forwards;
            animation-delay: 0.1s;
            pointer-events: none;
            z-index: 20;
          }
          
          .menu-btn-arrow {
            transition: transform 0.3s ease;
          }
          
          .menu-btn:hover .menu-btn-arrow {
            transform: translateX(4px);
          }
          
          .perspective-1000 {
            perspective: 1000px;
          }
          
          @keyframes floatUp {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          .active-card, .side-card {
            transition: all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
            will-change: transform, opacity;
          }
          
          .card-enter {
            animation: cardEnter 0.4s forwards cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          @keyframes cardEnter {
            0% { transform: scale(0.95); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }
          
          .card-content-enter {
            animation: none;
          }
          
          @keyframes contentEnter {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}</style>

        <div className="w-full h-full flex justify-center items-center card-container relative">
          {getVisibleDishes().map(({ dish, position, index }) => {
            const isActive = position === 0;
            const cardClasses = isActive 
              ? "active-card" 
              : "side-card cursor-pointer hover:opacity-70";
            
            return (
              <div
                key={`${dish.id}-${position}`}
                className={`absolute ${cardClasses} ${isActive ? 'card-enter' : ''}`}
                onClick={() => position !== 0 && goToSlide(index)}
                style={{
                  opacity: isActive ? 1 : 0.4,
                  // Use a consistent transform value for server-side rendering to avoid hydration mismatch
                  transform: isClient 
                    ? `translateX(${position * (windowWidth < 640 ? 400 : windowWidth < 1024 ? 550 : 900)}px) translateY(${isActive ? '0' : '0'}) scale(${isActive ? 1 : 0.7}) ${position < 0 ? 'rotateY(5deg)' : position > 0 ? 'rotateY(-5deg)' : ''}`
                    : `translateX(${position * 900}px) translateY(0) scale(${isActive ? 1 : 0.7}) ${position < 0 ? 'rotateY(5deg)' : position > 0 ? 'rotateY(-5deg)' : ''}`,
                  filter: !isActive ? 'blur(2px)' : 'none',
                  transformStyle: 'preserve-3d',
                  zIndex: isActive ? 10 : 5,
                  transformOrigin: position < 0 ? 'right center' : position > 0 ? 'left center' : 'center center',
                  willChange: 'transform, opacity'
                }}
              >
                <div 
                  className={`w-[380px] sm:w-[520px] lg:w-[850px] h-[650px] sm:h-[850px] lg:h-[800px] rounded-2xl overflow-hidden`}
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Image without hover effect */}
                  <div className="relative w-full h-full">
                    <Image 
                      src={dish.image}
                      alt={dish.name}
                      fill
                      priority={isActive}
                      sizes="(max-width: 768px) 90vw, 450px"
                      className="object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
                    
                    {/* Shine effect wrapper to prevent layout shifts */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {isActive && (
                        <div className="shine-effect" />
                      )}
                    </div>
                    
                    {/* Indicators with subtle animations */}
                    <div className="absolute top-8 sm:top-12 lg:top-16 right-8 sm:right-12 lg:right-16 flex flex-col gap-2 z-10">
                      {dish.isVegetarian && (
                        <div className="w-8 h-8 bg-stone-900/60 backdrop-blur-md border border-green-400/30 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:scale-110">
                          <Leaf className="w-4 h-4 text-green-400/80" />
                        </div>
                      )}
                      {dish.isSignature && (
                        <div className="w-8 h-8 bg-stone-900/60 backdrop-blur-md border border-amber-400/30 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:scale-110">
                          <Star className="w-4 h-4 text-amber-400/80" />
                        </div>
                      )}
                    </div>
                    
                    {/* Content with improved transitions and increased padding from borders */}
                    <div className={`absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16 z-10 ${isActive && !isTransitioning ? 'card-content-enter' : ''}`}>
                      {/* Region with animation */}
                      {dish.region && (
                        <div className="flex items-center gap-2 mb-3 sm:mb-4 md:mb-5">
                          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                          <span className="text-amber-300 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                            {dish.region}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-2 sm:mb-3 lg:mb-4 leading-tight drop-shadow-lg">
                        {dish.name}
                      </h3>

                      {/* Description */}
                      <p className="text-stone-200 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-3 sm:mb-4 lg:mb-5 line-clamp-3 lg:line-clamp-4 drop-shadow-md">
                        {dish.description}
                      </p>

                      {/* Bottom Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className="text-xs sm:text-sm md:text-base text-stone-300 font-semibold tracking-wide">Spice Level:</span>
                          {renderSpiceLevel(dish.spiceLevel)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Indicator Dots with improved animations */}
      <div className="flex justify-center gap-3 mt-8">
        {dishes.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className="transition-all duration-500 rounded-full relative"
              style={{
                width: isActive ? '32px' : '12px',
                height: '12px',
                backgroundColor: isActive ? '#e6c07a' : 'rgba(196, 181, 151, 0.3)',
                boxShadow: isActive ? '0 2px 8px rgba(230, 192, 122, 0.4)' : 'none',
                transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-full animate-ping bg-amber-400/30" style={{ animationDuration: '1.5s' }}></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedDishesCarousel;