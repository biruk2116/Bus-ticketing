// src/components/BusList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Users, Filter, ChevronDown, ChevronUp, Search, X, SlidersHorizontal, Bus as BusIcon, Star, Wifi, Coffee, Wind } from 'lucide-react';
import { formatPrice, formatTime } from '../lib/ui';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const busesData = [
  { id: 1, name: 'Ethio Luxury Express', from: 'Addis Ababa', to: 'Bahir Dar', departure: '06:00', arrival: '12:00', price: 450, seatsAvailable: 25, totalSeats: 40, type: 'VIP', rating: 4.8, amenities: ['wifi', 'ac', 'refreshments'] },
  { id: 2, name: 'Sky Bus', from: 'Addis Ababa', to: 'Gondar', departure: '07:30', arrival: '14:30', price: 550, seatsAvailable: 18, totalSeats: 40, type: 'VIP', rating: 4.9, amenities: ['wifi', 'ac'] },
  { id: 3, name: 'Selam Bus', from: 'Addis Ababa', to: 'Hawassa', departure: '08:00', arrival: '13:00', price: 350, seatsAvailable: 32, totalSeats: 45, type: 'Standard', rating: 4.5, amenities: ['ac'] },
  { id: 4, name: 'Sheba Bus', from: 'Addis Ababa', to: 'Mekelle', departure: '09:00', arrival: '18:00', price: 650, seatsAvailable: 12, totalSeats: 40, type: 'VIP', rating: 4.7, amenities: ['wifi', 'ac', 'tv'] },
  { id: 5, name: 'Roha Bus', from: 'Addis Ababa', to: 'Lalibela', departure: '10:00', arrival: '17:00', price: 500, seatsAvailable: 8, totalSeats: 35, type: 'Standard', rating: 4.6, amenities: ['ac'] },
  { id: 6, name: 'Ahadu Bus', from: 'Addis Ababa', to: 'Axum', departure: '11:00', arrival: '20:00', price: 750, seatsAvailable: 22, totalSeats: 40, type: 'VIP', rating: 4.9, amenities: ['wifi', 'ac', 'refreshments', 'tv'] },
];

export const BusList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ 
    type: 'all', 
    priceRange: 'all',
    minPrice: 0,
    maxPrice: 1000,
    amenities: []
  });

  useEffect(() => {
    setTimeout(() => {
      setFilteredBuses(busesData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let result = [...busesData];

    // Search filter
    if (searchTerm) {
      result = result.filter(bus => 
        bus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bus.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bus.to.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filters.type !== 'all') {
      result = result.filter(bus => bus.type === filters.type);
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      const ranges = {
        low: [0, 400],
        medium: [400, 600],
        high: [600, Infinity],
      };
      const [min, max] = ranges[filters.priceRange];
      result = result.filter(bus => bus.price >= min && bus.price <= max);
    }

    // Custom price range
    if (filters.minPrice > 0) {
      result = result.filter(bus => bus.price >= filters.minPrice);
    }
    if (filters.maxPrice < 1000) {
      result = result.filter(bus => bus.price <= filters.maxPrice);
    }

    // Sort
    result.sort((a, b) => {
      if (sortOrder === 'asc') return a[sortBy] - b[sortBy];
      return b[sortBy] - a[sortBy];
    });

    setFilteredBuses(result);
  }, [filters, sortBy, sortOrder, searchTerm]);

  const handleSelectBus = (bus) => {
    if (!user) {
      toast.error('Please login to continue with booking');
      navigate('/login');
      return;
    }
    localStorage.setItem('selectedBus', JSON.stringify(bus));
    navigate('/seats');
  };

  const clearAllFilters = () => {
    setFilters({ type: 'all', priceRange: 'all', minPrice: 0, maxPrice: 1000, amenities: [] });
    setSearchTerm('');
    setSortBy('price');
    setSortOrder('asc');
    toast.success('All filters cleared');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 animate-pulse">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Available Buses</h1>
          <p className="text-gray-600 dark:text-gray-400">Find and book your perfect bus journey</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by bus name, route..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Filters Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowFilters(!showFilters)}
          className="mb-4 flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters & Sorting</span>
          {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </motion.button>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-lg overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bus Type</label>
                  <select
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  >
                    <option value="all">All Types</option>
                    <option value="VIP">VIP</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price Range</label>
                  <select
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                    value={filters.priceRange}
                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  >
                    <option value="all">All Prices</option>
                    <option value="low">Under 400 ETB</option>
                    <option value="medium">400 - 600 ETB</option>
                    <option value="high">Above 600 ETB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Min Price (ETB)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: parseInt(e.target.value) || 0 })}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Max Price (ETB)</label>
                  <input
                    type="number"
                    placeholder="1000"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) || 1000 })}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearAllFilters}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg transition-all"
                >
                  Clear All Filters
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sort Options */}
        <div className="flex flex-wrap gap-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSortBy('price');
              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            }}
            className={`px-4 py-2 rounded-lg transition-all ${
              sortBy === 'price'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:shadow-md'
            }`}
          >
            Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSortBy('departure');
              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            }}
            className={`px-4 py-2 rounded-lg transition-all ${
              sortBy === 'departure'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:shadow-md'
            }`}
          >
            Departure Time {sortBy === 'departure' && (sortOrder === 'asc' ? '↑' : '↓')}
          </motion.button>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Found {filteredBuses.length} buses
        </div>

        {/* Bus List */}
        <div className="space-y-4">
          {filteredBuses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl"
            >
              <BusIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No buses found. Try adjusting your filters.</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={clearAllFilters}
                className="mt-4 text-blue-600 hover:text-blue-500"
              >
                Clear all filters
              </motion.button>
            </motion.div>
          ) : (
            filteredBuses.map((bus, index) => (
              <motion.div
                key={bus.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01, y: -2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {bus.name}
                          </h3>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{bus.rating}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          bus.type === 'VIP' 
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-md' 
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                        }`}>
                          {bus.type}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                          <span>{bus.from} → {bus.to}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-green-500" />
                          <span>Departure: {formatTime(bus.departure)} | Arrival: {formatTime(bus.arrival)}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-orange-500" />
                          <span>Seats Available: {bus.seatsAvailable}/{bus.totalSeats}</span>
                        </div>
                      </div>
                      
                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2">
                        {bus.amenities.includes('wifi') && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                            <Wifi className="w-3 h-3 mr-1" /> Wi-Fi
                          </span>
                        )}
                        {bus.amenities.includes('ac') && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300">
                            <Wind className="w-3 h-3 mr-1" /> AC
                          </span>
                        )}
                        {bus.amenities.includes('refreshments') && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
                            <Coffee className="w-3 h-3 mr-1" /> Refreshments
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatPrice(bus.price)}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">per seat</div>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold shadow-md hover:shadow-xl transition-all"
                        onClick={() => handleSelectBus(bus)}
                        disabled={bus.seatsAvailable === 0}
                      >
                        Select Seats
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};