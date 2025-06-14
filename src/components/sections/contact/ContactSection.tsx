import React, { useState, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { 
  ResponsiveContainer, 
  SectionHeader, 
  StaticMap
} from '@/components/common';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { getImagePath } from '@/lib/imagePath';

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  mapEmbedUrl?: string;
}

interface ContactSectionProps {
  contactInfo: ContactInfo;
  title?: string;
  subtitle?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactInfo,
  title = "Contact Us",
  subtitle = "We'd love to hear from you",
}) => {
  const contactRef = useRef<HTMLDivElement>(null);
  const isContactInView = useInView(contactRef, { once: true, amount: 0.2 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitError('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const { themeMode } = useTheme();
  
  // Apply theme-specific styles
  const bgColor = themeMode === 'dark' 
    ? 'bg-charcoal-900' 
    : 'bg-beige-100';
  
  const cardBg = themeMode === 'dark'
    ? 'bg-charcoal-800'
    : 'bg-white';
    
  const textColor = themeMode === 'dark'
    ? 'text-beige-100'
    : 'text-walnut-800';
    
  const inputBg = themeMode === 'dark'
    ? 'bg-charcoal-700 border-gold-500/30 text-beige-100 placeholder-beige-300/50'
    : 'bg-beige-50 border-walnut-300/50 text-charcoal-800 placeholder-charcoal-400/70';
    
  const buttonBg = themeMode === 'dark'
    ? 'bg-gold-400 hover:bg-gold-500 text-charcoal-900'
    : 'bg-walnut-600 hover:bg-walnut-700 text-beige-100';

  const accentColor = themeMode === 'dark'
    ? 'text-gold-400'
    : 'text-gold-500';

  // Background pattern for the section
  const sectionPattern = {
    backgroundImage: themeMode === 'dark'
      ? "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23795939' fill-opacity='0.25'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
      : "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23795939' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
  };

  return (
    <section className={`py-24 ${bgColor} overflow-hidden relative`}>
      {/* Pattern Background with radial gradient */}
      <div className="absolute inset-0" style={sectionPattern}></div>
      <div className="absolute inset-0" style={{
        background: themeMode === 'dark'
          ? 'radial-gradient(circle at center, transparent 20%, rgba(18, 18, 18, 0.5) 60%, rgba(18, 18, 18, 0.95) 100%)'
          : 'radial-gradient(circle at center, transparent 20%, rgba(248, 245, 240, 0.5) 60%, rgba(248, 245, 240, 0.95) 100%)'
      }}></div>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large walnut circle in center-right */}
        <div 
          className="absolute top-1/2 right-1/3 transform -translate-y-1/2" 
          style={{ 
            width: '800px', 
            height: '800px', 
            background: themeMode === 'dark'
              ? 'radial-gradient(circle, rgba(121, 89, 57, 0.1) 0%, rgba(121, 89, 57, 0.03) 60%, transparent 100%)'
              : 'radial-gradient(circle, rgba(121, 89, 57, 0.15) 0%, rgba(121, 89, 57, 0.05) 60%, transparent 100%)',
            filter: 'blur(120px)',
            opacity: 0.8
          }}
        ></div>
        
        {/* Extra large gold circle in bottom-left */}
        <div 
          className="absolute bottom-0 left-0 transform translate-y-1/4" 
          style={{ 
            width: '1000px', 
            height: '1000px', 
            background: themeMode === 'dark'
              ? 'radial-gradient(circle, rgba(230, 192, 122, 0.1) 0%, rgba(230, 192, 122, 0.03) 60%, transparent 100%)'
              : 'radial-gradient(circle, rgba(230, 192, 122, 0.2) 0%, rgba(230, 192, 122, 0.05) 60%, transparent 100%)',
            filter: 'blur(150px)',
            opacity: 0.7
          }}
        ></div>
      </div>

      <ResponsiveContainer className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SectionHeader
            title={title}
            subtitle={subtitle}
            accentWord="Contact"
            size="large"
            decorative={true}
            theme={themeMode === 'dark' ? 'dark' : 'light'}
          />
        </motion.div>

        <div ref={contactRef}>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`${cardBg} rounded-3xl overflow-hidden shadow-heritage-xl max-w-6xl mx-auto`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Form Section */}
              <div className="p-8 md:p-12">
                <div className="max-w-lg">
                  <h3 className={`text-2xl font-display ${textColor} mb-2`}>Send Us a Message</h3>
                  <p className={`${themeMode === 'dark' ? 'text-beige-300' : 'text-charcoal-600'} mb-8 font-serif`}>
                    We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                
                  {submitSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="bg-green-900/30 border border-green-500/20 rounded-xl p-8 text-center"
                    >
                      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-10 w-10 text-green-400" />
                      </div>
                      <h4 className="text-2xl font-display text-green-400 mb-3">Message Sent!</h4>
                      <p className="text-tan-300 font-serif">Thank you for reaching out. We'll get back to you shortly.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div className="relative">
                          <label 
                            htmlFor="name" 
                            className={`block mb-2 text-sm transition-all duration-300 ${
                              focusedField === 'name' ? accentColor : themeMode === 'dark' ? 'text-beige-200' : 'text-walnut-600'
                            }`}
                          >
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => handleFocus('name')}
                            onBlur={handleBlur}
                            required
                            className={`w-full px-4 py-3 ${inputBg} rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-transparent transition-all duration-300`}
                            placeholder="John Doe"
                          />
                          {focusedField === 'name' && (
                            <motion.div 
                              layoutId="focusHighlight"
                              className="absolute bottom-0 left-0 h-0.5 bg-gold-400"
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </div>
                        <div className="relative">
                          <label 
                            htmlFor="email" 
                            className={`block mb-2 text-sm transition-all duration-300 ${
                              focusedField === 'email' ? accentColor : themeMode === 'dark' ? 'text-beige-200' : 'text-walnut-600'
                            }`}
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => handleFocus('email')}
                            onBlur={handleBlur}
                            required
                            className={`w-full px-4 py-3 ${inputBg} rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-transparent transition-all duration-300`}
                            placeholder="john@example.com"
                          />
                          {focusedField === 'email' && (
                            <motion.div 
                              layoutId="focusHighlight"
                              className="absolute bottom-0 left-0 h-0.5 bg-gold-400"
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-6 relative">
                        <label 
                          htmlFor="phone" 
                          className={`block mb-2 text-sm transition-all duration-300 ${
                            focusedField === 'phone' ? accentColor : themeMode === 'dark' ? 'text-beige-200' : 'text-walnut-600'
                          }`}
                        >
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => handleFocus('phone')}
                          onBlur={handleBlur}
                          className={`w-full px-4 py-3 ${inputBg} rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-transparent transition-all duration-300`}
                          placeholder="(123) 456-7890"
                        />
                        {focusedField === 'phone' && (
                          <motion.div 
                            layoutId="focusHighlight"
                            className="absolute bottom-0 left-0 h-0.5 bg-gold-400"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </div>
                      
                      <div className="mb-8 relative">
                        <label 
                          htmlFor="message" 
                          className={`block mb-2 text-sm transition-all duration-300 ${
                            focusedField === 'message' ? accentColor : themeMode === 'dark' ? 'text-beige-200' : 'text-walnut-600'
                          }`}
                        >
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => handleFocus('message')}
                          onBlur={handleBlur}
                          required
                          rows={5}
                          className={`w-full px-4 py-3 ${inputBg} rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-transparent transition-all duration-300`}
                          placeholder="How can we help you?"
                        />
                        {focusedField === 'message' && (
                          <motion.div 
                            layoutId="focusHighlight"
                            className="absolute bottom-0 left-0 h-0.5 bg-gold-400"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </div>
                      
                      {submitError && (
                        <div className="mb-6 p-4 bg-red-900/30 border border-red-500/20 rounded-lg flex items-center gap-3">
                          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                          <p className="text-red-300 text-sm">{submitError}</p>
                        </div>
                      )}
                      
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className={`${buttonBg} px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 w-full sm:w-auto transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-charcoal-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={18} />
                          </>
                        )}
                      </motion.button>
                    </form>
                  )}
                </div>
              </div>

              {/* Info Section with form-pattern.png background */}
              <div className={`${cardBg} relative overflow-hidden`}>
                {/* Background Pattern */}
                <div 
                  className="absolute inset-0 w-full h-full opacity-20"
                  style={{ 
                    backgroundImage: `url('${getImagePath("/form-pattern.png")}')`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: 'auto'
                  }}
                ></div>
                
                <div className="relative z-10 p-8 md:p-12 h-full flex flex-col">
                  <h3 className={`text-2xl font-display ${textColor} mb-8`}>Get in Touch</h3>
                  
                  <div className="space-y-8 mb-8">
                    <motion.div 
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-gold-400/20 flex items-center justify-center flex-shrink-0 mt-1 border border-gold-400/30">
                        <MapPin className="w-6 h-6 text-gold-500" />
                      </div>
                      <div>
                        <h4 className={`text-lg font-display ${textColor} mb-2`}>Our Location</h4>
                        <p className={`${themeMode === 'dark' ? 'text-beige-300' : 'text-charcoal-600'} font-serif`}>{contactInfo.address}</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-gold-400/20 flex items-center justify-center flex-shrink-0 mt-1 border border-gold-400/30">
                        <Phone className="w-6 h-6 text-gold-500" />
                      </div>
                      <div>
                        <h4 className={`text-lg font-display ${textColor} mb-2`}>Phone Number</h4>
                        <p className={`${themeMode === 'dark' ? 'text-beige-300' : 'text-charcoal-600'} font-serif`}>{contactInfo.phone}</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-gold-400/20 flex items-center justify-center flex-shrink-0 mt-1 border border-gold-400/30">
                        <Mail className="w-6 h-6 text-gold-500" />
                      </div>
                      <div>
                        <h4 className={`text-lg font-display ${textColor} mb-2`}>Email Address</h4>
                        <p className={`${themeMode === 'dark' ? 'text-beige-300' : 'text-charcoal-600'} font-serif`}>{contactInfo.email}</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-gold-400/20 flex items-center justify-center flex-shrink-0 mt-1 border border-gold-400/30">
                        <Clock className="w-6 h-6 text-gold-500" />
                      </div>
                      <div>
                        <h4 className={`text-lg font-display ${textColor} mb-2`}>Opening Hours</h4>
                        <p className={`${themeMode === 'dark' ? 'text-beige-300' : 'text-charcoal-600'} font-serif mb-1`}>Weekdays: {contactInfo.hours.weekdays}</p>
                        <p className={`${themeMode === 'dark' ? 'text-beige-300' : 'text-charcoal-600'} font-serif`}>Weekends: {contactInfo.hours.weekends}</p>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Map */}
                  {contactInfo.mapEmbedUrl && (
                    <motion.div 
                      className="mt-auto pt-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <div className="rounded-xl overflow-hidden h-[220px] border border-walnut-600/30 shadow-heritage">
                        <StaticMap 
                          address={contactInfo.address}
                          height="220px"
                          className="bg-charcoal-700/50"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </ResponsiveContainer>
    </section>
  );
};

export default ContactSection;