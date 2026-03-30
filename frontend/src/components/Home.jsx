import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Bus,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Headphones,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Ticket,
  Users,
  WalletCards,
} from 'lucide-react'

const cities = [
  'Addis Ababa',
  'Gondar',
  'Hawassa',
  'Bahir Dar',
  'Dire Dawa',
  'Jimma',
  'Adama',
  'Mekelle',
]

const features = [
  {
    icon: Ticket,
    title: 'Easy Booking',
    description: 'Find routes, compare schedules, and reserve a seat in a smooth, guided flow.',
  },
  {
    icon: WalletCards,
    title: 'Secure Payment',
    description: 'Protected checkout experience with trusted payment methods and clear pricing.',
  },
  {
    icon: Bus,
    title: 'Real-time Seat Selection',
    description: 'Preview available seats before checkout and book with more confidence.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Helpful assistance whenever plans change or you need help with a booking.',
  },
]

const popularRoutes = [
  { from: 'Addis Ababa', to: 'Gondar', price: 'ETB 1,450', duration: '10h 15m' },
  { from: 'Addis Ababa', to: 'Hawassa', price: 'ETB 780', duration: '5h 20m' },
  { from: 'Bahir Dar', to: 'Mekelle', price: 'ETB 1,180', duration: '8h 40m' },
  { from: 'Dire Dawa', to: 'Adama', price: 'ETB 920', duration: '6h 05m' },
]

const testimonials = [
  {
    name: 'Mekdes Alemu',
    role: 'Frequent Traveler',
    avatar: 'MA',
    quote:
      'The booking flow feels premium and fast. I found my route, picked a seat, and checked out in minutes.',
  },
  {
    name: 'Daniel Bekele',
    role: 'Business Passenger',
    avatar: 'DB',
    quote:
      'This is the first bus ticketing app that actually feels modern. Clear route info, clean design, and no confusion.',
  },
  {
    name: 'Sara Hailu',
    role: 'Weekend Explorer',
    avatar: 'SH',
    quote:
      'I loved the route cards and instant search. It makes planning trips feel effortless and trustworthy.',
  },
]

const sectionReveal = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
}

const itemReveal = {
  hidden: { opacity: 0, y: 24 },
  show: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
}

const SkeletonCard = ({ className = '' }) => (
  <div className={`animate-pulse rounded-3xl border border-white/10 bg-white/5 ${className}`}>
    <div className="space-y-4 p-6">
      <div className="h-5 w-24 rounded-full bg-white/10" />
      <div className="h-10 w-3/4 rounded-2xl bg-white/10" />
      <div className="h-4 w-full rounded-full bg-white/10" />
      <div className="h-4 w-5/6 rounded-full bg-white/10" />
    </div>
  </div>
)

const SectionHeading = ({ eyebrow, title, description }) => (
  <div className="mx-auto max-w-3xl text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">{eyebrow}</p>
    <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
      {title}
    </h2>
    <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{description}</p>
  </div>
)

