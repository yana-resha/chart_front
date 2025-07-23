import {
  ASPECT_CATEGORY,
  ASTRO_ASPECT,
  EVALUATION_ASPECTS_STRENGTH,
  IAspectCategoryStats,
} from '@/shared/types/astro/astro-aspects.types'
import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'

export interface IPlanet {
  name: ASTRO_PLANET
  longitude: number
  latitude: number
  distance: number
  speed: number
  isRetrograde: boolean
}

export interface IPlanetsAspect {
  planetA: ASTRO_PLANET
  planetB: ASTRO_PLANET
  aspectType: ASTRO_ASPECT
  orb: number
  isExact: boolean
  isVeryExact: boolean
  strength: number
  angle: number
}
export interface IPlanetsConfiguration {
  type: string
  planets: ASTRO_PLANET[]
}

export interface IChartAspectStatistics {
  maxPossibleAspects: number
  totalAspects: number
  normalizedScore: number
  label: EVALUATION_ASPECTS_STRENGTH

  [ASPECT_CATEGORY.HARMONIOUS]: IAspectCategoryStats
  [ASPECT_CATEGORY.TENSE]: IAspectCategoryStats
  [ASPECT_CATEGORY.NEUTRAL]: IAspectCategoryStats
}

export interface IStrongestPlanetByAspects {
  planet: ASTRO_PLANET
  totalStrength: number
}
