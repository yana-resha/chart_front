import './style.css'
import { AspectData } from '../types'
import { ASTRO_ASPECT_NAME } from '@/shared/configs/astro-aspects.config'

interface Props extends AspectData {
  nameA: string
  nameB: string
  symbolA: string
  symbolB: string
}

export function getAspectTooltipHTML(aspect: Props): string {
  const { aspectType, angle, orb, isExact, isVeryExact, nameA, nameB, symbolA, symbolB, strength } = aspect
  const name = ASTRO_ASPECT_NAME[aspectType]

  return `
    <div class="tooltip">
      <div class="title mb-1">
        ${name} ${angle}°
      </div>
      <div>
        <div class="text">${nameA} <span class="astro-symbol">${symbolA}</span> — ${nameB} <span class="astro-symbol">${symbolB}</span></div>
        <div class="text mb-1">
          Орбис: ${orb}°
        </div>
        <div class="text"> 
          Сила аспекта: ${strength}%
        </div>
        ${isVeryExact ? `<div class="text">Очень точный аспект (орб <= 0.5 || сила >= 95) </div>` : ``}
        ${!isVeryExact && isExact ? `<div class="text">Точный аспект (орб < 1)</div>` : ``}
      </div>
    </div>
  `
}
