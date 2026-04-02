// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit, Trash2, Bus, Users, Ticket, DollarSign, X, MapPin, Clock, 
  Search, Filter, Download, Eye, CheckCircle, XCircle, AlertCircle,
  TrendingUp, Calendar, Phone, Mail, UserCheck, Settings, LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for different data
  const [buses, setBuses] = useState([
    { id: 1, name: 'Ethio Luxury Express', from: 'Addis Ababa', to: 'Bahir Dar', departure: '06:00', arrival: '12:00', price: 450, totalSeats: 40, availableSeats: 25, type: 'VIP', amenities: ['wifi', 'ac', 'refreshments'], status: 'active' },
    { id: 2, name: 'Sky Bus', from: 'Addis Ababa', to: 'Gondar', departure: '07:30', arrival: '14:30', price: 550, totalSeats: 40, availableSeats: 18, type: 'VIP', amenities: ['wifi', 'ac'], status: 'active' },
    { id: 3, name: 'Selam Bus', from: 'Addis Ababa', to: 'Hawassa', departure: '08:00', arrival: '13:00', price: 350, totalSeats: 45, availableSeats: 32, type: 'Standard', amenities: ['ac'], status: 'active' },
  ]);

  const [routes, setRoutes] = useState([
    { id: 1, from: 'Addis Ababa', to: 'Bahir Dar', distance: '565 km', duration: '6 hours', basePrice: 450, popular: true },
    { id: 2, from: 'Addis Ababa', to: 'Gondar', distance: '738 km', duration: '7 hours', basePrice: 550, popular: true },
    { id: 3, from: 'Addis Ababa', to: 'Hawassa', distance: '275 km', duration: '5 hours', basePrice: 350, popular: false },
  ]);

  const [bookings, setBookings] = useState([
    { id: 'BK001', passenger: 'John Doe', email: 'john@example.com', phone: '0912345678', bus: 'Ethio Luxury', route: 'Addis Ababa - Bahir Dar', date: '2024-01-15', seats: '12,13', amount: 900, status: 'confirmed', paymentMethod: 'card' },
    { id: 'BK002', passenger: 'Jane Smith', email: 'jane@example.com', phone: '0923456789', bus: 'Sky Bus', route: 'Addis Ababa - Gondar', date: '2024-01-16', seats: '5', amount: 550, status: 'pending', paymentMethod: 'mobile' },
    { id: 'BK003', passenger: 'Tesfaye Abebe', email: 'tesfaye@example.com', phone: '0934567890', bus: 'Selam Bus', route: 'Addis Ababa - Hawassa', date: '2024-01-17', seats: '22,23,24', amount: 1050, status: 'confirmed', paymentMethod: 'bank' },
  ]);

  const [users_list, setUsersList] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '0912345678', role: 'user', bookings: 3, joinDate: '2024-01-01', status: 'active' },
    { id: 2, name: 'Admin User', email: 'admin@bus.com', phone: '0998765432', role: 'admin', bookings: 0, joinDate: '2024-01-01', status: 'active' },
    { id: 3, name: 'Sarah Williams', email: 'sarah@example.com', phone: '0945678901', role: 'user', bookings: 5, joinDate: '2024-01-10', status: 'active' },
  ]);

  const [newBus, setNewBus] = useState({
    name: '', from: '', to: '', departure: '', arrival: '', price: '', totalSeats: '', type: 'Standard', amenities: []
  });

  const [newRoute, setNewRoute] = useState({
    from: '', to: '', distance: '', duration: '', basePrice: ''
  });

  const stats = {
    totalBookings: bookings.length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.amount, 0),
    totalBuses: buses.length,
    totalRoutes: routes.length,
    totalUsers: users_list.length,
    activeBookings: bookings.filter(b => b.status === 'confirmed').length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
  };

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  const handleAddBus = () => {
    if (newBus.name && newBus.from && newBus.to && newBus.price) {
      setBuses([...buses, { 
        ...newBus, 
        id: Date.now(), 
        price: parseInt(newBus.price),
        totalSeats: parseInt(newBus.totalSeats) || 40,
        availableSeats: parseInt(newBus.totalSeats) || 40,
        status: 'active'
      }]);
      setShowModal(false);
      setNewBus({ name: '', from: '', to: '', departure: '', arrival: '', price: '', totalSeats: '', type: 'Standard', amenities: [] });
      toast.success('Bus added successfully!');
    } else {
      toast.error('Please fill all required fields');
    }
  };

  const handleUpdateBus = () => {
    setBuses(buses.map(bus => bus.id === editingItem.id ? { ...newBus, id: bus.id } : bus));
    setShowModal(false);
    setEditingItem(null);
    setNewBus({ name: '', from: '', to: '', departure: '', arrival: '', price: '', totalSeats: '', type: 'Standard', amenities: [] });
    toast.success('Bus updated successfully!');
  };

  const handleDeleteBus = (id) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      setBuses(buses.filter(bus => bus.id !== id));
      toast.success('Bus deleted successfully!');
    }
  };

  const handleAddRoute = () => {
    if (newRoute.from && newRoute.to && newRoute.basePrice) {
      setRoutes([...routes, { ...newRoute, id: Date.now(), basePrice: parseInt(newRoute.basePrice), popular: false }]);
      setShowModal(false);
      setNewRoute({ from: '', to: '', distance: '', duration: '', basePrice: '' });
      toast.success('Route added successfully!');
    } else {
      toast.error('Please fill all required fields');
    }
  };

  const handleUpdateBookingStatus = (id, status) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    ));
    toast.success(`Booking ${status} successfully!`);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsersList(users_list.filter(user => user.id !== id));
      toast.success('User deleted successfully!');
    }
  };

  const handleUpdateUserRole = (id, role) => {
    setUsersList(users_list.map(user => 
      user.id === id ? { ...user, role } : user
    ));
    toast.success(`User role updated to ${role}!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 mt-1">Welcome back, {user.name}</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <Ticket className="w-8 h-8 text-blue-400" />
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.totalBookings}</div>
            <div className="text-gray-400">Total Bookings</div>
            <div className="text-sm text-green-400 mt-2">+12% from last month</div>
          </div>
          
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white">ETB {stats.totalRevenue.toLocaleString()}</div>
            <div className="text-gray-400">Total Revenue</div>
            <div className="text-sm text-green-400 mt-2">+8% from last month</div>
          </div>
          
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <Bus className="w-8 h-8 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.totalBuses}</div>
            <div className="text-gray-400">Active Buses</div>
            <div className="text-sm text-blue-400 mt-2">{stats.totalRoutes} routes available</div>
          </div>
          
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-pink-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
            <div className="text-gray-400">Total Users</div>
            <div className="text-sm text-blue-400 mt-2">+5 new this week</div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['overview', 'buses', 'routes', 'bookings', 'users'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg capitalize transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4">Recent Bookings</h3>
                <div className="space-y-3">
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-semibold">{booking.passenger}</p>
                        <p className="text-sm text-gray-400">{booking.route} • {booking.seats}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white">ETB {booking.amount}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Routes */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4">Popular Routes</h3>
                <div className="space-y-3">
                  {routes.filter(r => r.popular).map((route) => (
                    <div key={route.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-semibold">{route.from} → {route.to}</p>
                        <p className="text-sm text-gray-400">{route.distance} • {route.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400">ETB {route.basePrice}</p>
                        <p className="text-xs text-gray-400">Starting from</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Buses Tab */}
        {activeTab === 'buses' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Manage Buses</h3>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setNewBus({ name: '', from: '', to: '', departure: '', arrival: '', price: '', totalSeats: '', type: 'Standard', amenities: [] });
                  setShowModal(true);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Bus</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Route</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Departure</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Arrival</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Seats</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {buses.map((bus) => (
                    <tr key={bus.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-4 py-3 text-white">{bus.name}</td>
                      <td className="px-4 py-3 text-gray-300">{bus.from} → {bus.to}</td>
                      <td className="px-4 py-3 text-gray-300">{bus.departure}</td>
                      <td className="px-4 py-3 text-gray-300">{bus.arrival}</td>
                      <td className="px-4 py-3 text-green-400">ETB {bus.price}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          bus.type === 'VIP' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {bus.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-300">{bus.availableSeats}/{bus.totalSeats}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => {
                            setEditingItem(bus);
                            setNewBus(bus);
                            setShowModal(true);
                          }}
                          className="text-blue-400 hover:text-blue-300 mr-3"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBus(bus.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Routes Tab */}
        {activeTab === 'routes' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Manage Routes</h3>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setNewRoute({ from: '', to: '', distance: '', duration: '', basePrice: '' });
                  setShowModal(true);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Route</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">From</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">To</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Distance</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Duration</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Base Price</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Popular</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map((route) => (
                    <tr key={route.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-4 py-3 text-white">{route.from}</td>
                      <td className="px-4 py-3 text-white">{route.to}</td>
                      <td className="px-4 py-3 text-gray-300">{route.distance}</td>
                      <td className="px-4 py-3 text-gray-300">{route.duration}</td>
                      <td className="px-4 py-3 text-green-400">ETB {route.basePrice}</td>
                      <td className="px-4 py-3">
                        {route.popular ? (
                          <span className="text-green-400">✓ Popular</span>
                        ) : (
                          <span className="text-gray-400">Standard</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this route?')) {
                              setRoutes(routes.filter(r => r.id !== route.id));
                              toast.success('Route deleted!');
                            }
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6">Manage Bookings</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Passenger</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Route</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Seats</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-4 py-3 text-white font-mono text-sm">{booking.id}</td>
                      <td className="px-4 py-3">
                        <div className="text-white">{booking.passenger}</div>
                        <div className="text-xs text-gray-400">{booking.email}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-300">{booking.route}</td>
                      <td className="px-4 py-3 text-gray-300">{booking.date}</td>
                      <td className="px-4 py-3 text-gray-300">{booking.seats}</td>
                      <td className="px-4 py-3 text-green-400">ETB {booking.amount}</td>
                      <td className="px-4 py-3">
                        <select
                          value={booking.status}
                          onChange={(e) => handleUpdateBookingStatus(booking.id, e.target.value)}
                          className={`px-2 py-1 rounded-lg text-xs ${
                            booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="pending">Pending</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-blue-400 hover:text-blue-300">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6">Manage Users</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Phone</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Role</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Bookings</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Join Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users_list.map((user) => (
                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-4 py-3 text-white">{user.name}</td>
                      <td className="px-4 py-3 text-gray-300">{user.email}</td>
                      <td className="px-4 py-3 text-gray-300">{user.phone}</td>
                      <td className="px-4 py-3">
                        <select
                          value={user.role}
                          onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                          className="px-2 py-1 rounded-lg text-xs bg-white/10 text-white"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-gray-300">{user.bookings}</td>
                      <td className="px-4 py-3 text-gray-300">{user.joinDate}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Modal for Add/Edit */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-card max-w-md w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-black/50 backdrop-blur-sm p-4 border-b border-white/10 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">
                    {activeTab === 'buses' ? (editingItem ? 'Edit Bus' : 'Add New Bus') : 'Add New Route'}
                  </h3>
                  <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-6 space-y-4">
                  {activeTab === 'buses' ? (
                    <>
                      <input
                        type="text"
                        placeholder="Bus Name"
                        value={newBus.name}
                        onChange={(e) => setNewBus({ ...newBus, name: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="From"
                          value={newBus.from}
                          onChange={(e) => setNewBus({ ...newBus, from: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="To"
                          value={newBus.to}
                          onChange={(e) => setNewBus({ ...newBus, to: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="time"
                          placeholder="Departure"
                          value={newBus.departure}
                          onChange={(e) => setNewBus({ ...newBus, departure: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                        />
                        <input
                          type="time"
                          placeholder="Arrival"
                          value={newBus.arrival}
                          onChange={(e) => setNewBus({ ...newBus, arrival: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="number"
                          placeholder="Price (ETB)"
                          value={newBus.price}
                          onChange={(e) => setNewBus({ ...newBus, price: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                        />
                        <input
                          type="number"
                          placeholder="Total Seats"
                          value={newBus.totalSeats}
                          onChange={(e) => setNewBus({ ...newBus, totalSeats: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <select
                        value={newBus.type}
                        onChange={(e) => setNewBus({ ...newBus, type: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="Standard">Standard</option>
                        <option value="VIP">VIP</option>
                      </select>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="From"
                          value={newRoute.from}
                          onChange={(e) => setNewRoute({ ...newRoute, from: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="To"
                          value={newRoute.to}
                          onChange={(e) => setNewRoute({ ...newRoute, to: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Distance (e.g., 565 km)"
                          value={newRoute.distance}
                          onChange={(e) => setNewRoute({ ...newRoute, distance: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Duration (e.g., 6 hours)"
                          value={newRoute.duration}
                          onChange={(e) => setNewRoute({ ...newRoute, duration: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <input
                        type="number"
                        placeholder="Base Price (ETB)"
                        value={newRoute.basePrice}
                        onChange={(e) => setNewRoute({ ...newRoute, basePrice: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                      />
                    </>
                  )}
                  
                  <button
                    onClick={activeTab === 'buses' ? (editingItem ? handleUpdateBus : handleAddBus) : handleAddRoute}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-2 rounded-lg transition-all"
                  >
                    {activeTab === 'buses' ? (editingItem ? 'Update Bus' : 'Add Bus') : 'Add Route'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};