import { ZODIAC_COLORS } from '../configs/zodiac.config'
import { titleStyle, symbolStyle } from '../tooltip-contents/index.linaria'
import { PlanetData } from '../types'
import { ASTRO_HOUSE_SYMBOL } from '@/shared/configs/astro-houses.config'
import { ASTRO_PLANET_NAME, ASTRO_PLANET_SYMBOL } from '@/shared/configs/astro-planets.config'
import { ASTRO_ZODIAC_INDEX, ASTRO_ZODIAC_SYMBOL } from '@/shared/configs/astro-zodiac.config'
import { getDegreeInSign, getSignIndexByLongitude } from '@/shared/helpers/astro.helper'

export function getPlanetTooltipHTML(planet: PlanetData, houseIndex?: number): string {
  const fullDegrees = planet.longitude
  const signIndex = getSignIndexByLongitude(fullDegrees)

  const { degree, minutes, seconds } = getDegreeInSign(fullDegrees)
  const zodiac = ASTRO_ZODIAC_INDEX[signIndex]
  const signSymbol = ASTRO_ZODIAC_SYMBOL[zodiac]
  const planetName = ASTRO_PLANET_NAME[planet.name] ?? planet.label
  const color = ZODIAC_COLORS[zodiac]

  const house = houseIndex ? ASTRO_HOUSE_SYMBOL[houseIndex] : undefined
  const planetSymbol = ASTRO_PLANET_SYMBOL[planet.name]

  return `
    <div class="planet-tooltip">
      <div class="${titleStyle}">
        ${planetName} 
        <span class="${symbolStyle}">${planetSymbol}</span>  
      </div>
      <div class="planet-details">
        <div>
          ${degree} 
          <span class="${symbolStyle}" style="color: ${color}">${signSymbol}</span> 
          ${minutes}' ${seconds}'' 
          ${planet.isRetrograde ? '℞' : ''}
          ${house && `— ${house} дом`}
        </div>
      </div>
    </div>
  `
}
