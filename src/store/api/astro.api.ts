import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IPostFullNatalChartResponse } from '@/entities/astro-charts/types/astro-chart'
import { IBasicCalculatorRequest } from '@/entities/astro-charts/types/calculator'
import { SERVER_PATH } from '@/shared/constants/host'

// Define a service using a base URL and expected endpoints
export const astroApi = createApi({
  reducerPath: 'astroApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_PATH}/astro` }),
  endpoints: (build) => ({
    postNatalChart: build.mutation<IPostFullNatalChartResponse, IBasicCalculatorRequest>({
      query: (body) => ({
        url: 'natal-chart',
        method: 'POST',
        body,
      }),
    }),
  }),
})

// Export hooks for usage in functional components
export const { usePostNatalChartMutation } = astroApi
