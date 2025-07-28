export enum CalculatorRequestKeys {
  type = 'chart_type',
  latitude = 'latitude',
  longitude = 'longitude',
  date = 'date',
  time = 'time',
  timezone = 'timezone',
  place = 'place',
}

export interface IBasicCalculatorRequest {
  [CalculatorRequestKeys.latitude]: number // широта
  [CalculatorRequestKeys.longitude]: number // долгота
  [CalculatorRequestKeys.date]: string // дата
  [CalculatorRequestKeys.time]: string //  время
  [CalculatorRequestKeys.timezone]: number
  [CalculatorRequestKeys.place]?: string
}
