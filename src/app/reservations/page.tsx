'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ReservationForm from '@/components/reservation/ReservationForm';
import { getImagePath } from '@/lib/imagePath';
import { SafeImage } from '@/components/common';

export default function ReservationsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px]">
        <Image
          src={getImagePath("/banner1.png")}
          alt="Reservation Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/40" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              Make a Reservation
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto">
              Experience the authentic flavors of North India in our elegant setting
            </p>
          </div>
        </motion.div>
      </section>

      {/* Reservation Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Reservation Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-card rounded-3xl p-8 shadow-xl"
              >
                <div className="mb-8">
                  <h2 className="font-display text-3xl font-bold text-primary mb-4">
                    Reserve Your Table
                  </h2>
                  <div className="w-20 h-0.5 bg-primary/50"></div>
                </div>
                <ReservationForm />
              </motion.div>

              {/* Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="bg-card rounded-3xl p-8 shadow-xl">
                  <div className="mb-8">
                    <h2 className="font-display text-3xl font-bold text-primary mb-4">
                      Reservation Information
                    </h2>
                    <div className="w-20 h-0.5 bg-primary/50"></div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-display font-semibold text-primary mb-4">
                        Opening Hours
                      </h3>
                      <div className="space-y-2 text-muted-foreground">
                        <p className="flex justify-between">
                          <span className="font-medium">Monday - Friday</span>
                          <span>11:30 AM - 10:00 PM</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="font-medium">Saturday - Sunday</span>
                          <span>12:00 PM - 11:00 PM</span>
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-display font-semibold text-primary mb-4">
                        Reservation Policy
                      </h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Reservations are recommended, especially for weekends and holidays</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>For parties of 8 or more, please call us directly</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>We hold reservations for 15 minutes past the reserved time</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Special requests are accommodated based on availability</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-display font-semibold text-primary mb-4">
                        Contact Us
                      </h3>
                      <div className="space-y-2 text-muted-foreground">
                        <p className="flex items-center">
                          <span className="font-medium w-20">Phone:</span>
                          <span>(123) 456-7890</span>
                        </p>
                        <p className="flex items-center">
                          <span className="font-medium w-20">Email:</span>
                          <span>reservations@banjara.com</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-3xl p-8 shadow-xl">
                  <h3 className="text-2xl font-display font-semibold text-primary mb-6">
                    Restaurant Location
                  </h3>
                  <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                    <SafeImage
                      src={getImagePath("/banner2.png")}
                      alt="Restaurant Location"
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-muted-foreground">
                    <span className="font-medium">Address:</span> 123 Spice Avenue, Culinary District, City, 12345
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Private Dining Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold text-primary mb-6">
              Private Dining & Events
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Host your special occasion in our elegant private dining space
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl overflow-hidden shadow-xl"
            >
              <div className="relative h-64">
                <Image
                  src={getImagePath("/banner3.png")}
                  alt="Private Dining Room"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-semibold text-primary mb-4">
                  Private Dining Room
                </h3>
                <p className="text-muted-foreground mb-6">
                  Our elegant private dining room can accommodate up to 20 guests and offers a sophisticated 
                  setting for business dinners, family celebrations, or intimate gatherings.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Customizable menu options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Audio-visual equipment available</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Dedicated service staff</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl overflow-hidden shadow-xl"
            >
              <div className="relative h-64">
                <Image
                  src={getImagePath("/banner1.png")}
                  alt="Banquet Hall"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-semibold text-primary mb-4">
                  Banquet Hall
                </h3>
                <p className="text-muted-foreground mb-6">
                  Our spacious banquet hall is perfect for larger events such as wedding receptions, 
                  corporate events, and milestone celebrations for up to 80 guests.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Flexible seating arrangements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Custom catering packages</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Event planning assistance</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-4">
              For more information about private dining and events, please contact our events team:
            </p>
            <p className="text-primary font-medium">
              events@banjara.com | (123) 456-7892
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}