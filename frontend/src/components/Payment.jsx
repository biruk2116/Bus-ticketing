// frontend/src/components/Payment.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaQrcode, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { SiEthereum } from 'react-icons/si';
import toast from 'react-hot-toast';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData } = location.state || {};
  
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const paymentMethods = [
    {
      id: 'telebirr',
      name: 'Telebirr',
      icon: '📱',
      color: 'bg-green-600',
      description: 'Pay using Telebirr mobile money'
    },
    {
      id: 'cbe',
      name: 'CBE Birr',
      icon: '🏦',
      color: 'bg-blue-600',
      description: 'Pay using CBE Birr mobile banking'
    },
    {
      id: 'cash',
      name: 'Pay at Terminal',
      icon: '💵',
      color: 'bg-orange-600',
      description: 'Pay cash at bus terminal'
    }
  ];

  const handlePayment = () => {
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      
      // Generate booking ID and save to localStorage
      const bookingId = 'ETH' + Date.now();
      const completedBooking = {
        ...bookingData,
        bookingId,
        paymentMethod,
        paymentDate: new Date().toISOString(),
        status: 'confirmed'
      };
      
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      bookings.push(completedBooking);
      localStorage.setItem('bookings', JSON.stringify(bookings));
      
      toast.success('Payment successful!');
      
      // Navigate to ticket after success
      setTimeout(() => {
        navigate(`/ticket/${bookingId}`, { state: { booking: completedBooking } });
      }, 2000);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
          <p className="text-gray-600 mt-2">Choose your preferred payment method</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Amount Summary */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="text-3xl font-bold text-blue-600">
                    {bookingData?.totalAmount + 50} ETB
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <motion.div
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`
                        border-2 rounded-lg p-4 cursor-pointer transition-all duration-300
                        ${paymentMethod === method.id 
                          ? 'border-blue-600 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 ${method.color} rounded-full flex items-center justify-center text-2xl text-white`}>
                            {method.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{method.name}</h3>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                        {paymentMethod === method.id && (
                          <FaCheckCircle className="text-2xl text-green-600" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Payment Simulation */}
              {paymentMethod === 'telebirr' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <h3 className="font-bold mb-4">Telebirr Payment</h3>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 mb-2">Scan QR code with Telebirr app</p>
                    <div className="w-48 h-48 mx-auto bg-gray-200 flex items-center justify-center rounded-lg">
                      <FaQrcode className="text-8xl text-gray-600" />
                    </div>
                    <p className="text-sm text-gray-500 mt-4">Or dial *127# and follow instructions</p>
                  </div>
                </motion.div>
              )}

              {paymentMethod === 'cbe' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <h3 className="font-bold mb-4">CBE Birr Payment</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-gray-50 rounded">
                      <span>Merchant:</span>
                      <span className="font-bold">EthioBus</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded">
                      <span>Amount:</span>
                      <span className="font-bold">{bookingData?.totalAmount + 50} ETB</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded text-center">
                      <p className="text-sm text-gray-600">Send payment to *123# and enter code 456789</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {paymentMethod === 'cash' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <h3 className="font-bold mb-4">Cash Payment</h3>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 mb-2">Pay at any EthioBus terminal</p>
                    <p className="text-sm text-gray-500">Present this booking ID: {bookingData?.id}</p>
                  </div>
                </motion.div>
              )}

              {/* Pay Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePayment}
                disabled={!paymentMethod || processing}
                className="w-full btn-primary py-4 text-lg flex items-center justify-center space-x-2"
              >
                {processing ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <FaMoneyBillWave />
                    <span>Pay Now</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-lg p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <FaCheckCircle className="text-5xl text-green-600" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Payment Successful!
              </h2>
              <p className="text-gray-600 mb-8">
                Your booking has been confirmed. Redirecting to your ticket...
              </p>
              <div className="flex justify-center">
                <FaSpinner className="animate-spin text-3xl text-blue-600" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Payment;