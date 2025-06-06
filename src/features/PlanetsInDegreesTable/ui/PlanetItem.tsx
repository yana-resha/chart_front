import { astroStyle } from '../index.linaria'
import { PlanetData } from '../types'
import { SimpleDataTable } from '@/shared/components/SimpleDataTable'
import { ASTRO_HOUSE_SYMBOL } from '@/shared/configs/astro-houses.config'
import {
  ASTRO_ZODIAC_COLOR,
  ASTRO_ZODIAC_INDEX,
  ASTRO_ZODIAC_SYMBOL,
} from '@/shared/configs/astro-zodiac.config'
import { formattedDegree, getDegreeInSign, getSignIndexByLongitude } from '@/shared/helpers/astro.helper'

interface Props {
  planet: PlanetData
  houseIndex?: number
}

export const PlanetItem = ({ planet, houseIndex = undefined }: Props) => {
  const { name, label, longitude, symbol } = planet
  const fullDegrees = longitude
  const signIndex = getSignIndexByLongitude(fullDegrees)
  const { degree, minutes, seconds } = getDegreeInSign(fullDegrees)
  const zodiac = ASTRO_ZODIAC_INDEX[signIndex]
  const color = ASTRO_ZODIAC_COLOR[zodiac]
  const signSymbol = ASTRO_ZODIAC_SYMBOL[zodiac]

  const house = houseIndex ? ASTRO_HOUSE_SYMBOL[houseIndex] : undefined

  return (
    <SimpleDataTable.RowHovered>
      <SimpleDataTable.Cell>
        <span className={astroStyle}>{symbol} &emsp;</span>
        {label ?? name}
        &emsp;
      </SimpleDataTable.Cell>
      <SimpleDataTable.Cell>
        {formattedDegree(degree)}
        <span
          className={astroStyle}
          style={{ color: color }}
        >
          &ensp;{signSymbol}&ensp;
        </span>
        {formattedDegree(minutes)}&rsquo; {formattedDegree(seconds)}&apos;&apos;
      </SimpleDataTable.Cell>
      {house && <SimpleDataTable.Cell style={{ textAlign: 'end' }}>{house} дом</SimpleDataTable.Cell>}
    </SimpleDataTable.RowHovered>
  )
}
