import { getHouseIndexBySmth } from '../astro.helper'
import { PLANET_WEIGHTS } from '@/shared/configs/astro-planets.config'
import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'

export interface IPlanetValue {
  name: ASTRO_PLANET
  longitude: number
}

export function getHousesFullStats(planets: IPlanetValue[], houses: number[]) {
  const countsReal: Record<number, number> = {}
  const countsFiction: Record<number, number> = {}
  const weights: Record<number, number> = {}

  planets.forEach(({ name, longitude }) => {
    const houseIndex = getHouseIndexBySmth(longitude, houses) ?? 1
    const weight = PLANET_WEIGHTS[name] ?? 1

    if (weight > 0) {
      countsReal[houseIndex] = (countsReal[houseIndex] || 0) + 1
      weights[houseIndex] = (weights[houseIndex] || 0) + weight
    } else {
      countsFiction[houseIndex] = (countsFiction[houseIndex] || 0) + 1
    }
  })

  const totalWeight = Object.values(weights).reduce((sum, v) => sum + v, 0)
  const percentages: Record<number, number> = Object.fromEntries(
    Object.entries(weights).map(([house, w]) => [house, totalWeight ? (w / totalWeight) * 100 : 0]),
  ) as Record<number, number>

  const maxWeight = Math.max(...Object.values(weights))
  const dominantHouses = Object.entries(weights)
    .filter(([, w]) => w === maxWeight)
    .map(([house]) => parseInt(house, 10))

  return { countsReal, countsFiction, weights, percentages, dominantHouses }
}
