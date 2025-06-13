import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon,
}) => {
  // Variant classes
  const variantClasses: Record<BadgeVariant, string> = {
    default: 'bg-stone-800/50 text-stone-300 border-stone-700/50',
    primary: 'bg-amber-900/30 text-amber-400 border-amber-500/20',
    secondary: 'bg-stone-900/30 text-stone-300 border-stone-700/20',
    success: 'bg-green-900/30 text-green-400 border-green-500/20',
    warning: 'bg-orange-900/30 text-orange-400 border-orange-500/20',
    danger: 'bg-red-900/30 text-red-400 border-red-500/20',
    info: 'bg-blue-900/30 text-blue-400 border-blue-500/20',
  };

  // Size classes
  const sizeClasses: Record<BadgeSize, string> = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;