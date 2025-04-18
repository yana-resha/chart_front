import { textStyle, symbolStyle } from './index.linaria'
import { ZODIAC_COLORS } from '../configs/zodiac.config'
import { ASTRO_ZODIAC_NAME, ASTRO_ZODIAC_SYMBOL } from '@/shared/configs/astro-zodiac.config'
import { getSignKeyByIndex } from '@/shared/helpers/astro.helper'

export function getZodiacTooltipHTML(zodiacIndex: number): string {
  const key = getSignKeyByIndex(zodiacIndex)
  const zodiacName = ASTRO_ZODIAC_NAME[key]
  const zodiacSymbol = ASTRO_ZODIAC_SYMBOL[key]
  const color = ZODIAC_COLORS[key]

  return `
    <div>
      <div class="${textStyle}">
        ${zodiacName} 
        <span class="${symbolStyle}" style="color: ${color};">${zodiacSymbol}</span>  
      </div>
    </div>
  `
}
