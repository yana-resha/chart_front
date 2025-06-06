import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'

export interface IPlanetValues {
  name: ASTRO_PLANET
  label: string
  longitude: number
  symbol: string
}
