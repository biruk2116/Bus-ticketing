// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Bus, Sun, Moon, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <Bus className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">BusTicketing</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {link.name}
              </button>
            ))}
            <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left py-2 text-gray-700 dark:text-gray-300"
              >
                {link.name}
              </button>
            ))}
            <button onClick={toggleDarkMode} className="py-2 text-gray-700 dark:text-gray-300">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};