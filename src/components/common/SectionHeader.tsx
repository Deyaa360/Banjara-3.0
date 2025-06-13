import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accentWord?: string;
  alignment?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'large';
  decorative?: boolean;
  className?: string;
  theme?: 'light' | 'dark';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  accentWord,
  alignment = 'center',
  size = 'medium',
  decorative = true,
  className = '',
  theme: propTheme,
}) => {
  // Use the theme from context if available, otherwise use the prop
  const { themeMode } = useTheme();
  const theme = propTheme || themeMode;
  // Size mappings
  const titleSizes = {
    small: 'text-3xl md:text-4xl',
    medium: 'text-4xl md:text-5xl lg:text-6xl',
    large: 'text-5xl md:text-6xl lg:text-7xl',
  };

  // Alignment classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // Process title to highlight accent word
  const renderTitle = () => {
    if (!accentWord) return title;

    return title.split(' ').map((word, index) => (
      <span key={index} className="inline-block mr-2">
        {word === accentWord ? (
          <span className={theme === 'dark' ? 'text-gradient-warm' : 'text-gold-600'}>{word}</span>
        ) : (
          word
        )}
      </span>
    ));
  };

  return (
    <div className={cn(`mb-8 sm:mb-10 md:mb-12 ${alignmentClasses[alignment]}`, className)}>
      {/* Decorative divider */}
      {decorative && (
        <div className="inline-flex items-center gap-4 mb-6 sm:mb-8">
          <div className={`h-px w-16 sm:w-24 bg-gradient-to-r from-transparent ${theme === 'dark' ? 'to-warm-400' : 'to-walnut-600'}`} />
          <span className={`text-sm font-medium tracking-[0.5em] uppercase font-body ${theme === 'dark' ? 'text-warm-400' : 'text-walnut-700'}`}>
            {subtitle || 'Our Specialty'}
          </span>
          <div className={`h-px w-16 sm:w-24 bg-gradient-to-l from-transparent ${theme === 'dark' ? 'to-warm-400' : 'to-walnut-600'}`} />
        </div>
      )}
      
      {/* Main title */}
      <h2 className={`font-display ${titleSizes[size]} ${theme === 'dark' ? 'text-white' : 'text-walnut-800'} mb-6 leading-tight tracking-tight`}>
        {renderTitle()}
      </h2>
      
      {/* Optional subtitle paragraph */}
      {subtitle && !decorative && (
        <p className={`text-lg sm:text-xl max-w-3xl mx-auto font-body leading-relaxed ${theme === 'dark' ? 'text-stone-200/80' : 'text-walnut-700'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;