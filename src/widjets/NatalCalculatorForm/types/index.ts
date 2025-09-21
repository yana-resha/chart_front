import { CalculatorRequestKeys } from '@/entities/astro-charts/types/calculator-request.types'
import { IInputLocality } from '@/entities/locality/types/input-locality.types'
import { HOUSE_SYSTEM } from '@/shared/types/astro/astro-houses.types'

type NatalChartValues = {
  [CalculatorRequestKeys.date]: string
  [CalculatorRequestKeys.time]: string
  [CalculatorRequestKeys.timezone]: number
  [CalculatorRequestKeys.latitude]: string
  [CalculatorRequestKeys.longitude]: string
  [CalculatorRequestKeys.hsys]: HOUSE_SYSTEM | undefined
  name: string | undefined
  locality: IInputLocality | null
  searchLocality: string
  enter_coordinates: boolean
  is_timezone_auto: boolean
}

// объединение всех вариантов
export type ChartFormFieldValues = NatalChartValues
