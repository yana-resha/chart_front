import { Fragment, useState } from 'react'

import { getZodiacIndexFromAngle } from './helpers'
import { ZodiacArcSegment } from './ZodiacArcSegment'
import { ZodiacHoverArc } from './ZodiacHoverArc'
import { useAstroChartContext } from '../../AstroChartContext'
import { ZODIAC_COLORS, ZODIAC_SIGNS } from '../../configs/zodiac.config'
import { ChartIcon } from '../../ui/ChartIcon'
import { getVisualAngleFromAsc, polarToCartesian } from '../../utils/astro-helpers'
import { getSignKeyByIndex } from '@/shared/helpers/astro.helper'

export const ZodiacRing = () => {
  const {
    houseCusps = [],
    CENTER,
    HOUSES_INSIDE_RADIUS,
    ZODIAC_ARC_WEIGHT,
    FAKE_ASCENDANT,
    ZODIAC_INSIDE_RADIUS,
    showTooltip,
    hideTooltip,
    changeTooltipPosition,
  } = useAstroChartContext()

  const ascendant = houseCusps[0] ?? FAKE_ASCENDANT
  const labelRadius = ZODIAC_INSIDE_RADIUS + ZODIAC_ARC_WEIGHT / 2
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <Fragment>
      {Array.from({ length: 12 }).map((_, i) => {
        const startAngle = i * 30
        const zodiacIndex = getZodiacIndexFromAngle(startAngle, ascendant)
        const zodiac = getSignKeyByIndex(zodiacIndex)
        const color = ZODIAC_COLORS[zodiac]

        return (
          <ZodiacArcSegment
            key={`segment-${i}`}
            startDeg={startAngle}
            ascendant={ascendant}
            center={CENTER}
            innerRadius={HOUSES_INSIDE_RADIUS}
            outerRadius={ZODIAC_INSIDE_RADIUS}
            isHovered={hoveredIndex === i}
            color={color}
          />
        )
      })}

      {Object.entries(ZODIAC_SIGNS).map(([, sign], i) => {
        const middleAngle = i * 30 + 15
        const visualAngle = getVisualAngleFromAsc(middleAngle, ascendant)
        const { x, y } = polarToCartesian(visualAngle, labelRadius, CENTER)
        const size = ZODIAC_ARC_WEIGHT * 0.7

        return (
          <ChartIcon
            key={`icon-${i}`}
            path={sign}
            width={size}
            height={size}
            x={x - size / 2}
            y={y - size / 2}
          />
        )
      })}

      {Array.from({ length: 12 }).map((_, i) => (
        <ZodiacHoverArc
          key={`hover-${i}`}
          index={i}
          ascendant={ascendant}
          center={CENTER}
          innerRadius={HOUSES_INSIDE_RADIUS}
          outerRadius={ZODIAC_INSIDE_RADIUS}
          isHovered={hoveredIndex === i}
          onHoverChange={setHoveredIndex}
          showTooltip={showTooltip}
          hideTooltip={hideTooltip}
          changeTooltipPosition={changeTooltipPosition}
        />
      ))}
    </Fragment>
  )
}
