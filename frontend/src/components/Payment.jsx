import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Navigate, useNavigate } from 'react-router-dom'
import { CheckCircle2, CreditCard, LoaderCircle, ShieldCheck, Smartphone, Wallet } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const methods = [
  {
    id: 'card',
    title: 'Card Payment',
    description: 'A premium-looking checkout option for passengers who want a fast, familiar payment path.',
    icon: CreditCard,
  },
  {
    id: 'telebirr',
    title: 'Telebirr',
    description: 'A cleaner mobile money experience designed to feel modern and locally relevant.',
    icon: Smartphone,
  },
  {
    id: 'cash',
    title: 'Pay at Terminal',
    description: 'Reserve the seat now and complete payment before departure at the station.',
    icon: Wallet,
  },
]

const Payment = () => {
  const navigate = useNavigate()
  const { confirmPayment, selectedBus, selectedSeats, darkMode } = useAuth()
  const [activeMethod, setActiveMethod] = useState('card')
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!selectedBus || selectedSeats.length === 0) {
    return <Navigate to="/summary" replace />
  }

  const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0)
  const totalAmount = subtotal + 65
  const surfaceClass = darkMode
    ? 'border-white/10 bg-white/5'
    : 'border-slate-200/80 bg-white/90 shadow-[0_18px_60px_rgba(148,163,184,0.16)]'
  const nestedClass = darkMode
    ? 'border-white/10 bg-slate-950/55'
    : 'border-slate-200 bg-slate-50'
  const textSubtle = darkMode ? 'text-slate-300' : 'text-slate-600'
  const textMuted = darkMode ? 'text-slate-400' : 'text-slate-500'

  const handlePayment = async () => {
    setProcessing(true)
    const booking = await confirmPayment(activeMethod)
    setProcessing(false)
    setSuccess(true)
    toast.success('Mock payment completed')
    window.setTimeout(() => navigate('/ticket', { state: { booking } }), 1200)
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 pb-20 pt-8 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,_rgba(14,165,233,0.15),_rgba(79,70,229,0.16),_rgba(15,23,42,0.88))] p-6 backdrop-blur-2xl sm:p-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Payment</p>
          <h1 className="mt-3 text-4xl font-black text-white">Complete your booking with confidence</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
            A cleaner payment step with stronger hierarchy, calmer spacing, and more polished action states.
          </p>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="mt-10 rounded-[28px] border border-emerald-400/20 bg-emerald-400/10 p-10 text-center"
              >
                <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-300" />
                <h2 className="mt-5 text-2xl font-bold text-white">Payment successful</h2>
                <p className="mt-3 text-slate-200">Your booking is confirmed and your ticket is being prepared.</p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.92fr]"
              >
                <div className="space-y-4">
                  {methods.map((method) => (
                    <motion.button
                      key={method.id}
                      whileHover={{ y: -4 }}
                      type="button"
                      onClick={() => setActiveMethod(method.id)}
                      className={`w-full rounded-[26px] border p-5 text-left transition ${
                        activeMethod === method.id
                          ? 'border-sky-400/40 bg-sky-400/10'
                          : nestedClass
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`rounded-2xl p-3 ${darkMode ? 'bg-white/5 text-sky-300' : 'bg-white text-sky-500 ring-1 ring-slate-200'}`}>
                          <method.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-950'}`}>{method.title}</h2>
                          <p className={`mt-2 text-sm leading-6 ${textSubtle}`}>{method.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className={`rounded-[28px] border p-6 ${surfaceClass}`}>
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-sky-400/10 p-3 text-sky-400">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-950'}`}>Payment summary</h2>
                      <p className={`text-sm ${textMuted}`}>Secure-looking summary before confirmation</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className={`rounded-2xl border px-4 py-4 ${nestedClass}`}>
                      <p className={`text-xs uppercase tracking-[0.24em] ${textMuted}`}>Bus</p>
                      <p className={`mt-2 text-sm ${darkMode ? 'text-white' : 'text-slate-950'}`}>{selectedBus.company}</p>
                      <p className={`mt-1 text-xs ${textMuted}`}>{selectedBus.from} {'->'} {selectedBus.to}</p>
                    </div>
                    <div className={`rounded-2xl border px-4 py-4 ${nestedClass}`}>
                      <p className={`text-xs uppercase tracking-[0.24em] ${textMuted}`}>Seats</p>
                      <p className={`mt-2 text-sm ${darkMode ? 'text-white' : 'text-slate-950'}`}>{selectedSeats.map((seat) => seat.number).join(', ')}</p>
                    </div>
                    <div className={`rounded-2xl border px-4 py-4 ${nestedClass}`}>
                      <div className={`flex justify-between text-sm ${textSubtle}`}>
                        <span>Ticket subtotal</span>
                        <span>ETB {subtotal}</span>
                      </div>
                      <div className={`mt-3 flex justify-between text-sm ${textSubtle}`}>
                        <span>Service fee</span>
                        <span>ETB 65</span>
                      </div>
                      <div className={`mt-4 border-t pt-4 ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
                        <div className={`flex justify-between text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-950'}`}>
                          <span>Total</span>
                          <span>ETB {totalAmount}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handlePayment}
                    disabled={processing}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-4 text-sm font-semibold text-white disabled:opacity-70"
                  >
                    {processing ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Processing payment
                      </>
                    ) : (
                      'Confirm Payment'
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default Payment
