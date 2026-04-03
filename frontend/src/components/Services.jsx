// src/components/Services.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Bus, Clock, Shield, Headphones, Wifi, Coffee, Wind, Tv, Battery, Gift, Truck, Users } from 'lucide-react';

export const Services = () => {
  const services = [
    { icon: Bus, title: 'Premium Fleet', description: 'Modern, well-maintained buses with comfortable reclining seats', color: 'from-blue-500 to-cyan-500', delay: 0 },
    { icon: Clock, title: 'Punctual Service', description: 'Real-time tracking and guaranteed on-time departures', color: 'from-green-500 to-emerald-500', delay: 0.1 },
    { icon: Shield, title: 'Safety First', description: 'GPS tracking, professional drivers, and insurance coverage', color: 'from-red-500 to-pink-500', delay: 0.2 },
    { icon: Headphones, title: '24/7 Support', description: 'Round-the-clock customer service via phone, email, and chat', color: 'from-purple-500 to-indigo-500', delay: 0.3 },
    { icon: Wifi, title: 'Free Wi-Fi', description: 'Stay connected with complimentary high-speed internet', color: 'from-yellow-500 to-orange-500', delay: 0.4 },
    { icon: Coffee, title: 'Refreshments', description: 'Complimentary snacks and beverages on long-distance routes', color: 'from-teal-500 to-green-500', delay: 0.5 },
    { icon: Wind, title: 'Air Conditioning', description: 'Climate-controlled comfort with adjustable vents', color: 'from-sky-500 to-blue-500', delay: 0.6 },
    { icon: Tv, title: 'Entertainment', description: 'Personal screens with movies and music on VIP buses', color: 'from-violet-500 to-purple-500', delay: 0.7 },
    { icon: Battery, title: 'Charging Points', description: 'USB and power outlets at every seat', color: 'from-rose-500 to-red-500', delay: 0.8 },
    { icon: Gift, title: 'Loyalty Rewards', description: 'Earn points on every booking for discounts', color: 'from-amber-500 to-yellow-500', delay: 0.9 },
    { icon: Truck, title: 'Luggage Service', description: 'Generous luggage allowance with secure storage', color: 'from-lime-500 to-green-500', delay: 1.0 },
    { icon: Users, title: 'Group Booking', description: 'Special discounts for group travelers', color: 'from-fuchsia-500 to-pink-500', delay: 1.1 },
  ];

  return (
    <section id="services" className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Premium Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience world-class amenities and unmatched comfort on every journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: service.delay, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg cursor-pointer"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};