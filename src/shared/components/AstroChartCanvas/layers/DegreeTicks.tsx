import { Line } from 'react-konva'

import { useAstroChartContext } from '../AstroChartContext'
import { getVisualAngleFromAsc, polarToCartesian } from '../utils/astro-helpers'

export const DegreeTicks = () => {
  const { houseCusps = [], CENTER, PLANET_INSIDE_RADIUS, FAKE_ASCENDANT } = useAstroChartContext()
  const ascendant = houseCusps[0] ?? FAKE_ASCENDANT

  return (
    <>
      {Array.from({ length: 360 }).map((_, i) => {
        const isMajor = i % 10 === 0

        const angle = getVisualAngleFromAsc(i, ascendant)

        const tickStart = polarToCartesian(angle, PLANET_INSIDE_RADIUS, CENTER)
        const tickEnd = polarToCartesian(angle, PLANET_INSIDE_RADIUS - (isMajor ? 8 : 4), CENTER)

        return (
          <Line
            key={`tick-${i}`}
            points={[tickStart.x, tickStart.y, tickEnd.x, tickEnd.y]}
            stroke="white"
            strokeWidth={isMajor ? 0.75 : 0.5}
            opacity={0.7}
          />
        )
      })}
    </>
  )
}
