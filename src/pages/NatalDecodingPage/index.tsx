import { useEffect, useMemo } from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'

import { HeaderContainer, Layout, PageTitle, SectionTitle } from './index.linaria'
import { DEFAULT_NATAL_CHART_ID } from '@/entities/astro-charts/constants'
import {
  DEMO_NATAL_CALCULATION,
  DEMO_NATAL_SOURCE_VALUE,
} from '@/entities/astro-charts/data/demo-calculations'
import { IFullNatalСalculations } from '@/entities/astro-charts/types/astro-charts.types'
import { Header } from '@/shared/components/Header'
import { ROUTER_PATHES } from '@/shared/constants/router-paths'
import { useAppSelector, store } from '@/store'
import { addNatalChart, removeNatalChart } from '@/store/slices/natal-decoding'
import { NatalCanvasPanel } from '@/widjets/NatalCanvasPanel'
import { NatalDictionaryPanelTab } from '@/widjets/NatalDictionaryPanelTab'
import { NatalSummaryPanelTab } from '@/widjets/NatalSummaryPanelTab'
import { NatalChartSourceData } from '@/widjets/NatalChartSourceData'

export const NatalDecodingPage = () => {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const rawChartId = useMemo(() => searchParams.get('chartId'), [location]) // 🔥 реагирует на ручное изменение URL
  const chartId = rawChartId ?? DEFAULT_NATAL_CHART_ID

  const chartValue = useAppSelector((store) => store.natalDecoding.chartsById[chartId])

  useEffect(() => {
    const isDefault = rawChartId === DEFAULT_NATAL_CHART_ID
    if (!chartValue) {
      // Перекидываем на дефолт, если id некорректный
      if (!isDefault) {
        navigate(`${ROUTER_PATHES.NATAL_DECODING_PATH}?chartId=${DEFAULT_NATAL_CHART_ID}`, {
          replace: true,
        })
      }

      const alreadyExists = store.getState().natalDecoding.chartsById[DEFAULT_NATAL_CHART_ID]
      if (!alreadyExists) {
        dispatch(
          addNatalChart({
            id: DEFAULT_NATAL_CHART_ID,
            sourceValue: DEMO_NATAL_SOURCE_VALUE,
            calculation: DEMO_NATAL_CALCULATION as unknown as IFullNatalСalculations,
          }),
        )
      }
    }
    // тут нужно разобраться, при размонтировании удаляется, но потом при монтировании не добавляется

    return () => {
      /* const wasDefault = chartId === DEFAULT_NATAL_CHART_ID
      if (wasDefault) {
        dispatch(removeNatalChart(DEFAULT_NATAL_CHART_ID))
      } */
    }
  }, [])

  return (
    <Layout>
      <HeaderContainer>
        <Header
          text="Калькулятор"
          showBackButton
          onClick={() => navigate(ROUTER_PATHES.CALCULATOR_PATH)}
        />
      </HeaderContainer>
      {chartValue && (
        <>
          <PageTitle>Расшифровка натальной карты{' '}💫</PageTitle>

          <SectionTitle>Исходные данные</SectionTitle>
          <div style={{ marginBottom: '30px' }}>
            <NatalChartSourceData chartId={chartId} />
          </div>

          <SectionTitle>Интерактивная натальная карта</SectionTitle>
          <div style={{ marginBottom: '30px' }}>
            <NatalCanvasPanel chartId={chartId} />
          </div>

          <SectionTitle>Основные значения карты</SectionTitle>
          <NatalSummaryPanelTab chartId={chartId} />

          <SectionTitle>Интерпретации</SectionTitle>
          <NatalDictionaryPanelTab chartId={chartId} />
        </>
      )}
    </Layout>
  )
}
