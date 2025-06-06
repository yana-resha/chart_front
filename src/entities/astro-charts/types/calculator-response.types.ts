import { ISingleChartSourceData, IFullNatalСalculations } from './astro-charts.types'
import { IBasicResponse } from '@/shared/types/api'

export interface ISingleCalculationResult<T, M> {
  sourceData: T
  result: M
}
export type IFullNatalChartResult = ISingleCalculationResult<ISingleChartSourceData, IFullNatalСalculations>
export type IPostFullNatalChartResponse = IBasicResponse<IFullNatalChartResult>
