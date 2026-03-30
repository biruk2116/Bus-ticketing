import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Clock3, Mail, MapPin, Phone, SendHorizonal } from 'lucide-react'

const contactCards = [
  { icon: Phone, title: 'Phone Support', value: '+251-911-223344', text: 'Reach the team for booking and ticket assistance.' },
  { icon: Mail, title: 'Email', value: 'support@ethiobus.com', text: 'Use email for feedback, account help, or general support.' },
  { icon: MapPin, title: 'Head Office', value: 'Bole Road, Addis Ababa', text: 'The central support point for our transport operations.' },
  { icon: Clock3, title: 'Working Hours', value: 'Mon - Sat, 8:00 AM - 8:00 PM', text: 'Designed to support passengers across key travel windows.' },
]

const Contacts = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const submitForm = (event) => {
    event.preventDefault()
    toast.success('Message sent successfully')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 pb-20 pt-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,_rgba(14,165,233,0.16),_rgba(79,70,229,0.18),_rgba(15,23,42,0.88))] p-8 backdrop-blur-2xl sm:p-12"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Contact</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl">
            Support that feels clear, calm, and easy to reach.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            This page mirrors the homepage mood with clearer wording, stronger structure, and a more premium support layout.
          </p>
        </motion.section>

        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-1">
            {contactCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-300">
                  <card.icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-xl font-bold text-white">{card.title}</h2>
                <p className="mt-2 text-sm font-medium text-slate-100">{card.value}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{card.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={submitForm}
            className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl sm:p-8"
          >
            <h2 className="text-3xl font-black text-white">Send a message</h2>
            <p className="mt-3 text-slate-300">
              Tell us what you need help with, and the message flow stays simple and easy to scan.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              {[
                ['name', 'Your name', 'text'],
                ['email', 'Email address', 'email'],
                ['subject', 'Subject', 'text'],
              ].map(([key, label, type]) => (
                <div key={key} className={key === 'subject' ? 'md:col-span-2' : ''}>
                  <label className="mb-2 block text-sm font-medium text-slate-300">{label}</label>
                  <input
                    type={type}
                    value={formData[key]}
                    onChange={(event) => setFormData((current) => ({ ...current, [key]: event.target.value }))}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-slate-100 outline-none focus:border-sky-400"
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-300">Message</label>
                <textarea
                  rows="6"
                  value={formData.message}
                  onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 text-slate-100 outline-none focus:border-sky-400"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 px-6 py-4 text-sm font-semibold text-white"
            >
              <SendHorizonal className="h-4 w-4" />
              Send Message
            </motion.button>
          </motion.form>
        </section>
      </div>
    </div>
  )
}

export default Contacts
