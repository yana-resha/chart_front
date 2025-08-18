import {
  IChartAspectStatistics,
  IPlanet,
  IPlanetsAspect,
  IPlanetsConfiguration,
  IStrongestPlanetByAspects,
} from './astro-items.types'
import { ASTRO_HOUSE_ACTIVITY, HOUSE_SYSTEM } from '@/shared/types/astro/astro-houses.types'

export interface ISingleChartSourceData {
  name?: string
  datetime: string
  timezone: number
  latitude: number
  longitude: number
  place?: string
  jd: number
  hsys: HOUSE_SYSTEM
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
  strongestPlanet: IStrongestPlanetByAspects
  chartAspectStatistics: IChartAspectStatistics
}

export interface IFullChoroscopeСalculations {
  planets: IPlanet[]
  aspects: IPlanetsAspect[]
  configurations: IPlanetsConfiguration[]
  strongestPlanet: IStrongestPlanetByAspects
  chartAspectStatistics: IChartAspectStatistics
}
