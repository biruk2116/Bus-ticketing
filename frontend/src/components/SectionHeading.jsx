import React from 'react'

const SectionHeading = ({ eyebrow, title, description, align = 'left' }) => {
  const alignment = align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'

  return (
    <div className={alignment}>
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-400">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
        {description}
      </p>
    </div>
  )
}

export default SectionHeading
