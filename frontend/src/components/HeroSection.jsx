// src/components/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Star, Shield, Clock, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const navigate = useNavigate();

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
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70" />
      </div>

      {/* Content - Full Display */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
          >
            Travel Smarter
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Across Ethiopia
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
          >
            Experience comfort, safety, and reliability with our modern fleet. 
            Book your journey in seconds and enjoy premium travel experience.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/buses')}
            className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl flex items-center justify-center space-x-2 transition-all mx-auto"
          >
            <span>Search Available Buses</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {[
              { value: '50+', label: 'Bus Partners', icon: Star },
              { value: '100K+', label: 'Happy Customers', icon: Shield },
              { value: '20+', label: 'Cities', icon: Clock },
              { value: '99%', label: 'On-Time', icon: Award },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20"
              >
                <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
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
          <span className="text-sm text-gray-300">Explore More</span>
          <ChevronDown className="w-5 h-5 text-gray-300" />
        </div>
      </motion.div>
    </section>
  );
};