// frontend/src/components/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBus, FaShieldAlt, FaClock, FaMoneyBillWave } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: <FaBus className="h-8 w-8 text-blue-600" />,
      title: 'Multiple Bus Companies',
      description: 'Choose from various trusted bus operators across Ethiopia'
    },
    {
      icon: <FaShieldAlt className="h-8 w-8 text-green-600" />,
      title: 'Secure Booking',
      description: 'Safe and encrypted payment processing with Ethiopian options'
    },
    {
      icon: <FaClock className="h-8 w-8 text-orange-600" />,
      title: 'Real-time Updates',
      description: 'Live bus tracking and instant booking confirmations'
    },
    {
      icon: <FaMoneyBillWave className="h-8 w-8 text-purple-600" />,
      title: 'Best Prices',
      description: 'Competitive fares with special discounts and offers'
    }
  ];

  const buses = [
    { id: 1, color: 'bg-blue-500', delay: 0 },
    { id: 2, color: 'bg-green-500', delay: 2 },
    { id: 3, color: 'bg-yellow-500', delay: 4 },
    { id: 4, color: 'bg-red-500', delay: 6 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Bus Animation */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        {/* Animated Buses */}
        <div className="absolute inset-0 overflow-hidden">
          {buses.map((bus) => (
            <motion.div
              key={bus.id}
              className={`absolute bottom-${Math.random() * 20 + 10} ${bus.color} rounded-lg p-2 shadow-lg`}
              initial={{ x: '-100%' }}
              animate={{ x: '400%' }}
              transition={{
                duration: 20,
                delay: bus.delay,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{ width: '100px', top: `${Math.random() * 70}%` }}
            >
              <FaBus className="h-8 w-8 text-white" />
            </motion.div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Travel Ethiopia with
              <span className="block text-yellow-300">EthioBus</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Your trusted partner for comfortable and reliable bus travel across Ethiopia. 
              Book tickets online with ease and enjoy your journey.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/search"
                className="inline-block bg-yellow-400 text-blue-900 font-bold py-4 px-8 rounded-full text-lg hover:bg-yellow-300 transition-colors duration-300 shadow-xl"
              >
                Book Your Bus Ticket Now! 🚌
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose EthioBus?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the best bus travel service in Ethiopia
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Routes
            </h2>
            <p className="text-xl text-gray-600">
              Most traveled bus routes in Ethiopia
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { from: 'Addis Ababa', to: 'Bahir Dar', price: '500 ETB', time: '10h' },
              { from: 'Addis Ababa', to: 'Gondar', price: '600 ETB', time: '12h' },
              { from: 'Addis Ababa', to: 'Hawassa', price: '300 ETB', time: '5h' },
              { from: 'Addis Ababa', to: 'Mekelle', price: '700 ETB', time: '14h' },
              { from: 'Addis Ababa', to: 'Dire Dawa', price: '400 ETB', time: '8h' },
              { from: 'Addis Ababa', to: 'Jimma', price: '350 ETB', time: '6h' },
            ].map((route, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 hover:shadow-2xl cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="text-left">
                    <p className="text-sm text-gray-500">From</p>
                    <p className="font-bold text-lg">{route.from}</p>
                  </div>
                  <FaBus className="h-6 w-6 text-blue-600" />
                  <div className="text-right">
                    <p className="text-sm text-gray-500">To</p>
                    <p className="font-bold text-lg">{route.to}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-green-600 font-bold">{route.price}</span>
                  <span className="text-gray-600">{route.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="ethiopian-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white mb-8">
              Book your bus ticket now and travel comfortably across Ethiopia
            </p>
            <Link
              to="/search"
              className="inline-block bg-white text-blue-900 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-colors duration-300 shadow-xl"
            >
              Search Buses Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;