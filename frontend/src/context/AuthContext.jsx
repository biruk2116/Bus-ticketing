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
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('registeredUsers');
    if (saved) {
      return JSON.parse(saved);
    }
    // Create default admin account
    return [
      {
        id: 'admin1',
        name: 'Admin User',
        email: 'admin@bus.com',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date().toISOString(),
        bookings: []
      }
    ];
  });

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  }, [users]);

  const signup = async (name, email, password) => {
    if (users.find(u => u.email === email)) {
      toast.error('User already exists!');
      return false;
    }
    const newUser = {
      id: Date.now().toString(),
      name, email, password,
      role: email === 'admin@bus.com' ? 'admin' : 'user',
      createdAt: new Date().toISOString(),
      bookings: []
    };
    const updated = [...users, newUser];
    setUsers(updated);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setUser(newUser);
    toast.success('Account created!');
    return true;
  };

  const login = async (email, password) => {
    const found = users.find(u => u.email === email);
    if (!found) {
      toast.error('User not found! Please sign up.');
      return false;
    }
    if (found.password !== password) {
      toast.error('Invalid password!');
      return false;
    }
    localStorage.setItem('currentUser', JSON.stringify(found));
    setUser(found);
    toast.success(`Welcome back, ${found.name}!`);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    toast.success('Logged out');
  };

  const addBooking = (booking) => {
    if (user) {
      const updatedUser = {
        ...user,
        bookings: [...(user.bookings || []), { ...booking, id: Date.now(), date: new Date().toLocaleDateString() }]
      };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
      setUsers(updatedUsers);
      toast.success('Booking saved!');
    }
  };

  const getUserBookings = () => user?.bookings || [];

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, addBooking, getUserBookings, users }}>
      {children}
    </AuthContext.Provider>
  );
};