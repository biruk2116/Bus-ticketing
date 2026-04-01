import React from 'react'
import { cn } from '../../lib/ui'

const Skeleton = ({ className }) => (
  <div
    className={cn(
      'animate-pulse rounded-2xl bg-[linear-gradient(90deg,rgba(148,163,184,0.14),rgba(148,163,184,0.24),rgba(148,163,184,0.14))] bg-[length:200%_100%] dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.04),rgba(255,255,255,0.08),rgba(255,255,255,0.04))]',
      className,
    )}
  />
)

export default Skeleton
