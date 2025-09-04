// Modal.tsx
import type { HTMLAttributes, ReactNode } from 'react'
import React, { useEffect, useMemo, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'

import { ModalVeil, ModalWindow } from '../index.linaria'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import {
  desktopModalVariants,
  sheetVariants,
  veilVariants,
} from '@/shared/assets/styles/overlays/alerts.animations'
import { useScrollLock } from '@/shared/hooks/useScrollLock'

export interface IModal extends HTMLAttributes<HTMLDivElement> {
  open: boolean
  onClose: () => void
  children: ReactNode
  /** Куда монтировать модалку. По умолчанию: #modal-root или body */
  container?: Element | null
}

const MotionVeil = motion(ModalVeil)
const MotionWindow = motion(ModalWindow)

export const Modal = ({ open, onClose, children, container, ...rest }: IModal) => {
  const canUseDOM = typeof window !== 'undefined' && typeof document !== 'undefined'
  const target = useMemo(() => {
    if (!canUseDOM) return null
    if (container) return container

    return document.getElementById('modal-root') ?? document.body
  }, [canUseDOM, container])

  // Определяем: bottom-sheet или обычная модалка
  const [isSheet, setIsSheet] = useState<boolean>(() => {
    if (!canUseDOM) return false

    return window.matchMedia(`(max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px)`).matches
  })

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

  // Лочим скролл под модалкой только когда открыто
  useScrollLock(open, 'overflow')

  if (!target) return null

  return createPortal(
    <AnimatePresence
      mode="wait"
      initial={false}
    >
      {open && (
        <MotionVeil
          role="dialog"
          aria-modal="true"
          onClick={onClose}
          variants={veilVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <MotionWindow
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
