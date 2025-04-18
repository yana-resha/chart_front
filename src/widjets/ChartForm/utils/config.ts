import { ChartFormFieldValues } from '../types'
import { ChartRequestKeys, CHARTS_VARIABLES } from '@/entities/charts/types'

export const formInitialValues: ChartFormFieldValues = {
  [ChartRequestKeys.date]: new Date().toISOString().substring(0, 10),
  locality: null,
  searchLocality: '',
  enter_coordinates: false,
  is_timezone_auto: true,
  [ChartRequestKeys.type]: CHARTS_VARIABLES.NATAL_CHART,
  [ChartRequestKeys.time]: '12:00:00',
  [ChartRequestKeys.timezone]: 0,
  [ChartRequestKeys.latitude]: '',
  [ChartRequestKeys.longitude]: '',
}
