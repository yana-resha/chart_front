import { useEffect, useMemo, useState } from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'

import { Layout, layoutLoading, WidjetsWrapper } from './index.linaria'
import { PageSkeleton } from './ui/PageSkeleton'
import { DEFAULT_NATAL_CHART_ID } from '@/entities/astro-charts/constants'
import {
  DEMO_NATAL_CALCULATION,
  DEMO_NATAL_SOURCE_VALUE,
} from '@/entities/astro-charts/data/demo-calculations'
import { IFullNatalСalculations } from '@/entities/astro-charts/types/astro-charts.types'
import { SharedButton } from '@/features/SharedButton'
import InfoIcon from '@/shared/assets/icons/info-circle.svg?react'
import { SHARED_COLORS_VARIABLES } from '@/shared/assets/styles/colors'
import { PageTitle, SectionTitle } from '@/shared/assets/styles/titles.linaria'
import { HeaderBackButton } from '@/shared/components/HeaderBackButton'
import { AlertModal } from '@/shared/components/Modal'
import { PageHeader } from '@/shared/components/PageHeader'
import { ROUTER_PATHES } from '@/shared/constants/router-paths'
import { useAppSelector, store } from '@/store'
import { addNatalChart, removeNatalChart } from '@/store/slices/natal-decoding'
import { NatalCanvasPanel } from '@/widjets/NatalCanvasPanel'
import { NatalChartSourceData } from '@/widjets/NatalChartSourceData'
import { NatalDictionaryPanelTab } from '@/widjets/NatalDictionaryPanelTab'
import { NatalSummaryPanelTab } from '@/widjets/NatalSummaryPanelTab'
import { PageContentWrapper } from '@/shared/assets/styles/pages.linaria'

export const NatalDecodingPage = () => {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setIsError] = useState(false)

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
    <Layout className={isLoading || error ? layoutLoading : ''}>
      <PageHeader>
        <>
          <HeaderBackButton />
          <SharedButton
            shareUrl="https://astrodoc.ru/natal-decoding?name=Ирина&..."
            title="Моя натальная карта"
            messageText="✨ Моя натальная карта"
            buttonText="Поделиться картой"
            description="Нажми, чтобы скопировать и отправить друзьям"
          />
        </>
      </PageHeader>
      <PageContentWrapper>
        <PageTitle>Расшифровка натальной карты 💫</PageTitle>
        {(isLoading || error) && <PageSkeleton />}
        {!isLoading && !error && chartValue && (
          <WidjetsWrapper>
            <section>
              <SectionTitle>Исходные данные</SectionTitle>
              <NatalChartSourceData chartId={chartId} />
            </section>

            <section>
              <SectionTitle>Интерактивная натальная карта</SectionTitle>
              <NatalCanvasPanel chartId={chartId} />
            </section>

            <section>
              <SectionTitle>Основные значения карты</SectionTitle>
              <NatalSummaryPanelTab chartId={chartId} />
            </section>

            <section>
              <SectionTitle>Интерпретации</SectionTitle>
              <NatalDictionaryPanelTab chartId={chartId} />
            </section>
          </WidjetsWrapper>
        )}
      </PageContentWrapper>
      {!isLoading && error && (
        <AlertModal
          showExitCross={true}
          title={'Ошибка сервера'}
          subtitle={
            <>
              Прозошла ошибка сервера, попробуйте повторить загрузку <br /> или вернитесь к калькулятору
            </>
          }
          primaryButtonText={'Повторить'}
          onPrimaryClick={() => {}}
          secondaryButtonText={'Вернуться'}
          icon={<InfoIcon stroke={SHARED_COLORS_VARIABLES.ERROR_COLOR} />}
          onClose={() => setIsError(false)}
        />
      )}
    </Layout>
  )
}
