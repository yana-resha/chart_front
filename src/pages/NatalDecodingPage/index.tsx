import { useCallback, useEffect, useMemo, useState } from 'react'

import { nanoid } from 'nanoid'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { Layout, layoutLoading, WidjetsWrapper } from './index.linaria'
import { PageSkeleton } from './ui/PageSkeleton'
import { DEFAULT_NATAL_CHART_ID } from '@/entities/astro-charts/constants'
import { IBasicCalculatorRequest } from '@/entities/astro-charts/types/calculator-request.types'
import { SharedButton } from '@/features/SharedButton'
import InfoIcon from '@/shared/assets/icons/info-circle.svg?react'
import { SHARED_COLORS_VARIABLES } from '@/shared/assets/styles/colors'
import { PageContentWrapper } from '@/shared/assets/styles/pages.linaria'
import { PageTitle, SectionTitle } from '@/shared/assets/styles/titles.linaria'
import { HeaderBackButton } from '@/shared/components/HeaderBackButton'
import { AlertModal } from '@/shared/components/Modal'
import { PageHeader } from '@/shared/components/PageHeader'
import { ROUTER_PATHES } from '@/shared/constants/router-paths'
import { decodeRequestFromQuery, encodeRequestToQuery } from '@/shared/helpers/shareRequest'
import { useAppSelector } from '@/store'
import { usePostCalculateNatalMutation } from '@/store/api/astro-calculate.api'
import { addNatalChart } from '@/store/slices/natal-decoding'
import { NatalCanvasPanel } from '@/widjets/NatalCanvasPanel'
import { NatalChartSourceData } from '@/widjets/NatalChartSourceData'
import { NatalDictionaryPanelTab } from '@/widjets/NatalDictionaryPanelTab'
import { NatalSummaryPanelTab } from '@/widjets/NatalSummaryPanelTab'

export const NatalDecodingPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [postNatalChart] = usePostCalculateNatalMutation()

  // --- состояния загрузки и ошибок ---
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [dataError, setDataError] = useState<string | null>(null)

  // --- параметры из URL (реагируют на ручную правку) ---
  const rawChartId = useMemo(() => searchParams.get('chartId'), [searchParams])
  const paramsChart = useMemo(() => searchParams.get('r'), [searchParams])
  const chartId = rawChartId ?? DEFAULT_NATAL_CHART_ID

  const chartValue = useAppSelector((store) => store.natalDecoding.chartsById[chartId])

  /** единый вызов расчёта + запись в стор + навигация */
  const postNatal = useCallback(
    async (request: IBasicCalculatorRequest) => {
      setServerError(null)
      setIsLoading(true)
      try {
        const r = encodeRequestToQuery(request)
        const response = await postNatalChart(request).unwrap()

        if (response?.success === true && response.data) {
          const { sourceData, result } = response.data
          const newChartId = nanoid()

          dispatch(
            addNatalChart({
              id: newChartId,
              sourceValue: sourceData,
              calculation: result,
            }),
          )

          navigate(`${ROUTER_PATHES.NATAL_DECODING_PATH}?chartId=${newChartId}&r=${r}`, { replace: true })
        } else {
          throw new Error('SERVER_RESPONSE_INVALID')
        }
      } catch {
        // серверная/сетевоая ошибка — показываем вторую модалку
        setServerError('Произошла ошибка сервера. Попробуйте повторить загрузку.')
      } finally {
        setIsLoading(false)
      }
    },
    [dispatch, navigate, postNatalChart],
  )

  /** ретрай: повторяем попытку с тем, что в URL (если ок), иначе уходим к калькулятору */
  const handleRetry = useCallback(() => {
    const fromUrl = decodeRequestFromQuery<IBasicCalculatorRequest>(paramsChart)
    if (fromUrl) {
      void postNatal(fromUrl)
    } else {
      navigate(ROUTER_PATHES.CALCULATOR_PATH)
    }
  }, [navigate, paramsChart, postNatal])

  /** перейти к калькулятору */
  const goToCalculator = useCallback(() => {
    navigate(ROUTER_PATHES.CALCULATOR_PATH)
  }, [navigate])

  // --- первичная инициализация по URL ---
  useEffect(() => {
    if (chartValue) return // уже есть расчёт — ничего не делаем

    const fromUrl = decodeRequestFromQuery<IBasicCalculatorRequest>(paramsChart)

    if (!fromUrl) {
      setDataError('Рассчётные данные отсутствуют или повреждены.')

      return
    }

    // данные валидны — запускаем расчёт
    void postNatal(fromUrl)
  }, [chartValue, paramsChart, postNatal])

  return (
    <Layout className={isLoading || serverError ? layoutLoading : ''}>
      <PageHeader>
        <>
          <HeaderBackButton />
          <SharedButton
            shareUrl={window.location.href}
            title="Моя натальная карта"
            messageText="✨ Моя натальная карта"
            buttonText="Поделиться картой"
            description="Нажми, чтобы скопировать и отправить друзьям"
          />
        </>
      </PageHeader>

      <PageContentWrapper>
        <PageTitle>Расшифровка натальной&nbsp;карты&nbsp;💫</PageTitle>
        {/* Скелетон, пока грузимся или пока ещё не получили chartValue */}
        {(!chartValue || isLoading) && <PageSkeleton />}

        {/* Основное содержимое — только когда нет загрузки/ошибок и есть данные */}
        {!isLoading && !serverError && !dataError && chartValue && (
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
              <SectionTitle>Интерпретации</SectionTitle>
              <NatalDictionaryPanelTab chartId={chartId} />
            </section>

{/*             

            <section>
              <SectionTitle>Основные значения карты</SectionTitle>
              <NatalSummaryPanelTab chartId={chartId} />
            </section>

            */}
          </WidjetsWrapper>
        )}
      </PageContentWrapper>

      {/* Модалка №1: ошибка сервера — 2 кнопки (повторить / вернуться) */}
      {!isLoading && serverError && (
        <AlertModal
          showExitCross={true}
          title={'Упс...'}
          subtitle={
            <>
              Похоже что то сломалось. <br /> Попробуйте повторить загрузку или вернитесь к калькулятору.
            </>
          }
          primaryButtonText={'Повторить'}
          onPrimaryClick={handleRetry}
          secondaryButtonText={'Вернуться'}
          onClose={goToCalculator}
          icon={<InfoIcon stroke={SHARED_COLORS_VARIABLES.ERROR_COLOR} />}
        />
      )}

      {/* Модалка №2: данные повреждены — 1 кнопка (к калькулятору) */}
      {!isLoading && !serverError && dataError && (
        <AlertModal
          showExitCross={true}
          title={'Данные повреждены'}
          subtitle={<>{dataError} Вернитесь к калькулятору.</>}
          secondaryButtonText={'Вернуться'}
          onSecondaryClick={goToCalculator}
          onClose={goToCalculator}
          icon={<InfoIcon stroke={SHARED_COLORS_VARIABLES.ERROR_COLOR} />}
        />
      )}
    </Layout>
  )
}
