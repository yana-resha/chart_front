import { ChartFormFieldValues } from '../types'
import { ASTRO_CHART_VARIABLE } from '@/entities/astro-charts/types/astro-chart'
import { CalculatorRequestKeys } from '@/entities/astro-charts/types/calculator'

export const formInitialValues: ChartFormFieldValues = {
  [CalculatorRequestKeys.date]: new Date().toISOString().substring(0, 10),
  locality: null,
  searchLocality: '',
  enter_coordinates: false,
  is_timezone_auto: true,
  [CalculatorRequestKeys.type]: ASTRO_CHART_VARIABLE.NATAL_CHART,
  [CalculatorRequestKeys.time]: '12:00:00',
  [CalculatorRequestKeys.timezone]: 0,
  [CalculatorRequestKeys.latitude]: '',
  [CalculatorRequestKeys.longitude]: '',
}
