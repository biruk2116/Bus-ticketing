import React from 'react'
import { motion } from 'framer-motion'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Download, Printer, QrCode, Ticket } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const TicketView = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentBooking, resetBookingFlow, darkMode } = useAuth()
  const booking = location.state?.booking || currentBooking

  if (!booking) {
    return <Navigate to="/" replace />
  }

  const surfaceClass = darkMode
    ? 'border-white/10 bg-white/5'
    : 'border-slate-200/80 bg-white/90 shadow-[0_24px_80px_rgba(148,163,184,0.18)]'
  const nestedClass = darkMode
    ? 'border-white/10 bg-slate-950/55'
    : 'border-slate-200 bg-slate-50'
  const textSubtle = darkMode ? 'text-slate-300' : 'text-slate-600'
  const textMuted = darkMode ? 'text-slate-400' : 'text-slate-500'

  const handleDownload = () => {
    toast.success('Ticket download simulated')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 pb-20 pt-8 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Your Ticket</p>
          <h1 className={`mt-3 text-4xl font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>Trip confirmed and ready</h1>
          <p className={`mt-4 ${textSubtle}`}>A cleaner ticket surface with stronger contrast, print actions, and boarding details.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`overflow-hidden rounded-[36px] border backdrop-blur-2xl ${surfaceClass}`}
        >
          <div className="h-2 bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-500" />

          <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_220px]">
            <div className="p-8 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 p-3 text-white">
                    <Ticket className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.26em] text-sky-300">EthioBus Ticket</p>
                    <h2 className={`mt-2 text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-950'}`}>{booking.bookingId}</h2>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-400">
                  {booking.status}
                </span>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className={`rounded-3xl border p-5 ${nestedClass}`}>
                  <p className={`text-xs uppercase tracking-[0.24em] ${textMuted}`}>Passenger</p>
                  <p className={`mt-3 text-xl font-semibold ${darkMode ? 'text-white' : 'text-slate-950'}`}>{booking.passenger.name}</p>
                  <p className={`mt-2 text-sm ${textSubtle}`}>{booking.passenger.phone}</p>
                  <p className={`mt-1 text-sm ${textMuted}`}>{booking.passenger.email || 'No email provided'}</p>
                </div>

                <div className={`rounded-3xl border p-5 ${nestedClass}`}>
                  <p className={`text-xs uppercase tracking-[0.24em] ${textMuted}`}>Trip</p>
                  <p className={`mt-3 text-xl font-semibold ${darkMode ? 'text-white' : 'text-slate-950'}`}>{booking.bus.from} {'->'} {booking.bus.to}</p>
                  <p className={`mt-2 text-sm ${textSubtle}`}>{booking.bus.departure} - {booking.bus.arrival} · {booking.bus.duration}</p>
                  <p className={`mt-1 text-sm ${textMuted}`}>{booking.bus.company}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                {[
                  ['Seats', booking.seats.map((seat) => seat.number).join(', ')],
                  ['Payment', booking.paymentMethod],
                  ['Total', `ETB ${booking.totalAmount}`],
                ].map(([label, value]) => (
                  <div key={label} className={`rounded-3xl border p-5 ${nestedClass}`}>
                    <p className={`text-xs uppercase tracking-[0.24em] ${textMuted}`}>{label}</p>
                    <p className={`mt-3 text-lg font-semibold capitalize ${darkMode ? 'text-white' : 'text-slate-950'}`}>{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white"
                >
                  <Download className="h-4 w-4" />
                  Download Ticket
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handlePrint}
                  className={`inline-flex items-center gap-2 rounded-2xl border px-6 py-3 text-sm font-semibold ${
                    darkMode
                      ? 'border-white/10 bg-white/5 text-slate-100'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  <Printer className="h-4 w-4" />
                  Print Ticket
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => {
                    resetBookingFlow()
                    navigate('/')
                  }}
                  className={`inline-flex items-center gap-2 rounded-2xl border px-6 py-3 text-sm font-semibold ${
                    darkMode
                      ? 'border-white/10 bg-white/5 text-slate-100'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  Back Home
                </motion.button>
              </div>
            </div>

            <div className={`border-l p-8 ${darkMode ? 'border-white/10 bg-slate-950/50' : 'border-slate-200 bg-slate-50/80'}`}>
              <div className={`rounded-[28px] border border-dashed p-6 text-center ${darkMode ? 'border-white/15 bg-white/5' : 'border-slate-300 bg-white'}`}>
                <QrCode className="mx-auto h-20 w-20 text-sky-400" />
                <p className={`mt-4 text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-950'}`}>QR-style ticket area</p>
                <p className={`mt-2 text-xs leading-6 ${textMuted}`}>
                  This is a UI-only boarding code section for the frontend simulation.
                </p>
              </div>

              <div className={`mt-6 rounded-[28px] border p-5 ${nestedClass}`}>
                <p className={`text-xs uppercase tracking-[0.24em] ${textMuted}`}>Boarding note</p>
                <p className={`mt-3 text-sm leading-7 ${textSubtle}`}>
                  Arrive at least 30 minutes early and keep this ticket available on your phone for boarding validation.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TicketView
