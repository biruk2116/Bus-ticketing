import React from 'react'
import { motion } from 'framer-motion'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Download, Printer, QrCode, Ticket } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const TicketView = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentBooking, resetBookingFlow } = useAuth()
  const booking = location.state?.booking || currentBooking

  if (!booking) {
    return <Navigate to="/" replace />
  }

  const handleDownload = () => {
    toast.success('Ticket download simulated')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 pb-20 pt-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Your Ticket</p>
          <h1 className="mt-3 text-4xl font-black text-white">Trip confirmed and ready</h1>
          <p className="mt-4 text-slate-300">A startup-style ticket view with a clean layout and print/download simulation.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="overflow-hidden rounded-[36px] border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(15,23,42,0.42)] backdrop-blur-2xl"
        >
          <div className="h-2 bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-500" />

          <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_220px]">
            <div className="p-8 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 p-3 text-slate-950">
                    <Ticket className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.26em] text-sky-300">EthioBus Ticket</p>
                    <h2 className="mt-2 text-2xl font-bold text-white">{booking.bookingId}</h2>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">
                  {booking.status}
                </span>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Passenger</p>
                  <p className="mt-3 text-xl font-semibold text-white">{booking.passenger.name}</p>
                  <p className="mt-2 text-sm text-slate-300">{booking.passenger.phone}</p>
                  <p className="mt-1 text-sm text-slate-400">{booking.passenger.email || 'No email provided'}</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Trip</p>
                  <p className="mt-3 text-xl font-semibold text-white">{booking.bus.from} → {booking.bus.to}</p>
                  <p className="mt-2 text-sm text-slate-300">{booking.bus.departure} - {booking.bus.arrival} · {booking.bus.duration}</p>
                  <p className="mt-1 text-sm text-slate-400">{booking.bus.company}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Seats</p>
                  <p className="mt-3 text-lg font-semibold text-white">{booking.seats.map((seat) => seat.number).join(', ')}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Payment</p>
                  <p className="mt-3 text-lg font-semibold capitalize text-white">{booking.paymentMethod}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Total</p>
                  <p className="mt-3 text-lg font-semibold text-white">ETB {booking.totalAmount}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 px-6 py-3 text-sm font-semibold text-white"
                >
                  <Download className="h-4 w-4" />
                  Download Ticket
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100"
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
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100"
                >
                  Back Home
                </motion.button>
              </div>
            </div>

            <div className="border-l border-white/10 bg-slate-950/50 p-8">
              <div className="rounded-[28px] border border-dashed border-white/15 bg-white/5 p-6 text-center">
                <QrCode className="mx-auto h-20 w-20 text-sky-300" />
                <p className="mt-4 text-sm font-medium text-white">QR-style ticket area</p>
                <p className="mt-2 text-xs leading-6 text-slate-400">
                  This is a UI-only boarding code section for the frontend simulation.
                </p>
              </div>

              <div className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Boarding note</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
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
