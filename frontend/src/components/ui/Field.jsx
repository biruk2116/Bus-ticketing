import React from 'react'
import { cn, focusRingClass } from '../../lib/ui'

const baseFieldClass = cn(
  'peer h-14 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 pb-3 pt-6 text-sm text-slate-900 shadow-sm transition placeholder:text-transparent',
  'focus:border-sky-400/60 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100',
  focusRingClass,
)

const labelClass =
  'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500 transition-all peer-focus:top-4 peer-focus:text-xs peer-focus:font-medium peer-focus:text-sky-500 peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium dark:text-slate-400'

const wrapperClass =
  'relative rounded-2xl bg-white/70 dark:bg-white/[0.03]'

export const Field = ({
  label,
  icon: Icon,
  className,
  as = 'input',
  children,
  ...props
}) => {
  const Component = as
  const hasValue = typeof props.value === 'number' || Boolean(props.value)

  if (as === 'select') {
    return (
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>
        <div className="relative">
          {Icon ? <Icon className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-sky-400" /> : null}
          <Component className={cn(baseFieldClass, 'appearance-none pt-0', Icon ? 'pl-11' : '', className)} {...props}>
            {children}
          </Component>
        </div>
      </label>
    )
  }

  if (as === 'textarea') {
    return (
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>
        <div className={wrapperClass}>
          <Component
            className={cn(
              'min-h-[140px] w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 text-sm text-slate-900 shadow-sm transition dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100',
              focusRingClass,
              className,
            )}
            {...props}
          />
        </div>
      </label>
    )
  }

  return (
    <label className="block">
      <div className={wrapperClass}>
        {Icon ? <Icon className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-sky-400" /> : null}
        <Component
          className={cn(baseFieldClass, Icon ? 'pl-11' : '', className)}
          placeholder=" "
          {...props}
        />
        <span className={cn(labelClass, Icon ? 'left-11' : 'left-4', hasValue ? 'top-4 text-xs font-medium text-sky-500' : '')}>
          {label}
        </span>
      </div>
    </label>
  )
}

export default Field
