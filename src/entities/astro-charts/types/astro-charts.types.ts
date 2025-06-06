import { IPlanet, IPlanetsAspect, IPlanetsConfiguration, CHART_STRENGTH } from './astro-items.types'
import { ASTRO_HOUSE_ACTIVITY } from '@/shared/types/astro/astro-houses.types'
import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'

export interface ISingleChartSourceData {
  datetime: string
  timezone: number
  latitude: number
  longitude: number
}

export interface IFullNatalСalculations {
  planets: IPlanet[]
  houses: {
    ascendant: number
    midheaven: number
    houses: number[]
  }
  housesActivity: { [key: number]: ASTRO_HOUSE_ACTIVITY }[]
  aspects: IPlanetsAspect[]

  configurations: IPlanetsConfiguration[]
  strongestPlanet: {
    planet: ASTRO_PLANET
    totalStrength: number
  }
  chartStrength: {
    score: number
    label: CHART_STRENGTH
  }
}

export interface IFullChoroscopeСalculations {
  planets: IPlanet[]
  aspects: IPlanetsAspect[]
  configurations: IPlanetsConfiguration[]
  strongestPlanet: {
    planet: ASTRO_PLANET
    totalStrength: number
  }
  chartStrength: {
    score: number
    label: CHART_STRENGTH
  }
}
