// frontend/src/components/BusSearch.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch } from 'react-icons/fa';

const BusSearch = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1
  });

  const cities = [
    'Addis Ababa',
    'Bahir Dar',
    'Gondar',
    'Hawassa',
    'Mekelle',
    'Dire Dawa',
    'Jimma',
    'Arba Minch',
    'Harar',
    'Dessie'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Save search to localStorage (history)
    const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    searches.unshift(searchData);
    localStorage.setItem('recentSearches', JSON.stringify(searches.slice(0, 5)));
    
    // Navigate to bus list with search params
    navigate('/buses', { state: searchData });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Bus
          </h1>
          <p className="text-xl text-gray-600">
            Search for available buses across Ethiopia
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <FaMapMarkerAlt className="inline mr-2 text-blue-600" />
                  From
                </label>
                <select
                  required
                  value={searchData.from}
                  onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
                  className="input-field"
                >
                  <option value="">Select departure city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <FaMapMarkerAlt className="inline mr-2 text-red-600" />
                  To
                </label>
                <select
                  required
                  value={searchData.to}
                  onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
                  className="input-field"
                >
                  <option value="">Select destination city</option>
                  {cities.filter(c => c !== searchData.from).map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <FaCalendarAlt className="inline mr-2 text-green-600" />
                  Travel Date
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={searchData.date}
                  onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Passengers
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="10"
                  value={searchData.passengers}
                  onChange={(e) => setSearchData({ ...searchData, passengers: parseInt(e.target.value) })}
                  className="input-field"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full btn-primary py-4 text-lg flex items-center justify-center space-x-2"
            >
              <FaSearch />
              <span>Search Buses</span>
            </motion.button>
          </form>

          {/* Recent Searches */}
          {JSON.parse(localStorage.getItem('recentSearches') || '[]').length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Searches</h3>
              <div className="space-y-2">
                {JSON.parse(localStorage.getItem('recentSearches') || '[]').map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      setSearchData(search);
                      handleSearch({ preventDefault: () => {} });
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">{search.from}</span>
                      <span>→</span>
                      <span className="font-medium">{search.to}</span>
                    </div>
                    <span className="text-sm text-gray-600">{search.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BusSearch;