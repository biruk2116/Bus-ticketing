import React from 'react'
import { motion } from 'framer-motion'
import { cn, focusRingClass } from '../../lib/ui'

const variants = {
  primary:
    'bg-[linear-gradient(135deg,#0ea5e9,_#2563eb_48%,_#4f46e5)] text-white shadow-[0_20px_45px_rgba(37,99,235,0.28)] hover:shadow-[0_24px_55px_rgba(37,99,235,0.34)]',
  secondary:
    'border border-slate-200 bg-white/85 text-slate-700 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10',
  ghost:
    'text-slate-600 hover:bg-slate-100/90 dark:text-slate-300 dark:hover:bg-white/8',
  danger:
    'bg-[linear-gradient(135deg,#fb7185,_#e11d48)] text-white shadow-[0_18px_40px_rgba(225,29,72,0.24)] hover:shadow-[0_22px_50px_rgba(225,29,72,0.32)]',
}

const sizes = {
  sm: 'h-10 rounded-xl px-4 text-sm',
  md: 'h-12 rounded-2xl px-5 text-sm',
  lg: 'h-14 rounded-2xl px-6 text-sm',
}

const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconRight: IconRight,
  asChild = false,
  ...props
}) => {
  const Component = asChild ? motion.span : motion.button

  return (
    <Component
      whileHover={{ scale: disabled || loading ? 1 : 1.02, y: disabled || loading ? 0 : -1 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-70',
        focusRingClass,
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
      {IconRight ? <IconRight className="h-4 w-4" /> : null}
    </Component>
  )
}

export default Button
