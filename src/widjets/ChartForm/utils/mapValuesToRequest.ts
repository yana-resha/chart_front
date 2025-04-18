import { ChartFormFieldValues } from '../types'
import { CalculatorRequestKeys, IBasicCalculatorRequest } from '@/entities/astro-charts/types/calculator'
import { getTimezone } from '@/shared/helpers/date'

export const mapValuesToRequest = (values: ChartFormFieldValues): IBasicCalculatorRequest => {
  const timezone =
    values.is_timezone_auto && values.locality
      ? getTimezone(values.date, values.locality.time_zone ?? '')
      : values.timezone
  const time = values.time.length > 0 ? values.time : '12:00:00'

  return {
    [CalculatorRequestKeys.type]: values.chart_type,
    [CalculatorRequestKeys.latitude]: Number(values.latitude),
    [CalculatorRequestKeys.longitude]: Number(values.longitude),
    [CalculatorRequestKeys.date]: values.date,
    [CalculatorRequestKeys.time]: time,
    [CalculatorRequestKeys.timezone]: timezone,
  }
}
