import React from 'react'
import { cn } from '../lib/ui'

const SectionHeading = ({ eyebrow, title, description, align = 'left' }) => {
  const alignment = align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'

  return (
    <div className={cn(alignment)}>
      <p className="inline-flex rounded-full border border-sky-500/15 bg-sky-500/8 px-3 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-sky-500 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300">{eyebrow}</p>
      <h2 className="mt-4 max-w-3xl text-balance font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
        {description}
      </p>
    </div>
  )
}

export default SectionHeading
