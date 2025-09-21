// src/shared/types/locality.ts
import { IBasicResponse } from '@/shared/types/api'
import { LANGUAGE } from '@/shared/types/appLanguage'

export interface IAdmin2 {
  geonameid: string
  asciiname: string
  asciiname_ru: string | null // ← у admin2/admin1 всегда перевод есть (если хочешь, можно тоже сделать string | null)
}

export interface IAdmin1 {
  geonameid: string
  asciiname: string
  asciiname_ru: string | null
}

export interface ICountry {
  iso: string
  name: string
  name_ru: string | null
}

export interface ICity {
  geonameid: string
  asciiname: string
  /** Русского названия может не быть */
  asciiname_ru: string | null

  latitude: number | null
  longitude: number | null
  elevation: number | null
  dem: number | null
  population: number | null
  country: string | null
  admin1_id: string | null
  admin2_id: string | null
  time_zone: string | null
  feature_code: string | null
  place_rank: number | null
}

export interface IFullLocality extends ICity {
  admin2_data: IAdmin2 | null
  admin1_data: IAdmin1 | null
  country_data: ICountry | null
}

export type GetLocalitiesResponse = IBasicResponse<IFullLocality[]>

export interface GetLocalitiesRequest {
  /** Строка поиска (город/посёлок и т.п.) */
  name?: string
  /** Язык поиска */
  lang?: LANGUAGE // 'ru' | 'en'
  /** ISO страны для ограничения поиска */
  countryIso?: string
  /** Лимит результатов (1..200) */
  limit?: number
  /** Смещение результатов */
  offset?: number
}
