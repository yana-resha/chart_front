import { useRef } from 'react'

import Konva from 'konva'
import { Line } from 'react-konva'

import { useAstroChartContext } from '../AstroChartContext'
import { getVisualAngleFromAsc, polarToCartesian } from '../utils/astro-helpers'

const aspectColors: Record<string, string> = {
  Conjunction: '#444',
  Trine: 'green',
  Sextile: 'blue',
  Square: 'red',
  Opposition: 'orange',
}

export const AspectLines = () => {
  const {
    houseCusps = [],
    CENTER,
    PLANET_INSIDE_RADIUS,
    FAKE_ASCENDANT,
    aspects,
    planets,
  } = useAstroChartContext()
  const ascendant = houseCusps[0] ?? FAKE_ASCENDANT
  const aspectRefs = useRef<(Konva.Line | null)[]>([])

  return (
    <>
      {aspects.map((aspect, i) => {
        const planetA = planets.find((el) => el.name === aspect.planetA)
        const planetB = planets.find((el) => el.name === aspect.planetB)
        if (!planetA || !planetB) return null

        const angleA = getVisualAngleFromAsc(planetA.longitude, ascendant)
        const angleB = getVisualAngleFromAsc(planetB.longitude, ascendant)

        const posA = polarToCartesian(angleA, PLANET_INSIDE_RADIUS, CENTER)
        const posB = polarToCartesian(angleB, PLANET_INSIDE_RADIUS, CENTER)

        const color = aspectColors[aspect.aspectType] || 'gray'

        return (
          <Line
            key={`aspect-${i}`}
            ref={(node) => {
              aspectRefs.current[i] = node
            }}
            points={[posA.x, posA.y, posB.x, posB.y]}
            stroke={color}
            strokeWidth={1.5}
            opacity={0.6}
            hitStrokeWidth={10}
            shadowColor={color}
            shadowBlur={0}
            shadowOpacity={0}
            onMouseEnter={() => {
              const midX = (posA.x + posB.x) / 2
              const midY = (posA.y + posB.y) / 2

              const line = aspectRefs.current[i]
              if (line) {
                new Konva.Tween({
                  node: line,
                  strokeWidth: 3,
                  opacity: 1,
                  shadowBlur: 12,
                  shadowOpacity: 0.8,
                  duration: 0.1,
                }).play()
              }
            }}
            onMouseLeave={() => {
              const line = aspectRefs.current[i]
              if (line) {
                new Konva.Tween({
                  node: line,
                  strokeWidth: 1.5,
                  opacity: 0.6,
                  shadowBlur: 0,
                  shadowOpacity: 0,
                  duration: 0.1,
                }).play()
              }
            }}
          />
        )
      })}
    </>
  )
}
