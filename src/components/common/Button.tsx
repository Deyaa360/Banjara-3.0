import React, { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // Base classes
  const baseClasses = cn(
    'rounded-full font-medium transition-all duration-300 inline-flex items-center justify-center gap-2',
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className
  );

  // Variant specific classes and styles
  const getVariantProps = () => {
    switch (variant) {
      case 'primary':
        return {
          className: cn(baseClasses, 'border-2 shadow-lg'),
          style: {
            backgroundColor: '#795939',
            color: '#e6c07a',
            borderColor: '#8a6642',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
          },
          onMouseEnter: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            e.currentTarget.style.backgroundColor = '#e6c07a';
            e.currentTarget.style.color = '#4b371f';
            e.currentTarget.style.borderColor = '#e6c07a';
            e.currentTarget.style.boxShadow = '0 6px 15px rgba(230, 192, 122, 0.3)';
          },
          onMouseLeave: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            e.currentTarget.style.backgroundColor = '#795939';
            e.currentTarget.style.color = '#e6c07a';
            e.currentTarget.style.borderColor = '#8a6642';
            e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
          }
        };
      case 'secondary':
        return {
          className: cn(baseClasses, 'border-2'),
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            color: '#e6c07a',
            borderColor: 'rgba(230, 192, 122, 0.4)',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            transition: 'all 0.3s ease, backdrop-filter 0s, -webkit-backdrop-filter 0s'
          },
          onMouseEnter: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.borderColor = 'rgba(230, 192, 122, 0.6)';
            e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
            e.currentTarget.style.backdropFilter = 'blur(4px)';
            (e.currentTarget.style as any)['-webkit-backdrop-filter'] = 'blur(4px)';
          },
          onMouseLeave: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
            e.currentTarget.style.color = '#e6c07a';
            e.currentTarget.style.borderColor = 'rgba(230, 192, 122, 0.4)';
            e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
            e.currentTarget.style.backdropFilter = 'blur(4px)';
            (e.currentTarget.style as any)['-webkit-backdrop-filter'] = 'blur(4px)';
          }
        };
      case 'outline':
        return {
          className: cn(baseClasses, 'border-2'),
          style: {
            backgroundColor: 'transparent',
            color: '#e6c07a',
            borderColor: '#e6c07a',
          },
          onMouseEnter: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            e.currentTarget.style.backgroundColor = 'rgba(230, 192, 122, 0.1)';
            e.currentTarget.style.borderColor = '#e6c07a';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(230, 192, 122, 0.2)';
          },
          onMouseLeave: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = '#e6c07a';
            e.currentTarget.style.boxShadow = 'none';
          }
        };
      case 'ghost':
        return {
          className: cn(baseClasses),
          style: {
            backgroundColor: 'transparent',
            color: '#e6c07a',
          },
          onMouseEnter: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            e.currentTarget.style.backgroundColor = 'rgba(230, 192, 122, 0.1)';
          },
          onMouseLeave: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        };
      default:
        return {
          className: baseClasses
        };
    }
  };

  const variantProps = getVariantProps();

  // Content with icon
  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="transition-transform duration-300 group-hover:-translate-x-1">{icon}</span>
      )}
      <span className="tracking-wide">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>
      )}
    </>
  );

  // Render as link if href is provided
  if (href) {
    return (
      <Link 
        href={href}
        className={`group ${variantProps.className}`}
        style={variantProps.style}
        onMouseEnter={variantProps.onMouseEnter as any}
        onMouseLeave={variantProps.onMouseLeave as any}
      >
        {content}
      </Link>
    );
  }

  // Render as button
  return (
    <button
      className={`group ${variantProps.className}`}
      style={variantProps.style}
      onMouseEnter={variantProps.onMouseEnter}
      onMouseLeave={variantProps.onMouseLeave}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;