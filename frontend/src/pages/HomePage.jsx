// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp, Bus, Users, MapPin, Clock, Award, Star, Shield, Headphones, Mail, Phone, Send, Facebook, Twitter, Instagram, Linkedin, MessageCircle, Wifi, Coffee, Wind, Battery, Gift, Truck, Tv, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Scroll to top button component
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ArrowUp className="w-5 h-5" />
    </motion.button>
  );
};

// Hero Section Component
const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with GIF */}
      <div className="absolute inset-0">
        <img 
          src="/home-bus.gif" 
          alt="Bus Travel" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/50" />
      </div>

      {/* Content - No padding top, attached to navbar */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Travel Smarter
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Across Ethiopia
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-base md:text-lg text-gray-200 mb-6 max-w-xl leading-relaxed"
          >
            Experience comfort, safety, and reliability with our modern fleet. 
            Book your journey in seconds and enjoy premium travel experience.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/buses')}
            className="group bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-full font-semibold text-base shadow-2xl flex items-center space-x-2 transition-all"
          >
            <span>Search Available Buses</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8"
          >
            {[
              { value: '50+', label: 'Bus Partners', icon: Bus, color: 'text-blue-400' },
              { value: '100K+', label: 'Customers', icon: Users, color: 'text-green-400' },
              { value: '20+', label: 'Cities', icon: MapPin, color: 'text-purple-400' },
              { value: '99%', label: 'On-Time', icon: Clock, color: 'text-orange-400' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-left border border-white/20"
              >
                <stat.icon className={`w-4 h-4 ${stat.color} mb-1`} />
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => {
          const aboutSection = document.getElementById('about');
          aboutSection?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <div className="flex flex-col items-center space-y-1">
          <span className="text-xs text-gray-300">Scroll</span>
          <ChevronDown className="w-4 h-4 text-gray-300" />
        </div>
      </motion.div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Us
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ethiopia's leading bus ticketing platform since 2010
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Our Story</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Founded in 2010, BusTicketing Ethiopia has grown to become the nation's leading 
              online bus ticketing platform. We started with a simple mission: to make bus travel 
              accessible, convenient, and enjoyable for every Ethiopian.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Today, we partner with over 50 premium bus operators, serving more than 100,000 
              satisfied customers across 20+ cities. Our technology platform processes thousands 
              of bookings daily.
            </p>
            <div className="flex gap-3 pt-3">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg text-white">
                <div className="text-2xl font-bold">10+</div>
                <div className="text-xs">Years</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-lg text-white">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-xs">Support</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=300&fit=crop"
                alt="Modern Bus Fleet"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Award, title: 'Industry Leader', desc: 'Most trusted', color: 'from-yellow-500 to-orange-500' },
            { icon: Star, title: 'Quality', desc: 'Top-rated', color: 'from-green-500 to-teal-500' },
            { icon: Shield, title: 'Safety', desc: 'GPS tracking', color: 'from-red-500 to-pink-500' },
            { icon: Headphones, title: 'Support', desc: '24/7', color: 'from-purple-500 to-indigo-500' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -3 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md text-center"
            >
              <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-sm font-bold text-gray-800 dark:text-white">{item.title}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Services Section Component
const ServicesSection = () => {
  const services = [
    { icon: Bus, title: 'Premium Fleet', desc: 'Modern buses', color: 'from-blue-500 to-cyan-500' },
    { icon: Clock, title: 'Punctual', desc: 'On-time', color: 'from-green-500 to-emerald-500' },
    { icon: Shield, title: 'Safety', desc: 'GPS tracking', color: 'from-red-500 to-pink-500' },
    { icon: Headphones, title: 'Support', desc: '24/7', color: 'from-purple-500 to-indigo-500' },
    { icon: Wifi, title: 'Free Wi-Fi', desc: 'Stay connected', color: 'from-yellow-500 to-orange-500' },
    { icon: Coffee, title: 'Refreshments', desc: 'Snacks', color: 'from-teal-500 to-green-500' },
    { icon: Wind, title: 'AC', desc: 'Climate control', color: 'from-sky-500 to-blue-500' },
    { icon: Battery, title: 'Charging', desc: 'USB ports', color: 'from-rose-500 to-red-500' },
  ];

  return (
    <section id="services" className="min-h-screen py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300">Premium amenities for your comfort</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -3 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md cursor-pointer text-center"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mx-auto mb-2 shadow-md`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-bold text-gray-800 dark:text-white">{service.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: Phone, title: 'Phone', details: '+251 11 123 4567', color: 'from-green-500 to-emerald-500' },
    { icon: Mail, title: 'Email', details: 'info@busticketing.com', color: 'from-blue-500 to-cyan-500' },
    { icon: MapPin, title: 'Office', details: 'Addis Ababa, Ethiopia', color: 'from-red-500 to-pink-500' },
  ];

  return (
    <section id="contact" className="min-h-screen py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Contact Us
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300">Get in touch with us</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01, x: 3 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md flex items-center space-x-3"
              >
                <div className={`w-10 h-10 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center`}>
                  <info.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-800 dark:text-white">{info.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{info.details}</p>
                </div>
              </motion.div>
            ))}
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
              <h3 className="font-semibold text-sm text-gray-800 dark:text-white mb-3 text-center">Follow Us</h3>
              <div className="flex justify-center space-x-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  required
                />
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 resize-none"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-2 rounded-lg text-sm transition-all"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Main HomePage Component
export const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
      <ScrollToTopButton />
    </div>
  );
};