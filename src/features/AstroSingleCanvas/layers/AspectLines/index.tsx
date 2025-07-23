import { Fragment, useMemo, useRef, useState } from 'react'

import Konva from 'konva'
import { Ellipse, Line, Text } from 'react-konva'

import { useAstroCanvasContext } from '../../AstroChartContext'
import { lineHoverAnimation, textHoverAnimation } from './helpers/animate.helper'
import { ASPECT_COLOR } from '../../configs/aspect.config'
import { getAspectTooltipHTML } from '../../tooltip-contents/getAspectTooltipHTML'
import { getVisualAngleFromAsc, polarToCartesian } from '../../utils/astro-helpers'
import { getMouseCoords } from '../../utils/helpers'
import { ASTRO_ASPECT_NAME, ASTRO_ASPECT_SYMBOL } from '@/shared/configs/astro-aspects.config'
import { ASTRO_ASPECT } from '@/shared/types/astro/astro-aspects.types'

interface IConjuctionValues {
  rotation: number
  radiusX: number
  radiusY: number
  centerX: number
  centerY: number
}

const TEXT_DEFAULT_OPACITY = 1
const LINE_DEFAULT_OPACITY = 1

export const AspectLines = () => {
  const {
    houseCusps = [],
    CENTER,
    PLANET_INSIDE_RADIUS,
    PLANET_OUTSIDE_RADIUS,
    FAKE_ASCENDANT,
    aspects,
    planets,
    showTooltip,
    changeTooltipPosition,
    hideTooltip,
  } = useAstroCanvasContext()

  const ascendant = houseCusps[0] ?? FAKE_ASCENDANT
  /* Линейные аспекты */
  const aspect1Refs = useRef<(Konva.Line | null)[]>([])
  const aspect2Refs = useRef<(Konva.Line | null)[]>([])
  const symbolRefs = useRef<(Konva.Text | null)[]>([])
  /* Соединения */
  const conjuctionRefs = useRef<(Konva.Ellipse | null)[]>([])

  const [hoveredAspect, setHoveredAspect] = useState<string | null>(null)
  const fs = PLANET_INSIDE_RADIUS * 0.1

  const aspectData = useMemo(
    () =>
      aspects.map((aspect) => {
        const planetA = planets.find((el) => el.name === aspect.planetA)
        const planetB = planets.find((el) => el.name === aspect.planetB)
        if (!planetA || !planetB) return null

        const angleA = getVisualAngleFromAsc(planetA.longitude, ascendant)
        const angleB = getVisualAngleFromAsc(planetB.longitude, ascendant)

        const posA = polarToCartesian(angleA, PLANET_INSIDE_RADIUS, CENTER)
        const posB = polarToCartesian(angleB, PLANET_INSIDE_RADIUS, CENTER)

        const dx = posB.x - posA.x
        const dy = posB.y - posA.y
        const length = Math.sqrt(dx * dx + dy * dy)
        const ux = dx / length
        const uy = dy / length
        const gap = fs * 0.4

        const centerX = (posA.x + posB.x) / 2
        const centerY = (posA.y + posB.y) / 2
        const beforeX = centerX - ux * gap
        const beforeY = centerY - uy * gap
        const afterX = centerX + ux * gap
        const afterY = centerY + uy * gap
        const conjuction: IConjuctionValues = {
          rotation: 0,
          radiusX: 0,
          radiusY: 0,
          centerX: 0,
          centerY: 0,
        }
        if (aspect.aspectType === ASTRO_ASPECT.CONJUCTION) {
          const dx = posB.x - posA.x
          const dy = posB.y - posA.y

          const centerX = (posA.x + posB.x) / 2
          const centerY = (posA.y + posB.y) / 2

          const distance = Math.sqrt(dx * dx + dy * dy)
          const padding = 6

          const radiusX = distance / 2 + (PLANET_OUTSIDE_RADIUS - PLANET_OUTSIDE_RADIUS) + padding
          const radiusY = PLANET_OUTSIDE_RADIUS - PLANET_INSIDE_RADIUS - padding / 3

          // Угол поворота в градусах
          const rotation = (Math.atan2(dy, dx) * 180) / Math.PI

          conjuction.rotation = rotation
          conjuction.radiusX = radiusX
          conjuction.radiusY = radiusY
          conjuction.centerX = centerX
          conjuction.centerY = centerY
        }

        return {
          ...aspect,
          aspectSymbol: ASTRO_ASPECT_SYMBOL[aspect.aspectType],
          nameA: planetA.label ?? planetA.name,
          nameB: planetB.label ?? planetB.name,
          symbolA: planetA.symbol,
          symbolB: planetB.symbol,
          centerX,
          centerY,
          angleA,
          angleB,
          posA,
          posB,
          color: ASPECT_COLOR[aspect.aspectType],
          name: ASTRO_ASPECT_NAME[aspect.aspectType],
          linePart1: { x1: posA.x, y1: posA.y, x2: beforeX, y2: beforeY },
          linePart2: { x1: afterX, y1: afterY, x2: posB.x, y2: posB.y },
          conjuction,
        }
      }),
    [CENTER, PLANET_INSIDE_RADIUS, PLANET_OUTSIDE_RADIUS, ascendant, aspects, fs, planets],
  )

  return (
    <>
      {/* Аспекты кроме соединений */}
      {aspectData
        .filter((aspect) => aspect?.aspectType !== ASTRO_ASPECT.CONJUCTION)
        .map((aspect, i) => {
          if (aspect === null) return null
          const { color } = aspect
          const isHighlighted = hoveredAspect === 'line' + i

          const line1 = aspect1Refs.current[i]
          const line2 = aspect2Refs.current[i]
          const symbol = symbolRefs.current[i]

          if (line1 && line2) {
            lineHoverAnimation(line1, isHighlighted, LINE_DEFAULT_OPACITY)
            lineHoverAnimation(line2, isHighlighted, LINE_DEFAULT_OPACITY)
          }

          if (symbol) {
            textHoverAnimation(symbol, isHighlighted, TEXT_DEFAULT_OPACITY)
          }

          return (
            <Fragment key={`aspect-${i}`}>
              <Line
                ref={(node) => {
                  aspect1Refs.current[i] = node
                }}
                points={[aspect.linePart1.x1, aspect.linePart1.y1, aspect.linePart1.x2, aspect.linePart1.y2]}
                stroke={color}
                strokeWidth={1.5}
                opacity={LINE_DEFAULT_OPACITY}
                hitStrokeWidth={10}
                shadowColor={color}
                shadowBlur={0}
                shadowOpacity={0}
              />
              <Line
                ref={(node) => {
                  aspect2Refs.current[i] = node
                }}
                points={[aspect.linePart2.x1, aspect.linePart2.y1, aspect.linePart2.x2, aspect.linePart2.y2]}
                stroke={color}
                strokeWidth={1.5}
                opacity={LINE_DEFAULT_OPACITY}
                hitStrokeWidth={10}
                shadowColor={color}
                shadowBlur={0}
                shadowOpacity={0}
              />
              <Text
                ref={(node) => {
                  symbolRefs.current[i] = node
                }}
                fontFamily="Hamburg"
                text={aspect.aspectSymbol}
                x={aspect.centerX - fs / 2}
                y={aspect.centerY - fs / 2}
                fontSize={fs}
                fill={color}
                shadowColor={color}
                opacity={TEXT_DEFAULT_OPACITY}
                shadowBlur={0}
                shadowOpacity={0}
              />
            </Fragment>
          )
        })}

      {/* Наведение на всю линию, кроме соединений */}
      {aspectData
        .filter((aspect) => aspect?.aspectType !== ASTRO_ASPECT.CONJUCTION)
        .map((aspect, i) => {
          if (aspect === null) return null
          const { posA, posB } = aspect

          return (
            <Line
              key={`aspect-transparent-${i}`}
              points={[posA.x, posA.y, posB.x, posB.y]}
              hitStrokeWidth={10}
              onMouseEnter={(evt) => {
                const { clientX, clientY } = getMouseCoords(evt)
                showTooltip({
                  text: getAspectTooltipHTML(aspect),
                  x: clientX,
                  y: clientY,
                })
                setHoveredAspect('line' + i)
                evt.target.getStage()?.container().style.setProperty('cursor', 'pointer')
              }}
              onMouseMove={(evt) => {
                const { clientX, clientY } = getMouseCoords(evt)
                changeTooltipPosition({ x: clientX, y: clientY })
              }}
              onMouseLeave={(evt) => {
                hideTooltip()
                setHoveredAspect(null)
                evt.target.getStage()?.container().style.setProperty('cursor', 'default')
              }}
            />
          )
        })}

      {/* Соединения */}
      {aspectData
        .filter((aspect) => aspect?.aspectType === ASTRO_ASPECT.CONJUCTION)
        .map((aspect, i) => {
          if (aspect === null) return null
          const {
            color,
            conjuction: { centerX, centerY, radiusX, radiusY, rotation },
          } = aspect

          return (
            <Ellipse
              ref={(node) => {
                conjuctionRefs.current[i] = node
              }}
              key={`conjuction-${i}`}
              x={centerX}
              y={centerY}
              radiusX={radiusX}
              radiusY={radiusY}
              rotation={rotation}
              stroke={color}
              strokeWidth={3}
              opacity={LINE_DEFAULT_OPACITY}
              shadowColor={color}
              shadowBlur={0}
              shadowOpacity={0}
            />
          )
        })}
      {/* Соединения для наведения */}
      {aspectData
        .filter((aspect) => aspect?.aspectType === ASTRO_ASPECT.CONJUCTION)
        .map((aspect, i) => {
          if (aspect === null) return null
          const {
            conjuction: { centerX, centerY, radiusX, radiusY, rotation },
          } = aspect

          return (
            <Ellipse
              key={`conjuction--hover-${i}`}
              x={centerX}
              y={centerY}
              radiusX={radiusX}
              radiusY={radiusY}
              rotation={rotation}
              strokeWidth={3}
              shadowBlur={0}
              shadowOpacity={0}
              onMouseEnter={(evt) => {
                const { clientX, clientY } = getMouseCoords(evt)
                showTooltip({
                  text: getAspectTooltipHTML(aspect),
                  x: clientX,
                  y: clientY,
                })
                evt.target.getStage()?.container().style.setProperty('cursor', 'pointer')
              }}
              onMouseMove={(evt) => {
                const { clientX, clientY } = getMouseCoords(evt)
                changeTooltipPosition({ x: clientX, y: clientY })
              }}
              onMouseLeave={(evt) => {
                hideTooltip()
                evt.target.getStage()?.container().style.setProperty('cursor', 'default')
              }}
            />
          )
        })}
    </>
  )
}
