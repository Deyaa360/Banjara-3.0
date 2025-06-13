import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, X, ChevronLeft, ChevronRight, Camera, Image as ImageIcon } from 'lucide-react';
import { AnimatedSection, ResponsiveContainer, SectionHeader, Button, SafeImage } from '@/components/common';
import { motion, AnimatePresence, useInView } from 'framer-motion';

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
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const galleryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(galleryRef, { once: false, amount: 0.2 });

  // Get unique categories if not provided
  const uniqueCategories = categories.length > 0 
    ? categories 
    : [...new Set(images.map(img => img.category))];

  // Filter images by category
  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(img => img.category === activeCategory);
    
  // Handle lightbox navigation
  const openLightbox = (src: string, index: number) => {
    setLightboxImage(src);
    setLightboxIndex(index);
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setLightboxImage(null);
    // Re-enable scrolling
    document.body.style.overflow = '';
  };
  
  const nextLightboxImage = () => {
    if (filteredImages.length <= 1) return;
    setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
    setLightboxImage(filteredImages[(lightboxIndex + 1) % filteredImages.length].src);
  };
  
  const prevLightboxImage = () => {
    if (filteredImages.length <= 1) return;
    setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    setLightboxImage(filteredImages[(lightboxIndex - 1 + filteredImages.length) % filteredImages.length].src);
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImage) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightboxImage();
      if (e.key === 'ArrowLeft') prevLightboxImage();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, lightboxIndex]);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-24 bg-charcoal-900 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large walnut circle in center-left */}
        <div 
          className="absolute top-1/2 left-1/3 transform -translate-y-1/2" 
          style={{ 
            width: '800px', 
            height: '800px', 
            background: 'radial-gradient(circle, rgba(121, 89, 57, 0.15) 0%, rgba(121, 89, 57, 0.05) 60%, transparent 100%)',
            filter: 'blur(120px)',
            opacity: 0.8
          }}
        ></div>
        
        {/* Extra large gold circle in top-right */}
        <div 
          className="absolute top-0 right-0 transform -translate-y-1/4" 
          style={{ 
            width: '1000px', 
            height: '1000px', 
            background: 'radial-gradient(circle, rgba(230, 192, 122, 0.1) 0%, rgba(230, 192, 122, 0.03) 60%, transparent 100%)',
            filter: 'blur(150px)',
            opacity: 0.7
          }}
        ></div>
      </div>

      <ResponsiveContainer>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
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
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                  activeCategory === 'all'
                    ? 'bg-gold-400/20 text-gold-400 border border-gold-400/40 shadow-heritage'
                    : 'bg-charcoal-800 text-tan-300 border border-walnut-600/20 hover:bg-charcoal-800/80 hover:text-gold-300 hover:border-gold-400/20'
                }`}
              >
                All
              </button>
              {uniqueCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gold-400/20 text-gold-400 border border-gold-400/40 shadow-heritage'
                      : 'bg-charcoal-800 text-tan-300 border border-walnut-600/20 hover:bg-charcoal-800/80 hover:text-gold-300 hover:border-gold-400/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Gallery Grid */}
        <div ref={galleryRef} className="relative">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div 
                  key={index}
                  className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-charcoal-800/80 to-charcoal-800/40 border border-walnut-600/10"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-charcoal-700/50 animate-pulse flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-charcoal-500/50" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredImages.map((image, index) => {
                const staggerDelay = 0.1 + (index % 3) * 0.1;
                
                return (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: staggerDelay,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{ y: -8 }}
                    className="group"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div 
                      className="aspect-square rounded-2xl overflow-hidden cursor-pointer relative shadow-heritage-lg border border-walnut-600/20"
                      onClick={() => openLightbox(image.src, index)}
                    >
                      {/* Image */}
                      <SafeImage
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-gold-400/90 rounded-full text-xs font-medium text-charcoal-900 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-4 group-hover:translate-y-0">
                        {image.category}
                      </div>
                      
                      {/* Zoom Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: hoveredIndex === index ? 1 : 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="w-16 h-16 rounded-full bg-gold-400 flex items-center justify-center shadow-xl"
                        >
                          <Camera className="h-7 w-7 text-charcoal-900" />
                        </motion.div>
                      </div>
                      
                      {/* Image Title */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <h3 className="text-lg font-display text-white mb-1">{image.alt}</h3>
                        <div className="h-0.5 w-12 bg-gold-400 rounded-full"></div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* View All Button */}
        {viewAllLink && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mt-16"
          >
            <Button 
              variant="secondary" 
              size="lg" 
              href={viewAllLink}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              className="bg-charcoal-800 hover:bg-charcoal-700 border-gold-400/30 hover:border-gold-400/60 text-gold-300 hover:text-gold-200 hover:scale-105 shadow-heritage transition-all duration-300"
            >
              View Full Gallery
            </Button>
          </motion.div>
        )}
      </ResponsiveContainer>

      {/* Lightbox */}
      <AnimatePresence mode="sync">
        {lightboxImage && (
          <motion.div 
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-charcoal-950/98 flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button 
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-charcoal-800 border border-gold-400/20 flex items-center justify-center text-gold-400 hover:text-gold-300 hover:bg-charcoal-700 hover:border-gold-400/40 transition-all duration-300 z-10 shadow-heritage"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
            >
              <X size={24} />
            </button>
            
            {/* Navigation buttons */}
            {filteredImages.length > 1 && (
              <>
                <button 
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-charcoal-800 border border-gold-400/20 flex items-center justify-center text-gold-400 hover:text-gold-300 hover:bg-charcoal-700 hover:border-gold-400/40 transition-all duration-300 z-10 shadow-heritage"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevLightboxImage();
                  }}
                >
                  <ChevronLeft size={28} />
                </button>
                <button 
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-charcoal-800 border border-gold-400/20 flex items-center justify-center text-gold-400 hover:text-gold-300 hover:bg-charcoal-700 hover:border-gold-400/40 transition-all duration-300 z-10 shadow-heritage"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextLightboxImage();
                  }}
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
            
            {/* Image container */}
            <motion.div 
              className="relative max-w-6xl max-h-[85vh] w-full h-full" 
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring", damping: 25, stiffness: 200 }}
            >
              <img 
                src={lightboxImage} 
                alt={filteredImages[lightboxIndex]?.alt || "Gallery image"} 
                className="w-full h-full object-contain rounded-xl"
              />
              
              {/* Caption */}
              <div className="absolute -bottom-16 left-0 right-0 p-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <h3 className="text-gold-400 text-xl font-display mb-1">
                    {filteredImages[lightboxIndex]?.alt || "Gallery image"}
                  </h3>
                  <p className="text-tan-300/80 text-sm font-serif">
                    {filteredImages[lightboxIndex]?.category || ""}
                  </p>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Image counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-charcoal-800/90 border border-gold-400/20 px-4 py-2 rounded-full text-gold-300 text-sm font-medium shadow-heritage">
              {lightboxIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;