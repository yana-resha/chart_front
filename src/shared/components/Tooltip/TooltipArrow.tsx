import { CSSProperties, RefObject } from 'react'

import Tail from './assets/tail.svg?react'
import { TooltipTailContainer, tooltipTailIconCSS } from '@/shared/assets/styles/overlays/tooltip.linaria'

type TooltipArrowProps = {
  arrowRef: RefObject<HTMLDivElement | null>
  x: number | null | undefined
  y: number | null | undefined
  placement: string
}

export const TooltipArrow = ({ arrowRef, x, y, placement }: TooltipArrowProps) => {
  const basePlacement = placement.split('-')[0] as 'top' | 'bottom' | 'left' | 'right'

  const staticSide = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  }[basePlacement]

  const rotation = {
    top: 'rotate(0deg)',
    bottom: 'rotate(180deg)',
    left: 'rotate(-90deg)',
    right: 'rotate(90deg)',
  }[basePlacement]

  const arrowStyle: CSSProperties = {
    position: 'absolute',
    [staticSide!]: '-7px',
    transform: rotation,
  }

  if (basePlacement === 'top' || basePlacement === 'bottom') {
    arrowStyle.left = x != null ? `${x}px` : ''
  } else {
    arrowStyle.top = y != null ? `${y}px` : ''
  }

  return (
    <TooltipTailContainer
      ref={arrowRef}
      style={arrowStyle}
    >
      <Tail className={tooltipTailIconCSS} />
    </TooltipTailContainer>
  )
}
