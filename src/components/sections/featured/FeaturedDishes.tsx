import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/common';
import { AnimatedSection } from '@/components/common';
import { useCarousel } from '@/hooks';
import FeaturedDishesCarousel from './FeaturedDishesCarousel';

interface FeaturedDish {
  id: string;
  name: string;
  description: string;
  image: string;
  region: string;
  isVegetarian: boolean;
  isSignature: boolean;
  spiceLevel: number;
}

interface FeaturedDishesProps {
  dishes: FeaturedDish[];
  title?: string;
  subtitle?: string;
  viewAllLink?: string;
}

export const FeaturedDishes: React.FC<FeaturedDishesProps> = ({
  dishes,
  title = "Chef's Featured Creations",
  subtitle = "Discover our most celebrated dishes, each telling a unique story of India's rich culinary heritage",
  viewAllLink = "/menu",
}) => {
  return (
    <section className="py-20 bg-charcoal-900 overflow-hidden relative">
      {/* Enhanced ambient background elements with larger, more blurred circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large charcoal circle in center-right - using charcoal-500 */}
        <div 
          className="absolute top-1/2 right-1/3 transform -translate-y-1/2" 
          style={{ 
            width: '800px', 
            height: '800px', 
            background: 'radial-gradient(circle, rgba(109, 109, 109, 0.25) 0%, rgba(109, 109, 109, 0.1) 60%, transparent 100%)',
            filter: 'blur(150px)',
            opacity: 0.9
          }}
        ></div>
        
        {/* Extra large deep charcoal circle in bottom-left - using charcoal-700 */}
        <div 
          className="absolute -bottom-1/4 -left-1/4" 
          style={{ 
            width: '1200px', 
            height: '1200px', 
            background: 'radial-gradient(circle, rgba(79, 79, 79, 0.3) 0%, rgba(79, 79, 79, 0.12) 70%, transparent 100%)',
            filter: 'blur(180px)',
            opacity: 0.8
          }}
        ></div>
        
        {/* Light charcoal circle in top-left - using charcoal-400 */}
        <div 
          className="absolute -top-1/4 -left-1/4" 
          style={{ 
            width: '1000px', 
            height: '1000px', 
            background: 'radial-gradient(circle, rgba(136, 136, 136, 0.18) 0%, rgba(136, 136, 136, 0.08) 60%, transparent 100%)',
            filter: 'blur(160px)',
            opacity: 0.6
          }}
        ></div>
        
        {/* Subtle highlight circle in top-right - using charcoal-300 */}
        <div 
          className="absolute top-0 right-0" 
          style={{ 
            width: '900px', 
            height: '900px', 
            background: 'radial-gradient(circle, rgba(176, 176, 176, 0.1) 0%, rgba(176, 176, 176, 0.04) 60%, transparent 100%)',
            filter: 'blur(170px)',
            opacity: 0.7
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-8 sm:mb-10 md:mb-12">
          <SectionHeader 
            title={title}
            subtitle={subtitle}
            accentWord="Featured"
            size="large"
            decorative={false}
          />
        </AnimatedSection>

        {/* Featured Dishes Carousel */}
        <div className="w-full overflow-hidden">
          <FeaturedDishesCarousel dishes={dishes} />
        </div>
        
        {/* Central View Menu Button */}
        <AnimatedSection 
          className="flex justify-center mt-12 sm:mt-16 md:mt-20"
          delay={0.3}
        >
          <Link href={viewAllLink}>
            <button className="menu-btn flex items-center gap-3 bg-stone-900/70 hover:bg-stone-800/90 backdrop-blur-md border-2 border-amber-400/30 hover:border-amber-400/60 text-amber-200 hover:text-amber-100 px-8 py-4 sm:px-10 sm:py-5 rounded-full font-medium text-lg sm:text-xl transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl group">
              <span className="tracking-wide font-semibold">View Full Menu</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 menu-btn-arrow" />
            </button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FeaturedDishes;