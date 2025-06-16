"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Award } from 'lucide-react';
import { getImagePath } from "@/lib/imagePath";

export default function AboutPage() {



  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={getImagePath("/images/about/about-hero.jpg")}
            alt="Banjara Restaurant Heritage"
            fill
            className="object-cover scale-105"
            priority
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900/90 via-stone-900/85 to-charcoal-800/90" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-warm-400/30 rounded-full animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-amber-400/40 rounded-full animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-warm-300/20 rounded-full animate-float" style={{ animationDelay: '4s' }} />
        </div>
        
        {/* Content */}
        <div className="relative z-10 container-luxury text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-warm-400" />
              <span className="text-warm-400 text-sm font-medium tracking-[0.3em] uppercase font-body">
                Our Heritage
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-warm-400" />
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight"
            >
              The Spirit of
              <br />
              <span className="text-gradient-gold">Nomadic Cuisine</span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-readable-lg text-stone-200 mb-12 font-body max-w-3xl mx-auto"
            >
              The Banjaras, a proud and colorful nomadic tribe, roamed the Indian subcontinent for centuries. 
              Known as the "Carriers of the Desert," they transported spices, textiles, and traditions, 
              weaving a rich tapestry of flavors across the land. We honor their legacy by bringing these 
              authentic regional cuisines to your table.
            </motion.p>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-warm-400 mb-2">15+</div>
                <div className="text-sm text-stone-300 font-body">Regional Inspirations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-warm-400 mb-2">30+</div>
                <div className="text-sm text-stone-300 font-body">Authentic Dishes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-warm-400 mb-2">1</div>
                <div className="text-sm text-stone-300 font-body">Unifying Philosophy</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-warm-400" />
                <span className="text-warm-600 text-sm font-medium tracking-[0.3em] uppercase font-body">
                  Our Journey
                </span>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-warm-400" />
              </div>
              
              <h2 className="font-display text-display-md text-charcoal-900 mb-8 leading-tight">
                Carrying Forward
                <br />
                <span className="text-gradient-gold">Ancient Traditions</span>
              </h2>
              
              <div className="space-y-6 mb-10">
                <p className="text-readable text-charcoal-700 font-body">
                  Banjara was born from a deep reverence for the nomadic spirit—a spirit of movement, 
                  tradition, and connection. Our journey began not on a specific date, but through 
                  decades of collective culinary experience, culminating in this, our first official 
                  venture under the Banjara name.
                </p>
                
                <p className="text-readable text-charcoal-700 font-body">
                  Our philosophy is simple: to follow the paths of the nomads. We've journeyed through 
                  the states of India, from the bustling markets of Delhi to the serene backwaters of 
                  Kerala, to curate a menu that is both authentic and surprising. You'll find it in the 
                  smoky Laal Maas of Rajasthan, the delicate Jhol Momo of Arunachal Pradesh, and the 
                  vibrant Crab Sukkha of Chennai.
                </p>
                
                <p className="text-readable text-charcoal-700 font-body">
                  We source our spices from their regions of origin and honor the time-tested techniques 
                  that give each dish its unique character. This isn't just a restaurant; it's the 
                  destination of a long and flavorful journey.
                </p>
              </div>
              
              <Button asChild className="btn-primary font-body">
                <Link href="/menu">Explore Our Heritage Menu</Link>
              </Button>
            </motion.div>
            
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-luxury-lg">
                <Image
                  src={getImagePath("/heritage.png")}
                  alt="Banjara Heritage - Carrying Forward Ancient Traditions"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-luxury-lg border border-stone-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-warm-400/10 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-warm-500" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-charcoal-900">Heritage Certified</div>
                    <div className="text-sm text-charcoal-600 font-body">Authentic Banjara Cuisine</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="section-padding bg-gradient-dark relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-warm-400 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-amber-500 rounded-full blur-3xl" />
        </div>
        
        <div className="container-luxury relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-warm-400" />
              <span className="text-warm-400 text-sm font-medium tracking-[0.3em] uppercase font-body">
                Join Our Journey
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-warm-400" />
            </div>
            
            <h2 className="font-display text-display-lg text-white mb-8 leading-tight">
              Experience the
              <br />
              <span className="text-gradient-warm">Nomadic Legacy</span>
            </h2>
            
            <p className="text-readable-lg text-stone-200 mb-12 font-body max-w-3xl mx-auto">
              Every meal at Banjara is an invitation to travel through time and tradition. Join us to experience 
              the authentic flavors that have journeyed across a subcontinent and through generations.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button asChild className="btn-primary font-body text-lg">
                <Link href="/reservations">Reserve Your Table</Link>
              </Button>
              
              <Button asChild className="btn-secondary font-body text-lg">
                <Link href="/menu">Explore Our Menu</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}