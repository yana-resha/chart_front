import { useState } from 'react'

import { FormikHelpers } from 'formik'
import { nanoid } from 'nanoid'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ChartFormFieldValues } from '../types'
import { natalChartRequestMapper } from '../utils/mapValuesToRequest'
import { IFullNatalChartResult } from '@/entities/astro-charts/types/calculator-response.types'
import { ROUTER_PATHES } from '@/shared/constants/router-paths'
import { sleep } from '@/shared/helpers/sleep'
import { usePostCalculateNatalMutation } from '@/store/api/astro-calculate.api'
import { addNatalChart } from '@/store/slices/natal-decoding'

export const useFormOutside = () => {
  const [postNatalChart] = usePostCalculateNatalMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formIsLoading, setFormIsLoading] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  // Функция, которая вызывается после успешного сабмита — навигация и т.п.
  const onSuccess = (data: IFullNatalChartResult) => {
    const { sourceData, result } = data as IFullNatalChartResult
    const chartId = nanoid()
    navigate(`${ROUTER_PATHES.NATAL_DECODING_PATH}?chartId=${chartId}`)
    dispatch(
      addNatalChart({
        id: chartId,
        sourceValue: sourceData,
        calculation: result,
      }),
    )
  }

  const formSubmit = async (values: ChartFormFieldValues, helpers: FormikHelpers<ChartFormFieldValues>) => {
    helpers.setStatus({ submitError: false })
    setIsRedirecting(false)
    setFormIsLoading(true)
    try {
      const request = natalChartRequestMapper(values)
      const result = await postNatalChart(request).unwrap()
      if (result?.success === true && result.data) {
        setIsRedirecting(true)
        await sleep(700)
        onSuccess(result.data)
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
