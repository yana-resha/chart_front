import { IInputLocality } from '../types/input-locality.types'
import { IFullLocality } from '@/entities/locality/types'
import { LANGUAGE } from '@/shared/types/appLanguage'

export const formatCoord = (n: number | null, digits = 6): string =>
  n == null || !Number.isFinite(n) ? '' : n.toFixed(digits)

export const composeLocalityLabel = (x: IFullLocality, lang: LANGUAGE): string => {
  const pick = (ru?: string | null, en?: string | null) => (lang === 'ru' ? ru || en : en || ru) ?? ''

  const name = pick(x.asciiname_ru, x.asciiname)

  const a2 = x.admin2_data ? pick(x.admin2_data.asciiname_ru, x.admin2_data.asciiname) : ''
  const a1 = x.admin1_data ? pick(x.admin1_data.asciiname_ru, x.admin1_data.asciiname) : ''
  const country = x.country_data ? pick(x.country_data.name_ru, x.country_data.name) : ''

  // убираем пустые и дубликаты (например, когда admin2 == admin1)
  const tail = [a2, a1, country]
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .filter((s, i, arr) => arr.findIndex((t) => t.toLowerCase() === s.toLowerCase()) === i)

  return [name, ...tail].join(', ')
}
export const toInputLocality = (x: IFullLocality, lang: LANGUAGE = LANGUAGE.RU): IInputLocality => ({
  ...x,
  id: x.geonameid,
  content: composeLocalityLabel(x, lang),
})
