import { ASTRO_ASPECT } from '@/shared/types/astro-aspects'
import { ASTRO_HOUSE_ACTIVITY } from '@/shared/types/astro-houses'
import { ASTRO_PLANET } from '@/shared/types/astro-planets'
import { IBasicResponse } from '@/shared/types/api'

export enum ASTRO_CHART_VARIABLE {
  NATAL_CHART = 'natal_chart',
  CHOROSCOPE = 'choroscope',
}

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

export interface IFullNatalChart {
  datetime: string
  timezone: number
  latitude: number
  longitude: number
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

export type IPostFullNatalChartResponse = IBasicResponse<IFullNatalChart>
