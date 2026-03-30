// src/components/BusList.jsx
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  Bus, 
  Clock, 
  MapPin, 
  Users, 
  Filter, 
  ArrowUpDown,
  Wifi,
  Tv,
  Coffee,
  Battery,
  Airplay
} from 'lucide-react'
import toast from 'react-hot-toast'

const BusList = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = location.state || { from: 'Addis Ababa', to: 'Bahir Dar', date: new Date(), passengers: 1 }
  
  const [buses, setBuses] = useState([])
  const [filteredBuses, setFilteredBuses] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    company: 'all',
    minPrice: 0,
    maxPrice: 1000,
    sortBy: 'price'
  })

  // Mock bus data
  useEffect(() => {
    const mockBuses = [
      {
        id: 1,
        company: 'Selam Bus',
        logo: '🚌',
        departure: '08:00',
        arrival: '18:00',
        duration: '10h',
        price: 500,
        availableSeats: 42,
        totalSeats: 52,
        amenities: ['wifi', 'ac', 'tv', 'charging']
      },
      {
        id: 2,
        company: 'Ethio Bus',
        logo: '🚍',
        departure: '09:30',
        arrival: '19:30',
        duration: '10h',
        price: 550,
        availableSeats: 28,
        totalSeats: 48,
        amenities: ['wifi', 'ac', 'charging']
      },
      {
        id: 3,
        company: 'Sky Bus',
        logo: '🚎',
        departure: '11:00',
        arrival: '21:00',
        duration: '10h',
        price: 480,
        availableSeats: 35,
        totalSeats: 50,
        amenities: ['ac', 'tv']
      },
      {
        id: 4,
        company: 'Golden Bus',
        logo: '🚐',
        departure: '14:00',
        arrival: '00:00',
        duration: '10h',
        price: 600,
        availableSeats: 48,
        totalSeats: 60,
        amenities: ['wifi', 'ac', 'tv', 'snacks', 'charging']
      },
      {
        id: 5,
        company: 'Abay Bus',
        logo: '🚌',
        departure: '22:00',
        arrival: '08:00',
        duration: '10h',
        price: 450,
        availableSeats: 12,
        totalSeats: 44,
        amenities: ['ac', 'sleeping']
      }
    ]
    
    setTimeout(() => {
      setBuses(mockBuses)
      setFilteredBuses(mockBuses)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = [...buses]
    
    if (filters.company !== 'all') {
      filtered = filtered.filter(bus => bus.company === filters.company)
    }
    
    filtered = filtered.filter(bus => 
      bus.price >= filters.minPrice && bus.price <= filters.maxPrice
    )
    
    filtered.sort((a, b) => {
      if (filters.sortBy === 'price') return a.price - b.price
      if (filters.sortBy === 'price-desc') return b.price - a.price
      if (filters.sortBy === 'departure') return a.departure.localeCompare(b.departure)
      if (filters.sortBy === 'seats') return b.availableSeats - a.availableSeats
      return 0
    })
    
    setFilteredBuses(filtered)
  }, [buses, filters])

  const getAmenityIcon = (amenity) => {
    switch(amenity) {
      case 'wifi': return <Wifi className="h-4 w-4" />
      case 'tv': return <Tv className="h-4 w-4" />
      case 'snacks': return <Coffee className="h-4 w-4" />
      case 'charging': return <Battery className="h-4 w-4" />
      default: return <Airplay className="h-4 w-4" />
    }
  }

  const handleSelectBus = (bus) => {
    if (bus.availableSeats === 0) {
      toast.error('No seats available on this bus')
      return
    }
    navigate(`/seats/${bus.id}`, { state: { bus, passengers: searchParams.passengers } })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">From</p>
                <p className="font-semibold text-lg">{searchParams.from}</p>
              </div>
              <Bus className="h-5 w-5 text-primary-600" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">To</p>
                <p className="font-semibold text-lg">{searchParams.to}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                <p className="font-semibold">{new Date(searchParams.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Passengers</p>
                <p className="font-semibold">{searchParams.passengers}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/search')}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Modify Search
            </button>
          </div>
        </motion.div>

        {/* Filters Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
          
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="input-field"
          >
            <option value="price">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="departure">Departure Time</option>
            <option value="seats">Available Seats</option>
          </select>
          
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: parseInt(e.target.value) || 0 })}
            className="input-field"
          />
          
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) || 1000 })}
            className="input-field"
          />
        </div>

        {/* Bus List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 animate-pulse">
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            {filteredBuses.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Bus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No Buses Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your filters or search for different dates
                </p>
              </motion.div>
            ) : (
              filteredBuses.map((bus, index) => (
                <motion.div
                  key={bus.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 mb-4 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-5xl">{bus.logo}</div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {bus.company}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <Clock className="h-4 w-4" />
                            <span>{bus.departure} - {bus.arrival}</span>
                            <span className="text-gray-400">({bus.duration})</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600">
                          {bus.price} ETB
                        </div>
                        <div className="text-sm text-gray-500">per person</div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t dark:border-gray-700">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className={`text-sm font-medium ${
                              bus.availableSeats > 10 ? 'text-green-600' : 'text-orange-600'
                            }`}>
                              {bus.availableSeats} seats available
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {bus.amenities.map((amenity, i) => (
                              <div key={i} className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                                {getAmenityIcon(amenity)}
                                <span className="capitalize">{amenity}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSelectBus(bus)}
                          disabled={bus.availableSeats === 0}
                          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Select Seats
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

export default BusList