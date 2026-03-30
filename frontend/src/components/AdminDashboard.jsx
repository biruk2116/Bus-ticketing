import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BarChart3, Bus, CalendarRange, LayoutDashboard, MapPinned, Pencil, Plus, ReceiptText, Trash2, Users } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

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

const AdminDashboard = () => {
  const { user, buses, bookings, addBus, updateBus, deleteBus } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [draftBus, setDraftBus] = useState(emptyBus)
  const [editingId, setEditingId] = useState(null)

  const stats = useMemo(
    () => [
      { label: 'Fleet Size', value: buses.length, icon: Bus },
      { label: 'Bookings', value: bookings.length, icon: ReceiptText },
      { label: 'Routes', value: new Set(buses.map((bus) => `${bus.from}-${bus.to}`)).size, icon: MapPinned },
      { label: 'Revenue', value: `ETB ${bookings.reduce((sum, booking) => sum + booking.totalAmount, 0)}`, icon: BarChart3 },
    ],
    [buses, bookings]
  )

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'buses', label: 'Manage Buses', icon: Bus },
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

  return (
    <div className="min-h-screen bg-slate-950 px-4 pb-20 pt-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 xl:flex-row">
        <aside className="w-full xl:w-80">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Admin</p>
            <h1 className="mt-3 text-3xl font-black text-white">Dashboard</h1>
            <p className="mt-3 text-slate-300">Signed in as {user?.name}</p>

            <div className="mt-8 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-sky-400 to-indigo-500 text-white'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-400">{stat.label}</p>
                          <p className="mt-3 text-2xl font-black text-white">{stat.value}</p>
                        </div>
                        <div className="rounded-2xl bg-sky-400/10 p-3 text-sky-300">
                          <stat.icon className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                  <h2 className="text-2xl font-bold text-white">Recent bookings</h2>
                  <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full text-left text-sm text-slate-300">
                      <thead className="text-xs uppercase tracking-[0.24em] text-slate-400">
                        <tr>
                          <th className="pb-4">Booking</th>
                          <th className="pb-4">Passenger</th>
                          <th className="pb-4">Route</th>
                          <th className="pb-4">Seats</th>
                          <th className="pb-4">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.slice(0, 6).map((booking) => (
                          <tr key={booking.bookingId} className="border-t border-white/10">
                            <td className="py-4">{booking.bookingId}</td>
                            <td className="py-4">{booking.passenger.name}</td>
                            <td className="py-4">{booking.bus.from} → {booking.bus.to}</td>
                            <td className="py-4">{booking.seats.map((seat) => seat.number).join(', ')}</td>
                            <td className="py-4">ETB {booking.totalAmount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'buses' && (
              <motion.div key="buses" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                <form onSubmit={submitBus} className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-sky-400/10 p-3 text-sky-300">
                      <Plus className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{editingId ? 'Edit bus' : 'Add new bus'}</h2>
                      <p className="text-sm text-slate-400">UI-only fleet management backed by local state</p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[
                      ['company', 'Company'],
                      ['type', 'Type'],
                      ['from', 'From'],
                      ['to', 'To'],
                      ['departure', 'Departure'],
                      ['arrival', 'Arrival'],
                      ['duration', 'Duration'],
                      ['routeCode', 'Route Code'],
                    ].map(([key, label]) => (
                      <div key={key}>
                        <label className="mb-2 block text-sm font-medium text-slate-300">{label}</label>
                        <input
                          value={draftBus[key]}
                          onChange={(event) => setDraftBus((current) => ({ ...current, [key]: event.target.value }))}
                          className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-slate-100 outline-none focus:border-sky-400"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">Price</label>
                      <input
                        type="number"
                        value={draftBus.price}
                        onChange={(event) => setDraftBus((current) => ({ ...current, price: Number(event.target.value) }))}
                        className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-slate-100 outline-none focus:border-sky-400"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">Total Seats</label>
                      <input
                        type="number"
                        value={draftBus.totalSeats}
                        onChange={(event) => setDraftBus((current) => ({ ...current, totalSeats: Number(event.target.value) }))}
                        className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-slate-100 outline-none focus:border-sky-400"
                      />
                    </div>
                  </div>

                  <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 px-5 py-3 text-sm font-semibold text-white">
                    <Plus className="h-4 w-4" />
                    {editingId ? 'Save Changes' : 'Add Bus'}
                  </button>
                </form>

                <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                  <h2 className="text-2xl font-bold text-white">Fleet inventory</h2>
                  <div className="mt-6 space-y-4">
                    {buses.map((bus) => (
                      <div key={bus.id} className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-white">{bus.company}</h3>
                            <p className="mt-2 text-sm text-slate-300">{bus.from} → {bus.to} · {bus.departure} - {bus.arrival}</p>
                            <p className="mt-1 text-sm text-slate-400">{bus.type} · ETB {bus.price}</p>
                          </div>
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => {
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
                              }}
                              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                            >
                              <span className="flex items-center gap-2">
                                <Pencil className="h-4 w-4" />
                                Edit
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteBus(bus.id)}
                              className="rounded-2xl bg-rose-500 px-4 py-2 text-sm font-medium text-white"
                            >
                              <span className="flex items-center gap-2">
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'routes' && (
              <motion.div key="routes" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <h2 className="text-2xl font-bold text-white">Route overview</h2>
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {buses.map((bus) => (
                    <div key={bus.id} className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{bus.routeCode}</p>
                      <h3 className="mt-3 text-xl font-semibold text-white">{bus.from} → {bus.to}</h3>
                      <p className="mt-2 text-sm text-slate-300">{bus.company} · {bus.departure} - {bus.arrival}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'bookings' && (
              <motion.div key="bookings" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
                <h2 className="text-2xl font-bold text-white">All bookings</h2>
                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full text-left text-sm text-slate-300">
                    <thead className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      <tr>
                        <th className="pb-4">Booking</th>
                        <th className="pb-4">Passenger</th>
                        <th className="pb-4">Route</th>
                        <th className="pb-4">Method</th>
                        <th className="pb-4">Seats</th>
                        <th className="pb-4">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.bookingId} className="border-t border-white/10">
                          <td className="py-4">{booking.bookingId}</td>
                          <td className="py-4">{booking.passenger.name}</td>
                          <td className="py-4">{booking.bus.from} → {booking.bus.to}</td>
                          <td className="py-4 capitalize">{booking.paymentMethod}</td>
                          <td className="py-4">{booking.seats.map((seat) => seat.number).join(', ')}</td>
                          <td className="py-4">ETB {booking.totalAmount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
