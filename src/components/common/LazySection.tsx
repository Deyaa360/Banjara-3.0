'use client';

import React, { ReactNode, useRef } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  once?: boolean;
  placeholder?: ReactNode;
  delay?: number;
  rootMargin?: string;
  id?: string;
}

/**
 * A component that lazily renders its children when they come into view.
 * Useful for below-the-fold content to improve initial page load performance.
 */
export const LazySection: React.FC<LazySectionProps> = ({
  children,
  className = '',
  threshold = 0.1,
  once = true,
  placeholder,
  delay = 0,
  id,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once, 
    amount: threshold
  });
  
  // If delay is provided, we'll use a timeout to render the children
  const [shouldRender, setShouldRender] = React.useState(delay === 0);
  
  React.useEffect(() => {
    if (isInView && !shouldRender && delay > 0) {
      const timer = setTimeout(() => {
        setShouldRender(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, shouldRender, delay]);
  
  return (
    <div ref={ref} className={cn(className)} id={id}>
      {isInView && shouldRender ? (
        children
      ) : (
        placeholder || (
          <div className="w-full h-full min-h-[200px] bg-charcoal-800/10 animate-pulse rounded-lg"></div>
        )
      )}
    </div>
  );
};

export default LazySection;