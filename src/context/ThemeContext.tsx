import React, { createContext, useContext, ReactNode } from 'react';

type ThemeMode = 'dark' | 'light';

type ThemeContextType = {
  themeMode: ThemeMode;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{
  children: ReactNode;
  themeMode: ThemeMode;
}> = ({ children, themeMode }) => {
  return (
    <ThemeContext.Provider value={{ themeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme styling constants for easy access
export const darkTheme = {
  background: 'bg-charcoal-900',
  text: {
    primary: 'text-beige-100',
    secondary: 'text-beige-200',
    accent: 'text-gold-400',
  },
  border: 'border-gold-500/20',
  card: 'bg-charcoal-800 border-gold-500/20',
  button: {
    primary: 'bg-gold-400 text-charcoal-900 hover:bg-gold-500',
    secondary: 'border-gold-400/40 text-gold-400 hover:bg-gold-400/10',
  },
};

export const lightTheme = {
  background: 'bg-walnut-50',
  text: {
    primary: 'text-walnut-800',
    secondary: 'text-walnut-700',
    accent: 'text-gold-600',
  },
  border: 'border-walnut-500/30',
  card: 'bg-white border-walnut-500/30',
  button: {
    primary: 'bg-walnut-600 text-beige-100 hover:bg-walnut-700',
    secondary: 'border-walnut-600/40 text-walnut-600 hover:bg-walnut-600/10',
  },
};