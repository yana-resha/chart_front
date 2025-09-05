import { Fragment, useMemo, useRef, useState } from 'react'

import Konva from 'konva'
import { Line, Text } from 'react-konva'

import { useAstroCanvasContext } from '../../AstroChartContext'
import { lineHoverAnimation, textHoverAnimation } from './helpers/animate.helper'
import { ASPECT_COLOR } from '../../configs/aspect.config'
import { createPointerTooltipHandlers } from '../../hooks/usePointerTooltip'
import { AspectTooltipContent } from '../../tooltip-contents/AspectTooltipContent'
import { getVisualAngleFromAsc, polarToCartesian } from '../../utils/astro-helpers'
import { ASTRO_ASPECT_NAME, ASTRO_ASPECT_SYMBOL } from '@/shared/configs/astro-aspects.config'
import { ASTRO_ASPECT } from '@/shared/types/astro/astro-aspects.types'

// общий хелпер фабрики pointer-хендлеров

const TEXT_DEFAULT_OPACITY = 1
const LINE_DEFAULT_OPACITY = 1

export const AspectLines = () => {
  const {
    houseCusps = [],
    CENTER,
    PLANET_INSIDE_RADIUS,
    ASPECT_INSIDE_RADIUS,
    FAKE_ASCENDANT,
    aspects,
    planets,
    showTooltip,
    changeTooltipPosition,
    hideTooltip,
    isMobile,
  } = useAstroCanvasContext()

  const ascendant = houseCusps[0] ?? FAKE_ASCENDANT

  // refs для анимаций
  const aspect1Refs = useRef<(Konva.Line | null)[]>([])
  const aspect2Refs = useRef<(Konva.Line | null)[]>([])
  const symbolRefs = useRef<(Konva.Text | null)[]>([])

  const [hoveredAspect, setHoveredAspect] = useState<string | null>(null)
  const fs = PLANET_INSIDE_RADIUS * 0.1

  const lineAspects = useMemo(
    () =>
      aspects
        .filter((aspect) => aspect.aspectType !== ASTRO_ASPECT.CONJUCTION)
        .map((aspect) => {
          const planetA = planets.find((el) => el.name === aspect.planetA)
          const planetB = planets.find((el) => el.name === aspect.planetB)
          if (!planetA || !planetB) return null

          const angleA = getVisualAngleFromAsc(planetA.longitude, ascendant)
          const angleB = getVisualAngleFromAsc(planetB.longitude, ascendant)

          const posA = polarToCartesian(angleA, ASPECT_INSIDE_RADIUS, CENTER)
          const posB = polarToCartesian(angleB, ASPECT_INSIDE_RADIUS, CENTER)

          // небольшой разрыв под символ
          const dx = posB.x - posA.x
          const dy = posB.y - posA.y
          const length = Math.sqrt(dx * dx + dy * dy) || 1
          const ux = dx / length
          const uy = dy / length
          const gap = fs * 0.4

          const centerX = (posA.x + posB.x) / 2
          const centerY = (posA.y + posB.y) / 2
          const beforeX = centerX - ux * gap
          const beforeY = centerY - uy * gap
          const afterX = centerX + ux * gap
          const afterY = centerY + uy * gap

          return {
            ...aspect,
            aspectSymbol: ASTRO_ASPECT_SYMBOL[aspect.aspectType],
            nameA: planetA.label ?? planetA.name,
            nameB: planetB.label ?? planetB.name,
            symbolA: planetA.symbol,
            symbolB: planetB.symbol,
            centerX,
            centerY,
            posA,
            posB,
            color: ASPECT_COLOR[aspect.aspectType],
            name: ASTRO_ASPECT_NAME[aspect.aspectType],
            linePart1: { x1: posA.x, y1: posA.y, x2: beforeX, y2: beforeY },
            linePart2: { x1: afterX, y1: afterY, x2: posB.x, y2: posB.y },
          }
        }),
    [ASPECT_INSIDE_RADIUS, CENTER, ascendant, aspects, fs, planets],
  )

  // фабрика pointer-хендлеров для прозрачной "хит"-линии
  const makeLineHandlers = (aspect: NonNullable<(typeof lineAspects)[number]>, i: number) =>
    createPointerTooltipHandlers(
      {
        // DESKTOP: hover/move/leave
        onEnter: ({ x, y }, evt) => {
          showTooltip({ text: <AspectTooltipContent {...aspect} />, x, y, mobileTitle: 'Аспект' })
          setHoveredAspect('line' + i)
          evt.target.getStage()?.container().style.setProperty('cursor', 'pointer')
        },
        onMove: ({ x, y }) => {
          changeTooltipPosition({ x, y })
        },
        onLeave: (evt) => {
          hideTooltip()
          setHoveredAspect(null)
          evt.target.getStage()?.container().style.setProperty('cursor', 'default')
        },

        // MOBILE: нижний fixed-tooltip (координаты игнорируются стилями)
        onOpen: () => {
          showTooltip({ text: <AspectTooltipContent {...aspect} />, x: 0, y: 0, mobileTitle: 'Аспект' })
          setHoveredAspect('line' + i)
        },
        onClose: () => {
          hideTooltip()
          setHoveredAspect(null)
        },
      },
      isMobile,
    )

  return (
    <>
      {/* Аспекты (кроме соединений): отрисовка */}
      {lineAspects
        .filter((a): a is NonNullable<typeof a> => a !== null && a.aspectType !== ASTRO_ASPECT.CONJUCTION)
        .map((aspect, i) => {
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

      {/* Прозрачные "хит"-линии поверх — ловят pointer-события и показывают тултип */}
      {lineAspects
        .filter((a): a is NonNullable<typeof a> => a !== null && a.aspectType !== ASTRO_ASPECT.CONJUCTION)
        .map((aspect, i) => (
          <Line
            key={`aspect-hit-${i}`}
            points={[aspect.posA.x, aspect.posA.y, aspect.posB.x, aspect.posB.y]}
            hitStrokeWidth={10}
            stroke="transparent"
            {...makeLineHandlers(aspect, i)}
          />
        ))}
    </>
  )
}
