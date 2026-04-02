// src/components/Services.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Bus, Clock, Shield, Headphones, Wifi, Coffee, Wind, Tv, Battery, Gift, Truck, Users } from 'lucide-react';

export const Services = () => {
  const services = [
    { icon: Bus, title: 'Premium Fleet', description: 'Modern, well-maintained buses with comfortable reclining seats and ample legroom', color: 'from-blue-500 to-cyan-500', features: ['AC', 'Reclining Seats', 'Ample Legroom'] },
    { icon: Clock, title: 'Punctual Service', description: 'Real-time tracking and guaranteed on-time departures with SMS notifications', color: 'from-green-500 to-emerald-500', features: ['Real-time Tracking', 'SMS Alerts', 'Guaranteed Schedule'] },
    { icon: Shield, title: 'Safety First', description: 'GPS tracking, professional drivers, and comprehensive insurance coverage', color: 'from-red-500 to-pink-500', features: ['GPS Tracking', 'Professional Drivers', 'Insurance'] },
    { icon: Headphones, title: '24/7 Support', description: 'Round-the-clock customer service via phone, email, and live chat', color: 'from-purple-500 to-indigo-500', features: ['Live Chat', 'Phone Support', 'Email Support'] },
    { icon: Wifi, title: 'Free Wi-Fi', description: 'Stay connected during your journey with complimentary high-speed internet', color: 'from-yellow-500 to-orange-500', features: ['High-speed', 'Unlimited Data', 'Free Access'] },
    { icon: Coffee, title: 'Refreshments', description: 'Complimentary snacks, beverages, and meals on long-distance routes', color: 'from-teal-500 to-green-500', features: ['Snacks', 'Beverages', 'Hot Meals'] },
    { icon: Wind, title: 'Air Conditioning', description: 'Climate-controlled comfort with adjustable vents at every seat', color: 'from-sky-500 to-blue-500', features: ['Climate Control', 'Adjustable Vents', 'Comfortable'] },
    { icon: Tv, title: 'Entertainment', description: 'Personal screens with movies, music, and games on VIP buses', color: 'from-violet-500 to-purple-500', features: ['Personal Screens', 'Movies', 'Music'] },
    { icon: Battery, title: 'Charging Points', description: 'USB and power outlets at every seat to keep devices charged', color: 'from-rose-500 to-red-500', features: ['USB Ports', 'Power Outlets', 'Convenient'] },
    { icon: Gift, title: 'Loyalty Rewards', description: 'Earn points on every booking and redeem for discounts and free tickets', color: 'from-amber-500 to-yellow-500', features: ['Earn Points', 'Discounts', 'Free Tickets'] },
    { icon: Truck, title: 'Luggage Service', description: 'Generous luggage allowance with secure storage compartments', color: 'from-lime-500 to-green-500', features: ['Generous Allowance', 'Secure Storage', 'Easy Access'] },
    { icon: Users, title: 'Group Booking', description: 'Special discounts and dedicated service for group travelers', color: 'from-fuchsia-500 to-pink-500', features: ['Group Discounts', 'Dedicated Service', 'Flexible'] },
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Premium Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card p-6 group cursor-pointer"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-gray-300 mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};