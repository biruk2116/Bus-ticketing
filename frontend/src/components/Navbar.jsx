// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bus, Sun, Moon, Menu, X, User, LogOut, Home, Info, Server, Mail, History, Ticket, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const { user, logout, getUserBookings } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
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
    setIsMobileMenuOpen(false);
    setShowHistory(false);
  };

  const navLinks = [
    { name: 'Home', id: 'home', icon: Home },
    { name: 'About', id: 'about', icon: Info },
    { name: 'Services', id: 'services', icon: Server },
    { name: 'Contact', id: 'contact', icon: Mail },
  ];

  const userBookings = getUserBookings();

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-800'
          : 'bg-white dark:bg-gray-900 shadow-md'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left Side */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 cursor-pointer flex-shrink-0" 
            onClick={() => scrollToSection('home')}
          >
            <div className="relative">
              <Bus className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <motion.div
                className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-50"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BusTicketing
            </span>
          </motion.div>

          {/* Empty Middle Space */}
          <div className="flex-1"></div>

          {/* Desktop Navigation - Right Side */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <motion.button
                key={link.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(link.id)}
                className="relative px-4 py-2 rounded-lg transition-all group"
              >
                <span className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  <link.icon className="w-4 h-4" />
                  <span className="text-sm">{link.name}</span>
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                />
              </motion.button>
            ))}
            
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="ml-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-700" />}
            </motion.button>
            
            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-3 ml-2 relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowHistory(!showHistory)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 transition-all"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3" />
                </motion.button>
                
                {/* History Dropdown */}
                <AnimatePresence>
                  {showHistory && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
                    >
                      <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                        <h3 className="font-semibold text-sm text-gray-900 dark:text-white flex items-center">
                          <History className="w-4 h-4 mr-2" />
                          My Booking History
                        </h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {userBookings.length === 0 ? (
                          <div className="p-4 text-center">
                            <Ticket className="w-10 h-10 mx-auto mb-2 opacity-50 text-gray-400" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">No bookings yet</p>
                            <button
                              onClick={() => {
                                setShowHistory(false);
                                navigate('/buses');
                              }}
                              className="mt-2 text-xs text-blue-600 hover:text-blue-500"
                            >
                              Book your first trip →
                            </button>
                          </div>
                        ) : (
                          userBookings.map((booking, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">{booking.route}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    <span className="inline-block mr-3">📅 {booking.date}</span>
                                    <span>💺 Seats: {booking.seats}</span>
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-semibold text-green-600">ETB {booking.amount}</p>
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                    {booking.status}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-sm"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/signup')}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all text-sm"
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
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="container mx-auto px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <motion.button
                  key={link.name}
                  whileHover={{ x: 10 }}
                  onClick={() => scrollToSection(link.id)}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-sm"
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </motion.button>
              ))}
              
              <div className="pt-3 border-t border-gray-200 dark:border-gray-800 space-y-1">
                <motion.button
                  whileHover={{ x: 10 }}
                  onClick={toggleDarkMode}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-sm"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </motion.button>
                
                {user ? (
                  <>
                    <div className="px-3 py-2 flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <User className="w-4 h-4" />
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="px-3 py-2">
                      <p className="text-xs font-medium text-gray-500 mb-1">Recent Bookings</p>
                      {userBookings.slice(0, 2).map((booking, i) => (
                        <div key={i} className="text-xs text-gray-600 dark:text-gray-400 py-1">
                          {booking.route} - {booking.date}
                        </div>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ x: 10 }}
                      onClick={logout}
                      className="w-full px-3 py-2 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-center text-sm"
                    >
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ x: 10 }}
                      onClick={() => navigate('/login')}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-center text-sm"
                    >
                      Login
                    </motion.button>
                    <motion.button
                      whileHover={{ x: 10 }}
                      onClick={() => navigate('/signup')}
                      className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center text-sm"
                    >
                      Sign Up
                    </motion.button>
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