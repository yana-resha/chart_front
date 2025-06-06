import { ASPECT_PRIORITY } from '@/shared/configs/astro-aspects.config'
import { PLANET_PRIORITY } from '@/shared/configs/astro-planets.config'
import { ASTRO_ASPECT } from '@/shared/types/astro/astro-aspects.types'
import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'

interface IHasAspectAndPlanets {
  planetA: string
  planetB: string
  aspectType: ASTRO_ASPECT
}

export const sortAspectsByPlanetAndAspectPriority = <T extends IHasAspectAndPlanets>(aspects: T[]): T[] =>
  aspects.slice().sort((a, b) => {
    const getPlanetPriority = (planet: string): number =>
      PLANET_PRIORITY.includes(planet as ASTRO_PLANET)
        ? PLANET_PRIORITY.indexOf(planet as ASTRO_PLANET)
        : PLANET_PRIORITY.length

    const aPlanetPriority = getPlanetPriority(a.planetA)
    const bPlanetPriority = getPlanetPriority(b.planetA)

    if (aPlanetPriority !== bPlanetPriority) {
      return aPlanetPriority - bPlanetPriority
    }

    const aAspectPriority = ASPECT_PRIORITY.indexOf(a.aspectType)
    const bAspectPriority = ASPECT_PRIORITY.indexOf(b.aspectType)

    return aAspectPriority - bAspectPriority
  })
