// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login - Replace with actual API call
  const login = async (email, password) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      let userData;
      if (email === 'admin@bus.com') {
        userData = { id: '1', name: 'Admin User', email, role: 'admin' };
      } else {
        userData = { id: '2', name: email.split('@')[0], email, role: 'user' };
      }
      
      const token = 'mock_token_' + Date.now();
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      toast.success(`Welcome back, ${userData.name}!`);
      return true;
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  // Mock signup - Replace with actual API call
  const signup = async (name, email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = { id: Date.now().toString(), name, email, role: 'user' };
      const token = 'mock_token_' + Date.now();
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      toast.error('Signup failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};