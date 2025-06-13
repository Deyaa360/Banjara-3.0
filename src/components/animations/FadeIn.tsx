import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ 
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: 'easeOut',
        }
      }}
      viewport={{ once, margin: "-100px" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;