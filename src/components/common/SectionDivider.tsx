import React from 'react';
import { cn } from '@/lib/utils';

interface SectionDividerProps {
  text?: string;
  className?: string;
  lineClassName?: string;
  textClassName?: string;
  type?: 'text-with-lines' | 'simple-line' | 'double-line';
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  text,
  className = '',
  lineClassName = '',
  textClassName = '',
  type = 'text-with-lines',
}) => {
  if (type === 'simple-line') {
    return (
      <div className={cn('w-16 h-0.5 bg-gold-500/50 mx-auto my-4', className)}>
      </div>
    );
  }

  if (type === 'double-line') {
    return (
      <div className={cn('flex flex-col items-center gap-1 my-4', className)}>
        <div className={cn('w-16 h-px bg-gold-500/50', lineClassName)} />
        <div className={cn('w-24 h-px bg-gold-500/30', lineClassName)} />
      </div>
    );
  }

  return (
    <div className={cn('flex justify-center items-center my-8', className)}>
      <span className={cn('h-px w-12 bg-gold-500', lineClassName)} />
      {text && (
        <>
          <span className={cn('mx-4 text-gold-500 font-serif tracking-widest text-sm', textClassName)}>
            {text.toUpperCase()}
          </span>
          <span className={cn('h-px w-12 bg-gold-500', lineClassName)} />
        </>
      )}
    </div>
  );
};

export default SectionDivider;