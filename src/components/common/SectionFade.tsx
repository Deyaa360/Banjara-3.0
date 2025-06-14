import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface SectionFadeProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  delay?: number;
  distance?: number;
  threshold?: number;
  once?: boolean;
  staggerChildren?: boolean;
  staggerDelay?: number;
  withOverlap?: boolean;
  defaultTheme?: 'dark' | 'light';
}

export const SectionFade: React.FC<SectionFadeProps> = ({
  children,
  className = '',
  direction = 'up',
  duration = 0.8,
  delay = 0,
  distance = 50,
  threshold = 0.1,
  once = true,
  staggerChildren = false,
  staggerDelay = 0.1,
  withOverlap = false,
  defaultTheme = 'dark',
}) => {
  // Try to get theme from context, fall back to defaultTheme if not available
  let themeMode: 'dark' | 'light' = defaultTheme;
  try {
    const context = useTheme();
    if (context) {
      themeMode = context.themeMode;
    }
  } catch (error) {
    // If useTheme throws an error, use the defaultTheme
    console.warn('SectionFade: Using defaultTheme because component is not within a ThemeProvider');
  }
  
  // Set initial animation values based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      default: return { y: distance };
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, ...getInitialPosition() },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for smooth easing
        when: "beforeChildren",
        staggerChildren: staggerChildren ? staggerDelay : 0,
      }
    }
  };
  
  // Child variants for staggered animations
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: duration * 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };
  
  // Optional gradient overlay for smoother transitions
  const gradientOverlay = withOverlap && (
    <div 
      className={`absolute inset-0 pointer-events-none z-10 ${
        direction === 'up' ? 'bg-gradient-to-b' : 
        direction === 'down' ? 'bg-gradient-to-t' : 
        direction === 'left' ? 'bg-gradient-to-r' : 
        'bg-gradient-to-l'
      } ${
        themeMode === 'dark' ? 
        'from-charcoal-900 via-charcoal-900/50 to-transparent' : 
        'from-walnut-50 via-walnut-50/50 to-transparent'
      }`}
      style={{ opacity: 0.7 }}
    />
  );
  
  return (
    <motion.div
      className={cn("relative", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={containerVariants}
    >
      {staggerChildren ? (
        React.Children.map(children, (child, index) => (
          <motion.div key={index} variants={childVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        children
      )}
      
      {gradientOverlay}
    </motion.div>
  );
};

export default SectionFade;