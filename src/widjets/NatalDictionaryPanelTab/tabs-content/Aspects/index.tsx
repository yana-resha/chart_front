import { useCallback, useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { IAspectsProps } from '../../types'
import { Layout } from '../index.linaria'
import { DICTIONARY_ITEMS_CATEGORY } from '@/entities/astro-dictionary/types/dictionary-common.types'
import { ASTRO_CHART_VARIABLE } from '@/shared/types/astro/astro-commom.types'
import { useAppSelector } from '@/store'
import { useLazyGetAspectQuery } from '@/store/api/astro-dictionary.api'
import { updateNatalDictionaries } from '@/store/slices/natal-decoding'

export const Aspects = ({ chartId, items }: IAspectsProps) => {
  const dispatch = useDispatch()
  const dictionary = useAppSelector(
    (store) => store.natalDecoding.chartsById[chartId].dictionaries[DICTIONARY_ITEMS_CATEGORY.ASPECT],
  )
  const [fetch, { data, isFetching, error }] = useLazyGetAspectQuery()

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
            category: DICTIONARY_ITEMS_CATEGORY.ASPECT,
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
            key={el.aspect + el.planetA + el.planetB}
            style={{ border: '1px solid red', padding: '1rem', marginBottom: '15px' }}
          >
            <div style={{ color: 'whitesmoke', whiteSpace: 'pre-wrap' }}>{el.text}</div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
