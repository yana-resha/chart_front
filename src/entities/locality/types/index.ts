import { IBasicResponse } from '@/shared/types/api'
import { LANGUAGE } from '@/shared/types/appLanguage'

export interface IAdmin2 {
  geonameid: string
  asciiname: string
  asciiname_ru: string
  country: string
}

export interface IAdmin1 {
  geonameid: string
  asciiname: string
  asciiname_ru: string
  country: string
}

export interface ICountry {
  iso: string
  name: string
  name_ru: string
}

export interface ICity {
  geonameid: string
  asciiname: string
  asciiname_ru: string
  latitude: string
  longitude: string
  elevation: number | null
  country: string | null
  admin1_id: string | null
  admin2_id: string | null
  time_zone: string | null
}

export interface IFullLocality extends ICity {
  admin2_data: IAdmin2 | null
  admin1_data: IAdmin1 | null
  country_data: ICountry | null
}

export type GetLocalitiesResponse = IBasicResponse<IFullLocality[]>

export interface GetLocalitiesRequest {
  name: string
  language?: LANGUAGE
}
