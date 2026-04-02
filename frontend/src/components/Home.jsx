// src/components/Home.jsx (Updated - without GIF dependency)
import React from 'react';
import { motion } from 'framer-motion';
import { BusSearch } from './BusSearch';
import { SectionHeading } from './SectionHeading';
import { Panel } from './ui/Panel';
import { Bus, Clock, Shield, Headphones, Award, Users } from 'lucide-react';

export const Home = () => {
  const services = [
    { icon: Bus, title: 'Wide Network', description: 'Covering all major cities across Ethiopia' },
    { icon: Clock, title: 'On-Time Service', description: 'Punctual departures and arrivals' },
    { icon: Shield, title: 'Safe Travel', description: 'Modern buses with safety features' },
    { icon: Headphones, title: '24/7 Support', description: 'Customer service always available' },
    { icon: Award, title: 'Best Prices', description: 'Competitive rates and discounts' },
    { icon: Users, title: 'Comfortable', description: 'Spacious seats with AC' },
  ];

  return (
    <div>
      {/* Hero Section with Gradient Background instead of GIF */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-200"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-500"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Travel Smarter Across
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {' '}Ethiopia
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
              Experience comfortable and affordable bus travel with our modern fleet. Book your next adventure today!
            </p>
            
            <BusSearch />
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                onClick={() => document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Routes
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Services"
            subtitle="Experience the best travel services with us"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {services.map((service, index) => (
              <Panel key={index} glass>
                <service.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                title="About Us"
                subtitle="Your trusted travel partner since 2010"
              />
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                BusTicketing Ethiopia is a leading online bus ticketing platform that connects travelers 
                with reliable bus operators across the country. We're committed to making bus travel 
                convenient, affordable, and enjoyable for everyone.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                With our user-friendly platform, you can easily search, compare, and book bus tickets 
                from the comfort of your home. We partner with the best bus operators to ensure 
                comfort, safety, and punctuality.
              </p>
              <div className="flex space-x-8">
                <div>
                  <div className="text-3xl font-bold text-blue-600">50+</div>
                  <div className="text-gray-600 dark:text-gray-400">Bus Partners</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">100K+</div>
                  <div className="text-gray-600 dark:text-gray-400">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">20+</div>
                  <div className="text-gray-600 dark:text-gray-400">Cities Covered</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
                  alt="About Us"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};