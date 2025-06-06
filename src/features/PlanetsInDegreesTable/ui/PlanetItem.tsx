import { PlanetData } from '../types'
import { HamburgSymbol } from '@/shared/components/HamburgSymbol'
import { SimpleDataTable } from '@/shared/components/SimpleDataTable'
import { ASTRO_HOUSE_SYMBOL } from '@/shared/configs/astro-houses.config'
import { ASTRO_PLANET_NAME, ASTRO_PLANET_SYMBOL } from '@/shared/configs/astro-planets.config'
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
  const { name, longitude } = planet
  const fullDegrees = longitude
  const signIndex = getSignIndexByLongitude(fullDegrees)
  const { degree, minutes, seconds } = getDegreeInSign(fullDegrees)
  const zodiac = ASTRO_ZODIAC_INDEX[signIndex]
  const color = ASTRO_ZODIAC_COLOR[zodiac]
  const signSymbol = ASTRO_ZODIAC_SYMBOL[zodiac]

  const label = ASTRO_PLANET_NAME[name]
  const symbol = ASTRO_PLANET_SYMBOL[name]

  const house = houseIndex ? ASTRO_HOUSE_SYMBOL[houseIndex] : undefined

  return (
    <SimpleDataTable.RowHovered>
      <SimpleDataTable.Cell>
        <HamburgSymbol>{symbol} &emsp;</HamburgSymbol>
        {label ?? name}
        &emsp;
      </SimpleDataTable.Cell>
      <SimpleDataTable.Cell>
        {formattedDegree(degree)}
        <HamburgSymbol style={{ color: color }}>&ensp;{signSymbol}&ensp;</HamburgSymbol>
        {formattedDegree(minutes)}&rsquo; {formattedDegree(seconds)}&apos;&apos;
      </SimpleDataTable.Cell>
      {house && <SimpleDataTable.Cell style={{ textAlign: 'end' }}>{house} дом</SimpleDataTable.Cell>}
    </SimpleDataTable.RowHovered>
  )
}
