import './style.css'
import { ASTRO_HOUSE_SYMBOL } from '@/shared/configs/astro-houses.config'
import {
  ASTRO_ZODIAC_COLOR,
  ASTRO_ZODIAC_INDEX,
  ASTRO_ZODIAC_SYMBOL,
} from '@/shared/configs/astro-zodiac.config'
import { formattedDegree, getDegreeInSign, getSignIndexByLongitude } from '@/shared/helpers/astro.helper'

export function getHouseTooltipHTML(houseLongitude: number, houseIndex: number): string {
  const fullDegrees = houseLongitude
  const signIndex = getSignIndexByLongitude(fullDegrees)

  const { degree, minutes, seconds } = getDegreeInSign(fullDegrees)
  const zodiac = ASTRO_ZODIAC_INDEX[signIndex]
  const signSymbol = ASTRO_ZODIAC_SYMBOL[zodiac]
  const color = ASTRO_ZODIAC_COLOR[zodiac]

  const house = houseIndex ? ASTRO_HOUSE_SYMBOL[houseIndex] : undefined

  return `
    <div class="tooltip">
      <div class="title mb-1">
        ${house} дом
      </div>
      <div>
        <div class="text">
          ${formattedDegree(degree)} 
          <span class="astro-symbol" style="color: ${color}">${signSymbol}</span> 
          ${formattedDegree(minutes)}' ${formattedDegree(seconds)}''
        </div>
      </div>
    </div>
  `
}
