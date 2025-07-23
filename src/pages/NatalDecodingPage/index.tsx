import { useEffect, useMemo } from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'

import { HeaderContainer, Layout } from './index.linaria'
import { DEFAULT_NATAL_CHART_ID } from '@/entities/astro-charts/constants'
import { DEMO_NATAL_CALCULATION } from '@/entities/astro-charts/data/demo-calculations'
import {
  ISingleChartSourceData,
  IFullNatalСalculations,
} from '@/entities/astro-charts/types/astro-charts.types'
import { Header } from '@/shared/components/Header'
import { ROUTER_PATHES } from '@/shared/constants/router-paths'
import { useAppSelector, store } from '@/store'
import { addNatalChart, removeNatalChart } from '@/store/slices/natal-decoding'
import { NatalCanvasPanel } from '@/widjets/NatalCanvasPanel'
import { NatalDictionaryPanelTab } from '@/widjets/NatalDictionaryPanelTab'
import { NatalSummaryPanelTab } from '@/widjets/NatalSummaryPanelTab'

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
            sourceValue: {} as ISingleChartSourceData,
            calculation: DEMO_NATAL_CALCULATION as unknown as IFullNatalСalculations,
          }),
        )
      }
    }

    return () => {
      const wasDefault = chartId === DEFAULT_NATAL_CHART_ID
      if (wasDefault) {
        dispatch(removeNatalChart(DEFAULT_NATAL_CHART_ID))
      }
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
          <NatalCanvasPanel chartId={chartId} />
          <NatalSummaryPanelTab chartId={chartId} />
          <NatalDictionaryPanelTab chartId={chartId} />
        </>
      )}
    </Layout>
  )
}
