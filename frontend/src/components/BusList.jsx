// src/components/BusList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Users, Filter, ChevronDown, ChevronUp, Search, X, SlidersHorizontal, Bus as BusIcon, Star, Wifi, Coffee, Wind, ArrowLeft } from 'lucide-react';
import { formatPrice, formatTime } from '../lib/ui';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const busesData = [
  { id: 1, name: 'Ethio Luxury', from: 'Addis Ababa', to: 'Bahir Dar', departure: '06:00', arrival: '12:00', price: 450, seatsAvailable: 25, totalSeats: 40, type: 'VIP', rating: 4.8 },
  { id: 2, name: 'Sky Bus', from: 'Addis Ababa', to: 'Gondar', departure: '07:30', arrival: '14:30', price: 550, seatsAvailable: 18, totalSeats: 40, type: 'VIP', rating: 4.9 },
  { id: 3, name: 'Selam Bus', from: 'Addis Ababa', to: 'Hawassa', departure: '08:00', arrival: '13:00', price: 350, seatsAvailable: 32, totalSeats: 45, type: 'Standard', rating: 4.5 },
  { id: 4, name: 'Sheba Bus', from: 'Addis Ababa', to: 'Mekelle', departure: '09:00', arrival: '18:00', price: 650, seatsAvailable: 12, totalSeats: 40, type: 'VIP', rating: 4.7 },
  { id: 5, name: 'Roha Bus', from: 'Addis Ababa', to: 'Lalibela', departure: '10:00', arrival: '17:00', price: 500, seatsAvailable: 8, totalSeats: 35, type: 'Standard', rating: 4.6 },
];

export const BusList = () => {
  const navigate = useNavigate();
  const { user, addBooking } = useAuth();
  const [loading, setLoading] = useState(true);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({ type: 'all', priceRange: 'all' });

  useEffect(() => {
    setTimeout(() => {
      setFilteredBuses(busesData);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let result = [...busesData];

    if (searchQuery) {
      result = result.filter(bus => 
        bus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bus.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bus.to.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.type !== 'all') {
      result = result.filter(bus => bus.type === filters.type);
    }

    if (filters.priceRange !== 'all') {
      const ranges = { low: [0, 400], medium: [400, 600], high: [600, Infinity] };
      const [min, max] = ranges[filters.priceRange];
      result = result.filter(bus => bus.price >= min && bus.price <= max);
    }

    result.sort((a, b) => {
      if (sortOrder === 'asc') return a[sortBy] - b[sortBy];
      return b[sortBy] - a[sortBy];
    });

    setFilteredBuses(result);
  }, [filters, sortBy, sortOrder, searchQuery]);

  const handleSelectBus = (bus) => {
    if (!user) {
      toast.error('Please login to continue with booking');
      navigate('/login');
      return;
    }
    
    // Store selected bus for booking
    localStorage.setItem('selectedBus', JSON.stringify(bus));
    navigate('/seats');
  };

  const clearFilters = () => {
    setFilters({ type: 'all', priceRange: 'all' });
    setSearchQuery('');
    toast.success('All filters cleared');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-5 animate-pulse">
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Available Buses</h1>
          <div className="w-20"></div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by bus name or route..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* Filters Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 mb-3"
        >
          <SlidersHorizontal className="w-3 h-3" />
          <span>Filters</span>
          {showFilters ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 shadow-md overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Bus Type</label>
                  <select
                    className="w-full text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-2 py-1.5"
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  >
                    <option value="all">All</option>
                    <option value="VIP">VIP</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label>
                  <select
                    className="w-full text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-2 py-1.5"
                    value={filters.priceRange}
                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  >
                    <option value="all">All</option>
                    <option value="low">Under 400</option>
                    <option value="medium">400-600</option>
                    <option value="high">600+</option>
                  </select>
                </div>
              </div>
              <button onClick={clearFilters} className="text-xs text-blue-600 mt-3">Clear all</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sort Options */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => { setSortBy('price'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}
            className={`px-3 py-1 text-xs rounded-lg transition-all ${sortBy === 'price' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border'}`}
          >
            Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => { setSortBy('departure'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}
            className={`px-3 py-1 text-xs rounded-lg transition-all ${sortBy === 'departure' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border'}`}
          >
            Departure {sortBy === 'departure' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>

        {/* Results Count */}
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">{filteredBuses.length} buses found</div>

        {/* Bus List */}
        <div className="space-y-3">
          {filteredBuses.length === 0 ? (
            <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg">
              <BusIcon className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No buses found</p>
              <button onClick={clearFilters} className="mt-2 text-sm text-blue-600">Clear filters</button>
            </div>
          ) : (
            filteredBuses.map((bus, index) => (
              <motion.div
                key={bus.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.01 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex flex-wrap justify-between items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">{bus.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${bus.type === 'VIP' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}>
                        {bus.type}
                      </span>
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{bus.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-400 mb-2">
                      <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {bus.from} → {bus.to}</div>
                      <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {bus.departure} - {bus.arrival}</div>
                      <div className="flex items-center gap-1"><Users className="w-3 h-3" /> {bus.seatsAvailable} seats</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatPrice(bus.price)}</div>
                    <button 
                      onClick={() => handleSelectBus(bus)}
                      className="mt-1 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-lg hover:shadow-md transition-all"
                    >
                      Select
                    </button>
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