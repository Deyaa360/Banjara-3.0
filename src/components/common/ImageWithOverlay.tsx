import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import SafeImage from './SafeImage';

interface ImageWithOverlayProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  overlayClassName?: string;
  overlayType?: 'none' | 'gradient-bottom' | 'gradient-top' | 'gradient-radial' | 'dark' | 'light' | 'custom';
  customOverlay?: React.ReactNode;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
}

export const ImageWithOverlay: React.FC<ImageWithOverlayProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = '',
  containerClassName = '',
  overlayClassName = '',
  overlayType = 'none',
  customOverlay,
  objectFit = 'cover',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  onLoad,
}) => {
  // Overlay classes based on type
  const getOverlayClasses = () => {
    switch (overlayType) {
      case 'gradient-bottom':
        return 'absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10';
      case 'gradient-top':
        return 'absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/10';
      case 'gradient-radial':
        return 'absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/80';
      case 'dark':
        return 'absolute inset-0 bg-black/50';
      case 'light':
        return 'absolute inset-0 bg-white/30';
      case 'none':
      default:
        return '';
    }
  };

  return (
    <div className={cn('relative overflow-hidden', containerClassName)} style={{ minHeight: fill ? '200px' : 'auto' }}>
      <SafeImage
        src={src}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        className={cn(
          objectFit === 'cover' ? 'object-cover' : 
          objectFit === 'contain' ? 'object-contain' : 
          objectFit === 'fill' ? 'object-fill' : 
          objectFit === 'none' ? 'object-none' : 'object-scale-down',
          className
        )}
        onLoad={onLoad}
      />
      
      {/* Overlay */}
      {overlayType !== 'none' && (
        <div className={cn(getOverlayClasses(), overlayClassName)} />
      )}
      
      {/* Custom overlay */}
      {customOverlay && (
        <div className="absolute inset-0">{customOverlay}</div>
      )}
    </div>
  );
};

export default ImageWithOverlay;