import React from 'react'
import { motion } from 'framer-motion'
import { Bus, Clock3, CreditCard, Headphones, ShieldCheck, Sparkles, Wifi } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const services = [
  {
    icon: Bus,
    title: 'Premium Coaches',
    text: 'Vehicle listings highlight route clarity, travel timing, and seat confidence before checkout.',
  },
  {
    icon: ShieldCheck,
    title: 'Safer Booking Flow',
    text: 'The UI emphasizes clarity and review steps so passengers can book with fewer mistakes.',
  },
  {
    icon: Clock3,
    title: 'Faster Discovery',
    text: 'Search, route comparison, and bus selection are structured for quick decision-making.',
  },
  {
    icon: CreditCard,
    title: 'Flexible Payments',
    text: 'Card, mobile money, and terminal payment flows are presented with production-style polish.',
  },
  {
    icon: Headphones,
    title: 'Support Ready Experience',
    text: 'From booking summary to ticket view, the interface feels guided and reassuring.',
  },
  {
    icon: Wifi,
    title: 'Digital Convenience',
    text: 'Responsive layouts and clear UI patterns help the product feel current on every screen size.',
  },
]

const packages = [
  {
    name: 'Comfort',
    subtitle: 'Balanced value for daily travel',
    description: 'Perfect for passengers who want a smooth, simple trip with clear essentials.',
  },
  {
    name: 'Business',
    subtitle: 'For people who value speed and polish',
    description: 'Adds a more premium feel with stronger convenience and priority in the flow.',
  },
  {
    name: 'Executive',
    subtitle: 'For the highest comfort expectation',
    description: 'Built around the idea of a more elevated end-to-end transport experience.',
  },
]

const Services = () => {
  const { darkMode } = useAuth()

  return (
    <div className="min-h-screen bg-slate-50 px-4 pb-20 pt-8 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,_rgba(14,165,233,0.16),_rgba(79,70,229,0.18),_rgba(15,23,42,0.88))] p-8 backdrop-blur-2xl sm:p-12"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Services</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl">
            Features and service layers that make the product feel premium.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            Every service touchpoint is written and styled to support clarity, confidence, and a more
            attractive booking experience.
          </p>
        </motion.section>

        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className={`rounded-[30px] border p-6 backdrop-blur-2xl ${
                darkMode
                  ? 'border-white/10 bg-white/5'
                  : 'border-slate-200/80 bg-white/88 shadow-[0_18px_45px_rgba(148,163,184,0.16)]'
              }`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400/20 to-indigo-500/20 text-sky-300">
                <service.icon className="h-6 w-6" />
              </div>
              <h2 className={`mt-6 text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-950'}`}>
                {service.title}
              </h2>
              <p className={`mt-3 text-sm leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {service.text}
              </p>
            </motion.div>
          ))}
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`rounded-[32px] border p-8 backdrop-blur-2xl ${
              darkMode
                ? 'border-white/10 bg-gradient-to-br from-sky-500/15 to-indigo-500/15'
                : 'border-slate-200/80 bg-gradient-to-br from-sky-100/90 to-indigo-100/90 shadow-[0_18px_45px_rgba(148,163,184,0.16)]'
            }`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-sky-300">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className={`mt-6 text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>
              Why these services matter
            </h2>
            <p className={`mt-5 text-lg leading-8 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
              In a strong travel product, "services" are not extra decoration. They are the reasons users
              trust the flow enough to finish a booking.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className={`rounded-[30px] border p-6 backdrop-blur-2xl ${
                  darkMode
                    ? 'border-white/10 bg-white/5'
                    : 'border-slate-200/80 bg-white/88 shadow-[0_18px_45px_rgba(148,163,184,0.16)]'
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">{pkg.name}</p>
                <h3 className={`mt-4 text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-950'}`}>
                  {pkg.subtitle}
                </h3>
                <p className={`mt-3 text-sm leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {pkg.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Services
