import {
  PLANET_DOMICILE_SIGNS,
  PLANET_DETRIMENT_SIGNS,
  PLANET_EXALTATION_SIGNS,
  PLANET_FALL_SIGNS,
} from '@/shared/configs/astro-essential-dignity'
import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'
import { ASTRO_ZODIAC, ASTRO_ESSENTIAL_DIGNITY } from '@/shared/types/astro/astro-zodiac.types'

export function getPlanetEssentialDignity(
  planet: ASTRO_PLANET,
  sign: ASTRO_ZODIAC,
): ASTRO_ESSENTIAL_DIGNITY | undefined {
  if (PLANET_DOMICILE_SIGNS[planet].includes(sign)) {
    return ASTRO_ESSENTIAL_DIGNITY.DOMICILE
  }
  if (PLANET_DETRIMENT_SIGNS[planet].includes(sign)) {
    return ASTRO_ESSENTIAL_DIGNITY.DETRIMENT
  }
  if (PLANET_EXALTATION_SIGNS[planet].includes(sign)) {
    return ASTRO_ESSENTIAL_DIGNITY.EXALTATION
  }
  if (PLANET_FALL_SIGNS[planet].includes(sign)) {
    return ASTRO_ESSENTIAL_DIGNITY.FALL
  }

  return undefined
}
