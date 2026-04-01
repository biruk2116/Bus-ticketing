import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail, Phone, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import PageShell from '../ui/PageShell'
import Panel from '../ui/Panel'
import Field from '../ui/Field'
import Button from '../ui/Button'
import StatusBadge from '../ui/StatusBadge'
import { bodyClass, cn } from '../../lib/ui'

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
    <PageShell containerClassName="flex min-h-[calc(100vh-7rem)] items-center justify-center">
      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <Panel>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500 dark:text-sky-300">Sign up</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-slate-950 dark:text-white">Create a passenger account</h1>
          <p className={cn('mt-4 text-sm leading-7 sm:text-base', bodyClass)}>
            Build a local demo account and continue through the modernized booking flow with cleaner, more readable form design.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
            <Field
              label="Full name"
              icon={User}
              value={formData.name}
              onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
            />
            <Field
              label="Email address"
              type="email"
              icon={Mail}
              value={formData.email}
              onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
            />
            <Field
              label="Phone number"
              icon={Phone}
              value={formData.phone}
              onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
            />
            <Field
              label="Password"
              type="password"
              icon={Lock}
              value={formData.password}
              onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
            />
            <div className="md:col-span-2">
              <Field
                label="Confirm password"
                type="password"
                icon={Lock}
                value={formData.confirmPassword}
                onChange={(event) => setFormData((current) => ({ ...current, confirmPassword: event.target.value }))}
              />
            </div>

            <div className="md:col-span-2">
              <Button type="submit" size="lg" className="w-full" loading={loading} disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-sky-600 transition hover:text-sky-500 dark:text-sky-300">
              Sign in
            </Link>
          </p>
        </Panel>

        <Panel className="bg-[linear-gradient(160deg,rgba(14,165,233,0.12),rgba(79,70,229,0.16),rgba(255,255,255,0.88))] dark:bg-[linear-gradient(160deg,rgba(14,165,233,0.08),rgba(79,70,229,0.16),rgba(15,23,42,0.76))]">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500 dark:text-sky-300">What changes</p>
          <h2 className="mt-4 font-display text-4xl font-bold text-slate-950 dark:text-white">A sharper first impression for new users</h2>
          <p className={cn('mt-4 text-sm leading-7 sm:text-base', bodyClass)}>
            The signup experience now matches the rest of the product with better hierarchy, floating inputs, improved contrast, and clearer call-to-action emphasis.
          </p>

          <div className="mt-8 space-y-3">
            {[
              'Better form rhythm and larger touch targets',
              'Consistent glass surfaces across auth and booking flows',
              'Polished dark mode with stronger readability',
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-white/40 bg-white/70 px-4 py-3 text-sm font-medium text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <StatusBadge variant="success">Production-style UI</StatusBadge>
            <StatusBadge variant="default">Accessible focus rings</StatusBadge>
          </div>
        </Panel>
      </div>
    </PageShell>
  )
}

export default Signup
