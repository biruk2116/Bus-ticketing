import React from 'react'
import { cn, glassPanelClass, mutedGlassPanelClass } from '../../lib/ui'

const panelVariants = {
  default: glassPanelClass,
  muted: mutedGlassPanelClass,
  hero: 'rounded-[2rem] p-6 sm:p-8',
}

const Panel = ({ children, className, variant = 'default', as: Component = 'div', ...props }) => (
  <Component
    className={cn(
      'rounded-[2rem] p-6 sm:p-8',
      variant === 'default' ? glassPanelClass : mutedGlassPanelClass,
      panelVariants.hero,
      className,
    )}
    {...props}
  >
    {children}
  </Component>
)

export default Panel
