import { ASTRO_CHART_VARIABLE_DESCRIPTION } from '../configs/astro-chart.config'
import { ASTRO_CHART_VARIABLE } from '../types/astro-chart'
import { ICalculatorTypes } from '../types/calculator'

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
  { id: 1, value: -0, content: 'Auto', default: true }, // default только у авто должен стоять, другим элементам не ставить
  { id: 280, value: 5, content: 'UTC+5' },
  { id: 289, value: 4.5, content: 'UTC+4:30' },
  { id: 2, value: 4, content: 'UTC+4' },
  { id: 378, value: 3.5, content: 'UTC+3:30' },
  { id: 3, value: 3, content: 'UTC+3' },
  { id: 212, value: 2.5, content: 'UTC+2:30' },
  { id: 4, value: 2, content: 'UTC+2' },
  { id: 5, value: 1, content: 'UTC+1' },
  { id: 6, value: 0, content: 'UTC±0' },
  { id: 7, value: -1, content: 'UTC-1' },
  { id: 8, value: -2, content: 'UTC-2' },
  { id: 9, value: -3, content: 'UTC-3' },
]
