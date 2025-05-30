import { ASTRO_CHART_VARIABLE } from '@/entities/astro-charts/types/astro-chart'
import { CalculatorRequestKeys } from '@/entities/astro-charts/types/calculator'
import { IFullLocality } from '@/entities/locality/types'
import { IDropdownItem } from '@/shared/components/SearchInput/types'

export type IInputLocality = IFullLocality & IDropdownItem
export interface ChartFormFieldValues {
  [CalculatorRequestKeys.type]: ASTRO_CHART_VARIABLE
  [CalculatorRequestKeys.date]: string
  [CalculatorRequestKeys.time]: string
  [CalculatorRequestKeys.timezone]: number
  [CalculatorRequestKeys.latitude]: string
  [CalculatorRequestKeys.longitude]: string
  locality: IInputLocality | null
  searchLocality: string
  enter_coordinates: boolean
  is_timezone_auto: boolean
}
