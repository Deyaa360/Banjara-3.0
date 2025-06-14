import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  effect?: 'fade' | 'slide' | 'scale' | 'rotate' | 'flip' | 'stagger';
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
  staggerDelay?: number;
  distance?: number;
  rotate?: number;
  defaultTheme?: 'dark' | 'light';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  effect = 'fade',
  direction = 'up',
  duration = 0.6,
  delay = 0,
  threshold = 0.1,
  once = true,
  staggerDelay = 0.1,
  distance = 50,
  rotate = 10,
}) => {
  // Initial animation states based on effect and direction
  const getInitialState = () => {
    const initial: any = { opacity: 0 };
    
    switch (effect) {
      case 'fade':
        return initial;
      
      case 'slide':
        switch (direction) {
          case 'up': return { ...initial, y: distance };
          case 'down': return { ...initial, y: -distance };
          case 'left': return { ...initial, x: distance };
          case 'right': return { ...initial, x: -distance };
          default: return { ...initial, y: distance };
        }
      
      case 'scale':
        return { ...initial, scale: 0.8 };
      
      case 'rotate':
        return { 
          ...initial, 
          rotate: direction === 'left' ? -rotate : rotate,
          transformOrigin: 'center' 
        };
      
      case 'flip':
        return { 
          ...initial, 
          rotateX: direction === 'up' || direction === 'down' ? 90 : 0,
          rotateY: direction === 'left' || direction === 'right' ? 90 : 0,
          transformPerspective: 1000
        };
      
      case 'stagger':
        switch (direction) {
          case 'up': return { ...initial, y: distance };
          case 'down': return { ...initial, y: -distance };
          case 'left': return { ...initial, x: distance };
          case 'right': return { ...initial, x: -distance };
          default: return { ...initial, y: distance };
        }
      
      default:
        return initial;
    }
  };
  
  // Animation variants
  const variants = {
    hidden: getInitialState(),
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      scale: 1, 
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for smooth easing
        staggerChildren: effect === 'stagger' ? staggerDelay : 0,
        when: effect === 'stagger' ? "beforeChildren" : undefined,
      }
    }
  };
  
  // Child variants for staggered animations
  const childVariants = {
    hidden: getInitialState(),
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: duration,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };
  
  return (
    <motion.div
      className={cn("", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variants}
    >
      {effect === 'stagger' ? (
        React.Children.map(children, (child, index) => (
          <motion.div key={index} variants={childVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        children
      )}
    </motion.div>
  );
};

export default ScrollReveal;