export enum CalculatorRequestKeys {
  latitude = 'latitude',
  longitude = 'longitude',
  date = 'date',
  time = 'time',
  timezone = 'timezone',
  place = 'place',
  name = 'name',
}

export interface IBasicCalculatorRequest {
  [CalculatorRequestKeys.latitude]: number // широта
  [CalculatorRequestKeys.longitude]: number // долгота
  [CalculatorRequestKeys.date]: string // дата
  [CalculatorRequestKeys.time]: string //  время
  [CalculatorRequestKeys.timezone]?: number
  [CalculatorRequestKeys.place]?: string
  [CalculatorRequestKeys.name]?: string // просто подпись для карты, имя натальной карты
}
