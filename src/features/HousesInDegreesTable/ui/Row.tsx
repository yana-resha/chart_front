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
import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'

interface Props {
  longitude: number
  houseIndex: number
  houseOfRuler: number
  ruler: ASTRO_PLANET
}

export const Row = ({ longitude, houseIndex, houseOfRuler, ruler }: Props) => {
  const fullDegrees = longitude
  const signIndex = getSignIndexByLongitude(fullDegrees)
  const { degree, minutes, seconds } = getDegreeInSign(fullDegrees)
  const zodiac = ASTRO_ZODIAC_INDEX[signIndex]
  const signSymbol = ASTRO_ZODIAC_SYMBOL[zodiac]
  const color = ASTRO_ZODIAC_COLOR[zodiac]

  const house = ASTRO_HOUSE_SYMBOL[houseIndex]
  const rulerName = ASTRO_PLANET_NAME[ruler]
  const rulerSybmol = ASTRO_PLANET_SYMBOL[ruler]
  const houseOfRulerName = houseOfRuler > 0 ? ASTRO_HOUSE_SYMBOL[houseOfRuler] : '—'

  // highlight если управитель находится в том же доме
  const isHighlighted = houseOfRuler === houseIndex

  return (
    <SimpleDataTable.RowHovered>
      <SimpleDataTable.Cell>{house} дом</SimpleDataTable.Cell>
      <SimpleDataTable.Cell>
        {formattedDegree(degree)}
        <HamburgSymbol style={{ color: color }}>&ensp;{signSymbol}&ensp;</HamburgSymbol>
        {formattedDegree(minutes)}&rsquo; {formattedDegree(seconds)}&apos;&apos;
      </SimpleDataTable.Cell>
      <SimpleDataTable.Cell className={isHighlighted ? 'highlight' : ''}>
        <HamburgSymbol>{rulerSybmol} &emsp;</HamburgSymbol> {rulerName} в {houseOfRulerName} доме
      </SimpleDataTable.Cell>
    </SimpleDataTable.RowHovered>
  )
}
