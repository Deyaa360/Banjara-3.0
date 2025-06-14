'use client';

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  priority?: boolean;
  minHeight?: string | number;
  aspectRatio?: string;
  blurDataURL?: string;
}

/**
 * An enhanced wrapper around Next.js Image component that handles errors,
 * ensures proper height for images with fill property, and implements
 * performance optimizations.
 */
const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fill,
  className = '',
  style = {},
  fallbackSrc = '/placeholder-image.svg',
  priority = false,
  minHeight = '200px',
  aspectRatio,
  blurDataURL,
  placeholder = blurDataURL ? 'blur' : undefined,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  loading = priority ? 'eager' : 'lazy',
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Reset loaded state when src changes
    setLoaded(false);
    setError(false);
  }, [src]);

  // Calculate container style based on props
  const containerStyle: React.CSSProperties = {
    ...style,
  };
  
  // If aspectRatio is provided, use it
  if (aspectRatio && !fill) {
    containerStyle.aspectRatio = aspectRatio;
  }
  
  // If fill is true, ensure the parent has position relative and height
  if (fill) {
    containerStyle.position = 'relative';
    containerStyle.minHeight = minHeight;
    containerStyle.height = '100%';
    containerStyle.width = '100%';
  }

  // Add necessary classes for fill images
  const containerClassName = fill
    ? `relative ${className}`
    : className;

  const handleError = () => {
    console.warn(`Image failed to load: ${src}`);
    setError(true);
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  // Use a placeholder for SSR to prevent hydration issues
  if (!mounted) {
    return (
      <div
        className={`${containerClassName} bg-charcoal-800/30 animate-pulse`}
        style={containerStyle}
        aria-label={alt as string}
      />
    );
  }

  return (
    <div className={containerClassName} style={containerStyle}>
      {/* Loading skeleton */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-charcoal-800/30 animate-pulse rounded-inherit" />
      )}
      
      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        fill={fill}
        priority={priority}
        loading={loading}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={`${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 ${fill ? 'object-cover' : ''} rounded-inherit`}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
};

export default SafeImage;