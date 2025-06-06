import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { GetLocalitiesRequest, GetLocalitiesResponse } from '@/entities/locality/types'
import { SERVER_PATH } from '@/shared/constants/host'
import { escapeSpacesInTheEnd } from '@/shared/helpers/string.helper'

// Define a service using a base URL and expected endpoints
export const localityApi = createApi({
  reducerPath: 'localityApi',
  keepUnusedDataFor: Infinity, // 🔒 вечный кэш
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_PATH}/locality/search` }),
  endpoints: (build) => ({
    getLocalitiesByName: build.query<GetLocalitiesResponse['data'], GetLocalitiesRequest>({
      query: ({ language, name }) =>
        `?name=${escapeSpacesInTheEnd(name)}` + `${language ? `&language=${language}` : ''}`,
      transformResponse: (response: { data: GetLocalitiesResponse['data'] }) => response.data,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetLocalitiesByNameQuery, useLazyGetLocalitiesByNameQuery } = localityApi
