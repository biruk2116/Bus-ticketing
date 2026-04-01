import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Headphones,
  ShieldCheck,
  Sparkles,
  Star,
  Ticket,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import SectionHeading from '../components/SectionHeading'
import busHeroImage from '../assets/home-bus.gif'

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

const aboutParagraphs = [
  'EthioBus is designed to make intercity travel feel easier, calmer, and more trustworthy from the very first interaction. The platform combines a cleaner booking flow with a more structured interface so passengers can understand routes, schedules, and ticket details without friction.',
  'Instead of presenting travel information in a dense or outdated way, the experience focuses on clear hierarchy, polished visuals, and responsive layouts that adapt naturally across mobile, tablet, and desktop screens.',
  'The result is a frontend experience that feels closer to a real production travel product, where speed, clarity, and confidence all work together to support better booking decisions.',
]

const aboutFeatures = [
  {
    icon: ShieldCheck,
    title: 'Built for trust',
    text: 'Clear trip details, calm layouts, and strong calls to action reduce confusion during booking.',
  },
  {
    icon: Ticket,
    title: 'Passenger-first flow',
    text: 'Search, selection, and ticket review are organized to feel smooth on every device.',
  },
  {
    icon: Sparkles,
    title: 'Modern UI quality',
    text: 'Refined motion, glass surfaces, and readable typography create a product-grade feel.',
  },
]

