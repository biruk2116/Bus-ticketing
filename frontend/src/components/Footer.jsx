// src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Bus, Facebook, Twitter, Instagram, Mail, Phone, MapPin, Linkedin, Youtube, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
    { name: 'Search Buses', path: '/buses' },
    { name: 'Login', path: '/login' },
    { name: 'Sign Up', path: '/signup' },
  ];

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', color: 'hover:bg-blue-600', link: '#' },
    { icon: Twitter, name: 'Twitter', color: 'hover:bg-sky-500', link: '#' },
    { icon: Instagram, name: 'Instagram', color: 'hover:bg-pink-600', link: '#' },
    { icon: Linkedin, name: 'LinkedIn', color: 'hover:bg-blue-700', link: '#' },
    { icon: Youtube, name: 'YouTube', color: 'hover:bg-red-600', link: '#' },
    { icon: Github, name: 'GitHub', color: 'hover:bg-gray-700', link: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4 cursor-pointer" onClick={() => navigate('/')}>
              <Bus className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                BusTicketing
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted partner for comfortable and affordable bus travel across Ethiopia. 
              Book your next adventure with us and experience premium service.
            </p>
            <div className="flex space-x-3 mt-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-full bg-gray-800 ${social.color} transition-all duration-300`}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="cursor-pointer"
                >
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+251 11 123 4567</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>info@busticketing.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Addis Ababa, Ethiopia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} BusTicketing System. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Made with ❤️ for Ethiopia
          </p>
        </div>
      </div>
    </footer>
  );
};