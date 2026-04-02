// src/components/BusSearch.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Search } from 'lucide-react';
import { Button } from './ui/Button';
import { Field } from './ui/Field';

const cities = [
  'Addis Ababa', 'Bahir Dar', 'Gondar', 'Lalibela', 'Axum', 
  'Hawassa', 'Dire Dawa', 'Mekelle', 'Jimma', 'Arba Minch'
];

export const BusSearch = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
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

  const handleSearch = () => {
    if (searchData.from && searchData.to && searchData.date) {
      localStorage.setItem('busSearch', JSON.stringify(searchData));
      navigate('/search');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Field
            label="From"
            placeholder="Departure City"
            icon={MapPin}
            value={searchData.from}
            onChange={(e) => handleInputChange('from', e.target.value)}
          />
          {suggestions.from.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-1 z-20">
              {suggestions.from.map(city => (
                <div
                  key={city}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setSearchData({ ...searchData, from: city });
                    setSuggestions({ ...suggestions, from: [] });
                  }}
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <Field
            label="To"
            placeholder="Arrival City"
            icon={MapPin}
            value={searchData.to}
            onChange={(e) => handleInputChange('to', e.target.value)}
          />
          {suggestions.to.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-1 z-20">
              {suggestions.to.map(city => (
                <div
                  key={city}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setSearchData({ ...searchData, to: city });
                    setSuggestions({ ...suggestions, to: [] });
                  }}
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>

        <Field
          label="Travel Date"
          type="date"
          icon={Calendar}
          value={searchData.date}
          onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
        />
      </div>

      <div className="mt-6">
        <Button className="w-full" onClick={handleSearch}>
          <Search className="w-4 h-4 mr-2" />
          Search Buses
        </Button>
      </div>
    </motion.div>
  );
};