import { GetLocalitiesRequest } from '../types'

/**
 * Собирает query-строку для /locality/search
 */
export function buildLocalitySearchParams(req: GetLocalitiesRequest): string {
  const p = new URLSearchParams()
  if (req.name) p.set('name', req.name)
  if (req.lang) p.set('lang', req.lang as string) // LANGUAGE совместим с 'ru' | 'en'
  if (req.countryIso) p.set('countryIso', req.countryIso)
  if (req.limit !== undefined) p.set('limit', String(req.limit))
  if (req.offset !== undefined) p.set('offset', String(req.offset))

  return p.toString()
}
