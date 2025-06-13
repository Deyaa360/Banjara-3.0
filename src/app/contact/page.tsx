"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send,
  CheckCircle,
  Star,
  Calendar,
  Users,
  Utensils,
  ArrowRight,
  Heart,
  Award,
  Shield
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
      description: "Available daily 10 AM - 11 PM"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@banjararestaurant.com", "reservations@banjararestaurant.com"],
      description: "We respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Heritage Lane", "Cultural District, NY 10001"],
      description: "Easy parking & public transport"
    },
    {
      icon: Clock,
      title: "Opening Hours",
      details: ["Mon-Thu: 5:00 PM - 10:00 PM", "Fri-Sun: 5:00 PM - 11:00 PM"],
      description: "Closed Tuesdays for maintenance"
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: MessageCircle },
    { value: 'reservation', label: 'Reservations', icon: Calendar },
    { value: 'events', label: 'Private Events', icon: Users },
    { value: 'catering', label: 'Catering', icon: Utensils }
  ];

  const faqs = [
    {
      question: "How far in advance should I make a reservation?",
      answer: "We recommend booking at least 2-3 days in advance, especially for weekends and special occasions. For large groups (8+), please book at least a week ahead."
    },
    {
      question: "Do you accommodate dietary restrictions?",
      answer: "Absolutely! We offer extensive vegetarian, vegan, and gluten-free options. Please inform us of any allergies or dietary requirements when booking."
    },
    {
      question: "Is there a dress code?",
      answer: "We maintain a smart casual dress code. While we welcome guests in comfortable attire, we ask that you avoid beachwear, athletic wear, or overly casual clothing."
    },
    {
      question: "Do you offer private dining or event spaces?",
      answer: "Yes! We have a beautiful private dining room that accommodates up to 20 guests, perfect for special celebrations, business dinners, or intimate gatherings."
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-yellow-50/30">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-stone-900" />
          <div className="absolute inset-0 bg-gradient-radial from-yellow-600/15 to-transparent" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto text-center px-6">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-4 mb-12 px-6 py-3 bg-white/5 backdrop-blur-sm border border-yellow-400/20 rounded-full">
              <Heart className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-300 text-sm font-medium tracking-wider uppercase">
                Connect With Banjara
              </span>
              <Heart className="w-4 h-4 text-yellow-400" />
            </div>
            
            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight font-bold">
              Let's Create
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Memories
              </span>
              <br />
              Together
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-stone-300 mb-16 max-w-4xl mx-auto leading-relaxed">
              From intimate dinners to grand celebrations, we're here to craft 
              <br className="hidden md:block" />
              extraordinary culinary experiences that tell your story.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
              <Button 
                asChild 
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white px-8 py-4 rounded-2xl text-lg font-medium shadow-2xl transition-all duration-300 border-0"
              >
                <Link href="#contact-form" className="flex items-center gap-3">
                  Start Conversation
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-2xl text-lg font-medium border border-white/20 hover:border-white/30 transition-all duration-300"
              >
                <Link href="tel:+15551234567" className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  Call Directly
                </Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-stone-400">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Award Winning</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-stone-600" />
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-current" />
                <span className="text-sm">4.9/5 Rating</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-stone-600" />
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Trusted by 1000+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-stone-50/50 to-white" />
        
        <div className="max-w-7xl mx-auto relative z-10 px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-yellow-50 rounded-full border border-yellow-200/50">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <span className="text-yellow-700 text-sm font-medium tracking-wider uppercase">
                Ways to Connect
              </span>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            </div>
            
            <h2 className="text-5xl md:text-6xl text-gray-900 mb-6 leading-tight font-bold">
              We're Here
              <br />
              <span className="bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                For You
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Choose the way that feels most comfortable for you to reach out and connect with our team.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={info.title}
                className="group relative"
              >
                <div className="absolute inset-0 bg-white rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2" />
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-amber-50/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-10 text-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                        <info.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-800 transition-colors duration-300">
                    {info.title}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-700 font-medium text-lg leading-relaxed">
                        {detail}
                      </p>
                    ))}
                  </div>
                  
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {info.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-stone-50" />
        
        <div className="max-w-7xl mx-auto relative z-10 px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-yellow-200/50 shadow-lg">
              <MessageCircle className="w-4 h-4 text-yellow-600" />
              <span className="text-yellow-700 text-sm font-medium tracking-wider uppercase">
                Start Your Journey
              </span>
              <MessageCircle className="w-4 h-4 text-yellow-600" />
            </div>
            
            <h2 className="text-5xl md:text-6xl text-gray-900 mb-6 leading-tight font-bold">
              Let's Make It
              <br />
              <span className="bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Happen
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Share your vision with us, and we'll craft an experience that exceeds your expectations.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3">
              <div className="relative">
                <div className="absolute inset-0 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20" />
                
                <div className="relative p-12">
                  <div className="mb-10">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Tell Us Your Story
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Every great experience begins with a conversation. Let's start yours.
                    </p>
                  </div>
                
                  {isSubmitted ? (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                        <CheckCircle className="w-12 h-12 text-white" />
                      </div>
                      <h4 className="text-3xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h4>
                      <p className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto">
                        Thank you for reaching out. Our team will respond within 24 hours to continue the conversation.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div>
                        <label className="block text-lg font-semibold text-gray-800 mb-6">
                          How can we help you today?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {inquiryTypes.map((type) => (
                            <label
                              key={type.value}
                              className={`group relative flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                                formData.inquiryType === type.value
                                  ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50 shadow-xl'
                                  : 'border-stone-200 hover:border-yellow-300 hover:bg-yellow-50/50 hover:shadow-lg'
                              }`}
                            >
                              <input
                                type="radio"
                                name="inquiryType"
                                value={type.value}
                                checked={formData.inquiryType === type.value}
                                onChange={handleInputChange}
                                className="sr-only"
                              />
                              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mr-4 transition-all duration-300 ${
                                formData.inquiryType === type.value 
                                  ? 'bg-gradient-to-br from-yellow-500 to-amber-500 shadow-lg scale-110' 
                                  : 'bg-stone-100 group-hover:bg-yellow-100 group-hover:scale-105'
                              }`}>
                                <type.icon className={`w-7 h-7 transition-colors duration-300 ${
                                  formData.inquiryType === type.value ? 'text-white' : 'text-stone-500 group-hover:text-yellow-600'
                                }`} />
                              </div>
                              <div className="flex-1">
                                <span className={`text-lg font-semibold transition-colors duration-300 block ${
                                  formData.inquiryType === type.value ? 'text-yellow-700' : 'text-gray-700 group-hover:text-yellow-700'
                                }`}>
                                  {type.label}
                                </span>
                              </div>
                              
                              {formData.inquiryType === type.value && (
                                <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                                  <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                              )}
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="block text-lg font-semibold text-gray-800">
                            Full Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full h-14 px-6 text-lg border-2 border-stone-200 rounded-xl focus:border-yellow-400 focus:ring-0 transition-colors duration-300"
                            placeholder="Your full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-lg font-semibold text-gray-800">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full h-14 px-6 text-lg border-2 border-stone-200 rounded-xl focus:border-yellow-400 focus:ring-0 transition-colors duration-300"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="block text-lg font-semibold text-gray-800">
                            Phone Number
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full h-14 px-6 text-lg border-2 border-stone-200 rounded-xl focus:border-yellow-400 focus:ring-0 transition-colors duration-300"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="subject" className="block text-lg font-semibold text-gray-800">
                            Subject *
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            type="text"
                            required
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full h-14 px-6 text-lg border-2 border-stone-200 rounded-xl focus:border-yellow-400 focus:ring-0 transition-colors duration-300"
                            placeholder="Brief subject line"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="block text-lg font-semibold text-gray-800">
                          Your Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={6}
                          className="w-full px-6 py-4 text-lg border-2 border-stone-200 rounded-xl focus:border-yellow-400 focus:ring-0 transition-colors duration-300 resize-none"
                          placeholder="Tell us about your vision, special requirements, or any questions you have..."
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-16 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 hover:from-yellow-600 hover:via-amber-600 hover:to-yellow-600 text-white text-xl font-semibold rounded-2xl shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-0"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                            Sending Your Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-6 h-6 mr-3" />
                            Send Message
                            <ArrowRight className="w-6 h-6 ml-3" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
            
            {/* Map & Location */}
            <div className="lg:col-span-2 space-y-8">
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/30">
                  <div className="h-96 relative">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.1430527300804!2d-73.99021492397307!3d40.73687767138989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2599ecdaf86bd%3A0xf9a5ed1086f70805!2sGupShup!5e0!3m2!1sen!2sus!4v1749182403471!5m2!1sen!2sus" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Banjara Restaurant Location"
                      className="w-full h-full rounded-3xl"
                    />
                  </div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/30">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h5 className="text-lg font-bold text-gray-900">Find Us Here</h5>
                          <p className="text-gray-600">123 Heritage Lane, Cultural District</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-2xl border border-white/30 p-10">
                  <div className="mb-8">
                    <h4 className="text-2xl font-bold text-gray-900 mb-3">
                      Visit Our Restaurant
                    </h4>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Located in the heart of the cultural district, we're easily accessible and ready to welcome you.
                    </p>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl flex items-center justify-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h5 className="text-xl font-bold text-gray-900 mb-2">Address</h5>
                        <p className="text-lg text-gray-700 font-medium">123 Heritage Lane</p>
                        <p className="text-lg text-gray-600">Cultural District, NY 10001</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl flex items-center justify-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h5 className="text-xl font-bold text-gray-900 mb-3">Hours</h5>
                        <div className="space-y-2">
                          <p className="text-lg text-gray-700">Monday - Thursday: 5:00 PM - 10:00 PM</p>
                          <p className="text-lg text-gray-700">Friday - Sunday: 5:00 PM - 11:00 PM</p>
                          <p className="text-gray-500 mt-2">Closed Tuesdays for maintenance</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-8 border-t border-stone-200">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-6 h-6 text-amber-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-lg text-gray-700 font-semibold">4.9/5</span>
                        <span className="text-gray-500">(200+ reviews)</span>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3">
                        {['Valet Parking Available', 'Wheelchair Accessible', 'Public Transport Nearby'].map((feature) => (
                          <div key={feature} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                            <CheckCircle className="w-5 h-5 text-yellow-600" />
                            <span className="text-gray-700 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-stone-50/30 to-yellow-50/20" />
        
        <div className="max-w-7xl mx-auto relative z-10 px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-yellow-200/50 shadow-lg">
              <MessageCircle className="w-4 h-4 text-yellow-600" />
              <span className="text-yellow-700 text-sm font-medium tracking-wider uppercase">
                Common Questions
              </span>
              <MessageCircle className="w-4 h-4 text-yellow-600" />
            </div>
            
            <h2 className="text-5xl md:text-6xl text-gray-900 mb-6 leading-tight font-bold">
              Questions &
              <br />
              <span className="bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Answers
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about dining with us, planning events, and making reservations.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto space-y-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="absolute inset-0 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1" />
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/30 to-amber-50/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-10">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                          <MessageCircle className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-800 transition-colors duration-300 leading-tight">
                        {faq.question}
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-20">
            <div className="relative max-w-2xl mx-auto">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-white/30">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Still Have Questions?
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our team is here to help you plan the perfect dining experience.
                </p>
                <Button 
                  asChild 
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl transition-all duration-300 border-0"
                >
                  <Link href="#contact-form" className="flex items-center gap-3">
                    Get in Touch
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-stone-900" />
        
        <div className="max-w-7xl mx-auto relative z-10 px-6">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-4 mb-12 px-8 py-4 bg-white/5 backdrop-blur-sm border border-yellow-400/20 rounded-full">
              <Heart className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-300 text-sm font-medium tracking-wider uppercase">
                Ready to Begin?
              </span>
              <Heart className="w-5 h-5 text-yellow-400" />
            </div>
            
            <h2 className="text-6xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight font-bold">
              Your Table
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Awaits
              </span>
            </h2>
            
            <p className="text-2xl md:text-3xl text-stone-300 mb-16 max-w-4xl mx-auto leading-relaxed">
              Experience the extraordinary. Reserve your culinary journey 
              <br className="hidden md:block" />
              and discover flavors that tell stories.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-8">
              <Button 
                asChild 
                className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 hover:from-yellow-600 hover:via-amber-600 hover:to-yellow-600 text-white px-10 py-5 rounded-2xl text-xl font-semibold shadow-2xl transition-all duration-300 border-0"
              >
                <Link href="/reservations" className="flex items-center gap-4">
                  Reserve Your Table
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-10 py-5 rounded-2xl text-xl font-semibold border-2 border-white/20 hover:border-white/30 transition-all duration-300"
              >
                <Link href="/menu" className="flex items-center gap-4">
                  Explore Menu
                  <Utensils className="w-6 h-6" />
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-16 text-stone-400">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-yellow-400" />
                <span className="text-lg">Award Winning Cuisine</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-stone-600" />
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-amber-400 fill-current" />
                <span className="text-lg">4.9/5 Guest Rating</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-stone-600" />
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-yellow-400" />
                <span className="text-lg">1000+ Happy Guests</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}