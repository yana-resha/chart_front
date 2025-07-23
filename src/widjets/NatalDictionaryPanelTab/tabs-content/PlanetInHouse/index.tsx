import { useCallback, useEffect, useMemo } from 'react'

import { useDispatch } from 'react-redux'

import { IPlanetsInHouseProps } from '../../types'
import { PostSkeleton } from '../../ui/PostSkeleton'
import { Layout, Title } from '../index.linaria'
import { DICTIONARY_ITEMS_CATEGORY } from '@/entities/astro-dictionary/types/dictionary-common.types'
import sunPng from '@/shared/assets/images/planets/sun.png'
import { ASTRO_HOUSE_SYMBOL } from '@/shared/configs/astro-houses.config'
import { ASTRO_PLANET_NAME, ASTRO_PLANET_SVG } from '@/shared/configs/astro-planets.config'
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
  const [fetch, { isError, isLoading }] = useLazyGetPlanetInHouseQuery()

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
  }, [chartId, dictionary.length, handleFetch])

  const renderItems = useMemo(
    () =>
      items
        .map((item) => {
          const dictMatch = dictionary.find((d) => d.planet === item.planet && d.house === item.house)

          if (!dictMatch) return null

          return {
            ...item,
            ...dictMatch, // добавим text и id и что там ещё
          }
        })
        .filter((i): i is NonNullable<typeof i> => i !== null), // удаляем null
    [items, dictionary],
  )

  return (
    <Layout>
      <div>
        {renderItems.length > 0 &&
          !isLoading &&
          !isError &&
          renderItems.map((el) => {
            const planetName = ASTRO_PLANET_NAME[el.planet]
            const PlanetSymbol = ASTRO_PLANET_SVG[el.planet]
            const houseSymbol = ASTRO_HOUSE_SYMBOL[el.house]

            return (
              <div key={el.planet + el.house}>
                <div style={{ border: '1px solid red', padding: '1rem', marginBottom: '15px' }}>
                  <div style={{ color: 'whitesmoke', whiteSpace: 'pre-wrap', textAlign: 'left' }}>
                    <Title>
                      <PlanetSymbol
                        width={'30px'}
                        height={'30px'}
                      />
                      {planetName} в {houseSymbol} доме
                    </Title>
                    <img
                      style={{ float: 'left' }}
                      src={sunPng}
                      width={'200px'}
                    />
                    <p>{el.text}</p>
                  </div>
                </div>
              </div>
            )
          })}
        {isLoading && <PostSkeleton />}
      </div>
    </Layout>
  )
}
