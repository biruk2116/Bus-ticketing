import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Navigate, useNavigate } from 'react-router-dom'
import {
  CheckCircle2,
  CreditCard,
  LoaderCircle,
  ShieldCheck,
  Smartphone,
  Wallet,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import PageShell from './ui/PageShell'
import Panel from './ui/Panel'
import SectionHero from './ui/SectionHero'
import Button from './ui/Button'
import StatusBadge from './ui/StatusBadge'
import { bodyClass, cn, mutedClass } from '../lib/ui'

const methods = [
  {
    id: 'card',
    title: 'Card Payment',
    description: 'Fast and familiar checkout for passengers who want an instant confirmation flow.',
    icon: CreditCard,
  },
  {
    id: 'telebirr',
    title: 'Telebirr',
    description: 'Mobile-first payment UI tailored to a modern Ethiopian booking experience.',
    icon: Smartphone,
  },
  {
    id: 'cash',
    title: 'Pay at Terminal',
    description: 'Reserve now and complete the transaction before departure at the terminal.',
    icon: Wallet,
  },
]

const Payment = () => {
  const navigate = useNavigate()
  const { confirmPayment, selectedBus, selectedSeats } = useAuth()
  const [activeMethod, setActiveMethod] = useState('card')
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!selectedBus || selectedSeats.length === 0) {
    return <Navigate to="/summary" replace />
  }

  const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0)
  const totalAmount = subtotal + 65

  const handlePayment = async () => {
    setProcessing(true)
    const booking = await confirmPayment(activeMethod)
    setProcessing(false)
    setSuccess(true)
    toast.success('Mock payment completed')
    window.setTimeout(() => navigate('/ticket', { state: { booking } }), 1200)
  }

  return (
    <PageShell>
      <div className="space-y-8">
        <SectionHero
          eyebrow="Payment"
          title="Complete the booking with a calmer, clearer checkout experience."
          description="This payment step uses stronger hierarchy, cleaner method cards, and a more trustworthy summary panel to make the final action feel production-ready."
          action={<StatusBadge variant="success">Secure-looking checkout</StatusBadge>}
        />

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
              <Panel className="py-16 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-500 dark:text-emerald-300">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h2 className="mt-6 font-display text-3xl font-bold text-slate-950 dark:text-white">Payment successful</h2>
                <p className={cn('mx-auto mt-4 max-w-2xl text-sm leading-7 sm:text-base', bodyClass)}>
                  Your booking is confirmed and the ticket view is being prepared now.
                </p>
              </Panel>
            </motion.div>
          ) : (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="grid gap-6 lg:grid-cols-[1fr_0.88fr]"
            >
              <div className="space-y-4">
                {methods.map((method) => (
                  <motion.button
                    key={method.id}
                    whileHover={{ y: -3 }}
                    type="button"
                    onClick={() => setActiveMethod(method.id)}
                    className={cn(
                      'w-full rounded-[2rem] border p-6 text-left transition',
                      activeMethod === method.id
                        ? 'border-sky-500/30 bg-sky-500/10 shadow-[0_24px_60px_rgba(14,165,233,0.12)] dark:bg-sky-500/10'
                        : 'border-white/50 bg-white/80 shadow-[0_24px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_24px_80px_rgba(2,6,23,0.36)]',
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl bg-slate-950 p-3 text-white dark:bg-white dark:text-slate-950">
                        <method.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="font-display text-xl font-bold text-slate-950 dark:text-white">{method.title}</h2>
                          {activeMethod === method.id ? <StatusBadge variant="default">Selected</StatusBadge> : null}
                        </div>
                        <p className={cn('mt-3 text-sm leading-7', bodyClass)}>{method.description}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <Panel className="h-fit">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-sky-500/10 p-3 text-sky-600 dark:text-sky-300">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white">Payment summary</h2>
                    <p className={cn('text-sm', mutedClass)}>Review the final amount before confirming.</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="rounded-[1.5rem] border border-slate-200/70 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/5">
                    <p className={cn('text-xs uppercase tracking-[0.22em]', mutedClass)}>Bus</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">{selectedBus.company}</p>
                    <p className={cn('mt-1 text-sm', bodyClass)}>{selectedBus.from} to {selectedBus.to}</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-slate-200/70 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/5">
                    <p className={cn('text-xs uppercase tracking-[0.22em]', mutedClass)}>Seats</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                      {selectedSeats.map((seat) => seat.number).join(', ')}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-slate-200/70 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-center justify-between text-sm">
                      <span className={bodyClass}>Ticket subtotal</span>
                      <span className="font-medium text-slate-900 dark:text-white">ETB {subtotal}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className={bodyClass}>Service fee</span>
                      <span className="font-medium text-slate-900 dark:text-white">ETB 65</span>
                    </div>
                    <div className="mt-4 border-t border-slate-200/70 pt-4 dark:border-white/10">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">Total</span>
                        <span className="font-display text-3xl font-bold text-slate-950 dark:text-white">ETB {totalAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="mt-6 w-full" size="lg" onClick={handlePayment} loading={processing} disabled={processing}>
                  {processing ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Processing payment
                    </>
                  ) : (
                    'Confirm Payment'
                  )}
                </Button>
              </Panel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  )
}

export default Payment
