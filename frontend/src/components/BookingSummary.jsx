import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Bus, Mail, Phone, ShieldCheck, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const BookingSummary = () => {
  const navigate = useNavigate()
  const { selectedBus, selectedSeats, updatePassenger, passengerDetails, darkMode } = useAuth()
  const [formData, setFormData] = useState(passengerDetails)

  if (!selectedBus || selectedSeats.length === 0) {
    return <Navigate to="/buses" replace />
  }

  const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0)
  const serviceFee = 65
  const totalAmount = subtotal + serviceFee

  const surfaceClass = darkMode
    ? 'border-white/10 bg-white/5'
    : 'border-slate-200/80 bg-white/90 shadow-[0_18px_60px_rgba(148,163,184,0.16)]'
  const nestedClass = darkMode
    ? 'border-white/10 bg-slate-950/55'
    : 'border-slate-200 bg-slate-50'
  const inputClass = darkMode
    ? 'border-white/10 bg-slate-950/60 text-slate-100'
    : 'border-slate-200 bg-slate-50 text-slate-900'
  const textSubtle = darkMode ? 'text-slate-300' : 'text-slate-600'
  const textMuted = darkMode ? 'text-slate-400' : 'text-slate-500'

  const handleContinue = (event) => {
    event.preventDefault()

    if (!formData.name || !formData.phone) {
      toast.error('Name and phone are required')
      return
    }

    updatePassenger(formData)
    navigate('/payment')
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 pb-20 pt-8 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-[32px] border p-6 backdrop-blur-2xl sm:p-8 ${surfaceClass}`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Passenger details</p>
            <h1 className={`mt-3 text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>Review and confirm the booking</h1>

            <form onSubmit={handleContinue} className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              {[
                ['passenger-name', 'name', 'Full Name', User, 'Biruk Tadesse', 'sky'],
                ['passenger-phone', 'phone', 'Phone', Phone, '+251911223344', 'emerald'],
                ['passenger-email', 'email', 'Email', Mail, 'biruk@example.com', 'indigo'],
                ['passenger-emergency', 'emergencyContact', 'Emergency Contact', ShieldCheck, '+251988112233', 'fuchsia'],
              ].map(([id, key, label, Icon, placeholder, tone]) => (
                <div key={id}>
                  <label htmlFor={id} className={`mb-2 block text-sm font-medium ${textSubtle}`}>{label}</label>
                  <div className="relative">
                    <Icon className={`pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 ${
                      tone === 'emerald' ? 'text-emerald-400' : tone === 'indigo' ? 'text-indigo-400' : tone === 'fuchsia' ? 'text-fuchsia-400' : 'text-sky-400'
                    }`} />
                    <input
                      id={id}
                      type={key.includes('email') ? 'email' : 'text'}
                      value={formData[key]}
                      onChange={(event) => setFormData((current) => ({ ...current, [key]: event.target.value }))}
                      className={`h-14 w-full rounded-2xl border pl-11 pr-4 outline-none transition focus:border-sky-400 ${inputClass}`}
                      placeholder={placeholder}
                    />
                  </div>
                </div>
              ))}

              <div className="md:col-span-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-4 text-sm font-semibold text-white"
                >
                  Continue to Payment
                </motion.button>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className={`rounded-[32px] border p-6 backdrop-blur-2xl sm:p-8 ${surfaceClass}`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Trip summary</p>
            <h2 className={`mt-3 text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>Final review</h2>

            <div className="mt-6 space-y-4">
              <div className={`rounded-3xl border p-5 ${nestedClass}`}>
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-sky-400/10 p-3 text-sky-400">
                    <Bus className="h-5 w-5" />
                  </div>
                  <div>
                    <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-950'}`}>{selectedBus.company}</p>
                    <p className={`text-sm ${textMuted}`}>{selectedBus.type}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className={textMuted}>Route</p>
                    <p className={`mt-1 ${textSubtle}`}>{selectedBus.from} {'->'} {selectedBus.to}</p>
                  </div>
                  <div>
                    <p className={textMuted}>Time</p>
                    <p className={`mt-1 ${textSubtle}`}>{selectedBus.departure} - {selectedBus.arrival}</p>
                  </div>
                </div>
              </div>

              <div className={`rounded-3xl border p-5 ${nestedClass}`}>
                <p className={`text-sm ${textMuted}`}>Selected seats</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedSeats.map((seat) => (
                    <span key={seat.id} className="rounded-full bg-sky-400/10 px-3 py-1 text-sm text-sky-400">
                      {seat.number}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`rounded-3xl border p-5 ${nestedClass}`}>
                <div className={`flex justify-between text-sm ${textSubtle}`}>
                  <span>Ticket subtotal</span>
                  <span>ETB {subtotal}</span>
                </div>
                <div className={`mt-3 flex justify-between text-sm ${textSubtle}`}>
                  <span>Service fee</span>
                  <span>ETB {serviceFee}</span>
                </div>
                <div className={`mt-4 border-t pt-4 ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
                  <div className={`flex justify-between text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-950'}`}>
                    <span>Total</span>
                    <span>ETB {totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default BookingSummary
