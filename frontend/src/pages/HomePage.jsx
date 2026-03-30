import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Headphones,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Ticket,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import SectionHeading from '../components/SectionHeading'
import busHeroImage from '../assets/home-bus.gif'

const cities = ['Addis Ababa', 'Gondar', 'Hawassa', 'Bahir Dar', 'Dire Dawa', 'Jimma', 'Adama', 'Mekelle']

const featureCards = [
  {
    icon: Ticket,
    title: 'Instant booking flow',
    text: 'Move from route discovery to checkout with a booking experience that stays clear on every screen.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable payments',
    text: 'Card and mobile payment UI is structured to feel secure, calm, and easy to complete.',
  },
  {
    icon: Sparkles,
    title: 'Premium interface',
    text: 'Modern motion, strong hierarchy, and balanced spacing make the product feel launch-ready.',
  },
  {
    icon: Headphones,
    title: 'Passenger support',
    text: 'Support moments are designed like part of the product, not an afterthought.',
  },
]

const projectCards = [
  {
    title: 'Luxury Intercity Routes',
    tag: 'Search experience',
    text: 'Fast route comparison, cleaner pricing cards, and higher-conversion search interactions.',
  },
  {
    title: 'Seat Selection UX',
    tag: 'Booking system',
    text: 'An interactive booking layout with better visual feedback and stronger selection confidence.',
  },
  {
    title: 'Ticket & Admin Console',
    tag: 'Operations design',
    text: 'Professional ticket surfaces and a cleaner control panel for routes, bookings, and fleet management.',
  },
]

const testimonials = [
  {
    name: 'Marta G.',
    role: 'Frequent traveler',
    text: 'The interface feels modern and clear. Booking a trip takes less effort than older ticket sites.',
  },
  {
    name: 'Nahom T.',
    role: 'Business passenger',
    text: 'The route cards and payment flow feel polished enough for a real transport platform.',
  },
]

