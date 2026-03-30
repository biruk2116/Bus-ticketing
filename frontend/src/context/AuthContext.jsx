import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

const STORAGE_KEYS = {
  theme: 'ethiobus_theme',
  currentUser: 'ethiobus_current_user',
  users: 'ethiobus_users',
  buses: 'ethiobus_buses',
  bookings: 'ethiobus_bookings',
}

const defaultPassengerDetails = {
  name: '',
  phone: '',
  email: '',
  emergencyContact: '',
}

const defaultSearchCriteria = {
  from: 'Addis Ababa',
  to: 'Gondar',
  date: new Date().toISOString().split('T')[0],
  passengers: 1,
}

const seedUsers = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@ethiobus.com',
    phone: '+251911000000',
    password: 'admin123',
    role: 'admin',
  },
]

const seedBuses = [
  {
    id: 'bus-101',
    company: 'Selam Express',
    type: 'Luxury Coach',
    from: 'Addis Ababa',
    to: 'Gondar',
    departure: '06:30',
    arrival: '16:40',
    duration: '10h 10m',
    price: 1450,
    totalSeats: 40,
    availableSeats: 14,
    routeCode: 'AA-GD-01',
    amenities: ['WiFi', 'Charging', 'Snacks', 'AC'],
    rating: 4.9,
    bookedSeats: ['A1', 'A2', 'A4', 'B1', 'B2', 'C4', 'D3', 'E1', 'F4', 'H2', 'I1', 'I4', 'J2', 'J3'],
  },
  {
    id: 'bus-102',
    company: 'Abay Transit',
    type: 'Business Class',
    from: 'Addis Ababa',
    to: 'Hawassa',
    departure: '08:00',
    arrival: '13:20',
    duration: '5h 20m',
    price: 780,
    totalSeats: 40,
    availableSeats: 18,
    routeCode: 'AA-HW-02',
    amenities: ['AC', 'Charging', 'Water'],
    rating: 4.7,
    bookedSeats: ['A3', 'B4', 'C2', 'D1', 'D4', 'E2', 'F3', 'G4', 'I2', 'J1'],
  },
  {
    id: 'bus-103',
    company: 'SkyLine Bus',
    type: 'Executive',
    from: 'Dire Dawa',
    to: 'Adama',
    departure: '07:15',
    arrival: '13:20',
    duration: '6h 05m',
    price: 920,
    totalSeats: 36,
    availableSeats: 9,
    routeCode: 'DD-AD-03',
    amenities: ['WiFi', 'AC', 'Entertainment'],
    rating: 4.8,
    bookedSeats: ['A1', 'A2', 'B3', 'B4', 'C1', 'D1', 'D2', 'E4', 'F1', 'F3', 'G1', 'H2'],
  },
  {
    id: 'bus-104',
    company: 'Blue Nile Coaches',
    type: 'Premium Night Ride',
    from: 'Bahir Dar',
    to: 'Mekelle',
    departure: '21:00',
    arrival: '05:40',
    duration: '8h 40m',
    price: 1180,
    totalSeats: 40,
    availableSeats: 21,
    routeCode: 'BD-MK-04',
    amenities: ['Recliner', 'Charging', 'Blanket', 'AC'],
    rating: 4.6,
    bookedSeats: ['A4', 'B1', 'C3', 'D2', 'F2', 'G3', 'H4'],
  },
  {
    id: 'bus-105',
    company: 'Ethio Connect',
    type: 'Comfort',
    from: 'Addis Ababa',
    to: 'Gondar',
    departure: '11:00',
    arrival: '21:10',
    duration: '10h 10m',
    price: 1320,
    totalSeats: 40,
    availableSeats: 22,
    routeCode: 'AA-GD-05',
    amenities: ['WiFi', 'Water', 'AC'],
    rating: 4.5,
    bookedSeats: ['A2', 'B2', 'C2', 'D4', 'F1', 'H3'],
  },
]

const safeParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

