import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Bus, Mail, Phone, ShieldCheck, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import PageShell from './ui/PageShell'
import Panel from './ui/Panel'
import Button from './ui/Button'
import Field from './ui/Field'
import StatusBadge from './ui/StatusBadge'
import { bodyClass, cn, mutedClass } from '../lib/ui'

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
    <PageShell>
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Panel>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500 dark:text-sky-300">Passenger Details</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">
            Review the booking before payment
          </h1>
          <p className={cn('mt-4 max-w-2xl text-sm leading-7 sm:text-base', bodyClass)}>
            A clearer summary and calmer form layout help passengers confirm identity details with confidence.
          </p>

          <form onSubmit={handleContinue} className="mt-8 grid gap-4 md:grid-cols-2">
            <Field
              label="Full name"
              icon={User}
              value={formData.name}
              onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
            />
            <Field
              label="Phone number"
              icon={Phone}
              value={formData.phone}
              onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
            />
            <Field
              label="Email address"
              type="email"
              icon={Mail}
              value={formData.email}
              onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
            />
            <Field
              label="Emergency contact"
              icon={ShieldCheck}
              value={formData.emergencyContact}
              onChange={(event) => setFormData((current) => ({ ...current, emergencyContact: event.target.value }))}
            />

            <div className="md:col-span-2 rounded-[1.75rem] border border-slate-200/70 bg-slate-50/85 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-sm font-medium text-slate-900 dark:text-white">Passenger tip</p>
              <p className={cn('mt-2 text-sm leading-6', bodyClass)}>
                Make sure your phone number is active so ticket and booking updates remain easy to access.
              </p>
            </div>

            <div className="md:col-span-2">
              <Button type="submit" size="lg" className="w-full">
                Continue to Payment
              </Button>
            </div>
          </form>
        </Panel>

        <div className="space-y-6">
          <Panel variant="muted">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-sky-500/10 p-3 text-sky-600 dark:text-sky-300">
                <Bus className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-xl font-bold text-slate-950 dark:text-white">{selectedBus.company}</p>
                <p className={cn('text-sm', mutedClass)}>{selectedBus.type}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="rounded-[1.5rem] border border-slate-200/70 bg-white/85 p-4 dark:border-white/10 dark:bg-white/5">
                <p className={cn('text-xs uppercase tracking-[0.22em]', mutedClass)}>Route</p>
                <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">{selectedBus.from} to {selectedBus.to}</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200/70 bg-white/85 p-4 dark:border-white/10 dark:bg-white/5">
                <p className={cn('text-xs uppercase tracking-[0.22em]', mutedClass)}>Travel time</p>
                <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                  {selectedBus.departure} - {selectedBus.arrival}
                </p>
              </div>
            </div>
          </Panel>

          <Panel className="bg-[linear-gradient(160deg,rgba(14,165,233,0.10),rgba(79,70,229,0.10),rgba(255,255,255,0.86))] dark:bg-[linear-gradient(160deg,rgba(14,165,233,0.08),rgba(79,70,229,0.14),rgba(15,23,42,0.74))]">
            <div className="flex items-center justify-between">
              <p className="font-display text-2xl font-bold text-slate-950 dark:text-white">Final review</p>
              <StatusBadge variant="success">Ready to pay</StatusBadge>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {selectedSeats.map((seat) => (
                <span
                  key={seat.id}
                  className="rounded-full bg-slate-950 px-3 py-1.5 text-sm font-medium text-white dark:bg-white dark:text-slate-950"
                >
                  {seat.number}
                </span>
              ))}
            </div>

            <div className="mt-6 space-y-3 rounded-[1.75rem] border border-white/40 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center justify-between text-sm">
                <span className={bodyClass}>Ticket subtotal</span>
                <span className="font-medium text-slate-900 dark:text-white">ETB {subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={bodyClass}>Service fee</span>
                <span className="font-medium text-slate-900 dark:text-white">ETB {serviceFee}</span>
              </div>
              <div className="border-t border-slate-200/70 pt-4 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">Total amount</span>
                  <span className="font-display text-3xl font-bold text-slate-950 dark:text-white">ETB {totalAmount}</span>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </PageShell>
  )
}

export default BookingSummary
