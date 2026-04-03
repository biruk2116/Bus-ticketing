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
  const [users, setUsers] = useState([]);

  // Load users from localStorage on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('registeredUsers');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Create default admin account if no users exist
      const defaultAdmin = {
        id: 'admin_' + Date.now(),
        name: 'Admin User',
        email: 'admin@bus.com',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date().toISOString(),
        bookings: []
      };
      setUsers([defaultAdmin]);
      localStorage.setItem('registeredUsers', JSON.stringify([defaultAdmin]));
    }
    
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('registeredUsers', JSON.stringify(users));
    }
  }, [users]);

  const signup = async (name, email, password) => {
    // Check if user already exists
    const userExists = users.find(u => u.email === email);
    if (userExists) {
      toast.error('User already exists! Please login.');
      return false;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: email === 'admin@bus.com' ? 'admin' : 'user',
      createdAt: new Date().toISOString(),
      bookings: []
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setUser(newUser);
    toast.success('Account created successfully!');
    return true;
  };

  const login = async (email, password) => {
    // Get fresh users from localStorage
    const freshUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const foundUser = freshUsers.find(u => u.email === email);
    
    if (!foundUser) {
      toast.error('User not found! Please sign up first.');
      return false;
    }

    if (foundUser.password !== password) {
      toast.error('Invalid password!');
      return false;
    }

    localStorage.setItem('currentUser', JSON.stringify(foundUser));
    setUser(foundUser);
    toast.success(`Welcome back, ${foundUser.name}!`);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    toast.success('Logged out successfully');
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
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      toast.success('Booking saved to your history!');
    }
  };

  const getUserBookings = () => {
    return user?.bookings || [];
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      signup, 
      logout, 
      addBooking, 
      getUserBookings,
      users 
    }}>
      {children}
    </AuthContext.Provider>
  );
};