const getPreferredTheme = () => {
  const storedTheme = localStorage.getItem(STORAGE_KEYS.theme)
  if (storedTheme === 'dark' || storedTheme === 'light') return storedTheme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const buildSeatLayout = (bus) => {
  const total = bus?.totalSeats || 40
  const rows = Math.ceil(total / 4)
  const seats = []

  for (let row = 0; row < rows; row += 1) {
    for (let col = 1; col <= 4; col += 1) {
      const seatIndex = row * 4 + col
      if (seatIndex > total) continue

      const seatNumber = `${String.fromCharCode(65 + row)}${col}`
      seats.push({
        id: seatNumber,
        number: seatNumber,
        isBooked: bus?.bookedSeats?.includes(seatNumber) ?? false,
      })
    }
  }

  return seats
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [users, setUsers] = useState(seedUsers)
  const [buses, setBuses] = useState(seedBuses)
  const [bookings, setBookings] = useState([])
  const [searchCriteria, setSearchCriteria] = useState(defaultSearchCriteria)
  const [selectedBus, setSelectedBus] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [passengerDetails, setPassengerDetails] = useState(defaultPassengerDetails)
  const [currentBooking, setCurrentBooking] = useState(null)

  useEffect(() => {
    const storedUsers = safeParse(localStorage.getItem(STORAGE_KEYS.users), seedUsers)
    const storedBuses = safeParse(localStorage.getItem(STORAGE_KEYS.buses), seedBuses)
    const storedBookings = safeParse(localStorage.getItem(STORAGE_KEYS.bookings), [])
    const storedUser = safeParse(localStorage.getItem(STORAGE_KEYS.currentUser), null)

    const isDark = getPreferredTheme() === 'dark'
    setDarkMode(isDark)
    document.documentElement.classList.toggle('dark', isDark)

    setUsers(storedUsers)
    setBuses(storedBuses)
    setBookings(storedBookings)
    setUser(storedUser)
    setLoading(false)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.buses, JSON.stringify(buses))
  }, [buses])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(bookings))
  }, [bookings])

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEYS.currentUser)
    }
  }, [user])

  const toggleDarkMode = () => {
    const nextTheme = !darkMode
    setDarkMode(nextTheme)
    localStorage.setItem(STORAGE_KEYS.theme, nextTheme ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', nextTheme)
  }

  const login = async (email, password) =>
    new Promise((resolve, reject) => {
      window.setTimeout(() => {
        const foundUser = users.find(
          (entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.password === password
        )

        if (!foundUser) {
          toast.error('Invalid email or password')
          reject(new Error('Invalid credentials'))
          return
        }

        const { password: _password, ...safeUser } = foundUser
        setUser(safeUser)
        toast.success(`Welcome back, ${safeUser.name.split(' ')[0]}!`)
        resolve({ success: true, user: safeUser })
      }, 900)
    })

  const signup = async (formData) =>
    new Promise((resolve, reject) => {
      window.setTimeout(() => {
        const emailExists = users.some(
          (entry) => entry.email.toLowerCase() === formData.email.toLowerCase()
        )

        if (emailExists) {
          toast.error('An account with this email already exists')
          reject(new Error('Duplicate email'))
          return
        }

        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match')
          reject(new Error('Password mismatch'))
          return
        }

        if (formData.password.length < 6) {
          toast.error('Password must be at least 6 characters')
          reject(new Error('Password too short'))
          return
        }

        const newUser = {
          id: `user-${Date.now()}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: 'user',
        }

        setUsers((current) => [...current, newUser])
        const { password: _password, ...safeUser } = newUser
        setUser(safeUser)
        toast.success('Account created successfully')
        resolve({ success: true, user: safeUser })
      }, 900)
    })

  const logout = () => {
    setUser(null)
    toast.success('Logged out successfully')
  }

  const runSearch = (criteria) => {
    setSearchCriteria(criteria)
    setSelectedBus(null)
    setSelectedSeats([])
    setPassengerDetails(defaultPassengerDetails)
    setCurrentBooking(null)
  }

  const filteredBuses = useMemo(() => {
    return buses.filter((bus) => {
      const matchesFrom = !searchCriteria.from || bus.from === searchCriteria.from
      const matchesTo = !searchCriteria.to || bus.to === searchCriteria.to
      return matchesFrom && matchesTo
    })
  }, [buses, searchCriteria])

  const chooseBus = (bus) => {
    setSelectedBus(bus)
    setSelectedSeats([])
  }

  const updateSelectedSeats = (seats) => {
    setSelectedSeats(seats)
  }

  const updatePassenger = (details) => {
    setPassengerDetails(details)
  }

  const resetBookingFlow = () => {
    setSelectedBus(null)
    setSelectedSeats([])
    setPassengerDetails(defaultPassengerDetails)
    setCurrentBooking(null)
  }

  const confirmPayment = async (paymentMethod) =>
    new Promise((resolve) => {
      window.setTimeout(() => {
        const bookingId = `ETH-${Date.now()}`
        const serviceFee = 65
        const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0)
        const totalAmount = subtotal + serviceFee

        const booking = {
          bookingId,
          passenger: passengerDetails,
          bus: selectedBus,
          searchCriteria,
          seats: selectedSeats,
          paymentMethod,
          subtotal,
          serviceFee,
          totalAmount,
          bookingDate: new Date().toISOString(),
          status: 'Confirmed',
        }

        setBookings((current) => [booking, ...current])
        setCurrentBooking(booking)
        toast.success('Payment approved and ticket generated')
        resolve(booking)
      }, 1800)
    })

  const addBus = (busData) => {
    const newBus = {
      ...busData,
      id: `bus-${Date.now()}`,
      bookedSeats: [],
      availableSeats: busData.totalSeats,
      rating: 4.8,
    }
    setBuses((current) => [newBus, ...current])
    toast.success('Bus added to the fleet')
  }

  const updateBus = (busId, changes) => {
    setBuses((current) =>
      current.map((bus) => (bus.id === busId ? { ...bus, ...changes } : bus))
    )
    toast.success('Bus updated successfully')
  }

  const deleteBus = (busId) => {
    setBuses((current) => current.filter((bus) => bus.id !== busId))
    toast.success('Bus removed from the fleet')
  }

  const seatLayout = useMemo(() => buildSeatLayout(selectedBus), [selectedBus])

  const value = {
    loading,
    user,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'admin',
    darkMode,
    toggleDarkMode,
    login,
    signup,
    logout,
    buses,
    filteredBuses,
    bookings,
    searchCriteria,
    runSearch,
    selectedBus,
    chooseBus,
    seatLayout,
    selectedSeats,
    updateSelectedSeats,
    passengerDetails,
    updatePassenger,
    currentBooking,
    confirmPayment,
    resetBookingFlow,
    addBus,
    updateBus,
    deleteBus,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
