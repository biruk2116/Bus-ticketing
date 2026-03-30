// src/components/Home.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Bus, 
  Clock, 
  Shield, 
  CreditCard, 
  MapPin, 
  Calendar,
  ArrowRight,
  Star,
  Users
} from 'lucide-react'
import BusSearch from './BusSearch'

const Home = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: Bus,
      title: 'Modern Fleet',
      description: 'Comfortable, air-conditioned buses with WiFi',
      color: 'text-primary-600',
      bgColor: 'bg-primary-100'
    },
    {
      icon: Clock,
      title: 'On-Time Departure',
      description: 'Punctual service with real-time tracking',
      color: 'text-accent-500',
      bgColor: 'bg-accent-100'
    },
    {
      icon: Shield,
      title: 'Safe Travel',
      description: 'GPS tracking and professional drivers',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: CreditCard,
      title: 'Easy Payment',
      description: 'Multiple payment options including mobile money',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  const stats = [
    { value: '50K+', label: 'Happy Customers', icon: Users },
    { value: '100+', label: 'Daily Trips', icon: Bus },
    { value: '25+', label: 'Cities', icon: MapPin },
    { value: '99%', label: 'Satisfaction', icon: Star },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Search */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Travel Ethiopia with
              <span className="block text-accent-300">EthioBus</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto">
              Your trusted partner for comfortable and reliable bus travel across Ethiopia
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <BusSearch compact />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-accent-300" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-200">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Animated Background Buses */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/10 to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose EthioBus?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Experience the best bus travel service in Ethiopia
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="card p-6 text-center group cursor-pointer"
              >
                <div className={`${feature.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
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
            <p className="text-xl text-white/90 mb-8">
              Book your bus ticket now and travel comfortably across Ethiopia
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/search')}
              className="inline-flex items-center space-x-2 bg-white text-primary-600 font-bold py-4 px-8 rounded-full text-lg hover:shadow-xl transition-shadow"
            >
              <span>Search Buses Now</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home