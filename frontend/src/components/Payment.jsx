import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Navigate, useNavigate } from 'react-router-dom'
import { CheckCircle2, CreditCard, LoaderCircle, Smartphone, Wallet } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const methods = [
  { id: 'card', title: 'Card Payment', description: 'Visa, Mastercard, and mock checkout flow', icon: CreditCard },
  { id: 'telebirr', title: 'Telebirr', description: 'Mobile money checkout for local travel flows', icon: Smartphone },
  { id: 'cash', title: 'Pay at Terminal', description: 'Reserve now and settle before departure', icon: Wallet },
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

  const handlePayment = async () => {
    setProcessing(true)
    const booking = await confirmPayment(activeMethod)
    setProcessing(false)
    setSuccess(true)
    toast.success('Mock payment completed')
    window.setTimeout(() => navigate('/ticket', { state: { booking } }), 1200)
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 pb-20 pt-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl sm:p-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Payment</p>
          <h1 className="mt-3 text-3xl font-black text-white">Choose a payment method</h1>
          <p className="mt-3 text-slate-300">This is a frontend-only simulation with a realistic checkout feel.</p>

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
                <p className="mt-3 text-slate-200">Your ticket is being prepared now.</p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.9fr]">
                <div className="space-y-4">
                  {methods.map((method) => (
                    <motion.button
                      key={method.id}
                      whileHover={{ y: -3 }}
                      type="button"
                      onClick={() => setActiveMethod(method.id)}
                      className={`w-full rounded-[26px] border p-5 text-left transition ${
                        activeMethod === method.id
                          ? 'border-sky-400/40 bg-sky-400/10'
                          : 'border-white/10 bg-slate-950/55'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-2xl bg-white/5 p-3 text-sky-300">
                          <method.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-white">{method.title}</h2>
                          <p className="mt-2 text-sm leading-6 text-slate-300">{method.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="rounded-[28px] border border-white/10 bg-slate-950/55 p-6">
                  <h2 className="text-xl font-bold text-white">Payment details</h2>
                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Bus</p>
                      <p className="mt-2 text-sm text-white">{selectedBus.company}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Seats</p>
                      <p className="mt-2 text-sm text-white">{selectedSeats.map((seat) => seat.number).join(', ')}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <div className="flex justify-between text-sm text-slate-300">
                        <span>Ticket subtotal</span>
                        <span>ETB {selectedSeats.reduce((sum, seat) => sum + seat.price, 0)}</span>
                      </div>
                      <div className="mt-3 flex justify-between text-sm text-slate-300">
                        <span>Service fee</span>
                        <span>ETB 65</span>
                      </div>
                      <div className="mt-4 border-t border-white/10 pt-4">
                        <div className="flex justify-between text-lg font-bold text-white">
                          <span>Total</span>
                          <span>ETB {selectedSeats.reduce((sum, seat) => sum + seat.price, 0) + 65}</span>
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
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 px-5 py-4 text-sm font-semibold text-white disabled:opacity-70"
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
