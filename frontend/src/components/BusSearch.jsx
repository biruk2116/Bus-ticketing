import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRightLeft,
  Calendar,
  MapPin,
  Search,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import PageShell from './ui/PageShell'
import Panel from './ui/Panel'
import SectionHero from './ui/SectionHero'
import Field from './ui/Field'
import Button from './ui/Button'
import StatusBadge from './ui/StatusBadge'
import { bodyClass, cn, mutedClass } from '../lib/ui'

const cities = ['Addis Ababa', 'Gondar', 'Hawassa', 'Bahir Dar', 'Dire Dawa', 'Jimma', 'Adama', 'Mekelle']

const quickRoutes = [
  { from: 'Addis Ababa', to: 'Gondar', tone: 'default' },
  { from: 'Addis Ababa', to: 'Hawassa', tone: 'success' },
  { from: 'Dire Dawa', to: 'Adama', tone: 'warning' },
]

const insights = [
  { label: 'Fastest booking path', value: 'Search, pick, pay in minutes' },
  { label: 'Best mobile experience', value: 'Responsive form and larger tap targets' },
  { label: 'Clearer confidence cues', value: 'Live route chips and stronger validation' },
]

const BusSearch = () => {
  const navigate = useNavigate()
  const { searchCriteria, runSearch } = useAuth()
  const [formData, setFormData] = useState(searchCriteria)

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
    <PageShell>
      <div className="space-y-8">
        <SectionHero
          eyebrow="Search Trips"
          title="Plan a smoother trip with a cleaner, production-style booking search."
          description="A modern search surface with stronger hierarchy, better spacing, and clearer next steps for passengers moving into route selection."
          action={
            <div className="flex flex-wrap gap-3">
              <StatusBadge variant="success">Mobile-first</StatusBadge>
              <StatusBadge variant="default">Dark mode ready</StatusBadge>
              <StatusBadge variant="warning">Accessible focus states</StatusBadge>
            </div>
          }
        />

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <Panel className="overflow-hidden">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500 dark:text-sky-300">
                  Find your route
                </p>
                <h1 className="mt-3 font-display text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">
                  Search with less friction and more confidence
                </h1>
                <p className={cn('mt-4 max-w-xl text-sm leading-7 sm:text-base', bodyClass)}>
                  Compare destinations, travel dates, and passenger count from one polished control panel built for real booking flows.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-sky-500/15 bg-sky-500/10 p-4 text-sm text-sky-700 dark:text-sky-300">
                <div className="flex items-center gap-2 font-semibold">
                  <Sparkles className="h-4 w-4" />
                  Refined search UX
                </div>
                <p className="mt-2 max-w-xs leading-6">
                  Floating fields, higher contrast, and responsive layout make the first step feel premium.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_180px]">
              <Field
                as="select"
                label="Departure city"
                icon={MapPin}
                value={formData.from}
                onChange={(event) => setFormData((current) => ({ ...current, from: event.target.value }))}
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </Field>

              <Field
                as="select"
                label="Arrival city"
                icon={MapPin}
                value={formData.to}
                onChange={(event) => setFormData((current) => ({ ...current, to: event.target.value }))}
              >
                {cities.filter((city) => city !== formData.from).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </Field>

              <Field
                label="Travel date"
                type="date"
                icon={Calendar}
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={(event) => setFormData((current) => ({ ...current, date: event.target.value }))}
              />

              <Field
                label="Passengers"
                type="number"
                min="1"
                max="6"
                icon={Users}
                value={formData.passengers}
                onChange={(event) => setFormData((current) => ({ ...current, passengers: Number(event.target.value) }))}
              />

              <div className="md:col-span-2 xl:col-span-4 flex flex-col gap-4 border-t border-slate-200/70 pt-4 dark:border-white/10 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-3">
                  {quickRoutes.map((route) => (
                    <button
                      key={`${route.from}-${route.to}`}
                      type="button"
                      onClick={() => setFormData((current) => ({ ...current, from: route.from, to: route.to }))}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-300 hover:text-sky-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-sky-400/40 dark:hover:text-sky-300"
                    >
                      {route.from}
                      <ArrowRightLeft className="h-3.5 w-3.5 text-slate-400" />
                      {route.to}
                    </button>
                  ))}
                </div>

                <Button type="submit" size="lg" icon={Search} className="w-full sm:w-auto">
                  Search Available Buses
                </Button>
              </div>
            </form>
          </Panel>

          <div className="space-y-6">
            <Panel variant="muted" className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-300">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-slate-950 dark:text-white">Why this search feels better</p>
                  <p className={cn('text-sm', mutedClass)}>Built to guide passengers forward without clutter.</p>
                </div>
              </div>

              <div className="space-y-3">
                {insights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.5rem] border border-slate-200/70 bg-white/85 p-4 dark:border-white/10 dark:bg-white/5"
                  >
                    <p className={cn('text-xs font-semibold uppercase tracking-[0.22em]', mutedClass)}>{item.label}</p>
                    <p className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-100">{item.value}</p>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel className="bg-[linear-gradient(160deg,rgba(14,165,233,0.12),rgba(79,70,229,0.12),rgba(255,255,255,0.82))] dark:bg-[linear-gradient(160deg,rgba(14,165,233,0.12),rgba(79,70,229,0.16),rgba(15,23,42,0.7))]">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-sky-500 dark:text-sky-300">
                Booking flow
              </p>
              <div className="mt-4 grid gap-3">
                {['Search your route', 'Compare available buses', 'Select seats and confirm payment'].map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-center gap-3 rounded-[1.5rem] border border-white/40 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white dark:bg-white dark:text-slate-950">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-100">{step}</span>
                  </motion.div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </PageShell>
  )
}

export default BusSearch
