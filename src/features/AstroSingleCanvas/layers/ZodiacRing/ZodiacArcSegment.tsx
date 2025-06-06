import { useEffect, useRef } from 'react'

import Konva from 'konva'
import { Arc, Group } from 'react-konva'

interface ZodiacArcProps {
  rotation: number
  center: number
  innerRadius: number
  outerRadius: number
  isHovered: boolean
  color: string
  angle: number
}

export const ZodiacArcSegment = ({
  center,
  innerRadius,
  outerRadius,
  rotation,
  isHovered,
  color,
  angle,
}: ZodiacArcProps) => {
  const arcRef = useRef<Konva.Arc>(null)
  const tweenRef = useRef<Konva.Tween | null>(null)

  useEffect(() => {
    if (arcRef.current) {
      tweenRef.current?.destroy()
      tweenRef.current = new Konva.Tween({
        node: arcRef.current,
        duration: 0.3,
        opacity: isHovered ? 0.9 : 1,
        innerRadius: isHovered ? innerRadius + 0.9 : innerRadius,
        outerRadius: isHovered ? outerRadius - 0.9 : outerRadius,
        easing: Konva.Easings.EaseInOut,
      })
      tweenRef.current.play()
    }
  }, [innerRadius, isHovered, outerRadius])

  return (
    <Group>
      {/* GLOW: увеличенный Arc под основным, полупрозрачный, яркий */}
      <Arc
        x={center}
        y={center}
        innerRadius={innerRadius + innerRadius * 0.02}
        outerRadius={outerRadius - innerRadius * 0.02}
        angle={angle}
        rotation={rotation}
        fill={color}
        opacity={0.1}
        listening={false}
        shadowBlur={15}
        shadowColor={color}
        shadowOpacity={0.8}
        stroke="black"
        strokeWidth={1}
      />

      {/* Основной Arc */}
      <Arc
        perfectDrawEnabled={false}
        ref={arcRef}
        x={center}
        y={center}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        angle={angle}
        rotation={rotation}
        fill={color}
        opacity={1}
      />
    </Group>
  )
}
