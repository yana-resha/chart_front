import { useState } from 'react'

import { FormikHelpers } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ChartFormFieldValues } from '../types'
import { astroChartMappers } from '../utils/mapValuesToRequest'
import { ASTRO_CHART_VARIABLE, IFullNatalChart } from '@/entities/astro-charts/types/astro-chart'
import { ROUTER_PATHES } from '@/shared/constants/router-paths'
import { sleep } from '@/shared/helpers/sleep'
import { usePostNatalChartMutation } from '@/store/api/astro.api'
import { addChartValue } from '@/store/slices/astro-decoding'

export const useFormOutside = () => {
  const [postNatalChart] = usePostNatalChartMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formIsLoading, setFormIsLoading] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  // Функция, которая вызывается после успешного сабмита — навигация и т.п.
  const onSuccess = (chartType: ASTRO_CHART_VARIABLE, data: unknown) => {
    switch (chartType) {
      case ASTRO_CHART_VARIABLE.NATAL_CHART:
        navigate(ROUTER_PATHES.ASTRO_DECODING_PATH)
        dispatch(addChartValue({ chart_type: chartType, ...(data as IFullNatalChart) }))
        break
      default:
        console.warn('Навигация для этого типа карты не реализована')
    }
  }

  // Обработчики по типу карты
  const chartSubmitHandlers = {
    [ASTRO_CHART_VARIABLE.NATAL_CHART]: async (
      values: Extract<ChartFormFieldValues, { chart_type: ASTRO_CHART_VARIABLE.NATAL_CHART }>,
      helpers: FormikHelpers<ChartFormFieldValues>,
    ) => {
      const request = astroChartMappers[ASTRO_CHART_VARIABLE.NATAL_CHART](values)

      return await postNatalChart(request).unwrap()
    },

    [ASTRO_CHART_VARIABLE.CHOROSCOPE]: async () => {
      console.warn('CHOROSCOPE пока не реализован')

      return null
    },
  }

  const formSubmit = async (values: ChartFormFieldValues, helpers: FormikHelpers<ChartFormFieldValues>) => {
    helpers.setStatus({ submitError: false })
    setIsRedirecting(false)
    setFormIsLoading(true)
    try {
      const handler = chartSubmitHandlers[values.chart_type]
      if (!handler) {
        console.warn(`Нет обработчика для типа ${values.chart_type}`)

        return null
      }

      const result = await handler(values as any, helpers)
      if (result?.success === true && result.data) {
        setIsRedirecting(true)
        await sleep(700)
        onSuccess(values.chart_type, result.data)
      } else {
        throw new Error('Не удалось получить ответ сервера')
      }
    } catch (error) {
      console.error('Ошибка при отправке формы:', error)
      setFormIsLoading(false)
      await sleep(500)
      helpers.setStatus({ submitError: 'Ошибка получения ответа сервера' })
    } finally {
      setFormIsLoading(false)
      setIsRedirecting(false)
    }
  }

  return { formSubmit, formIsLoading, isRedirecting }
}
