import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Bus,
  CheckCircle2,
  Clock,
  CreditCard,
  MapPin,
  Play,
  Route,
  Shield,
  Sparkles,
  Star,
  Users,
  Wifi,
} from 'lucide-react'
import BusSearch from './BusSearch'

const Home = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: Bus,
      title: 'Modern Fleet',
      description:
        'Comfortable coaches with clean cabins, charging points, and smooth long-distance rides.',
      color: 'text-primary-700',
      bgColor: 'bg-primary-100/80',
    },
    {
      icon: Clock,
      title: 'Reliable Timing',
      description:
        'Live trip coordination helps passengers track departures with more confidence.',
      color: 'text-accent-700',
      bgColor: 'bg-accent-100/80',
    },
    {
      icon: Shield,
      title: 'Safe Travel',
      description:
        'Professional drivers, registered routes, and clear seat booking for every trip.',
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-100/80',
    },
    {
      icon: CreditCard,
      title: 'Easy Payment',
      description:
        'Support for digital checkout and booking flows that feel quick and straightforward.',
      color: 'text-sky-700',
      bgColor: 'bg-sky-100/80',
    },
  ]

  const stats = [
    { value: '50K+', label: 'Happy Customers', icon: Users },
    { value: '120+', label: 'Daily Trips', icon: Route },
    { value: '30+', label: 'Connected Cities', icon: MapPin },
    { value: '4.9/5', label: 'Rider Rating', icon: Star },
  ]

  const highlights = [
    'Instant route discovery',
    'Mobile-friendly booking',
    'Seat selection before checkout',
  ]

  const journeys = [
    { route: 'Addis Ababa to Hawassa', time: '5h 20m', vibe: 'Sunrise departures' },
    { route: 'Adama to Dire Dawa', time: '7h 10m', vibe: 'Fast intercity route' },
    { route: 'Bahir Dar to Gondar', time: '3h 45m', vibe: 'Popular weekend trip' },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="hero-grid absolute inset-0 opacity-40" />
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />
      <div className="hero-orb hero-orb-three" />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.4),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.28),_transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-24 lg:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/80 backdrop-blur">
              <Sparkles className="h-4 w-4 text-accent-300" />
              Smarter bus booking for routes across Ethiopia
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
              Your next trip
              <span className="block bg-gradient-to-r from-accent-300 via-white to-primary-300 bg-clip-text text-transparent">
                starts with motion
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Book seats, compare routes, and move from city to city with a homepage designed to
              feel fast, modern, and alive.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/85"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/search')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-bold text-slate-950 shadow-2xl shadow-primary-950/40"
              >
                Search Buses
                <ArrowRight className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/services')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/8 px-7 py-4 text-base font-semibold text-white backdrop-blur"
              >
                <Play className="h-4 w-4" />
                Explore Services
              </motion.button>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.08, duration: 0.5 }}
                  className="rounded-3xl border border-white/10 bg-white/6 p-4 backdrop-blur"
                >
                  <stat.icon className="mb-3 h-5 w-5 text-accent-300" />
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="mt-1 text-sm text-slate-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -left-8 top-12 hidden h-24 w-24 rounded-full bg-accent-400/20 blur-3xl lg:block" />
            <div className="absolute -right-8 bottom-12 hidden h-28 w-28 rounded-full bg-primary-400/30 blur-3xl lg:block" />
            <div className="relative rounded-[32px] border border-white/14 bg-white/10 p-3 shadow-[0_24px_80px_rgba(15,23,42,0.45)] backdrop-blur-xl">
              <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-accent-300/90">
                      Live Booking
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-white">
                      Plan your ride in seconds
                    </h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8">
                    <Wifi className="h-5 w-5 text-primary-200" />
                  </div>
                </div>

                <BusSearch compact />

                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {journeys.map((journey, index) => (
                    <motion.div
                      key={journey.route}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="mb-3 flex items-center gap-2 text-accent-300">
                        <Route className="h-4 w-4" />
                        <span className="text-xs font-semibold uppercase tracking-[0.22em]">
                          Trending
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-white">{journey.route}</h3>
                      <p className="mt-2 text-sm text-slate-300">{journey.vibe}</p>
                      <p className="mt-4 text-lg font-bold text-primary-200">{journey.time}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent-300">
                Experience
              </p>
              <h2 className="mt-3 max-w-2xl text-4xl font-black text-white">
                A homepage with movement, depth, and a clearer booking story
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-300">
              EthioBus now leads with a richer first impression that highlights route speed,
              trust, and booking confidence without losing the useful search flow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, rotateX: 4 }}
                className="group rounded-[28px] border border-white/10 bg-white/6 p-6 backdrop-blur-sm"
              >
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bgColor}`}
                >
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-r from-primary-500/18 via-white/8 to-accent-500/18 p-8 backdrop-blur-xl lg:p-12"
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent-300">
                  Start Now
                </p>
                <h2 className="mt-3 text-4xl font-black text-white">
                  Ready to turn this into a real trip?
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-200">
                  Pick a route, choose your seat, and finish the booking flow in a few taps.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/search')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-400 px-8 py-4 text-base font-bold text-slate-950 shadow-2xl shadow-accent-950/30"
              >
                Book a Seat
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
