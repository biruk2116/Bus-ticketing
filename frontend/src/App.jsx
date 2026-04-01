import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollToTopButton'
import Home from './components/Home'
import AboutUs from './components/AboutUs'
import Contacts from './components/Contacts'
import Services from './components/Services'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import BusSearch from './components/BusSearch'
import BusList from './components/BusList'
import SeatSelection from './components/SeatSelection'
import BookingSummary from './components/BookingSummary'
import Payment from './components/Payment'
import TicketView from './components/TicketView'
import AdminDashboard from './components/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { appShellClass } from './lib/ui'

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/services" element={<Services />} />
          <Route path="/search" element={<BusSearch />} />
          <Route path="/buses" element={<BusList />} />
          <Route
            path="/seats"
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
      </motion.div>
    </AnimatePresence>
  )
}

const AppLayout = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className={appShellClass}>
      {!isHome ? (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.10),transparent_22%),radial-gradient(circle_at_75%_10%,rgba(99,102,241,0.12),transparent_18%),radial-gradient(circle_at_bottom_left,rgba(244,114,182,0.08),transparent_18%)]" />
      ) : null}
      <Navbar />
      <main className={`relative z-10 ${isHome ? '' : 'pt-24 sm:pt-28'}`}>
        <AnimatedRoutes />
      </main>
      <div className="relative z-10">
        <Footer />
        <ScrollToTopButton />
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: '20px',
            background: 'rgba(15, 23, 42, 0.92)',
            color: '#f8fafc',
            border: '1px solid rgba(148,163,184,0.18)',
            boxShadow: '0 18px 48px rgba(15,23,42,0.28)',
          },
        }}
      />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
