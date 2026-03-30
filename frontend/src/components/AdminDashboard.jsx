// frontend/src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  FaBus, FaRoute, FaMoneyBillWave, FaClock, 
  FaCalendarAlt, FaUsers, FaChartBar, FaPlus,
  FaEdit, FaTrash, FaEye
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [buses, setBuses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showAddBusModal, setShowAddBusModal] = useState(false);
  const [newBus, setNewBus] = useState({
    company: '',
    capacity: 52,
    amenities: [],
    basePrice: 500
  });

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      toast.error('Unauthorized access');
      navigate('/');
    }
  }, [isAdmin, navigate]);

  // Load data
  useEffect(() => {
    // Load buses from localStorage or use mock data
    const savedBuses = JSON.parse(localStorage.getItem('adminBuses') || '[]');
    if (savedBuses.length === 0) {
      // Mock data
      const mockBuses = [
        { id: 1, company: 'Selam Bus', capacity: 52, amenities: ['WiFi', 'AC'], basePrice: 500, totalTrips: 150 },
        { id: 2, company: 'Ethio Bus', capacity: 48, amenities: ['WiFi', 'AC', 'TV'], basePrice: 550, totalTrips: 120 },
        { id: 3, company: 'Sky Bus', capacity: 50, amenities: ['AC'], basePrice: 480, totalTrips: 200 }
      ];
      setBuses(mockBuses);
    } else {
      setBuses(savedBuses);
    }

    // Load bookings
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(savedBookings);
  }, []);

  const handleAddBus = (e) => {
    e.preventDefault();
    const busWithId = {
      ...newBus,
      id: Date.now(),
      totalTrips: 0
    };
    const updatedBuses = [...buses, busWithId];
    setBuses(updatedBuses);
    localStorage.setItem('adminBuses', JSON.stringify(updatedBuses));
    setShowAddBusModal(false);
    setNewBus({ company: '', capacity: 52, amenities: [], basePrice: 500 });
    toast.success('Bus added successfully');
  };

  const handleDeleteBus = (busId) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      const updatedBuses = buses.filter(b => b.id !== busId);
      setBuses(updatedBuses);
      localStorage.setItem('adminBuses', JSON.stringify(updatedBuses));
      toast.success('Bus deleted successfully');
    }
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: FaChartBar },
    { id: 'buses', name: 'Manage Buses', icon: FaBus },
    { id: 'routes', name: 'Routes', icon: FaRoute },
    { id: 'bookings', name: 'Bookings', icon: FaEye },
    { id: 'users', name: 'Users', icon: FaUsers }
  ];

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen fixed">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Admin Panel</h2>
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300
                    ${activeTab === tab.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-blue-50'}`}
                >
                  <tab.icon className="text-xl" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Buses', value: buses.length, icon: FaBus, color: 'bg-blue-500' },
                    { label: 'Total Bookings', value: bookings.length, icon: FaEye, color: 'bg-green-500' },
                    { label: 'Total Revenue', value: `${bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0)} ETB`, icon: FaMoneyBillWave, color: 'bg-purple-500' },
                    { label: 'Active Users', value: '1,234', icon: FaUsers, color: 'bg-orange-500' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white rounded-lg shadow-lg p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">{stat.label}</p>
                          <p className="text-2xl font-bold mt-2">{stat.value}</p>
                        </div>
                        <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl`}>
                          <stat.icon />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3">Booking ID</th>
                          <th className="text-left py-3">Passenger</th>
                          <th className="text-left py-3">Bus</th>
                          <th className="text-left py-3">Amount</th>
                          <th className="text-left py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.slice(0, 5).map((booking) => (
                          <tr key={booking.bookingId} className="border-b hover:bg-gray-50">
                            <td className="py-3">{booking.bookingId}</td>
                            <td className="py-3">{booking.name}</td>
                            <td className="py-3">{booking.bus?.company}</td>
                            <td className="py-3">{booking.totalAmount + 50} ETB</td>
                            <td className="py-3">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                                {booking.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'buses' && (
              <motion.div
                key="buses"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-3xl font-bold text-gray-900">Manage Buses</h1>
                  <button
                    onClick={() => setShowAddBusModal(true)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <FaPlus />
                    <span>Add New Bus</span>
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-6">Company</th>
                        <th className="text-left py-3 px-6">Capacity</th>
                        <th className="text-left py-3 px-6">Amenities</th>
                        <th className="text-left py-3 px-6">Base Price</th>
                        <th className="text-left py-3 px-6">Total Trips</th>
                        <th className="text-left py-3 px-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buses.map((bus) => (
                        <tr key={bus.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-6 font-medium">{bus.company}</td>
                          <td className="py-3 px-6">{bus.capacity} seats</td>
                          <td className="py-3 px-6">
                            <div className="flex flex-wrap gap-1">
                              {bus.amenities?.map((a, i) => (
                                <span key={i} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                                  {a}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-6">{bus.basePrice} ETB</td>
                          <td className="py-3 px-6">{bus.totalTrips || 0}</td>
                          <td className="py-3 px-6">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800">
                                <FaEdit />
                              </button>
                              <button 
                                onClick={() => handleDeleteBus(bus.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'bookings' && (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-6">All Bookings</h1>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-6">Booking ID</th>
                        <th className="text-left py-3 px-6">Passenger</th>
                        <th className="text-left py-3 px-6">Bus</th>
                        <th className="text-left py-3 px-6">Seats</th>
                        <th className="text-left py-3 px-6">Amount</th>
                        <th className="text-left py-3 px-6">Date</th>
                        <th className="text-left py-3 px-6">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.bookingId} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-6">{booking.bookingId}</td>
                          <td className="py-3 px-6">{booking.name}</td>
                          <td className="py-3 px-6">{booking.bus?.company}</td>
                          <td className="py-3 px-6">{booking.selectedSeats?.length}</td>
                          <td className="py-3 px-6">{booking.totalAmount + 50} ETB</td>
                          <td className="py-3 px-6">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                          <td className="py-3 px-6">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                              {booking.status}
                            </span>
                          </td>
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

      {/* Add Bus Modal */}
      <AnimatePresence>
        {showAddBusModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowAddBusModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6">Add New Bus</h2>
              <form onSubmit={handleAddBus}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newBus.company}
                      onChange={(e) => setNewBus({ ...newBus, company: e.target.value })}
                      className="input-field"
                      placeholder="e.g., Selam Bus"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Capacity
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="100"
                      value={newBus.capacity}
                      onChange={(e) => setNewBus({ ...newBus, capacity: parseInt(e.target.value) })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Base Price (ETB)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={newBus.basePrice}
                      onChange={(e) => setNewBus({ ...newBus, basePrice: parseInt(e.target.value) })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Amenities (comma separated)
                    </label>
                    <input
                      type="text"
                      value={newBus.amenities.join(', ')}
                      onChange={(e) => setNewBus({ ...newBus, amenities: e.target.value.split(',').map(a => a.trim()) })}
                      className="input-field"
                      placeholder="WiFi, AC, TV, etc."
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddBusModal(false)}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Add Bus
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;