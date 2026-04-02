// src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Bus, Facebook, Twitter, Instagram, Mail, Phone, MapPin, Linkedin, Youtube, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const quickLinks = [
    { name: 'Home', action: () => scrollToSection('home') },
    { name: 'About Us', action: () => scrollToSection('about') },
    { name: 'Services', action: () => scrollToSection('services') },
    { name: 'Contact', action: () => scrollToSection('contact') },
    { name: 'Search Buses', action: () => navigate('/buses') },
    { name: 'Login', action: () => navigate('/login') },
    { name: 'Sign Up', action: () => navigate('/signup') },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4 cursor-pointer" onClick={() => scrollToSection('home')}>
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

          {/* Quick Links */}
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
                    onClick={link.action}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
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

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-3">
              Subscribe to get special offers and travel tips
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white text-sm focus:outline-none focus:border-blue-500"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-r-lg text-white text-sm hover:from-blue-500 hover:to-purple-500 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
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