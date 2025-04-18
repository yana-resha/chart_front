import { ChartFormFieldValues } from '../types'
import { ASTRO_CHART_VARIABLE } from '@/entities/astro-charts/types/astro-chart'
import { IBasicCalculatorRequest, CalculatorRequestKeys } from '@/entities/astro-charts/types/calculator'
import { getTimezone } from '@/shared/helpers/date.helper'

export type ChartRequestMapper<T extends ASTRO_CHART_VARIABLE> = (
  values: Extract<ChartFormFieldValues, { chart_type: T }>,
) => T extends ASTRO_CHART_VARIABLE.NATAL_CHART ? IBasicCalculatorRequest : null

const natalChartMapper: ChartRequestMapper<ASTRO_CHART_VARIABLE.NATAL_CHART> = (values) => {
  const timezone =
    values.is_timezone_auto && values.locality
      ? getTimezone(values.date, values.locality.time_zone ?? '')
      : values.timezone

  const time = values.time.length > 0 ? values.time : '12:00:00'

  return {
    [CalculatorRequestKeys.latitude]: Number(values.latitude),
    [CalculatorRequestKeys.longitude]: Number(values.longitude),
    [CalculatorRequestKeys.date]: values.date,
    [CalculatorRequestKeys.time]: time,
    [CalculatorRequestKeys.timezone]: timezone,
  }
}

// если добавишь другие мапперы — сюда:
export const astroChartMappers: {
  [ASTRO_CHART_VARIABLE.NATAL_CHART]: typeof natalChartMapper
  [ASTRO_CHART_VARIABLE.CHOROSCOPE]: () => null
} = {
  [ASTRO_CHART_VARIABLE.NATAL_CHART]: natalChartMapper,
  [ASTRO_CHART_VARIABLE.CHOROSCOPE]: () => null,
}
