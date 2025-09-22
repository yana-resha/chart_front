import { ChartFormFieldValues } from '../types'
import { CalculatorRequestKeys } from '@/entities/astro-charts/types/calculator-request.types'

const toNum = (s: string): number | undefined => {
  const v = parseFloat(s.replace(',', '.'))

  return Number.isFinite(v) ? v : undefined
}

export const natalChartRequestMapper = (values: ChartFormFieldValues) => {
  const timezone = values.is_timezone_auto ? undefined : values.timezone
  const time = values.time.length > 0 ? values.time : '12:00:00'
  const place = values.searchLocality

  return {
    [CalculatorRequestKeys.latitude]: toNum(values.latitude) ?? 0,
    [CalculatorRequestKeys.longitude]: toNum(values.longitude) ?? 0,
    [CalculatorRequestKeys.date]: values.date,
    [CalculatorRequestKeys.hsys]: values.hsys,
    [CalculatorRequestKeys.time]: time,
    [CalculatorRequestKeys.timezone]: timezone,
    [CalculatorRequestKeys.place]: place,
    [CalculatorRequestKeys.name]: values.name?.trim() || undefined,
  }
}
