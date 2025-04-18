import { useState } from 'react'
import { useRef } from 'react'

import Konva from 'konva'
import { Stage, Layer, Circle, Line, Text, Group, Rect, Arc } from 'react-konva'

const CANVAS_SIZE = 600
const CENTER = CANVAS_SIZE / 2
const RADIUS = 200
const ARC_THICKNESS = 40 // было 20 — увеличим // ширина кольца Arc
const ZODIAC_LABEL_RADIUS = RADIUS + ARC_THICKNESS - 20
const ZODIAC_SIGNS = [
  '\u2648',
  '\u2649',
  '\u264A',
  '\u264B',
  '\u264C',
  '\u264D',
  '\u264E',
  '\u264F',
  '\u2650',
  '\u2651',
  '\u2652',
  '\u2653',
]

function polarToCartesian(angleDeg: number, radius: number) {
  const angleRad = (angleDeg - 90) * (Math.PI / 180)

  return {
    x: CENTER + radius * Math.cos(angleRad),
    y: CENTER + radius * Math.sin(angleRad),
  }
}

interface PlanetData {
  name: string
  longitude: number // в градусах 0–360
  label?: string // название для вывода
  symbol: string
}

interface AspectData {
  planetA: string
  planetB: string
  aspectType: string // например, "Conjunction", "Trine"
  orb: number
  isExact: boolean
  isVeryExact: boolean
}

interface AstroChartCanvasProps {
  houseCusps: number[]
  planets: PlanetData[]
  aspects: AspectData[]
}

export default function AstroChartCanvas({ houseCusps, planets, aspects }: AstroChartCanvasProps) {
  const aspectRefs = useRef<(Konva.Line | null)[]>([])
  const [hoveredAspect, setHoveredAspect] = useState<{
    x: number
    y: number
    text: string
  } | null>(null)

  const aspectColors: Record<string, string> = {
    Conjunction: '#444',
    Trine: 'green',
    Sextile: 'blue',
    Square: 'red',
    Opposition: 'orange',
  }

  return (
    <Stage
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
    >
      <Layer>
        {/* Внешний круг */}
        <Circle
          x={CENTER}
          y={CENTER}
          radius={RADIUS}
          stroke="white"
          strokeWidth={2}
        />
        {/* Сектора зодиака */}
        {Array.from({ length: 12 }).map((_, i) => {
          const start = polarToCartesian(i * 30, RADIUS)

          return (
            <Line
              key={`zodiac-${i}`}
              points={[CENTER, CENTER, start.x, start.y]}
              stroke="transparent"
              strokeWidth={1}
            />
          )
        })}

        {/* Дуги зодиака */}
        {ZODIAC_SIGNS.map((sign, i) => {
          const startAngle = i * 30

          return (
            <Arc
              key={`arc-${i}`}
              x={CENTER}
              y={CENTER}
              innerRadius={RADIUS}
              outerRadius={RADIUS + ARC_THICKNESS}
              angle={30}
              rotation={startAngle}
              fill="#e53935"
              stroke="#ff8a80"
              strokeWidth={0.8}
            />
          )
        })}

        {/* Знаки зодиака */}
        {ZODIAC_SIGNS.map((sign, i) => {
          const startAngle = i * 30
          const middleAngle = startAngle + 15
          const { x, y } = polarToCartesian(middleAngle, ZODIAC_LABEL_RADIUS)

          return (
            <Text
              key={`zodiac-${i}`}
              text={sign}
              x={x - 8}
              y={y - 8}
              fontSize={18}
              fill="white"
              fontStyle="bold"
            />
          )
        })}
        {/* Линии домов */}
        {houseCusps.map((deg, i) => {
          const start = polarToCartesian(deg, RADIUS)

          return (
            <Line
              key={`house-${i}`}
              points={[CENTER, CENTER, start.x, start.y]}
              stroke="blue"
              strokeWidth={1.5}
              dash={[4, 4]}
            />
          )
        })}
        {/* Номера домов */}
        {houseCusps.map((deg, i) => {
          const pos = polarToCartesian(deg + 5, RADIUS - 40)

          return (
            <Text
              key={`house-label-${i + 1}`}
              text={(i + 1).toString()}
              x={pos.x - 5}
              y={pos.y - 8}
              fontSize={14}
              fill="blue"
            />
          )
        })}
        {/* Планеты */}
        {planets.map((planet) => {
          const pos = polarToCartesian(planet.longitude, RADIUS - 20)

          return (
            <Group key={`planet-${planet.name}`}>
              <Circle
                x={pos.x}
                y={pos.y}
                radius={6}
                fill="red"
              />
              <Text
                text={planet.symbol}
                x={pos.x - 6}
                y={pos.y - 6}
                fontSize={14}
                fill="white"
              />
            </Group>
          )
        })}
        {/* Аспекты */}
        {aspects.map((aspect, i) => {
          const planetA = planets.find((el) => el.name === aspect.planetA)
          const planetB = planets.find((el) => el.name === aspect.planetB)
          if (!planetA || !planetB) return null

          const posA = polarToCartesian(planetA.longitude, RADIUS - 20)
          const posB = polarToCartesian(planetB.longitude, RADIUS - 20)

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
              hitStrokeWidth={15}
              shadowColor={color}
              shadowBlur={0}
              shadowOpacity={0}
              onMouseEnter={() => {
                const midX = (posA.x + posB.x) / 2
                const midY = (posA.y + posB.y) / 2
                setHoveredAspect({
                  x: midX,
                  y: midY,
                  text: `${planetA.label} ${aspect.aspectType} ${planetB.label} (${aspect.orb}°)`,
                })

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
                setHoveredAspect(null)

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
        {/* Градусные деления по кругу */}
        {Array.from({ length: 360 }).map((_, i) => {
          const isMajor = i % 10 === 0
          const tickStart = polarToCartesian(i, RADIUS)
          const tickEnd = polarToCartesian(i, RADIUS - (isMajor ? 8 : 4))

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
        {/* Всплывающая подсказка */}
        {hoveredAspect && (
          <Group
            x={hoveredAspect.x}
            y={hoveredAspect.y}
          >
            <Rect
              width={hoveredAspect.text.length * 7.2}
              height={24}
              offsetX={(hoveredAspect.text.length * 7.2) / 2}
              offsetY={26}
              fill="white"
              stroke="gray"
              cornerRadius={4}
              shadowBlur={4}
            />
            <Text
              text={hoveredAspect.text}
              fontSize={14}
              offsetX={(hoveredAspect.text.length * 7.2) / 2}
              offsetY={26 - 5}
              fill="black"
            />
          </Group>
        )}
        {/* Легенда аспектов */}
        <Group
          x={0}
          y={CANVAS_SIZE - 110}
        >
          <Text
            text="Аспекты:"
            fontSize={14}
            fill="white"
          />
          {Object.entries(aspectColors).map(([aspect, color], idx) => (
            <Group
              key={aspect}
              y={idx * 18 + 20}
            >
              <Line
                points={[0, 8, 20, 8]}
                stroke={color}
                strokeWidth={2}
              />
              <Text
                x={25}
                y={0}
                text={aspect}
                fontSize={12}
                fill="white"
              />
            </Group>
          ))}
        </Group>
      </Layer>
    </Stage>
  )
}
