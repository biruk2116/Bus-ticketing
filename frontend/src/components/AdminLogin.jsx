// src/components/AdminLogin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Key, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, users } = useAuth();
  const [email, setEmail] = useState('admin@bus.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  // Check if admin exists on component mount
  useEffect(() => {
    const checkAdmin = () => {
      const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const adminExists = storedUsers.find(u => u.email === 'admin@bus.com');
      if (!adminExists) {
        // Create admin if not exists
        const adminUser = {
          id: 'admin_' + Date.now(),
          name: 'Admin User',
          email: 'admin@bus.com',
          password: 'admin123',
          role: 'admin',
          createdAt: new Date().toISOString(),
          bookings: []
        };
        const updatedUsers = [...storedUsers, adminUser];
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
        console.log('Admin account created:', adminUser);
      }
    };
    checkAdmin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Debug log
    console.log('Attempting login with:', email, password);
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    console.log('Stored users:', storedUsers);
    
    const success = await login(email, password);
    setIsLoading(false);
    
    if (success) {
      toast.success('Admin login successful! Redirecting...');
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    }
  };

  const createAdminAccount = () => {
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const adminExists = storedUsers.find(u => u.email === 'admin@bus.com');
    
    if (!adminExists) {
      const adminUser = {
        id: 'admin_' + Date.now(),
        name: 'Admin User',
        email: 'admin@bus.com',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date().toISOString(),
        bookings: []
      };
      const updatedUsers = [...storedUsers, adminUser];
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      toast.success('Admin account created! You can now login.');
      console.log('Admin account created:', adminUser);
    } else {
      toast.info('Admin account already exists');
    }
    setShowDebug(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-20 px-4">
      <div className="absolute top-20 left-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Access</h2>
            <p className="text-gray-600 dark:text-gray-400">Enter admin credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Admin Email</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg pl-10 pr-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg pl-10 pr-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  required
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verifying...
                </div>
              ) : (
                'Access Admin Panel'
              )}
            </motion.button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-400 text-center">
              <CheckCircle className="w-4 h-4 inline mr-1" />
              Admin Credentials:<br />
              <strong>Email:</strong> admin@bus.com<br />
              <strong>Password:</strong> admin123
            </p>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => setShowDebug(!showDebug)}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              {showDebug ? 'Hide Debug' : 'Show Debug Info'}
            </button>
          </div>

          {showDebug && (
            <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs">
              <p className="font-mono">Debug Info:</p>
              <p className="font-mono">LocalStorage Users: {JSON.stringify(JSON.parse(localStorage.getItem('registeredUsers') || '[]'))}</p>
              <button
                onClick={createAdminAccount}
                className="mt-2 px-3 py-1 bg-green-600 text-white rounded-lg text-xs"
              >
                Force Create Admin Account
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};