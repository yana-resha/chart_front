import { Arc } from 'react-konva'

import { getZodiacTooltipHTML } from '../../tooltip-contents/getZodiacTooltipHTML'
import { getMouseCoords } from '../../utils/helpers'

interface HoverArcProps {
  zodiacIndex: number
  rotation: number
  angle: number
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
}: HoverArcProps) => (
  <Arc
    x={center}
    y={center}
    innerRadius={innerRadius}
    outerRadius={outerRadius}
    angle={angle}
    rotation={rotation}
    opacity={1}
    onMouseEnter={(evt) => {
      const { clientX, clientY } = getMouseCoords(evt)
      showTooltip({
        text: getZodiacTooltipHTML(zodiacIndex),
        x: clientX,
        y: clientY,
      })
      onHoverChange(zodiacIndex)
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
