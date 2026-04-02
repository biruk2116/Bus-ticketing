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
    const savedUsers = localStorage.getItem('registeredUsers');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  }, [users]);

  const signup = async (name, email, password) => {
    try {
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

      setUsers([...users, newUser]);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      setUser(newUser);
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      toast.error('Signup failed. Please try again.');
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      // Find user by email
      const foundUser = users.find(u => u.email === email);
      
      if (!foundUser) {
        toast.error('User not found! Please create an account first.');
        return false;
      }

      // Check password (in real app, this would be hashed)
      if (foundUser.password !== password) {
        toast.error('Invalid password!');
        return false;
      }

      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      setUser(foundUser);
      toast.success(`Welcome back, ${foundUser.name}!`);
      return true;
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const addBookingToUser = (userId, booking) => {
    const updatedUsers = users.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          bookings: [...(u.bookings || []), booking]
        };
      }
      return u;
    });
    setUsers(updatedUsers);
  };

  const getUserBookings = (userId) => {
    const user = users.find(u => u.id === userId);
    return user?.bookings || [];
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      signup, 
      logout,
      addBookingToUser,
      getUserBookings,
      users 
    }}>
      {children}
    </AuthContext.Provider>
  );
};