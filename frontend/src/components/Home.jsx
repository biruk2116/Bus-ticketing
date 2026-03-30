import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Bus,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Headphones,
  MapPin,
  Search,
  Star,
  Ticket,
  WalletCards,
} from 'lucide-react'

const cities = ['Addis Ababa', 'Gondar', 'Hawassa', 'Bahir Dar', 'Dire Dawa', 'Jimma', 'Adama']

const features = [
  { icon: Ticket, title: 'Easy Booking', description: 'Search routes and reserve seats in a simple booking flow.' },
  { icon: WalletCards, title: 'Secure Payment', description: 'Checkout with clear pricing and trusted payment handling.' },
  { icon: Bus, title: 'Seat Selection', description: 'Preview available seats before you finish your booking.' },
  { icon: Headphones, title: '24/7 Support', description: 'Get help quickly whenever your travel plans change.' },
]

const routes = [
  { from: 'Addis Ababa', to: 'Gondar', price: 'ETB 1,450', duration: '10h 15m' },
  { from: 'Addis Ababa', to: 'Hawassa', price: 'ETB 780', duration: '5h 20m' },
  { from: 'Dire Dawa', to: 'Adama', price: 'ETB 920', duration: '6h 05m' },
]

const testimonials = [
  { name: 'Mekdes Alemu', role: 'Frequent Traveler', avatar: 'MA', quote: 'Booking feels fast and clean. I found a route and confirmed my seat in minutes.' },
  { name: 'Daniel Bekele', role: 'Business Passenger', avatar: 'DB', quote: 'The design is simple and modern, and the route search is very easy to use.' },
  { name: 'Sara Hailu', role: 'Weekend Explorer', avatar: 'SH', quote: 'I like how quickly I can compare routes, prices, and departure details.' },
]

const SectionHeader = ({ badge, title, text }) => (
  <div className="mx-auto max-w-3xl text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">{badge}</p>
    <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h2>
    <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{text}</p>
  </div>
)

