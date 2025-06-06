import { Fragment, useMemo, useState } from 'react'

import { ZodiacArcSegment } from './ZodiacArcSegment'
import { ZodiacHoverArc } from './ZodiacHoverArc'
import { useAstroCanvasContext } from '../../AstroChartContext'
import { ZODIAC_SIGNS } from '../../configs/zodiac.config'
import { ChartIcon } from '../../ui/ChartIcon'
import { getVisualAngleFromAsc, polarToCartesian } from '../../utils/astro-helpers'
import { ASTRO_ZODIAC_COLOR } from '@/shared/configs/astro-zodiac.config'
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
  } = useAstroCanvasContext()

  const ascendant = houseCusps[0] ?? FAKE_ASCENDANT
  const labelRadius = ZODIAC_INSIDE_RADIUS + ZODIAC_ARC_WEIGHT / 2
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  /* Данные для арок, чтобы два раза не считать */
  const arcData = useMemo(() => {
    const ascSignIndex = Math.floor((ascendant % 360) / 30) // индекс знака у ASC

    return Array.from({ length: 12 }).map((_, i) => {
      // Смещаем индексы знаков так, чтобы ascSignIndex был в начале,
      // а дальше идём против часовой стрелки (уменьшая индекс с циклом)
      const zodiacIndex = (ascSignIndex - i + 12) % 12
      const zodiac = getSignKeyByIndex(zodiacIndex + 1)

      // Реальный градус знака (нужен для корректного вычисления визуального угла)
      const startDegree = zodiacIndex * 30

      // Преобразуем градус в визуальный угол (относительно ASC)
      const rotation = getVisualAngleFromAsc(startDegree, ascendant) - 120

      return {
        angle: 30,
        startDegree,
        rotation,
        zodiacIndex: zodiacIndex + 1,
        zodiac,
        color: ASTRO_ZODIAC_COLOR[zodiac],
        center: CENTER,
        innerRadius: HOUSES_INSIDE_RADIUS,
        outerRadius: ZODIAC_INSIDE_RADIUS,
      }
    })
  }, [ascendant, CENTER, HOUSES_INSIDE_RADIUS, ZODIAC_INSIDE_RADIUS])

  return (
    <Fragment>
      {arcData.map((data, i) => (
        <ZodiacArcSegment
          key={`segment-${i}`}
          rotation={data.rotation}
          center={data.center}
          innerRadius={data.innerRadius}
          outerRadius={data.outerRadius}
          isHovered={hoveredIndex === data.zodiacIndex}
          color={data.color}
          angle={data.angle}
        />
      ))}
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

      {arcData.map((data, i) => (
        <ZodiacHoverArc
          key={`hover-${i}`}
          zodiacIndex={data.zodiacIndex}
          center={data.center}
          angle={data.angle}
          rotation={data.rotation}
          innerRadius={data.innerRadius}
          outerRadius={data.outerRadius}
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
