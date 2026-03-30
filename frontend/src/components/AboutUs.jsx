import React from 'react'
import { motion } from 'framer-motion'
import { Bus, Globe2, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const stats = [
  { label: 'Passengers served', value: '50K+', icon: Users },
  { label: 'Connected cities', value: '25+', icon: Globe2 },
  { label: 'Daily departures', value: '120+', icon: Bus },
  { label: 'Trusted trips', value: '99%', icon: ShieldCheck },
]

const values = [
  {
    title: 'Clear trip discovery',
    text: 'Passengers should understand routes, timing, pricing, and seat flow without friction.',
  },
  {
    title: 'Comfort-first interface',
    text: 'The design language focuses on calm contrast, readable text, and confident next steps.',
  },
  {
    title: 'Product realism',
    text: 'Even with mock data, every screen is structured to feel like a polished transport product.',
  },
]

const AboutUs = () => {
  const { darkMode } = useAuth()
  return (
    <div className="min-h-screen bg-slate-50 px-4 pb-20 pt-8 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,_rgba(14,165,233,0.16),_rgba(79,70,229,0.18),_rgba(15,23,42,0.88))] p-8 backdrop-blur-2xl sm:p-12"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">About Us</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl">
            Designed to make bus ticketing feel calm, modern, and trustworthy.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            EthioBus is a polished frontend concept for modern intercity travel. The goal is simple:
            turn a usually confusing booking process into something elegant, readable, and easy to trust.
          </p>
        </motion.section>

        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className={`rounded-[28px] border p-6 backdrop-blur-2xl ${
                darkMode
                  ? 'border-white/10 bg-white/5'
                  : 'border-slate-200/80 bg-white/85 shadow-[0_18px_45px_rgba(148,163,184,0.16)]'
              }`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300">
                <stat.icon className="h-6 w-6" />
              </div>
              <p className={`mt-6 text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>{stat.value}</p>
              <p className={`mt-2 text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{stat.label}</p>
            </motion.div>
          ))}
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`rounded-[32px] border p-8 backdrop-blur-2xl ${
              darkMode
                ? 'border-white/10 bg-white/5'
                : 'border-slate-200/80 bg-white/88 shadow-[0_18px_45px_rgba(148,163,184,0.16)]'
            }`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-300">Our Story</p>
            <h2 className={`mt-4 text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>Why this platform matters</h2>
            <p className={`mt-5 text-lg leading-8 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Booking a bus should not feel dated or stressful. This experience is designed around
              the feeling passengers expect from premium travel products: faster search, stronger
              clarity, cleaner seat selection, and a ticketing flow that feels dependable from start to finish.
            </p>
            <p className={`mt-4 text-lg leading-8 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              The product direction focuses on confidence. Every decision, from hierarchy to animation,
              helps people understand where they are and what comes next.
            </p>
          </motion.div>

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
            <h2 className={`mt-6 text-3xl font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>What we focus on</h2>
            <div className="mt-6 space-y-4">
              {values.map((value) => (
                <div key={value.title} className={`rounded-3xl border p-5 ${darkMode ? 'border-white/10 bg-white/5' : 'border-slate-200/70 bg-white/70'}`}>
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-950'}`}>{value.title}</h3>
                  <p className={`mt-2 text-sm leading-7 ${darkMode ? 'text-slate-200' : 'text-slate-600'}`}>{value.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}

export default AboutUs
