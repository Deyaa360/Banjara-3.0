import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  verticalPadding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  maxWidth = 'xl',
  padding = 'md',
  verticalPadding = 'lg',
}) => {
  // Max width classes
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
    none: '',
  };

  // Horizontal padding classes
  const paddingClasses = {
    none: 'px-0',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 md:px-8',
    lg: 'px-4 sm:px-8 md:px-12 lg:px-16',
  };

  // Vertical padding classes
  const verticalPaddingClasses = {
    none: 'py-0',
    sm: 'py-4 sm:py-6',
    md: 'py-6 sm:py-8 md:py-12',
    lg: 'py-8 sm:py-12 md:py-16 lg:py-20',
    xl: 'py-12 sm:py-16 md:py-24 lg:py-32',
  };

  return (
    <div
      className={cn(
        'mx-auto w-full',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        verticalPaddingClasses[verticalPadding],
        className
      )}
    >
      {children}
    </div>
  );
};

export default ResponsiveContainer;