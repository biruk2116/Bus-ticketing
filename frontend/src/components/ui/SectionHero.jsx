import React from 'react'
import { cn, heroPanelClass } from '../../lib/ui'

const SectionHero = ({ eyebrow, title, description, action, className }) => (
  <section className={cn(heroPanelClass, 'rounded-[2.25rem] p-8 text-white sm:p-10', className)}>
    {eyebrow ? (
      <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-300">{eyebrow}</p>
    ) : null}
    <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">{title}</h1>
    {description ? <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">{description}</p> : null}
    {action ? <div className="mt-8">{action}</div> : null}
  </section>
)

export default SectionHero
