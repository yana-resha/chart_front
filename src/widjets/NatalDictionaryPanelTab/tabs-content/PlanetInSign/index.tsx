import { useCallback, useLayoutEffect, useMemo } from 'react'

import ReactMarkdown from 'react-markdown'
import { useDispatch } from 'react-redux'

import { ZODIAC_IN_PROPOSITIONAL } from '../../configs'
import { IPlanetsInSignProps } from '../../types'
import {
  Card,
  ContentWrapper,
  EmptyErrorCard,
  EmptyListCard,
  Header,
  Icon,
  ImageOverlay,
  InterpritationBlock,
  Layout,
  Subtitle,
  Title,
} from '../../ui/PostCard'
import { PostSkeleton } from '../../ui/PostSkeleton'
import { DICTIONARY_ITEMS_CATEGORY } from '@/entities/astro-dictionary/types/dictionary-common.types'
import { HamburgSymbol } from '@/shared/components/HamburgSymbol'
import {
  ASTRO_PLANET_IMAGE,
  ASTRO_PLANET_NAME,
  ASTRO_PLANET_SVG,
} from '@/shared/configs/astro-planets.config'
import { ASTRO_ZODIAC_COLOR, ASTRO_ZODIAC_SYMBOL } from '@/shared/configs/astro-zodiac.config'
import { formattedDegree, getDegreeInSign } from '@/shared/helpers/astro.helper'
import { formatText } from '@/shared/helpers/formatText'
import { ASTRO_CHART_VARIABLE } from '@/shared/types/astro/astro-commom.types'
import { useAppSelector } from '@/store'
import { useLazyGetPlanetInSignQuery } from '@/store/api/astro-dictionary.api'
import { updateNatalDictionaries } from '@/store/slices/natal-decoding'

export const PlanetInSign = ({ chartId, items }: IPlanetsInSignProps) => {
  const dispatch = useDispatch()
  const dictionary = useAppSelector(
    (store) => store.natalDecoding.chartsById[chartId].dictionaries[DICTIONARY_ITEMS_CATEGORY.PLANET_IN_SIGN],
  )
  const [fetch, { isLoading, isError }] = useLazyGetPlanetInSignQuery()
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
            items: result.data?.items ?? [],
          }),
        )
      }
    } catch (err) {
      console.error('Ошибка при получении данных:', err)
    }
  }, [chartId, dispatch, fetch, items])

  useLayoutEffect(() => {
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
            ...dictMatch,
          }
        })
        .filter((i): i is NonNullable<typeof i> => i !== null),
    [items, dictionary],
  )

  return (
    <Layout>
      {isLoading && <PostSkeleton count={items.length} />}
      {renderItems.length > 0 &&
        !isLoading &&
        !isError &&
        renderItems.map((el) => {
          const planetName = ASTRO_PLANET_NAME[el.planet]
          const PlanetSVG = ASTRO_PLANET_SVG[el.planet]
          const planetImage = ASTRO_PLANET_IMAGE[el.planet]
          const zodiacName = ZODIAC_IN_PROPOSITIONAL[el.sign]
          const zodiacSymbol = ASTRO_ZODIAC_SYMBOL[el.sign]
          const zodiacColor = ASTRO_ZODIAC_COLOR[el.sign]
          const { degree, minutes, seconds } = getDegreeInSign(el.planetLongitude)

          return (
            <Card
              key={el.planet + el.sign}
              glowColor={zodiacColor}
            >
              <ContentWrapper>
                <ImageOverlay src={planetImage} />
                <Header>
                  <Icon>
                    <PlanetSVG />
                  </Icon>
                  <div>
                    <Title>
                      {planetName} {zodiacName}
                    </Title>
                    <Subtitle>
                      {formattedDegree(degree)}{' '}
                      <HamburgSymbol style={{ color: zodiacColor }}>{zodiacSymbol}</HamburgSymbol>{' '}
                      {formattedDegree(minutes) + "''"} {formattedDegree(seconds) + "'"}
                    </Subtitle>
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

      {renderItems.length === 0 && !isLoading && !isError && <EmptyListCard />}

      {isError && !isLoading && <EmptyErrorCard />}
    </Layout>
  )
}
