// src/components/BusList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, MapPin, Users, Filter, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { formatPrice, formatTime } from '../lib/ui';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const busesData = [
  { id: 1, name: 'Ethio Luxury Express', from: 'Addis Ababa', to: 'Bahir Dar', departure: '06:00', arrival: '12:00', price: 450, seatsAvailable: 25, totalSeats: 40, type: 'VIP' },
  { id: 2, name: 'Sky Bus', from: 'Addis Ababa', to: 'Gondar', departure: '07:30', arrival: '14:30', price: 550, seatsAvailable: 18, totalSeats: 40, type: 'VIP' },
  { id: 3, name: 'Selam Bus', from: 'Addis Ababa', to: 'Hawassa', departure: '08:00', arrival: '13:00', price: 350, seatsAvailable: 32, totalSeats: 45, type: 'Standard' },
  { id: 4, name: 'Sheba Bus', from: 'Addis Ababa', to: 'Mekelle', departure: '09:00', arrival: '18:00', price: 650, seatsAvailable: 12, totalSeats: 40, type: 'VIP' },
  { id: 5, name: 'Roha Bus', from: 'Addis Ababa', to: 'Lalibela', departure: '10:00', arrival: '17:00', price: 500, seatsAvailable: 8, totalSeats: 35, type: 'Standard' },
];

export const BusList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({ type: 'all', priceRange: 'all' });

  useEffect(() => {
    setTimeout(() => {
      setFilteredBuses(busesData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let result = [...busesData];

    if (filters.type !== 'all') {
      result = result.filter(bus => bus.type === filters.type);
    }

    if (filters.priceRange !== 'all') {
      const ranges = {
        low: [0, 400],
        medium: [400, 600],
        high: [600, Infinity],
      };
      const [min, max] = ranges[filters.priceRange];
      result = result.filter(bus => bus.price >= min && bus.price <= max);
    }

    result.sort((a, b) => {
      if (sortOrder === 'asc') return a[sortBy] - b[sortBy];
      return b[sortBy] - a[sortBy];
    });

    setFilteredBuses(result);
  }, [filters, sortBy, sortOrder]);

  const handleSelectBus = (bus) => {
    if (!user) {
      toast.error('Please login to continue with booking');
      navigate('/login');
      return;
    }
    localStorage.setItem('selectedBus', JSON.stringify(bus));
    navigate('/seats');
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Available Buses</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Find and book your perfect bus journey</p>

        {/* Filters Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="mb-4 flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bus Type</label>
                <select
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white"
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
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white"
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                >
                  <option value="all">All Prices</option>
                  <option value="low">Under 400 ETB</option>
                  <option value="medium">400 - 600 ETB</option>
                  <option value="high">Above 600 ETB</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Sort Options */}
        <div className="flex justify-end space-x-2 mb-6">
          <button
            onClick={() => {
              setSortBy('price');
              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            }}
            className={`px-4 py-2 rounded-lg transition-all ${
              sortBy === 'price'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => {
              setSortBy('departure');
              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            }}
            className={`px-4 py-2 rounded-lg transition-all ${
              sortBy === 'departure'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Departure {sortBy === 'departure' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>

        {/* Bus List */}
        <div className="space-y-4">
          {filteredBuses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No buses found. Try adjusting your filters.</p>
            </div>
          ) : (
            filteredBuses.map((bus, index) => (
              <motion.div
                key={bus.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{bus.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          bus.type === 'VIP' 
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' 
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                        }`}>
                          {bus.type}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {bus.from} → {bus.to}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Departure: {formatTime(bus.departure)} | Arrival: {formatTime(bus.arrival)}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          Seats Available: {bus.seatsAvailable}/{bus.totalSeats}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatPrice(bus.price)}</div>
                      <button 
                        className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition-all"
                        onClick={() => handleSelectBus(bus)}
                        disabled={bus.seatsAvailable === 0}
                      >
                        Select Seats
                      </button>
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