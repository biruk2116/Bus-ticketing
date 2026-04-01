import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import PageShell from './ui/PageShell'
import Panel from './ui/Panel'
import Skeleton from './ui/Skeleton'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const location = useLocation()
  const { loading, isAuthenticated, isAdmin } = useAuth()

  if (loading) {
    return (
      <PageShell containerClassName="flex min-h-[70vh] items-center justify-center">
        <Panel className="w-full max-w-xl space-y-5">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="h-14 w-14 rounded-full border-4 border-sky-400/20 border-t-sky-500"
          />
          <div className="space-y-3">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </Panel>
      </PageShell>
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
