import { Fragment } from 'react'

import { Arc, Line } from 'react-konva'

import { useAstroCanvasContext } from '../../AstroChartContext'
import { ASPECT_COLOR } from '../../configs/aspect.config'
import { createPointerTooltipHandlers } from '../../hooks/usePointerTooltip'
import { getConjuctionTooltipHTML } from '../../tooltip-contents/getConjuctionTooltipHTML'
import { getVisualAngleFromAsc, polarToCartesian } from '../../utils/astro-helpers'
import { ASTRO_ASPECT_SYMBOL } from '@/shared/configs/astro-aspects.config'
import { ASTRO_ASPECT } from '@/shared/types/astro/astro-aspects.types'

export const ConjuctionArcLines = () => {
  const {
    houseCusps = [],
    CENTER,
    PLANET_INSIDE_RADIUS,
    ASPECT_INSIDE_RADIUS,
    FAKE_ASCENDANT,
    aspects,
    planets,
    hideTooltip,
    showTooltip,
    changeTooltipPosition,
  } = useAstroCanvasContext()

  const ascendant = houseCusps[0] ?? FAKE_ASCENDANT

  const conjuctionAspects = aspects
    .filter((aspect) => aspect.aspectType === ASTRO_ASPECT.CONJUCTION)
    .map((aspect) => {
      const planetA = planets.find((el) => el.name === aspect.planetA)
      const planetB = planets.find((el) => el.name === aspect.planetB)
      if (!planetA || !planetB) return null

      const angleA = getVisualAngleFromAsc(planetA.longitude, ascendant)
      const angleB = getVisualAngleFromAsc(planetB.longitude, ascendant)

      const startAngle = Math.min(angleA, angleB)
      const endAngle = Math.max(angleA, angleB)

      const arcAngle = (endAngle - startAngle + 360) % 360
      const arcRotation = startAngle - 90

      const lineAStart = polarToCartesian(angleA, PLANET_INSIDE_RADIUS, CENTER)
      const lineAEnd = polarToCartesian(angleA, ASPECT_INSIDE_RADIUS, CENTER)

      const lineBStart = polarToCartesian(angleB, PLANET_INSIDE_RADIUS, CENTER)
      const lineBEnd = polarToCartesian(angleB, ASPECT_INSIDE_RADIUS, CENTER)

      const color = ASPECT_COLOR[aspect.aspectType]

      return {
        ...aspect,
        key: `${aspect.planetA}-${aspect.planetB}`,
        nameA: planetA.label ?? planetA.name,
        nameB: planetB.label ?? planetB.name,
        symbolA: planetA.symbol,
        symbolB: planetB.symbol,
        color,
        lineA: { start: lineAStart, end: lineAEnd },
        lineB: { start: lineBStart, end: lineBEnd },
        arc: { angle: arcAngle, rotation: arcRotation },
        aspectSymbol: ASTRO_ASPECT_SYMBOL[aspect.aspectType],
      }
    })
    .filter((a): a is NonNullable<typeof a> => a !== null)

  const getTooltipAspects = (base: (typeof conjuctionAspects)[number]) =>
    conjuctionAspects.filter(
      (a) =>
        a.planetA === base.planetA ||
        a.planetB === base.planetA ||
        a.planetA === base.planetB ||
        a.planetB === base.planetB,
    )

  // фабрика pointer-хендлеров для конкретной дуги соединения
  const makeArcHandlers = (aspect: (typeof conjuctionAspects)[number]) =>
    createPointerTooltipHandlers({
      onEnter: ({ x, y }, evt) => {
        const related = getTooltipAspects(aspect)
        showTooltip({ text: getConjuctionTooltipHTML(related), x, y })
        evt.target.getStage()?.container().style.setProperty('cursor', 'pointer')
      },
      onMove: ({ x, y }) => {
        changeTooltipPosition({ x, y })
      },
      onLeave: (evt) => {
        hideTooltip()
        evt.target.getStage()?.container().style.setProperty('cursor', 'default')
      },
      onDown: ({ x, y }) => {
        const related = getTooltipAspects(aspect)
        showTooltip({ text: getConjuctionTooltipHTML(related), x, y })
      },
      onUp: () => {
        hideTooltip()
      },
    })

  return (
    <>
      {conjuctionAspects.map((aspect) => (
        <Fragment key={aspect.key}>
          <Line
            points={[aspect.lineA.start.x, aspect.lineA.start.y, aspect.lineA.end.x, aspect.lineA.end.y]}
            stroke={aspect.color}
            strokeWidth={2}
          />
          <Line
            points={[aspect.lineB.start.x, aspect.lineB.start.y, aspect.lineB.end.x, aspect.lineB.end.y]}
            stroke={aspect.color}
            strokeWidth={2}
          />
          <Arc
            x={CENTER}
            y={CENTER}
            innerRadius={ASPECT_INSIDE_RADIUS}
            outerRadius={ASPECT_INSIDE_RADIUS}
            angle={aspect.arc.angle}
            rotation={aspect.arc.rotation}
            stroke={aspect.color}
            strokeWidth={2}
          />
        </Fragment>
      ))}

      {/* Невидимые дуги поверх — ловят pointer-события для тултипов */}
      {conjuctionAspects.map((aspect) => (
        <Arc
          key={`hit-${aspect.key}`}
          x={CENTER}
          y={CENTER}
          innerRadius={ASPECT_INSIDE_RADIUS}
          outerRadius={PLANET_INSIDE_RADIUS}
          angle={aspect.arc.angle}
          rotation={aspect.arc.rotation}
          strokeWidth={2}
          stroke="transparent"
          fill="transparent"
          {...makeArcHandlers(aspect)}
        />
      ))}
    </>
  )
}
