import React from 'react'
import { motion } from 'framer-motion'
import { appShellClass, cn, pageContainerClass, pageSectionClass } from '../../lib/ui'

const PageShell = ({ children, className, containerClassName, animate = true }) => {
  const content = (
    <div className={cn(pageContainerClass, pageSectionClass, containerClassName)}>
      {children}
    </div>
  )

  return (
    <div className={cn(appShellClass, className)}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.10),transparent_18%),radial-gradient(circle_at_80%_0%,rgba(244,114,182,0.10),transparent_18%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.12),transparent_20%)]" />
      {animate ? (
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
          {content}
        </motion.div>
      ) : (
        <div className="relative z-10">{content}</div>
      )}
    </div>
  )
}

export default PageShell
