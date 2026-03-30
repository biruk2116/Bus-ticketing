// frontend/src/components/TicketView.jsx
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBus, FaDownload, FaPrint, FaQrcode, FaUser, FaPhone, FaCalendar } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import toast from 'react-hot-toast';

const TicketView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};
  const ticketRef = useRef();

  const downloadPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Add Ethiopian flag colors
      doc.setFillColor(30, 181, 58); // Green
      doc.rect(0, 0, 210, 10, 'F');
      doc.setFillColor(252, 221, 9); // Yellow
      doc.rect(0, 10, 210, 10, 'F');
      doc.setFillColor(218, 18, 26); // Red
      doc.rect(0, 20, 210, 10, 'F');

      // Title
      doc.setFontSize(24);
      doc.setTextColor(0, 0, 255);
      doc.text('EthioBus', 105, 40, { align: 'center' });
      
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text('E-Ticket', 105, 50, { align: 'center' });

      // Ticket details
      doc.setFontSize(12);
      doc.text(`Booking ID: ${booking?.bookingId}`, 20, 70);
      doc.text(`Passenger: ${booking?.name}`, 20, 80);
      doc.text(`Phone: ${booking?.phone}`, 20, 90);
      doc.text(`Bus Company: ${booking?.bus?.company}`, 20, 100);
      doc.text(`Departure: ${booking?.bus?.departure}`, 20, 110);
      doc.text(`Arrival: ${booking?.bus?.arrival}`, 20, 120);
      doc.text(`Seats: ${booking?.selectedSeats?.map(s => s.number).join(', ')}`, 20, 130);
      doc.text(`Total Amount: ${booking?.totalAmount + 50} ETB`, 20, 140);
      doc.text(`Payment Method: ${booking?.paymentMethod}`, 20, 150);
      doc.text(`Booking Date: ${new Date(booking?.bookingDate).toLocaleString()}`, 20, 160);

      // Add note
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      doc.text('Please present this ticket at the boarding gate.', 105, 280, { align: 'center' });

      doc.save(`EthioBus_Ticket_${booking?.bookingId}.pdf`);
      toast.success('Ticket downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download ticket');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Your E-Ticket</h1>
          <p className="text-gray-600 mt-2">Thank you for choosing EthioBus</p>
        </motion.div>

        {/* Ticket */}
        <motion.div
          ref={ticketRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8"
        >
          {/* Ethiopian flag stripes */}
          <div className="h-2 flex">
            <div className="w-1/3 bg-[#1eb53a]"></div>
            <div className="w-1/3 bg-[#fcdd09]"></div>
            <div className="w-1/3 bg-[#da121a]"></div>
          </div>

          <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-3">
                <FaBus className="text-4xl text-blue-600" />
                <div>
                  <h2 className="text-2xl font-bold text-blue-600">EthioBus</h2>
                  <p className="text-sm text-gray-500">E-Ticket • {booking?.bookingId}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Status</p>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Confirmed
                </span>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 p-4 rounded-xl">
                <QRCodeSVG
                  value={JSON.stringify({
                    id: booking?.bookingId,
                    name: booking?.name,
                    seats: booking?.selectedSeats?.map(s => s.number),
                    bus: booking?.bus?.company
                  })}
                  size={120}
                  level="H"
                />
              </div>
            </div>

            {/* Passenger Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaUser className="text-blue-600" />
                  <span className="text-sm">Passenger</span>
                </div>
                <p className="font-bold text-lg">{booking?.name}</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaPhone className="text-blue-600" />
                  <span className="text-sm">Phone</span>
                </div>
                <p className="font-bold text-lg">{booking?.phone}</p>
              </div>
            </div>

            {/* Trip Details */}
            <div className="border-t border-b py-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Bus Company</p>
                  <p className="font-bold">{booking?.bus?.company}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Selected Seats</p>
                  <div className="flex flex-wrap gap-2">
                    {booking?.selectedSeats?.map((seat) => (
                      <span key={seat.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {seat.number}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Departure</p>
                  <p className="font-bold text-lg">{booking?.bus?.departure}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Arrival</p>
                  <p className="font-bold text-lg">{booking?.bus?.arrival}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-1">Travel Date</p>
                <p className="font-bold">{booking?.bookingDate?.split('T')[0]}</p>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="mb-8">
              <h3 className="font-bold mb-4">Payment Summary</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ticket Price:</span>
                  <span className="font-medium">{booking?.bus?.price} ETB × {booking?.selectedSeats?.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee:</span>
                  <span className="font-medium">50 ETB</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                  <span>Total:</span>
                  <span className="text-blue-600">{booking?.totalAmount + 50} ETB</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Payment Method:</span>
                  <span className="capitalize">{booking?.paymentMethod}</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="text-sm text-gray-500 border-t pt-6">
              <p className="text-center">
                Please arrive at the terminal at least 30 minutes before departure.
                Present this ticket (digital or printed) at the boarding gate.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadPDF}
            className="btn-primary flex items-center space-x-2"
          >
            <FaDownload />
            <span>Download PDF</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.print()}
            className="btn-outline flex items-center space-x-2"
          >
            <FaPrint />
            <span>Print Ticket</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="btn-outline"
          >
            Back to Home
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default TicketView;