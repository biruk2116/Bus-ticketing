// src/components/SeatSelection.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Armchair, Check, X } from 'lucide-react';
import { Button } from './ui/Button';
import { Panel } from './ui/Panel';
import { formatPrice } from '../lib/ui';

export const SeatSelection = () => {
  const navigate = useNavigate();
  const [bus, setBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatLayout, setSeatLayout] = useState([]);

  useEffect(() => {
    const storedBus = localStorage.getItem('selectedBus');
    if (storedBus) {
      const busData = JSON.parse(storedBus);
      setBus(busData);
      generateSeats(busData.totalSeats);
    }
  }, []);

  const generateSeats = (totalSeats) => {
    const seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      const isBooked = Math.random() < 0.3; // Randomly book some seats for demo
      seats.push({
        id: i,
        number: i,
        status: isBooked ? 'booked' : 'available',
      });
    }
    setSeatLayout(seats);
  };

  const handleSeatClick = (seat) => {
    if (seat.status === 'booked') return;
    
    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
    } else {
      if (selectedSeats.length < 6) { // Max 6 seats per booking
        setSelectedSeats([...selectedSeats, seat.id]);
      }
    }
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) return;
    
    const bookingData = {
      bus,
      selectedSeats,
      totalPrice: bus.price * selectedSeats.length,
    };
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    navigate('/payment');
  };

  if (!bus) return null;

  const totalPrice = bus.price * selectedSeats.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Panel>
            <h2 className="text-2xl font-bold mb-6">Select Your Seats</h2>
            
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-32 h-8 bg-gray-300 dark:bg-gray-700 rounded-t-lg flex items-center justify-center text-sm">
                  Front
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                {seatLayout.map((seat) => (
                  <motion.button
                    key={seat.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSeatClick(seat)}
                    disabled={seat.status === 'booked'}
                    className={`
                      relative p-3 rounded-lg transition-all
                      ${seat.status === 'booked' 
                        ? 'bg-red-500 cursor-not-allowed opacity-50' 
                        : selectedSeats.includes(seat.id)
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 hover:text-white'
                      }
                    `}
                  >
                    <Armchair className="w-6 h-6 mx-auto" />
                    <span className="text-xs mt-1 block">{seat.number}</span>
                    {selectedSeats.includes(seat.id) && (
                      <Check className="w-4 h-4 absolute top-1 right-1" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded mr-2"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                <span>Booked</span>
              </div>
            </div>
          </Panel>
        </div>

        <div>
          <Panel>
            <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Bus:</span>
                <span className="font-semibold">{bus.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Route:</span>
                <span>{bus.from} → {bus.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Selected Seats:</span>
                <span>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
            <Button 
              className="w-full" 
              onClick={handleContinue}
              disabled={selectedSeats.length === 0}
            >
              Continue to Payment
            </Button>
          </Panel>
        </div>
      </div>
    </div>
  );
};