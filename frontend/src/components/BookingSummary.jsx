// frontend/src/components/BookingSummary.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaPhone, FaBus, FaChair, FaMoneyBillWave } from 'react-icons/fa';
import toast from 'react-hot-toast';

const BookingSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bus, selectedSeats, totalAmount } = location.state || {};
  
  const [passengerDetails, setPassengerDetails] = useState({
    name: '',
    phone: '',
    email: '',
    specialRequests: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate phone number (Ethiopian format)
    const phoneRegex = /^(\+251|0)[9][0-9]{8}$/;
    if (!phoneRegex.test(passengerDetails.phone)) {
      toast.error('Please enter a valid Ethiopian phone number');
      return;
    }

    setLoading(true);
    
    // Save booking to localStorage temporarily
    const bookingData = {
      id: Date.now(),
      ...passengerDetails,
      bus,
      selectedSeats,
      totalAmount,
      bookingDate: new Date().toISOString(),
      status: 'pending'
    };
    
    localStorage.setItem('currentBooking', JSON.stringify(bookingData));
    
    setTimeout(() => {
      setLoading(false);
      navigate('/payment', { state: { bookingData } });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Booking Summary</h1>
          <p className="text-gray-600 mt-2">Please review your booking details</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Passenger Details Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <FaUser className="mr-2 text-blue-600" />
              Passenger Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={passengerDetails.name}
                  onChange={(e) => setPassengerDetails({ ...passengerDetails, name: e.target.value })}
                  className="input-field"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <FaPhone className="inline mr-1" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={passengerDetails.phone}
                  onChange={(e) => setPassengerDetails({ ...passengerDetails, phone: e.target.value })}
                  className="input-field"
                  placeholder="+251912345678"
                />
                <p className="text-xs text-gray-500 mt-1">Ethiopian format: +251XXXXXXXXX</p>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={passengerDetails.email}
                  onChange={(e) => setPassengerDetails({ ...passengerDetails, email: e.target.value })}
                  className="input-field"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Special Requests
                </label>
                <textarea
                  value={passengerDetails.specialRequests}
                  onChange={(e) => setPassengerDetails({ ...passengerDetails, specialRequests: e.target.value })}
                  className="input-field"
                  rows="3"
                  placeholder="Any special requirements?"
                />
              </div>
            </form>
          </motion.div>

          {/* Booking Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Bus Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FaBus className="mr-2 text-blue-600" />
                Trip Details
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bus Company:</span>
                  <span className="font-semibold">{bus?.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Departure:</span>
                  <span className="font-semibold">{bus?.departure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Arrival:</span>
                  <span className="font-semibold">{bus?.arrival}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold">{bus?.duration}</span>
                </div>
              </div>
            </div>

            {/* Seats Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FaChair className="mr-2 text-blue-600" />
                Selected Seats
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedSeats?.map((seat) => (
                  <span
                    key={seat.id}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    Seat {seat.number}
                  </span>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FaMoneyBillWave className="mr-2 text-blue-600" />
                Payment Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ticket Price:</span>
                  <span className="font-semibold">{bus?.price} ETB × {selectedSeats?.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee:</span>
                  <span className="font-semibold">50 ETB</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-blue-600">{totalAmount + 50} ETB</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Proceed Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={loading}
              className="w-full btn-primary py-4 text-lg"
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;