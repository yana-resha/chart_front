import { getSignIndexByLongitude } from '../astro.helper'
import { PLANET_WEIGHTS } from '@/shared/configs/astro-planets.config'
import { ASTRO_ZODIAC_INDEX, ASTRO_ZODIAC_SIGN_IN_ELEMENT } from '@/shared/configs/astro-zodiac.config'
import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'
import { ASTRO_ZODIAC_ELEMENT, ASTRO_ZODIAC } from '@/shared/types/astro/astro-zodiac.types'

interface IPlanetValue {
  name: ASTRO_PLANET
  longitude: number
}

interface IPlanetsElementStats {
  counts: Record<ASTRO_ZODIAC_ELEMENT, number>
  total: number
  percentages: Record<ASTRO_ZODIAC_ELEMENT, number>
  dominant: ASTRO_ZODIAC_ELEMENT[]
}

export function getPlanetsElementStats(planets: IPlanetValue[]): IPlanetsElementStats {
  const counts: Record<ASTRO_ZODIAC_ELEMENT, number> = {
    [ASTRO_ZODIAC_ELEMENT.FIRE]: 0,
    [ASTRO_ZODIAC_ELEMENT.EARTH]: 0,
    [ASTRO_ZODIAC_ELEMENT.AIR]: 0,
    [ASTRO_ZODIAC_ELEMENT.WATER]: 0,
  }

  planets.forEach(({ name, longitude }) => {
    const signIndex = getSignIndexByLongitude(longitude)
    const sign = ASTRO_ZODIAC_INDEX[signIndex] as ASTRO_ZODIAC
    const element = ASTRO_ZODIAC_SIGN_IN_ELEMENT[sign]
    const weight = PLANET_WEIGHTS[name] ?? 1
    counts[element] += weight
  })

  const total = Object.values(counts).reduce((sum, v) => sum + v, 0)
  const percentages: Record<ASTRO_ZODIAC_ELEMENT, number> = {
    [ASTRO_ZODIAC_ELEMENT.FIRE]: total ? (counts[ASTRO_ZODIAC_ELEMENT.FIRE] / total) * 100 : 0,
    [ASTRO_ZODIAC_ELEMENT.EARTH]: total ? (counts[ASTRO_ZODIAC_ELEMENT.EARTH] / total) * 100 : 0,
    [ASTRO_ZODIAC_ELEMENT.AIR]: total ? (counts[ASTRO_ZODIAC_ELEMENT.AIR] / total) * 100 : 0,
    [ASTRO_ZODIAC_ELEMENT.WATER]: total ? (counts[ASTRO_ZODIAC_ELEMENT.WATER] / total) * 100 : 0,
  }

  const maxValue = Math.max(...Object.values(counts))
  const dominant = Object.entries(counts)
    .filter(([, v]) => v === maxValue)
    .map(([k]) => k as ASTRO_ZODIAC_ELEMENT)

  return { counts, total, percentages, dominant }
}

export const getSortedElementsByPercentage = (elementStats: IPlanetsElementStats) =>
  (Object.keys(elementStats.percentages) as ASTRO_ZODIAC_ELEMENT[]).sort(
    (a, b) => elementStats.percentages[b] - elementStats.percentages[a],
  )
