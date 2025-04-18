import { Fragment, useMemo, useState } from 'react'

import { Arc, Circle, Text } from 'react-konva'

import { AnimateHouseArc } from './AnimateHouseArc'
import { useAstroChartContext } from '../../AstroChartContext'
import { getHouseTooltipHTML } from '../../tooltip-contents/getHouseTooltipHTML'
import { getPlanetsByHouse, getVisualAngleFromAsc, polarToCartesian } from '../../utils/astro-helpers'
import { getMouseCoords } from '../../utils/helpers'
import { ASTRO_HOUSE_SYMBOL } from '@/shared/configs/astro-houses.config'

export const HouseLines = () => {
  const {
    houseCusps = [],
    planets,
    CENTER,
    RADIUS,
    HOUSES_INSIDE_RADIUS,
    FAKE_ASCENDANT,
    PLANET_OUTSIDE_RADIUS,
    hideTooltip,
    showTooltip,
    changeTooltipPosition,
  } = useAstroChartContext()

  const ascendant = houseCusps[0] ?? FAKE_ASCENDANT

  const planetsByHouse = useMemo(() => getPlanetsByHouse(planets, houseCusps), [houseCusps, planets])

  const cuspAngles = {
    ASC: getVisualAngleFromAsc(houseCusps[0], ascendant),
    DSC: getVisualAngleFromAsc(houseCusps[6], ascendant),
    MC: getVisualAngleFromAsc(houseCusps[9], ascendant),
    IC: getVisualAngleFromAsc(houseCusps[3], ascendant),
  }

  const labels = [
    { label: 'ASC', angle: cuspAngles.ASC },
    { label: 'DSC', angle: cuspAngles.DSC },
    { label: 'MC', angle: cuspAngles.MC },
    { label: 'IC', angle: cuspAngles.IC },
  ]

  const [hoveredHouse, setHoveredHouse] = useState<number | null>(null)
  const INNER_RADIUS = RADIUS - (RADIUS - PLANET_OUTSIDE_RADIUS)
  const fs = (RADIUS - HOUSES_INSIDE_RADIUS) * 0.4

  const arcData = useMemo(
    () =>
      houseCusps.map((start, i) => {
        const end = houseCusps[(i + 1) % 12]
        const visualStart = getVisualAngleFromAsc(start, ascendant)
        const visualEnd = getVisualAngleFromAsc(end, ascendant)
        const angle = (visualStart - visualEnd + 360) % 360
        const hasPlanets = planetsByHouse[i].length > 0

        return {
          deg: start,
          angle,
          rotation: visualEnd - 90,
          hasPlanets,
        }
      }),
    [ascendant, houseCusps, planetsByHouse],
  )

  return (
    <Fragment>
      <Circle
        x={CENTER}
        y={CENTER}
        radius={RADIUS}
        stroke="white"
        strokeWidth={1}
      />

      {/* Арки домов */}
      {arcData.map((data, i) => (
        <AnimateHouseArc
          key={`house-visible-${i}`}
          angle={data.angle}
          rotation={data.rotation}
          outer_radius={RADIUS}
          inner_radius={INNER_RADIUS}
          center={CENTER}
          isHighlighted={hoveredHouse === i}
          hasPlanets={data.hasPlanets}
        />
      ))}
      {/* Labels домов */}
      {houseCusps.map((deg, i) => {
        const nextDeg = houseCusps[(i + 1) % 12]
        const middleDeg = (deg + ((nextDeg - deg + 360) % 360) / 2) % 360

        const angle = getVisualAngleFromAsc(middleDeg, ascendant)
        const pos = polarToCartesian(angle, (RADIUS + HOUSES_INSIDE_RADIUS) / 2, CENTER)

        return (
          <Text
            key={`house-label-${i + 1}`}
            text={ASTRO_HOUSE_SYMBOL[i + 1]}
            x={pos.x - fs / 1.9}
            y={pos.y - fs / 1.9}
            fontSize={fs}
            fill="white"
          />
        )
      })}

      <Circle
        x={CENTER}
        y={CENTER}
        radius={RADIUS + RADIUS * 0.06}
        stroke="grey"
        strokeWidth={0.5}
        dash={[4, 4]}
      />

      {/* Асцедент/ MC/ IC / DSC */}
      {labels.map(({ label, angle }) => {
        const labelRadius = RADIUS + RADIUS * 0.06
        const pos = polarToCartesian(angle, labelRadius, CENTER)
        const isLeftOfCenter = pos.x < CENTER

        return (
          <Text
            key={label}
            text={label}
            x={pos.x}
            y={pos.y}
            offsetX={fs * (isLeftOfCenter ? 1.2 : 0.8)}
            offsetY={fs / 2}
            fontSize={fs}
            fill="gray"
            fontStyle="italic"
          />
        )
      })}
      {/* Арки домов для наведения */}
      {arcData.map((data, i) => (
        <Arc
          key={`house-arc-${i}`}
          x={CENTER}
          y={CENTER}
          innerRadius={RADIUS - (RADIUS - HOUSES_INSIDE_RADIUS)}
          outerRadius={RADIUS}
          rotation={data.rotation}
          angle={data.angle}
          stroke="transparent"
          strokeWidth={0}
          onMouseEnter={(evt) => {
            const { clientX, clientY } = getMouseCoords(evt)
            showTooltip({
              text: getHouseTooltipHTML(data.deg, i + 1),
              x: clientX,
              y: clientY,
            })
            setHoveredHouse(i)
            evt.target.getStage()?.container().style.setProperty('cursor', 'pointer')
          }}
          onMouseMove={(evt) => {
            const { clientX, clientY } = getMouseCoords(evt)
            changeTooltipPosition({ x: clientX, y: clientY })
          }}
          onMouseLeave={(evt) => {
            hideTooltip()
            setHoveredHouse(null)
            evt.target.getStage()?.container().style.setProperty('cursor', 'default')
          }}
        />
      ))}
    </Fragment>
  )
}
