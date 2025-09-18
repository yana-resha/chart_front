import React, { useEffect, useRef, useState, ReactNode, HTMLAttributes, useId, useCallback } from 'react'

import { useFloating, offset, flip, shift, autoUpdate, Placement, FloatingPortal } from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { DropdownContainer, DropdownVeil, DropdownSheet, MobileClosedIcon } from './index.linaria'
import { Button } from '../Button'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import {
  popoverVariants,
  veilVariants,
  sheetVariants,
} from '@/shared/assets/styles/overlays/alerts.animations'
import {
  OverlayContentWrapper,
  OverlayHeader,
  OverlayHeaderTitle,
} from '@/shared/assets/styles/overlays/shared.linaria'
import { getFocusableElements } from '@/shared/helpers/getFocusableElements'
import { useMedia } from '@/shared/hooks/useMedia'
import { useScrollLock } from '@/shared/hooks/useScrollLock'

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  trigger: ReactNode
  children: ReactNode
  mobileTitle?: string | ReactNode
  placement?: Placement
  open?: boolean
  onClose?: () => void
  /** Замыкать фокус внутри дропдауна/шита (по умолчанию true) */
  trapFocus?: boolean
  /** Возвращать фокус на триггер при закрытии (по умолчанию true) */
  returnFocus?: boolean
  /** CSS-селектор для первоначального фокуса внутри */
  initialFocusSelector?: string
}

const MotionBox = motion.div
const MotionVeil = motion(DropdownVeil)
const MotionSheet = motion(DropdownSheet)

export const Dropdown = ({
  mobileTitle,
  trigger,
  children,
  placement = 'bottom-start',
  open: controlledOpen,
  onClose,
  trapFocus = true,
  returnFocus = true,
  initialFocusSelector,
  ...props
}: DropdownProps) => {
  const isControlled = controlledOpen !== undefined
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const open = isControlled ? !!controlledOpen : uncontrolledOpen

  const close = useCallback(
    () => (isControlled ? onClose?.() : setUncontrolledOpen(false)),
    [isControlled, onClose],
  )

  const id = useId()
  const triggerWrapRef = useRef<HTMLDivElement | null>(null)
  const popoverRef = useRef<HTMLDivElement | null>(null)
  const sheetRef = useRef<HTMLDivElement | null>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)

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

  // Esc — закрыть
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        close()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  // Лочим скролл только для мобильного шита
  useScrollLock(open && isSheet, 'overflow')

  // ===== Фокус-менеджмент и фокус-трэп =====
  useEffect(() => {
    if (!open) return

    const container = (isSheet ? sheetRef.current : popoverRef.current) as HTMLElement | null
    if (!container) return

    // запоминаем триггер для возврата фокуса
    const active = document.activeElement as HTMLElement | null
    if (active) lastFocusedRef.current = active

    // первичный фокус
    const focusables = getFocusableElements(container)
    const initialTarget =
      (initialFocusSelector ? (container.querySelector(initialFocusSelector) as HTMLElement | null) : null) ??
      focusables[0] ??
      container
    initialTarget.focus()

    if (!trapFocus) return

    // циклим Tab/Shift+Tab внутри
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const items = getFocusableElements(container)
      if (!items.length) {
        container.focus()
        e.preventDefault()

        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const current = document.activeElement as HTMLElement | null

      if (!e.shiftKey && current === last) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && current === first) {
        e.preventDefault()
        last.focus()
      }
    }

    container.addEventListener('keydown', onKeyDown)

    return () => {
      container.removeEventListener('keydown', onKeyDown)
    }
  }, [open, isSheet, trapFocus, initialFocusSelector])

  // Возврат фокуса при закрытии
  useEffect(() => {
    if (open) return
    if (returnFocus) {
      lastFocusedRef.current?.focus?.()
    }
  }, [open, returnFocus])

  return (
    <div
      ref={triggerWrapRef}
      style={{ display: 'inline-block' }}
    >
      <div style={{ display: 'inline-flex' }}>{trigger}</div>

      <FloatingPortal>
        <AnimatePresence>
          {open && !isSheet && (
            <div
              ref={(node) => {
                refs.setFloating(node)
                // сохраним ноду поповера для фокуса/трэпа
                popoverRef.current = node
              }}
              style={{ ...floatingStyles, position: 'absolute', zIndex: 1000 }}
              id={id}
              role="menu"
              tabIndex={-1}
              aria-label={typeof mobileTitle === 'string' ? mobileTitle : undefined}
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
                ref={sheetRef}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                variants={sheetVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                role="document"
                tabIndex={-1}
              >
                <OverlayHeader>
                  <OverlayHeaderTitle>{mobileTitle}</OverlayHeaderTitle>
                  <Button
                    kind="text"
                    onClick={close}
                  >
                    <MobileClosedIcon />
                  </Button>
                </OverlayHeader>
                <OverlayContentWrapper>{children}</OverlayContentWrapper>
              </MotionSheet>
            </MotionVeil>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}
