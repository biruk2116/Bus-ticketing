// frontend/src/components/AboutUs.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaGlobeAfrica, FaShieldAlt, FaHandsHelping } from 'react-icons/fa';

const AboutUs = () => {
  const stats = [
    { label: 'Happy Customers', value: '50,000+', icon: FaUsers },
    { label: 'Cities Covered', value: '25+', icon: FaGlobeAfrica },
    { label: 'Daily Trips', value: '100+', icon: FaShieldAlt },
    { label: 'Years of Service', value: '10+', icon: FaHandsHelping }
  ];

  const team = [
    { name: 'Abebe Kebede', role: 'CEO & Founder', image: '👨‍💼' },
    { name: 'Tigist Haile', role: 'Operations Manager', image: '👩‍💼' },
    { name: 'Dawit Mekonnen', role: 'Customer Service', image: '👨‍💻' },
    { name: 'Sara Ahmed', role: 'Marketing Head', image: '👩‍🎨' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            About EthioBus
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Connecting Ethiopia through safe, comfortable, and reliable bus travel since 2014
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-4xl text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                EthioBus started with a simple mission: to revolutionize long-distance bus travel in Ethiopia. 
                What began as a small operation with just two buses has grown into the country's most trusted 
                bus ticketing platform.
              </p>
              <p className="text-gray-600 mb-4">
                We understand the importance of safe and comfortable travel. That's why we partner only with 
                the best bus companies and ensure all vehicles meet our strict safety standards.
              </p>
              <p className="text-gray-600">
                Today, we're proud to serve thousands of passengers daily, connecting families, friends, and 
                businesses across every region of Ethiopia.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-blue-600 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg mb-6">
                To provide the most reliable, comfortable, and accessible bus travel experience for every Ethiopian.
              </p>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg">
                To become the leading digital transport platform in East Africa, connecting people and places seamlessly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Dedicated professionals working for your comfort</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="text-center"
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;