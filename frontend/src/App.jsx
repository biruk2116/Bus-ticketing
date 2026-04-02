// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { BusList } from './components/BusList';
import { SeatSelection } from './components/SeatSelection';
import { BookingSummary } from './components/BookingSummary';
import { Payment } from './components/Payment';
import { TicketView } from './components/TicketView';
import { AdminDashboard } from './components/AdminDashboard';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/buses" element={<BusList />} />
        <Route path="/seats" element={<ProtectedRoute><SeatSelection /></ProtectedRoute>} />
        <Route path="/summary" element={<ProtectedRoute><BookingSummary /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/ticket" element={<ProtectedRoute><TicketView /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  // Initialize theme on app start
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <main className="pt-16">
          <AnimatedRoutes />
        </main>
        <Footer />
        <ScrollToTopButton />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              borderRadius: '12px',
              border: '1px solid var(--border)',
            },
          }}
        />
      </AuthProvider>
    </Router>
  );
}

export default App;