import { ASTRO_HOUSE_ACTIVITY } from '@/shared/types/astro-houses'
import { IPlanet } from '@/shared/types/astro-planets'

export enum ASTRO_CHART_VARIABLE {
  NATAL_CHART = 'natal_chart',
  CHOROSCOPE = 'choroscope',
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
}
