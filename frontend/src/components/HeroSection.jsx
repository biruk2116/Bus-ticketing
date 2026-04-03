// src/components/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Star, Shield, Clock, Award, Bus, Users, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background with GIF */}
      <div className="absolute inset-0">
        <img 
          src="/home-bus.gif" 
          alt="Bus Travel" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
      </div>

      {/* Content - Left Aligned with padding top to avoid navbar */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          {/* Main Heading - Medium size */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Travel Smarter
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Across Ethiopia
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-base md:text-lg text-gray-200 mb-8 max-w-2xl leading-relaxed"
          >
            Experience comfort, safety, and reliability with our modern fleet. 
            Book your journey in seconds and enjoy premium travel experience across Ethiopia's most beautiful routes.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/buses')}
            className="group bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-full font-semibold text-base shadow-2xl flex items-center space-x-2 transition-all"
          >
            <span>Search Available Buses</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10"
          >
            {[
              { value: '50+', label: 'Bus Partners', icon: Bus, color: 'text-blue-400' },
              { value: '100K+', label: 'Happy Customers', icon: Users, color: 'text-green-400' },
              { value: '20+', label: 'Cities', icon: MapPin, color: 'text-purple-400' },
              { value: '99%', label: 'On-Time', icon: Clock, color: 'text-orange-400' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-left border border-white/20"
              >
                <stat.icon className={`w-5 h-5 ${stat.color} mb-1`} />
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
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs text-gray-300">Scroll to explore</span>
          <ChevronDown className="w-4 h-4 text-gray-300" />
        </div>
      </motion.div>
    </section>
  );
};