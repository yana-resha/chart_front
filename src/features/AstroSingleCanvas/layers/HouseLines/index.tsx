import { Fragment, useMemo, useState } from 'react'

import { Arc, Circle, Text } from 'react-konva'

import { AnimateHouseArc } from './AnimateHouseArc'
import { useAstroCanvasContext } from '../../AstroChartContext'
import { createPointerTooltipHandlers } from '../../hooks/usePointerTooltip'
import { HouseTooltipContent } from '../../tooltip-contents/HouseTooltipContent'
import { getPlanetsByHouse, getVisualAngleFromAsc, polarToCartesian } from '../../utils/astro-helpers'
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
    isMobile,
    changeTooltipPosition,
  } = useAstroCanvasContext()

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
  // фабрика обработчиков для конкретного сектора дома
  const makeHouseHandlers = (deg: number, index: number) =>
    createPointerTooltipHandlers(
      {
        // DESKTOP: hover/move/leave
        onEnter: ({ x, y }, evt) => {
          showTooltip({
            text: (
              <HouseTooltipContent
                houseLongitude={deg}
                houseIndex={index + 1}
              />
            ),
            x,
            y,
            mobileTitle: 'Дом гороскопа',
          })
          setHoveredHouse(index)
          evt.target.getStage()?.container().style.setProperty('cursor', 'pointer')
        },
        onMove: ({ x, y }) => {
          changeTooltipPosition({ x, y })
        },
        onLeave: (evt) => {
          hideTooltip()
          setHoveredHouse(null)
          evt.target.getStage()?.container().style.setProperty('cursor', 'default')
        },

        // MOBILE: нижний fixed-tooltip; координаты игнорятся стилями
        onOpen: () => {
          showTooltip({
            text: (
              <HouseTooltipContent
                houseLongitude={deg}
                houseIndex={index + 1}
              />
            ),
            x: 0,
            y: 0,
            mobileTitle: 'Дом гороскопа',
          })
          setHoveredHouse(index)
        },
        onClose: () => {
          hideTooltip()
          setHoveredHouse(null)
        },
      },
      isMobile,
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

      {/* Видимые арки домов */}
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

      {/* Подписи домов */}
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
        stroke="rgba(255, 255, 255, 0.8)"
        strokeWidth={0.5}
        dash={[4, 4]}
      />

      {/* Метки ASC/MC/IC/DSC */}
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
            fill="rgba(255, 255, 255, 0.65)"
            fontStyle="italic"
          />
        )
      })}

      {/* Невидимые арки поверх — ловят pointer-события для тултипов */}
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
          {...makeHouseHandlers(data.deg, i)}
        />
      ))}
    </Fragment>
  )
}
