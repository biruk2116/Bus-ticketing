// src/components/AdminDashboard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Bus, Users, Ticket, DollarSign, X } from 'lucide-react';
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
  const [buses, setBuses] = useState([
    { id: 1, name: 'Ethio Luxury Express', from: 'Addis Ababa', to: 'Bahir Dar', price: 450, type: 'VIP' },
    { id: 2, name: 'Sky Bus', from: 'Addis Ababa', to: 'Gondar', price: 550, type: 'VIP' },
  ]);
  const [newBus, setNewBus] = useState({
    name: '', from: '', to: '', price: '', type: 'Standard'
  });

  const stats = {
    totalBookings: 1234,
    totalRevenue: 654321,
    totalBuses: 12,
    totalUsers: 5678,
  };

  const bookings = [
    { id: 'BK001', passenger: 'John Doe', bus: 'Ethio Luxury', date: '2024-01-15', amount: 450, status: 'confirmed' },
    { id: 'BK002', passenger: 'Jane Smith', bus: 'Sky Bus', date: '2024-01-16', amount: 550, status: 'pending' },
  ];

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', bookings: 3 },
    { id: 2, name: 'Admin User', email: 'admin@bus.com', role: 'admin', bookings: 0 },
  ];

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  const handleAddBus = () => {
    if (newBus.name && newBus.from && newBus.to && newBus.price) {
      setBuses([...buses, { ...newBus, id: Date.now(), price: parseInt(newBus.price) }]);
      setShowAddModal(false);
      setNewBus({ name: '', from: '', to: '', price: '', type: 'Standard' });
      toast.success('Bus added successfully!');
    }
  };

  const handleDeleteBus = (id) => {
    setBuses(buses.filter(bus => bus.id !== id));
    toast.success('Bus deleted successfully!');
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
            <Button variant="outline" onClick={() => setActiveTab('buses')}>Buses</Button>
            <Button variant="outline" onClick={() => setActiveTab('bookings')}>Bookings</Button>
            <Button variant="outline" onClick={() => setActiveTab('users')}>Users</Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Panel className="text-center">
            <Ticket className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <div className="text-gray-600">Total Bookings</div>
          </Panel>
          <Panel className="text-center">
            <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">ETB {stats.totalRevenue.toLocaleString()}</div>
            <div className="text-gray-600">Total Revenue</div>
          </Panel>
          <Panel className="text-center">
            <Bus className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold">{stats.totalBuses}</div>
            <div className="text-gray-600">Active Buses</div>
          </Panel>
          <Panel className="text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <div className="text-gray-600">Total Users</div>
          </Panel>
        </div>

        {/* Buses Tab */}
        {activeTab === 'buses' && (
          <Panel>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Manage Buses</h2>
              <Button onClick={() => setShowAddModal(true)}>
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
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {buses.map(bus => (
                    <tr key={bus.id} className="border-t">
                      <td className="px-4 py-2">{bus.name}</td>
                      <td className="px-4 py-2">{bus.from} → {bus.to}</td>
                      <td className="px-4 py-2">ETB {bus.price}</td>
                      <td className="px-4 py-2">{bus.type}</td>
                      <td className="px-4 py-2">
                        <button className="text-blue-600 mr-2" onClick={() => toast.info('Edit feature coming soon')}>
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600" onClick={() => handleDeleteBus(bus.id)}>
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
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking.id} className="border-t">
                      <td className="px-4 py-2">{booking.id}</td>
                      <td className="px-4 py-2">{booking.passenger}</td>
                      <td className="px-4 py-2">{booking.bus}</td>
                      <td className="px-4 py-2">{booking.date}</td>
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
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-t">
                      <td className="px-4 py-2">{user.name}</td>
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
                      <td className="px-4 py-2">
                        <button className="text-red-600" onClick={() => toast.info('User management coming soon')}>
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

        {/* Add Bus Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Panel className="max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Add New Bus</h3>
                <button onClick={() => setShowAddModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <Field
                  label="Bus Name"
                  value={newBus.name}
                  onChange={(e) => setNewBus({ ...newBus, name: e.target.value })}
                />
                <Field
                  label="From"
                  value={newBus.from}
                  onChange={(e) => setNewBus({ ...newBus, from: e.target.value })}
                />
                <Field
                  label="To"
                  value={newBus.to}
                  onChange={(e) => setNewBus({ ...newBus, to: e.target.value })}
                />
                <Field
                  label="Price"
                  type="number"
                  value={newBus.price}
                  onChange={(e) => setNewBus({ ...newBus, price: e.target.value })}
                />
                <Field
                  label="Bus Type"
                  value={newBus.type}
                  onChange={(e) => setNewBus({ ...newBus, type: e.target.value })}
                />
                <Button className="w-full" onClick={handleAddBus}>
                  Add Bus
                </Button>
              </div>
            </Panel>
          </div>
        )}
      </motion.div>
    </div>
  );
};