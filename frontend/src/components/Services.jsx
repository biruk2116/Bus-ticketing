// src/components/Services.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { Panel } from './ui/Panel';
import { Bus, Clock, Shield, Headphones, Award, Users, Wifi, Coffee, Wind, Tv, Battery, Gift } from 'lucide-react';

export const Services = () => {
  const services = [
    { icon: Bus, title: 'Premium Fleet', description: 'Modern, well-maintained buses with comfortable seating', color: 'from-blue-500 to-cyan-500', delay: 0 },
    { icon: Clock, title: 'Punctual Service', description: 'On-time departures and arrivals guaranteed', color: 'from-green-500 to-emerald-500', delay: 0.1 },
    { icon: Shield, title: 'Safety First', description: 'GPS tracking and professional drivers', color: 'from-red-500 to-pink-500', delay: 0.2 },
    { icon: Headphones, title: '24/7 Support', description: 'Round-the-clock customer assistance', color: 'from-purple-500 to-indigo-500', delay: 0.3 },
    { icon: Wifi, title: 'Free Wi-Fi', description: 'Stay connected during your journey', color: 'from-yellow-500 to-orange-500', delay: 0.4 },
    { icon: Coffee, title: 'Refreshments', description: 'Complimentary snacks and drinks', color: 'from-teal-500 to-green-500', delay: 0.5 },
    { icon: Wind, title: 'Air Conditioning', description: 'Climate-controlled comfort', color: 'from-sky-500 to-blue-500', delay: 0.6 },
    { icon: Tv, title: 'Entertainment', description: 'Movies and music on board', color: 'from-violet-500 to-purple-500', delay: 0.7 },
    { icon: Battery, title: 'Charging Points', description: 'USB ports at every seat', color: 'from-rose-500 to-red-500', delay: 0.8 },
    { icon: Gift, title: 'Loyalty Rewards', description: 'Earn points on every booking', color: 'from-amber-500 to-yellow-500', delay: 0.9 },
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-1000" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            title="Our Premium Services"
            subtitle="Experience travel like never before with our world-class amenities"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: service.delay, duration: 0.5 }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.2 }
              }}
            >
              <Panel className="h-full group cursor-pointer overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                
                {/* Animated border */}
                <motion.div
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: '100%' }}
                />
              </Panel>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book Your Journey Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};