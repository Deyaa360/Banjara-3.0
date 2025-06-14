import { useCallback } from 'react';

interface SmoothScrollOptions {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
}

/**
 * Custom hook for smooth scrolling to elements or positions
 */
export const useSmoothScroll = () => {
  // Default easing function (easeInOutCubic)
  const defaultEasing = (t: number): number => {
    return t < 0.5 
      ? 4 * t * t * t 
      : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  /**
   * Smoothly scrolls to a specific element
   */
  const scrollToElement = useCallback((
    elementId: string, 
    options: SmoothScrollOptions = {}
  ) => {
    const {
      offset = 0,
      duration = 1000,
      easing = defaultEasing
    } = options;

    const targetElement = document.getElementById(elementId);
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
    scrollToPosition(targetPosition, { duration, easing });
  }, []);

  /**
   * Smoothly scrolls to a specific position
   */
  const scrollToPosition = useCallback((
    targetPosition: number,
    options: SmoothScrollOptions = {}
  ) => {
    const {
      duration = 1000,
      easing = defaultEasing
    } = options;

    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easing(progress);

      window.scrollTo(0, startPosition + distance * easedProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  /**
   * Smoothly scrolls to the next section
   */
  const scrollToNextSection = useCallback((
    currentSectionId: string,
    options: SmoothScrollOptions = {}
  ) => {
    const currentSection = document.getElementById(currentSectionId);
    if (!currentSection) return;

    // Find all sections
    const allSections = Array.from(document.querySelectorAll('section[id]'));
    const currentIndex = allSections.findIndex(section => section.id === currentSectionId);
    
    if (currentIndex >= 0 && currentIndex < allSections.length - 1) {
      const nextSection = allSections[currentIndex + 1];
      scrollToElement(nextSection.id, options);
    }
  }, [scrollToElement]);

  return {
    scrollToElement,
    scrollToPosition,
    scrollToNextSection
  };
};

export default useSmoothScroll;