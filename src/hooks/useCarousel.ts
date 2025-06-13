import { useState, useEffect, useCallback } from 'react';

interface UseCarouselOptions {
  itemCount: number;
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
}

export function useCarousel({
  itemCount,
  autoPlay = true,
  interval = 5000,
  loop = true,
}: UseCarouselOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Handle next slide
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (currentIndex === itemCount - 1) {
      if (loop) {
        setCurrentIndex(0);
      }
    } else {
      setCurrentIndex(prev => prev + 1);
    }
    
    setTimeout(() => setIsTransitioning(false), 500);
  }, [currentIndex, isTransitioning, itemCount, loop]);

  // Handle previous slide
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (currentIndex === 0) {
      if (loop) {
        setCurrentIndex(itemCount - 1);
      }
    } else {
      setCurrentIndex(prev => prev - 1);
    }
    
    setTimeout(() => setIsTransitioning(false), 500);
  }, [currentIndex, isTransitioning, itemCount, loop]);

  // Go to specific slide
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [currentIndex, isTransitioning]);

  // Auto-advance slides
  useEffect(() => {
    if (!autoPlay || isPaused || isTransitioning) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, isPaused, isTransitioning, interval, nextSlide]);

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement> | TouchEvent) => {
    setTouchEnd(null);
    if ('touches' in e && e.touches && e.touches.length > 0) {
      setTouchStart(e.touches[0].clientX);
    } else if ('clientX' in e && typeof e.clientX === 'number') {
      setTouchStart(e.clientX);
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement> | TouchEvent) => {
    if ('touches' in e && e.touches && e.touches.length > 0) {
      setTouchEnd(e.touches[0].clientX);
    } else if ('clientX' in e && typeof e.clientX === 'number') {
      setTouchEnd(e.clientX);
    }
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return {
    currentIndex,
    isTransitioning,
    nextSlide,
    prevSlide,
    goToSlide,
    setIsPaused,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}

export default useCarousel;