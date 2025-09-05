import { PlanetData } from '../types'
import { Title } from './index.linaria'
import { HamburgSymbol } from '@/shared/components/HamburgSymbol'
import { ASTRO_HOUSE_SYMBOL } from '@/shared/configs/astro-houses.config'
import {
  ASTRO_ZODIAC_COLOR,
  ASTRO_ZODIAC_INDEX,
  ASTRO_ZODIAC_SYMBOL,
} from '@/shared/configs/astro-zodiac.config'
import { formattedDegree, getDegreeInSign, getSignIndexByLongitude } from '@/shared/helpers/astro.helper'

export function PlanetTooltipContent({ planet, houseIndex }: { planet: PlanetData; houseIndex?: number }) {
  const fullDegrees = planet.longitude
  const signIndex = getSignIndexByLongitude(fullDegrees)

  const { degree, minutes, seconds } = getDegreeInSign(fullDegrees)
  const zodiac = ASTRO_ZODIAC_INDEX[signIndex]
  const signSymbol = ASTRO_ZODIAC_SYMBOL[zodiac]
  const planetName = planet.label
  const color = ASTRO_ZODIAC_COLOR[zodiac]

  const house = houseIndex ? ASTRO_HOUSE_SYMBOL[houseIndex] : undefined
  const planetSymbol = planet.symbol

  return (
    <>
      <Title>
        <HamburgSymbol>{planetSymbol}</HamburgSymbol> {planetName} {planet.isRetrograde ? 'R' : ''}
      </Title>
      <div>
        {formattedDegree(degree)} <HamburgSymbol style={{ color: color }}>{signSymbol}</HamburgSymbol>{' '}
        {formattedDegree(minutes)}&apos; {formattedDegree(seconds)}&apos;&apos;{' '}
        {house ? `— ${house} дом` : ''}
      </div>
    </>
  )
}
