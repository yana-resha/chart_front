import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  IPlanetInSignDictionaryRequest,
  IPlanetInHousesDictionaryRequest,
  IHouseInSignDictionaryRequest,
  IAspectDictionaryRequest,
  IConfigurationDictionaryRequest,
  IBulkItemsDictionaryRequest,
} from '@/entities/astro-dictionary/types/dictionary-requests.types'
import {
  IPlanetInSignDictionaryResponse,
  IPlanetInHousesDictionaryResponse,
  IHouseInSignDictionaryResponse,
  IAspectDictionaryResponse,
  IConfigurationDictionaryResponse,
  IBulkItemsDictionaryResponse,
} from '@/entities/astro-dictionary/types/dictionary-responses.types'
import { SERVER_PATH } from '@/shared/constants/host'

export const astroDictionaryApi = createApi({
  reducerPath: 'astroDictionaryApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_PATH}/astro/dictionary` }),
  endpoints: (build) => ({
    getPlanetInSign: build.query<IPlanetInSignDictionaryResponse, IPlanetInSignDictionaryRequest>({
      query: (body) => ({
        url: 'planet-in-sign',
        method: 'POST',
        body,
      }),
    }),
    getPlanetInHouse: build.query<IPlanetInHousesDictionaryResponse, IPlanetInHousesDictionaryRequest>({
      query: (body) => ({
        url: 'planet-in-house',
        method: 'POST',
        body,
      }),
    }),
    getHouseInSign: build.query<IHouseInSignDictionaryResponse, IHouseInSignDictionaryRequest>({
      query: (body) => ({
        url: 'house-in-sign',
        method: 'POST',
        body,
      }),
    }),
    getAspect: build.query<IAspectDictionaryResponse, IAspectDictionaryRequest>({
      query: (body) => ({
        url: 'aspect',
        method: 'POST',
        body,
      }),
    }),
    getConfiguration: build.query<IConfigurationDictionaryResponse, IConfigurationDictionaryRequest>({
      query: (body) => ({
        url: 'configuration',
        method: 'POST',
        body,
      }),
    }),
    getBulkDictionary: build.query<IBulkItemsDictionaryResponse, IBulkItemsDictionaryRequest>({
      query: (body) => ({
        url: 'bulk',
        method: 'POST',
        body,
      }),
    }),
  }),
  tagTypes: [],
})

export const {
  useGetPlanetInSignQuery,
  useLazyGetPlanetInSignQuery, // 💥 вот он!
  useGetPlanetInHouseQuery,
  useLazyGetPlanetInHouseQuery,
  useGetHouseInSignQuery,
  useLazyGetHouseInSignQuery,
  useGetAspectQuery,
  useLazyGetAspectQuery,
  useGetConfigurationQuery,
  useLazyGetConfigurationQuery,
  useGetBulkDictionaryQuery,
  useLazyGetBulkDictionaryQuery,
} = astroDictionaryApi
