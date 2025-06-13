import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface SectionTransitionProps {
  type?: 'wave' | 'angle' | 'curve';
  invert?: boolean;
  className?: string;
  height?: string;
  fromTheme?: 'dark' | 'light';
  toTheme?: 'dark' | 'light';
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  type = 'curve',
  invert = false,
  className = '',
  height = 'h-16',
  fromTheme,
  toTheme,
}) => {
  const { themeMode } = useTheme();
  
  // Determine colors based on theme
  // If fromTheme and toTheme are provided, use those instead of the current theme
  const currentTheme = fromTheme || themeMode;
  const targetTheme = toTheme || (currentTheme === 'dark' ? 'light' : 'dark');
  
  const fillColor = targetTheme === 'dark' ? '#1a1a1a' : '#f2ede7';
  
  // SVG paths for different divider types
  const paths = {
    wave: 'M0,32L48,37.3C96,43,192,53,288,53.3C384,53,480,43,576,48C672,53,768,75,864,80C960,85,1056,75,1152,64C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
    angle: 'M0,0L1440,64L1440,0L0,0Z',
    curve: 'M0,0C240,64,480,96,720,96C960,96,1200,64,1440,0L1440,0L0,0Z',
  };
  
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <svg
        className={`w-full ${height} ${invert ? 'transform rotate-180' : ''}`}
        viewBox="0 0 1440 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d={paths[type]} fill={fillColor} />
      </svg>
    </div>
  );
};

export default SectionTransition;