import { CalculatorRequestKeys } from '@/entities/astro-charts/types/calculator-request.types'
import { IFullLocality } from '@/entities/locality/types'
import { IDropdownItem } from '@/shared/components/SearchInput/types'

export type IInputLocality = IFullLocality & IDropdownItem

type NatalChartValues = {
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

// объединение всех вариантов
export type ChartFormFieldValues = NatalChartValues
