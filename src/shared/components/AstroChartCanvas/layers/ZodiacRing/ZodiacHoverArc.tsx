import { Arc } from 'react-konva'

import { getZodiacIndexFromAngle } from './helpers'
import { getZodiacTooltipHTML } from '../../tooltip-contents/getZodiacTooltipHTML'
import { getVisualAngleFromAsc } from '../../utils/astro-helpers'
import { getMouseCoords } from '../../utils/helpers'

interface HoverArcProps {
  index: number
  ascendant: number
  center: number
  innerRadius: number
  outerRadius: number
  onHoverChange: (index: number | null) => void
  isHovered: boolean
  showTooltip: (params: { text: string; x: number; y: number }) => void
  hideTooltip: () => void
  changeTooltipPosition: (pos: { x: number; y: number }) => void
}

export const ZodiacHoverArc = ({
  index,
  ascendant,
  center,
  innerRadius,
  outerRadius,
  onHoverChange,
  showTooltip,
  hideTooltip,
  changeTooltipPosition,
}: HoverArcProps) => {
  const startAngle = index * 30
  const visualStart = getVisualAngleFromAsc(startAngle, ascendant)
  const zodiacIndex = getZodiacIndexFromAngle(startAngle, ascendant)

  return (
    <Arc
      x={center}
      y={center}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      angle={30}
      rotation={visualStart}
      opacity={1}
      onMouseEnter={(evt) => {
        const { clientX, clientY } = getMouseCoords(evt)
        showTooltip({
          text: getZodiacTooltipHTML(zodiacIndex),
          x: clientX,
          y: clientY,
        })
        onHoverChange(index)
        evt.target.getStage()?.container().style.setProperty('cursor', 'pointer')
      }}
      onMouseMove={(evt) => {
        const { clientX, clientY } = getMouseCoords(evt)
        changeTooltipPosition({ x: clientX, y: clientY })
      }}
      onMouseLeave={(evt) => {
        hideTooltip()
        onHoverChange(null)
        evt.target.getStage()?.container().style.setProperty('cursor', 'default')
      }}
    />
  )
}
