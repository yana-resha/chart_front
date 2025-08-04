import './style.css'
import {
  ASTRO_ZODIAC_COLOR,
  ASTRO_ZODIAC_ELEMENT_NAME,
  ASTRO_ZODIAC_MODALITY_NAME,
  ASTRO_ZODIAC_NAME,
  ASTRO_ZODIAC_SIGN_IN_ELEMENT,
  ASTRO_ZODIAC_SIGN_IN_MODALITY,
  ASTRO_ZODIAC_SYMBOL,
} from '@/shared/configs/astro-zodiac.config'
import { getSignKeyByIndex } from '@/shared/helpers/astro.helper'

export function getZodiacTooltipHTML(zodiacIndex: number): string {
  const key = getSignKeyByIndex(zodiacIndex)
  const zodiacName = ASTRO_ZODIAC_NAME[key]
  const zodiacSymbol = ASTRO_ZODIAC_SYMBOL[key]
  const color = ASTRO_ZODIAC_COLOR[key]

  const zodiacElement = ASTRO_ZODIAC_ELEMENT_NAME[ASTRO_ZODIAC_SIGN_IN_ELEMENT[key]]
  const zodiacModality = ASTRO_ZODIAC_MODALITY_NAME[ASTRO_ZODIAC_SIGN_IN_MODALITY[key]]

  return `
    <div class="tooltip">
      <div class="title mb-1">
        <span class="astro-symbol" style="color: ${color};">${zodiacSymbol}</span>  
        ${zodiacName} 
      </div>
      <div class="text">
        <div class="text">Стихия: ${zodiacElement}</div>
        <div class="text">Крест качеств: ${zodiacModality}</div>
      </div>
    </div>
  `
}
