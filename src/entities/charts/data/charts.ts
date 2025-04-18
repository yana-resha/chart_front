import { CHARTS_VARIABLES_DESCRIPTION } from '../config'
import { CHARTS_VARIABLES, IChartTypes } from '../types'

export interface IChartTypesSelectList extends IChartTypes {
  content: string
  default?: boolean
}

export const CHART_TYPES: IChartTypesSelectList[] = [
  {
    id: 1,
    value: CHARTS_VARIABLES.NATAL_CHART,
    content: CHARTS_VARIABLES_DESCRIPTION[CHARTS_VARIABLES.NATAL_CHART],
    default: true,
  },
  {
    id: 2,
    value: CHARTS_VARIABLES.CHOROSCOPE,
    content: CHARTS_VARIABLES_DESCRIPTION[CHARTS_VARIABLES.CHOROSCOPE],
  },
]
