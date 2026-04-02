// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { PageShell } from './components/ui/PageShell';
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

function App() {
  return (
    <Router>
      <AuthProvider>
        <PageShell>
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/search" element={<BusList />} />
              <Route 
                path="/booking" 
                element={
                  <ProtectedRoute>
                    <SeatSelection />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/summary" 
                element={
                  <ProtectedRoute>
                    <BookingSummary />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/payment" 
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/ticket" 
                element={
                  <ProtectedRoute>
                    <TicketView />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
          <ScrollToTopButton />
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
                  primary: '#4ade80',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </PageShell>
      </AuthProvider>
    </Router>
  );
}

export default App;