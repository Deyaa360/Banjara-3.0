import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface BackgroundPatternProps {
  className?: string;
  style?: React.CSSProperties;
  fillColor?: string;
}

export const BackgroundPattern: React.FC<BackgroundPatternProps> = ({ 
  className = '', 
  style = {},
  fillColor
}) => {
  // Try to get theme from context, fall back to 'dark' if not available
  let themeMode: 'dark' | 'light' = 'dark';
  try {
    const context = useTheme();
    if (context) {
      themeMode = context.themeMode;
    }
  } catch (error) {
    console.warn('BackgroundPattern: Using default dark theme because component is not within a ThemeProvider');
  }
  
  // Use provided fillColor or determine based on theme
  const fill = fillColor || (themeMode === 'dark' ? '#ffffff' : '#000000');
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={style}>
      <svg 
        xmlns='http://www.w3.org/2000/svg' 
        width='100%' 
        height='100%' 
        viewBox='0 0 1000 100'
        preserveAspectRatio="xMidYMid slice"
      >
        <g fill={fill}>
          <path d="M0 1v99c134.3 0 153.7-99 296-99H0Z" opacity=".5"></path>
          <path d="M1000 4v86C833.3 90 833.3 3.6 666.7 3.6S500 90 333.3 90 166.7 4 0 4h1000Z" opacity=".5"></path>
          <path d="M617 1v86C372 119 384 1 196 1h421Z" opacity=".5"></path>
          <path d="M1000 0H0v52C62.5 28 125 4 250 4c250 0 250 96 500 96 125 0 187.5-24 250-48V0Z"></path>
        </g>
      </svg>
    </div>
  );
};

export default BackgroundPattern;