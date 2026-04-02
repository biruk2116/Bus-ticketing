// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bus, Sun, Moon, Menu, X, User, LogOut, Home, Info, Server, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      // Hide/show navbar on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', !isDarkMode);
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', id: 'home', icon: Home },
    { name: 'About', id: 'about', icon: Info },
    { name: 'Services', id: 'services', icon: Server },
    { name: 'Contact', id: 'contact', icon: Mail },
  ];

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-xl shadow-2xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => scrollToSection('home')}
          >
            <div className="relative">
              <Bus className="w-8 h-8 lg:w-10 lg:h-10 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <motion.div
                className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              BusTicketing
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <motion.button
                key={link.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(link.id)}
                className="relative px-4 py-2 rounded-lg transition-all group"
              >
                <span className="flex items-center space-x-2 text-gray-300 group-hover:text-white transition-colors">
                  <link.icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                />
              </motion.button>
            ))}
            
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="ml-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-300" />}
            </motion.button>
            
            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-3 ml-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{user.name}</span>
                </motion.div>
                {user.role === 'admin' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/admin')}
                    className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 transition-all"
                  >
                    Admin
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-all"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-all"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/signup')}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all"
                >
                  Sign Up
                </motion.button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/10"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <motion.button
                  key={link.name}
                  whileHover={{ x: 10 }}
                  onClick={() => scrollToSection(link.id)}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-all"
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </motion.button>
              ))}
              
              <div className="pt-4 border-t border-white/10 space-y-2">
                <motion.button
                  whileHover={{ x: 10 }}
                  onClick={toggleDarkMode}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-all"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </motion.button>
                
                {user ? (
                  <>
                    <div className="px-4 py-3 flex items-center space-x-3">
                      <User className="w-5 h-5" />
                      <span>{user.name}</span>
                    </div>
                    {user.role === 'admin' && (
                      <button
                        onClick={() => navigate('/admin')}
                        className="w-full px-4 py-3 rounded-lg bg-orange-500 text-center"
                      >
                        Admin Dashboard
                      </button>
                    )}
                    <button
                      onClick={logout}
                      className="w-full px-4 py-3 rounded-lg bg-red-500/20 text-red-400 text-center"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate('/login')}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 text-center"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => navigate('/signup')}
                      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-center"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};