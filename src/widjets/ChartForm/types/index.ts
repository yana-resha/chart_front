import { ChartRequestKeys, CHARTS_VARIABLES } from '@/entities/charts/types'
import { ILocality } from '@/entities/locality/types'
import { IDropdownItem } from '@/shared/components/SearchInput/types'

export type IInputLocality = ILocality & IDropdownItem
export interface ChartFormFieldValues {
  [ChartRequestKeys.type]: CHARTS_VARIABLES
  [ChartRequestKeys.date]: string
  [ChartRequestKeys.time]: string
  [ChartRequestKeys.timezone]: number
  [ChartRequestKeys.latitude]: string
  [ChartRequestKeys.longitude]: string
  locality: IInputLocality | null
  searchLocality: string
  enter_coordinates: boolean
  is_timezone_auto: boolean
}
