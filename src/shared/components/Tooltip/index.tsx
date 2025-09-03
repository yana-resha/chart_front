import React, { useState, useRef, useEffect, HTMLAttributes } from 'react'

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
import { popoverVariants, veilVariants, sheetVariants } from '@/shared/assets/styles/overlays/alerts.animations'
import {
  OverlayClosedIcon,
  OverlayContentWrapper,
  OverlayHeader,
  OverlayVeil,
} from '@/shared/assets/styles/overlays/shared.linaria'
import { TooltipSurface } from '@/shared/assets/styles/overlays/tooltip.linaria'
import { MEDIA_POINTS } from '@/shared/assets/styles/media-points'
import { useMedia } from '@/shared/hooks/useMedia'
import { useScrollLock } from '@/shared/hooks/useScrollLock'

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  tooltipContent: React.ReactNode
  trigger?: 'click' | 'hover'
  placement?: Placement
}

const MotionBox = motion.div
const MotionVeil = motion(OverlayVeil)
const MotionSheet = motion(TooltipSurface)

export const Tooltip = ({
  children,
  tooltipContent,
  trigger = 'hover',
  placement = 'top-start',
  style,
  ...props
}: TooltipProps) => {
  const isSheet = useMedia(`(max-width: ${MEDIA_POINTS.MOBILE_ALERTS}px)`)
  const effectiveTrigger: 'click' | 'hover' = isSheet ? 'click' : trigger

  const [open, setOpen] = useState(false)
  const arrowRef = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

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

  // клик вне — desktop вариант
  useEffect(() => {
    if (!open || effectiveTrigger !== 'click' || isSheet) return
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (!wrapperRef.current?.contains(target) && !refs.floating.current?.contains(target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)

    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open, effectiveTrigger, refs, isSheet])

  // Esc — общий
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)

    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // блокируем скролл фона только для мобильного шита
  useScrollLock(open && isSheet, 'overflow')

  const handleMouseEnter = () => {
    if (effectiveTrigger === 'hover') setOpen(true)
  }
  const handleMouseLeave = (e: React.MouseEvent) => {
    if (effectiveTrigger !== 'hover') return
    const related = e.relatedTarget as Node
    if (refs.floating.current && related && !refs.floating.current.contains(related)) setOpen(false)
  }

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline', ...style }}
      {...props}
    >
      <span
        onClick={() => {
          if (effectiveTrigger === 'click') setOpen((prev) => !prev)
        }}
        style={{ cursor: effectiveTrigger === 'click' ? 'pointer' : 'default' }}
      >
        {children}
      </span>

      <FloatingPortal>
        <AnimatePresence>
          {/* Desktop popover */}
          {!isSheet && open && (
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
                  {/* стрелка только на desktop */}
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
          {isSheet && open && (
            <MotionVeil
              onClick={() => setOpen(false)}
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
                <OverlayHeader>
                  <Button
                    kind="text"
                    onClick={() => setOpen(false)}
                  >
                    <OverlayClosedIcon />
                  </Button>
                </OverlayHeader>

                {/* Контент тултипа без дополнительной оболочки */}
                <OverlayContentWrapper>{tooltipContent}</OverlayContentWrapper>
              </MotionSheet>
            </MotionVeil>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}
