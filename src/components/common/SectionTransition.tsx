import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface SectionTransitionProps {
  type?: string; // Type is no longer used but kept for backward compatibility
  invert?: boolean;
  className?: string;
  height?: string;
  fromTheme?: 'dark' | 'light';
  toTheme?: 'dark' | 'light';
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  type, // No longer used
  invert = false,
  className = '',
  height = 'h-32',
  fromTheme,
  toTheme,
}) => {
  // Try to get theme from context, fall back to fromTheme or 'light' if not available
  let themeMode: 'dark' | 'light' = fromTheme || 'light';
  try {
    const context = useTheme();
    if (context) {
      themeMode = context.themeMode;
    }
  } catch (error) {
    console.warn('SectionTransition: Using provided fromTheme or default because component is not within a ThemeProvider');
  }
  
  // Determine colors based on theme
  // If fromTheme and toTheme are provided, use those instead of the current theme
  const currentTheme = fromTheme || themeMode;
  const targetTheme = toTheme || (currentTheme === 'dark' ? 'light' : 'dark');
  
  // Use specific color values for light and dark themes
  const themeColors = {
    dark: '#1a1a1a',  // Charcoal-900
    light: '#f2ede7'  // Walnut-50
  };
  
  const fillColor = themeColors[targetTheme];
  
  // We'll use a single SVG for all transition types now
  
  return (
    <div className={cn("w-full overflow-hidden relative", className)}>
      {/* Radial overlays to match the gallery section */}
      <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2 pointer-events-none" style={{ width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(121, 89, 57, 0.15) 0%, rgba(121, 89, 57, 0.05) 60%, transparent 100%)', filter: 'blur(120px)', opacity: 0.8, zIndex: 0 }} />
      <div className="absolute top-0 right-0 transform -translate-y-1/4 pointer-events-none" style={{ width: '1000px', height: '1000px', background: 'radial-gradient(circle, rgba(230, 192, 122, 0.1) 0%, rgba(230, 192, 122, 0.03) 60%, transparent 100%)', filter: 'blur(150px)', opacity: 0.7, zIndex: 0 }} />
      <svg 
        className={`w-full ${height} ${invert ? 'transform rotate-180' : ''}`}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        style={{ display: 'block', position: 'relative', zIndex: 1 }}
      >
        <g fill={fillColor}>
          <path d="M0 1v99c134.3 0 153.7-99 296-99H0Z" opacity=".5"></path>
          <path d="M1000 4v86C833.3 90 833.3 3.6 666.7 3.6S500 90 333.3 90 166.7 4 0 4h1000Z" opacity=".5"></path>
          <path d="M617 1v86C372 119 384 1 196 1h421Z" opacity=".5"></path>
          <path d="M1000 0H0v52C62.5 28 125 4 250 4c250 0 250 96 500 96 125 0 187.5-24 250-48V0Z"></path>
        </g>
      </svg>
    </div>
  );
};

export default SectionTransition;