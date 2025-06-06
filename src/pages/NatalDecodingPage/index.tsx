import { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { HeaderContainer } from './index.linaria'
import { DEFAULT_NATAL_CHART_ID } from '@/entities/astro-charts/constants'
import { DEMO_NATAL_CALCULATION } from '@/entities/astro-charts/data/demo-calculations'
import {
  IFullNatalСalculations,
  ISingleChartSourceData,
} from '@/entities/astro-charts/types/astro-charts.types'
import { Header } from '@/shared/components/Header'
import { ROUTER_PATHES } from '@/shared/constants/router-paths'
import { store, useAppSelector } from '@/store'
import { addNatalChart, removeNatalChart } from '@/store/slices/natal-decoding'
import { NatalCanvasPanel } from '@/widjets/NatalCanvasPanel'
import { NatalSummaryPanelTab } from '@/widjets/NatalSummaryPanelTab'

export const NatalDecodingPage = () => {
  const [searchParams] = useSearchParams()
  const chartId = searchParams.get('chartId')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const chartValue = useAppSelector(
    (store) => store.natalDecoding.chartsById[chartId ?? DEFAULT_NATAL_CHART_ID],
  )

  useEffect(() => {
    if (!chartValue) {
      // Навигация на дефолтную карту, если chartId отсутствует
      navigate(`${ROUTER_PATHES.NATAL_DECODING_PATH}?chartId=${DEFAULT_NATAL_CHART_ID}`, { replace: true })

      // Проверим, есть ли уже такая карта
      const alreadyExists = store.getState().natalDecoding.chartsById[DEFAULT_NATAL_CHART_ID]
      if (!alreadyExists) {
        dispatch(
          addNatalChart({
            id: DEFAULT_NATAL_CHART_ID,
            sourceValue: {} as ISingleChartSourceData, // можно добавить реалистичные данные
            calculation: DEMO_NATAL_CALCULATION as unknown as IFullNatalСalculations,
          }),
        )
      }
    }

    return () => {
      const wasDefault = store.getState().natalDecoding.chartsById[DEFAULT_NATAL_CHART_ID]
      if (wasDefault) {
        dispatch(removeNatalChart(DEFAULT_NATAL_CHART_ID))
      }
    }
  }, [])

  return (
    <div>
      <HeaderContainer>
        <Header
          text="Калькулятор"
          showBackButton
          onClick={() => navigate(ROUTER_PATHES.CALCULATOR_PATH)}
        />
      </HeaderContainer>
      {chartValue && (
        <>
          <NatalCanvasPanel chartId={chartId ?? DEFAULT_NATAL_CHART_ID} />
          <NatalSummaryPanelTab chartId={chartId ?? DEFAULT_NATAL_CHART_ID} />
        </>
      )}
    </div>
  )
}
