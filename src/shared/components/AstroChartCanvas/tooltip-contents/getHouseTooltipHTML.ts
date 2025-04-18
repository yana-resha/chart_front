import { titleStyle, symbolStyle } from './index.linaria'
import { ZODIAC_COLORS } from '../configs/zodiac.config'
import { ASTRO_HOUSE_SYMBOL } from '@/shared/configs/astro-houses.config'
import { ASTRO_ZODIAC_INDEX, ASTRO_ZODIAC_SYMBOL } from '@/shared/configs/astro-zodiac.config'
import { getDegreeInSign, getSignIndexByLongitude } from '@/shared/helpers/astro.helper'

export function getHouseTooltipHTML(houseLongitude: number, houseIndex: number): string {
  const fullDegrees = houseLongitude
  const signIndex = getSignIndexByLongitude(fullDegrees)

  const { degree, minutes, seconds } = getDegreeInSign(fullDegrees)
  const zodiac = ASTRO_ZODIAC_INDEX[signIndex]
  const signSymbol = ASTRO_ZODIAC_SYMBOL[zodiac]
  const color = ZODIAC_COLORS[zodiac]

  const house = houseIndex ? ASTRO_HOUSE_SYMBOL[houseIndex] : undefined

  return `
    <div class="planet-tooltip">
      <div class="${titleStyle}">
        ${house} дом
      </div>
      <div class="planet-details">
        <div>
          ${degree} 
          <span class="${symbolStyle}" style="color: ${color}">${signSymbol}</span> 
          ${minutes}' ${seconds}''
        </div>
      </div>
    </div>
  `
}
