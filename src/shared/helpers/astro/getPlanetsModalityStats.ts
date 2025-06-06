import { getSignIndexByLongitude } from '../astro.helper'
import { PLANET_WEIGHTS } from '@/shared/configs/astro-planets.config'
import { ASTRO_ZODIAC_INDEX, ASTRO_ZODIAC_SIGN_IN_MODALITY } from '@/shared/configs/astro-zodiac.config'
import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'
import { ASTRO_ZODIAC_MODALITY, ASTRO_ZODIAC } from '@/shared/types/astro/astro-zodiac.types'

interface IPlanetValue {
  name: ASTRO_PLANET
  longitude: number
}

export function getPlanetsModalityStats(planets: IPlanetValue[]) {
  const counts: Record<ASTRO_ZODIAC_MODALITY, number> = {
    [ASTRO_ZODIAC_MODALITY.CARDINAL]: 0,
    [ASTRO_ZODIAC_MODALITY.FIXED]: 0,
    [ASTRO_ZODIAC_MODALITY.MUTABLE]: 0,
  }

  planets.forEach(({ name, longitude }) => {
    const signIndex = getSignIndexByLongitude(longitude)
    const sign = ASTRO_ZODIAC_INDEX[signIndex] as ASTRO_ZODIAC
    const modality = ASTRO_ZODIAC_SIGN_IN_MODALITY[sign]
    const weight = PLANET_WEIGHTS[name] ?? 1
    counts[modality] += weight
  })

  const total = Object.values(counts).reduce((sum, v) => sum + v, 0)
  const percentages: Record<ASTRO_ZODIAC_MODALITY, number> = {
    [ASTRO_ZODIAC_MODALITY.CARDINAL]: total ? (counts[ASTRO_ZODIAC_MODALITY.CARDINAL] / total) * 100 : 0,
    [ASTRO_ZODIAC_MODALITY.FIXED]: total ? (counts[ASTRO_ZODIAC_MODALITY.FIXED] / total) * 100 : 0,
    [ASTRO_ZODIAC_MODALITY.MUTABLE]: total ? (counts[ASTRO_ZODIAC_MODALITY.MUTABLE] / total) * 100 : 0,
  }

  const maxValue = Math.max(...Object.values(counts))
  const dominant = Object.entries(counts)
    .filter(([, v]) => v === maxValue)
    .map(([k]) => k as ASTRO_ZODIAC_MODALITY)

  return { counts, total, percentages, dominant }
}
