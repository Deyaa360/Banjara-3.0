import React from 'react';
import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpiceLevelIndicatorProps {
  level: number;
  maxLevel?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
  labelPosition?: 'left' | 'right';
}

export const SpiceLevelIndicator: React.FC<SpiceLevelIndicatorProps> = ({
  level,
  maxLevel = 3,
  size = 'md',
  className = '',
  showLabel = false,
  labelPosition = 'left',
}) => {
  // Size classes for the flame icons
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  // Size classes for the container
  const containerSizeClasses = {
    sm: 'gap-1',
    md: 'gap-1.5',
    lg: 'gap-2',
  };

  // Label text size
  const labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={cn('flex items-center', containerSizeClasses[size], className)}>
      {showLabel && labelPosition === 'left' && (
        <span className={cn('text-stone-300 font-medium mr-2', labelSizeClasses[size])}>
          Spice Level:
        </span>
      )}
      
      <div className="flex items-center gap-1">
        {[...Array(maxLevel)].map((_, i) => (
          <Flame 
            key={i} 
            className={cn(
              sizeClasses[size],
              i < level 
                ? 'text-amber-400 fill-current' 
                : 'text-stone-400/50'
            )} 
          />
        ))}
      </div>
      
      {showLabel && labelPosition === 'right' && (
        <span className={cn('text-stone-300 font-medium ml-2', labelSizeClasses[size])}>
          Spice Level
        </span>
      )}
    </div>
  );
};

export default SpiceLevelIndicator;