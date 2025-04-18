import React, { useState, useRef, useEffect, HTMLAttributes } from 'react'

import {
  useFloating,
  offset,
  flip,
  shift,
  arrow,
  autoUpdate,
  FloatingPortal,
  Placement,
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { ClosedButton, closedIconCSS, TooltipContainer } from './index.linaria'
import { TooltipArrow } from './TooltipArrow'
import ClosedIcon from '@/shared/assets/icons/cross.svg?react'

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  tooltipContent: React.ReactNode
  trigger?: 'click' | 'hover'
  placement?: Placement
}

export const Tooltip = ({
  children,
  tooltipContent,
  trigger = 'hover',
  placement = 'top-start',
  ...props
}: TooltipProps) => {
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
    middleware: [offset(10), flip(), shift(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
  })

  useEffect(() => {
    if (refs && wrapperRef.current) {
      refs.setReference(wrapperRef.current)
    }
  }, [refs])

  useEffect(() => {
    if (!open || trigger !== 'click') return

    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(target) &&
        refs.floating.current &&
        !refs.floating.current.contains(target)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onClickOutside)

    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open, trigger, refs])

  const handleMouseEnter = () => {
    if (trigger === 'hover') setOpen(true)
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (trigger !== 'hover') return
    const related = e.relatedTarget as Node
    if (refs.floating.current && related && !refs.floating.current.contains(related)) {
      setOpen(false)
    }
  }

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div
        onClick={() => {
          if (trigger === 'click') setOpen((prev) => !prev)
        }}
        style={{ cursor: trigger === 'click' ? 'pointer' : 'default' }}
      >
        {children}
      </div>

      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <div
              ref={refs.setFloating}
              style={{ ...floatingStyles, position: 'absolute' }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <TooltipContainer>
                  {tooltipContent}
                  <ClosedButton onClick={() => setOpen(false)}>
                    <ClosedIcon className={closedIconCSS} />
                  </ClosedButton>
                  <TooltipArrow
                    arrowRef={arrowRef}
                    x={middlewareData.arrow?.x}
                    y={middlewareData.arrow?.y}
                    placement={actualPlacement}
                  />
                </TooltipContainer>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}
