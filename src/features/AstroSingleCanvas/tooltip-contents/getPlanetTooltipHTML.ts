import './style.css'
import { PlanetData } from '../types'
import { ASTRO_HOUSE_SYMBOL } from '@/shared/configs/astro-houses.config'
import {
  ASTRO_ZODIAC_COLOR,
  ASTRO_ZODIAC_INDEX,
  ASTRO_ZODIAC_SYMBOL,
} from '@/shared/configs/astro-zodiac.config'
import { formattedDegree, getDegreeInSign, getSignIndexByLongitude } from '@/shared/helpers/astro.helper'

export function getPlanetTooltipHTML(planet: PlanetData, houseIndex?: number): string {
  const fullDegrees = planet.longitude
  const signIndex = getSignIndexByLongitude(fullDegrees)

  const { degree, minutes, seconds } = getDegreeInSign(fullDegrees)
  const zodiac = ASTRO_ZODIAC_INDEX[signIndex]
  const signSymbol = ASTRO_ZODIAC_SYMBOL[zodiac]
  const planetName = planet.label
  const color = ASTRO_ZODIAC_COLOR[zodiac]

  const house = houseIndex ? ASTRO_HOUSE_SYMBOL[houseIndex] : undefined
  const planetSymbol = planet.symbol

  return `
    <div class="tooltip">
      <div class="title mb-1">
        <span class="astro-symbol">${planetSymbol}</span>  
        ${planetName} ${planet.isRetrograde ? 'R' : ''}
      </div>
      <div>
        <div class="text">
          ${formattedDegree(degree)} 
          <span class="astro-symbol" style="color: ${color}">${signSymbol}</span> 
          ${formattedDegree(minutes)}' ${formattedDegree(seconds)}'' 
          
          ${house && `— ${house} дом`}
        </div>
      </div>
    </div>
  `
}
