import type { HTMLAttributes, ReactNode } from 'react'
import { useEffect, useMemo } from 'react'
import React from 'react'

import { createPortal } from 'react-dom'

import { ModalVeil, ModalWindow } from '../index.linaria'

export interface IModal extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void
  children: ReactNode
  /** Куда монтировать модалку. По умолчанию: #modal-root или body */
  container?: Element | null
}

export const Modal = ({ onClose, children, container, ...rest }: IModal) => {
  // SSR-safe: ждём, пока будет window
  const canUseDOM = typeof window !== 'undefined' && typeof document !== 'undefined'
  const target = useMemo(() => {
    if (!canUseDOM) return null
    if (container) return container

    return document.getElementById('modal-root') ?? document.body
  }, [canUseDOM, container])

  // ESC + блок скролла под модалкой
  useEffect(() => {
    if (!canUseDOM) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const prevOverflow = document.body.style.overflow
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [canUseDOM, onClose])

  if (!target) return null

  return createPortal(
    <ModalVeil
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <ModalWindow
        // важно: тип именно React.MouseEvent, а не DOM MouseEvent
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        {...rest}
      >
        {children}
      </ModalWindow>
    </ModalVeil>,
    target,
  )
}
