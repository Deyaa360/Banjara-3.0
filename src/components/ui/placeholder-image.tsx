import React from 'react';

interface PlaceholderImageProps {
  text: string;
  className?: string;
  width?: number;
  height?: number;
}

export function PlaceholderImage({ text, className = '', width = 800, height = 600 }: PlaceholderImageProps) {
  return (
    <div
      className={`relative flex items-center justify-center bg-primary/10 ${className}`}
      style={{ width, height }}
    >
      <div className="text-center p-4">
        <p className="text-primary-dark font-medium">{text}</p>
        <p className="text-primary-dark/60 text-sm mt-2">Placeholder Image</p>
      </div>
    </div>
  );
}