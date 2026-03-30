// frontend/src/components/SeatSelection.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBus, FaChair, FaWheelchair } from 'react-icons/fa';
import toast from 'react-hot-toast';

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bus, passengers } = location.state || {};
  
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Generate seat layout
  useEffect(() => {
    setLoading(true);
    // Simulate API call to get seat availability
    setTimeout(() => {
      const rows = 12;
      const columns = 4;
      const generatedSeats = [];
      
      for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= columns; col++) {
          const seatNumber = `${String.fromCharCode(64 + row)}${col}`;
          const isBooked = Math.random() < 0.3; // 30% chance of being booked
          const isAisle = col === 2 || col === 3;
          
          generatedSeats.push({
            id: seatNumber,
            number: seatNumber,
            row,
            col,
            isBooked,
            isAisle,
            price: bus?.price || 500,
            selected: false
          });
        }
      }
      
      setSeats(generatedSeats);
      setLoading(false);
    }, 1000);
  }, [bus]);

  const handleSeatClick = (seat) => {
    if (seat.isBooked) {
      toast.error('This seat is already booked');
      return;
    }

    if (selectedSeats.length >= passengers && !seat.selected) {
      toast.error(`You can only select ${passengers} seats`);
      return;
    }

    setSeats(seats.map(s => 
      s.id === seat.id ? { ...s, selected: !s.selected } : s
    ));

    if (seat.selected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleContinue = () => {
    if (selectedSeats.length !== passengers) {
      toast.error(`Please select exactly ${passengers} seats`);
      return;
    }

    navigate('/booking-summary', {
      state: {
        bus,
        selectedSeats,
        passengers,
        totalAmount: selectedSeats.reduce((sum, seat) => sum + seat.price, 0)
      }
    });
  };

  const getSeatColor = (seat) => {
    if (seat.isBooked) return 'bg-gray-400 cursor-not-allowed';
    if (seat.selected) return 'bg-green-500 text-white';
    return 'bg-blue-100 hover:bg-blue-200 cursor-pointer';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Bus Info */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FaBus className="text-4xl text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold">{bus?.company}</h2>
                <p className="text-gray-600">
                  {bus?.departure} - {bus?.arrival} | {bus?.duration}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Selected Seats</p>
              <p className="text-2xl font-bold text-blue-600">
                {selectedSeats.length} / {passengers}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Seat Legend */}
        <div className="flex justify-center space-x-6 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-100 rounded"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-500 rounded"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
            <span className="text-sm">Booked</span>
          </div>
        </div>

        {/* Seat Layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
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
                      ${getSeatColor(seat)}
                      ${seat.col === 2 ? 'mr-4' : ''}
                    `}
                  >
                    {seat.number}
                    {seat.isAisle && (
                      <span className="absolute -right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        |
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Wheelchair Space */}
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaWheelchair className="text-xl" />
                  <span>Wheelchair accessible space</span>
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* Price Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <p className="text-gray-600">Total Amount</p>
              <p className="text-3xl font-bold text-blue-600">
                {selectedSeats.reduce((sum, seat) => sum + seat.price, 0)} ETB
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="btn-outline"
              >
                Back
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContinue}
                className="btn-primary"
                disabled={selectedSeats.length !== passengers}
              >
                Continue to Booking
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SeatSelection;