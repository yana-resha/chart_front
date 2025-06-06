import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'

export interface PlanetData {
  name: ASTRO_PLANET
  longitude: number // в градусах 0–360
}

export interface Props {
  houses: number[]
  planets: PlanetData[]
}
