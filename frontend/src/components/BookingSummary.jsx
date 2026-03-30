import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Bus, Mail, Phone, ShieldCheck, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const BookingSummary = () => {
  const navigate = useNavigate()
  const { selectedBus, selectedSeats, updatePassenger, passengerDetails } = useAuth()
  const [formData, setFormData] = useState(passengerDetails)

  if (!selectedBus || selectedSeats.length === 0) {
    return <Navigate to="/buses" replace />
  }

  const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0)
  const serviceFee = 65
  const totalAmount = subtotal + serviceFee

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
    <div className="min-h-screen bg-slate-950 px-4 pb-20 pt-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl sm:p-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Passenger details</p>
            <h1 className="mt-3 text-3xl font-black text-white">Review and confirm the booking</h1>

            <form onSubmit={handleContinue} className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="passenger-name" className="mb-2 block text-sm font-medium text-slate-300">Full Name</label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-300" />
                  <input
                    id="passenger-name"
                    type="text"
                    value={formData.name}
                    onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/60 pl-11 pr-4 text-slate-100 outline-none transition focus:border-sky-400"
                    placeholder="Biruk Tadesse"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="passenger-phone" className="mb-2 block text-sm font-medium text-slate-300">Phone</label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-300" />
                  <input
                    id="passenger-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/60 pl-11 pr-4 text-slate-100 outline-none transition focus:border-emerald-400"
                    placeholder="+251911223344"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="passenger-email" className="mb-2 block text-sm font-medium text-slate-300">Email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-300" />
                  <input
                    id="passenger-email"
                    type="email"
                    value={formData.email}
                    onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/60 pl-11 pr-4 text-slate-100 outline-none transition focus:border-indigo-400"
                    placeholder="biruk@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="passenger-emergency" className="mb-2 block text-sm font-medium text-slate-300">Emergency Contact</label>
                <div className="relative">
                  <ShieldCheck className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fuchsia-300" />
                  <input
                    id="passenger-emergency"
                    type="tel"
                    value={formData.emergencyContact}
                    onChange={(event) => setFormData((current) => ({ ...current, emergencyContact: event.target.value }))}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/60 pl-11 pr-4 text-slate-100 outline-none transition focus:border-fuchsia-400"
                    placeholder="+251988112233"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 px-6 py-4 text-sm font-semibold text-white"
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
            className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl sm:p-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Trip summary</p>
            <h2 className="mt-3 text-3xl font-black text-white">Final review</h2>

            <div className="mt-6 space-y-4">
              <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-sky-400/10 p-3 text-sky-300">
                    <Bus className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">{selectedBus.company}</p>
                    <p className="text-sm text-slate-400">{selectedBus.type}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Route</p>
                    <p className="mt-1 text-slate-200">{selectedBus.from} → {selectedBus.to}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Time</p>
                    <p className="mt-1 text-slate-200">{selectedBus.departure} - {selectedBus.arrival}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
                <p className="text-sm text-slate-400">Selected seats</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedSeats.map((seat) => (
                    <span key={seat.id} className="rounded-full bg-sky-400/10 px-3 py-1 text-sm text-sky-300">
                      {seat.number}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
                <div className="flex justify-between text-sm text-slate-300">
                  <span>Ticket subtotal</span>
                  <span>ETB {subtotal}</span>
                </div>
                <div className="mt-3 flex justify-between text-sm text-slate-300">
                  <span>Service fee</span>
                  <span>ETB {serviceFee}</span>
                </div>
                <div className="mt-4 border-t border-white/10 pt-4">
                  <div className="flex justify-between text-lg font-bold text-white">
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
