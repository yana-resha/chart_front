import { ASTRO_ASPECT } from '@/shared/types/astro/astro-aspects.types'
import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'

export interface IPlanet {
  name: ASTRO_PLANET
  longitude: number
  latitude: number
  distance: number
  speed: number
  isRetrograde: boolean
}
export enum CHART_STRENGTH {
  LOW = 'low',
  VERY_LOW = 'very low',
  MIDDLE = 'middle',
  STRONG = 'strong',
  VERY_STRONG = 'very strong',
}
export interface IPlanetsAspect {
  planetA: ASTRO_PLANET
  planetB: ASTRO_PLANET
  aspectType: ASTRO_ASPECT
  orb: number
  isExact: boolean
  ange: number
  isVeryExact: boolean
  strength: number
  angle: number
}
export interface IPlanetsConfiguration {
  type: string
  planets: ASTRO_PLANET[]
}
