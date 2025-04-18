import { Fragment } from 'react/jsx-runtime'
import { Arrow, Group, Line, Text } from 'react-konva'

import { getVisualAngleFromAsc, polarToCartesian } from '../utils/astro-helpers'

interface Props {
  ascendant: number
  mc: number
  center: number
  radius: number
}

export const AxisLines = ({ ascendant, mc, center, radius }: Props) => {
  const ascAngle = getVisualAngleFromAsc(ascendant, ascendant)
  const descAngle = getVisualAngleFromAsc((ascendant + 180) % 360, ascendant)
  const mcAngle = getVisualAngleFromAsc(mc, ascendant)
  const icAngle = getVisualAngleFromAsc((mc + 180) % 360, ascendant)

  const ascCoords = polarToCartesian(ascAngle, radius, center)
  const descCoords = polarToCartesian(descAngle, radius, center)
  const mcCoords = polarToCartesian(mcAngle, radius, center)
  const icCoords = polarToCartesian(icAngle, radius, center)

  return (
    <Fragment>
      <Group>
        {/* ASC */}
        <Arrow
          points={[center, center, ascCoords.x, ascCoords.y]}
          stroke="white"
          fill="white"
          strokeWidth={2}
        />
        <Text
          x={ascCoords.x - 10}
          y={ascCoords.y - 10}
          text="ASC"
          fontSize={14}
          fill="white"
          fontStyle="bold"
        />

        {/* DESC */}
        <Line
          points={[center, center, descCoords.x, descCoords.y]}
          stroke="white"
          strokeWidth={2}
        />
        <Text
          x={descCoords.x - 12}
          y={descCoords.y - 10}
          text="Desc"
          fontSize={14}
          fill="white"
          fontStyle="bold"
        />

        {/* MC */}
        <Arrow
          points={[center, center, mcCoords.x, mcCoords.y]}
          stroke="white"
          fill="white"
          strokeWidth={2}
        />
        <Text
          x={mcCoords.x - 10}
          y={mcCoords.y - 10}
          text="MC"
          fontSize={14}
          fill="white"
          fontStyle="bold"
        />

        {/* IC */}
        <Line
          points={[center, center, icCoords.x, icCoords.y]}
          stroke="white"
          strokeWidth={2}
        />
        <Text
          x={icCoords.x - 10}
          y={icCoords.y - 10}
          text="IC"
          fontSize={14}
          fill="white"
          fontStyle="bold"
        />
      </Group>
    </Fragment>
  )
}
