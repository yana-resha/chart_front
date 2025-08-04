import React, { useState, useRef, useEffect, ReactNode, HTMLAttributes, useMemo } from 'react'

import { useFloating, offset, flip, shift, autoUpdate, FloatingPortal, Placement } from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { DropdownContainer } from './index.linaria'

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  trigger: ReactNode
  children: ReactNode
  placement?: Placement
  open?: boolean
  onClose?: () => void
}

export const Dropdown = ({
  trigger,
  children,
  placement = 'bottom-start',
  open: controlledOpen,
  onClose,
  ...props
}: DropdownProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = useMemo(
    () => (controlledOpen !== undefined ? (onClose ?? (() => {})) : setUncontrolledOpen),
    [controlledOpen, onClose],
  )

  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const { refs, floatingStyles } = useFloating({
    placement,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  })

  useEffect(() => {
    if (refs && wrapperRef.current) {
      refs.setReference(wrapperRef.current)
    }
  }, [refs])

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (!wrapperRef.current?.contains(target) && !refs.floating.current?.contains(target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open, refs, setOpen])

  return (
    <div
      ref={wrapperRef}
      style={{ display: 'inline-block' }}
    >
      {trigger}

      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <div
              ref={refs.setFloating}
              style={{ ...floatingStyles, position: 'absolute' }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 4 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <DropdownContainer {...props}>{children}</DropdownContainer>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}
