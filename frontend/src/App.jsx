// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Contacts from './components/Contacts';
import Services from './components/Services';
import BusSearch from './components/BusSearch';
import BusList from './components/BusList';
import SeatSelection from './components/SeatSelection';
import BookingSummary from './components/BookingSummary';
import Payment from './components/Payment';
import TicketView from './components/TicketView';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/services" element={<Services />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/search" element={<BusSearch />} />
              <Route path="/buses" element={<BusList />} />
              <Route path="/seat-selection/:busId" element={<SeatSelection />} />
              <Route path="/booking-summary" element={<BookingSummary />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/ticket/:bookingId" element={<TicketView />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Routes>
          </div>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#1eb53a',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;