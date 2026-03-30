import React from 'react'
import { motion } from 'framer-motion'
import { Bus, Clock3, CreditCard, Headphones, ShieldCheck, Wifi } from 'lucide-react'

const services = [
  { icon: Bus, title: 'Premium Coaches', text: 'Modern fleet presentation with route and seat transparency.' },
  { icon: ShieldCheck, title: 'Safer Bookings', text: 'Structured flows that reduce confusion and booking mistakes.' },
  { icon: Clock3, title: 'Real-time Feel', text: 'Trip cards and availability built to look like a production app.' },
  { icon: CreditCard, title: 'Flexible Payments', text: 'Mock card and mobile flows with realistic checkout UX.' },
  { icon: Headphones, title: 'Support Ready', text: 'Passenger info and booking summary keep the process clear.' },
  { icon: Wifi, title: 'Digital Convenience', text: 'Responsive pages, route filters, and a clean ticket experience.' },
]

const Services = () => (
  <div className="min-h-screen bg-slate-950 px-4 pb-20 pt-8 text-white sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Services</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-white">Built like a real bus-booking platform</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          The service layer in this frontend showcases the value proposition passengers expect from a serious transport product.
        </p>
      </motion.section>

      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} viewport={{ once: true }} whileHover={{ y: -8 }} className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400/20 to-indigo-500/20 text-sky-300">
              <service.icon className="h-6 w-6" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-white">{service.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{service.text}</p>
          </motion.div>
        ))}
      </section>
    </div>
  </div>
)

export default Services
