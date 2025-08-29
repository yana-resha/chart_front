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
  getZodiacHTML: (index: number) => string // <-- чтобы не тянуть из другого файла здесь
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
  const handlers = usePointerTooltip({
    onEnter: ({ x, y }, evt) => {
      showTooltip({ text: getZodiacTooltipHTML(zodiacIndex), x, y })
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
    onDown: ({ x, y }) => {
      showTooltip({ text: getZodiacTooltipHTML(zodiacIndex), x, y, sticky: true })
      onHoverChange(zodiacIndex)
    },
    onUp: () => {
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
