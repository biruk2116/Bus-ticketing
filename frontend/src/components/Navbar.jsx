import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
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

const Navbar = () => {
  const { user, isAuthenticated, logout, darkMode, toggleDarkMode } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { path: '/', name: 'Home', icon: Home },
    { path: '/about', name: 'About', icon: Info },
    { path: '/services', name: 'Services', icon: Settings },
    { path: '/contacts', name: 'Contact', icon: Phone },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6"
      >
        <div
          className={`relative mx-auto flex max-w-7xl items-center justify-between overflow-hidden rounded-2xl border px-4 py-3 shadow-lg transition-all duration-300 sm:px-5 ${
            scrolled
              ? 'border-white/15 bg-slate-950/80 backdrop-blur-2xl'
              : 'border-white/10 bg-slate-950/55 backdrop-blur-xl'
          }`}
        >
          <motion.div
            aria-hidden="true"
            animate={{ x: ['-12%', '18%', '-12%'], y: [0, -6, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-sky-400/12 blur-2xl"
          />
          <motion.div
            aria-hidden="true"
            animate={{ x: ['18%', '-10%', '18%'], y: [0, 8, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute right-0 top-0 h-full w-44 bg-indigo-500/12 blur-2xl"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05),transparent,rgba(255,255,255,0.04))]" />

          <Link to="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: -8, scale: 1.06 }}
              className="rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 p-2.5 text-slate-950"
            >
              <Bus className="h-5 w-5" />
            </motion.div>
            <div>
              <div className="text-lg font-bold text-white">EthioBus</div>
              <div className="text-xs uppercase tracking-[0.25em] text-slate-400">Smart Travel</div>
            </div>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive(link.path) ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                {isActive(link.path) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={toggleDarkMode}
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-200 transition hover:bg-white/10"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
                  <User className="h-4 w-4 text-sky-300" />
                  <span>{user?.name}</span>
                </div>

                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-2 text-sm text-sky-300"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                )}

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={logout}
                  className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-medium text-white"
                >
                  <span className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </span>
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/login')}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/5"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/signup')}
                  className="rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 px-4 py-2 text-sm font-semibold text-white"
                >
                  Sign Up
                </motion.button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-200"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen((current) => !current)}
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-200"
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
              className="mx-auto mt-3 max-w-7xl rounded-2xl border border-white/10 bg-slate-950/90 p-4 backdrop-blur-2xl md:hidden"
            >
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                      isActive(link.path)
                        ? 'bg-white/10 text-white'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>

              {!isAuthenticated ? (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      navigate('/login')
                      setIsOpen(false)
                    }}
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-200"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate('/signup')
                      setIsOpen(false)
                    }}
                    className="rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    logout()
                    setIsOpen(false)
                  }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-2 text-sm font-medium text-white"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
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
