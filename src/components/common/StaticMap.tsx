'use client';

import React from 'react';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

interface StaticMapProps {
  address: string;
  height?: string;
  className?: string;
}

/**
 * A static map component that doesn't rely on Google Maps JavaScript API
 * to avoid browser-related errors
 */
const StaticMap: React.FC<StaticMapProps> = ({
  address,
  height = '200px',
  className = '',
}) => {
  // Create a URL-friendly address
  const encodedAddress = encodeURIComponent(address);
  
  // We'll use a placeholder instead of an actual Google Maps static image
  // to avoid API key requirements and potential errors

  return (
    <div 
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{ height }}
    >
      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
        <div className="text-center p-4">
          <MapPin className="w-8 h-8 text-amber-400 mx-auto mb-2" />
          <p className="text-stone-700 font-medium">{address}</p>
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 hover:text-amber-500 text-sm mt-2 inline-block"
          >
            View on Google Maps
          </a>
        </div>
      </div>
    </div>
  );
};

export default StaticMap;