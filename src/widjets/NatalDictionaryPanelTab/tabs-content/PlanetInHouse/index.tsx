import { useCallback, useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { IPlanetsInHouseProps } from '../../types'
import { Layout } from '../index.linaria'
import { DICTIONARY_ITEMS_CATEGORY } from '@/entities/astro-dictionary/types/dictionary-common.types'
import { ASTRO_CHART_VARIABLE } from '@/shared/types/astro/astro-commom.types'
import { useAppSelector } from '@/store'
import { useLazyGetPlanetInHouseQuery } from '@/store/api/astro-dictionary.api'
import { updateNatalDictionaries } from '@/store/slices/natal-decoding'

export const PlanetInHouse = ({ chartId, items }: IPlanetsInHouseProps) => {
  const dispatch = useDispatch()
  const dictionary = useAppSelector(
    (store) =>
      store.natalDecoding.chartsById[chartId].dictionaries[DICTIONARY_ITEMS_CATEGORY.PLANET_IN_HOUSE],
  )
  const [fetch, { data, isFetching, error }] = useLazyGetPlanetInHouseQuery()

  const handleFetch = useCallback(async () => {
    try {
      const result = await fetch({
        chart: ASTRO_CHART_VARIABLE.NATAL_CHART,
        items,
      }).unwrap()

      if (result.success && result.data?.items) {
        dispatch(
          updateNatalDictionaries({
            id: chartId,
            category: DICTIONARY_ITEMS_CATEGORY.PLANET_IN_HOUSE,
            items: result.data?.items ?? [], // <== здесь то, что вернёт сервер
          }),
        )
      }
    } catch (err) {
      console.error('Ошибка при получении данных:', err)
    }
  }, [fetch, items, dispatch, chartId])

  useEffect(() => {
    if (dictionary.length <= 0) {
      handleFetch()
    }
  }, [chartId])

  return (
    <Layout>
      <div>
        {dictionary.map((el) => (
          <div
            key={el.planet + el.house}
            style={{ border: '1px solid red', padding: '1rem', marginBottom: '15px' }}
          >
            <div style={{ color: 'whitesmoke', whiteSpace: 'pre-wrap' }}>{el.text}</div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
