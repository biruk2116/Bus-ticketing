import React from 'react'
import { motion } from 'framer-motion'
import { Navigate, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Bus,
  CheckCircle2,
  CircleDot,
  Info,
  Sparkles,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import PageShell from './ui/PageShell'
import Panel from './ui/Panel'
import Button from './ui/Button'
import StatusBadge from './ui/StatusBadge'
import { bodyClass, cn, mutedClass } from '../lib/ui'

const legend = [
  { label: 'Available', className: 'bg-white ring-1 ring-slate-200 dark:bg-white/10 dark:ring-0' },
  { label: 'Selected', className: 'bg-[linear-gradient(135deg,#0ea5e9,#4f46e5)]' },
  { label: 'Booked', className: 'bg-slate-300 dark:bg-slate-700' },
]

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

  const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0)

  return (
    <PageShell>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel className="overflow-hidden">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500 dark:text-sky-300">Seat Selection</p>
              <h1 className="mt-3 font-display text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">
                Choose your seats with a realistic cabin layout
              </h1>
              <p className={cn('mt-3 max-w-2xl text-sm leading-7 sm:text-base', bodyClass)}>
                {selectedBus.company} from {selectedBus.from} to {selectedBus.to}, departing at {selectedBus.departure}.
              </p>
            </div>
            <Button variant="secondary" icon={ArrowLeft} onClick={() => navigate('/buses')}>
              Back to buses
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {legend.map((item) => (
              <div key={item.label} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                <span className={cn('h-4 w-4 rounded-md', item.className)} />
                {item.label}
              </div>
            ))}
            <StatusBadge variant="default">
              <Info className="mr-1 h-3.5 w-3.5" />
              Select exactly {searchCriteria.passengers}
            </StatusBadge>
          </div>

          <div className="mt-8 rounded-[2rem] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(248,250,252,0.95),rgba(241,245,249,0.9))] p-5 shadow-inner dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.85),rgba(15,23,42,0.72))] sm:p-6">
            <div className="mx-auto mb-6 flex max-w-lg items-center justify-between rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <span className="flex items-center gap-2 font-medium">
                <CircleDot className="h-4 w-4 text-sky-500" />
                Driver area
              </span>
              <span>Front exit</span>
            </div>

            <div className="mx-auto grid max-w-lg grid-cols-4 gap-3 sm:gap-4">
              {seatLayout.map((seat, index) => {
                const active = selectedSeats.some((entry) => entry.id === seat.id)

                return (
                  <motion.button
                    key={seat.id}
                    whileHover={{ scale: seat.isBooked ? 1 : 1.04, y: seat.isBooked ? 0 : -2 }}
                    whileTap={{ scale: seat.isBooked ? 1 : 0.96 }}
                    type="button"
                    onClick={() => toggleSeat(seat)}
                    aria-pressed={active}
                    aria-label={`Seat ${seat.number}${seat.isBooked ? ' booked' : active ? ' selected' : ' available'}`}
                    className={cn(
                      'relative h-16 rounded-[1.35rem] text-sm font-semibold transition sm:h-[4.5rem]',
                      index % 4 === 1 ? 'mr-5 sm:mr-8' : '',
                      seat.isBooked
                        ? 'cursor-not-allowed bg-slate-300 text-slate-500 dark:bg-slate-700 dark:text-slate-500'
                        : active
                        ? 'bg-[linear-gradient(135deg,#0ea5e9,#2563eb_45%,#4f46e5)] text-white shadow-[0_20px_35px_rgba(37,99,235,0.28)]'
                        : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-sky-300 dark:bg-white/8 dark:text-slate-100 dark:ring-white/10 dark:hover:bg-white/12',
                    )}
                  >
                    <div className="flex h-full flex-col items-center justify-center">
                      <span className="text-[11px] uppercase tracking-[0.18em] opacity-70">Seat</span>
                      <span className="mt-1 text-base">{seat.number}</span>
                    </div>
                    {active ? (
                      <CheckCircle2 className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-white text-emerald-500" />
                    ) : null}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel variant="muted">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-sky-500/10 p-3 text-sky-600 dark:text-sky-300">
                <Bus className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-xl font-bold text-slate-950 dark:text-white">Trip summary</p>
                <p className={cn('text-sm', mutedClass)}>{selectedBus.routeCode}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {[
                ['Route', `${selectedBus.from} to ${selectedBus.to}`],
                ['Schedule', `${selectedBus.departure} - ${selectedBus.arrival}`],
                ['Seat price', `ETB ${selectedBus.price}`],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-[1.25rem] border border-slate-200/70 bg-white/85 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5">
                  <span className={bodyClass}>{label}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{value}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="bg-[linear-gradient(160deg,rgba(14,165,233,0.10),rgba(79,70,229,0.10),rgba(255,255,255,0.86))] dark:bg-[linear-gradient(160deg,rgba(14,165,233,0.08),rgba(79,70,229,0.14),rgba(15,23,42,0.74))]">
            <div className="flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-300">
              <Sparkles className="h-4 w-4" />
              Selected seats
            </div>

            <div className="mt-5 flex min-h-[3rem] flex-wrap gap-2">
              {selectedSeats.length > 0 ? (
                selectedSeats.map((seat) => (
                  <span
                    key={seat.id}
                    className="rounded-full bg-slate-950 px-3 py-1.5 text-sm font-medium text-white dark:bg-white dark:text-slate-950"
                  >
                    {seat.number}
                  </span>
                ))
              ) : (
                <p className={cn('text-sm', bodyClass)}>No seats selected yet.</p>
              )}
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className={bodyClass}>Seats selected</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {selectedSeats.length}/{searchCriteria.passengers}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={bodyClass}>Current total</span>
                <span className="font-display text-2xl font-bold text-slate-950 dark:text-white">ETB {total}</span>
              </div>
            </div>

            <Button
              className="mt-6 w-full"
              size="lg"
              onClick={() => {
                if (selectedSeats.length !== searchCriteria.passengers) {
                  toast.error(`Please select exactly ${searchCriteria.passengers} seat(s)`)
                  return
                }
                navigate('/summary')
              }}
            >
              Continue to Summary
            </Button>
          </Panel>
        </div>
      </div>
    </PageShell>
  )
}

export default SeatSelection
