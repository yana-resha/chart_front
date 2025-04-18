import { ChartFormFieldValues } from '../types'
import { ChartRequestKeys, IBasicChartRequest } from '@/entities/charts/types'
import { getTimezone, recalculatedDate } from '@/shared/helpers/date'

export const mapValuesToRequest = (values: ChartFormFieldValues): IBasicChartRequest => {
  const timezone =
    values.is_timezone_auto && values.locality
      ? getTimezone(values.date, values.locality.time_zone)
      : values.timezone

  const time = values.time.length > 0 ? values.time : '12:00:00'
  const date = recalculatedDate(values.date + ' ' + time, timezone)

  return {
    [ChartRequestKeys.type]: values.chart_type,
    [ChartRequestKeys.latitude]: Number(values.latitude),
    [ChartRequestKeys.longitude]: Number(values.longitude),
    [ChartRequestKeys.date]: date,
  }
}
