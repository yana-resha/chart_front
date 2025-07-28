import { useCallback, useEffect, useMemo } from 'react'

import ReactMarkdown from 'react-markdown'
import { useDispatch } from 'react-redux'

import { ZODIAC_IN_PROPOSITIONAL } from '../../configs'
import { IHouseInSignProps } from '../../types'
import {
  Card,
  ContentWrapper,
  Header,
  InterpritationBlock,
  Layout,
  Subtitle,
  Title,
  Highlight,
  TitleLine,
  TitleSubTag,
  EmptyListCard,
  EmptyErrorCard,
} from '../../ui/PostCard'
import { PostSkeleton } from '../../ui/PostSkeleton'
import { DICTIONARY_ITEMS_CATEGORY } from '@/entities/astro-dictionary/types/dictionary-common.types'
import { HamburgSymbol } from '@/shared/components/HamburgSymbol'
import { ASTRO_HOUSE_SUBNAME, ASTRO_HOUSE_SYMBOL } from '@/shared/configs/astro-houses.config'
import { ASTRO_ZODIAC_COLOR, ASTRO_ZODIAC_SYMBOL } from '@/shared/configs/astro-zodiac.config'
import { formattedDegree, getDegreeInSign } from '@/shared/helpers/astro.helper'
import { formatText } from '@/shared/helpers/formatText'
import { ASTRO_CHART_VARIABLE } from '@/shared/types/astro/astro-commom.types'
import { useAppSelector } from '@/store'
import { useLazyGetHouseInSignQuery } from '@/store/api/astro-dictionary.api'
import { updateNatalDictionaries } from '@/store/slices/natal-decoding'

export const HouseInSign = ({ chartId, items }: IHouseInSignProps) => {
  const dispatch = useDispatch()

  // Получаем весь словарь HOUSE_IN_SIGN
  const dictionary = useAppSelector(
    (store) =>
      store.natalDecoding.chartsById[chartId]?.dictionaries[DICTIONARY_ITEMS_CATEGORY.HOUSE_IN_SIGN] ?? [],
  )

  const [fetch, { isLoading, isError }] = useLazyGetHouseInSignQuery()

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
            category: DICTIONARY_ITEMS_CATEGORY.HOUSE_IN_SIGN,
            items: result.data.items,
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
          const dictMatch = dictionary.find((d) => d.house === item.house && d.sign === item.sign)

          if (!dictMatch) return null

          return {
            ...item,
            ...dictMatch, // добавим text и id и что там ещё
          }
        })
        .filter((i): i is NonNullable<typeof i> => i !== null) // удаляем null
        .sort((a, b) => {
          if (a.house < b.house) {
            return -1
          }

          return 1
        }),
    [dictionary, items],
  )

  return (
    <Layout>
      {renderItems.length > 0 &&
        !isLoading &&
        !isError &&
        renderItems.map((el) => {
          const houseSymbol = ASTRO_HOUSE_SYMBOL[el.house]
          const houseAltername = ASTRO_HOUSE_SUBNAME[el.house]

          const zodiacName = ZODIAC_IN_PROPOSITIONAL[el.sign]
          const zodiacSymbol = ASTRO_ZODIAC_SYMBOL[el.sign]
          const zodiacColor = ASTRO_ZODIAC_COLOR[el.sign]
          const { degree, minutes, seconds } = getDegreeInSign(el.houseLongitude)

          return (
            <Card
              key={el.house + el.sign}
              glowColor={zodiacColor}
            >
              <ContentWrapper>
                <Header>
                  <div>
                    <TitleLine>
                      <Title>
                        <Highlight>{houseSymbol}</Highlight> дом {zodiacName}
                      </Title>
                      {houseAltername && <TitleSubTag>({houseAltername})</TitleSubTag>}
                    </TitleLine>

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

      {isLoading && <PostSkeleton count={items.length} />}
      {renderItems.length === 0 && !isLoading && !isError && <EmptyListCard />}

      {isError && !isLoading && <EmptyErrorCard />}
    </Layout>
  )
}
