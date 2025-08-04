import { useEffect, useRef, useState } from 'react'

import Konva from 'konva'
import { Stage, Layer, Circle, Group } from 'react-konva'

import { AstroCanvasProvider, useAstroCanvasContext } from './AstroChartContext'
import { AspectLines } from './layers/AspectLines'
import { DegreeTicks } from './layers/DegreeTicks'
import { HouseLines } from './layers/HouseLines'
import { PlanetMarkers } from './layers/PlanetMarkers'
import { ZodiacRing } from './layers/ZodiacRing'
import { AstroSingleCanvasProps } from './types'
import { ConjuctionArcLines } from './layers/ConjuctionArcLines'

function Chart() {
  const {
    containerRef,
    CANVAS_SIZE,
    houseCusps,
    PLANET_INSIDE_RADIUS,
    CENTER,
    PLANET_OUTSIDE_RADIUS,
    ASPECT_INSIDE_RADIUS,
    GENERAL_FIRST_RENDER_ANIMATION,
  } = useAstroCanvasContext()

  const zodiacGroupRef = useRef<Konva.Group | null>(null)
  const houseGroupRef = useRef<Konva.Group | null>(null)
  const aspectGroupRef = useRef<Konva.Group | null>(null)
  const [isFirstRender, setIsFirstRender] = useState(true)

  /* первичная анимация зодиакального круга и куспидов домов */
  useEffect(() => {
    let attempts = 0
    const maxAttempts = 10

    const interval = setInterval(() => {
      const zodiacNode = zodiacGroupRef.current
      const houseNode = houseGroupRef.current
      const aspectNode = aspectGroupRef.current

      if (zodiacNode) {
        clearInterval(interval)
        zodiacNode.rotation(40)
        new Konva.Tween({
          node: zodiacNode,
          rotation: 0,
          duration: houseNode ? GENERAL_FIRST_RENDER_ANIMATION * 0.6 : GENERAL_FIRST_RENDER_ANIMATION,
          easing: houseNode ? Konva.Easings.EaseInOut : Konva.Easings.BackEaseInOut,
        }).play()

        if (houseNode) {
          houseNode.rotation(-60)
          // // 2. Анимация вращения к 0
          new Konva.Tween({
            node: houseNode,
            rotation: 0,
            duration: GENERAL_FIRST_RENDER_ANIMATION,
            easing: Konva.Easings.BackEaseOut,
          }).play()
        }

        if (aspectNode) {
          aspectNode.opacity(0)
          new Konva.Tween({
            node: aspectNode,
            opacity: 1,
            duration: GENERAL_FIRST_RENDER_ANIMATION * 5,
            easing: Konva.Easings.BackEaseOut,
            onFinish: () => {
              aspectNode.opacity(1)
              setIsFirstRender(false)
            },
          }).play()
        }
      }
      attempts += 1
      if (attempts > maxAttempts) {
        clearInterval(interval)
        console.warn('Konva Group refs not ready after waiting')
      }
    }, 100)

    return () => clearInterval(interval)
  }, [GENERAL_FIRST_RENDER_ANIMATION])

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', minWidth: 0, height: '100%', position: 'relative', contain: 'layout paint' }}
    >
      {CANVAS_SIZE === 0 ? undefined : (
        <Stage
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
        >
          <Layer>
            <Circle
              x={CENTER}
              y={CENTER}
              radius={PLANET_INSIDE_RADIUS}
              stroke="white"
              strokeWidth={1}
            />
            <Circle
              x={CENTER}
              y={CENTER}
              radius={PLANET_OUTSIDE_RADIUS}
              stroke="white"
              strokeWidth={1}
            />

            <Circle
              x={CENTER}
              y={CENTER}
              radius={ASPECT_INSIDE_RADIUS}
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth={1}
            />

            {/* HouseLines – вращение против часовой */}
            {houseCusps && (
              <Group
                ref={houseGroupRef}
                x={CENTER}
                y={CENTER}
              >
                <Group
                  offsetX={CENTER}
                  offsetY={CENTER}
                >
                  <HouseLines />
                </Group>
              </Group>
            )}

            {/* ZodiacRing – вращение по часовой */}
            <Group
              ref={zodiacGroupRef}
              x={CENTER}
              y={CENTER}
            >
              <Group
                offsetX={CENTER}
                offsetY={CENTER}
              >
                <ZodiacRing />
              </Group>
            </Group>

            <PlanetMarkers />
            <Group
              ref={aspectGroupRef}
              x={CENTER}
              y={CENTER}
              opacity={isFirstRender ? 0 : 1}
            >
              <Group
                offsetX={CENTER}
                offsetY={CENTER}
              >
                <AspectLines />
                <ConjuctionArcLines />
              </Group>
            </Group>
            <DegreeTicks />
          </Layer>
        </Stage>
      )}
    </div>
  )
}

export const AstroSingleCanvas = (props: AstroSingleCanvasProps) => (
  <AstroCanvasProvider {...props}>
    <Chart />
  </AstroCanvasProvider>
)
