import { ReactNode } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

type Props = {
  children: ReactNode
  show: boolean
  duration?: number // ms
  className?: string
}

export const FadeWrapper = ({ show, children, duration = 300, className }: Props) => (
  <AnimatePresence>
    {show && (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: duration / 1000, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
)
