'use client';

import React from 'react';
import { getImagePath } from "@/lib/imagePath";
import { BannerHero } from "@/components/sections/hero";
import { FeaturedDishes } from "@/components/sections/featured";
import { AboutSection } from "@/components/sections/about";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta";
import { GallerySection } from "@/components/sections/gallery";
import { ContactSection } from "@/components/sections/contact";
import { LazySection, SectionTransition } from "@/components/common";
import { ThemeProvider } from "@/context/ThemeContext";

export default function Home() {
  // Banner content for hero section
  const bannerContent = [
    {
      src: getImagePath('/banner1.png'),
      alt: 'Authentic Indian Cuisine - Banner 1',
      title: 'Where Heritage Meets Flavor',
      subtitle: 'Every spice tells a story, every dish a masterpiece crafted with generations of wisdom.',
      accent: 'Heritage'
    },
    {
      src: getImagePath('/banner2.png'), 
      alt: 'Traditional Banjara Dishes - Banner 2',
      title: 'Artistry in Every Bite',
      subtitle: 'Our chefs transform fine ingredients into symphonies of taste that awaken your senses.',
      accent: 'Artistry'
    },
    {
      src: getImagePath('/banner3.png'),
      alt: 'Nomadic Culinary Experience - Banner 3',
      title: 'Moments Worth Savoring',
      subtitle: 'Exceptional cuisine meets heartfelt hospitality to create unforgettable memories.',
      accent: 'Moments'
    }
  ];

  // Featured dishes data
  const featuredDishes = [
    {
      id: "butter-chicken",
      name: "Butter Chicken",
      description: "A royal dish from the kitchens of Punjab, featuring tender chicken in a rich tomato gravy, finished with cream and butter powder.",
      image: getImagePath("/images/menu/BUTTER CHICKEN (PUNJAB).png"),
      region: "Punjab",
      isVegetarian: false,
      isSignature: true,
      spiceLevel: 2
    },
    {
      id: "galauti-kebab",
      name: "Galauti Kebab",
      description: "Minced goat, vetiver, rosewater ghee, fried onion, cardamom, mint chutney",
      image: getImagePath("/images/menu/GALAUTI KEBAB (LUCKNOW).png"),
      region: "Lucknow",
      isVegetarian: false,
      isSignature: true,
      spiceLevel: 3
    },
    {
      id: "nalli-biryani",
      name: "Nalli Biryani",
      description: "Lamb shank, saffron, mint, and yogurt",
      image: getImagePath("/images/menu/NALLI BIRYANI (HYDERABAD).png"),
      region: "Hyderabad",
      isVegetarian: false,
      isSignature: true,
      spiceLevel: 2
    }
  ];

  // Gallery images data
  const galleryImages = [
    {
      id: "gallery-1",
      src: getImagePath("/banner1.png"),
      alt: "Elegant Restaurant Interior",
      category: "Interior"
    },
    {
      id: "gallery-2",
      src: getImagePath("/banner2_new.png"),
      alt: "Signature Butter Chicken",
      category: "Food"
    },
    {
      id: "gallery-3",
      src: getImagePath("/banner3.png"),
      alt: "Chef's Special Preparation",
      category: "Chefs"
    },
    {
      id: "gallery-4",
      src: getImagePath("/banner1.png"),
      alt: "Private Dining Area",
      category: "Interior"
    },
    {
      id: "gallery-5",
      src: getImagePath("/banner2_new.png"),
      alt: "Vegetarian Thali Platter",
      category: "Food"
    },
    {
      id: "gallery-6",
      src: getImagePath("/banner3.png"),
      alt: "Spice Selection Process",
      category: "Chefs"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: "testimonial-1",
      name: "Priya Sharma",
      role: "Food Critic",
      quote: "The flavors at Banjara transported me back to the streets of Delhi. Every dish tells a story of tradition and innovation.",
      image: getImagePath("/banner1.png"),
      rating: 5
    },
    {
      id: "testimonial-2",
      name: "James Wilson",
      role: "Regular Guest",
      quote: "I've dined at many Indian restaurants, but Banjara stands out with its authentic flavors and impeccable service.",
      image: getImagePath("/banner2_new.png"),
      rating: 5
    },
    {
      id: "testimonial-3",
      name: "Aisha Patel",
      role: "Food Blogger",
      quote: "The attention to detail in each dish is remarkable. The chef's passion for Indian cuisine is evident in every bite.",
      image: getImagePath("/banner3.png"),
      rating: 4
    },
    {
      id: "testimonial-4",
      name: "Michael Chen",
      role: "First-time Visitor",
      quote: "An unforgettable dining experience! The blend of spices was perfectly balanced, and the staff made excellent recommendations.",
      rating: 5
    }
  ];

  // Contact info data
  const contactInfo = {
    address: "123 Spice Avenue, Culinary District, New York, NY 10001",
    phone: "+1 (555) 123-4567",
    email: "info@banjaraindian.com",
    hours: {
      weekdays: "11:00 AM - 10:00 PM",
      weekends: "12:00 PM - 11:00 PM"
    },
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425872426698!3d40.74076987932881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1696005254330!5m2!1sen!2sus"
  };

  return (
    <main className="min-h-screen">
      {/* Act I: Immersive Introduction (Dark Theme) */}
      <ThemeProvider themeMode="dark">
        {/* Hero Banner Section */}
        <BannerHero 
          slides={bannerContent}
          primaryButtonText="Reserve a Table"
          primaryButtonLink="/reservations"
          secondaryButtonText="View Menu"
          secondaryButtonLink="/menu"
        />

        {/* Featured Dishes Section */}
        <FeaturedDishes 
          dishes={featuredDishes}
          title="Chef's Featured Creations"
          subtitle="Discover our most celebrated dishes, each telling a unique story of India's rich culinary heritage"
          viewAllLink="/menu"
        />
      </ThemeProvider>

      {/* Transition from Dark to Light */}
      <ThemeProvider themeMode="dark">
        <SectionTransition 
          fromTheme="dark" 
          toTheme="light" 
          height="h-32"
        />
      </ThemeProvider>

      {/* Act II: Brand Story (Light Theme) */}
      <ThemeProvider themeMode="light">
        {/* Heritage Section */}
        <AboutSection 
          title="Where Tradition Meets Innovation"
          subtitle="Our Heritage"
          description="In the heart of culinary excellence, we craft an experience where centuries of traditional wisdom intertwine with contemporary artistry. Each dish is a testament to our commitment to preserving the authentic essence of Indian cuisine while embracing the possibilities of modern gastronomy."
          imageSrc={getImagePath("/banner2_new.png")}
          imageAlt="Traditional Banjara Cuisine"
          direction="image-left"
          decorative={true}
        />

        {/* Testimonials Section */}
        <LazySection id="testimonials-section">
          <TestimonialsSection testimonials={testimonials} />
        </LazySection>
      </ThemeProvider>

      {/* Act III: Action-Oriented Conclusion (Dark Theme) */}
      <ThemeProvider themeMode="dark">
        {/* Gallery Section */}
        <LazySection id="gallery-section">
          <GallerySection 
            images={galleryImages}
            categories={["Interior", "Food", "Chefs"]}
          />
        </LazySection>

        {/* CTA Section */}
        <LazySection id="cta-section">
          <CTASection 
            title="Reserve Your Table Today"
            subtitle="Experience the authentic flavors of India in an elegant setting"
            primaryButtonText="Make a Reservation"
            primaryButtonLink="/reservations"
            secondaryButtonText="View Menu"
            secondaryButtonLink="/menu"
            tertiaryButtonText="Call Us"
            tertiaryButtonLink="tel:+15551234567"
            phoneNumber="+1 (555) 123-4567"
            backgroundImage={getImagePath("/banner1.png")}
          />
        </LazySection>
        
        {/* Contact Section - Now with dark theme */}
        <LazySection id="contact-section">
          <ContactSection contactInfo={contactInfo} />
        </LazySection>
      </ThemeProvider>
    </main>
  );
}