// src/components/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Star, Shield, Clock, Award, Sparkles, Bus, Users, MapPin } from 'lucide-react';
import { BusSearch } from './BusSearch';

export const HeroSection = () => {
  const floatingIcons = [
    { icon: Star, delay: 0, x: '10%', y: '20%' },
    { icon: Shield, delay: 1, x: '85%', y: '30%' },
    { icon: Clock, delay: 2, x: '15%', y: '70%' },
    { icon: Award, delay: 3, x: '90%', y: '75%' },
    { icon: Sparkles, delay: 0.5, x: '50%', y: '10%' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="glass-card px-6 py-2 rounded-full">
              <span className="text-sm font-semibold text-transparent bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text">
                ✨ Premium Bus Travel in Ethiopia ✨
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            Travel Smarter
            <span className="block bg-gradient-to-r from-blue-400 via-orange-400 to-purple-400 bg-clip-text text-transparent">
              Across Ethiopia
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Experience luxury, comfort, and reliability with our premium fleet. 
            Book your journey in seconds and enjoy world-class service.
          </motion.p>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <BusSearch />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto"
          >
            {[
              { value: '50+', label: 'Bus Partners', icon: Bus },
              { value: '100K+', label: 'Happy Customers', icon: Users },
              { value: '20+', label: 'Cities', icon: MapPin },
              { value: '99%', label: 'On-Time', icon: Clock },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-4 text-center"
              >
                <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
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
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-gray-400">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </motion.div>
    </section>
  );
};