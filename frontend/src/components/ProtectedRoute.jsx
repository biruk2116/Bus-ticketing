import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const location = useLocation()
  const { loading, isAuthenticated, isAdmin } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="h-14 w-14 rounded-full border-4 border-sky-400/30 border-t-sky-300"
        />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
