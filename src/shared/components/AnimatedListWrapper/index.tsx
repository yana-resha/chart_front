import { ReactNode } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

type Props = {
  items: ReactNode[]
  delayPerItem?: number // в секундах
  duration?: number // в секундах
  className?: string
}

export const AnimatedListWrapper = ({ items, delayPerItem = 0.1, duration = 0.4, className }: Props) => (
  <div className={className}>
    <AnimatePresence>
      {items.map((item, index) => (
        <motion.div
          key={(item as any)?.key || index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{
            delay: index * delayPerItem,
            duration,
            ease: 'easeOut',
          }}
          style={{ overflow: 'hidden' }}
        >
          {item}
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
)
