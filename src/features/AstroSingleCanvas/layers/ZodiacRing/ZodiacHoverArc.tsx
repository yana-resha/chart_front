import { useMemo } from 'react'

import { Arc } from 'react-konva'

import { usePointerTooltip } from '../../hooks/usePointerTooltip'
import { getZodiacTooltipHTML } from '../../tooltip-contents/getZodiacTooltipHTML'

interface HoverArcProps {
  zodiacIndex: number
  rotation: number
  angle: number
  center: number
  innerRadius: number
  outerRadius: number
  onHoverChange: (index: number | null) => void
  isHovered: boolean
  showTooltip: (params: { text: string; x: number; y: number; sticky?: boolean }) => void
  hideTooltip: () => void
  changeTooltipPosition: (pos: { x: number; y: number }) => void
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
  const html = useMemo(() => getZodiacTooltipHTML(zodiacIndex), [zodiacIndex])

  const handlers = usePointerTooltip({
    // DESKTOP
    onEnter: ({ x, y }, evt) => {
      showTooltip({ text: html, x, y })
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
      showTooltip({ text: html, x: 0, y: 0 })
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
