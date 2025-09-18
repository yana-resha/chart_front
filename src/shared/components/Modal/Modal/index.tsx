// Modal.tsx
import type { HTMLAttributes, ReactNode } from 'react'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'

import { ModalVeil, ModalWindow } from '../index.linaria'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import {
  desktopModalVariants,
  sheetVariants,
  veilVariants,
} from '@/shared/assets/styles/overlays/alerts.animations'
import { getFocusableElements } from '@/shared/helpers/getFocusableElements'
import { useScrollLock } from '@/shared/hooks/useScrollLock'

export interface IModal extends HTMLAttributes<HTMLDivElement> {
  open: boolean
  onClose: () => void
  children: ReactNode
  /** Куда монтировать модалку. По умолчанию: #modal-root или body */
  container?: Element | null
  /** id заголовка для aria-labelledby */
  labelId?: string
  /** Лочить ли фокус внутри модалки и отключать фон (по умолчанию true) */
  trapFocus?: boolean
}

const MotionVeil = motion(ModalVeil)
const MotionWindow = motion(ModalWindow)

export const Modal = ({ open, onClose, children, container, labelId, trapFocus = true, ...rest }: IModal) => {
  const canUseDOM = typeof window !== 'undefined' && typeof document !== 'undefined'

  const target = useMemo(() => {
    if (!canUseDOM) return null
    if (container) return container

    return document.getElementById('modal-root') ?? document.body
  }, [canUseDOM, container])

  const [isSheet, setIsSheet] = useState<boolean>(() => {
    if (!canUseDOM) return false

    return window.matchMedia(`(max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px)`).matches
  })

  const dialogRef = useRef<HTMLDivElement | null>(null)
  const lastActiveElRef = useRef<HTMLElement | null>(null)

  // реагируем на изменение брейкпоинта (sheet/desktop)
  useEffect(() => {
    if (!canUseDOM) return
    const mq = window.matchMedia(`(max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px)`)
    const handler = (e: MediaQueryListEvent) => setIsSheet(e.matches)
    mq.addEventListener?.('change', handler)

    return () => mq.removeEventListener?.('change', handler)
  }, [canUseDOM])

  // Esc — только когда открыто
  useEffect(() => {
    if (!canUseDOM || !open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)

    return () => document.removeEventListener('keydown', onKey)
  }, [canUseDOM, open, onClose])

  // Лочим скролл боди, когда открыто
  useScrollLock(open, 'overflow')

  // Фокус-трап + отключение фона inert/aria-hidden (опционально)
  useEffect(() => {
    if (!canUseDOM || !open || !trapFocus) return
    const modalNode = dialogRef.current
    if (!modalNode) return

    // 1) запоминаем предыдущий фокус
    lastActiveElRef.current = document.activeElement as HTMLElement | null

    // 2) фон делаем нефокусируемым и скрытым для SR
    const siblings = Array.from(document.body.children) as HTMLElement[]
    siblings.forEach((el) => {
      if (!el.contains(modalNode)) {
        el.setAttribute('aria-hidden', 'true')
        try {
          el.inert = true
        } catch {
          /* empty */
        }
        el.setAttribute('data-inert-applied', 'true')
      }
    })

    // 3) переводим фокус в модалку
    const focusable = getFocusableElements(modalNode)
    ;(focusable[0] ?? modalNode).focus()

    // 4) циклический Tab/Shift+Tab
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const items = getFocusableElements(modalNode)
      if (!items.length) {
        modalNode.focus()
        e.preventDefault()

        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      }
    }

    modalNode.addEventListener('keydown', onKeyDown)

    // очистка
    return () => {
      modalNode.removeEventListener('keydown', onKeyDown)
      siblings.forEach((el) => {
        if (el.getAttribute('data-inert-applied') === 'true') {
          el.removeAttribute('aria-hidden')
          try {
            el.inert = false
          } catch {
            /* empty */
          }
          el.removeAttribute('data-inert-applied')
        }
      })
      lastActiveElRef.current?.focus?.()
    }
  }, [canUseDOM, open, trapFocus])

  if (!target) return null

  return createPortal(
    <AnimatePresence
      mode="wait"
      initial={false}
    >
      {open && (
        <MotionVeil
          // клик по вуали закрывает модалку
          onClick={onClose}
          variants={veilVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <MotionWindow
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            tabIndex={-1}
            ref={dialogRef}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            variants={isSheet ? sheetVariants : desktopModalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            {...rest}
          >
            {children}
          </MotionWindow>
        </MotionVeil>
      )}
    </AnimatePresence>,
    target,
  )
}
