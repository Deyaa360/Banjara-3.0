import React from 'react';
import Image from 'next/image';
import { AnimatedSection, ResponsiveContainer, SafeImage } from '@/components/common';
import { ImageWithOverlay } from '@/components/common';

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
  direction?: 'image-left' | 'image-right';
  decorative?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  title = 'Where Tradition Meets Innovation',
  subtitle = 'Our Heritage',
  description = 'In the heart of culinary excellence, we craft an experience where centuries of traditional wisdom intertwine with contemporary artistry. Each dish is a testament to our commitment to preserving the authentic essence of Indian cuisine while embracing the possibilities of modern gastronomy.',
  imageSrc,
  imageAlt = 'About Banjara Restaurant',
  direction = 'image-left',
  decorative = true,
}) => {
  return (
    <section className="relative bg-walnut-200 overflow-hidden pt-0 mt-0">
      {/* --- Wave Divider & Overlays for Seamless Transition (TOP) --- */}
      <div className="w-full overflow-hidden relative" style={{ pointerEvents: 'none' }}>
        
        <svg 
          className="w-full h-32"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          style={{ display: 'block', position: 'relative', zIndex: 1, pointerEvents: 'auto' }}
        >
          <g fill="#1a1a1a">
            <path d="M0 1v99c134.3 0 153.7-99 296-99H0Z" opacity=".5"></path>
            <path d="M1000 4v86C833.3 90 833.3 3.6 666.7 3.6S500 90 333.3 90 166.7 4 0 4h1000Z" opacity=".5"></path>
            <path d="M617 1v86C372 119 384 1 196 1h421Z" opacity=".5"></path>
            <path d="M1000 0H0v52C62.5 28 125 4 250 4c250 0 250 96 500 96 125 0 187.5-24 250-48V0Z"></path>
          </g>
        </svg>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-walnut-400/20 via-walnut-300/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-400/15 via-gold-300/10 to-transparent" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'44\' height=\'44\' viewBox=\'0 0 44 44\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23715436\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 0h4v4H0V0zm4 4h4v4H4V4zm4-4h4v4H8V0zm8 0h4v4h-4V0zm-4 4h4v4h-4V4zm0-8h4v4h-4v-4zm8 8h4v4h-4V4zm-8 8h4v4h-4v-4zm0 8h4v4h-4v-4zm0 8h4v4h-4v-4zm0-24h4v4h-4v-4zm0 8h4v4h-4v-4zm0 8h4v4h-4v-4zm8 0h4v4h-4v-4zm8 0h4v4h-4v-4zm-16 8h4v4h-4v-4zm0 8h4v4h-4v-4zm8 0h4v4h-4v-4zm8 0h4v4h-4v-4zm0-8h4v4h-4v-4zm0-8h4v4h-4v-4zm8 0h4v4h-4v-4zm0 8h4v4h-4v-4zm-8-16h4v4h-4v-4zm8 0h4v4h-4v-4zm8 0h4v4h-4v-4zm0-8h4v4h-4v-4z\'/%3E%3C/g%3E%3C/svg%3E")',
          }}
        ></div>
      </div>

      <ResponsiveContainer className="relative z-10" verticalPadding="xl">
        <div className="max-w-6xl mx-auto">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${direction === 'image-right' ? 'lg:grid-flow-dense' : ''}`}>
            {/* Image Column */}
            <AnimatedSection
              direction={direction === 'image-left' ? 'left' : 'right'}
              className="relative aspect-[4/5] w-full max-w-[500px] mx-auto lg:mx-0"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_15px_30px_-10px_rgba(79,59,38,0.3)]" style={{ minHeight: '400px' }}>
                <SafeImage
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                  className="object-cover"
                />
                {/* Add a subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
              </div>
              
              {decorative && (
                <>
                  {/* Decorative Squares */}
                  <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-walnut-500/40 rounded-2xl backdrop-blur-sm bg-walnut-500/5 shadow-[0_10px_25px_-5px_rgba(79,59,38,0.2)]" />
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gold-500/40 rounded-2xl backdrop-blur-sm bg-gold-500/5 shadow-[0_10px_25px_-5px_rgba(79,59,38,0.2)]" />
                </>
              )}
            </AnimatedSection>

            {/* Content Column */}
            <AnimatedSection
              direction={direction === 'image-left' ? 'right' : 'left'}
              className="relative px-4 sm:px-6 lg:px-0"
            >
              {subtitle && (
                <div className="inline-flex items-center gap-4 mb-10 sm:mb-14">
                  <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-walnut-600" />
                  <span className="text-walnut-700 text-sm font-medium tracking-[0.5em] uppercase font-body">
                    {subtitle}
                  </span>
                  <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-walnut-600" />
                </div>
              )}
              
              {title && (
                <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-walnut-800 mb-10 sm:mb-14 leading-[1.05] tracking-tight">
                  {title.split(' ').map((word, index, array) => {
                    // Add line break before the last two words
                    if (index === array.length - 2) {
                      return (
                        <React.Fragment key={index}>
                          {word}
                          <br />
                        </React.Fragment>
                      );
                    }
                    // Apply special styling to the last word
                    if (index === array.length - 1) {
                      return (
                        <span key={index} className="text-gold-600 font-light tracking-wide">
                          {word}
                        </span>
                      );
                    }
                    // Regular word with space
                    return <span key={index}>{word} </span>;
                  })}
                </h2>
              )}
              
              {description && (
                <p className="text-lg sm:text-xl lg:text-2xl text-walnut-700 mb-8 font-body leading-relaxed tracking-wide max-w-2xl">
                  {description}
                </p>
              )}
              
              {/* Decorative line */}
              <div className="w-24 h-1 bg-gradient-to-r from-walnut-600 to-gold-500 rounded-full mb-8"></div>
            </AnimatedSection>
          </div>
        </div>
      </ResponsiveContainer>

      {/* --- Wave Divider & Overlays for Seamless Transition (BOTTOM) --- */}
      {/* Removed bottom wave divider as requested */}
    </section>
  );
};

export default AboutSection;