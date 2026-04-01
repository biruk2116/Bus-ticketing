import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Bus, Menu, Moon, Search, Shield, Sun, Ticket, User, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useActiveSection } from '../hooks/useActiveSection'

const landingLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { darkMode, toggleDarkMode, isAuthenticated, isAdmin, logout, user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const isLanding = location.pathname === '/'
  const activeSection = useActiveSection(landingLinks.map((link) => link.id))

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname, location.hash])

  const mutedClass = darkMode ? 'text-slate-300' : 'text-slate-600'
  const navShellClass = darkMode
    ? 'border-white/10 bg-slate-950 text-slate-100 shadow-[0_20px_50px_rgba(2,6,23,0.42)]'
    : 'border-slate-200/80 bg-white text-slate-950 shadow-[0_16px_36px_rgba(148,163,184,0.16)]'
  const navPillClass = darkMode
    ? 'border-white/10 bg-white/10 text-white'
    : 'border-slate-200/80 bg-slate-900/6 text-slate-950'

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (!element) return
    const navbarOffset = window.innerWidth >= 640 ? 96 : 80
    const top = element.getBoundingClientRect().top + window.scrollY - navbarOffset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const handleSectionClick = (sectionId) => {
    if (isLanding) {
      scrollToSection(sectionId)
      return
    }

    navigate(`/#${sectionId}`)
  }

  const actionButtons = (
    <div className="hidden items-center gap-3 lg:flex">
      <motion.button
        whileHover={{ scale: 1.04, y: -1 }}
        whileTap={{ scale: 0.97 }}
        type="button"
        onClick={() => navigate('/search')}
        className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(59,130,246,0.28)] transition"
      >
        <Search className="h-4 w-4" />
        Search Trips
      </motion.button>

      {isAuthenticated ? (
        <>
          <div
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
          >
            <User className="h-4 w-4 text-sky-400" />
            <span>{user?.name}</span>
          </div>

          {isAdmin && (
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-300"
            >
              <Shield className="h-4 w-4" />
              Admin
            </button>
          )}

          <button
            type="button"
            onClick={() => navigate('/ticket')}
            className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-slate-200"
          >
            <Ticket className="h-4 w-4" />
            Ticket
          </button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={logout}
            className="rounded-full bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white"
          >
            Logout
          </motion.button>
        </>
      ) : (
        <>
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => navigate('/login')}
            className={`rounded-2xl border px-4 py-2.5 text-sm font-medium transition ${
              darkMode
                ? 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white'
                : 'border-slate-200 bg-white/80 text-slate-700 hover:border-slate-300 hover:bg-white hover:text-slate-950'
            }`}
          >
            Login
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => navigate('/signup')}
            className="rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(59,130,246,0.28)] transition"
          >
            Create Account
          </motion.button>
        </>
      )}
    </div>
  )

  return (
    <>
      <motion.nav
        initial={{ y: -56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed inset-x-0 top-0 z-50 border-b ${
          darkMode
            ? 'border-white/10 bg-slate-950 text-slate-100 shadow-[0_20px_50px_rgba(2,6,23,0.42)]'
            : 'border-slate-200/80 bg-white text-slate-950 shadow-[0_16px_36px_rgba(148,163,184,0.16)]'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 p-2.5 text-slate-950 shadow-[0_12px_30px_rgba(56,189,248,0.24)]">
              <Bus className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-bold">EthioBus</p>
              <p className={`text-[11px] uppercase tracking-[0.28em] ${mutedClass}`}>
                Smart ticketing
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {landingLinks.map((link) => {
              const isActive = isLanding && activeSection === link.id

              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleSectionClick(link.id)}
                  className={`group relative rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${
                    isActive ? (darkMode ? 'text-white' : 'text-slate-950') : mutedClass
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill-bg"
                      className={`absolute inset-0 rounded-full border ${navPillClass}`}
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  <span
                    className={`absolute bottom-1 left-4 right-4 h-px origin-left scale-x-0 bg-gradient-to-r from-sky-400 to-indigo-400 transition duration-300 group-hover:scale-x-100 ${
                      isActive ? 'scale-x-100' : ''
                    }`}
                  />
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className={`rounded-2xl border p-2.5 transition ${
                darkMode
                  ? 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
                  : 'border-slate-200 bg-white/80 text-slate-700 hover:bg-white'
              }`}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.button>

            {actionButtons}

            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              aria-label="Toggle navigation menu"
              className={`rounded-2xl border p-2.5 md:hidden ${
                darkMode
                  ? 'border-white/10 bg-white/5 text-slate-200'
                  : 'border-slate-200 bg-white/80 text-slate-700'
              }`}
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
              className={`border-t px-4 py-3 md:hidden sm:px-6 ${
                darkMode ? 'border-white/10 bg-slate-950' : 'border-slate-200/80 bg-white'
              }`}
            >
              <div
                className={`mx-auto max-w-7xl rounded-[28px] border p-4 backdrop-blur-2xl ${navShellClass}`}
              >
                <div className="space-y-2">
                  {landingLinks.map((link) => (
                    <button
                      key={link.id}
                      type="button"
                      onClick={() => handleSectionClick(link.id)}
                      className={`flex w-full items-center rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                        isLanding && activeSection === link.id
                          ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white'
                          : darkMode
                          ? 'text-slate-300 hover:bg-white/5 hover:text-white'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('/search')}
                    className="rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(59,130,246,0.28)]"
                  >
                    Search Trips
                  </button>

                  {isAuthenticated ? (
                    <>
                      <button
                        type="button"
                        onClick={() => navigate('/ticket')}
                        className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                          darkMode ? 'bg-white/5 text-slate-200' : 'bg-white/80 text-slate-700'
                        }`}
                      >
                        My Ticket
                      </button>
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={() => navigate('/admin')}
                          className="rounded-2xl bg-sky-500/10 px-4 py-3 text-sm font-medium text-sky-300"
                        >
                          Admin Dashboard
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={logout}
                        className="rounded-2xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
                          darkMode
                            ? 'border-white/10 bg-white/5 text-slate-200'
                            : 'border-slate-200 bg-white/80 text-slate-700'
                        }`}
                      >
                        Login
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate('/signup')}
                        className="rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(59,130,246,0.28)]"
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

    </>
  )
}

export default Navbar
