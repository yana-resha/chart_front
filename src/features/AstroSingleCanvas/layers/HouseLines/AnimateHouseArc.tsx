import { useRef } from 'react'

import Konva from 'konva'
import { Arc } from 'react-konva'

interface AnimateHouseArcProps {
  rotation: number
  angle: number
  outer_radius: number
  inner_radius: number
  center: number
  hasPlanets: boolean
  isHighlighted: boolean
}
export const AnimateHouseArc = ({
  rotation,
  angle,
  outer_radius,
  inner_radius,
  center,
  hasPlanets,
  isHighlighted,
}: AnimateHouseArcProps) => {
  const arcRef = useRef<Konva.Arc>(null)
  const tweenRef = useRef<Konva.Tween | null>(null)

  const highlightedColor = hasPlanets ? 'rgba(4,187,209, 0.1)' : 'rgba(255, 255, 255, 0.1)'
  const defaultColor = 'rgba(135, 206, 235, 0)'
  if (arcRef.current) {
    tweenRef.current?.destroy()
    tweenRef.current = new Konva.Tween({
      node: arcRef.current,
      duration: 0.3,
      fill: isHighlighted ? highlightedColor : defaultColor,
      easing: Konva.Easings.EaseInOut,
    })

    tweenRef.current.play()
  }

  return (
    <Arc
      ref={arcRef}
      x={center}
      y={center}
      innerRadius={inner_radius}
      outerRadius={outer_radius}
      rotation={rotation}
      angle={angle}
      stroke="rgba(255, 255, 255, 0.4)"
      strokeWidth={1}
      fill={defaultColor}
    />
  )
}
