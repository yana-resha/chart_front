import { useRef } from 'react'

import Konva from 'konva'
import { GroupConfig } from 'konva/lib/Group'
import { Node } from 'konva/lib/Node'
import { CircleConfig } from 'konva/lib/shapes/Circle'
import { Group, Circle, Text } from 'react-konva'

import { groupClosePlanets } from './groupClosePlanets'
import { useAstroChartContext } from '../../AstroChartContext'
import { PLANET_SIGNS } from '../../configs/planet.config'
import { getPlanetTooltipHTML } from '../../tooltip-contents/getPlanetTooltipHTML'
import { PlanetData } from '../../types'
import { ChartIcon } from '../../ui/ChartIcon'
import { getVisualAngleFromAsc, polarToCartesian } from '../../utils/astro-helpers'
import { getMouseCoords } from '../../utils/helpers'
import { getHouseIndexBySmth } from '@/shared/helpers/astro.helper'
import { ASTRO_PLANET } from '@/shared/types/astro-planets'

const ANGLE_SPREAD = 10
const DEFAULT_RADIUS_STEP = 20
const BASE_SCALE = 1
const HOVER_SCALE = 1.3

export const PlanetMarkers = () => {
  const {
    houseCusps = [],
    ZODIAC_INSIDE_RADIUS,
    PLANET_OUTSIDE_RADIUS,
    PLANET_INSIDE_RADIUS,
    FAKE_ASCENDANT,
    planets,
    showTooltip,
    hideTooltip,
    CENTER,
    changeTooltipPosition,
  } = useAstroChartContext()
  const ascendant = houseCusps[0] ?? FAKE_ASCENDANT

  const circleRefs = useRef<Record<string, Node<CircleConfig>>>({})
  const groupRefs = useRef<Record<string, Node<GroupConfig>>>({})

  const BASE_RADIUS_OFFSET = PLANET_OUTSIDE_RADIUS * 0.15
  const MAX_MARGIN = ZODIAC_INSIDE_RADIUS * 0.07

  const grouped = groupClosePlanets(planets, ascendant)
  const MAX_RADIUS = ZODIAC_INSIDE_RADIUS - MAX_MARGIN
  const MIN_RADIUS = PLANET_OUTSIDE_RADIUS + BASE_RADIUS_OFFSET

  const fs = (ZODIAC_INSIDE_RADIUS - PLANET_INSIDE_RADIUS) * 0.23

  const handleHover = (name: string, enter: boolean) => {
    const scale = enter ? HOVER_SCALE : BASE_SCALE
    const duration = 0.2
    const easing = Konva.Easings.EaseInOut

    const ref = circleRefs.current[name]
    if (ref) {
      const current = ref.scaleX()
      if (Math.abs(current - scale) > 0.01) {
        ref.to({ scaleX: scale, scaleY: scale, duration, easing })
      }
    }

    const groupRef = groupRefs.current[name]
    if (groupRef) {
      const current = groupRef.scaleX()
      if (Math.abs(current - scale) > 0.01) {
        groupRef.to({ scaleX: scale, scaleY: scale, duration, easing })
      }
    }
  }

  const setTooltip = (evt: Konva.KonvaEventObject<MouseEvent>, planet: PlanetData) => {
    const { clientX, clientY } = getMouseCoords(evt)
    const houseIndex = getHouseIndexBySmth(planet.longitude, houseCusps)
    showTooltip({ text: getPlanetTooltipHTML(planet, houseIndex), x: clientX, y: clientY })
    evt.target.getStage()?.container().style.setProperty('cursor', 'pointer')
  }

  const changeTooltip = (evt: Konva.KonvaEventObject<MouseEvent>) => {
    const { clientX, clientY } = getMouseCoords(evt)
    changeTooltipPosition({ x: clientX, y: clientY })
  }

  return (
    <>
      {planets.map((planet) => {
        const angle = getVisualAngleFromAsc(planet.longitude, ascendant)
        const radius = (PLANET_OUTSIDE_RADIUS + PLANET_INSIDE_RADIUS) / 2
        const pos = polarToCartesian(angle, radius, CENTER)

        return (
          <Circle
            key={`planet-circle-${planet.name}`}
            ref={(node) => {
              if (node) circleRefs.current[planet.name] = node
            }}
            x={pos.x}
            y={pos.y}
            radius={(PLANET_OUTSIDE_RADIUS - PLANET_INSIDE_RADIUS) / 2}
            fill="#E6E6FA"
            scale={{ x: 1, y: 1 }}
            onMouseEnter={(evt) => {
              const planetName = planet.name
              handleHover(planetName, true)
              setTooltip(evt, planet)
            }}
            onMouseMove={(evt) => changeTooltip(evt)}
            onMouseLeave={(e) => {
              handleHover(planet.name, false)
              hideTooltip()
              e.target.getStage()?.container().style.setProperty('cursor', 'default')
            }}
          />
        )
      })}

      {grouped.map((group) => {
        const groupSize = group.length
        const baseAngle =
          group.reduce((sum, p) => sum + getVisualAngleFromAsc(p.longitude, ascendant), 0) / groupSize

        const angleStep = ANGLE_SPREAD / Math.max(groupSize - 1, 1)
        const maxRadiusStep =
          groupSize > 1 ? (MAX_RADIUS - MIN_RADIUS) / ((groupSize - 1) / 2) : DEFAULT_RADIUS_STEP

        const radiusStep = Math.min(DEFAULT_RADIUS_STEP, maxRadiusStep)

        return group.map((planet, index) => {
          const offsetIndex = index - (groupSize - 1) / 2
          const angle = baseAngle + offsetIndex * angleStep
          const radius = MIN_RADIUS + Math.abs(offsetIndex) * radiusStep
          const pos = polarToCartesian(angle, radius, CENTER)
          const degree = Math.floor(planet.longitude % 30)
          const retrograde = planet.isRetrograde ? '℞' : ''
          const iconPath = PLANET_SIGNS[planet.name as ASTRO_PLANET]

          return (
            <Group
              key={`planet-${planet.name}`}
              x={pos.x}
              y={pos.y}
              scale={{ x: 1, y: 1 }}
              ref={(node) => {
                if (node) groupRefs.current[planet.name] = node
              }}
              onMouseEnter={(evt) => {
                const planetName = planet.name
                handleHover(planetName, true)
                setTooltip(evt, planet)
              }}
              onMouseMove={(evt) => changeTooltip(evt)}
              onMouseLeave={(e) => {
                handleHover(planet.name, false)
                hideTooltip()
                e.target.getStage()?.container().style.setProperty('cursor', 'default')
              }}
            >
              <ChartIcon
                path={iconPath}
                width={fs}
                height={fs}
                x={-(fs / 1.8)}
                y={-(fs / 1.8)}
              />
              <Text
                text={`${degree}°`}
                x={fs / 2.2}
                y={-(fs / 1.7)}
                fontSize={fs / 1.8}
                fill="white"
              />
              {retrograde && (
                <Text
                  text={retrograde}
                  x={fs / 2.2}
                  y={0}
                  fontSize={fs / 1.8}
                  fill="white"
                  fontStyle="italic"
                />
              )}
            </Group>
          )
        })
      })}
    </>
  )
}
