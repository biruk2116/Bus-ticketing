// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    if (email && password) {
      const user = { 
        id: '1', 
        email, 
        name: email.split('@')[0],
        role: email === 'admin@bus.com' ? 'admin' : 'user'
      };
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      toast.success('Login successful!');
      return true;
    }
    toast.error('Invalid credentials');
    return false;
  };

  const signup = async (name, email, password) => {
    const user = { id: Date.now().toString(), name, email, role: 'user' };
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    toast.success('Account created successfully!');
    return true;
  };

  const logout = () => {
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