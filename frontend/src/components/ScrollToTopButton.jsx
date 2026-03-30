import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const ScrollToTopButton = () => {
  const { darkMode } = useAuth()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-6 right-6 z-40 rounded-full p-3 shadow-lg ${
            darkMode
              ? 'bg-slate-900 text-white shadow-[0_18px_40px_rgba(15,23,42,0.4)]'
              : 'bg-white text-slate-900 shadow-[0_18px_40px_rgba(148,163,184,0.25)]'
          }`}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTopButton
