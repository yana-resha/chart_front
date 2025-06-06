import { ASTRO_ZODIAC_INDEX, ASTRO_ZODIAC_RULER_PLANET } from '@/shared/configs/astro-zodiac.config'
import { getSignIndexByLongitude, getHouseIndexBySmth } from '@/shared/helpers/astro.helper'
import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'
import { ASTRO_ZODIAC } from '@/shared/types/astro/astro-zodiac.types'

export interface PlanetData {
  name: ASTRO_PLANET
  longitude: number // 0–360°
}

export function getHouseRulerAndItsHouse(
  houseLongitude: number,
  planets: PlanetData[],
  houses: number[],
): { ruler: ASTRO_PLANET; houseOfRuler: number } {
  // Находим знак на куспиде дома
  const signIndex = getSignIndexByLongitude(houseLongitude)
  const sign = ASTRO_ZODIAC_INDEX[signIndex] as ASTRO_ZODIAC

  // Определяем планету-управителя
  const ruler = ASTRO_ZODIAC_RULER_PLANET[sign]

  // Находим где находится управитель (номер дома)
  const planet = planets.find((p) => p.name === ruler)
  const houseOfRuler = planet ? (getHouseIndexBySmth(planet.longitude, houses) ?? -1) : -1

  return {
    ruler,
    houseOfRuler,
  }
}
