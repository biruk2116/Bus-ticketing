// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    toast.error('Please login first');
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== 'admin') {
    toast.error('Access denied. Admin only. Please login with admin account.');
    return <Navigate to="/admin-login" />;
  }

  return children;
};