const HomePage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { darkMode } = useAuth()
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    document.documentElement.classList.add('landing-scroll')
    document.body.classList.add('landing-scroll')
    window.scrollTo({ top: 0, behavior: 'auto' })

    return () => {
      document.documentElement.classList.remove('landing-scroll')
      document.body.classList.remove('landing-scroll')
    }
  }, [])

  useEffect(() => {
    const sectionId = location.state?.scrollTo
    if (!sectionId) return

    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      navigate(location.pathname, { replace: true, state: null })
    }, 160)
  }, [location.pathname, location.state, navigate])

  const stats = useMemo(
    () => [
      { value: '25+', label: 'Connected cities' },
      { value: '99%', label: 'Booking confidence' },
      { value: '24/7', label: 'Support coverage' },
    ],
    [],
  )

  const submitContact = (event) => {
    event.preventDefault()
    toast.success('Your message has been received.')
    setContactForm({ name: '', email: '', message: '' })
  }

  const cardShell = darkMode
    ? 'border-white/10 bg-white/5'
    : 'border-slate-200/80 bg-white/85 shadow-[0_18px_60px_rgba(148,163,184,0.14)]'
  const sectionShell =
    'snap-start min-h-screen flex items-center justify-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8'

  return (
    <div className="overflow-hidden">
      <section
        id="home"
        className={`relative overflow-hidden bg-slate-950 text-white ${sectionShell}`}
      >
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${busHeroImage})` }} />
        <div className="absolute inset-0 bg-black/58" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_24%),radial-gradient(circle_at_78%_28%,_rgba(255,255,255,0.06),_transparent_17%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.14),_transparent_28%)]" />

        <div className="relative z-10 w-full">
          <div className="mx-auto flex w-full max-w-7xl items-center">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/18 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-sky-100 shadow-[0_8px_24px_rgba(15,23,42,0.18)]">
                <Sparkles className="h-3.5 w-3.5" />
                Travel smarter across Ethiopia
              </div>

              <h1 className="mt-5 max-w-4xl text-balance text-[2.8rem] font-bold leading-[0.98] text-white [text-shadow:0_10px_30px_rgba(15,23,42,0.55)] sm:text-5xl lg:text-[3.15rem]">
                Clearer booking, premium design, and smarter bus travel.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-100 [text-shadow:0_8px_24px_rgba(15,23,42,0.45)] sm:text-lg sm:leading-8 lg:max-w-3xl">
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

              <div className="mt-8 grid max-w-3xl grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-3xl border border-white/12 bg-white/8 px-5 py-4 shadow-[0_10px_26px_rgba(15,23,42,0.12)] backdrop-blur-sm">
                    <p className="text-2xl font-bold text-white [text-shadow:0_8px_24px_rgba(15,23,42,0.45)] sm:text-[1.65rem]">{stat.value}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-slate-100 [text-shadow:0_8px_24px_rgba(15,23,42,0.45)]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <motion.button
                type="button"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.45 }}
                whileHover={{ y: 3 }}
                className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-slate-100/85 transition hover:text-white"
              >
                Explore more
                <ChevronDown className="h-4 w-4 animate-bounce" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="relative z-20 -mt-px bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
        <section id="about" className={`${sectionShell} overflow-hidden`}>
          <div className="mx-auto w-full max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]"
            >
              <motion.div
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="max-w-3xl space-y-6 text-center lg:mx-auto"
              >
                <p className="inline-flex rounded-full border border-sky-500/15 bg-sky-500/8 px-3 py-1 text-sm font-semibold uppercase tracking-[0.28em] text-sky-500 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300">
                  About Us
                </p>

                <h2 className="mx-auto max-w-4xl text-balance font-display text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-5xl">
                  <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
                    A smarter digital foundation
                  </span>{' '}
                  for modern bus booking.
                </h2>

                <div className="space-y-5">
                  {aboutParagraphs.map((paragraph, index) => (
                    <motion.p
                      key={paragraph}
                      initial={{ opacity: 0, x: -18, filter: 'blur(8px)' }}
                      whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      className="mx-auto max-w-2xl rounded-[1.5rem] border border-slate-200/70 bg-white/75 px-5 py-4 text-base leading-8 text-slate-600 shadow-[0_16px_40px_rgba(148,163,184,0.10)] backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:shadow-none"
                    >
                      {index === 0 ? (
                        <>
                          <span className="font-semibold text-slate-900 dark:text-white">EthioBus</span> is designed to make{' '}
                          <span className="font-semibold text-sky-500 dark:text-sky-300">intercity travel feel easier, calmer, and more trustworthy</span>{' '}
                          from the very first interaction. The platform combines a cleaner booking flow with a more structured interface so passengers can understand routes, schedules, and ticket details without friction.
                        </>
                      ) : index === 1 ? (
                        <>
                          Instead of presenting travel information in a dense or outdated way, the experience focuses on{' '}
                          <span className="font-semibold text-slate-900 dark:text-white">clear hierarchy, polished visuals, and responsive layouts</span>{' '}
                          that adapt naturally across mobile, tablet, and desktop screens.
                        </>
                      ) : (
                        <>
                          The result is a frontend experience that feels closer to a real production travel product, where{' '}
                          <span className="font-semibold text-sky-500 dark:text-sky-300">speed, clarity, and confidence</span>{' '}
                          all work together to support better booking decisions.
                        </>
                      )}
                    </motion.p>
                  ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {aboutFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ delay: 0.12 + index * 0.08, duration: 0.4 }}
                      whileHover={{ scale: 1.03, y: -4 }}
                      className={`rounded-[28px] border p-5 transition duration-300 ${cardShell}`}
                    >
                      <div className="inline-flex rounded-2xl bg-gradient-to-br from-sky-500/15 to-indigo-500/15 p-3 text-sky-500 dark:text-sky-300">
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-lg font-bold text-slate-950 dark:text-white">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{feature.text}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
                className="relative lg:mx-auto lg:w-full lg:max-w-xl"
              >
                <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-sky-500/15 via-transparent to-indigo-500/15 blur-2xl" />
                <div className={`relative overflow-hidden rounded-[2.25rem] border p-5 shadow-[0_24px_70px_rgba(15,23,42,0.14)] ${cardShell}`}>
                  <div className="overflow-hidden rounded-[1.75rem]">
                    <img
                      src={busHeroImage}
                      alt="Passengers using a modern bus ticketing platform"
                      className="h-[420px] w-full object-cover transition duration-700 hover:scale-105"
                    />
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-sky-500/15 bg-sky-500/8 p-4 dark:border-sky-400/20 dark:bg-sky-400/10">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-500 dark:text-sky-300">Trusted UX</p>
                      <p className="mt-2 text-lg font-bold text-slate-950 dark:text-white">Built for clarity</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        Clean booking steps help users move from route search to confirmation with confidence.
                      </p>
                    </div>

                    <div className="rounded-[1.5rem] border border-white/60 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-500 dark:text-sky-300">Responsive</p>
                      <p className="mt-2 text-lg font-bold text-slate-950 dark:text-white">Ready on every screen</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        Balanced layouts and readable typography keep the interface strong across device sizes.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="services" className={sectionShell}>
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
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true, amount: 0.25 }}
                  className={`rounded-[30px] border p-6 transition duration-300 ${cardShell}`}
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

        <section id="projects" className={sectionShell}>
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
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  className={`rounded-[32px] border p-7 transition duration-300 ${cardShell}`}
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
                  whileHover={{ y: -4 }}
                  className={`rounded-[30px] border p-6 transition duration-300 ${cardShell}`}
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

        <section id="contact" className={sectionShell}>
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
                className={`rounded-[32px] border p-7 shadow-[0_24px_60px_rgba(15,23,42,0.12)] ${cardShell}`}
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
                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(59,130,246,0.24)]"
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
