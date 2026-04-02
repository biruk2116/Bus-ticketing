// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Bus, Users, Ticket, DollarSign, X, MapPin, Clock, Coffee, Wifi, Wind } from 'lucide-react';
import { Button } from './ui/Button';
import { Panel } from './ui/Panel';
import { Field } from './ui/Field';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('buses');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  
  const [buses, setBuses] = useState([
    { id: 1, name: 'Ethio Luxury Express', from: 'Addis Ababa', to: 'Bahir Dar', departure: '06:00', arrival: '12:00', price: 450, totalSeats: 40, type: 'VIP', amenities: ['wifi', 'ac', 'refreshments'] },
    { id: 2, name: 'Sky Bus', from: 'Addis Ababa', to: 'Gondar', departure: '07:30', arrival: '14:30', price: 550, totalSeats: 40, type: 'VIP', amenities: ['wifi', 'ac'] },
    { id: 3, name: 'Selam Bus', from: 'Addis Ababa', to: 'Hawassa', departure: '08:00', arrival: '13:00', price: 350, totalSeats: 45, type: 'Standard', amenities: ['ac'] },
  ]);

  const [routes, setRoutes] = useState([
    { id: 1, from: 'Addis Ababa', to: 'Bahir Dar', distance: '565 km', duration: '6 hours', price: 450 },
    { id: 2, from: 'Addis Ababa', to: 'Gondar', distance: '738 km', duration: '7 hours', price: 550 },
    { id: 3, from: 'Addis Ababa', to: 'Hawassa', distance: '275 km', duration: '5 hours', price: 350 },
  ]);

  const [newBus, setNewBus] = useState({
    name: '', from: '', to: '', departure: '', arrival: '', price: '', totalSeats: '', type: 'Standard', amenities: []
  });

  const [newRoute, setNewRoute] = useState({
    from: '', to: '', distance: '', duration: '', price: ''
  });

  const stats = {
    totalBookings: 1234,
    totalRevenue: 654321,
    totalBuses: buses.length,
    totalRoutes: routes.length,
    totalUsers: 5678,
  };

  const bookings = [
    { id: 'BK001', passenger: 'John Doe', bus: 'Ethio Luxury', route: 'Addis Ababa - Bahir Dar', date: '2024-01-15', seats: '12,13', amount: 900, status: 'confirmed' },
    { id: 'BK002', passenger: 'Jane Smith', bus: 'Sky Bus', route: 'Addis Ababa - Gondar', date: '2024-01-16', seats: '5', amount: 550, status: 'pending' },
    { id: 'BK003', passenger: 'Tesfaye Abebe', bus: 'Selam Bus', route: 'Addis Ababa - Hawassa', date: '2024-01-17', seats: '22,23,24', amount: 1050, status: 'confirmed' },
  ];

  const users_list = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', bookings: 3, joinDate: '2024-01-01' },
    { id: 2, name: 'Admin User', email: 'admin@bus.com', role: 'admin', bookings: 0, joinDate: '2024-01-01' },
    { id: 3, name: 'Sarah Williams', email: 'sarah@example.com', role: 'user', bookings: 5, joinDate: '2024-01-10' },
  ];

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  const handleAddBus = () => {
    if (newBus.name && newBus.from && newBus.to && newBus.price) {
      setBuses([...buses, { 
        ...newBus, 
        id: Date.now(), 
        price: parseInt(newBus.price),
        totalSeats: parseInt(newBus.totalSeats) || 40
      }]);
      setShowAddModal(false);
      setNewBus({ name: '', from: '', to: '', departure: '', arrival: '', price: '', totalSeats: '', type: 'Standard', amenities: [] });
      toast.success('Bus added successfully!');
    } else {
      toast.error('Please fill all required fields');
    }
  };

  const handleEditBus = (bus) => {
    setEditingBus(bus);
    setNewBus(bus);
    setShowAddModal(true);
  };

  const handleUpdateBus = () => {
    setBuses(buses.map(bus => bus.id === editingBus.id ? { ...newBus, id: bus.id } : bus));
    setShowAddModal(false);
    setEditingBus(null);
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
    if (newRoute.from && newRoute.to && newRoute.price) {
      setRoutes([...routes, { ...newRoute, id: Date.now(), price: parseInt(newRoute.price) }]);
      setShowRouteModal(false);
      setNewRoute({ from: '', to: '', distance: '', duration: '', price: '' });
      toast.success('Route added successfully!');
    } else {
      toast.error('Please fill all required fields');
    }
  };

  const handleDeleteRoute = (id) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      setRoutes(routes.filter(route => route.id !== id));
      toast.success('Route deleted successfully!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex space-x-2">
            <Button variant={activeTab === 'buses' ? 'primary' : 'outline'} onClick={() => setActiveTab('buses')}>
              <Bus className="w-4 h-4 mr-2" />
              Buses
            </Button>
            <Button variant={activeTab === 'routes' ? 'primary' : 'outline'} onClick={() => setActiveTab('routes')}>
              <MapPin className="w-4 h-4 mr-2" />
              Routes
            </Button>
            <Button variant={activeTab === 'bookings' ? 'primary' : 'outline'} onClick={() => setActiveTab('bookings')}>
              <Ticket className="w-4 h-4 mr-2" />
              Bookings
            </Button>
            <Button variant={activeTab === 'users' ? 'primary' : 'outline'} onClick={() => setActiveTab('users')}>
              <Users className="w-4 h-4 mr-2" />
              Users
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Panel className="text-center">
            <Ticket className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <div className="text-gray-600 text-sm">Total Bookings</div>
          </Panel>
          <Panel className="text-center">
            <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">ETB {stats.totalRevenue.toLocaleString()}</div>
            <div className="text-gray-600 text-sm">Total Revenue</div>
          </Panel>
          <Panel className="text-center">
            <Bus className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold">{stats.totalBuses}</div>
            <div className="text-gray-600 text-sm">Active Buses</div>
          </Panel>
          <Panel className="text-center">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold">{stats.totalRoutes}</div>
            <div className="text-gray-600 text-sm">Total Routes</div>
          </Panel>
          <Panel className="text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-pink-600" />
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <div className="text-gray-600 text-sm">Total Users</div>
          </Panel>
        </div>

        {/* Buses Tab */}
        {activeTab === 'buses' && (
          <Panel>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Manage Buses</h2>
              <Button onClick={() => {
                setEditingBus(null);
                setNewBus({ name: '', from: '', to: '', departure: '', arrival: '', price: '', totalSeats: '', type: 'Standard', amenities: [] });
                setShowAddModal(true);
              }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Bus
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Route</th>
                    <th className="px-4 py-2 text-left">Departure</th>
                    <th className="px-4 py-2 text-left">Arrival</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Seats</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {buses.map(bus => (
                    <tr key={bus.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-2 font-medium">{bus.name}</td>
                      <td className="px-4 py-2">{bus.from} → {bus.to}</td>
                      <td className="px-4 py-2">{bus.departure}</td>
                      <td className="px-4 py-2">{bus.arrival}</td>
                      <td className="px-4 py-2">ETB {bus.price}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          bus.type === 'VIP' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {bus.type}
                        </span>
                      </td>
                      <td className="px-4 py-2">{bus.totalSeats}</td>
                      <td className="px-4 py-2">
                        <button className="text-blue-600 mr-2 hover:text-blue-800" onClick={() => handleEditBus(bus)}>
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800" onClick={() => handleDeleteBus(bus.id)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        )}

        {/* Routes Tab */}
        {activeTab === 'routes' && (
          <Panel>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Manage Routes</h2>
              <Button onClick={() => setShowRouteModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Route
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left">From</th>
                    <th className="px-4 py-2 text-left">To</th>
                    <th className="px-4 py-2 text-left">Distance</th>
                    <th className="px-4 py-2 text-left">Duration</th>
                    <th className="px-4 py-2 text-left">Base Price</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map(route => (
                    <tr key={route.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-2 font-medium">{route.from}</td>
                      <td className="px-4 py-2">{route.to}</td>
                      <td className="px-4 py-2">{route.distance}</td>
                      <td className="px-4 py-2">{route.duration}</td>
                      <td className="px-4 py-2">ETB {route.price}</td>
                      <td className="px-4 py-2">
                        <button className="text-red-600 hover:text-red-800" onClick={() => handleDeleteRoute(route.id)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <Panel>
            <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left">Booking ID</th>
                    <th className="px-4 py-2 text-left">Passenger</th>
                    <th className="px-4 py-2 text-left">Bus</th>
                    <th className="px-4 py-2 text-left">Route</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Seats</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-2 font-medium">{booking.id}</td>
                      <td className="px-4 py-2">{booking.passenger}</td>
                      <td className="px-4 py-2">{booking.bus}</td>
                      <td className="px-4 py-2">{booking.route}</td>
                      <td className="px-4 py-2">{booking.date}</td>
                      <td className="px-4 py-2">{booking.seats}</td>
                      <td className="px-4 py-2">ETB {booking.amount}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <Panel>
            <h2 className="text-xl font-bold mb-4">User Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Role</th>
                    <th className="px-4 py-2 text-left">Bookings</th>
                    <th className="px-4 py-2 text-left">Join Date</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users_list.map(user => (
                    <tr key={user.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-2 font-medium">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-2">{user.bookings}</td>
                      <td className="px-4 py-2">{user.joinDate}</td>
                      <td className="px-4 py-2">
                        <button className="text-red-600 hover:text-red-800" onClick={() => toast.info('User management coming soon')}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        )}

        {/* Add/Edit Bus Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Panel className="max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{editingBus ? 'Edit Bus' : 'Add New Bus'}</h3>
                <button onClick={() => {
                  setShowAddModal(false);
                  setEditingBus(null);
                }}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <Field
                  label="Bus Name *"
                  value={newBus.name}
                  onChange={(e) => setNewBus({ ...newBus, name: e.target.value })}
                  placeholder="e.g., Ethio Luxury Express"
                />
                <Field
                  label="From *"
                  value={newBus.from}
                  onChange={(e) => setNewBus({ ...newBus, from: e.target.value })}
                  placeholder="Departure city"
                />
                <Field
                  label="To *"
                  value={newBus.to}
                  onChange={(e) => setNewBus({ ...newBus, to: e.target.value })}
                  placeholder="Arrival city"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="Departure Time"
                    type="time"
                    value={newBus.departure}
                    onChange={(e) => setNewBus({ ...newBus, departure: e.target.value })}
                  />
                  <Field
                    label="Arrival Time"
                    type="time"
                    value={newBus.arrival}
                    onChange={(e) => setNewBus({ ...newBus, arrival: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="Price (ETB) *"
                    type="number"
                    value={newBus.price}
                    onChange={(e) => setNewBus({ ...newBus, price: e.target.value })}
                    placeholder="e.g., 450"
                  />
                  <Field
                    label="Total Seats"
                    type="number"
                    value={newBus.totalSeats}
                    onChange={(e) => setNewBus({ ...newBus, totalSeats: e.target.value })}
                    placeholder="e.g., 40"
                  />
                </div>
                <Field
                  label="Bus Type"
                  value={newBus.type}
                  onChange={(e) => setNewBus({ ...newBus, type: e.target.value })}
                  select
                  options={[
                    { value: 'Standard', label: 'Standard' },
                    { value: 'VIP', label: 'VIP' }
                  ]}
                />
                <Button className="w-full" onClick={editingBus ? handleUpdateBus : handleAddBus}>
                  {editingBus ? 'Update Bus' : 'Add Bus'}
                </Button>
              </div>
            </Panel>
          </div>
        )}

        {/* Add Route Modal */}
        {showRouteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Panel className="max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Add New Route</h3>
                <button onClick={() => setShowRouteModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <Field
                  label="From *"
                  value={newRoute.from}
                  onChange={(e) => setNewRoute({ ...newRoute, from: e.target.value })}
                  placeholder="Departure city"
                />
                <Field
                  label="To *"
                  value={newRoute.to}
                  onChange={(e) => setNewRoute({ ...newRoute, to: e.target.value })}
                  placeholder="Arrival city"
                />
                <Field
                  label="Distance"
                  value={newRoute.distance}
                  onChange={(e) => setNewRoute({ ...newRoute, distance: e.target.value })}
                  placeholder="e.g., 565 km"
                />
                <Field
                  label="Duration"
                  value={newRoute.duration}
                  onChange={(e) => setNewRoute({ ...newRoute, duration: e.target.value })}
                  placeholder="e.g., 6 hours"
                />
                <Field
                  label="Base Price (ETB) *"
                  type="number"
                  value={newRoute.price}
                  onChange={(e) => setNewRoute({ ...newRoute, price: e.target.value })}
                  placeholder="e.g., 450"
                />
                <Button className="w-full" onClick={handleAddRoute}>
                  Add Route
                </Button>
              </div>
            </Panel>
          </div>
        )}
      </motion.div>
    </div>
  );
};