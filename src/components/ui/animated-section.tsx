'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  once?: boolean;
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 50,
  once = true,
}: AnimatedSectionProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Define animation variants based on direction
  const getVariants = (): Variants => {
    let initial = {};
    
    switch (direction) {
      case 'up':
        initial = { y: distance, opacity: 0 };
        break;
      case 'down':
        initial = { y: -distance, opacity: 0 };
        break;
      case 'left':
        initial = { x: distance, opacity: 0 };
        break;
      case 'right':
        initial = { x: -distance, opacity: 0 };
        break;
      default:
        initial = { y: distance, opacity: 0 };
    }
    
    return {
      hidden: initial,
      visible: { 
        x: 0, 
        y: 0, 
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          delay: delay
        }
      }
    };
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          controls.start('visible');
        } else if (!entry.isIntersecting && !once && isInView) {
          setIsInView(false);
          controls.start('hidden');
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls, isInView, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
}