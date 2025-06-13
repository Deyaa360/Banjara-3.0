'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MessageSquare, User } from 'lucide-react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    setIsSuccess(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    setIsSubmitting(false);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isSuccess && (
        <div className="bg-cardamom-500 text-pepper-900 p-4 rounded-md mb-4">
          <p className="font-medium">Message Sent Successfully!</p>
          <p className="text-sm">We'll get back to you as soon as possible.</p>
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="name" className="text-gold-400">
          Full Name
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gold-500" />
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            required
            className="pl-10 bg-pepper-900 border-gold-500/30 text-basmati-100 focus:ring-gold-500"
            placeholder="John Doe"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gold-400">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gold-500" />
          <Input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            required
            className="pl-10 bg-pepper-900 border-gold-500/30 text-basmati-100 focus:ring-gold-500"
            placeholder="john@example.com"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-gold-400">
          Phone Number
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-gold-500" />
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
            className="pl-10 bg-pepper-900 border-gold-500/30 text-basmati-100 focus:ring-gold-500"
            placeholder="(123) 456-7890"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subject" className="text-gold-400">
          Subject
        </Label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full p-2 bg-pepper-900 border border-gold-500/30 rounded-md text-basmati-100 focus:outline-none focus:ring-2 focus:ring-gold-500"
        >
          <option value="" disabled>Select a subject</option>
          <option value="reservation">Reservation Inquiry</option>
          <option value="feedback">Feedback</option>
          <option value="catering">Catering Services</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message" className="text-gold-400">
          Message
        </Label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gold-500" />
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
            className="pl-10 bg-pepper-900 border-gold-500/30 text-basmati-100 focus:ring-gold-500"
            placeholder="How can we help you?"
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gold-500 hover:bg-gold-600 text-pepper-900 font-medium"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}