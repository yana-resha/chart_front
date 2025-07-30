import { ElementType, HTMLAttributes, ReactNode } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

type AnimatedListWrapperProps = {
  items?: ReactNode[]
  children?: ReactNode
  delayPerItem?: number
  duration?: number
  as?: ElementType // кастомный тег-обёртка, например 'ul'
  itemAs?: ElementType // тег для item, например 'li'
} & HTMLAttributes<HTMLElement> // остальные атрибуты (id, className и т.д.)

export const AnimatedListWrapper = ({
  items,
  children,
  delayPerItem = 0.1,
  duration = 0.4,
  itemAs: ItemTag = 'div',
}: AnimatedListWrapperProps) => {
  const content = items ?? (Array.isArray(children) ? children : [children])

  return (
    <>
      <AnimatePresence>
        {content.map((item, index) => (
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
          >
            <ItemTag>{item}</ItemTag>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  )
}
