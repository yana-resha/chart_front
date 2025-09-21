// src/entities/locality/localityApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { buildLocalitySearchParams } from '@/entities/locality/helpers/buildLocalitySearchParams.helpers'
import type { GetLocalitiesRequest, GetLocalitiesResponse } from '@/entities/locality/types'
import { SERVER_PATH } from '@/shared/constants/host'
import { escapeSpacesInTheEnd } from '@/shared/helpers/string.helper'

// Доп. тип для обратной совместимости (старое поле `language`)
type LegacyGetLocalitiesRequest = GetLocalitiesRequest & { language?: GetLocalitiesRequest['lang'] }

export const localityApi = createApi({
  reducerPath: 'localityApi',
  keepUnusedDataFor: Infinity,
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_PATH}/locality` }),
  endpoints: (build) => ({
    getLocalitiesByName: build.query<GetLocalitiesResponse['data'], LegacyGetLocalitiesRequest>({
      query: (req) => {
        // Back-compat: если пришло `language`, маппим в `lang`, но не переопределяем явный `lang`
        const lang = req.lang ?? req.language
        const name = req.name ? escapeSpacesInTheEnd(req.name) : undefined

        const qs = buildLocalitySearchParams({
          ...req,
          name,
          lang,
        })

        return `search?${qs}`
      },
      transformResponse: (response: GetLocalitiesResponse) => response.data,
    }),
  }),
})

export const { useGetLocalitiesByNameQuery, useLazyGetLocalitiesByNameQuery } = localityApi
