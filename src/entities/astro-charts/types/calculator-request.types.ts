import { HOUSE_SYSTEM } from '@/shared/types/astro/astro-houses.types'

export enum CalculatorRequestKeys {
  latitude = 'latitude',
  longitude = 'longitude',
  date = 'date',
  hsys = 'hsys',
  time = 'time',
  timezone = 'timezone',
  place = 'place',
  name = 'name',
}

export interface IBasicCalculatorRequest {
  [CalculatorRequestKeys.hsys]?: HOUSE_SYSTEM
  [CalculatorRequestKeys.latitude]: number // широта
  [CalculatorRequestKeys.longitude]: number // долгота
  [CalculatorRequestKeys.date]: string // дата
  [CalculatorRequestKeys.time]: string //  время
  [CalculatorRequestKeys.timezone]?: number
  [CalculatorRequestKeys.place]?: string
  [CalculatorRequestKeys.name]?: string // просто подпись для карты, имя натальной карты
}
