// src/components/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit, Trash2, Bus, Users, Ticket, DollarSign, X, MapPin, Clock, 
  Search, Filter, Download, Eye, CheckCircle, XCircle, AlertCircle,
  TrendingUp, Calendar, Phone, Mail, UserCheck, Settings, LogOut, ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const AdminDashboard = () => {
  const { user, logout, users: allUsers, getUserBookings } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [buses, setBuses] = useState([
    { id: 1, name: 'Ethio Luxury Express', from: 'Addis Ababa', to: 'Bahir Dar', departure: '06:00', arrival: '12:00', price: 450, totalSeats: 40, availableSeats: 25, type: 'VIP', status: 'active' },
    { id: 2, name: 'Sky Bus', from: 'Addis Ababa', to: 'Gondar', departure: '07:30', arrival: '14:30', price: 550, totalSeats: 40, availableSeats: 18, type: 'VIP', status: 'active' },
    { id: 3, name: 'Selam Bus', from: 'Addis Ababa', to: 'Hawassa', departure: '08:00', arrival: '13:00', price: 350, totalSeats: 45, availableSeats: 32, type: 'Standard', status: 'active' },
  ]);

  const [routes, setRoutes] = useState([
    { id: 1, from: 'Addis Ababa', to: 'Bahir Dar', distance: '565 km', duration: '6 hours', basePrice: 450, popular: true },
    { id: 2, from: 'Addis Ababa', to: 'Gondar', distance: '738 km', duration: '7 hours', basePrice: 550, popular: true },
    { id: 3, from: 'Addis Ababa', to: 'Hawassa', distance: '275 km', duration: '5 hours', basePrice: 350, popular: false },
  ]);

  const [newBus, setNewBus] = useState({
    name: '', from: '', to: '', departure: '', arrival: '', price: '', totalSeats: '', type: 'Standard'
  });

  const [newRoute, setNewRoute] = useState({
    from: '', to: '', distance: '', duration: '', basePrice: ''
  });

  // Get all bookings from all users
  const allBookings = allUsers.flatMap(u => 
    (u.bookings || []).map(b => ({ ...b, passengerName: u.name, passengerEmail: u.email }))
  );

  const stats = {
    totalBookings: allBookings.length,
    totalRevenue: allBookings.reduce((sum, b) => sum + b.amount, 0),
    totalBuses: buses.length,
    totalRoutes: routes.length,
    totalUsers: allUsers.length,
  };

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
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
      setNewBus({ name: '', from: '', to: '', departure: '', arrival: '', price: '', totalSeats: '', type: 'Standard' });
      toast.success('Bus added successfully!');
    } else {
      toast.error('Please fill all required fields');
    }
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

  const handleDeleteRoute = (id) => {
    if (window.confirm('Delete this route?')) {
      setRoutes(routes.filter(r => r.id !== id));
      toast.success('Route deleted!');
    }
  };
  useEffect(() => {
  // Auto login as admin for development
  if (!user) {
    const adminUser = {
      id: 'admin1',
      name: 'Admin User',
      email: 'admin@bus.com',
      role: 'admin'
    };
    localStorage.setItem('currentUser', JSON.stringify(adminUser));
    window.location.reload();
  }
}, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 transition-all text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md">
            <Ticket className="w-5 h-5 text-blue-500 mb-1" />
            <div className="text-xl font-bold text-gray-900 dark:text-white">{stats.totalBookings}</div>
            <div className="text-xs text-gray-500">Bookings</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md">
            <DollarSign className="w-5 h-5 text-green-500 mb-1" />
            <div className="text-xl font-bold text-gray-900 dark:text-white">ETB {stats.totalRevenue.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Revenue</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md">
            <Bus className="w-5 h-5 text-purple-500 mb-1" />
            <div className="text-xl font-bold text-gray-900 dark:text-white">{stats.totalBuses}</div>
            <div className="text-xs text-gray-500">Buses</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md">
            <MapPin className="w-5 h-5 text-orange-500 mb-1" />
            <div className="text-xl font-bold text-gray-900 dark:text-white">{stats.totalRoutes}</div>
            <div className="text-xs text-gray-500">Routes</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md">
            <Users className="w-5 h-5 text-pink-500 mb-1" />
            <div className="text-xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</div>
            <div className="text-xs text-gray-500">Users</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['overview', 'buses', 'routes', 'bookings', 'users'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg capitalize text-sm transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:shadow-md'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Recent Bookings</h3>
            <div className="space-y-2">
              {allBookings.slice(0, 5).map((booking, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{booking.passengerName}</p>
                    <p className="text-xs text-gray-500">{booking.route}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600">ETB {booking.amount}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">{booking.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Buses Tab */}
        {activeTab === 'buses' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Manage Buses</h3>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setNewBus({ name: '', from: '', to: '', departure: '', arrival: '', price: '', totalSeats: '', type: 'Standard' });
                  setShowModal(true);
                }}
                className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Bus</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-3 py-2 text-left">Name</th>
                    <th className="px-3 py-2 text-left">Route</th>
                    <th className="px-3 py-2 text-left">Price</th>
                    <th className="px-3 py-2 text-left">Type</th>
                    <th className="px-3 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {buses.map((bus) => (
                    <tr key={bus.id} className="border-t dark:border-gray-700">
                      <td className="px-3 py-2">{bus.name}</td>
                      <td className="px-3 py-2">{bus.from} → {bus.to}</td>
                      <td className="px-3 py-2">ETB {bus.price}</td>
                      <td className="px-3 py-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${bus.type === 'VIP' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
                          {bus.type}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <button onClick={() => handleDeleteBus(bus.id)} className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Routes Tab */}
        {activeTab === 'routes' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Manage Routes</h3>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setNewRoute({ from: '', to: '', distance: '', duration: '', basePrice: '' });
                  setShowModal(true);
                }}
                className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Route</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-3 py-2 text-left">From</th>
                    <th className="px-3 py-2 text-left">To</th>
                    <th className="px-3 py-2 text-left">Distance</th>
                    <th className="px-3 py-2 text-left">Price</th>
                    <th className="px-3 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map((route) => (
                    <tr key={route.id} className="border-t dark:border-gray-700">
                      <td className="px-3 py-2">{route.from}</td>
                      <td className="px-3 py-2">{route.to}</td>
                      <td className="px-3 py-2">{route.distance}</td>
                      <td className="px-3 py-2">ETB {route.basePrice}</td>
                      <td className="px-3 py-2">
                        <button onClick={() => handleDeleteRoute(route.id)} className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">All Bookings</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-3 py-2 text-left">Passenger</th>
                    <th className="px-3 py-2 text-left">Route</th>
                    <th className="px-3 py-2 text-left">Date</th>
                    <th className="px-3 py-2 text-left">Seats</th>
                    <th className="px-3 py-2 text-left">Amount</th>
                    <th className="px-3 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allBookings.map((booking, idx) => (
                    <tr key={idx} className="border-t dark:border-gray-700">
                      <td className="px-3 py-2">{booking.passengerName}</td>
                      <td className="px-3 py-2">{booking.route}</td>
                      <td className="px-3 py-2">{booking.date}</td>
                      <td className="px-3 py-2">{booking.seats}</td>
                      <td className="px-3 py-2">ETB {booking.amount}</td>
                      <td className="px-3 py-2">
                        <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">{booking.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Registered Users</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-3 py-2 text-left">Name</th>
                    <th className="px-3 py-2 text-left">Email</th>
                    <th className="px-3 py-2 text-left">Role</th>
                    <th className="px-3 py-2 text-left">Bookings</th>
                    <th className="px-3 py-2 text-left">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((u) => (
                    <tr key={u.id} className="border-t dark:border-gray-700">
                      <td className="px-3 py-2">{u.name}</td>
                      <td className="px-3 py-2 text-xs">{u.email}</td>
                      <td className="px-3 py-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-3 py-2">{(u.bookings || []).length}</td>
                      <td className="px-3 py-2 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {activeTab === 'buses' ? 'Add New Bus' : 'Add New Route'}
                  </h3>
                  <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4 space-y-3">
                  {activeTab === 'buses' ? (
                    <>
                      <input type="text" placeholder="Bus Name" value={newBus.name} onChange={(e) => setNewBus({...newBus, name: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="From" value={newBus.from} onChange={(e) => setNewBus({...newBus, from: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
                        <input type="text" placeholder="To" value={newBus.to} onChange={(e) => setNewBus({...newBus, to: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="time" placeholder="Departure" value={newBus.departure} onChange={(e) => setNewBus({...newBus, departure: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
                        <input type="time" placeholder="Arrival" value={newBus.arrival} onChange={(e) => setNewBus({...newBus, arrival: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="number" placeholder="Price" value={newBus.price} onChange={(e) => setNewBus({...newBus, price: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
                        <input type="number" placeholder="Total Seats" value={newBus.totalSeats} onChange={(e) => setNewBus({...newBus, totalSeats: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
                      </div>
                      <select value={newBus.type} onChange={(e) => setNewBus({...newBus, type: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg">
                        <option value="Standard">Standard</option>
                        <option value="VIP">VIP</option>
                      </select>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="From" value={newRoute.from} onChange={(e) => setNewRoute({...newRoute, from: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
                        <input type="text" placeholder="To" value={newRoute.to} onChange={(e) => setNewRoute({...newRoute, to: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Distance" value={newRoute.distance} onChange={(e) => setNewRoute({...newRoute, distance: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
                        <input type="text" placeholder="Duration" value={newRoute.duration} onChange={(e) => setNewRoute({...newRoute, duration: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
                      </div>
                      <input type="number" placeholder="Base Price" value={newRoute.basePrice} onChange={(e) => setNewRoute({...newRoute, basePrice: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
                    </>
                  )}
                  <button onClick={activeTab === 'buses' ? handleAddBus : handleAddRoute} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg text-sm font-semibold">
                    {activeTab === 'buses' ? 'Add Bus' : 'Add Route'}
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