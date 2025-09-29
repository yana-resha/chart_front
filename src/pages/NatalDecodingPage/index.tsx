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
import { H1, H2 } from '@/shared/assets/styles/titles.linaria'
import { HeaderBackButton } from '@/shared/components/HeaderBackButton'
import { AlertModal } from '@/shared/components/Modal'
import { PageHeader } from '@/shared/components/PageHeader'
import { SeoHelmet } from '@/shared/components/SeoHelmet'
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
      <SeoHelmet
        title="Ваша натальная карта и гороскоп онлайн — подробная расшифровка"
        description="Ваша натальная карта и гороскоп онлайн в ASTRODOC. Все функции абсолютно бесплатны: полная расшифровка планет, домов, аспектов и конфигураций. Получите персональный анализ вашей астрологической карты."
      />
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
        <H1>Расшифровка натальной&nbsp;карты&nbsp;💫</H1>
        {/* Скелетон, пока грузимся или пока ещё не получили chartValue */}
        {(!chartValue || isLoading) && <PageSkeleton />}

        {/* Основное содержимое — только когда нет загрузки/ошибок и есть данные */}
        {!isLoading && !serverError && !dataError && chartValue && (
          <WidjetsWrapper>
            <section>
              <H2>Исходные данные</H2>
              <NatalChartSourceData chartId={chartId} />
            </section>

            <section>
              <H2>Интерактивная натальная карта</H2>
              <NatalCanvasPanel chartId={chartId} />
            </section>

            <section>
              <H2>Основные значения карты</H2>
              <NatalSummaryPanelTab chartId={chartId} />
            </section>

            <section>
              <H2>Интерпретации</H2>
              <NatalDictionaryPanelTab chartId={chartId} />
            </section>
          </WidjetsWrapper>
        )}
      </PageContentWrapper>

      {/* Модалка №1: ошибка сервера — 2 кнопки (повторить / вернуться) */}
      <AlertModal
        open={!isLoading && serverError ? true : false}
        showExitCross={false}
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

      <AlertModal
        open={!isLoading && !serverError && dataError ? true : false}
        showExitCross={false}
        title={'Данные повреждены'}
        subtitle={
          <>
            {dataError}
            <br /> Вернитесь к калькулятору.
          </>
        }
        secondaryButtonText={'Вернуться'}
        onSecondaryClick={goToCalculator}
        onClose={goToCalculator}
        icon={<InfoIcon stroke={SHARED_COLORS_VARIABLES.ERROR_COLOR} />}
      />
    </Layout>
  )
}
