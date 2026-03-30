import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Clock3, Mail, MapPin, Phone } from 'lucide-react'

const Contacts = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const submitForm = (event) => {
    event.preventDefault()
    toast.success('Message sent successfully')
    setFormData({ name: '', email: '', message: '' })
  }

  const contactCards = [
    { icon: Phone, title: 'Phone', value: '+251-911-223344' },
    { icon: Mail, title: 'Email', value: 'support@ethiobus.com' },
    { icon: MapPin, title: 'Address', value: 'Bole Road, Addis Ababa' },
    { icon: Clock3, title: 'Hours', value: 'Mon - Sat, 8:00 AM - 8:00 PM' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 px-4 pb-20 pt-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Contact</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-white">Talk to the team behind the experience</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            This contact page is part of the frontend simulation and keeps the same polished style as the rest of the product.
          </p>
        </motion.section>

        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-1">
            {contactCards.map((card, index) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} viewport={{ once: true }} className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300">
                  <card.icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-xl font-bold text-white">{card.title}</h2>
                <p className="mt-2 text-slate-300">{card.value}</p>
              </motion.div>
            ))}
          </div>

          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={submitForm} className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl sm:p-8">
            <h2 className="text-2xl font-bold text-white">Send a message</h2>
            <div className="mt-6 space-y-5">
              {[
                ['name', 'Your name', 'text'],
                ['email', 'Email address', 'email'],
              ].map(([key, label, type]) => (
                <div key={key}>
                  <label className="mb-2 block text-sm font-medium text-slate-300">{label}</label>
                  <input
                    type={type}
                    value={formData[key]}
                    onChange={(event) => setFormData((current) => ({ ...current, [key]: event.target.value }))}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-slate-100 outline-none focus:border-sky-400"
                  />
                </div>
              ))}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">Message</label>
                <textarea
                  rows="6"
                  value={formData.message}
                  onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 text-slate-100 outline-none focus:border-sky-400"
                />
              </div>
              <button type="submit" className="inline-flex rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 px-6 py-4 text-sm font-semibold text-white">
                Send Message
              </button>
            </div>
          </motion.form>
        </section>
      </div>
    </div>
  )
}

export default Contacts
