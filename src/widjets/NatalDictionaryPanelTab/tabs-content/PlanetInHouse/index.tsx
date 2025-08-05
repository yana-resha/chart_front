import { useCallback, useLayoutEffect, useMemo } from 'react'

import ReactMarkdown from 'react-markdown'
import { useDispatch } from 'react-redux'

import { HighlightPlanet, PlanetInHouseTitleLine } from './index.linaria'
import { IPlanetsInHouseProps } from '../../types'
import {
  Card,
  ContentWrapper,
  EmptyErrorCard,
  EmptyListCard,
  Header,
  ImageOverlay,
  InterpritationBlock,
  Layout,
  Title,
} from '../../ui/PostCard'
import { PostSkeleton } from '../../ui/PostSkeleton'
import { DICTIONARY_ITEMS_CATEGORY } from '@/entities/astro-dictionary/types/dictionary-common.types'
import { ASTRO_HOUSE_SYMBOL } from '@/shared/configs/astro-houses.config'
import {
  ASTRO_PLANET_IMAGE,
  ASTRO_PLANET_NAME,
  ASTRO_PLANET_SVG,
} from '@/shared/configs/astro-planets.config'
import { formatText } from '@/shared/helpers/formatText'
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

  useLayoutEffect(() => {
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
      {renderItems.length > 0 &&
        !isLoading &&
        !isError &&
        renderItems.map((el) => {
          const planetName = ASTRO_PLANET_NAME[el.planet]
          const PlanetSVG = ASTRO_PLANET_SVG[el.planet]
          const planetImage = ASTRO_PLANET_IMAGE[el.planet]
          const houseSymbol = ASTRO_HOUSE_SYMBOL[el.house]

          return (
            <Card key={el.planet + el.house}>
              <ContentWrapper>
                <ImageOverlay src={planetImage} />
                <Header>
                  <div>
                    <PlanetInHouseTitleLine>
                      <HighlightPlanet>
                        <PlanetSVG />
                      </HighlightPlanet>{' '}
                      <Title>
                        {planetName} в {houseSymbol} доме
                      </Title>
                    </PlanetInHouseTitleLine>
                  </div>
                </Header>
                <InterpritationBlock>
                  {formatText(el.text ?? '').map((el, index) => (
                    <ReactMarkdown key={index}>{el}</ReactMarkdown>
                  ))}
                </InterpritationBlock>
              </ContentWrapper>
            </Card>
          )
        })}
      {isLoading && <PostSkeleton count={items.length} />}
      {renderItems.length === 0 && !isLoading && !isError && <EmptyListCard />}

      {isError && !isLoading && <EmptyErrorCard />}
    </Layout>
  )
}
