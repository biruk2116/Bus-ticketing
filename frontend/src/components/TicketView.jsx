// src/components/TicketView.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Printer, Home, Bus, Calendar, Clock, MapPin, User, QrCode } from 'lucide-react';
import { Button } from './ui/Button';
import { Panel } from './ui/Panel';
import { StatusBadge } from './ui/StatusBadge';
import { formatDate, formatTime, formatPrice } from '../lib/ui';

export const TicketView = () => {
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('ticketData');
    if (data) {
      setTicket(JSON.parse(data));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleDownload = () => {
    // Simulate download
    alert('Ticket downloaded!');
  };

  const handlePrint = () => {
    window.print();
  };

  if (!ticket) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 dark:text-gray-400">Your ticket has been issued successfully</p>
        </div>

        <Panel className="print:p-0">
          <div className="p-6">
            {/* Ticket Header */}
            <div className="flex justify-between items-start mb-6 pb-4 border-b">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Bus className="w-8 h-8 text-blue-600" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    BusTicketing
                  </span>
                </div>
                <p className="text-sm text-gray-500">E-Ticket</p>
              </div>
              <StatusBadge status="confirmed" />
            </div>

            {/* QR Code Placeholder */}
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <QrCode className="w-20 h-20 text-gray-400" />
              </div>
            </div>

            {/* Ticket Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-3 text-lg">Passenger Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{ticket.passengerName}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Ticket ID: {ticket.paymentId}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-lg">Journey Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Bus className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-semibold">{ticket.bus.name}</span>
                    <span className="ml-2 text-sm px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                      {ticket.bus.type}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{ticket.bus.from} → {ticket.bus.to}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{formatDate(ticket.bookingDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Departure: {formatTime(ticket.bus.departure)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Seats and Price */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Seat Numbers</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {ticket.selectedSeats.join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Paid</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatPrice(ticket.totalPrice)}
                  </p>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="text-sm text-gray-500 border-t pt-4">
              <p className="font-semibold mb-2">Important Information:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Please arrive at the boarding point 30 minutes before departure</li>
                <li>Carry a valid ID proof for verification</li>
                <li>Show this e-ticket (digital or print) at the time of boarding</li>
                <li>This ticket is non-transferable</li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t p-6 flex justify-center space-x-4 print:hidden">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button onClick={() => navigate('/')}>
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </Panel>
      </motion.div>
    </div>
  );
};