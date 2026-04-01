export const cn = (...classes) => classes.filter(Boolean).join(' ')

export const appShellClass =
  'relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.10),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.08),_transparent_26%)] text-slate-900 transition-colors duration-300 dark:text-slate-100'

export const pageContainerClass = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'

export const pageSectionClass = 'pb-20 pt-8 sm:pt-10'

export const glassPanelClass =
  'border border-white/50 bg-white/80 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_24px_80px_rgba(2,6,23,0.36)]'

export const mutedGlassPanelClass =
  'border border-slate-200/70 bg-slate-50/85 shadow-[0_18px_60px_rgba(148,163,184,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60 dark:shadow-none'

export const heroPanelClass =
  'overflow-hidden border border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.14),rgba(99,102,241,0.16),rgba(15,23,42,0.92))] shadow-[0_28px_100px_rgba(15,23,42,0.28)] backdrop-blur-2xl'

export const headingClass = 'text-slate-950 dark:text-white'
export const bodyClass = 'text-slate-600 dark:text-slate-300'
export const mutedClass = 'text-slate-500 dark:text-slate-400'

export const focusRingClass =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950'

export const badgeVariants = {
  default:
    'border border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300',
  success:
    'border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  danger:
    'border border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300',
  warning:
    'border border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  neutral:
    'border border-slate-200 bg-slate-100 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300',
}
