// src/components/BusSearch.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Users, Search, ArrowRightLeft } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const BusSearch = ({ compact = false }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: new Date(),
    passengers: 1
  })

  const cities = [
    'Addis Ababa', 'Bahir Dar', 'Gondar', 'Hawassa', 'Mekelle',
    'Dire Dawa', 'Jimma', 'Arba Minch', 'Harar', 'Dessie'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.from && formData.to && formData.date) {
      navigate('/buses', { state: formData })
    }
  }

  const swapCities = () => {
    setFormData({
      ...formData,
      from: formData.to,
      to: formData.from
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl ${compact ? 'p-6' : 'p-8'} max-w-4xl mx-auto`}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* From City */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MapPin className="inline h-4 w-4 mr-1 text-primary-600" />
              From
            </label>
            <select
              required
              value={formData.from}
              onChange={(e) => setFormData({ ...formData, from: e.target.value })}
              className="input-field"
            >
              <option value="">Select departure city</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* To City */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MapPin className="inline h-4 w-4 mr-1 text-accent-500" />
              To
            </label>
            <div className="relative">
              <select
                required
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                className="input-field"
              >
                <option value="">Select destination city</option>
                {cities.filter(c => c !== formData.from).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={swapCities}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <ArrowRightLeft className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="inline h-4 w-4 mr-1 text-primary-600" />
              Travel Date
            </label>
            <DatePicker
              selected={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              minDate={new Date()}
              className="input-field"
              dateFormat="MMMM d, yyyy"
              required
            />
          </div>

          {/* Passengers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Users className="inline h-4 w-4 mr-1 text-primary-600" />
              Passengers
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={formData.passengers}
              onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
              className="input-field"
              required
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full btn-primary py-3 flex items-center justify-center space-x-2"
        >
          <Search className="h-5 w-5" />
          <span>Search Buses</span>
        </motion.button>
      </form>
    </motion.div>
  )
}

export default BusSearch