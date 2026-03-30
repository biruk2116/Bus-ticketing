import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Bus, Clock3, Filter, MapPin, SlidersHorizontal, Star, Users, Wifi } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const BusList = () => {
  const navigate = useNavigate()
  const { filteredBuses, searchCriteria, chooseBus } = useAuth()
  const [sortBy, setSortBy] = useState('price')
  const [maxPrice, setMaxPrice] = useState(2000)

  const visibleBuses = useMemo(() => {
    const nextBuses = filteredBuses.filter((bus) => bus.price <= maxPrice)

    nextBuses.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price
      if (sortBy === 'departure') return a.departure.localeCompare(b.departure)
      if (sortBy === 'rating') return b.rating - a.rating
      return b.availableSeats - a.availableSeats
    })

    return nextBuses
  }, [filteredBuses, maxPrice, sortBy])

  return (
    <div className="min-h-screen bg-slate-950 px-4 pb-20 pt-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl sm:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Available trips</p>
              <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                {searchCriteria.from} to {searchCriteria.to}
              </h1>
              <p className="mt-3 text-slate-300">
                {searchCriteria.date} · {searchCriteria.passengers} passenger(s)
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate('/search')}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200"
              >
                Modify Search
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 px-5 py-3 text-sm font-semibold text-white"
              >
                Back Home
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl"
          >
            <div className="flex items-center gap-2 text-white">
              <Filter className="h-5 w-5 text-sky-300" />
              <h2 className="text-xl font-bold">Filter & Sort</h2>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <label htmlFor="sort-by" className="mb-2 block text-sm font-medium text-slate-300">Sort By</label>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-slate-100 outline-none focus:border-sky-400"
                >
                  <option value="price">Lowest Price</option>
                  <option value="departure">Departure Time</option>
                  <option value="rating">Highest Rating</option>
                  <option value="seats">More Seats</option>
                </select>
              </div>

              <div>
                <label htmlFor="max-price" className="mb-2 block text-sm font-medium text-slate-300">Max Price: ETB {maxPrice}</label>
                <input
                  id="max-price"
                  type="range"
                  min="500"
                  max="2000"
                  step="50"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(Number(event.target.value))}
                  className="w-full accent-sky-400"
                />
              </div>
            </div>
          </motion.aside>

          <div className="space-y-5">
            {visibleBuses.length === 0 ? (
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-12 text-center backdrop-blur-2xl">
                <Bus className="mx-auto h-14 w-14 text-slate-500" />
                <h2 className="mt-5 text-2xl font-bold text-white">No buses found</h2>
                <p className="mt-3 text-slate-300">Try another route or increase your price filter.</p>
              </div>
            ) : (
              visibleBuses.map((bus, index) => (
                <motion.div
                  key={bus.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="rounded-[30px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.32)] backdrop-blur-2xl"
                >
                  <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-sky-400/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-sky-300">
                          {bus.type}
                        </span>
                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">{bus.routeCode}</span>
                      </div>

                      <h2 className="mt-4 text-2xl font-bold text-white">{bus.company}</h2>

                      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Route</p>
                          <p className="mt-2 text-sm text-slate-200">
                            <span className="font-medium">{bus.from}</span>
                            <span className="mx-2 text-indigo-300">→</span>
                            <span className="font-medium">{bus.to}</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Time</p>
                          <p className="mt-2 text-sm text-slate-200">{bus.departure} - {bus.arrival}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Duration</p>
                          <p className="mt-2 text-sm text-slate-200">{bus.duration}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Available</p>
                          <p className="mt-2 text-sm text-emerald-300">{bus.availableSeats} seats</p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {bus.amenities.map((amenity) => (
                          <span key={amenity} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="w-full xl:w-64">
                      <div className="rounded-[26px] border border-white/10 bg-slate-950/55 p-5">
                        <div className="flex items-center justify-between text-sm text-slate-300">
                          <span className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-amber-300" />
                            {bus.rating}
                          </span>
                          <span className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-emerald-300" />
                            {searchCriteria.passengers} pax
                          </span>
                        </div>

                        <div className="mt-6 text-3xl font-black text-white">ETB {bus.price}</div>
                        <p className="mt-1 text-sm text-slate-400">per passenger</p>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={() => {
                            chooseBus(bus)
                            navigate('/seats')
                          }}
                          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 px-5 py-3 text-sm font-semibold text-white"
                        >
                          Select Bus
                          <ArrowRight className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusList
