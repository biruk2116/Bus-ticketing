// src/components/AboutUs.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Globe, Heart, Star, Bus, Users, MapPin, Clock, TrendingUp, Shield, Headphones, Coffee } from 'lucide-react';

export const AboutUs = () => {
  const stats = [
    { icon: Bus, value: '50+', label: 'Bus Partners', color: 'from-blue-500 to-cyan-500', description: 'Premium bus operators' },
    { icon: Users, value: '100K+', label: 'Happy Customers', color: 'from-purple-500 to-pink-500', description: 'Satisfied travelers' },
    { icon: MapPin, value: '20+', label: 'Cities', color: 'from-green-500 to-emerald-500', description: 'Across Ethiopia' },
    { icon: Clock, value: '99%', label: 'On-Time', color: 'from-orange-500 to-red-500', description: 'Punctuality rate' },
  ];

  const features = [
    { icon: Award, title: 'Industry Leader', description: 'Ethiopia\'s most trusted bus ticketing platform with over a decade of excellence', color: 'from-yellow-500 to-orange-500' },
    { icon: Globe, title: 'Extensive Network', description: 'Connectivity to all major cities and remote destinations across the country', color: 'from-green-500 to-teal-500' },
    { icon: Heart, title: 'Customer First', description: '24/7 dedicated support and hassle-free booking experience', color: 'from-red-500 to-pink-500' },
    { icon: Star, title: 'Quality Assurance', description: 'Partnership with top-rated, vetted bus operators for your safety', color: 'from-purple-500 to-indigo-500' },
    { icon: Shield, title: 'Secure Payments', description: 'SSL encrypted transactions with multiple payment options', color: 'from-blue-500 to-cyan-500' },
    { icon: Headphones, title: 'Premium Support', description: 'Dedicated customer service team available round the clock', color: 'from-teal-500 to-green-500' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            About BusTicketing
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Revolutionizing bus travel in Ethiopia with technology, safety, and comfort
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card p-6 text-center"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-gray-200 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-400">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-white">Our Story</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Founded in 2010, BusTicketing Ethiopia has grown to become the nation's leading 
              online bus ticketing platform. We started with a simple mission: to make bus travel 
              accessible, convenient, and enjoyable for every Ethiopian.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Today, we partner with over 50 premium bus operators, serving more than 100,000 
              satisfied customers across 20+ cities. Our technology platform processes thousands 
              of bookings daily, ensuring millions of Ethiopians reach their destinations safely 
              and comfortably.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We're committed to continuous innovation, adding new features and partnerships to 
              enhance your travel experience. From real-time bus tracking to digital tickets and 
              loyalty rewards, we're building the future of Ethiopian transportation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="glass-card overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
                alt="Modern Bus Fleet"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-12 text-white">Why Choose Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-6"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};