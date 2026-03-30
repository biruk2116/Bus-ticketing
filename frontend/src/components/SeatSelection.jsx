// src/components/SeatSelection.jsx
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { Bus, Armchair, Info, ArrowLeft, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const SeatSelection = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { bus, passengers } = location.state || {}
  
  const [seats, setSeats] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Generate seat layout
    setTimeout(() => {
      const rows = 10
      const columns = 4
      const generatedSeats = []
      
      for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= columns; col++) {
          const seatNumber = `${String.fromCharCode(64 + row)}${col}`
          const isBooked = Math.random() < 0.3 // 30% booked
          const isAisle = col === 2 || col === 3
          
          generatedSeats.push({
            id: seatNumber,
            number: seatNumber,
            row,
            col,
            isBooked,
            isAisle,
            selected: false,
            price: bus?.price || 500
          })
        }
      }
      setSeats(generatedSeats)
      setLoading(false)
    }, 1000)
  }, [bus])

  const handleSeatClick = (seat) => {
    if (seat.isBooked) {
      toast.error('This seat is already booked')
      return
    }

    if (seat.selected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id))
      setSeats(seats.map(s => s.id === seat.id ? { ...s, selected: false } : s))
    } else {
      if (selectedSeats.length >= passengers) {
        toast.error(`You can only select up to ${passengers} seats`)
        return
      }
      setSelectedSeats([...selectedSeats, seat])
      setSeats(seats.map(s => s.id === seat.id ? { ...s, selected: true } : s))
    }
  }

  const handleContinue = () => {
    if (selectedSeats.length !== passengers) {
      toast.error(`Please select exactly ${passengers} seats`)
      return
    }
    navigate('/summary', {
      state: {
        bus,
        selectedSeats,
        passengers,
        totalAmount: selectedSeats.reduce((sum, seat) => sum + seat.price, 0)
      }
    })
  }

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Bus className="h-10 w-10 text-primary-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{bus?.company}</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {bus?.departure} - {bus?.arrival} | {bus?.duration}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Selected Seats</p>
              <p className="text-3xl font-bold text-primary-600">{selectedSeats.length}/{passengers}</p>
            </div>
          </div>
        </motion.div>

        {/* Seat Legend */}
        <div className="flex justify-center space-x-6 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            <span className="text-sm">Booked</span>
          </div>
          <div className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-gray-400" />
            <span className="text-sm">Aisle seat</span>
          </div>
        </div>

        {/* Seat Layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 overflow-x-auto"
        >
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full"
              />
            </div>
          ) : (
            <>
              {/* Driver Area */}
              <div className="text-center mb-8">
                <div className="inline-block bg-gray-800 text-white px-6 py-2 rounded-lg">
                  Driver
                </div>
              </div>

              {/* Seats Grid */}
              <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                {seats.map((seat) => (
                  <motion.button
                    key={seat.id}
                    whileHover={{ scale: seat.isBooked ? 1 : 1.05 }}
                    whileTap={{ scale: seat.isBooked ? 1 : 0.95 }}
                    onClick={() => handleSeatClick(seat)}
                    disabled={seat.isBooked}
                    className={`
                      relative p-3 rounded-lg text-center font-medium transition-all duration-200
                      ${seat.isBooked 
                        ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500' 
                        : seat.selected 
                          ? 'bg-primary-600 text-white shadow-lg' 
                          : 'bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-200 cursor-pointer'
                      }
                      ${seat.col === 2 ? 'mr-4' : ''}
                    `}
                  >
                    {seat.number}
                    {seat.selected && (
                      <CheckCircle className="absolute -top-2 -right-2 h-5 w-5 text-green-500 bg-white rounded-full" />
                    )}
                  </motion.button>
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* Price Summary */}
        <AnimatePresence>
          {selectedSeats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Amount</p>
                  <p className="text-3xl font-bold text-primary-600">{totalPrice} ETB</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedSeats.length} seat(s) × {bus?.price} ETB
                  </p>
                </div>
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(-1)}
                    className="btn-outline flex items-center space-x-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleContinue}
                    className="btn-primary"
                  >
                    Continue to Booking
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SeatSelection