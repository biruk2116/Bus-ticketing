// frontend/src/components/Services.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaBus, FaShieldAlt, FaClock, FaMoneyBillWave, 
  FaHeadset, FaWifi, FaUtensils, FaTv 
} from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: FaBus,
      title: 'Comfortable Buses',
      description: 'Modern buses with reclining seats and ample legroom',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FaShieldAlt,
      title: 'Safe Travel',
      description: 'GPS tracking and experienced drivers for your safety',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FaClock,
      title: 'On-Time Departure',
      description: 'Punctual schedules and real-time updates',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: FaMoneyBillWave,
      title: 'Best Prices',
      description: 'Competitive fares with no hidden charges',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: FaHeadset,
      title: '24/7 Support',
      description: 'Round-the-clock customer service',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: FaWifi,
      title: 'Free WiFi',
      description: 'Stay connected during your journey',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: FaUtensils,
      title: 'Refreshments',
      description: 'Complimentary snacks and drinks on select routes',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: FaTv,
      title: 'Entertainment',
      description: 'Onboard entertainment system',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const packages = [
    {
      name: 'Economy',
      price: '500 ETB',
      features: ['Standard seating', 'AC', 'Basic amenities', 'Free water'],
      popular: false
    },
    {
      name: 'Business',
      price: '800 ETB',
      features: ['Extra legroom', 'WiFi', 'Snacks included', 'Priority boarding', 'USB charging'],
      popular: true
    },
    {
      name: 'VIP',
      price: '1200 ETB',
      features: ['Luxury seating', 'Meals included', 'Personal entertainment', 'Lounge access', 'Flexible cancellation'],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Experience premium bus travel with our comprehensive range of services
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${service.color} p-6 text-white text-center`}>
                  <service.icon className="text-5xl mx-auto mb-3" />
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-center">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Travel Packages</h2>
            <p className="text-xl text-gray-600">Choose the perfect package for your journey</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden relative ${
                  pkg.popular ? 'ring-2 ring-blue-600' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-6">{pkg.price}</div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full btn-primary">
                    Select Package
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Additional Services</h2>
              <ul className="space-y-4">
                {[
                  'Baggage handling and storage',
                  'VIP lounge access at major terminals',
                  'Group booking discounts',
                  'Corporate travel accounts',
                  'Special assistance for elderly/disabled',
                  'Travel insurance options'
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="text-blue-600 mr-3">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-blue-600 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Need Custom Service?</h3>
              <p className="mb-6">
                We offer tailored solutions for groups, corporate events, and special occasions. 
                Contact us to discuss your specific requirements.
              </p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                Contact Us
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;