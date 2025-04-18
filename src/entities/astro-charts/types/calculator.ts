import { ASTRO_CHART_VARIABLE } from './astro-chart'

export interface ICalculatorTypes {
  id: string | number
  value: ASTRO_CHART_VARIABLE
  content: string
  default?: boolean
}

export enum CalculatorRequestKeys {
  type = 'chart_type',
  latitude = 'latitude',
  longitude = 'longitude',
  date = 'date',
  time = 'time',
  timezone = 'timezone',
}

export interface IBasicCalculatorRequest {
  [CalculatorRequestKeys.type]: ASTRO_CHART_VARIABLE // тип карты
  [CalculatorRequestKeys.latitude]: number // широта
  [CalculatorRequestKeys.longitude]: number // долгота
  [CalculatorRequestKeys.date]: string // дата
  [CalculatorRequestKeys.time]: string //  время
  [CalculatorRequestKeys.timezone]: number
}
