import React from 'react'
import { motion } from 'framer-motion'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Download, Printer, QrCode, Ticket } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import PageShell from './ui/PageShell'
import Panel from './ui/Panel'
import Button from './ui/Button'
import StatusBadge from './ui/StatusBadge'
import { bodyClass, cn, mutedClass } from '../lib/ui'

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
    <PageShell>
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500 dark:text-sky-300">Digital Ticket</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-slate-950 dark:text-white">Trip confirmed and ready to travel</h1>
          <p className={cn('mt-4 text-sm leading-7 sm:text-base', bodyClass)}>
            A cleaner confirmation screen with stronger hierarchy, action buttons, and a printable ticket layout.
          </p>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
          <Panel className="overflow-hidden p-0">
            <div className="h-2 bg-[linear-gradient(90deg,#10b981,#0ea5e9,#4f46e5,#f97316)]" />
            <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-slate-950 p-3 text-white dark:bg-white dark:text-slate-950">
                      <Ticket className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.26em] text-sky-500 dark:text-sky-300">EthioBus ticket</p>
                      <h2 className="mt-2 font-display text-2xl font-bold text-slate-950 dark:text-white">{booking.bookingId}</h2>
                    </div>
                  </div>
                  <StatusBadge variant="success">{booking.status}</StatusBadge>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.75rem] border border-slate-200/70 bg-slate-50/90 p-5 dark:border-white/10 dark:bg-white/5">
                    <p className={cn('text-xs uppercase tracking-[0.22em]', mutedClass)}>Passenger</p>
                    <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{booking.passenger.name}</p>
                    <p className={cn('mt-2 text-sm', bodyClass)}>{booking.passenger.phone}</p>
                    <p className={cn('mt-1 text-sm', mutedClass)}>{booking.passenger.email || 'No email provided'}</p>
                  </div>

                  <div className="rounded-[1.75rem] border border-slate-200/70 bg-slate-50/90 p-5 dark:border-white/10 dark:bg-white/5">
                    <p className={cn('text-xs uppercase tracking-[0.22em]', mutedClass)}>Trip</p>
                    <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{booking.bus.from} to {booking.bus.to}</p>
                    <p className={cn('mt-2 text-sm', bodyClass)}>{booking.bus.departure} - {booking.bus.arrival}</p>
                    <p className={cn('mt-1 text-sm', mutedClass)}>{booking.bus.company}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {[
                    ['Seats', booking.seats.map((seat) => seat.number).join(', ')],
                    ['Payment', booking.paymentMethod],
                    ['Total', `ETB ${booking.totalAmount}`],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[1.5rem] border border-slate-200/70 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/5">
                      <p className={cn('text-xs uppercase tracking-[0.22em]', mutedClass)}>{label}</p>
                      <p className="mt-3 text-lg font-semibold capitalize text-slate-900 dark:text-white">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button icon={Download} onClick={handleDownload}>Download Ticket</Button>
                  <Button variant="secondary" icon={Printer} onClick={handlePrint}>Print Ticket</Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      resetBookingFlow()
                      navigate('/')
                    }}
                  >
                    Back Home
                  </Button>
                </div>
              </div>

              <div className="border-t border-slate-200/70 bg-[linear-gradient(160deg,rgba(14,165,233,0.08),rgba(79,70,229,0.08),rgba(255,255,255,0.9))] p-6 dark:border-white/10 dark:bg-[linear-gradient(160deg,rgba(14,165,233,0.08),rgba(79,70,229,0.14),rgba(15,23,42,0.76))] sm:p-8 lg:border-l lg:border-t-0">
                <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/85 p-6 text-center dark:border-white/15 dark:bg-white/5">
                  <QrCode className="mx-auto h-24 w-24 text-sky-500" />
                  <p className="mt-4 font-display text-xl font-bold text-slate-950 dark:text-white">Boarding code</p>
                  <p className={cn('mt-2 text-sm leading-6', bodyClass)}>
                    A simulated QR boarding area for the frontend ticketing experience.
                  </p>
                </div>

                <div className="mt-6 rounded-[1.75rem] border border-white/40 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5">
                  <p className={cn('text-xs uppercase tracking-[0.22em]', mutedClass)}>Boarding note</p>
                  <p className={cn('mt-3 text-sm leading-7', bodyClass)}>
                    Arrive at least 30 minutes before departure and keep this digital ticket available for validation.
                  </p>
                </div>
              </div>
            </div>
          </Panel>
        </motion.div>
      </div>
    </PageShell>
  )
}

export default TicketView
