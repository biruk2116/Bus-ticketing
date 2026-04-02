// src/components/Payment.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Building, Lock, CheckCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Panel } from './ui/Panel';
import { Field } from './ui/Field';
import { formatPrice } from '../lib/ui';
import toast from 'react-hot-toast';

export const Payment = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  React.useEffect(() => {
    const data = localStorage.getItem('bookingData');
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handlePayment = async () => {
    setProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate payment success
    const paymentSuccess = true;
    
    if (paymentSuccess) {
      const ticketData = {
        ...bookingData,
        paymentId: 'TXN_' + Math.random().toString(36).substr(2, 9),
        bookingDate: new Date().toISOString(),
        passengerName: cardDetails.name || 'Guest User',
      };
      localStorage.setItem('ticketData', JSON.stringify(ticketData));
      toast.success('Payment successful!');
      navigate('/ticket');
    } else {
      toast.error('Payment failed. Please try again.');
    }
    setProcessing(false);
  };

  if (!bookingData) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-center mb-8">Complete Your Payment</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Panel>
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <CreditCard className="w-6 h-6 mr-3" />
                    <div>
                      <div className="font-semibold">Credit / Debit Card</div>
                      <div className="text-sm text-gray-500">Pay with Visa, Mastercard, etc.</div>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => setPaymentMethod('mobile')}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === 'mobile' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <Smartphone className="w-6 h-6 mr-3" />
                    <div>
                      <div className="font-semibold">Mobile Money</div>
                      <div className="text-sm text-gray-500">Pay with Telebirr, CBE Birr</div>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => setPaymentMethod('bank')}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === 'bank' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <Building className="w-6 h-6 mr-3" />
                    <div>
                      <div className="font-semibold">Bank Transfer</div>
                      <div className="text-sm text-gray-500">Direct bank transfer</div>
                    </div>
                  </div>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <Field
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Field
                      label="Expiry Date"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    />
                    <Field
                      label="CVV"
                      placeholder="123"
                      type="password"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    />
                  </div>
                  <Field
                    label="Cardholder Name"
                    placeholder="Name on card"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                  />
                </div>
              )}

              {paymentMethod === 'mobile' && (
                <div className="space-y-4">
                  <Field
                    label="Mobile Number"
                    placeholder="0912345678"
                    icon={Smartphone}
                  />
                  <Field
                    label="Provider"
                    placeholder="Select provider"
                  />
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm mb-2">Bank: Commercial Bank of Ethiopia</p>
                  <p className="text-sm mb-2">Account: 1000 1234 5678</p>
                  <p className="text-sm">Reference: Use your booking ID</p>
                </div>
              )}
            </Panel>

            <Panel>
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bus</span>
                  <span className="font-semibold">{bookingData.bus.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Route</span>
                  <span>{bookingData.bus.from} → {bookingData.bus.to}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seats</span>
                  <span>{bookingData.selectedSeats.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ticket Price</span>
                  <span>{formatPrice(bookingData.bus.price)} x {bookingData.selectedSeats.length}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total Amount</span>
                    <span className="text-blue-600">{formatPrice(bookingData.totalPrice)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                <Lock className="w-5 h-5 text-yellow-600" />
                <span className="text-sm text-yellow-800 dark:text-yellow-200">
                  Secure payment encrypted
                </span>
              </div>

              <Button 
                className="w-full" 
                onClick={handlePayment}
                disabled={processing}
              >
                {processing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Pay ${formatPrice(bookingData.totalPrice)}`
                )}
              </Button>
            </Panel>
          </div>
        </motion.div>
      </div>
    </div>
  );
};