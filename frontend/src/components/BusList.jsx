import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Bus,
  Clock3,
  Filter,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import PageShell from './ui/PageShell'
import Panel from './ui/Panel'
import SectionHero from './ui/SectionHero'
import Button from './ui/Button'
import StatusBadge from './ui/StatusBadge'
import { bodyClass, cn, mutedClass } from '../lib/ui'

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
    <PageShell>
      <div className="space-y-8">
        <SectionHero
          eyebrow="Available Buses"
          title={`${searchCriteria.from} to ${searchCriteria.to}`}
          description={`Choose the trip that best matches your timing and budget for ${searchCriteria.date}. The layout is optimized for quick scanning on mobile and desktop.`}
          action={
            <div className="flex flex-wrap gap-3">
              <StatusBadge variant="default">{searchCriteria.passengers} passenger(s)</StatusBadge>
              <StatusBadge variant="success">{visibleBuses.length} trips found</StatusBadge>
            </div>
          }
        />

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <Panel className="h-fit space-y-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-sky-500/10 p-3 text-sky-600 dark:text-sky-300">
                <Filter className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-slate-950 dark:text-white">Filter and sort</h2>
                <p className={cn('text-sm', mutedClass)}>Refine price, timing, and seat availability.</p>
              </div>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Sort trips</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="input-field"
              >
                <option value="price">Lowest price</option>
                <option value="departure">Departure time</option>
                <option value="rating">Highest rating</option>
                <option value="seats">Most seats left</option>
              </select>
            </label>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-600 dark:text-slate-300">
                <span>Budget ceiling</span>
                <span>ETB {maxPrice}</span>
              </div>
              <input
                type="range"
                min="500"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                className="w-full accent-sky-500"
              />
            </div>

            <div className="rounded-[1.5rem] border border-emerald-500/15 bg-emerald-500/8 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                <ShieldCheck className="h-4 w-4" />
                Faster decision making
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Cards emphasize route clarity, seat confidence, and a prominent booking CTA.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button variant="secondary" icon={Search} onClick={() => navigate('/search')}>
                Modify Search
              </Button>
              <Button variant="ghost" onClick={() => navigate('/')}>
                Back Home
              </Button>
            </div>
          </Panel>

          <div className="space-y-5">
            {visibleBuses.length === 0 ? (
              <Panel className="py-14 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-500">
                  <Bus className="h-8 w-8" />
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold text-slate-950 dark:text-white">No buses found</h2>
                <p className={cn('mx-auto mt-3 max-w-md text-sm leading-7', bodyClass)}>
                  Try changing the route, increasing the budget filter, or selecting a different travel date.
                </p>
              </Panel>
            ) : (
              visibleBuses.map((bus, index) => (
                <motion.article
                  key={bus.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Panel className="overflow-hidden p-0">
                    <div className="grid gap-0 xl:grid-cols-[1.2fr_0.8fr]">
                      <div className="p-6 sm:p-8">
                        <div className="flex flex-wrap items-center gap-3">
                          <StatusBadge>{bus.type}</StatusBadge>
                          <StatusBadge variant="neutral">{bus.routeCode}</StatusBadge>
                          <StatusBadge variant="warning">
                            <Star className="mr-1 h-3.5 w-3.5" />
                            {bus.rating}
                          </StatusBadge>
                        </div>

                        <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                          <div>
                            <h2 className="font-display text-2xl font-bold text-slate-950 dark:text-white">{bus.company}</h2>
                            <p className={cn('mt-2 text-sm', bodyClass)}>
                              {bus.from} to {bus.to}
                            </p>
                          </div>
                          <div className="rounded-[1.5rem] border border-slate-200/70 bg-slate-50/90 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                            <p className={cn('text-xs uppercase tracking-[0.22em]', mutedClass)}>Available seats</p>
                            <p className="mt-1 text-lg font-semibold text-emerald-600 dark:text-emerald-300">{bus.availableSeats}</p>
                          </div>
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                          <div className="rounded-[1.5rem] border border-slate-200/70 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/5">
                            <p className={cn('text-xs uppercase tracking-[0.22em]', mutedClass)}>Departure</p>
                            <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">{bus.departure}</p>
                          </div>
                          <div className="rounded-[1.5rem] border border-slate-200/70 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/5">
                            <p className={cn('text-xs uppercase tracking-[0.22em]', mutedClass)}>Arrival</p>
                            <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">{bus.arrival}</p>
                          </div>
                          <div className="rounded-[1.5rem] border border-slate-200/70 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/5">
                            <p className={cn('text-xs uppercase tracking-[0.22em]', mutedClass)}>Duration</p>
                            <p className="mt-2 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
                              <Clock3 className="h-4 w-4 text-sky-500" />
                              {bus.duration}
                            </p>
                          </div>
                          <div className="rounded-[1.5rem] border border-slate-200/70 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/5">
                            <p className={cn('text-xs uppercase tracking-[0.22em]', mutedClass)}>Passengers</p>
                            <p className="mt-2 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
                              <Users className="h-4 w-4 text-emerald-500" />
                              {searchCriteria.passengers} seat(s)
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {bus.amenities.map((amenity) => (
                            <span
                              key={amenity}
                              className="rounded-full border border-slate-200 bg-white/85 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-slate-200/70 bg-[linear-gradient(160deg,rgba(14,165,233,0.08),rgba(79,70,229,0.08),rgba(255,255,255,0.9))] p-6 dark:border-white/10 dark:bg-[linear-gradient(160deg,rgba(14,165,233,0.1),rgba(79,70,229,0.12),rgba(15,23,42,0.72))] sm:p-8 xl:border-l xl:border-t-0">
                        <div className="flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-300">
                          <Sparkles className="h-4 w-4" />
                          Best for a polished booking flow
                        </div>
                        <div className="mt-6">
                          <p className={cn('text-xs uppercase tracking-[0.22em]', mutedClass)}>Price per passenger</p>
                          <div className="mt-2 font-display text-4xl font-bold text-slate-950 dark:text-white">
                            ETB {bus.price}
                          </div>
                        </div>

                        <div className="mt-6 space-y-3">
                          <div className="flex items-center justify-between rounded-[1.25rem] border border-white/40 bg-white/70 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5">
                            <span className={bodyClass}>Trip style</span>
                            <span className="font-semibold text-slate-900 dark:text-white">{bus.type}</span>
                          </div>
                          <div className="flex items-center justify-between rounded-[1.25rem] border border-white/40 bg-white/70 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5">
                            <span className={bodyClass}>Route code</span>
                            <span className="font-semibold text-slate-900 dark:text-white">{bus.routeCode}</span>
                          </div>
                        </div>

                        <Button
                          className="mt-6 w-full"
                          size="lg"
                          iconRight={ArrowRight}
                          onClick={() => {
                            chooseBus(bus)
                            navigate('/seats')
                          }}
                        >
                          Select Bus
                        </Button>
                      </div>
                    </div>
                  </Panel>
                </motion.article>
              ))
            )}
          </div>
        </div>
      </div>
    </PageShell>
  )
}

export default BusList
