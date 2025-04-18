import { Stage, Layer, Circle } from 'react-konva'

import { AstroChartProvider, useAstroChartContext } from './AstroChartContext'
import { AspectLines } from './layers/AspectLines'
import { DegreeTicks } from './layers/DegreeTicks'
import { HouseLines } from './layers/HouseLines'
import { PlanetMarkers } from './layers/PlanetMarkers'
import { ZodiacRing } from './layers/ZodiacRing'
import { AstroChartCanvasProps } from './types'

function Chart() {
  const { containerRef, CANVAS_SIZE, houseCusps, PLANET_INSIDE_RADIUS, CENTER, PLANET_OUTSIDE_RADIUS } =
    useAstroChartContext()

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      {CANVAS_SIZE === 0 ? undefined : (
        <Stage
          key={CANVAS_SIZE}
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

            {houseCusps && <HouseLines />}

            <ZodiacRing />

            <PlanetMarkers />

            <AspectLines />

            <DegreeTicks />
          </Layer>
        </Stage>
      )}
    </div>
  )
}

export const AstroChartCanvas = (props: AstroChartCanvasProps) => (
  <AstroChartProvider {...props}>
    <Chart />
  </AstroChartProvider>
)
