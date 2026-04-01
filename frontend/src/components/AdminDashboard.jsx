import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BarChart3,
  Bus,
  CalendarRange,
  LayoutDashboard,
  MapPinned,
  Pencil,
  Plus,
  ReceiptText,
  Sparkles,
  Trash2,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import PageShell from './ui/PageShell'
import Panel from './ui/Panel'
import SectionHero from './ui/SectionHero'
import Field from './ui/Field'
import Button from './ui/Button'
import StatusBadge from './ui/StatusBadge'
import { bodyClass, cn, mutedClass } from '../lib/ui'

const emptyBus = {
  company: '',
  type: '',
  from: '',
  to: '',
  departure: '',
  arrival: '',
  duration: '',
  price: 900,
  totalSeats: 40,
  routeCode: '',
  amenities: ['WiFi'],
}

const statusTone = {
  Confirmed: 'success',
  Cancelled: 'danger',
}

const AdminDashboard = () => {
  const { user, buses, bookings, addBus, updateBus, deleteBus } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [draftBus, setDraftBus] = useState(emptyBus)
  const [editingId, setEditingId] = useState(null)

  const stats = useMemo(
    () => [
      { label: 'Fleet size', value: buses.length, icon: Bus },
      { label: 'Bookings', value: bookings.length, icon: ReceiptText },
      { label: 'Routes', value: new Set(buses.map((bus) => `${bus.from}-${bus.to}`)).size, icon: MapPinned },
      { label: 'Revenue', value: `ETB ${bookings.reduce((sum, booking) => sum + booking.totalAmount, 0)}`, icon: BarChart3 },
    ],
    [buses, bookings],
  )

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'buses', label: 'Manage buses', icon: Bus },
    { id: 'routes', label: 'Routes', icon: CalendarRange },
    { id: 'bookings', label: 'Bookings', icon: ReceiptText },
  ]

  const submitBus = (event) => {
    event.preventDefault()

    if (editingId) {
      updateBus(editingId, draftBus)
      setEditingId(null)
    } else {
      addBus(draftBus)
    }

    setDraftBus(emptyBus)
  }

  const startEditing = (bus) => {
    setDraftBus({
      company: bus.company,
      type: bus.type,
      from: bus.from,
      to: bus.to,
      departure: bus.departure,
      arrival: bus.arrival,
      duration: bus.duration,
      price: bus.price,
      totalSeats: bus.totalSeats,
      routeCode: bus.routeCode,
      amenities: bus.amenities,
    })
    setEditingId(bus.id)
    setActiveTab('buses')
  }

  return (
    <PageShell>
      <div className="space-y-8">
        <SectionHero
          eyebrow="Admin Dashboard"
          title={`Operations at a glance, ${user?.name || 'Admin'}`}
          description="Fleet management, booking visibility, and route oversight now live in one cleaner control surface with calmer spacing and stronger hierarchy."
          action={<StatusBadge variant="success">Production-style dashboard UI</StatusBadge>}
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <Panel className="h-fit w-full xl:w-80">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500 dark:text-sky-300">Workspace</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-950 dark:text-white">{user?.name}</h2>
            <p className={cn('mt-3 text-sm leading-7', bodyClass)}>
              Manage bookings, buses, and routes from a polished navigation rail built for scanning and quick action.
            </p>

            <div className="mt-8 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition',
                    activeTab === tab.id
                      ? 'bg-[linear-gradient(135deg,#0ea5e9,#2563eb_45%,#4f46e5)] text-white shadow-[0_18px_45px_rgba(37,99,235,0.22)]'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10',
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </Panel>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className="space-y-6"
                >
                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => (
                      <Panel key={stat.label} variant="muted" className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={cn('text-sm', mutedClass)}>{stat.label}</p>
                            <p className="mt-3 font-display text-2xl font-bold text-slate-950 dark:text-white">{stat.value}</p>
                          </div>
                          <div className="rounded-2xl bg-sky-500/10 p-3 text-sky-600 dark:text-sky-300">
                            <stat.icon className="h-5 w-5" />
                          </div>
                        </div>
                      </Panel>
                    ))}
                  </div>

                  <Panel>
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-sky-500/10 p-3 text-sky-600 dark:text-sky-300">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">Recent bookings</h3>
                        <p className={cn('text-sm', mutedClass)}>Cleaner rows, clearer amounts, and visible status badges.</p>
                      </div>
                    </div>

                    <div className="mt-6 overflow-x-auto">
                      <table className="min-w-full text-left text-sm">
                        <thead className={cn('text-xs uppercase tracking-[0.22em]', mutedClass)}>
                          <tr>
                            <th className="pb-4">Booking</th>
                            <th className="pb-4">Passenger</th>
                            <th className="pb-4">Route</th>
                            <th className="pb-4">Status</th>
                            <th className="pb-4">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.slice(0, 6).map((booking) => (
                            <tr key={booking.bookingId} className="border-t border-slate-200/70 dark:border-white/10">
                              <td className="py-4 font-medium text-slate-900 dark:text-white">{booking.bookingId}</td>
                              <td className="py-4">{booking.passenger.name}</td>
                              <td className="py-4">{booking.bus.from} to {booking.bus.to}</td>
                              <td className="py-4">
                                <StatusBadge variant={statusTone[booking.status] || 'default'}>{booking.status}</StatusBadge>
                              </td>
                              <td className="py-4 font-medium text-slate-900 dark:text-white">ETB {booking.totalAmount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Panel>
                </motion.div>
              )}

              {activeTab === 'buses' && (
                <motion.div
                  key="buses"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]"
                >
                  <Panel>
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-sky-500/10 p-3 text-sky-600 dark:text-sky-300">
                        <Plus className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">
                          {editingId ? 'Edit bus' : 'Add a new bus'}
                        </h3>
                        <p className={cn('text-sm', mutedClass)}>Refined form layout for fleet management.</p>
                      </div>
                    </div>

                    <form onSubmit={submitBus} className="mt-6 grid gap-4 md:grid-cols-2">
                      {[
                        ['company', 'Company'],
                        ['type', 'Type'],
                        ['from', 'From'],
                        ['to', 'To'],
                        ['departure', 'Departure'],
                        ['arrival', 'Arrival'],
                        ['duration', 'Duration'],
                        ['routeCode', 'Route code'],
                      ].map(([key, label]) => (
                        <Field
                          key={key}
                          label={label}
                          value={draftBus[key]}
                          onChange={(event) => setDraftBus((current) => ({ ...current, [key]: event.target.value }))}
                        />
                      ))}
                      <Field
                        label="Price"
                        type="number"
                        value={draftBus.price}
                        onChange={(event) => setDraftBus((current) => ({ ...current, price: Number(event.target.value) }))}
                      />
                      <Field
                        label="Total seats"
                        type="number"
                        value={draftBus.totalSeats}
                        onChange={(event) => setDraftBus((current) => ({ ...current, totalSeats: Number(event.target.value) }))}
                      />
                      <div className="md:col-span-2">
                        <Button type="submit" className="w-full" icon={Plus}>
                          {editingId ? 'Save Changes' : 'Add Bus'}
                        </Button>
                      </div>
                    </form>
                  </Panel>

                  <Panel>
                    <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">Fleet inventory</h3>
                    <p className={cn('mt-2 text-sm', mutedClass)}>Card-based fleet layout for easier route scanning.</p>

                    <div className="mt-6 space-y-4">
                      {buses.map((bus) => (
                        <div key={bus.id} className="rounded-[1.75rem] border border-slate-200/70 bg-slate-50/90 p-5 dark:border-white/10 dark:bg-white/5">
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                              <div className="flex flex-wrap items-center gap-3">
                                <h4 className="font-display text-xl font-bold text-slate-950 dark:text-white">{bus.company}</h4>
                                <StatusBadge variant="neutral">{bus.type}</StatusBadge>
                              </div>
                              <p className={cn('mt-2 text-sm', bodyClass)}>{bus.from} to {bus.to}</p>
                              <p className={cn('mt-1 text-sm', mutedClass)}>{bus.departure} - {bus.arrival} • ETB {bus.price}</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                              <Button variant="secondary" size="sm" icon={Pencil} onClick={() => startEditing(bus)}>
                                Edit
                              </Button>
                              <Button variant="danger" size="sm" icon={Trash2} onClick={() => deleteBus(bus.id)}>
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Panel>
                </motion.div>
              )}

              {activeTab === 'routes' && (
                <motion.div
                  key="routes"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                >
                  <Panel>
                    <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">Route overview</h3>
                    <p className={cn('mt-2 text-sm', mutedClass)}>Card-based route summaries for a less dense operations view.</p>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      {buses.map((bus) => (
                        <div key={bus.id} className="rounded-[1.75rem] border border-slate-200/70 bg-slate-50/90 p-5 dark:border-white/10 dark:bg-white/5">
                          <StatusBadge variant="default">{bus.routeCode}</StatusBadge>
                          <h4 className="mt-4 font-display text-xl font-bold text-slate-950 dark:text-white">{bus.from} to {bus.to}</h4>
                          <p className={cn('mt-2 text-sm', bodyClass)}>{bus.company}</p>
                          <p className={cn('mt-1 text-sm', mutedClass)}>{bus.departure} - {bus.arrival}</p>
                        </div>
                      ))}
                    </div>
                  </Panel>
                </motion.div>
              )}

              {activeTab === 'bookings' && (
                <motion.div
                  key="bookings"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                >
                  <Panel>
                    <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">All bookings</h3>
                    <p className={cn('mt-2 text-sm', mutedClass)}>Improved visual hierarchy with status badges and cleaner table spacing.</p>

                    <div className="mt-6 overflow-x-auto">
                      <table className="min-w-full text-left text-sm">
                        <thead className={cn('text-xs uppercase tracking-[0.22em]', mutedClass)}>
                          <tr>
                            <th className="pb-4">Booking</th>
                            <th className="pb-4">Passenger</th>
                            <th className="pb-4">Route</th>
                            <th className="pb-4">Method</th>
                            <th className="pb-4">Seats</th>
                            <th className="pb-4">Status</th>
                            <th className="pb-4">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map((booking) => (
                            <tr key={booking.bookingId} className="border-t border-slate-200/70 dark:border-white/10">
                              <td className="py-4 font-medium text-slate-900 dark:text-white">{booking.bookingId}</td>
                              <td className="py-4">{booking.passenger.name}</td>
                              <td className="py-4">{booking.bus.from} to {booking.bus.to}</td>
                              <td className="py-4 capitalize">{booking.paymentMethod}</td>
                              <td className="py-4">{booking.seats.map((seat) => seat.number).join(', ')}</td>
                              <td className="py-4">
                                <StatusBadge variant={statusTone[booking.status] || 'default'}>{booking.status}</StatusBadge>
                              </td>
                              <td className="py-4 font-medium text-slate-900 dark:text-white">ETB {booking.totalAmount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Panel>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageShell>
  )
}

export default AdminDashboard
