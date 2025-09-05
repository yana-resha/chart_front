import { Title } from './index.linaria'
import { HamburgSymbol } from '@/shared/components/HamburgSymbol'
import { ASTRO_HOUSE_SYMBOL } from '@/shared/configs/astro-houses.config'
import {
  ASTRO_ZODIAC_COLOR,
  ASTRO_ZODIAC_INDEX,
  ASTRO_ZODIAC_SYMBOL,
} from '@/shared/configs/astro-zodiac.config'
import { formattedDegree, getDegreeInSign, getSignIndexByLongitude } from '@/shared/helpers/astro.helper'

export function HouseTooltipContent({
  houseLongitude,
  houseIndex,
}: {
  houseLongitude: number
  houseIndex: number
}) {
  const fullDegrees = houseLongitude
  const signIndex = getSignIndexByLongitude(fullDegrees)

  const { degree, minutes, seconds } = getDegreeInSign(fullDegrees)
  const zodiac = ASTRO_ZODIAC_INDEX[signIndex]
  const signSymbol = ASTRO_ZODIAC_SYMBOL[zodiac]
  const color = ASTRO_ZODIAC_COLOR[zodiac]

  const house = houseIndex ? ASTRO_HOUSE_SYMBOL[houseIndex] : undefined

  return (
    <>
      <Title>{house} дом</Title>
      <div>
        {formattedDegree(degree)} <HamburgSymbol style={{ color: color }}>{signSymbol}</HamburgSymbol>{' '}
        {formattedDegree(minutes)}&apos; {formattedDegree(seconds)}&apos;&apos;
      </div>
    </>
  )
}
