// src/components/AboutUs.jsx
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Globe, Heart, Star, Bus, Users, MapPin, Clock } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { Panel } from './ui/Panel';

export const AboutUs = () => {
  const stats = [
    { icon: Bus, value: '50+', label: 'Bus Partners', color: 'from-blue-500 to-cyan-500' },
    { icon: Users, value: '100K+', label: 'Happy Customers', color: 'from-purple-500 to-pink-500' },
    { icon: MapPin, value: '20+', label: 'Cities Covered', color: 'from-green-500 to-emerald-500' },
    { icon: Clock, value: '99%', label: 'On-Time Service', color: 'from-orange-500 to-red-500' },
  ];

  const features = [
    { icon: Award, title: 'Industry Leader', description: 'Recognized as Ethiopia\'s most trusted bus ticketing platform' },
    { icon: Globe, title: 'Wide Network', description: 'Connectivity to all major cities and tourist destinations' },
    { icon: Heart, title: 'Customer First', description: '24/7 support and hassle-free booking experience' },
    { icon: Star, title: 'Quality Assurance', description: 'Partnered with top-rated bus operators' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            title="About BusTicketing"
            subtitle="Your trusted partner in Ethiopian bus travel since 2010"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-2xl" />
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Revolutionizing Bus Travel in Ethiopia
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                BusTicketing Ethiopia is more than just a booking platform - we're your gateway to 
                seamless travel experiences across the country. Our mission is to connect people and 
                places through safe, comfortable, and affordable bus transportation.
              </p>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              With cutting-edge technology and partnerships with leading bus operators, we've transformed 
              the way Ethiopians travel. Our platform offers real-time seat availability, instant 
              confirmation, and secure payments, making bus travel planning effortless.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`bg-gradient-to-r ${stat.color} p-4 rounded-xl shadow-lg text-white`}
                >
                  <stat.icon className="w-8 h-8 mb-2" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
                alt="Modern Bus Fleet"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-2xl"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Panel className="text-center h-full hover:shadow-2xl transition-all duration-300">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </Panel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};