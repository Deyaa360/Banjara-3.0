import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxScrollProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  overflow?: boolean;
  zIndex?: number;
  startOffset?: number;
  endOffset?: number;
}

export const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  children,
  className = '',
  speed = 0.2,
  direction = 'up',
  overflow = false,
  zIndex = 0,
  startOffset = 0,
  endOffset = 1,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Calculate scroll progress for this element
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${startOffset} 1`, `${endOffset} 0`]
  });
  
  // Transform the scroll progress into movement
  const getTransformValue = () => {
    const factor = speed * 100; // Convert to percentage
    
    switch (direction) {
      case 'up':
        return useTransform(scrollYProgress, [0, 1], [`${factor}%`, '0%']);
      case 'down':
        return useTransform(scrollYProgress, [0, 1], [`-${factor}%`, '0%']);
      case 'left':
        return useTransform(scrollYProgress, [0, 1], [`${factor}%`, '0%']);
      case 'right':
        return useTransform(scrollYProgress, [0, 1], [`-${factor}%`, '0%']);
      default:
        return useTransform(scrollYProgress, [0, 1], [`${factor}%`, '0%']);
    }
  };
  
  // Get the appropriate transform property
  const isHorizontal = direction === 'left' || direction === 'right';
  const transformValue = getTransformValue();
  
  return (
    <div 
      ref={ref}
      className={cn(
        "relative",
        overflow ? "overflow-visible" : "overflow-hidden",
        className
      )}
      style={{ zIndex }}
    >
      <motion.div
        style={{
          [isHorizontal ? 'x' : 'y']: transformValue,
          width: '100%',
          height: '100%'
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxScroll;