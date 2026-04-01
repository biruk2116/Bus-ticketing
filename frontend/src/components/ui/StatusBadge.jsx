import React from 'react'
import { badgeVariants, cn } from '../../lib/ui'

const StatusBadge = ({ children, variant = 'default', className }) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]',
      badgeVariants[variant] || badgeVariants.default,
      className,
    )}
  >
    {children}
  </span>
)

export default StatusBadge