const HomePage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { runSearch, darkMode } = useAuth()
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [formData, setFormData] = useState({
    from: 'Addis Ababa',
    to: 'Gondar',
    date: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    if (!location.hash) return
    const sectionId = location.hash.replace('#', '')
    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }, [location.hash])

  const stats = useMemo(
    () => [
      { value: '25+', label: 'Connected cities' },
      { value: '99%', label: 'Booking confidence' },
      { value: '24/7', label: 'Support coverage' },
    ],
    [],
  )

  const handleSearch = (event) => {
    event.preventDefault()

    if (!formData.from || !formData.to || !formData.date) {
      toast.error('Please complete all fields before searching.')
      return
    }

    if (formData.from === formData.to) {
      toast.error('Choose different departure and destination cities.')
      return
    }

    runSearch({ ...formData, passengers: 1 })
    navigate('/buses')
  }

  const submitContact = (event) => {
    event.preventDefault()
    toast.success('Your message has been received.')
    setContactForm({ name: '', email: '', message: '' })
  }

  const cardShell = darkMode
    ? 'border-white/10 bg-white/5'
    : 'border-slate-200/80 bg-white/85 shadow-[0_18px_60px_rgba(148,163,184,0.14)]'

  return (
    <div className="overflow-hidden">
      <section
        id="home"
        className="relative min-h-screen overflow-hidden bg-slate-950 bg-cover bg-[position:68%_center] bg-no-repeat text-white"
        style={{ backgroundImage: `url(${busHeroImage})` }}
      >
        <motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.025, 1], y: [0, -8, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-cover bg-[position:68%_center] bg-no-repeat"
          style={{ backgroundImage: `url(${busHeroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/64 via-slate-950/20 to-slate-950/6" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.12),_transparent_24%),radial-gradient(circle_at_78%_28%,_rgba(255,255,255,0.08),_transparent_17%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.12),_transparent_28%)]" />

        <div className="relative z-10 px-4 pb-20 pt-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-12 lg:grid-cols-[0.96fr_1.04fr]">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="max-w-2xl pt-6 sm:pt-10"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/18 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-sky-100 shadow-[0_8px_24px_rgba(15,23,42,0.18)]">
                <Sparkles className="h-3.5 w-3.5" />
                Travel smarter across Ethiopia
              </div>

              <h1 className="mt-6 text-4xl font-bold leading-tight text-white [text-shadow:0_10px_30px_rgba(15,23,42,0.55)] sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Clearer booking, premium design, and smarter bus travel.
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-100 [text-shadow:0_8px_24px_rgba(15,23,42,0.45)] sm:text-base">
                Plan routes faster, compare options with confidence, and move from search to checkout inside a cleaner,
                more refined product experience.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => navigate('/search')}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(56,189,248,0.25)]"
                >
                  Start booking
                  <ArrowRight className="h-4 w-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center rounded-full border border-white/22 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(15,23,42,0.18)]"
                >
                  Explore features
                </motion.button>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-3xl border border-white/12 px-5 py-4 shadow-[0_10px_26px_rgba(15,23,42,0.12)]">
                    <p className="text-2xl font-bold text-white [text-shadow:0_8px_24px_rgba(15,23,42,0.45)]">{stat.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-100 [text-shadow:0_8px_24px_rgba(15,23,42,0.45)]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.65 }}
              className="w-full"
            >
              <form
                onSubmit={handleSearch}
                className="rounded-[32px] border border-white/15 bg-slate-950/30 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.35)] backdrop-blur-2xl sm:p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-100">Quick search</p>
                    <h2 className="mt-2 text-2xl font-bold">Find a route in seconds</h2>
                  </div>
                  <div className="hidden rounded-2xl border border-white/15 bg-slate-950/22 p-3 md:block">
                    <Search className="h-5 w-5 text-sky-100" />
                  </div>
                </div>

                <div className="mt-6 grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm">
                      <span className="mb-2 block font-medium text-slate-100">From</span>
                      <div className="relative">
                        <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
                        <select
                          value={formData.from}
                          onChange={(event) => setFormData((current) => ({ ...current, from: event.target.value }))}
                          className="h-12 w-full rounded-2xl border border-white/15 bg-white/10 pl-11 pr-4 text-sm text-white outline-none transition focus:border-sky-400"
                        >
                          {cities.map((city) => (
                            <option key={city} value={city} className="bg-slate-900 text-white">
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>
                    </label>

                    <label className="block text-sm">
                      <span className="mb-2 block font-medium text-slate-100">To</span>
                      <div className="relative">
                        <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
                        <select
                          value={formData.to}
                          onChange={(event) => setFormData((current) => ({ ...current, to: event.target.value }))}
                          className="h-12 w-full rounded-2xl border border-white/15 bg-white/10 pl-11 pr-4 text-sm text-white outline-none transition focus:border-sky-400"
                        >
                          {cities.filter((city) => city !== formData.from).map((city) => (
                            <option key={city} value={city} className="bg-slate-900 text-white">
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
                    <label className="block text-sm">
                      <span className="mb-2 block font-medium text-slate-100">Travel date</span>
                      <div className="relative">
                        <Calendar className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
                        <input
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.date}
                          onChange={(event) => setFormData((current) => ({ ...current, date: event.target.value }))}
                          className="h-12 w-full rounded-2xl border border-white/15 bg-white/10 pl-11 pr-4 text-sm text-white outline-none transition focus:border-sky-400"
                        />
                      </div>
                    </label>

                    <div className="flex items-end">
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-5 text-sm font-semibold text-white"
                      >
                        <Search className="h-4 w-4" />
                        Search
                      </motion.button>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
        <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="About"
              title="A modern frontend foundation for travel products that need clarity and trust."
              description="This layout brings together responsive structure, smooth navigation, reusable components, and a professional visual language suitable for a real startup-grade booking platform."
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                className={`rounded-[32px] border p-8 ${cardShell}`}
              >
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white">Built for professional UI delivery</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  The project now has a clearer structure with reusable layout components, better visual rhythm, and a
                  single-page landing experience that works smoothly on mobile and desktop.
                </p>
                <div className="mt-6 space-y-4">
                  {[
                    'Reusable layout with Navbar, main content, and Footer',
                    'Responsive mobile-first spacing and navigation behavior',
                    'Dark mode persistence through localStorage and shared context',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-400" />
                      <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  { title: 'Professional hierarchy', value: 'SaaS-ready' },
                  { title: 'Responsive behavior', value: 'Mobile-first' },
                  { title: 'Theme support', value: 'Light + dark' },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    viewport={{ once: true, amount: 0.25 }}
                    className={`rounded-[28px] border p-6 ${cardShell}`}
                  >
                    <p className="text-xs uppercase tracking-[0.26em] text-sky-400">{item.title}</p>
                    <p className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Services"
              title="Core product features designed with polished interactions and clean spacing."
              description="Each section uses light glassmorphism, soft shadows, and motion-driven feedback so the UI feels modern without becoming noisy."
              align="center"
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featureCards.map((feature, index) => (
                <motion.article
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true, amount: 0.25 }}
                  className={`rounded-[30px] border p-6 ${cardShell}`}
                >
                  <div className="inline-flex rounded-2xl bg-gradient-to-br from-sky-500/15 to-indigo-500/15 p-3 text-sky-400">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-slate-950 dark:text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{feature.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Projects"
              title="A portfolio-style showcase for the product experience inside this frontend."
              description="This section highlights the most polished flows in the app, from search and booking to admin controls and ticket presentation."
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {projectCards.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  className={`rounded-[32px] border p-7 ${cardShell}`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-400">{project.tag}</p>
                  <h3 className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">{project.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{project.text}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sky-500">
                    Product-ready polish
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {testimonials.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true, amount: 0.25 }}
                  className={`rounded-[30px] border p-6 ${cardShell}`}
                >
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">"{item.text}"</p>
                  <div className="mt-5">
                    <p className="font-semibold text-slate-950 dark:text-white">{item.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <SectionHeading
                  eyebrow="Contact"
                  title="Let passengers reach you through a cleaner and more approachable contact experience."
                  description="The landing page closes with a responsive contact section that keeps the UI simple, readable, and aligned with the rest of the product."
                />

                <div className="mt-8 space-y-4">
                  {['Bole Road, Addis Ababa', 'support@ethiobus.com', '+251 911 223 344'].map((item) => (
                    <div key={item} className={`rounded-2xl border px-5 py-4 text-sm ${cardShell}`}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <motion.form
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                onSubmit={submitContact}
                className={`rounded-[32px] border p-7 ${cardShell}`}
              >
                <div className="grid gap-5">
                  <label className="text-sm">
                    <span className="mb-2 block font-medium text-slate-700 dark:text-slate-300">Name</span>
                    <input
                      value={contactForm.name}
                      onChange={(event) => setContactForm((current) => ({ ...current, name: event.target.value }))}
                      className={`h-12 w-full rounded-2xl border px-4 outline-none transition focus:border-sky-400 ${
                        darkMode
                          ? 'border-white/10 bg-slate-950/60 text-slate-100'
                          : 'border-slate-200 bg-slate-50 text-slate-900'
                      }`}
                    />
                  </label>

                  <label className="text-sm">
                    <span className="mb-2 block font-medium text-slate-700 dark:text-slate-300">Email</span>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(event) => setContactForm((current) => ({ ...current, email: event.target.value }))}
                      className={`h-12 w-full rounded-2xl border px-4 outline-none transition focus:border-sky-400 ${
                        darkMode
                          ? 'border-white/10 bg-slate-950/60 text-slate-100'
                          : 'border-slate-200 bg-slate-50 text-slate-900'
                      }`}
                    />
                  </label>

                  <label className="text-sm">
                    <span className="mb-2 block font-medium text-slate-700 dark:text-slate-300">Message</span>
                    <textarea
                      rows="5"
                      value={contactForm.message}
                      onChange={(event) => setContactForm((current) => ({ ...current, message: event.target.value }))}
                      className={`w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-sky-400 ${
                        darkMode
                          ? 'border-white/10 bg-slate-950/60 text-slate-100'
                          : 'border-slate-200 bg-slate-50 text-slate-900'
                      }`}
                    />
                  </label>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white"
                  >
                    Send message
                  </motion.button>
                </div>
              </motion.form>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage
