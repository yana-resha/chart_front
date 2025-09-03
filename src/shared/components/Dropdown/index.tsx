import React, { useEffect, useRef, useState, ReactNode, HTMLAttributes, useId, useCallback } from 'react'

import { useFloating, offset, flip, shift, autoUpdate, Placement, FloatingPortal } from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { DropdownContainer, DropdownVeil, DropdownSheet } from './index.linaria'
import { popoverVariants, veilVariants, sheetVariants } from '@/shared/assets/styles/overlays/alerts.animations'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { useMedia } from '@/shared/hooks/useMedia'
import { useScrollLock } from '@/shared/hooks/useScrollLock'

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  trigger: ReactNode
  children: ReactNode
  placement?: Placement
  open?: boolean
  onClose?: () => void
}

const MotionBox = motion.div
const MotionVeil = motion(DropdownVeil)
const MotionSheet = motion(DropdownSheet)

export const Dropdown = ({
  trigger,
  children,
  placement = 'bottom-start',
  open: controlledOpen,
  onClose,
  ...props
}: DropdownProps) => {
  const isControlled = controlledOpen !== undefined
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const open = isControlled ? !!controlledOpen : uncontrolledOpen

  const close = useCallback(
    () => (isControlled ? onClose?.() : setUncontrolledOpen(false)),
    [isControlled, onClose],
  )
  const toggle = () =>
    isControlled ? (open ? onClose?.() : setUncontrolledOpen(true)) : setUncontrolledOpen((v) => !v)

  const id = useId()
  const triggerWrapRef = useRef<HTMLDivElement | null>(null)

  const { refs, floatingStyles } = useFloating({
    placement,
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  })

  // reference = обёртка триггера
  useEffect(() => {
    if (triggerWrapRef.current) refs.setReference(triggerWrapRef.current)
  }, [refs])

  const isSheet = useMedia(`(max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px)`)

  // клик вне (только для desktop-поповера)
  useEffect(() => {
    if (!open || isSheet) return
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node
      if (!triggerWrapRef.current?.contains(t) && !refs.floating.current?.contains(t)) close()
    }
    document.addEventListener('mousedown', onDoc)

    return () => document.removeEventListener('mousedown', onDoc)
  }, [open, isSheet, refs, close])

  // Esc
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)

    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Лочим скролл только для мобильного шита
  useScrollLock(open && isSheet, 'overflow')

  return (
    <div
      ref={triggerWrapRef}
      style={{ display: 'inline-block' }}
    >
      <div
        onClick={toggle}
        role="button"
        aria-haspopup={isSheet ? 'dialog' : 'menu'}
        aria-expanded={open}
        aria-controls={id}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggle()
          }
        }}
        style={{ display: 'inline-flex' }}
      >
        {trigger}
      </div>

      <FloatingPortal>
        <AnimatePresence>
          {open && !isSheet && (
            <div
              ref={refs.setFloating}
              style={{ ...floatingStyles, position: 'absolute', zIndex: 1000 }}
              id={id}
              role="menu"
            >
              <MotionBox
                variants={popoverVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <DropdownContainer {...props}>{children}</DropdownContainer>
              </MotionBox>
            </div>
          )}

          {open && isSheet && (
            <MotionVeil
              onClick={close}
              variants={veilVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
            >
              <MotionSheet
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                variants={sheetVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                role="document"
              >
                {children}
              </MotionSheet>
            </MotionVeil>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}
