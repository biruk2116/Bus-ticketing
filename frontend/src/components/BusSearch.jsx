// src/components/BusSearch.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Users, ArrowRightLeft, Search, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const cities = [
  'Addis Ababa', 'Bahir Dar', 'Gondar', 'Lalibela', 'Axum', 
  'Hawassa', 'Dire Dawa', 'Mekelle', 'Jimma', 'Arba Minch'
];

export const BusSearch = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    passengers: 1,
  });
  const [suggestions, setSuggestions] = useState({ from: [], to: [] });

  const handleInputChange = (field, value) => {
    setSearchData({ ...searchData, [field]: value });
    
    if (value.length > 1) {
      const filtered = cities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions({ ...suggestions, [field]: filtered });
    } else {
      setSuggestions({ ...suggestions, [field]: [] });
    }
  };

  const swapLocations = () => {
    setSearchData({
      ...searchData,
      from: searchData.to,
      to: searchData.from,
    });
  };

  const handleSearch = async () => {
    if (!searchData.from || !searchData.to) {
      toast.error('Please select departure and arrival cities');
      return;
    }

    if (searchData.from === searchData.to) {
      toast.error('Departure and arrival cities must be different');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    localStorage.setItem('busSearch', JSON.stringify(searchData));
    navigate('/buses');
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 md:p-8 max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* From Location */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            From
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Departure City"
              value={searchData.from}
              onChange={(e) => handleInputChange('from', e.target.value)}
              className="input-glass pl-10"
            />
          </div>
          <AnimatePresence>
            {suggestions.from.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-1 glass-card z-20 max-h-48 overflow-y-auto"
              >
                {suggestions.from.map(city => (
                  <button
                    key={city}
                    onClick={() => {
                      setSearchData({ ...searchData, from: city });
                      setSuggestions({ ...suggestions, from: [] });
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-white/10 transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* To Location */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            To
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Arrival City"
              value={searchData.to}
              onChange={(e) => handleInputChange('to', e.target.value)}
              className="input-glass pl-10"
            />
          </div>
          <AnimatePresence>
            {suggestions.to.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-1 glass-card z-20 max-h-48 overflow-y-auto"
              >
                {suggestions.to.map(city => (
                  <button
                    key={city}
                    onClick={() => {
                      setSearchData({ ...searchData, to: city });
                      setSuggestions({ ...suggestions, to: [] });
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-white/10 transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center -my-2 relative z-10">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={swapLocations}
          className="p-2 rounded-full bg-primary-600 hover:bg-primary-700 transition-all shadow-lg"
        >
          <ArrowRightLeft className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Travel Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={searchData.date}
              onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
              min={format(new Date(), 'yyyy-MM-dd')}
              className="input-glass pl-10"
            />
          </div>
        </div>

        {/* Passengers */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Passengers
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              min="1"
              max="6"
              value={searchData.passengers}
              onChange={(e) => setSearchData({ ...searchData, passengers: parseInt(e.target.value) })}
              className="input-glass pl-10"
            />
          </div>
        </div>
      </div>

      {/* Search Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSearch}
        disabled={loading}
        className="w-full mt-6 btn-primary flex items-center justify-center space-x-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Searching Buses...</span>
          </>
        ) : (
          <>
            <Search className="w-5 h-5" />
            <span>Search Buses</span>
          </>
        )}
      </motion.button>
    </motion.div>
  );
};