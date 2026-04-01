import React from 'react'
import { Link } from 'react-router-dom'
import { Bus, Globe2, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import Panel from './ui/Panel'
import { bodyClass, cn } from '../lib/ui'

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

const Footer = () => (
  <footer className="px-4 pb-8 pt-16 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <Panel className="p-6 sm:p-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.75fr_0.85fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[linear-gradient(135deg,#0ea5e9,#2563eb_45%,#4f46e5)] p-3 text-white shadow-[0_16px_35px_rgba(37,99,235,0.28)]">
                <Bus className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-xl font-bold text-slate-950 dark:text-white">EthioBus</p>
                <p className={cn('text-sm', bodyClass)}>Modern bus ticketing for dependable travel planning.</p>
              </div>
            </div>
            <p className={cn('mt-5 max-w-md text-sm leading-7', bodyClass)}>
              Built around calmer spacing, stronger visual hierarchy, polished dark mode, and a smoother route-to-checkout passenger journey.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-500 dark:text-sky-300">Navigation</h2>
            <div className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-sm text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-500 dark:text-sky-300">Contact</h2>
            <div className="mt-4 space-y-3 text-sm">
              <p className={cn('flex items-center gap-3', bodyClass)}>
                <Phone className="h-4 w-4 text-sky-500 dark:text-sky-300" />
                <span>+251 911 223 344</span>
              </p>
              <p className={cn('flex items-center gap-3', bodyClass)}>
                <Mail className="h-4 w-4 text-sky-500 dark:text-sky-300" />
                <span>support@ethiobus.com</span>
              </p>
              <p className={cn('flex items-center gap-3', bodyClass)}>
                <MapPin className="h-4 w-4 text-sky-500 dark:text-sky-300" />
                <span>Addis Ababa, Ethiopia</span>
              </p>
            </div>

            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((link) => (
                <span
                  key={link.label}
                  aria-label={link.label}
                  className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-2.5 text-sky-500 dark:border-white/10 dark:bg-white/5 dark:text-sky-300"
                >
                  <link.icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200/70 pt-6 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
          Copyright 2026 EthioBus. A modernized travel booking frontend with polished UI foundations.
        </div>
      </Panel>
    </div>
  </footer>
)

export default Footer
