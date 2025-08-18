import { ChartFormFieldValues } from '../types'
import { CalculatorRequestKeys } from '@/entities/astro-charts/types/calculator-request.types'

export const natalChartRequestMapper = (values: ChartFormFieldValues) => {
  const timezone = values.is_timezone_auto ? undefined : values.timezone

  const time = values.time.length > 0 ? values.time : '12:00:00'
  const place = values.searchLocality

  return {
    [CalculatorRequestKeys.latitude]: Number(values.latitude),
    [CalculatorRequestKeys.longitude]: Number(values.longitude),
    [CalculatorRequestKeys.date]: values.date,
    [CalculatorRequestKeys.hsys]: values.hsys,
    [CalculatorRequestKeys.time]: time,
    [CalculatorRequestKeys.timezone]: timezone,
    [CalculatorRequestKeys.place]: place,
    [CalculatorRequestKeys.name]: values.name?.trim() ?? undefined,
  }
}
