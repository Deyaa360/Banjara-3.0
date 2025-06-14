import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

interface ScrollIndicatorProps {
  className?: string;
  type?: 'progress' | 'dots' | 'line';
  position?: 'top' | 'bottom' | 'left' | 'right';
  showBackground?: boolean;
  sections?: string[];
  onSectionChange?: (section: string) => void;
  defaultTheme?: 'dark' | 'light';
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  className = '',
  type = 'progress',
  position = 'top',
  showBackground = true,
  sections = [],
  onSectionChange,
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
    console.warn('ScrollIndicator: Using defaultTheme because component is not within a ThemeProvider');
  }
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const [activeSection, setActiveSection] = useState<string>('');
  
  // Determine if the indicator is horizontal or vertical
  const isHorizontal = position === 'top' || position === 'bottom';
  
  // Determine position classes
  const positionClasses = {
    top: 'top-0 left-0 right-0',
    bottom: 'bottom-0 left-0 right-0',
    left: 'left-0 top-0 bottom-0',
    right: 'right-0 top-0 bottom-0',
  };
  
  // Determine background and indicator colors based on theme
  const bgColor = themeMode === 'dark' 
    ? 'bg-charcoal-800/50 backdrop-blur-sm' 
    : 'bg-walnut-100/50 backdrop-blur-sm';
    
  const indicatorColor = themeMode === 'dark'
    ? 'bg-gold-400'
    : 'bg-walnut-600';
    
  const activeColor = themeMode === 'dark'
    ? 'bg-gold-400 border-gold-400'
    : 'bg-walnut-600 border-walnut-600';
    
  const inactiveColor = themeMode === 'dark'
    ? 'bg-charcoal-700 border-gold-400/30'
    : 'bg-walnut-200 border-walnut-600/30';
  
  // Monitor sections visibility
  useEffect(() => {
    if (sections.length === 0) return;
    
    const observers: IntersectionObserver[] = [];
    
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (!element) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
              if (onSectionChange) onSectionChange(sectionId);
            }
          });
        },
        { threshold: 0.5 }
      );
      
      observer.observe(element);
      observers.push(observer);
    });
    
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [sections, onSectionChange]);
  
  // Render different indicator types
  const renderIndicator = () => {
    switch (type) {
      case 'progress':
        return (
          <motion.div 
            className={`${indicatorColor} ${isHorizontal ? 'h-1' : 'w-1'}`}
            style={isHorizontal ? { scaleX } : { scaleY: scaleX, originY: 0 }}
          />
        );
        
      case 'dots':
        return (
          <div className={`flex ${isHorizontal ? 'flex-row justify-center' : 'flex-col items-center'} gap-3 p-3`}>
            {sections.map((section, index) => (
              <button
                key={section}
                onClick={() => {
                  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={cn(
                  'transition-all duration-300 border',
                  section === activeSection ? activeColor : inactiveColor,
                  isHorizontal ? 'w-3 h-3 rounded-full' : 'h-3 w-3 rounded-full'
                )}
                aria-label={`Scroll to section ${index + 1}`}
              />
            ))}
          </div>
        );
        
      case 'line':
        return (
          <div className={`flex ${isHorizontal ? 'flex-row justify-center' : 'flex-col items-center'} gap-2 p-3`}>
            {sections.map((section, index) => (
              <React.Fragment key={section}>
                <button
                  onClick={() => {
                    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={cn(
                    'transition-all duration-300',
                    section === activeSection ? activeColor : inactiveColor,
                    isHorizontal ? 'w-10 h-1 rounded-full' : 'h-10 w-1 rounded-full'
                  )}
                  aria-label={`Scroll to section ${index + 1}`}
                />
                {index < sections.length - 1 && (
                  <div 
                    className={cn(
                      inactiveColor,
                      isHorizontal ? 'w-3 h-px' : 'h-3 w-px'
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div 
      className={cn(
        'fixed z-50',
        positionClasses[position],
        showBackground ? bgColor : '',
        className
      )}
    >
      {renderIndicator()}
    </div>
  );
};

export default ScrollIndicator;