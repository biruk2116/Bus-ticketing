import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Search } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const cities = ['Addis Ababa', 'Gondar', 'Hawassa', 'Bahir Dar', 'Dire Dawa', 'Jimma', 'Adama', 'Mekelle']

const backgroundImage =
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80'

const Home = () => {
  const navigate = useNavigate()
  const { runSearch } = useAuth()
  const [formData, setFormData] = useState(() => ({
    from: 'Addis Ababa',
    to: 'Gondar',
    date: new Date().toISOString().split('T')[0],
  }))

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.from || !formData.to || !formData.date) {
      toast.error('Please complete all fields')
      return
    }

    if (formData.from === formData.to) {
      toast.error('Departure and destination must be different')
      return
    }

    runSearch({
      ...formData,
      passengers: 1,
    })
    navigate('/buses')
  }

  return (
    <div
      className="relative min-h-screen bg-slate-950 bg-cover bg-center bg-no-repeat text-white"
      style={{
        fontFamily: 'Inter, Poppins, system-ui, sans-serif',
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/40" />
      <div className="absolute inset-0 bg-black/30" />

      <section className="relative z-10 flex min-h-screen items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_520px]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
          >
            <p className="text-sm font-medium uppercase tracking-[0.26em] text-gray-200">
              Reliable bus travel across Ethiopia
            </p>

            <h1 className="mt-5 text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
              Travel smart with easier ticket booking.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-200 sm:text-base lg:mx-0">
              Book routes faster, compare departures clearly, and move from search to seat selection in a cleaner flow.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7 }}
            className="mx-auto w-full max-w-xl"
          >
            <form
              onSubmit={handleSubmit}
              className="grid gap-4 rounded-xl border border-white/20 bg-white/10 p-5 shadow-lg backdrop-blur-lg sm:p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="hero-from" className="mb-2 block text-sm font-medium text-white">
                    From
                  </label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-200" />
                    <select
                      id="hero-from"
                      value={formData.from}
                      onChange={(event) =>
                        setFormData((current) => ({ ...current, from: event.target.value }))
                      }
                      className="h-12 w-full rounded-xl border border-white/20 bg-white/20 pl-11 pr-4 text-sm text-white backdrop-blur-md outline-none focus:border-blue-400"
                    >
                      {cities.map((city) => (
                        <option key={city} value={city} className="bg-slate-900 text-white">
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="hero-to" className="mb-2 block text-sm font-medium text-white">
                    To
                  </label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-200" />
                    <select
                      id="hero-to"
                      value={formData.to}
                      onChange={(event) =>
                        setFormData((current) => ({ ...current, to: event.target.value }))
                      }
                      className="h-12 w-full rounded-xl border border-white/20 bg-white/20 pl-11 pr-4 text-sm text-white backdrop-blur-md outline-none focus:border-blue-400"
                    >
                      {cities
                        .filter((city) => city !== formData.from)
                        .map((city) => (
                          <option key={city} value={city} className="bg-slate-900 text-white">
                            {city}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-[1fr_160px]">
                <div>
                  <label htmlFor="hero-date" className="mb-2 block text-sm font-medium text-white">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-200" />
                    <input
                      id="hero-date"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(event) =>
                        setFormData((current) => ({ ...current, date: event.target.value }))
                      }
                      className="h-12 w-full rounded-xl border border-white/20 bg-white/20 pl-11 pr-4 text-sm text-white backdrop-blur-md outline-none focus:border-blue-400"
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 text-sm font-semibold text-white transition hover:bg-blue-600"
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
