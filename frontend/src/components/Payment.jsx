// src/components/Payment.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Building, Lock, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const Payment = () => {
  const navigate = useNavigate();
  const { user, addBooking } = useAuth();
  const [bookingData, setBookingData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  useEffect(() => {
    const data = localStorage.getItem('bookingData');
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handlePayment = async () => {
    if (!cardDetails.name && paymentMethod === 'card') {
      toast.error('Please enter cardholder name');
      return;
    }

    setProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate payment success
    const paymentSuccess = true;
    
    if (paymentSuccess && user) {
      const ticketData = {
        ...bookingData,
        paymentId: 'TXN_' + Math.random().toString(36).substr(2, 9),
        bookingDate: new Date().toISOString(),
        passengerName: cardDetails.name || user.name,
      };
      localStorage.setItem('ticketData', JSON.stringify(ticketData));
      
      // Save to user history
      const bookingRecord = {
        route: `${bookingData.bus.from} → ${bookingData.bus.to}`,
        date: new Date().toLocaleDateString(),
        seats: bookingData.selectedSeats.join(', '),
        amount: bookingData.totalPrice,
        busName: bookingData.bus.name,
        status: 'confirmed',
        bookingId: 'BK' + Date.now()
      };
      addBooking(bookingRecord);
      
      toast.success('Payment successful!');
      navigate('/ticket');
    } else {
      toast.error('Payment failed. Please try again.');
    }
    setProcessing(false);
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <button
          onClick={() => navigate('/summary')}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Summary</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Methods */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Payment Method</h2>
            
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-3 rounded-lg border-2 transition-all flex items-center space-x-3 ${
                  paymentMethod === 'card' 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-blue-500' : 'text-gray-400'}`} />
                <div className="text-left">
                  <div className="font-semibold text-sm text-gray-900 dark:text-white">Credit / Debit Card</div>
                  <div className="text-xs text-gray-500">Visa, Mastercard, etc.</div>
                </div>
              </button>
              
              <button
                onClick={() => setPaymentMethod('mobile')}
                className={`w-full p-3 rounded-lg border-2 transition-all flex items-center space-x-3 ${
                  paymentMethod === 'mobile' 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <Smartphone className={`w-5 h-5 ${paymentMethod === 'mobile' ? 'text-blue-500' : 'text-gray-400'}`} />
                <div className="text-left">
                  <div className="font-semibold text-sm text-gray-900 dark:text-white">Mobile Money</div>
                  <div className="text-xs text-gray-500">Telebirr, CBE Birr</div>
                </div>
              </button>
              
              <button
                onClick={() => setPaymentMethod('bank')}
                className={`w-full p-3 rounded-lg border-2 transition-all flex items-center space-x-3 ${
                  paymentMethod === 'bank' 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <Building className={`w-5 h-5 ${paymentMethod === 'bank' ? 'text-blue-500' : 'text-gray-400'}`} />
                <div className="text-left">
                  <div className="font-semibold text-sm text-gray-900 dark:text-white">Bank Transfer</div>
                  <div className="text-xs text-gray-500">Direct bank transfer</div>
                </div>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            )}

            {paymentMethod === 'mobile' && (
              <div className="space-y-3">
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <select className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option>Select Provider</option>
                  <option>Telebirr</option>
                  <option>CBE Birr</option>
                  <option>M-Pesa</option>
                </select>
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">Bank: Commercial Bank of Ethiopia</p>
                <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">Account: 1000 1234 5678</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">Reference: Use your booking ID</p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Bus</span>
                <span className="font-semibold text-gray-900 dark:text-white">{bookingData.bus.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Route</span>
                <span className="text-gray-900 dark:text-white">{bookingData.bus.from} → {bookingData.bus.to}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Seats</span>
                <span className="font-semibold text-gray-900 dark:text-white">{bookingData.selectedSeats.join(', ')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Ticket Price</span>
                <span className="text-gray-900 dark:text-white">ETB {bookingData.bus.price} x {bookingData.selectedSeats.length}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-blue-600">ETB {bookingData.totalPrice}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <Lock className="w-4 h-4 text-yellow-600" />
              <span className="text-xs text-yellow-800 dark:text-yellow-400">Secure payment encrypted</span>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50"
            >
              {processing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                `Pay ETB ${bookingData.totalPrice}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};