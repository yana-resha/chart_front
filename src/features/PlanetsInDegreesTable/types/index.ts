import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'

export interface PlanetData {
  name: ASTRO_PLANET
  longitude: number // в градусах 0–360
  isRetrograde: boolean
}

export interface AstroPlanetListProps {
  planets: PlanetData[]
  houses?: number[]
}
