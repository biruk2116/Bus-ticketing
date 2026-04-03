// src/pages/AboutPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Globe, Heart, Star, Bus, Users, MapPin, Clock, Shield, Headphones } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About BusTicketing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Revolutionizing bus travel in Ethiopia with technology, safety, and comfort
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Founded in 2010, BusTicketing Ethiopia has grown to become the nation's leading 
              online bus ticketing platform. We started with a simple mission: to make bus travel 
              accessible, convenient, and enjoyable for every Ethiopian.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Today, we partner with over 50 premium bus operators, serving more than 100,000 
              satisfied customers across 20+ cities. Our technology platform processes thousands 
              of bookings daily, ensuring millions of Ethiopians reach their destinations safely 
              and comfortably.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl text-white">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm">Customer Support</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
                alt="Modern Bus Fleet"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Award, title: 'Industry Leader', description: 'Most trusted bus ticketing platform', color: 'from-yellow-500 to-orange-500' },
            { icon: Globe, title: 'Extensive Network', description: 'Connectivity to all major cities', color: 'from-green-500 to-teal-500' },
            { icon: Heart, title: 'Customer First', description: '24/7 dedicated support', color: 'from-red-500 to-pink-500' },
            { icon: Star, title: 'Quality Assurance', description: 'Top-rated bus operators', color: 'from-purple-500 to-indigo-500' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};