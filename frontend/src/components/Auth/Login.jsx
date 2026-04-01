import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Lock, Mail, ShieldCheck } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import PageShell from '../ui/PageShell'
import Panel from '../ui/Panel'
import Field from '../ui/Field'
import Button from '../ui/Button'
import StatusBadge from '../ui/StatusBadge'
import { bodyClass, cn } from '../../lib/ui'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
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
    <PageShell containerClassName="flex min-h-[calc(100vh-7rem)] items-center justify-center">
      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <Panel className="bg-[linear-gradient(160deg,rgba(14,165,233,0.12),rgba(79,70,229,0.16),rgba(255,255,255,0.88))] dark:bg-[linear-gradient(160deg,rgba(14,165,233,0.08),rgba(79,70,229,0.16),rgba(15,23,42,0.76))]">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500 dark:text-sky-300">Welcome back</p>
          <h1 className="mt-4 font-display text-4xl font-bold text-slate-950 dark:text-white">Sign in to continue your trip</h1>
          <p className={cn('mt-4 text-sm leading-7 sm:text-base', bodyClass)}>
            A cleaner auth experience with stronger focus states, better spacing, and a more professional travel product feel.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <StatusBadge variant="success">Dark mode ready</StatusBadge>
            <StatusBadge variant="default">Responsive layout</StatusBadge>
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-white/40 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
              <ShieldCheck className="h-5 w-5 text-emerald-500 dark:text-emerald-300" />
              <span className="font-semibold">Demo admin access</span>
            </div>
            <p className={cn('mt-3 text-sm leading-6', bodyClass)}>
              Use <span className="font-semibold">admin@ethiobus.com</span> and <span className="font-semibold">admin123</span> to open the dashboard.
            </p>
          </div>
        </Panel>

        <Panel>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500 dark:text-sky-300">Login</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-950 dark:text-white">Access your bookings</h2>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Field
              label="Email address"
              type="email"
              icon={Mail}
              value={formData.email}
              onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
            />
            <Field
              label="Password"
              type="password"
              icon={Lock}
              value={formData.password}
              onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
            />

            <Button type="submit" size="lg" className="w-full" loading={loading} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-semibold text-sky-600 transition hover:text-sky-500 dark:text-sky-300">
              Create one
            </Link>
          </p>
        </Panel>
      </div>
    </PageShell>
  )
}

export default Login