const Home = () => {
  const navigate = useNavigate()
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [searchData, setSearchData] = useState(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    return {
      from: 'Addis Ababa',
      to: 'Gondar',
      date: tomorrow.toISOString().split('T')[0],
    }
  })

  useEffect(() => {
    const loader = window.setTimeout(() => setIsLoading(false), 700)
    return () => window.clearTimeout(loader)
  }, [])

  useEffect(() => {
    const slider = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length)
    }, 4200)

    return () => window.clearInterval(slider)
  }, [])

  const stats = useMemo(
    () => [
      { label: 'Routes Served', value: '120+' },
      { label: 'Daily Travelers', value: '18K+' },
      { label: 'Seat Accuracy', value: '99.2%' },
    ],
    []
  )

  const handleSearch = (event) => {
    event.preventDefault()

    navigate('/buses', {
      state: {
        from: searchData.from,
        to: searchData.to,
        date: new Date(searchData.date),
        passengers: 1,
      },
    })
  }

  const nextTestimonial = () => {
    setActiveTestimonial((current) => (current + 1) % testimonials.length)
  }

  const previousTestimonial = () => {
    setActiveTestimonial((current) => (current - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div
      className="min-h-screen bg-[#050816] text-white"
      style={{ fontFamily: 'Inter, Poppins, system-ui, sans-serif' }}
    >
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_28%),radial-gradient(circle_at_80%_20%,_rgba(99,102,241,0.26),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.22),_transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(10,15,38,0.25),_rgba(5,8,22,1))]" />

        <motion.div
          animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[-4rem] top-24 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 22, 0], x: [0, -14, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[-4rem] top-40 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -12, 0], x: [0, -10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 left-1/3 h-44 w-44 rounded-full bg-indigo-500/20 blur-3xl"
        />

        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pb-24 lg:pt-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center"
            >
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-cyan-300" />
                Premium travel experience for modern passengers
              </div>

              <h1 className="mt-8 max-w-3xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Travel Smart.
                <span className="block bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
                  Book Bus Tickets Instantly.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Fast, reliable, and comfortable journeys at your fingertips.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {['Live schedules', 'Secure checkout', 'Trusted operators'].map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-xl"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_18px_50px_rgba(14,165,233,0.06)] backdrop-blur-xl"
                  >
                    <div className="text-2xl font-black text-white">{stat.value}</div>
                    <div className="mt-1 text-sm text-slate-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="relative flex items-center"
            >
              <div className="absolute inset-x-10 top-8 h-40 rounded-full bg-cyan-400/15 blur-3xl" />
              <div className="relative w-full rounded-[32px] border border-white/10 bg-white/10 p-3 shadow-[0_30px_120px_rgba(5,8,22,0.65)] backdrop-blur-2xl">
                <div className="rounded-[28px] border border-white/10 bg-[#091024]/90 p-6 sm:p-7">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
                        Instant Search
                      </p>
                      <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                        Find the next available journey
                      </h2>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <Search className="h-5 w-5 text-cyan-300" />
                    </div>
                  </div>

                  <form onSubmit={handleSearch} className="space-y-4" aria-label="Bus ticket search">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="from-city"
                          className="mb-2 block text-sm font-medium text-slate-200"
                        >
                          From
                        </label>
                        <div className="relative">
                          <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-300" />
                          <select
                            id="from-city"
                            value={searchData.from}
                            onChange={(event) =>
                              setSearchData((current) => ({ ...current, from: event.target.value }))
                            }
                            className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                          >
                            {cities.map((city) => (
                              <option key={city} value={city} className="bg-slate-900 text-white">
                                {city}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="to-city"
                          className="mb-2 block text-sm font-medium text-slate-200"
                        >
                          To
                        </label>
                        <div className="relative">
                          <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fuchsia-300" />
                          <select
                            id="to-city"
                            value={searchData.to}
                            onChange={(event) =>
                              setSearchData((current) => ({ ...current, to: event.target.value }))
                            }
                            className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 text-slate-100 outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/30"
                          >
                            {cities
                              .filter((city) => city !== searchData.from)
                              .map((city) => (
                                <option
                                  key={city}
                                  value={city}
                                  className="bg-slate-900 text-white"
                                >
                                  {city}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]">
                      <div>
                        <label
                          htmlFor="travel-date"
                          className="mb-2 block text-sm font-medium text-slate-200"
                        >
                          Date
                        </label>
                        <div className="relative">
                          <Calendar className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-300" />
                          <input
                            id="travel-date"
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            value={searchData.date}
                            onChange={(event) =>
                              setSearchData((current) => ({ ...current, date: event.target.value }))
                            }
                            className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                          />
                        </div>
                      </div>

                      <div className="flex items-end">
                        <motion.button
                          whileHover={{ scale: 1.03, boxShadow: '0px 0px 40px rgba(34,211,238,0.38)' }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 px-6 font-semibold text-white shadow-[0_20px_60px_rgba(56,189,248,0.28)] sm:w-auto"
                        >
                          <Search className="h-4 w-4" />
                          Search Buses
                        </motion.button>
                      </div>
                    </div>
                  </form>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {popularRoutes.slice(0, 3).map((route) => (
                      <div
                        key={`${route.from}-${route.to}`}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4"
                      >
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                          Hot Route
                        </p>
                        <p className="mt-2 text-sm font-semibold text-white">
                          {route.from} to {route.to}
                        </p>
                        <p className="mt-3 text-sm text-slate-300">{route.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <motion.section
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Features"
              title="Designed for fast bookings and zero friction"
              description="A polished bus booking experience with premium visuals, clear hierarchy, and thoughtful interactions across every step."
            />

            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonCard key={index} className="h-[240px]" />
                  ))
                : features.map((feature, index) => {
                    const Icon = feature.icon

                    return (
                      <motion.div
                        key={feature.title}
                        custom={index}
                        variants={itemReveal}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.32)] backdrop-blur-xl"
                      >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 text-cyan-300">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="mt-6 text-xl font-bold text-white">{feature.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-300">
                          {feature.description}
                        </p>
                      </motion.div>
                    )
                  })}
            </div>
          </div>
        </motion.section>

        {/* Popular Routes Section */}
        <motion.section
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Popular Routes"
              title="Routes people book the most"
              description="Browse high-demand journeys with pricing and duration surfaced upfront for faster decision-making."
            />

            <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonCard key={index} className="h-[220px]" />
                  ))
                : popularRoutes.map((route, index) => (
                    <motion.button
                      key={`${route.from}-${route.to}`}
                      type="button"
                      custom={index}
                      variants={itemReveal}
                      whileHover={{ y: -8, scale: 1.01 }}
                      onClick={() =>
                        navigate('/buses', {
                          state: {
                            from: route.from,
                            to: route.to,
                            date: new Date(),
                            passengers: 1,
                          },
                        })
                      }
                      className="group rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-[0_24px_60px_rgba(15,23,42,0.32)] backdrop-blur-xl transition"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
                            Premium Route
                          </p>
                          <h3 className="mt-4 text-2xl font-bold text-white">
                            {route.from}
                            <span className="mx-3 text-fuchsia-300">→</span>
                            {route.to}
                          </h3>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-cyan-300 transition group-hover:bg-cyan-400/10">
                          <ArrowUpRight className="h-5 w-5" />
                        </div>
                      </div>

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

        {/* Testimonials Section */}
        <motion.section
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Testimonials"
              title="Trusted by passengers who care about speed and comfort"
              description="Social proof matters, so the homepage surfaces real-feeling praise with a clean animated slider."
            />

            <div className="mt-14 rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.32)] backdrop-blur-xl sm:p-8">
              {isLoading ? (
                <SkeletonCard className="h-[240px]" />
              ) : (
                <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div className="overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={testimonials[activeTestimonial].name}
                        initial={{ opacity: 0, x: 35 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -35 }}
                        transition={{ duration: 0.45 }}
                        className="min-h-[220px]"
                      >
                        <div className="flex items-center gap-1 text-amber-300">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star key={index} className="h-5 w-5 fill-current" />
                          ))}
                        </div>
                        <p className="mt-6 max-w-3xl text-2xl font-medium leading-10 text-white">
                          “{testimonials[activeTestimonial].quote}”
                        </p>
                        <div className="mt-8 flex items-center gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 font-bold text-slate-950">
                            {testimonials[activeTestimonial].avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              {testimonials[activeTestimonial].name}
                            </p>
                            <p className="text-sm text-slate-300">
                              {testimonials[activeTestimonial].role}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={previousTestimonial}
                      className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={nextTestimonial}
                      className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Call-to-Action Section */}
        <motion.section
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-fuchsia-500/20 p-8 shadow-[0_30px_90px_rgba(56,189,248,0.14)] backdrop-blur-2xl sm:p-10 lg:p-14">
              <motion.div
                animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-fuchsia-400/20 blur-3xl"
              />
              <motion.div
                animate={{ x: [0, -12, 0], y: [0, 14, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl"
              />

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
                    Start Today
                  </p>
                  <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                    Start Your Journey Today
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-slate-200">
                    Discover premium intercity travel with instant booking, polished design, and a
                    smoother way to reserve seats.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0px 0px 44px rgba(232,121,249,0.32)' }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => navigate('/search')}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-slate-950"
                >
                  Book Your Ticket
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer Preview */}
        <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 p-2 text-slate-950">
                  <Bus className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold text-white">EthioBus</span>
              </div>
              <p className="mt-3 text-sm text-slate-400">
                Smart booking for modern bus travel across Ethiopia.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-slate-300">
              <button type="button" onClick={() => navigate('/about')} className="transition hover:text-cyan-300">
                About
              </button>
              <button type="button" onClick={() => navigate('/contacts')} className="transition hover:text-cyan-300">
                Contact
              </button>
              <button type="button" onClick={() => navigate('/services')} className="transition hover:text-cyan-300">
                Services
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home
