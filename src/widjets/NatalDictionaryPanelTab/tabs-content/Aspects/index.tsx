import { useCallback, useLayoutEffect, useMemo } from 'react'

import ReactMarkdown from 'react-markdown'
import { useDispatch } from 'react-redux'

import { AspectTag } from './index.linaria'
import { IAspectsProps } from '../../types'
import {
  Card,
  ContentWrapper,
  EmptyErrorCard,
  EmptyListCard,
  Header,
  Icon,
  InterpritationBlock,
  Layout,
  Subtitle,
  Title,
} from '../../ui/PostCard'
import { PostSkeleton } from '../../ui/PostSkeleton'
import { DICTIONARY_ITEMS_CATEGORY } from '@/entities/astro-dictionary/types/dictionary-common.types'
import { HamburgSymbol } from '@/shared/components/HamburgSymbol'
import {
  ASTRO_ASPECT_COLOR,
  ASTRO_ASPECT_NAME,
  ASTRO_ASPECT_SYMBOL,
} from '@/shared/configs/astro-aspects.config'
import { ASTRO_PLANET_NAME } from '@/shared/configs/astro-planets.config'
import { sortAspectsByPlanetAndAspectPriority } from '@/shared/helpers/astro/sortAspects'
import { formatText } from '@/shared/helpers/formatText'
import { ASTRO_CHART_VARIABLE } from '@/shared/types/astro/astro-commom.types'
import { useAppSelector } from '@/store'
import { useLazyGetAspectQuery } from '@/store/api/astro-dictionary.api'
import { updateNatalDictionaries } from '@/store/slices/natal-decoding'

export const Aspects = ({ chartId, items }: IAspectsProps) => {
  const dispatch = useDispatch()
  const dictionary = useAppSelector(
    (store) => store.natalDecoding.chartsById[chartId].dictionaries[DICTIONARY_ITEMS_CATEGORY.ASPECT],
  )
  const [fetch, { isLoading, isError }] = useLazyGetAspectQuery()

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

  useLayoutEffect(() => {
    if (dictionary.length <= 0) {
      handleFetch()
    }
  }, [chartId, dictionary.length, handleFetch])

  const renderItems = useMemo(
    () => {
      const arr = items
        .map((item) => {
          const dictMatch = dictionary.find(
            (d) =>
              d.aspect === item.aspect &&
              ((d.planetA === item.planetA && d.planetB === item.planetB) ||
                (d.planetA === item.planetB && d.planetB === item.planetA)),
          )

          if (!dictMatch) return null

          return {
            ...dictMatch,
            ...item,
            aspectType: item.aspect, // это для функции сортировки
          }
        })
        .filter((i): i is NonNullable<typeof i> => i !== null)

      // возвращаем сортированный по приоритетности планет массив
      return sortAspectsByPlanetAndAspectPriority(arr)
    }, // удаляем null,,
    [dictionary, items],
  )

  return (
    <Layout>
      {renderItems.length > 0 &&
        !isLoading &&
        !isError &&
        renderItems.map((el) => {
          const aspectSymbol = ASTRO_ASPECT_SYMBOL[el.aspect]
          const aspectName = ASTRO_ASPECT_NAME[el.aspect].toLocaleLowerCase()
          const aspectColor = ASTRO_ASPECT_COLOR[el.aspect]
          const planetAName = ASTRO_PLANET_NAME[el.planetA]
          const planetBName = ASTRO_PLANET_NAME[el.planetB]

          const degree = (el.angle + el.orb).toFixed(2) + ''

          return (
            <Card
              key={el.aspect + el.planetA + el.planetB}
              glowColor={aspectColor}
            >
              <ContentWrapper>
                <Header>
                  <Icon>
                    <HamburgSymbol style={{ color: aspectColor }}>{aspectSymbol}</HamburgSymbol>
                  </Icon>

                  <div>
                    <Title>
                      {planetAName} <AspectTag color={aspectColor}>{aspectName}</AspectTag> {planetBName}
                    </Title>

                    <Subtitle>{degree + '°'}</Subtitle>
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
