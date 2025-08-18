import { HOUSE_SYSTEM } from '../types/astro/astro-houses.types'

export const ASTRO_HOUSE_SYMBOL: { [key: number]: string } = {
  1: 'Ⅰ',
  2: 'Ⅱ',
  3: 'Ⅲ',
  4: 'Ⅳ',
  5: 'Ⅴ',
  6: 'Ⅵ',
  7: 'Ⅶ',
  8: 'Ⅷ',
  9: 'Ⅸ',
  10: 'Ⅹ',
  11: 'Ⅺ',
  12: 'Ⅻ',
}

export const ASTRO_HOUSE_SUBNAME: { [key: number]: string } = {
  1: 'Асцендент',
  4: 'Имум цели',
  7: 'Десцендент',
  10: 'Середина неба',
}

export const ASTRO_HOUSE_SHORTNAME: { [key: number]: string } = {
  1: 'ASC',
  4: 'IC',
  7: 'DC',
  10: 'MC',
}

export const ASTRO_HOUSE_SYSTEM_DESCRIPTION: Record<HOUSE_SYSTEM, string> = {
  [HOUSE_SYSTEM.Placidus]: 'Плацидус',
  [HOUSE_SYSTEM.Koch]: 'Кох',
  [HOUSE_SYSTEM.Porphyry]: 'Порфирий',
  [HOUSE_SYSTEM.Regiomontanus]: 'Региомонтанус',
  [HOUSE_SYSTEM.Campanus]: 'Кампанус',
  [HOUSE_SYSTEM.EqualMC]: 'Равнодомная от MC',
  [HOUSE_SYSTEM.EqualAsc]: 'Равнодомная от Asc',
}
