import { PlanetData } from '../types'
import { HamburgSymbol } from '@/shared/components/HamburgSymbol'
import { SimpleDataTable } from '@/shared/components/SimpleDataTable'
import { Tooltip } from '@/shared/components/Tooltip'
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
  const { name, longitude, isRetrograde } = planet
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
        {label ?? name}{' '}
        {isRetrograde && (
          <Tooltip
            placement="top"
            tooltipContent={'Ретроградная планета'}
            style={{
              display: 'inline', // строчный элемент
            }}
          >
            <span style={{ color: '#D46A6A', fontWeight: 500 }}>R</span>
          </Tooltip>
        )}
      </SimpleDataTable.Cell>
      <SimpleDataTable.Cell style={{ whiteSpace: 'nowrap' }}>
        {formattedDegree(degree)}
        <HamburgSymbol style={{ color: color }}>&ensp;{signSymbol}&ensp;</HamburgSymbol>
        {formattedDegree(minutes)}&rsquo; {formattedDegree(seconds)}&apos;&apos;
      </SimpleDataTable.Cell>
      {house && <SimpleDataTable.Cell>{house} дом</SimpleDataTable.Cell>}
    </SimpleDataTable.RowHovered>
  )
}
