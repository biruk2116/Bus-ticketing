import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRightLeft, Calendar, MapPin, Search, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const cities = ['Addis Ababa', 'Gondar', 'Hawassa', 'Bahir Dar', 'Dire Dawa', 'Jimma', 'Adama', 'Mekelle']

const BusSearch = () => {
  const navigate = useNavigate()
  const { searchCriteria, runSearch, darkMode } = useAuth()
  const [formData, setFormData] = useState(searchCriteria)

  const surfaceClass = darkMode
    ? 'border-white/10 bg-white/5'
    : 'border-slate-200/80 bg-white/90 shadow-[0_20px_70px_rgba(148,163,184,0.16)]'
  const fieldClass = darkMode
    ? 'border-white/10 bg-slate-950/60 text-slate-100'
    : 'border-slate-200 bg-slate-50 text-slate-900'
  const helperClass = darkMode ? 'text-slate-300' : 'text-slate-600'

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.from || !formData.to || !formData.date) {
      toast.error('Please complete all search fields')
      return
    }

    if (formData.from === formData.to) {
      toast.error('Departure and destination must be different')
      return
    }

    runSearch(formData)
    navigate('/buses')
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 pb-20 pt-8 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,_rgba(14,165,233,0.15),_rgba(99,102,241,0.16),_rgba(15,23,42,0.88))] p-8 backdrop-blur-xl sm:p-10"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Search</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Find the best bus for your next trip</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-200">
            Search routes, compare trips, and move into the booking flow with a cleaner professional layout.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-[32px] border p-6 backdrop-blur-2xl sm:p-8 ${surfaceClass}`}
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr_1fr_180px_180px]">
            <div>
              <label htmlFor="search-from" className={`mb-2 block text-sm font-medium ${helperClass}`}>From</label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400" />
                <select
                  id="search-from"
                  value={formData.from}
                  onChange={(event) => setFormData((current) => ({ ...current, from: event.target.value }))}
                  className={`h-14 w-full rounded-2xl border pl-11 pr-4 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 ${fieldClass}`}
                >
                  {cities.map((city) => (
                    <option key={city} value={city} className="bg-slate-950 text-white">
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="search-to" className={`mb-2 block text-sm font-medium ${helperClass}`}>To</label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-400" />
                <select
                  id="search-to"
                  value={formData.to}
                  onChange={(event) => setFormData((current) => ({ ...current, to: event.target.value }))}
                  className={`h-14 w-full rounded-2xl border pl-11 pr-4 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 ${fieldClass}`}
                >
                  {cities.filter((city) => city !== formData.from).map((city) => (
                    <option key={city} value={city} className="bg-slate-950 text-white">
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="search-date" className={`mb-2 block text-sm font-medium ${helperClass}`}>Date</label>
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fuchsia-400" />
                <input
                  id="search-date"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={(event) => setFormData((current) => ({ ...current, date: event.target.value }))}
                  className={`h-14 w-full rounded-2xl border pl-11 pr-4 outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/20 ${fieldClass}`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="search-passengers" className={`mb-2 block text-sm font-medium ${helperClass}`}>Passengers</label>
              <div className="relative">
                <Users className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400" />
                <input
                  id="search-passengers"
                  type="number"
                  min="1"
                  max="6"
                  value={formData.passengers}
                  onChange={(event) => setFormData((current) => ({ ...current, passengers: Number(event.target.value) }))}
                  className={`h-14 w-full rounded-2xl border pl-11 pr-4 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 ${fieldClass}`}
                />
              </div>
            </div>

            <div className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-6 font-semibold text-white shadow-[0_25px_60px_rgba(56,189,248,0.24)]"
              >
                <Search className="h-4 w-4" />
                Search
              </motion.button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              ['Addis Ababa', 'Gondar'],
              ['Addis Ababa', 'Hawassa'],
              ['Dire Dawa', 'Adama'],
            ].map(([from, to]) => (
              <button
                key={`${from}-${to}`}
                type="button"
                onClick={() => setFormData((current) => ({ ...current, from, to }))}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  darkMode
                    ? 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  {from}
                  <ArrowRightLeft className="h-3.5 w-3.5 text-slate-400" />
                  {to}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default BusSearch
