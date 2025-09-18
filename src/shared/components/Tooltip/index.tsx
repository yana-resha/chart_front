import React, { useState, useRef, useEffect, HTMLAttributes, useId } from 'react'

import {
  useFloating,
  offset,
  flip,
  shift,
  arrow as arrowMw,
  autoUpdate,
  FloatingPortal,
  Placement,
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { TooltipArrow } from './TooltipArrow'
import { Button } from '../Button'
import { ChildrenWrapper, ClosedIcon, TooltipSurface } from './index.linaria'
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
  OverlayVeil,
} from '@/shared/assets/styles/overlays/shared.linaria'
import { getFocusableElements } from '@/shared/helpers/getFocusableElements'
import { useMedia } from '@/shared/hooks/useMedia'
import { useScrollLock } from '@/shared/hooks/useScrollLock'

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  tooltipContent: React.ReactNode | string
  mobileTitle?: React.ReactNode | string
  trigger?: 'click' | 'hover' | 'manual' // <-- добавили manual
  placement?: Placement
  open?: boolean // <-- контролируемый режим
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const MotionBox = motion.div
const MotionVeil = motion(OverlayVeil)
const MotionSheet = motion(TooltipSurface)

export const Tooltip = ({
  children,
  tooltipContent,
  mobileTitle,
  trigger = 'hover',
  placement = 'top-start',
  style,
  open, // <-- new
  defaultOpen, // <-- new
  onOpenChange, // <-- new
  ...props
}: TooltipProps) => {
  const isSheet = useMedia(`(max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px)`)
  const effectiveTrigger: 'click' | 'hover' | 'manual' = isSheet ? 'click' : trigger
  const isControlled = open !== undefined
  const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(defaultOpen ?? false)
  const actualOpen = isControlled ? !!open : uncontrolledOpen
  const setOpen = (v: boolean) => (isControlled ? onOpenChange?.(v) : setUncontrolledOpen(v))

  const arrowRef = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const titleId = useId()

  const {
    refs,
    floatingStyles,
    middlewareData,
    placement: actualPlacement,
  } = useFloating({
    placement,
    middleware: [offset(10), flip(), shift(), !isSheet ? arrowMw({ element: arrowRef }) : undefined].filter(
      Boolean,
    ),
    whileElementsMounted: autoUpdate,
  })

  const lastInputWasKeyboard = useRef(false)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // любые навигационные клавиши считаем «клавиатурным вводом»
      if (['Tab', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(e.key)) {
        lastInputWasKeyboard.current = true
      }
    }
    const onMouse = () => {
      lastInputWasKeyboard.current = false
    }

    window.addEventListener('keydown', onKey, true)
    window.addEventListener('mousedown', onMouse, true)

    return () => {
      window.removeEventListener('keydown', onKey, true)
      window.removeEventListener('mousedown', onMouse, true)
    }
  }, [])

  // клик вне — desktop вариант (не работаем в manual)
  useEffect(() => {
    if (!actualOpen || effectiveTrigger !== 'click' || isSheet) return
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (!wrapperRef.current?.contains(target) && !refs.floating.current?.contains(target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)

    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [actualOpen, effectiveTrigger, refs, isSheet])

  // Esc — общий (работает и в manual)
  useEffect(() => {
    if (!actualOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)

    return () => document.removeEventListener('keydown', onKey)
  }, [actualOpen])

  // блокируем скролл фона только для мобильного шита
  useScrollLock(actualOpen && isSheet, 'overflow')

  // события только если не manual
  const handleMouseEnter = () => {
    if (effectiveTrigger === 'hover') setOpen(true)
  }
  const handleMouseLeave = (e: React.MouseEvent) => {
    if (effectiveTrigger !== 'hover') return
    const related = e.relatedTarget as Node
    if (refs.floating.current && related && !refs.floating.current.contains(related)) setOpen(false)
  }
  const handleClick = () => {
    if (effectiveTrigger === 'click') setOpen(!actualOpen)
  }

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={effectiveTrigger === 'hover' ? handleMouseEnter : undefined}
      onMouseLeave={effectiveTrigger === 'hover' ? handleMouseLeave : undefined}
      style={{ display: 'inline', ...style }}
      {...props}
    >
      <ChildrenWrapper
        tabIndex={0}
        ref={refs.setReference}
        role={effectiveTrigger === 'click' ? 'button' : 'link'}
        aria-expanded={actualOpen || undefined}
        onClick={handleClick}
        // ❌ Больше НЕ погружаемся по клику (удалить onMouseDown/onClick-хитрости)

        // ✅ Погружаемся по клавиатурному фокусу (Tab)
        onFocus={(e: { currentTarget: HTMLElement }) => {
          // определяем, что фокус именно клавиатурный
          const el = e.currentTarget as HTMLElement
          const keyboardFocus =
            lastInputWasKeyboard.current || (typeof el.matches === 'function' && el.matches(':focus-visible'))

          if (!keyboardFocus) return
          // открыть тултип в hover-режиме (логика hover)
          if (effectiveTrigger === 'hover') setOpen(true)
          // в click-режиме можно не открывать на Tab, если не нужно. Если нужно — раскомментируй:
          // if (effectiveTrigger === 'click') setOpen(true)

          // перевести фокус внутрь (первый фокусируемый ребёнок, иначе — прокси)
          const [first] = getFocusableElements(el)
          const target = first /* ?? innerProxyRef.current */ // добавь прокси, если бывает «пусто»
          if (target) {
            // rAF — чтобы сохранить :focus-visible на ребёнке
            requestAnimationFrame(() => target.focus())
          }
        }}
        onBlur={(e: { relatedTarget: Node | null; currentTarget: Node }) => {
          const next = e.relatedTarget as Node | null
          const inFloating = !!refs.floating.current?.contains(next)
          const inTrigger = !!(e.currentTarget as Node).contains(next ?? null)
          if (!inFloating && !inTrigger) setOpen(false)
        }}
        // Клавиатура: Enter/Space (в click-режиме) и ArrowDown — открыть и сфокусироваться внутри
        onKeyDown={(e: { key: string; preventDefault: () => void; currentTarget: HTMLElement }) => {
          if (effectiveTrigger === 'click' && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            setOpen(true)
            const [first] = getFocusableElements(e.currentTarget as HTMLElement)
            if (first) requestAnimationFrame(() => first.focus())

            return
          }
          if (e.key === 'ArrowDown') {
            const [first] = getFocusableElements(e.currentTarget as HTMLElement)
            if (first) {
              e.preventDefault()
              first.focus()
            }
          }
          if (e.key === 'Escape') setOpen(false)
        }}
      >
        {children}
      </ChildrenWrapper>

      <FloatingPortal>
        <AnimatePresence>
          {/* Desktop popover */}
          {!isSheet && actualOpen && (
            <div
              ref={refs.setFloating}
              style={{ ...floatingStyles, position: 'absolute', zIndex: 1000 }}
            >
              <MotionBox
                variants={popoverVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <TooltipSurface>
                  <OverlayContentWrapper>{tooltipContent}</OverlayContentWrapper>
                  <Button
                    kind="text"
                    onClick={() => setOpen(false)}
                    aria-label="Close tooltip"
                  >
                    <ClosedIcon />
                  </Button>
                  <TooltipArrow
                    arrowRef={arrowRef}
                    x={middlewareData.arrow?.x}
                    y={middlewareData.arrow?.y}
                    placement={actualPlacement}
                  />
                </TooltipSurface>
              </MotionBox>
            </div>
          )}

          {/* Mobile bottom-sheet */}
          {isSheet && actualOpen && (
            <MotionVeil
              onClick={() => setOpen(false)}
              variants={veilVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-labelledby={mobileTitle ? titleId : undefined}
              aria-label={mobileTitle ? undefined : 'Tooltip'}
            >
              <MotionSheet
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                variants={sheetVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                role="document"
              >
                <OverlayHeader>
                  <OverlayHeaderTitle id={titleId}>{mobileTitle}</OverlayHeaderTitle>
                  <Button
                    kind="text"
                    onClick={() => setOpen(false)}
                    aria-label="Close tooltip"
                  >
                    <ClosedIcon />
                  </Button>
                </OverlayHeader>
                <OverlayContentWrapper>{tooltipContent}</OverlayContentWrapper>
              </MotionSheet>
            </MotionVeil>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}
