// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: email,
        phone: '+251911223344',
        role: email.includes('admin') ? 'admin' : 'user'
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success('Login successful!');
      return { success: true, user: mockUser };
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      return { success: false, error: error.message };
    }
  };

  const signup = async (userData) => {
    try {
      // Validate
      if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      if (userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Simulate API call
      const mockUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: 'user'
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success('Signup successful!');
      return { success: true, user: mockUser };
    } catch (error) {
      toast.error(error.message);
      return { success: false, error: error.message };
    }
  };

  const adminLogin = async (email, password) => {
    try {
      // Admin credentials check
      if (email === 'admin@ethiobus.com' && password === 'Admin@123') {
        const adminUser = {
          id: 999,
          name: 'System Admin',
          email: email,
          role: 'admin',
          permissions: ['all']
        };
        
        localStorage.setItem('user', JSON.stringify(adminUser));
        setUser(adminUser);
        toast.success('Admin login successful!');
        return { success: true, user: adminUser };
      } else {
        throw new Error('Invalid admin credentials');
      }
    } catch (error) {
      toast.error(error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    adminLogin,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};