import { astroStyle, Item } from '../index.linaria'
import { PlanetData } from '../types'
import {
  ASTRO_ZODIAC_COLOR,
  ASTRO_ZODIAC_INDEX,
  ASTRO_ZODIAC_SYMBOL,
} from '@/shared/configs/astro-zodiac.config'
import { formattedDegree, getDegreeInSign, getSignIndexByLongitude } from '@/shared/helpers/astro.helper'

export const PlanetItem = ({ name, label, longitude, symbol }: PlanetData) => {
  const fullDegrees = longitude
  const signIndex = getSignIndexByLongitude(fullDegrees)
  const { degree, minutes, seconds } = getDegreeInSign(fullDegrees)
  const zodiac = ASTRO_ZODIAC_INDEX[signIndex]
  const signSymbol = ASTRO_ZODIAC_SYMBOL[zodiac]
  const color = ASTRO_ZODIAC_COLOR[zodiac]

  return (
    <Item>
      <div>
        <span className={astroStyle}>{symbol} &emsp;</span>
        {label ?? name}
        &emsp;
      </div>
      <div>
        {formattedDegree(degree)}
        <span
          className={astroStyle}
          style={{ color: color }}
        >
          &ensp;{signSymbol}&ensp;
        </span>
        {formattedDegree(minutes)}&rsquo; {formattedDegree(seconds)}&apos;&apos;
      </div>
    </Item>
  )
}
