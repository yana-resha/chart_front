import { LANGUAGE } from '@/shared/types/appLanguage'

export interface ILocality {
  geonameid: string
  name: string
  asciiname: string
  latitude: number
  longitude: number
  country: string
  country_name: string
  time_zone: string
  admin1_name: string | null
  admin2_name: string | null
}

export type GetLocalitiesResponse = {
  data: ILocality[]
}
export interface GetLocalitiesRequest {
  value: string
  language?: LANGUAGE
}
