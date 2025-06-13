import React from 'react';
import { cn } from '@/lib/utils';
import { SpiceLevelIndicator } from './indicators';
import { Leaf, Star } from 'lucide-react';

interface MenuItemProps {
  name: string;
  description: string;
  price: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isSignature?: boolean;
  spiceLevel?: number;
  className?: string;
  onClick?: () => void;
}

export const MenuCard: React.FC<MenuItemProps> = ({
  name,
  description,
  price,
  isVegetarian = false,
  isSpicy = false,
  isSignature = false,
  spiceLevel = 0,
  className = '',
  onClick,
}) => {
  return (
    <div
      className={cn(
        'bg-charcoal-800/30 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-amber-400/20 transition-all duration-300 hover:bg-charcoal-800/50 hover:shadow-lg group',
        onClick ? 'cursor-pointer' : '',
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold text-amber-200 group-hover:text-amber-100 transition-colors duration-300">
            {name}
          </h3>
          {isSignature && (
            <span className="inline-flex items-center justify-center w-5 h-5 bg-amber-900/30 rounded-full">
              <Star className="w-3 h-3 text-amber-400 fill-current" />
            </span>
          )}
          {isVegetarian && (
            <span className="inline-flex items-center justify-center w-5 h-5 bg-green-900/30 rounded-full">
              <Leaf className="w-3 h-3 text-green-400 fill-current" />
            </span>
          )}
        </div>
        <span className="text-lg font-medium text-amber-300 group-hover:text-amber-200 transition-colors duration-300">
          {price}
        </span>
      </div>
      
      <p className="text-stone-300 text-sm mb-3 line-clamp-2">
        {description}
      </p>
      
      {spiceLevel > 0 && (
        <div className="mt-3">
          <SpiceLevelIndicator level={spiceLevel} size="sm" />
        </div>
      )}
      
      <div className="flex gap-2 mt-3">
        {isVegetarian && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-500/20">
            Vegetarian
          </span>
        )}
        {isSpicy && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-900/30 text-red-400 border border-red-500/20">
            Spicy
          </span>
        )}
        {isSignature && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-900/30 text-amber-400 border border-amber-500/20">
            Signature
          </span>
        )}
      </div>
    </div>
  );
};

export default MenuCard;