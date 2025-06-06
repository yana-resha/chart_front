import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IBasicCalculatorRequest } from '@/entities/astro-charts/types/calculator-request.types'
import { IPostFullNatalChartResponse } from '@/entities/astro-charts/types/calculator-response.types'
import { SERVER_PATH } from '@/shared/constants/host'

// Define a service using a base URL and expected endpoints
export const astroCalculateApi = createApi({
  reducerPath: 'astroCalculateApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_PATH}/astro` }),
  endpoints: (build) => ({
    postCalculateNatal: build.mutation<IPostFullNatalChartResponse, IBasicCalculatorRequest>({
      query: (body) => ({
        url: 'natal-chart',
        method: 'POST',
        body,
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const { usePostCalculateNatalMutation } = astroCalculateApi
