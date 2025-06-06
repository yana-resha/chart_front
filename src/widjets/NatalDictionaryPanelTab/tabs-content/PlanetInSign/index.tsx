import { useCallback, useEffect, useMemo } from 'react'

import { useDispatch } from 'react-redux'

import { ZODIAC_IN_PROPOSITIONAL } from '../../configs'
import { IPlanetsInSignProps } from '../../types'
import { Layout, Title } from '../index.linaria'
import { DICTIONARY_ITEMS_CATEGORY } from '@/entities/astro-dictionary/types/dictionary-common.types'
import sunPng from '@/shared/assets/images/planets/sun.png'
import { HamburgSymbol } from '@/shared/components/HamburgSymbol'
import { ASTRO_PLANET_NAME, ASTRO_PLANET_SVG } from '@/shared/configs/astro-planets.config'
import { ASTRO_ZODIAC_COLOR, ASTRO_ZODIAC_SYMBOL } from '@/shared/configs/astro-zodiac.config'
import { formattedDegree, getDegreeInSign } from '@/shared/helpers/astro.helper'
import { ASTRO_CHART_VARIABLE } from '@/shared/types/astro/astro-commom.types'
import { useAppSelector } from '@/store'
import { useLazyGetPlanetInSignQuery } from '@/store/api/astro-dictionary.api'
import { updateNatalDictionaries } from '@/store/slices/natal-decoding'

export const PlanetInSign = ({ chartId, items }: IPlanetsInSignProps) => {
  const dispatch = useDispatch()
  const dictionary = useAppSelector(
    (store) => store.natalDecoding.chartsById[chartId].dictionaries[DICTIONARY_ITEMS_CATEGORY.PLANET_IN_SIGN],
  )
  const [fetch, { data, isFetching, error }] = useLazyGetPlanetInSignQuery()

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
            category: DICTIONARY_ITEMS_CATEGORY.PLANET_IN_SIGN,
            items: result.data?.items ?? [], // <== здесь то, что вернёт сервер
          }),
        )
      }
    } catch (err) {
      console.error('Ошибка при получении данных:', err)
    }
  }, [chartId, dispatch, fetch, items])

  useEffect(() => {
    if (dictionary.length <= 0) {
      handleFetch()
    }
  }, [chartId, dictionary.length, handleFetch])

  const renderItems = useMemo(
    () =>
      items
        .map((item) => {
          const dictMatch = dictionary.find((d) => d.planet === item.planet && d.sign === item.sign)

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
        {renderItems.map((el) => {
          const planetName = ASTRO_PLANET_NAME[el.planet]
          const PlanetSymbol = ASTRO_PLANET_SVG[el.planet]
          const zodiacName = ZODIAC_IN_PROPOSITIONAL[el.sign]
          const zodiacSymbol = ASTRO_ZODIAC_SYMBOL[el.sign]
          const zodiacColor = ASTRO_ZODIAC_COLOR[el.sign]
          const { degree, minutes, seconds } = getDegreeInSign(el.planetLongitude)

          return (
            <div key={el.planet + el.sign}>
              <Title>
                <PlanetSymbol
                  width={'30px'}
                  height={'30px'}
                />
                {planetName} {zodiacName} {formattedDegree(degree)}
                <HamburgSymbol style={{ color: zodiacColor }}>{zodiacSymbol}</HamburgSymbol>{' '}
                {formattedDegree(minutes) + "''"} {formattedDegree(seconds) + "'"}
              </Title>
              <div style={{ border: '1px solid red', padding: '1rem', marginBottom: '15px' }}>
                <div style={{ color: 'whitesmoke', whiteSpace: 'pre-wrap' }}>
                  <img
                    src={sunPng}
                    width={'200px'}
                  />
                  {el.text}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}
