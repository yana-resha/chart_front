import { getSignIndexByLongitude } from '../astro.helper'
import { PLANET_WEIGHTS } from '@/shared/configs/astro-planets.config'
import { ASTRO_ZODIAC_INDEX } from '@/shared/configs/astro-zodiac.config'
import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'
import { ASTRO_ZODIAC } from '@/shared/types/astro/astro-zodiac.types'

export interface IPlanetValue {
  name: ASTRO_PLANET
  longitude: number
}

export function getPlanetsSignStats(planets: IPlanetValue[]) {
  const counts: Record<ASTRO_ZODIAC, number> = {
    [ASTRO_ZODIAC.ARIES]: 0,
    [ASTRO_ZODIAC.TAURUS]: 0,
    [ASTRO_ZODIAC.GEMINI]: 0,
    [ASTRO_ZODIAC.CANCER]: 0,
    [ASTRO_ZODIAC.LEO]: 0,
    [ASTRO_ZODIAC.VIRGO]: 0,
    [ASTRO_ZODIAC.LIBRA]: 0,
    [ASTRO_ZODIAC.SCORPIO]: 0,
    [ASTRO_ZODIAC.SAGITTARIUS]: 0,
    [ASTRO_ZODIAC.CAPRICORN]: 0,
    [ASTRO_ZODIAC.AQUARIUS]: 0,
    [ASTRO_ZODIAC.PISCES]: 0,
  }

  planets.forEach(({ name, longitude }) => {
    const signIndex = getSignIndexByLongitude(longitude)
    const sign = ASTRO_ZODIAC_INDEX[signIndex] as ASTRO_ZODIAC
    const weight = PLANET_WEIGHTS[name] ?? 1
    counts[sign] += weight
  })

  const total = Object.values(counts).reduce((sum, v) => sum + v, 0)
  const percentages: Record<ASTRO_ZODIAC, number> = Object.fromEntries(
    Object.entries(counts).map(([sign, count]) => [sign, total ? (count / total) * 100 : 0]),
  ) as Record<ASTRO_ZODIAC, number>

  const maxValue = Math.max(...Object.values(counts))
  const dominant = Object.entries(counts)
    .filter(([, v]) => v === maxValue)
    .map(([k]) => k as ASTRO_ZODIAC)

  return { counts, total, percentages, dominant }
}
