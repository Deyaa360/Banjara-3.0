import React, { useState } from 'react';
import { ArrowRight, Calendar, Menu, Phone } from 'lucide-react';
import { AnimatedSection, ResponsiveContainer, ImageWithOverlay, Button, SafeImage } from '@/components/common';
import { motion } from 'framer-motion';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  tertiaryButtonText?: string;
  tertiaryButtonLink?: string;
  backgroundImage?: string;
  overlayOpacity?: number;
  phoneNumber?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title = "Contact Us Today",
  subtitle = "Experience the authentic flavors of India in an elegant setting",
  primaryButtonText = "Get in Touch",
  primaryButtonLink = "/contact",
  secondaryButtonText = "View Menu",
  secondaryButtonLink = "/menu",
  tertiaryButtonText = "Call Us",
  tertiaryButtonLink = "tel:+15551234567",
  backgroundImage = "/images/restaurant-interior.jpg",
  overlayOpacity = 0.7,
  phoneNumber = "+1 (555) 123-4567",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <section 
      className="relative py-24 md:py-32 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0" style={{ minHeight: '400px' }}>
        <SafeImage
          src={backgroundImage}
          alt="Restaurant ambiance"
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-10000 ease-in-out"
          style={{ 
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transitionDuration: '15s'
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/70"
          style={{ opacity: overlayOpacity }}
        />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="absolute top-10 left-10 w-40 h-40 border border-amber-400/10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 border border-amber-400/10 rounded-full"></div>
      </div>
      
      <ResponsiveContainer className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-xl md:text-2xl text-stone-300 mb-10">
              {subtitle}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap"
          >
            {primaryButtonText && primaryButtonLink && (
              <Button 
                variant="primary" 
                size="lg" 
                href={primaryButtonLink}
                icon={<Calendar className="w-5 h-5" />}
                iconPosition="left"
                className="min-w-[200px] bg-amber-500 hover:bg-amber-600 hover:scale-105 transition-transform duration-300"
              >
                {primaryButtonText}
              </Button>
            )}
            
            {secondaryButtonText && secondaryButtonLink && (
              <Button 
                variant="secondary" 
                size="lg" 
                href={secondaryButtonLink}
                icon={<Menu className="w-5 h-5" />}
                iconPosition="left"
                className="min-w-[200px] border-amber-400/40 hover:border-amber-400/70 hover:scale-105 transition-transform duration-300"
              >
                {secondaryButtonText}
              </Button>
            )}
            
            {tertiaryButtonText && tertiaryButtonLink && (
              <Button 
                variant="outline" 
                size="lg" 
                href={tertiaryButtonLink}
                icon={<Phone className="w-5 h-5" />}
                iconPosition="left"
                className="min-w-[200px] border-amber-400/40 hover:border-amber-400/70 hover:scale-105 transition-transform duration-300"
              >
                {phoneNumber}
              </Button>
            )}
          </motion.div>
          
          {/* Additional info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-stone-400 text-sm"
          >
            <p>No reservation fee • Instant confirmation • 24/7 customer service</p>
          </motion.div>
        </div>
      </ResponsiveContainer>
    </section>
  );
};

export default CTASection;