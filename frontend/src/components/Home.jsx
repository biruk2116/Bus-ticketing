import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Bus,
  CheckCircle2,
  Clock3,
  Headphones,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Ticket,
  WalletCards,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const navigate = useNavigate()
  const { runSearch } = useAuth()

  const quickRoutes = [
    { from: 'Addis Ababa', to: 'Gondar', price: 'From ETB 1,320' },
    { from: 'Addis Ababa', to: 'Hawassa', price: 'From ETB 780' },
    { from: 'Dire Dawa', to: 'Adama', price: 'From ETB 920' },
  ]

  const features = [
    { icon: Ticket, title: 'Instant Booking', description: 'Search, compare, and reserve a seat in a few taps.' },
    { icon: ShieldCheck, title: 'Trusted Operators', description: 'Every trip is presented with clear timing and route detail.' },
    { icon: WalletCards, title: 'Flexible Payment', description: 'Mock card and mobile money flows built like a real product.' },
    { icon: Headphones, title: 'Always Supported', description: 'A smoother customer experience from search to ticket view.' },
  ]

  const launchSearch = (from, to) => {
    runSearch({
      from,
      to,
      date: new Date().toISOString().split('T')[0],
      passengers: 1,
    })
    navigate('/buses')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white" style={{ fontFamily: 'Inter, Poppins, system-ui, sans-serif' }}>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_#020617_0%,_#111827_35%,_#1e1b4b_72%,_#0f172a_100%)]" />
        <motion.div animate={{ x: [0, 24, 0], y: [0, -16, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-[-4rem] top-20 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />
        <motion.div animate={{ x: [0, -20, 0], y: [0, 16, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-[-2rem] top-32 h-60 w-60 rounded-full bg-indigo-500/18 blur-3xl" />
        <motion.div animate={{ x: [0, 18, 0], y: [0, -18, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-8 left-1/3 h-52 w-52 rounded-full bg-fuchsia-500/15 blur-3xl" />

        <section className="relative flex min-h-screen items-center px-4 pb-20 pt-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
              className="flex flex-col justify-center"
            >
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-sky-300" />
                Modern ticketing built for real travel workflows
              </div>

              <h1 className="mt-8 max-w-4xl text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                Travel smart.
                <span className="block bg-gradient-to-r from-sky-300 via-white to-indigo-300 bg-clip-text text-transparent">
                  Book bus tickets instantly.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Fast, reliable, and beautifully designed booking from route discovery to digital ticket delivery.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {['Live schedules', 'Seat selection', 'Protected checkout'].map((item) => (
                  <div key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-xl">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => navigate('/search')}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 px-7 py-4 text-base font-semibold text-white shadow-[0_25px_60px_rgba(56,189,248,0.24)]"
                >
                  Start Booking
                  <ArrowRight className="h-5 w-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => navigate('/services')}
                  className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-base font-semibold text-slate-100 backdrop-blur-xl"
                >
                  Explore Services
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="relative flex items-center"
            >
              <div className="relative w-full rounded-[32px] border border-white/10 bg-white/10 p-3 shadow-[0_30px_120px_rgba(2,6,23,0.55)] backdrop-blur-2xl">
                <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6 sm:p-7">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.32em] text-sky-300">Popular Routes</p>
                      <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Book the next departure faster</h2>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <Bus className="h-5 w-5 text-sky-300" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {quickRoutes.map((route, index) => (
                      <motion.button
                        key={`${route.from}-${route.to}`}
                        type="button"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 + 0.2 }}
                        whileHover={{ y: -4 }}
                        onClick={() => launchSearch(route.from, route.to)}
                        className="w-full rounded-3xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur-xl"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Featured Route</p>
                            <h3 className="mt-3 text-xl font-bold text-white">
                              {route.from}
                              <span className="mx-3 text-indigo-300">→</span>
                              {route.to}
                            </h3>
                          </div>
                          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">{route.price}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {[
                      { icon: Clock3, label: 'Fast boarding' },
                      { icon: MapPin, label: 'Major routes' },
                      { icon: Star, label: 'Top-rated buses' },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <item.icon className="h-5 w-5 text-sky-300" />
                        <p className="mt-3 text-sm font-medium text-slate-200">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Features</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">Everything needed for a polished booking experience</h2>
              <p className="mt-4 text-lg text-slate-300">
                The frontend simulates a real travel platform with modern motion, mock data, and a complete booking flow.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400/20 to-indigo-500/20 text-sky-300">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-r from-sky-500/15 via-indigo-500/15 to-fuchsia-500/15 p-8 backdrop-blur-2xl sm:p-10 lg:p-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Ready to start?</p>
                <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                  Search routes, pick seats, and get your ticket.
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-200">
                  Explore the full frontend experience built like a real startup product, with protected pages and admin tools included.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => navigate('/search')}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-slate-950"
              >
                Search Buses
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
