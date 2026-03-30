import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail, Phone, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const Signup = () => {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      await signup(formData)
      navigate('/')
    } catch {
      // Toast feedback comes from context.
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">Signup</p>
          <h1 className="mt-4 text-4xl font-black text-white">Create your account</h1>
          <p className="mt-3 text-slate-300">Set up a local demo account and continue through the booking flow.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {[
              ['name', 'Full Name', User, 'Biruk Tadesse'],
              ['email', 'Email', Mail, 'biruk@example.com'],
              ['phone', 'Phone', Phone, '+251911223344'],
              ['password', 'Password', Lock, 'Choose a password'],
              ['confirmPassword', 'Confirm Password', Lock, 'Confirm password'],
            ].map(([key, label, Icon, placeholder]) => (
              <div key={key}>
                <label htmlFor={key} className="mb-2 block text-sm font-medium text-slate-300">{label}</label>
                <div className="relative">
                  <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-300" />
                  <input
                    id={key}
                    type={key.toLowerCase().includes('password') ? 'password' : key === 'email' ? 'email' : 'text'}
                    value={formData[key]}
                    onChange={(event) => setFormData((current) => ({ ...current, [key]: event.target.value }))}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/60 pl-11 pr-4 text-slate-100 outline-none focus:border-sky-400"
                    placeholder={placeholder}
                  />
                </div>
              </div>
            ))}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 px-5 py-4 text-sm font-semibold text-white disabled:opacity-70"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-sky-300 hover:text-sky-200">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Signup
