import React from 'react'
import { motion } from 'framer-motion'
import { Bus, Globe2, ShieldCheck, Users } from 'lucide-react'

const AboutUs = () => {
  const stats = [
    { label: 'Passengers served', value: '50K+', icon: Users },
    { label: 'Connected cities', value: '25+', icon: Globe2 },
    { label: 'Daily departures', value: '120+', icon: Bus },
    { label: 'Trusted trips', value: '99%', icon: ShieldCheck },
  ]

  return (
    <div className="min-h-screen bg-slate-950 px-4 pb-20 pt-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">About Us</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-white">A modern bus experience built for confident travel</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            EthioBus is a frontend simulation of a modern ticketing platform designed to feel like a real startup product, from trip discovery to final ticket confirmation.
          </p>
        </motion.section>

        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} viewport={{ once: true }} className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300">
                <stat.icon className="h-6 w-6" />
              </div>
              <p className="mt-6 text-3xl font-black text-white">{stat.value}</p>
              <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
            </motion.div>
          ))}
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
            <h2 className="text-3xl font-black text-white">Why this product exists</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Intercity bus travel deserves the same clarity and polish that customers expect from premium booking products. This experience shows how the UI, routing, state, and admin tools can feel cohesive even before a backend exists.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[32px] border border-white/10 bg-gradient-to-br from-sky-500/15 to-indigo-500/15 p-8 backdrop-blur-2xl">
            <h2 className="text-3xl font-black text-white">What we focus on</h2>
            <ul className="mt-5 space-y-4 text-slate-200">
              <li>Seamless booking flow from search to ticket</li>
              <li>Professional interface with motion and clear hierarchy</li>
              <li>Mock admin tools that simulate real product workflows</li>
            </ul>
          </motion.div>
        </section>
      </div>
    </div>
  )
}

export default AboutUs
