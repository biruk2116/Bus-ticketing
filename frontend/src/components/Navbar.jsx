// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bus, Sun, Moon, Menu, X, User, LogOut, Home, Info, Server, Mail, History, Ticket } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 50);
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

  const navigateToPage = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setShowHistory(false);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Services', path: '/services', icon: Server },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const userBookings = user ? getUserBookings(user.id) : [];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-800'
        : 'bg-white dark:bg-gray-900 shadow-md'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => navigateToPage('/')}>
            <Bus className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BusTicketing
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => navigateToPage(link.path)}
                className={`relative px-4 py-2 rounded-lg transition-all group ${
                  location.pathname === link.path
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <link.icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </span>
                {location.pathname === link.path && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                )}
              </button>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="ml-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-700" />}
            </button>
            
            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-3 ml-4 relative">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 transition-all"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{user.name}</span>
                </button>
                
                {/* History Dropdown */}
                {showHistory && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                        <History className="w-4 h-4 mr-2" />
                        My Booking History
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {userBookings.length === 0 ? (
                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                          <Ticket className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No bookings yet</p>
                          <button
                            onClick={() => {
                              setShowHistory(false);
                              navigateToPage('/buses');
                            }}
                            className="mt-2 text-sm text-blue-600 hover:text-blue-500"
                          >
                            Book your first trip →
                          </button>
                        </div>
                      ) : (
                        userBookings.map((booking, index) => (
                          <div key={index} className="p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{booking.route}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Date: {booking.date}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Seats: {booking.seats}</p>
                            <p className="text-xs font-semibold text-green-600">ETB {booking.amount}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
                
                <button
                  onClick={logout}
                  className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4">
                <button
                  onClick={() => navigateToPage('/login')}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => navigateToPage('/signup')}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => navigateToPage(link.path)}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </button>
              ))}
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
                <button
                  onClick={toggleDarkMode}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                
                {user ? (
                  <>
                    <div className="px-4 py-3 flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <User className="w-5 h-5" />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setShowHistory(!showHistory);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                      <History className="w-5 h-5" />
                      <span>My Bookings</span>
                    </button>
                    <button
                      onClick={logout}
                      className="w-full px-4 py-3 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-center"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigateToPage('/login')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-center"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => navigateToPage('/signup')}
                      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center"
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
    </nav>
  );
};