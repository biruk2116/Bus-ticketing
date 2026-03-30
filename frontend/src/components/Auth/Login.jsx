import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, darkMode } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      navigate(location.state?.from || '/')
    } catch {
      // Toast feedback comes from context.
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-[32px] border p-8 backdrop-blur-2xl ${
            darkMode
              ? 'border-white/10 bg-white/5'
              : 'border-slate-200/80 bg-white/90 shadow-[0_18px_60px_rgba(148,163,184,0.16)]'
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Login</p>
          <h1 className={`mt-4 text-4xl font-black ${darkMode ? 'text-white' : 'text-slate-950'}`}>Welcome back</h1>
          <p className={`mt-3 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Use `admin@ethiobus.com / admin123` for the admin demo.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="login-email" className={`mb-2 block text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400" />
                <input
                  id="login-email"
                  type="email"
                  value={formData.email}
                  onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                  className={`h-14 w-full rounded-2xl border pl-11 pr-4 outline-none transition focus:border-sky-400 ${
                    darkMode
                      ? 'border-white/10 bg-slate-950/60 text-slate-100'
                      : 'border-slate-200 bg-slate-50 text-slate-900'
                  }`}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className={`mb-2 block text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-400" />
                <input
                  id="login-password"
                  type="password"
                  value={formData.password}
                  onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
                  className={`h-14 w-full rounded-2xl border pl-11 pr-4 outline-none transition focus:border-indigo-400 ${
                    darkMode
                      ? 'border-white/10 bg-slate-950/60 text-slate-100'
                      : 'border-slate-200 bg-slate-50 text-slate-900'
                  }`}
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-4 text-sm font-semibold text-white disabled:opacity-70"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>

          <p className={`mt-6 text-center text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-sky-400 hover:text-sky-300">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Login
