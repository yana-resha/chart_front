export enum CHARTS_VARIABLES {
  NATAL_CHART = 'natal_chart',
  CHOROSCOPE = 'choroscope',
}

export interface IChartTypes {
  id: string | number
  value: CHARTS_VARIABLES
  content: string
  default?: boolean
}

export enum ChartRequestKeys {
  type = 'chart_type',
  latitude = 'latitude',
  longitude = 'longitude',
  date = 'date',
  time = 'time',
  timezone = 'timezone',
}

export interface IBasicChartRequest {
  [ChartRequestKeys.type]: CHARTS_VARIABLES // тип карты
  [ChartRequestKeys.latitude]: number // широта
  [ChartRequestKeys.longitude]: number // долгота
  [ChartRequestKeys.date]: string // дата + время // иначе будет на полночь рассчитано
}
