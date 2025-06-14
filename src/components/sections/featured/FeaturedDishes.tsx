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