const Home = () => {
  const navigate = useNavigate()
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [formData, setFormData] = useState(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return { from: 'Addis Ababa', to: 'Gondar', date: tomorrow.toISOString().split('T')[0] }
  })

  useEffect(() => {
    const slider = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length)
    }, 4500)
    return () => window.clearInterval(slider)
  }, [])

  const submitSearch = (event) => {
    event.preventDefault()
    navigate('/buses', {
      state: {
        from: formData.from,
        to: formData.to,
        date: new Date(formData.date),
        passengers: 1,
      },
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white" style={{ fontFamily: 'Inter, Poppins, system-ui, sans-serif' }}>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_#020617_0%,_#0f172a_35%,_#1e1b4b_72%,_#0f172a_100%)]" />
        <motion.div animate={{ x: [0, 18, 0], y: [0, -12, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-[-3rem] top-24 h-44 w-44 rounded-full bg-sky-400/20 blur-3xl" />
        <motion.div animate={{ x: [0, -18, 0], y: [0, 18, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-[-3rem] top-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
        <motion.div animate={{ x: [0, 14, 0], y: [0, -16, 0] }} transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-16 left-1/3 h-48 w-48 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_32%)]" />

        <section className="relative flex min-h-screen items-center">
          <div className="mx-auto grid w-full max-w-7xl gap-14 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pt-20">
            <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-xl">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Simple booking. Smooth journeys.
              </div>

              <h1 className="mt-8 max-w-3xl text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                Travel Smart.
                <span className="block bg-gradient-to-r from-sky-300 via-white to-indigo-300 bg-clip-text text-transparent">
                  Book Bus Tickets Instantly.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Fast, reliable, and comfortable journeys at your fingertips.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {['Easy route search', 'Safe checkout', 'Comfortable travel'].map((item) => (
                  <div key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-xl">
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
                {[{ label: 'Routes', value: '120+' }, { label: 'Travelers', value: '18K+' }, { label: 'Booking Rate', value: '99%' }].map((stat) => (
                  <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                    <div className="text-2xl font-black text-white">{stat.value}</div>
                    <div className="mt-1 text-sm text-slate-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75, delay: 0.15 }} className="relative flex items-center">
              <div className="absolute inset-x-12 top-10 h-36 rounded-full bg-sky-400/15 blur-3xl" />
              <div className="relative w-full rounded-[32px] border border-white/10 bg-white/10 p-3 shadow-[0_30px_120px_rgba(2,6,23,0.55)] backdrop-blur-2xl">
                <div className="rounded-[28px] border border-white/10 bg-slate-950/75 p-6 sm:p-7">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.32em] text-sky-300">Search Trip</p>
                      <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Find your next route</h2>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <Search className="h-5 w-5 text-sky-300" />
                    </div>
                  </div>

                  <form onSubmit={submitSearch} className="space-y-4" aria-label="Search buses">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="home-from" className="mb-2 block text-sm font-medium text-slate-200">From</label>
                        <div className="relative">
                          <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-300" />
                          <select id="home-from" value={formData.from} onChange={(event) => setFormData((current) => ({ ...current, from: event.target.value }))} className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30">
                            {cities.map((city) => (
                              <option key={city} value={city} className="bg-slate-900 text-white">{city}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="home-to" className="mb-2 block text-sm font-medium text-slate-200">To</label>
                        <div className="relative">
                          <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-300" />
                          <select id="home-to" value={formData.to} onChange={(event) => setFormData((current) => ({ ...current, to: event.target.value }))} className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30">
                            {cities.filter((city) => city !== formData.from).map((city) => (
                              <option key={city} value={city} className="bg-slate-900 text-white">{city}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]">
                      <div>
                        <label htmlFor="home-date" className="mb-2 block text-sm font-medium text-slate-200">Date</label>
                        <div className="relative">
                          <Calendar className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fuchsia-300" />
                          <input id="home-date" type="date" min={new Date().toISOString().split('T')[0]} value={formData.date} onChange={(event) => setFormData((current) => ({ ...current, date: event.target.value }))} className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 text-slate-100 outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/30" />
                        </div>
                      </div>

                      <div className="flex items-end">
                        <motion.button whileHover={{ scale: 1.03, boxShadow: '0px 0px 34px rgba(56,189,248,0.32)' }} whileTap={{ scale: 0.98 }} type="submit" className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 px-6 font-semibold text-white sm:w-auto">
                          <Search className="h-4 w-4" />
                          Search
                        </motion.button>
                      </div>
                    </div>
                  </form>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {routes.map((route) => (
                      <div key={`${route.from}-${route.to}`} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Popular</p>
                        <p className="mt-2 text-sm font-semibold text-white">{route.from} to {route.to}</p>
                        <p className="mt-3 text-sm text-slate-300">{route.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <motion.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} viewport={{ once: true, amount: 0.2 }} className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader badge="Features" title="Everything you need to book with confidence" text="A cleaner homepage focused on fast discovery, simple actions, and a more polished first impression." />
            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div key={feature.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08, duration: 0.5 }} viewport={{ once: true }} whileHover={{ y: -8, scale: 1.02 }} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400/20 to-indigo-500/20 text-sky-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-white">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} viewport={{ once: true, amount: 0.2 }} className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader badge="Popular Routes" title="Top routes people are booking right now" text="Straightforward route cards with just the details that matter most." />
            <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {routes.map((route, index) => (
                <motion.button key={`${route.from}-${route.to}`} type="button" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08, duration: 0.5 }} viewport={{ once: true }} whileHover={{ y: -8 }} onClick={() => navigate('/buses', { state: { from: route.from, to: route.to, date: new Date(), passengers: 1 } })} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.28em] text-sky-300">Route</p>
                  <h3 className="mt-4 text-2xl font-bold text-white">
                    {route.from}
                    <span className="mx-3 text-indigo-300">→</span>
                    {route.to}
                  </h3>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200">
                      <WalletCards className="h-4 w-4 text-emerald-300" />
                      {route.price}
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200">
                      <Clock3 className="h-4 w-4 text-indigo-300" />
                      {route.duration}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} viewport={{ once: true, amount: 0.2 }} className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader badge="Testimonials" title="What travelers say about the experience" text="A simple slider keeps the page lively without adding visual noise." />
            <div className="mt-14 rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div key={testimonials[activeTestimonial].name} initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }} transition={{ duration: 0.4 }} className="min-h-[220px]">
                      <div className="flex items-center gap-1 text-amber-300">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star key={index} className="h-5 w-5 fill-current" />
                        ))}
                      </div>
                      <p className="mt-6 max-w-3xl text-2xl font-medium leading-10 text-white">"{testimonials[activeTestimonial].quote}"</p>
                      <div className="mt-8 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 font-bold text-slate-950">
                          {testimonials[activeTestimonial].avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{testimonials[activeTestimonial].name}</p>
                          <p className="text-sm text-slate-300">{testimonials[activeTestimonial].role}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-3">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="button" onClick={() => setActiveTestimonial((current) => (current - 1 + testimonials.length) % testimonials.length)} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white" aria-label="Previous testimonial">
                    <ChevronLeft className="h-5 w-5" />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="button" onClick={() => setActiveTestimonial((current) => (current + 1) % testimonials.length)} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white" aria-label="Next testimonial">
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} viewport={{ once: true, amount: 0.2 }} className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-r from-sky-500/15 via-indigo-500/15 to-fuchsia-500/15 p-8 backdrop-blur-2xl sm:p-10 lg:p-14">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Start Today</p>
                  <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Start your journey today</h2>
                  <p className="mt-4 text-lg leading-8 text-slate-200">Search your route, choose your seat, and book your ticket in a few quick steps.</p>
                </div>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} type="button" onClick={() => navigate('/search')} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-slate-950">
                  Book Now
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default Home
