import { useMemo } from 'react'

import { Arc } from 'react-konva'

import { usePointerTooltip } from '../../hooks/usePointerTooltip'
import { ZodiacTooltipContent } from '../../tooltip-contents/ZodiacTooltipContent'
import { TooltipMethods } from '../../types'

interface HoverArcProps extends TooltipMethods {
  zodiacIndex: number
  rotation: number
  angle: number
  center: number
  innerRadius: number
  outerRadius: number
  onHoverChange: (index: number | null) => void
  isHovered: boolean
}

export const ZodiacHoverArc = ({
  zodiacIndex,
  angle,
  center,
  rotation,
  innerRadius,
  outerRadius,
  onHoverChange,
  showTooltip,
  hideTooltip,
  changeTooltipPosition,
}: HoverArcProps) => {
  const html = useMemo(() => <ZodiacTooltipContent zodiacIndex={zodiacIndex} />, [zodiacIndex])

  const handlers = usePointerTooltip({
    // DESKTOP
    onEnter: ({ x, y }, evt) => {
      showTooltip({ text: html, x, y, mobileTitle: 'Знак зодиака' })
      onHoverChange(zodiacIndex)
      evt.target.getStage()?.container().style.setProperty('cursor', 'pointer')
    },
    onMove: ({ x, y }) => {
      changeTooltipPosition({ x, y })
    },
    onLeave: (evt) => {
      hideTooltip()
      onHoverChange(null)
      evt.target.getStage()?.container().style.setProperty('cursor', 'default')
    },

    // MOBILE (нижний fixed-tooltip): координаты игнорятся стилями
    onOpen: () => {
      showTooltip({ text: html, x: 0, y: 0, mobileTitle: 'Знак зодиака' })
      onHoverChange(zodiacIndex)
    },
    onClose: () => {
      hideTooltip()
      onHoverChange(null)
    },
  })

  return (
    <Arc
      x={center}
      y={center}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      angle={angle}
      rotation={rotation}
      opacity={1}
      {...handlers}
    />
  )
}
