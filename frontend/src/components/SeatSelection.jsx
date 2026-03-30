import React from 'react'
import { motion } from 'framer-motion'
import { Navigate, useNavigate } from 'react-router-dom'
import { ArrowLeft, Bus, CheckCircle2, Info } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const SeatSelection = () => {
  const navigate = useNavigate()
  const { searchCriteria, selectedBus, seatLayout, selectedSeats, updateSelectedSeats } = useAuth()

  if (!selectedBus) {
    return <Navigate to="/buses" replace />
  }

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
    <div className="min-h-screen bg-slate-950 px-4 pb-20 pt-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Seat map</p>
                <h1 className="mt-3 text-3xl font-black text-white">{selectedBus.company}</h1>
                <p className="mt-2 text-slate-300">
                  {selectedBus.from} → {selectedBus.to} · {selectedBus.departure} - {selectedBus.arrival}
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate('/buses')}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200"
              >
                <span className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to buses
                </span>
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-slate-300">
              <span className="flex items-center gap-2"><span className="h-4 w-4 rounded bg-slate-700" /> Booked</span>
              <span className="flex items-center gap-2"><span className="h-4 w-4 rounded bg-white/10" /> Available</span>
              <span className="flex items-center gap-2"><span className="h-4 w-4 rounded bg-gradient-to-r from-sky-400 to-indigo-500" /> Selected</span>
              <span className="flex items-center gap-2"><Info className="h-4 w-4 text-sky-300" /> Select {searchCriteria.passengers} seat(s)</span>
            </div>

            <div className="mt-8 rounded-[28px] border border-white/10 bg-slate-950/55 p-6">
              <div className="mb-8 flex justify-center">
                <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-300">
                  <Bus className="h-4 w-4 text-sky-300" />
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
                          ? 'bg-gradient-to-r from-sky-400 to-indigo-500 text-white'
                          : 'bg-white/10 text-slate-100 hover:bg-white/15'
                      } ${index % 4 === 1 ? 'mr-4' : ''}`}
                    >
                      {seat.number}
                      {active && <CheckCircle2 className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-slate-950 text-emerald-300" />}
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
            className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl sm:p-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Selection summary</p>
            <h2 className="mt-3 text-3xl font-black text-white">Your seats</h2>

            <div className="mt-6 space-y-4">
              <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
                <p className="text-sm text-slate-400">Chosen seats</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedSeats.length > 0 ? (
                    selectedSeats.map((seat) => (
                      <span key={seat.id} className="rounded-full bg-sky-400/10 px-3 py-1 text-sm text-sky-300">
                        {seat.number}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">No seats selected yet</span>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Trip</span>
                  <span>{selectedBus.routeCode}</span>
                </div>
                <div className="mt-3 flex justify-between text-sm text-slate-300">
                  <span>Seats selected</span>
                  <span>{selectedSeats.length}/{searchCriteria.passengers}</span>
                </div>
                <div className="mt-3 flex justify-between text-sm text-slate-300">
                  <span>Seat price</span>
                  <span>ETB {selectedBus.price}</span>
                </div>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <div className="flex justify-between text-lg font-bold text-white">
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
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 px-5 py-4 text-sm font-semibold text-white"
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
