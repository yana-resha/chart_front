export interface ITimezoneSelectList {
  content: string
  default?: boolean
  value: number
  id: string | number
}
export const TIMEZONE_LIST: ITimezoneSelectList[] = [
  { id: 1, value: -0, content: 'Auto', default: true }, // default только у авто должен стоять, другим элементам не ставить
  { id: 2, value: 4, content: 'GMT+4' },
  { id: 3, value: 3, content: 'GMT+3' },
  { id: 4, value: 2, content: 'GMT+2' },
  { id: 5, value: 1, content: 'GMT+1' },
  { id: 6, value: 0, content: 'GMT±0' },
  { id: 7, value: -1, content: 'GMT-1' },
  { id: 8, value: -2, content: 'GMT-2' },
  { id: 9, value: -3, content: 'GMT-3' },
]
