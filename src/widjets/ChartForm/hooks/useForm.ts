import { useEffect } from 'react'

import { useFormikContext } from 'formik'
import { useNavigate } from 'react-router-dom'

import { ChartFormFieldValues, IInputLocality } from '../types'
import { ITimezoneSelectList } from '@/entities/astro-charts/data/calculator'
import { CalculatorRequestKeys } from '@/entities/astro-charts/types/calculator'
import { useLazyGetLocalitiesByNameQuery } from '@/store/api/locality.api'

export const useForm = () => {
  const navigate = useNavigate()
  const { values, submitForm, isSubmitting, setFieldValue } = useFormikContext<ChartFormFieldValues>()
  const [
    fetchFromAPI,
    { currentData: localitiesList, isError: isLocalitiesError, isFetching: isLocalitiesLoading },
  ] = useLazyGetLocalitiesByNameQuery()

  const handlerBtnSubmit = async () => {
    const resp = await submitForm()
  }

  const timezoneHadleChange = (value: ITimezoneSelectList) => {
    if (value.default) {
      setFieldValue('is_timezone_auto', true)
      setFieldValue(CalculatorRequestKeys.timezone, 0)
    } else {
      setFieldValue('is_timezone_auto', false)
      setFieldValue(CalculatorRequestKeys.timezone, value.value)
    }
  }

  useEffect(() => {
    if (values.searchLocality.length >= 3 && !values.locality) {
      const { abort } = fetchFromAPI({ value: values.searchLocality }, true)

      return () => abort()
    }
  }, [values.locality, fetchFromAPI, values.searchLocality])

  const localitiesClickHandler = (e: MouseEvent, item: IInputLocality | null) => {
    setFieldValue('locality', item).then(() => {
      setFieldValue('searchLocality', item?.content?.toString() ?? '')
      setFieldValue('latitude', item?.latitude.toString() ?? '')
      setFieldValue('longitude', item?.longitude.toString() ?? '')
    })
  }

  const resetLocality = () => {
    setFieldValue('locality', null).then(() => {
      setFieldValue('latitude', '')
      setFieldValue('longitute', '')
      setFieldValue('searchLocality', '')
    })
  }

  return {
    isSubmitting,
    handlerBtnSubmit,
    timezoneHadleChange,
    localitiesList,
    isLocalitiesError,
    isLocalitiesLoading,
    localitiesClickHandler,
    resetLocality,
    values,
  }
}
