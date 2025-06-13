'use client';

import { useState, useEffect } from 'react';

interface ImageOptimizationOptions {
  /**
   * Whether to prioritize loading this image (above the fold content)
   */
  priority?: boolean;
  
  /**
   * Whether to generate a low-quality placeholder
   */
  generatePlaceholder?: boolean;
  
  /**
   * Custom blur data URL if available
   */
  blurDataURL?: string;
  
  /**
   * Callback when image is loaded
   */
  onLoad?: () => void;
}

/**
 * Custom hook for optimizing image loading and providing proper loading states
 */
export function useImageOptimization({
  priority = false,
  generatePlaceholder = true,
  blurDataURL,
  onLoad
}: ImageOptimizationOptions = {}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Handle SSR
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Reset states when component remounts
  useEffect(() => {
    return () => {
      setIsLoaded(false);
      setError(false);
    };
  }, []);
  
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };
  
  const handleError = () => {
    setError(true);
    console.warn('Image failed to load');
  };
  
  // Generate placeholder props
  const placeholderProps = generatePlaceholder ? {
    placeholder: blurDataURL ? 'blur' : 'empty',
    blurDataURL
  } : {};
  
  // Generate loading strategy
  const loadingStrategy = priority ? 'eager' : 'lazy';
  
  return {
    isLoaded,
    isClient,
    error,
    handleLoad,
    handleError,
    imageProps: {
      ...placeholderProps,
      loading: loadingStrategy,
      priority,
      onLoad: handleLoad,
      onError: handleError
    }
  };
}

export default useImageOptimization;