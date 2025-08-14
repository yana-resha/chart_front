import { http, HttpResponse, delay } from 'msw'

import { mockMyNatalCalculations } from './data/astro-calculations/my'
import { mockSergNatalCalculations } from './data/astro-calculations/serg'
import { mockAspectInterpretation } from './data/astro-dictionary/aspect'
import { mockConfiguratuion } from './data/astro-dictionary/configuration'
import { mockHouseInSign } from './data/astro-dictionary/house-in-sign'
import { mockPlanetInHouse } from './data/astro-dictionary/planet-in-house'
import { mockPlanetInSign } from './data/astro-dictionary/planet-in-sign'
import { mockLocalityList } from './data/locality'
import { SERVER_PATH } from '@/shared/constants/host'

export const handlers = [
  /* интерпретации */
  http.post(SERVER_PATH + '/astro/dictionary/planet-in-sign', async ({ request }) => {
    // можно получить body:
    const body = await request.json()

    await delay(10000)

    return HttpResponse.json(mockPlanetInSign)
    /* return HttpResponse.json({ success: true, data: { chart: 'natal', items: [] } }) */
  }),

  http.post(SERVER_PATH + '/astro/dictionary/aspect', async () => {
    await delay(1000)

    return HttpResponse.json(mockAspectInterpretation)
  }),
  http.post(SERVER_PATH + '/astro/dictionary/planet-in-house', async () => {
    await delay(3000)

    return HttpResponse.json(mockPlanetInHouse)
  }),
  http.post(SERVER_PATH + '/astro/dictionary/house-in-sign', async () => {
    await delay(3000)

    return HttpResponse.json(mockHouseInSign)
  }),
  http.post(SERVER_PATH + '/astro/dictionary/configuration', async () => {
    await delay(3000)

    return HttpResponse.json(mockConfiguratuion)
  }),

  /* рассчет натальной карты */

  http.post(SERVER_PATH + '/astro/natal-chart', async () => {
    await delay(1000)

    return HttpResponse.json(mockSergNatalCalculations)
  }),

  http.get(SERVER_PATH + '/locality/search', ({ request }) => {
    const url = new URL(request.url)
    const name = url.searchParams.get('name')

    return HttpResponse.json(mockLocalityList)
  }),
]
