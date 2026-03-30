import React from 'react'
import { motion } from 'framer-motion'
import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowLeft, Bus, CheckCircle2, Info } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const SeatSelection = () => {
  const navigate = useNavigate()
  const { searchCriteria, selectedBus, seatLayout, selectedSeats, updateSelectedSeats, darkMode } = useAuth()

  if (!selectedBus) {
    return <Navigate to="/buses" replace />
  }

  const surfaceClass = darkMode
    ? 'border-white/10 bg-white/5'
    : 'border-slate-200/80 bg-white/90 shadow-[0_18px_60px_rgba(148,163,184,0.16)]'
  const nestedClass = darkMode
    ? 'border-white/10 bg-slate-950/55'
    : 'border-slate-200 bg-slate-50'
  const textSubtle = darkMode ? 'text-slate-300' : 'text-slate-600'
  const textMuted = darkMode ? 'text-slate-400' : 'text-slate-500'

  const toggleSeat = (seat) => {
    if (seat.isBooked) {
      toast.error('That seat is already booked')
      return
    }

    const alreadySelected = selectedSeats.some((entry) => entry.id === seat.id)

    if (alreadySelected) {
      updateSelectedSeats(selectedSeats.filter((entry) => entry.id !== seat.id))
      return
    }

    if (selectedSeats.length >= searchCriteria.passengers) {
      toast.error(`Select only ${searchCriteria.passengers} seat(s)`)
      return
    }

    updateSelectedSeats([
      ...selectedSeats,
      {
        ...seat,
        price: selectedBus.price,
      },
    ])
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 pb-20 pt-8 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-[32px] border p-6 backdrop-blur-2xl sm:p-8 ${surfaceClass}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Seat map</p>
                <h1 className={`mt-3 text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>{selectedBus.company}</h1>
                <p className={`mt-2 ${textSubtle}`}>
                  {selectedBus.from} {'->'} {selectedBus.to} · {selectedBus.departure} - {selectedBus.arrival}
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate('/buses')}
                className={`rounded-2xl border px-5 py-3 text-sm font-medium ${
                  darkMode
                    ? 'border-white/10 bg-white/5 text-slate-200'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to buses
                </span>
              </button>
            </div>

            <div className={`mt-8 flex flex-wrap items-center gap-5 text-sm ${textSubtle}`}>
              <span className="flex items-center gap-2"><span className="h-4 w-4 rounded bg-slate-700" /> Booked</span>
              <span className="flex items-center gap-2"><span className={`h-4 w-4 rounded ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`} /> Available</span>
              <span className="flex items-center gap-2"><span className="h-4 w-4 rounded bg-gradient-to-r from-sky-500 to-indigo-500" /> Selected</span>
              <span className="flex items-center gap-2"><Info className="h-4 w-4 text-sky-400" /> Select {searchCriteria.passengers} seat(s)</span>
            </div>

            <div className={`mt-8 rounded-[28px] border p-6 ${nestedClass}`}>
              <div className="mb-8 flex justify-center">
                <div className={`flex items-center gap-3 rounded-full border px-5 py-2 text-sm ${darkMode ? 'border-white/10 bg-white/5 text-slate-300' : 'border-slate-200 bg-white text-slate-600'}`}>
                  <Bus className="h-4 w-4 text-sky-400" />
                  Driver area
                </div>
              </div>

              <div className="mx-auto grid max-w-md grid-cols-4 gap-3">
                {seatLayout.map((seat, index) => {
                  const active = selectedSeats.some((entry) => entry.id === seat.id)

                  return (
                    <motion.button
                      key={seat.id}
                      whileHover={{ scale: seat.isBooked ? 1 : 1.05 }}
                      whileTap={{ scale: seat.isBooked ? 1 : 0.97 }}
                      type="button"
                      onClick={() => toggleSeat(seat)}
                      className={`relative rounded-2xl px-3 py-4 text-sm font-semibold transition ${
                        seat.isBooked
                          ? 'cursor-not-allowed bg-slate-700 text-slate-500'
                          : active
                          ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-[0_12px_24px_rgba(59,130,246,0.22)]'
                          : darkMode
                          ? 'bg-white/10 text-slate-100 hover:bg-white/15'
                          : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50'
                      } ${index % 4 === 1 ? 'mr-4' : ''}`}
                    >
                      {seat.number}
                      {active && <CheckCircle2 className={`absolute -right-1 -top-1 h-4 w-4 rounded-full ${darkMode ? 'bg-slate-950 text-emerald-300' : 'bg-white text-emerald-500'}`} />}
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className={`rounded-[32px] border p-6 backdrop-blur-2xl sm:p-8 ${surfaceClass}`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Selection summary</p>
            <h2 className={`mt-3 text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>Your seats</h2>

            <div className="mt-6 space-y-4">
              <div className={`rounded-3xl border p-5 ${nestedClass}`}>
                <p className={`text-sm ${textMuted}`}>Chosen seats</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedSeats.length > 0 ? (
                    selectedSeats.map((seat) => (
                      <span key={seat.id} className="rounded-full bg-sky-400/10 px-3 py-1 text-sm text-sky-400">
                        {seat.number}
                      </span>
                    ))
                  ) : (
                    <span className={`text-sm ${textMuted}`}>No seats selected yet</span>
                  )}
                </div>
              </div>

              <div className={`rounded-3xl border p-5 ${nestedClass}`}>
                <div className={`flex justify-between text-sm ${textMuted}`}>
                  <span>Trip</span>
                  <span>{selectedBus.routeCode}</span>
                </div>
                <div className={`mt-3 flex justify-between text-sm ${textSubtle}`}>
                  <span>Seats selected</span>
                  <span>{selectedSeats.length}/{searchCriteria.passengers}</span>
                </div>
                <div className={`mt-3 flex justify-between text-sm ${textSubtle}`}>
                  <span>Seat price</span>
                  <span>ETB {selectedBus.price}</span>
                </div>
                <div className={`mt-5 border-t pt-4 ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
                  <div className={`flex justify-between text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-950'}`}>
                    <span>Total</span>
                    <span>ETB {selectedSeats.reduce((sum, seat) => sum + seat.price, 0)}</span>
                  </div>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => {
                if (selectedSeats.length !== searchCriteria.passengers) {
                  toast.error(`Please select exactly ${searchCriteria.passengers} seat(s)`)
                  return
                }
                navigate('/summary')
              }}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-4 text-sm font-semibold text-white"
            >
              Continue to Summary
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SeatSelection
