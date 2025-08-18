import { ASTRO_CHART_VARIABLE_DESCRIPTION } from '../configs/astro-chart.config'
import { ASTRO_HOUSE_SYSTEM_DESCRIPTION } from '@/shared/configs/astro-houses.config'
import { ASTRO_CHART_VARIABLE } from '@/shared/types/astro/astro-commom.types'
import { HOUSE_SYSTEM } from '@/shared/types/astro/astro-houses.types'

export interface ICalculatorTypes {
  id: string | number
  value: ASTRO_CHART_VARIABLE
  content: string
  default?: boolean
}

export interface ICalculatorTypesSelectList extends ICalculatorTypes {
  content: string
  default?: boolean
}

export const CALCULATOR_TYPES: ICalculatorTypesSelectList[] = [
  {
    id: 1,
    value: ASTRO_CHART_VARIABLE.NATAL_CHART,
    content: ASTRO_CHART_VARIABLE_DESCRIPTION[ASTRO_CHART_VARIABLE.NATAL_CHART],
    default: true,
  },
  {
    id: 2,
    value: ASTRO_CHART_VARIABLE.CHOROSCOPE,
    content: ASTRO_CHART_VARIABLE_DESCRIPTION[ASTRO_CHART_VARIABLE.CHOROSCOPE],
  },
]

export interface ITimezoneSelectList {
  content: string
  default?: boolean
  value: number
  id: string | number
}
export const TIMEZONE_LIST: ITimezoneSelectList[] = [
  { id: 1, value: -0, content: 'Auto', default: true },
  { id: 41, value: 14, content: 'UTC +14' },
  { id: 40, value: 13, content: 'UTC +13' },
  { id: 39, value: 12.75, content: 'UTC +12:45' },
  { id: 38, value: 12, content: 'UTC +12' },
  { id: 37, value: 11, content: 'UTC +11' },
  { id: 36, value: 10.5, content: 'UTC +10:30' },
  { id: 35, value: 10, content: 'UTC +10' },
  { id: 34, value: 9.5, content: 'UTC +9:30' },
  { id: 33, value: 9, content: 'UTC +9' },
  { id: 32, value: 8.75, content: 'UTC +8:45' },
  { id: 31, value: 8, content: 'UTC +8' },
  { id: 30, value: 7, content: 'UTC +7' },
  { id: 29, value: 6.5, content: 'UTC +6:30' },
  { id: 28, value: 6, content: 'UTC +6' },
  { id: 27, value: 5.75, content: 'UTC +5:45' },
  { id: 26, value: 5.5, content: 'UTC +5:30' },
  { id: 25, value: 5, content: 'UTC +5' },
  { id: 24, value: 4.5, content: 'UTC +4:30' },
  { id: 23, value: 4, content: 'UTC +4' },
  { id: 22, value: 3.5, content: 'UTC +3:30' },
  { id: 21, value: 3, content: 'UTC +3' },
  { id: 20, value: 2.5, content: 'UTC +2:30' },
  { id: 19, value: 2, content: 'UTC +2' },
  { id: 18, value: 1, content: 'UTC +1' },
  { id: 17, value: 0, content: 'UTC ±0' },
  { id: 16, value: -1, content: 'UTC -1' },
  { id: 15, value: -2, content: 'UTC -2' },
  { id: 14, value: -3, content: 'UTC -3' },
  { id: 13, value: -3.5, content: 'UTC -3:30' },
  { id: 12, value: -4, content: 'UTC -4' },
  { id: 11, value: -4.5, content: 'UTC -4:30' },
  { id: 10, value: -5, content: 'UTC -5' },
  { id: 9, value: -6, content: 'UTC -6' },
  { id: 8, value: -7, content: 'UTC -7' },
  { id: 7, value: -8, content: 'UTC -8' },
  { id: 6, value: -9, content: 'UTC -9' },
  { id: 5, value: -9.5, content: 'UTC -9:30' },
  { id: 4, value: -10, content: 'UTC -10' },
  { id: 3, value: -11, content: 'UTC -11' },
  { id: 2, value: -12, content: 'UTC -12' },
]

export interface IHouseSystemSelectList {
  content: string
  default?: boolean
  value: HOUSE_SYSTEM
  id: HOUSE_SYSTEM
}
export const HOUSE_SYSTEM_LIST: IHouseSystemSelectList[] = [
  {
    id: HOUSE_SYSTEM.Placidus,
    default: true,
    value: HOUSE_SYSTEM.Placidus,
    content: ASTRO_HOUSE_SYSTEM_DESCRIPTION.Placidus,
  },

  {
    id: HOUSE_SYSTEM.Koch,
    value: HOUSE_SYSTEM.Koch,
    content: ASTRO_HOUSE_SYSTEM_DESCRIPTION.Koch,
  },

  {
    id: HOUSE_SYSTEM.Campanus,
    value: HOUSE_SYSTEM.Campanus,
    content: ASTRO_HOUSE_SYSTEM_DESCRIPTION.Campanus,
  },

  {
    id: HOUSE_SYSTEM.EqualAsc,
    value: HOUSE_SYSTEM.EqualAsc,
    content: ASTRO_HOUSE_SYSTEM_DESCRIPTION.EqualAsc,
  },

  {
    id: HOUSE_SYSTEM.EqualMC,
    value: HOUSE_SYSTEM.EqualMC,
    content: ASTRO_HOUSE_SYSTEM_DESCRIPTION.EqualMC,
  },

  {
    id: HOUSE_SYSTEM.Porphyry,
    value: HOUSE_SYSTEM.Porphyry,
    content: ASTRO_HOUSE_SYSTEM_DESCRIPTION.Porphyry,
  },

  {
    id: HOUSE_SYSTEM.Regiomontanus,
    value: HOUSE_SYSTEM.Regiomontanus,
    content: ASTRO_HOUSE_SYSTEM_DESCRIPTION.Regiomontanus,
  },
]
