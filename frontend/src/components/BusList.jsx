// frontend/src/components/BusList.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBus, FaClock, FaMoneyBillWave, FaFilter, FaSort } from 'react-icons/fa';

const BusList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = location.state || { from: 'Addis Ababa', to: 'Bahir Dar', date: '2024-01-15', passengers: 1 };
  
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 1000 },
    timeRange: 'all',
    company: 'all'
  });
  const [sortBy, setSortBy] = useState('price');

  // Mock bus data
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockBuses = [
        {
          id: 1,
          company: 'Selam Bus',
          logo: '🚌',
          departure: '08:00',
          arrival: '18:00',
          duration: '10h',
          price: 500,
          availableSeats: 45,
          totalSeats: 52,
          amenities: ['WiFi', 'AC', 'TV', 'Snacks']
        },
        {
          id: 2,
          company: 'Ethio Bus',
          logo: '🚍',
          departure: '09:30',
          arrival: '19:30',
          duration: '10h',
          price: 550,
          availableSeats: 32,
          totalSeats: 48,
          amenities: ['WiFi', 'AC', 'Power Outlets']
        },
        {
          id: 3,
          company: 'Sky Bus',
          logo: '🚎',
          departure: '11:00',
          arrival: '21:00',
          duration: '10h',
          price: 480,
          availableSeats: 28,
          totalSeats: 50,
          amenities: ['AC', 'TV']
        },
        {
          id: 4,
          company: 'Golden Bus',
          logo: '🚐',
          departure: '14:00',
          arrival: '00:00',
          duration: '10h',
          price: 600,
          availableSeats: 52,
          totalSeats: 60,
          amenities: ['WiFi', 'AC', 'TV', 'Meals', 'Charging']
        },
        {
          id: 5,
          company: 'Abay Bus',
          logo: '🚌',
          departure: '22:00',
          arrival: '08:00',
          duration: '10h',
          price: 450,
          availableSeats: 15,
          totalSeats: 44,
          amenities: ['AC', 'Sleeping Seats']
        }
      ];
      setBuses(mockBuses);
      setFilteredBuses(mockBuses);
      setLoading(false);
    }, 1500);
  }, []);

  // Filter and sort buses
  useEffect(() => {
    let filtered = [...buses];
    
    // Apply filters
    if (filters.company !== 'all') {
      filtered = filtered.filter(bus => bus.company === filters.company);
    }
    
    filtered = filtered.filter(bus => bus.price >= filters.priceRange.min && bus.price <= filters.priceRange.max);
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'price':
          return a.price - b.price;
        case 'departure':
          return a.departure.localeCompare(b.departure);
        case 'available':
          return b.availableSeats - a.availableSeats;
        default:
          return 0;
      }
    });
    
    setFilteredBuses(filtered);
  }, [buses, filters, sortBy]);

  const handleSelectBus = (bus) => {
    navigate(`/seat-selection/${bus.id}`, { state: { bus, passengers: searchParams.passengers } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Summary */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">From</p>
                <p className="font-bold text-lg">{searchParams.from}</p>
              </div>
              <FaBus className="text-blue-600" />
              <div className="text-center">
                <p className="text-sm text-gray-500">To</p>
                <p className="font-bold text-lg">{searchParams.to}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-bold">{searchParams.date}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Passengers</p>
                <p className="font-bold">{searchParams.passengers}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/search')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Modify Search
            </button>
          </div>
        </motion.div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaFilter className="inline mr-1" /> Filter by Company
            </label>
            <select
              value={filters.company}
              onChange={(e) => setFilters({ ...filters, company: e.target.value })}
              className="input-field"
            >
              <option value="all">All Companies</option>
              <option value="Selam Bus">Selam Bus</option>
              <option value="Ethio Bus">Ethio Bus</option>
              <option value="Sky Bus">Sky Bus</option>
              <option value="Golden Bus">Golden Bus</option>
              <option value="Abay Bus">Abay Bus</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaSort className="inline mr-1" /> Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              <option value="price">Price (Low to High)</option>
              <option value="departure">Departure Time</option>
              <option value="available">Available Seats</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range (ETB)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="0"
                max="1000"
                value={filters.priceRange.min}
                onChange={(e) => setFilters({ ...filters, priceRange: { ...filters.priceRange, min: parseInt(e.target.value) } })}
                className="input-field"
                placeholder="Min"
              />
              <span>-</span>
              <input
                type="number"
                min="0"
                max="1000"
                value={filters.priceRange.max}
                onChange={(e) => setFilters({ ...filters, priceRange: { ...filters.priceRange, max: parseInt(e.target.value) } })}
                className="input-field"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        {/* Bus List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <AnimatePresence>
            {filteredBuses.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Buses Found</h3>
                <p className="text-gray-600">Try adjusting your filters or search for different dates</p>
              </motion.div>
            ) : (
              filteredBuses.map((bus, index) => (
                <motion.div
                  key={bus.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mb-4 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{bus.logo}</div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{bus.company}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                            <FaClock className="text-blue-600" />
                            <span>{bus.departure} - {bus.arrival}</span>
                            <span className="text-gray-400">({bus.duration})</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {bus.price} ETB
                        </div>
                        <div className="text-sm text-gray-600">
                          per person
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <div className={`w-3 h-3 rounded-full ${bus.availableSeats > 10 ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                          <span className="text-sm text-gray-600">
                            {bus.availableSeats} seats available
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {bus.amenities.slice(0, 3).map((amenity, i) => (
                            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {amenity}
                            </span>
                          ))}
                          {bus.amenities.length > 3 && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              +{bus.amenities.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSelectBus(bus)}
                        className="btn-primary"
                      >
                        Select Seats
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default BusList;