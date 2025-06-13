import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  once?: boolean;
  amount?: number;
  duration?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  once = true,
  amount = 30,
  duration = 0.8,
}) => {
  // Define animation variants based on direction
  const getVariants = () => {
    const variants = {
      hidden: {
        opacity: 0,
        y: direction === 'up' ? amount : direction === 'down' ? -amount : 0,
        x: direction === 'left' ? amount : direction === 'right' ? -amount : 0,
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1.0],
        },
      },
    };
    
    return variants;
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-100px" }}
      variants={getVariants()}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;