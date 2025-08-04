import './style.css'
import { AspectData } from '../types'
import { ASTRO_ASPECT_NAME } from '@/shared/configs/astro-aspects.config'

interface Props extends AspectData {
  nameA: string
  nameB: string
  symbolA: string
  symbolB: string
  aspectSymbol: string
  color: string
}

export function getConjuctionTooltipHTML(aspects: Props[]): string {
  return `
    <div class="tooltip">
      ${aspects
        .map((aspect, index) => {
          const {
            aspectType,
            angle,
            orb,
            isExact,
            isVeryExact,
            nameA,
            nameB,
            symbolA,
            symbolB,
            strength,
            aspectSymbol,
            color,
          } = aspect

          const name = ASTRO_ASPECT_NAME[aspectType]

          return `
            ${index > 0 ? `<hr class="tooltip-divider" />` : ''}
            <div class="title mb-1">
              <span class="astro-symbol" style="color: ${color};">${aspectSymbol}</span> ${name} ${angle}°
            </div>
            <div>
              <div class="text"><span class="astro-symbol">${symbolA}</span> ${nameA} — <span class="astro-symbol">${symbolB}</span> ${nameB}</div>
              <div class="text mb-1">Орбис: ${orb}°</div>
              <div class="text">Сила аспекта: ${strength}%</div>
              ${
                isVeryExact
                  ? `<div class="text">Очень точный аспект (орб ≤ 0.5° или сила ≥ 95%)</div>`
                  : isExact
                    ? `<div class="text">Точный аспект (орб < 1°)</div>`
                    : ``
              }
            </div>
          `
        })
        .join('')}
    </div>
  `
}
