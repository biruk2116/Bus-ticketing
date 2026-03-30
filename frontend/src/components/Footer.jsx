import React from 'react'
import { Link } from 'react-router-dom'
import { Bus, Globe2, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const footerLinks = [
  { label: 'Search Trips', to: '/search' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
]

const socialLinks = [
  { label: 'Web', icon: Globe2 },
  { label: 'Updates', icon: Send },
  { label: 'Support', icon: MessageCircle },
]

const Footer = () => {
  const { darkMode } = useAuth()

  return (
    <footer className="px-4 pb-8 pt-16 sm:px-6 lg:px-8">
      <div
        className={`mx-auto max-w-7xl rounded-[32px] border px-6 py-10 sm:px-8 ${
          darkMode
            ? 'border-white/10 bg-slate-900/60'
            : 'border-slate-200/80 bg-white shadow-[0_18px_60px_rgba(148,163,184,0.14)]'
        }`}
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 p-2.5 text-slate-950">
                <Bus className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-bold">EthioBus</p>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Modern bus ticketing for dependable travel planning.
                </p>
              </div>
            </div>
            <p className={`mt-5 max-w-md text-sm leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Built with a clean SaaS-style layout, mobile-first responsiveness, and a booking flow that feels calm,
              polished, and ready for production.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-400">Navigation</h2>
            <div className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block text-sm transition ${
                    darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-400">Contact</h2>
            <div className={`mt-4 space-y-3 text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              <p className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-sky-400" />
                <span>+251 911 223 344</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-sky-400" />
                <span>support@ethiobus.com</span>
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-sky-400" />
                <span>Addis Ababa, Ethiopia</span>
              </p>
            </div>

            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((link) => (
                <span
                  key={link.label}
                  aria-label={link.label}
                  className={`inline-flex rounded-full border p-2 ${
                    darkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <link.icon className="h-4 w-4 text-sky-400" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`mt-8 border-t pt-6 text-sm ${
            darkMode ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-500'
          }`}
        >
          Copyright 2026 EthioBus. Professional frontend foundation for modern bus ticketing.
        </div>
      </div>
    </footer>
  )
}

export default Footer
