import React from 'react'

import { Item, Title, Meta, Coord } from './index.linaria'
import { formatCoord } from '@/entities/locality/helpers/search-input-mappers.helpers'

type Props = {
  title: string
  lat?: number | string | null
  lon?: number | string | null
  digits?: number
}

export const LocalityOption: React.FC<Props> = ({ title, lat, lon, digits = 6 }) => {
  const latStr = formatCoord(lat, digits)
  const lonStr = formatCoord(lon, digits)
  const showCoords = latStr !== '' && lonStr !== ''

  return (
    <Item>
      <Title>{title}</Title>
      {showCoords && (
        <Meta>
          {showCoords && (
            <Coord>
              широта: {latStr}, долгота: {lonStr}
            </Coord>
          )}
        </Meta>
      )}
    </Item>
  )
}
