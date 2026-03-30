import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Bus,
  Home,
  Info,
  LogOut,
  Menu,
  Moon,
  Phone,
  Settings,
  Shield,
  Sun,
  User,
  X,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { darkMode, toggleDarkMode, isAuthenticated, isAdmin, logout, user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: Info },
    { path: '/services', label: 'Services', icon: Settings },
    { path: '/contact', label: 'Contact', icon: Phone },
  ]

  const authAction = isAuthenticated ? (
    <div className="hidden items-center gap-3 lg:flex">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
        <User className="h-4 w-4 text-sky-300" />
        <span>{user?.name}</span>
      </div>

      {isAdmin && (
        <button
          type="button"
          onClick={() => navigate('/admin')}
          className="rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm font-medium text-sky-300"
        >
          <span className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Admin
          </span>
        </button>
      )}

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        type="button"
        onClick={logout}
        className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white"
      >
        <span className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </span>
      </motion.button>
    </div>
  ) : (
    <div className="hidden items-center gap-3 lg:flex">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        type="button"
        onClick={() => navigate('/login')}
        className="rounded-xl px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/5"
      >
        Login
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        type="button"
        onClick={() => navigate('/signup')}
        className="rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(56,189,248,0.28)]"
      >
        Sign Up
      </motion.button>
    </div>
  )

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6"
      >
        <div
          className={`relative mx-auto flex max-w-7xl items-center justify-between overflow-hidden rounded-3xl border px-4 py-3 transition-all duration-300 sm:px-5 ${
            scrolled
              ? 'border-white/15 bg-slate-950/80 shadow-[0_18px_60px_rgba(15,23,42,0.45)] backdrop-blur-2xl'
              : isHome
              ? 'border-white/10 bg-transparent'
              : 'border-white/10 bg-slate-950/55 backdrop-blur-xl'
          }`}
        >
          <motion.div
            aria-hidden="true"
            animate={{ x: ['-8%', '18%', '-8%'], y: [0, -6, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute inset-y-0 left-0 w-44 bg-sky-400/12 blur-3xl"
          />
          <motion.div
            aria-hidden="true"
            animate={{ x: ['18%', '-12%', '18%'], y: [0, 8, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute right-0 top-0 h-full w-44 bg-indigo-500/12 blur-3xl"
          />

          <Link to="/" className="relative z-10 flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: -10, scale: 1.06 }}
              className="rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 p-2.5 text-slate-950"
            >
              <Bus className="h-5 w-5" />
            </motion.div>
            <div>
              <div className="text-lg font-bold text-white">EthioBus</div>
              <div className="text-xs uppercase tracking-[0.28em] text-slate-400">Ticketing</div>
            </div>
          </Link>

          <div className="relative z-10 hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                  location.pathname === link.path ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                {location.pathname === link.path && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="relative z-10 flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={toggleDarkMode}
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-200 transition hover:bg-white/10"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.button>

            {authAction}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-200 md:hidden"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/10 bg-slate-950/90 p-4 backdrop-blur-2xl md:hidden"
            >
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                      location.pathname === link.path
                        ? 'bg-white/10 text-white'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>

              {isAuthenticated ? (
                <div className="mt-4 space-y-3">
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => {
                        navigate('/admin')
                        setIsOpen(false)
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-sky-400/20 bg-sky-400/10 px-4 py-3 text-sm font-medium text-sky-300"
                    >
                      <Shield className="h-4 w-4" />
                      Admin Dashboard
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      navigate('/login')
                      setIsOpen(false)
                    }}
                    className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-200"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigate('/signup')
                      setIsOpen(false)
                    }}
                    className="rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 px-4 py-3 text-sm font-semibold text-white"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="h-24" />
    </>
  )
}

export default Navbar
