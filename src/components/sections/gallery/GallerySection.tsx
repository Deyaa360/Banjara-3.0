import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ResponsiveContainer, SectionHeader, Button, SafeImage } from '@/components/common';
import { motion } from 'framer-motion';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

interface GallerySectionProps {
  images: GalleryImage[];
  title?: string;
  subtitle?: string;
  viewAllLink?: string;
  categories?: string[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  images,
  title = "Our Gallery",
  subtitle = "A visual journey through our culinary creations and ambiance",
  viewAllLink = "/gallery",
  categories = [],
}) => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Get unique categories if not provided
  const uniqueCategories = categories.length > 0 
    ? categories 
    : [...new Set(images.map(img => img.category))];

  // Filter images by category
  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <section className="py-16 sm:py-24 bg-charcoal-900">
      <ResponsiveContainer>
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <SectionHeader
            title={title}
            subtitle={subtitle}
            accentWord="Gallery"
            size="large"
            decorative={true}
            theme="light"
          />
        </motion.div>

        {/* Category Filters */}
        {uniqueCategories.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 sm:mb-12"
          >
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                  activeCategory === 'all'
                    ? 'bg-gold-400/20 text-gold-400 border border-gold-400/40'
                    : 'bg-charcoal-800 text-tan-300 border border-walnut-600/20 hover:text-gold-300'
                }`}
              >
                All
              </button>
              {uniqueCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gold-400/20 text-gold-400 border border-gold-400/40'
                      : 'bg-charcoal-800 text-tan-300 border border-walnut-600/20 hover:text-gold-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Mobile-First Visual Layout */}
        <div className="space-y-6 sm:space-y-8">
          {/* Featured Image */}
          {filteredImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg border border-walnut-600/20"
            >
              <SafeImage
                src={filteredImages[0].src}
                alt={filteredImages[0].alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <div className="text-xs sm:text-sm text-gold-400 font-medium mb-1 uppercase tracking-wider">
                  {filteredImages[0].category}
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display text-white leading-tight">
                  {filteredImages[0].alt}
                </h3>
                <div className="h-0.5 w-12 bg-gold-400 rounded-full mt-3"></div>
              </div>
            </motion.div>
          )}

          {/* Secondary Images */}
          {filteredImages.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
            >
              {filteredImages.slice(1, 3).map((image, index) => (
                <div
                  key={image.id}
                  className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden shadow-lg border border-walnut-600/20"
                >
                  <SafeImage
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                    <div className="text-xs text-gold-400 font-medium mb-1 uppercase tracking-wide">
                      {image.category}
                    </div>
                    <h4 className="text-sm sm:text-base font-display text-white leading-tight">
                      {image.alt}
                    </h4>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Category Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
          >
          </motion.div>

        </div>

        {/* View All Button */}
        {viewAllLink && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex justify-center mt-12 sm:mt-16"
          >
            <Button 
              variant="secondary" 
              size="lg" 
              href={viewAllLink}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              className="bg-charcoal-800 hover:bg-charcoal-700 border-gold-400/30 hover:border-gold-400/60 text-gold-300 hover:text-gold-200 transition-all duration-300"
            >
              View Full Gallery
            </Button>
          </motion.div>
        )}
      </ResponsiveContainer>
    </section>
  );
};

export default GallerySection;