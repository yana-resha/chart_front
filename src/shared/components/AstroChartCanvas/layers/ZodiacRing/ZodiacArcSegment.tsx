import { useRef } from 'react'

import Konva from 'konva'
import { Arc } from 'react-konva'

import { getVisualAngleFromAsc } from '../../utils/astro-helpers'

interface ZodiacArcProps {
  startDeg: number
  ascendant: number
  center: number
  innerRadius: number
  outerRadius: number
  isHovered: boolean
  color: string
}

export const ZodiacArcSegment = ({
  startDeg,
  ascendant,
  center,
  innerRadius,
  outerRadius,
  isHovered,
  color,
}: ZodiacArcProps) => {
  const arcRef = useRef<Konva.Arc>(null)
  const tweenRef = useRef<Konva.Tween | null>(null)

  const visualStart = getVisualAngleFromAsc(startDeg, ascendant)

  if (arcRef.current) {
    tweenRef.current?.destroy()
    tweenRef.current = new Konva.Tween({
      node: arcRef.current,
      duration: 0.3,
      opacity: isHovered ? 0.9 : 1,
      innerRadius: isHovered ? innerRadius - 0.5 : innerRadius,
      outerRadius: isHovered ? outerRadius - 0.5 : outerRadius,
      easing: Konva.Easings.EaseInOut,
    })
    tweenRef.current.play()
  }

  return (
    <Arc
      ref={arcRef}
      x={center}
      y={center}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      angle={30}
      rotation={visualStart}
      fill={color}
      opacity={1}
      stroke="black"
      strokeWidth={1}
    />
  )
}
