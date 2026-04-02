// src/components/BookingSummary.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Panel } from './ui/Panel';
import { Button } from './ui/Button';
import { formatPrice } from '../lib/ui';

export const BookingSummary = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = React.useState(null);

  React.useEffect(() => {
    const data = localStorage.getItem('bookingData');
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!bookingData) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <Panel>
          <h2 className="text-2xl font-bold mb-6">Booking Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between pb-2 border-b">
              <span className="text-gray-600">Bus Name</span>
              <span className="font-semibold">{bookingData.bus.name}</span>
            </div>
            <div className="flex justify-between pb-2 border-b">
              <span className="text-gray-600">Route</span>
              <span>{bookingData.bus.from} → {bookingData.bus.to}</span>
            </div>
            <div className="flex justify-between pb-2 border-b">
              <span className="text-gray-600">Selected Seats</span>
              <span className="font-semibold">{bookingData.selectedSeats.join(', ')}</span>
            </div>
            <div className="flex justify-between pb-2 border-b">
              <span className="text-gray-600">Ticket Price</span>
              <span>{formatPrice(bookingData.bus.price)} per seat</span>
            </div>
            <div className="flex justify-between pb-2 border-b">
              <span className="text-gray-600">Number of Seats</span>
              <span>{bookingData.selectedSeats.length}</span>
            </div>
            <div className="flex justify-between pt-4 text-xl font-bold">
              <span>Total Amount</span>
              <span className="text-blue-600">{formatPrice(bookingData.totalPrice)}</span>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <Button variant="outline" onClick={() => navigate('/booking')}>
              Back to Seats
            </Button>
            <Button onClick={() => navigate('/payment')}>
              Proceed to Payment
            </Button>
          </div>
        </Panel>
      </motion.div>
    </div>
  );
};