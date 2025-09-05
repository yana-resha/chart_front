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
import { ClosedIcon, TooltipSurface } from './index.linaria'
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

  useEffect(() => {
    if (refs && wrapperRef.current) refs.setReference(wrapperRef.current)
  }, [refs])

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
      <span
        onClick={effectiveTrigger === 'click' ? handleClick : undefined}
        style={{ cursor: effectiveTrigger === 'click' ? 'pointer' : 'default' }}
      >
        {children}
      </span>

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
